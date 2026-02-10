import type { AIGrade } from '@/types';
import type { ModuleOutput } from '@/types';
import { assessAnswerQuality } from './answerQuality';
import type { GradeResult } from '@/types';

/**
 * Convert rubric GradeResult (0–100) to legacy AIGrade (0–10) for storage in moduleOutput.aiGrade.
 */
export function gradeResultToAIGrade(r: GradeResult): AIGrade {
  const scale = 10 / 100;
  const overall = Math.round(r.finalScore * scale * 10) / 10;
  const rub = r.criteria;
  const to10 = (n: number, max: number) => Math.round((n / max) * 10 * 10) / 10;
  return {
    overall,
    rubric: {
      specificity: to10(rub.specificity, 10),
      falsifiability: to10(rub.reasoning, 15),
      tradeoffClarity: to10(rub.completeness, 20),
      evidenceLinkage: to10(rub.reasoning, 15),
      riskHonesty: to10(rub.correctness, 40),
    },
    confidence: r.source === 'llm' ? 0.8 : 0.5,
    redFlags: r.notes.filter((n) => /penalty|unsupported|vague|fluff/i.test(n)),
    evidenceQuotes: [],
    suggestions: r.feedback?.improvements ?? r.notes,
  };
}

/**
 * Build a heuristic-based AIGrade when OpenAI is unavailable or fails.
 * Same shape as AI grade so formulas can use one code path.
 */
export function heuristicGradeFromModuleOutput(moduleOutput: ModuleOutput | undefined): AIGrade {
  if (!moduleOutput) {
    return defaultAIGrade(0, 0.5);
  }

  const q = assessAnswerQuality(moduleOutput); // 0–10
  const overall = Math.round(q * 10) / 10;
  const r = overall; // reuse for rubric dimensions (heuristic has no breakdown)
  const rubric = {
    specificity: r,
    falsifiability: r,
    tradeoffClarity: r,
    evidenceLinkage: r,
    riskHonesty: r,
  };
  return {
    overall,
    rubric,
    confidence: 0.5,
    redFlags: [],
    evidenceQuotes: [],
    suggestions: [],
  };
}

function defaultAIGrade(overall: number, confidence: number): AIGrade {
  return {
    overall,
    rubric: {
      specificity: overall,
      falsifiability: overall,
      tradeoffClarity: overall,
      evidenceLinkage: overall,
      riskHonesty: overall,
    },
    confidence,
    redFlags: [],
    evidenceQuotes: [],
    suggestions: [],
  };
}

/**
 * Convert AI grade to 0–1 quality index for valuation.
 * Uses overall + rubric average; confidence can weight later if needed.
 */
export function aiGradeToQualityIndex(grade: AIGrade | undefined): number {
  if (!grade) return 0;
  const rubricAvg =
    (grade.rubric.specificity +
      grade.rubric.falsifiability +
      grade.rubric.tradeoffClarity +
      grade.rubric.evidenceLinkage +
      grade.rubric.riskHonesty) /
    5;
  const combined = (grade.overall + rubricAvg) / 2; // 0–10
  return Math.min(1, Math.max(0, combined / 10));
}
