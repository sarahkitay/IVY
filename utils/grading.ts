/**
 * Rubric-based grading: deterministic score 0–100 with clear sub-scores.
 * Optional keyword modifier (±5 max). Anti-gaming: unique keywords only, spam penalty.
 */

import type { RubricWeights, CriterionScore, GradeResult } from '@/types';

/** Default rubric: correctness 40, completeness 20, reasoning 15, specificity 10, clarity 10; penalties -15 / -10. */
export const DEFAULT_RUBRIC: RubricWeights = {
  correctness: 40,
  completeness: 20,
  reasoning: 15,
  specificity: 10,
  clarity: 10,
  hallucinationPenaltyMax: -15,
  fluffPenaltyMax: -10,
};

const POSITIVE_KEYWORDS = [
  'advantage', 'differentiation', 'moat', 'defensible', 'constraint', 'tradeoff',
  'evidence', 'because', 'metric', 'assumption', 'risk', 'market', 'customer',
];
const NEGATIVE_KEYWORDS = [
  'commodity', 'price war', 'unsure', 'maybe', 'probably', 'hope', 'generic',
  'synergy', 'leverage', 'optimize', 'robust', 'scale', 'growth', 'efficient',
];

/** Count excess keyword occurrences (beyond one per keyword) for spam penalty. */
function countRepeats(text: string, keywords: string[]): number {
  const lower = text.toLowerCase();
  let total = 0;
  for (const k of keywords) {
    const re = new RegExp(k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
    const matches = lower.match(re);
    if (matches) total += matches.length;
  }
  return Math.max(0, total - keywords.length);
}

/**
 * Keyword modifier: ±5 max. Unique hits only; penalize repetition.
 * Prevents gaming by repeating "moat" etc. without substance.
 */
export function keywordModifier(userAnswer: string): number {
  if (!userAnswer?.trim()) return 0;
  const text = userAnswer.toLowerCase();
  const uniquePos = new Set(POSITIVE_KEYWORDS.filter((k) => text.includes(k))).size;
  const uniqueNeg = new Set(NEGATIVE_KEYWORDS.filter((k) => text.includes(k))).size;
  const repeats = countRepeats(text, POSITIVE_KEYWORDS);
  const spamPenalty = Math.min(3, repeats * 0.2);
  const raw = (uniquePos - uniqueNeg) * 0.5 - spamPenalty;
  return Math.max(-5, Math.min(5, Math.round(raw * 10) / 10));
}

/** Score 0–40: correctness (aligns with expected / key facts). */
function scoreCorrectness(
  userAnswer: string,
  questionPrompt: string,
  expectedAnswer: string | undefined
): number {
  if (!userAnswer?.trim()) return 0;
  const u = userAnswer.trim().toLowerCase();
  let score = 0;
  if (expectedAnswer?.trim()) {
    const exp = expectedAnswer.trim().toLowerCase();
    const expWords = exp.split(/\s+/).filter((w) => w.length > 2);
    const matchCount = expWords.filter((w) => u.includes(w)).length;
    const ratio = expWords.length > 0 ? matchCount / expWords.length : 0;
    score = Math.round(40 * Math.min(1, ratio * 1.2)); // allow slight overshoot
  } else {
    // No expected: reward numbers, names, concrete terms; penalize pure hedging
    if (/\d+/.test(u)) score += 12;
    if (/[A-Z][a-z]+ [A-Z][a-z]+/.test(userAnswer)) score += 8;
    if (!/\b(maybe|probably|hope|unsure)\b/i.test(u)) score += 10;
    const vague = (u.match(/\b(better|more|less|improve|growth|scale|synergy|optimize)\b/gi) || []).length;
    score = Math.max(0, Math.min(40, score + 10 - vague * 3));
  }
  return Math.max(0, Math.min(40, score));
}

/** Score 0–20: completeness (addresses all parts of the question). */
function scoreCompleteness(userAnswer: string, questionPrompt: string): number {
  if (!userAnswer?.trim()) return 0;
  const u = userAnswer.trim();
  const q = questionPrompt.trim().toLowerCase();
  const questionParts = q.split(/[.?]\s+/).filter((p) => p.length > 10).length || 1;
  const minExpectedLength = Math.min(3, questionParts) * 30;
  if (u.length < 20) return 0;
  if (u.length < minExpectedLength) return Math.round(20 * (u.length / minExpectedLength));
  const hasMultiplePoints = (u.match(/\.\s+[A-Z]|;\s+|\d+\.\s+|\n/g) || []).length >= 1;
  return hasMultiplePoints ? 20 : 12;
}

/** Score 0–15: reasoning / justification ("because", "if...then", causal chain). */
function scoreReasoning(userAnswer: string): number {
  if (!userAnswer?.trim()) return 0;
  const u = userAnswer.trim().toLowerCase();
  let s = 0;
  if (/\bbecause\b/.test(u)) s += 5;
  if (/\bif\s+.+\s+then\b/.test(u)) s += 4;
  if (/\b(so|therefore|thus)\b/.test(u)) s += 2;
  if (/\d+%|\d+\s*(months|weeks|years)/.test(u)) s += 4;
  return Math.min(15, s);
}

/** Score 0–10: specificity / examples (numbers, names, concrete details). */
function scoreSpecificity(userAnswer: string): number {
  if (!userAnswer?.trim()) return 0;
  const u = userAnswer.trim();
  let s = 0;
  if (/\d+/.test(u)) s += 4;
  if (/[A-Z][a-z]+ [A-Z][a-z]+/.test(u)) s += 3;
  const bullets = (u.match(/^[\s]*[-*•]\s+/gm) || []).length;
  if (bullets >= 2) s += 3;
  return Math.min(10, s);
}

/** Score 0–10: clarity / structure (readable, organized). */
function scoreClarity(userAnswer: string): number {
  if (!userAnswer?.trim()) return 0;
  const u = userAnswer.trim();
  let s = 5;
  if (u.length > 500) s -= 2; // rambling
  const sentenceCount = (u.match(/[.!?]+\s+/g) || []).length + 1;
  if (sentenceCount >= 2 && u.length >= 50) s += 3;
  const fluff = (u.match(/\b(synergy|leverage|optimize|robust|scale|paradigm|ecosystem)\b/gi) || []).length;
  s -= fluff;
  return Math.max(0, Math.min(10, s));
}

/** Penalties: confident unsupported claims, fluff/word-salad. */
function scorePenalties(
  userAnswer: string,
  rubric: RubricWeights
): number {
  if (!userAnswer?.trim()) return 0;
  const u = userAnswer.trim().toLowerCase();
  let penalty = 0;
  const confidentButVague = (u.match(/\b(definitely|clearly|obviously|certainly)\b/g) || []).length;
  if (confidentButVague >= 2 && !/\d+/.test(u)) penalty += rubric.hallucinationPenaltyMax * 0.5;
  const unsupported = (u.match(/\b(will|guarantee|always|never)\b/g) || []).length;
  if (unsupported >= 2 && (u.match(/\bbecause\b|\d+/g) || []).length < 2) penalty += rubric.hallucinationPenaltyMax * 0.4;
  const fluffDensity = (u.match(/\b(synergy|leverage|optimize|robust|paradigm|ecosystem|holistic|best.?in.?class)\b/gi) || []).length;
  if (fluffDensity >= 2) penalty += rubric.fluffPenaltyMax * Math.min(1, fluffDensity / 3);
  return Math.max(rubric.hallucinationPenaltyMax + rubric.fluffPenaltyMax, penalty);
}

function verdictFromScore(score: number): 'pass' | 'borderline' | 'fail' {
  if (score >= 70) return 'pass';
  if (score >= 50) return 'borderline';
  return 'fail';
}

/**
 * Deterministic rubric-based grade. No LLM. Stable and testable.
 */
export function deterministicGrade(
  questionPrompt: string,
  userAnswer: string,
  options: {
    expectedAnswer?: string;
    rubric?: RubricWeights;
    includeKeywordModifier?: boolean;
  } = {}
): GradeResult {
  const rubric = options.rubric ?? DEFAULT_RUBRIC;
  const includeKeyword = options.includeKeywordModifier !== false;

  const criteria: CriterionScore = {
    correctness: scoreCorrectness(userAnswer, questionPrompt, options.expectedAnswer),
    completeness: scoreCompleteness(userAnswer, questionPrompt),
    reasoning: scoreReasoning(userAnswer),
    specificity: scoreSpecificity(userAnswer),
    clarity: scoreClarity(userAnswer),
    penalties: scorePenalties(userAnswer, rubric),
  };

  let raw =
    criteria.correctness +
    criteria.completeness +
    criteria.reasoning +
    criteria.specificity +
    criteria.clarity +
    criteria.penalties;

  if (includeKeyword) {
    const mod = keywordModifier(userAnswer);
    raw += mod;
  }

  const finalScore = Math.max(0, Math.min(100, Math.round(raw)));
  const notes: string[] = [];
  if (criteria.correctness >= 30) notes.push('Addresses key points.');
  else if (criteria.correctness > 0) notes.push('Partially addresses the question.');
  if (criteria.reasoning >= 8) notes.push('Shows reasoning.');
  if (criteria.penalties < 0) notes.push('Some unsupported or vague claims.');

  return {
    finalScore,
    criteria,
    verdict: verdictFromScore(finalScore),
    notes: notes.slice(0, 2),
    source: 'deterministic',
  };
}

export type GradeConfig = {
  questionPrompt: string;
  userAnswer: string;
  expectedAnswer?: string;
  rubric?: RubricWeights;
  useLLM?: boolean;
  requestFeedback?: boolean;
};

/**
 * Wrapper: grade with deterministic rubric, or LLM when useLLM is true.
 * For LLM, call from server only (e.g. API route) and pass gradeWithLLM.
 */
export function grade(
  config: GradeConfig,
  llmGradingFn?: (params: {
    questionPrompt: string;
    userAnswer: string;
    expectedAnswer?: string;
    rubric: RubricWeights;
    requestFeedback: boolean;
  }) => Promise<GradeResult>
): Promise<GradeResult> | GradeResult {
  const result = deterministicGrade(config.questionPrompt, config.userAnswer, {
    expectedAnswer: config.expectedAnswer,
    rubric: config.rubric,
    includeKeywordModifier: true,
  });

  if (config.useLLM && llmGradingFn) {
    return llmGradingFn({
      questionPrompt: config.questionPrompt,
      userAnswer: config.userAnswer,
      expectedAnswer: config.expectedAnswer,
      rubric: config.rubric ?? DEFAULT_RUBRIC,
      requestFeedback: config.requestFeedback ?? false,
    });
  }

  if (config.requestFeedback && result.verdict !== 'pass') {
    result.feedback = {
      strengths: result.notes.length ? result.notes : ['Attempted response.'],
      improvements: [
        'Add concrete numbers or examples.',
        'State cause-effect with "because" or "if...then".',
      ],
      nextStep: 'Revise with one specific metric and one explicit tradeoff.',
    };
  }

  return result;
}
