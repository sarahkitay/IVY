import { BusinessState } from '@/types';
import { assessAnswerQuality } from './answerQuality';

const POSITIVE_KEYWORDS = [
  'advantage', 'differentiation', 'moat', 'defensible', 'switching cost',
  'network effect', 'margin', 'unit economics', 'retention', 'LTV',
  'segment', 'positioning', 'job-to-be-done', 'constraint', 'wedge',
];
const NEGATIVE_KEYWORDS = [
  'commodity', 'price war', 'commoditized', 'fragile', 'copyable',
  'unsure', 'maybe', 'probably', 'hope', 'assume', 'generic',
];

const BASE_VALUATION = 400_000;
const MAX_VALUATION_BOOST = 2_600_000;
const BASE_CAC = 180;
const MAX_CAC_REDUCTION = 100;

/**
 * Builds a 0–1 quality index from answer quality + keywords + quiz scores.
 * Used to drive valuation up and CAC down in a realistic way.
 */
function getQualityIndex(state: BusinessState): { answerQuality: number; quizQuality: number } {
  let answerSum = 0;
  let answerCount = 0;
  let quizSum = 0;
  let quizCount = 0;

  Object.values(state.moduleOutputs ?? {}).forEach((output) => {
    const q = assessAnswerQuality(output);
    answerSum += q;
    answerCount += 1;

    const allText: string[] = [];
    if (output.worksheets) {
      Object.values(output.worksheets).forEach((ws) => {
        if (ws.fields) {
          Object.values(ws.fields).forEach((v) => {
            if (typeof v === 'string') allText.push(v);
            if (Array.isArray(v)) v.forEach((x) => typeof x === 'string' && allText.push(x));
          });
        }
      });
    }
    if (output.coldCallResponse) allText.push(output.coldCallResponse);
    if (output.redTeamResponse) allText.push(output.redTeamResponse);
    const text = allText.join(' ').toLowerCase();
    const pos = POSITIVE_KEYWORDS.filter((k) => text.includes(k)).length;
    const neg = NEGATIVE_KEYWORDS.filter((k) => text.includes(k)).length;
    const keywordBonus = (pos - neg) * 0.5;
    answerSum += Math.max(0, Math.min(5, keywordBonus));

    if (output.quizTotal != null && output.quizTotal > 0 && output.quizScore != null) {
      quizSum += output.quizScore / output.quizTotal;
      quizCount += 1;
    }
  });

  const answerQuality = answerCount === 0 ? 0 : Math.min(1, (answerSum / answerCount) / 10);
  const quizQuality = quizCount === 0 ? 0 : quizSum / quizCount;
  return { answerQuality, quizQuality };
}

/** Extra credit per Reading Companion book completed (same as in-app display). */
const EXTRA_CREDIT_PER_BOOK = 5;
/** Max reading extra credit points that count toward valuation (e.g. 10 books = 50 pts = 1.0). */
const MAX_READING_PTS = 50;

/**
 * Reading Companion: books completed across all modules → 0–1 index.
 * Extra credit per book; caps at MAX_READING_PTS for valuation boost.
 */
function getReadingIndex(state: BusinessState): number {
  let totalPts = 0;
  Object.values(state.moduleOutputs ?? {}).forEach((output) => {
    const completed = output.readingCompanionBooksCompleted ?? {};
    totalPts += Object.values(completed).filter(Boolean).length * EXTRA_CREDIT_PER_BOOK;
  });
  return Math.min(1, totalPts / MAX_READING_PTS);
}

/**
 * Valuation and CAC reactive to answer quality, quiz performance, writing, and Reading Companion.
 * Good answers, quizzes, Strategy Note, and books completed → valuation up, CAC down.
 */
export function getReactiveValuationAndCAC(state: BusinessState): {
  valuation: number;
  cac: number;
  qualityIndex: number;
  quizIndex: number;
} {
  const { answerQuality, quizQuality } = getQualityIndex(state);
  const qualityIndex = answerQuality;
  const quizIndex = quizQuality;

  // Writing (Strategy Note rubric) and Reading Companion extra credit
  const writingIndex = (state.boardMemoRubricScore ?? 0) / 100;
  const readingIndex = getReadingIndex(state);
  const combined =
    qualityIndex * 0.45 + quizIndex * 0.2 + writingIndex * 0.25 + readingIndex * 0.1;
  const valuation = Math.round(
    BASE_VALUATION + MAX_VALUATION_BOOST * (0.15 + 0.85 * combined)
  );
  const cac = Math.round(
    Math.max(45, BASE_CAC - MAX_CAC_REDUCTION * combined)
  );

  return { valuation, cac, qualityIndex, quizIndex };
}
