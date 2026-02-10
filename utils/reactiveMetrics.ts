import { BusinessState } from '@/types';
import { assessAnswerQuality } from './answerQuality';
import { aiGradeToQualityIndex } from './gradeFallback';
import { calculateDefensibility, type AdvantageInputs } from './copyabilityCalculator';

const POSITIVE_KEYWORDS = [
  'advantage', 'differentiation', 'moat', 'defensible', 'switching cost',
  'network effect', 'margin', 'unit economics', 'retention', 'LTV',
  'segment', 'positioning', 'job-to-be-done', 'constraint', 'wedge',
];
const NEGATIVE_KEYWORDS = [
  'commodity', 'price war', 'commoditized', 'fragile', 'copyable',
  'unsure', 'maybe', 'probably', 'hope', 'assume', 'generic',
];

/** Count total occurrences of keywords in text (for spam penalty). */
function countRepeats(text: string, keywords: string[]): number {
  const lower = text.toLowerCase();
  let total = 0;
  for (const k of keywords) {
    const re = new RegExp(k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
    const matches = lower.match(re);
    if (matches) total += matches.length;
  }
  return Math.max(0, total - keywords.length); // excess over one-per-keyword
}

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
    const uniquePos = new Set(POSITIVE_KEYWORDS.filter((k) => text.includes(k))).size;
    const uniqueNeg = new Set(NEGATIVE_KEYWORDS.filter((k) => text.includes(k))).size;
    const repeats = countRepeats(text, POSITIVE_KEYWORDS);
    const spamPenalty = Math.min(3, repeats * 0.15);
    const keywordBonus = (uniquePos - uniqueNeg) * 0.4 - spamPenalty;
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

/** Defensibility 0–1 from copyability calculator (worksheet-1-1 Advantage Decomposition). */
function getDefensibilityIndex(state: BusinessState): number {
  for (const output of Object.values(state.moduleOutputs ?? {})) {
    const ws = output.worksheets?.['worksheet-1-1'];
    if (!ws?.fields) continue;
    const f = ws.fields;
    const timeToReplicate = f['time-to-replicate'];
    const founderDependency = f['founder-dependency'];
    const replicationCost = f['replication-cost'];
    const advantageSource = f['advantage-source'];
    if (!timeToReplicate || !founderDependency || !replicationCost || !advantageSource) continue;
    const inputs: AdvantageInputs = {
      sources: Array.isArray(advantageSource)
        ? (advantageSource as unknown[]).map((x) => String(x))
        : [String(advantageSource)],
      timeToReplicate: String(timeToReplicate),
      founderDependency: String(founderDependency),
      replicationCost: String(replicationCost),
    };
    const result = calculateDefensibility(inputs);
    // Normalize raw score to 0–1 (roughly 0–200 scale -> 0–1)
    return Math.min(1, Math.max(0, result.score / 200));
  }
  return 0;
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
 * Whether any module has an AI red flag for keyword stuffing / fluff (for hype penalty).
 */
function hasHypeRedFlag(state: BusinessState): boolean {
  for (const output of Object.values(state.moduleOutputs ?? {})) {
    const flags = output.aiGrade?.redFlags ?? [];
    const hype = flags.some(
      (f) =>
        /keyword\s*stuffing|fluff|no\s*evidence|no\s*tradeoff|buzzword/i.test(f)
    );
    if (hype) return true;
  }
  return false;
}

/**
 * AI quality 0–1 from module aiGrade (when present); otherwise 0.
 * Blended per-module so we don't let raw text drive numbers directly.
 */
function getAIQualityIndex(state: BusinessState): number {
  let sum = 0;
  let count = 0;
  for (const output of Object.values(state.moduleOutputs ?? {})) {
    if (output.aiGrade) {
      sum += aiGradeToQualityIndex(output.aiGrade);
      count += 1;
    }
  }
  return count === 0 ? 0 : sum / count;
}

/**
 * Valuation and CAC reactive to answer quality, AI grade, defensibility, quiz, writing, reading.
 * Text → AI grade → numbers. Anti-hype penalty if AI flags keyword stuffing / no evidence.
 */
export function getReactiveValuationAndCAC(state: BusinessState): {
  valuation: number;
  cac: number;
  qualityIndex: number;
  quizIndex: number;
} {
  const { answerQuality, quizQuality } = getQualityIndex(state);
  const qualityIndex = answerQuality; // heuristic baseline
  const quizIndex = quizQuality;
  const aiQualityIndex = getAIQualityIndex(state);
  const defensibilityIndex = getDefensibilityIndex(state);
  const writingIndex = (state.boardMemoRubricScore ?? 0) / 100;
  const readingIndex = getReadingIndex(state);
  const hypePenalty = hasHypeRedFlag(state) ? 0.08 : 0;

  const combined =
    qualityIndex * 0.3 +
    aiQualityIndex * 0.25 +
    defensibilityIndex * 0.2 +
    writingIndex * 0.15 +
    quizIndex * 0.08 +
    readingIndex * 0.02 -
    hypePenalty;

  const clamped = Math.max(0, Math.min(1, combined));
  const valuation = Math.round(
    BASE_VALUATION + MAX_VALUATION_BOOST * (0.15 + 0.85 * clamped)
  );
  const cac = Math.round(
    Math.max(45, BASE_CAC - MAX_CAC_REDUCTION * clamped)
  );

  return { valuation, cac, qualityIndex, quizIndex };
}
