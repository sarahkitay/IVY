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

/**
 * Valuation and CAC reactive to answer quality and quiz performance.
 * Good answers and correct quiz answers → valuation up, CAC down.
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

  const combined = qualityIndex * 0.75 + quizIndex * 0.25;
  const valuation = Math.round(
    BASE_VALUATION + MAX_VALUATION_BOOST * (0.15 + 0.85 * combined)
  );
  const cac = Math.round(
    Math.max(45, BASE_CAC - MAX_CAC_REDUCTION * combined)
  );

  return { valuation, cac, qualityIndex, quizIndex };
}
