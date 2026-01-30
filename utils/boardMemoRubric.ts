import type { StrategyNote } from '@/types';

export type RubricDimension = 'specificity' | 'falsifiability' | 'tradeoffClarity' | 'evidenceLinkage' | 'riskHonesty';

const VAGUE_PATTERNS = /\b(better|more|less|improve|growth|scale|leverage|synergy|optimize|efficient|robust)\b/gi;
const FALSIFIABLE_PATTERNS = /\b(if .+ then|within \d+|by [Q\d]|when .+ fails|metric|%\d+|<\d+)\b/gi;
const BECAUSE_PATTERNS = /\bbecause\b/gi;
const TRADEOFF_PATTERNS = /\b(not doing|we are not|we won't|instead of|at the cost of|tradeoff)\b/gi;
const RISK_PATTERNS = /\b(fail|risk|could go wrong|kill shot|counterargument)\b/gi;

/**
 * Score Strategy Note on 0–100 using rubric dimensions.
 * Elite programs reward coherent thinking, not buzzwords.
 */
export function scoreStrategyNote(note: StrategyNote | undefined): { score: number; breakdown: Record<RubricDimension, number> } {
  if (!note || !note.thesis?.trim()) {
    return { score: 0, breakdown: { specificity: 0, falsifiability: 0, tradeoffClarity: 0, evidenceLinkage: 0, riskHonesty: 0 } };
  }

  const thesis = note.thesis.trim();
  const evidence = (note.evidence || []).filter(Boolean).join(' ');
  const tradeoffs = (note.tradeoffs || []).filter(Boolean).join(' ');
  const risks = (note.risks || []).filter(Boolean).join(' ');
  const decision = note.decision?.trim() || '';

  // Specificity: avoid vague buzzwords; concrete language
  const vagueCount = (thesis.match(VAGUE_PATTERNS) || []).length;
  const specificity = Math.max(0, 100 - vagueCount * 25 - (thesis.length < 30 ? 30 : 0));

  // Falsifiability: "if X then Y", time bounds, metrics
  const falsifiableCount = (thesis.match(FALSIFIABLE_PATTERNS) || []).length + (decision.match(FALSIFIABLE_PATTERNS) || []).length;
  const falsifiability = Math.min(100, 40 + falsifiableCount * 20);

  // Tradeoff clarity: explicit "what we're not doing"
  const hasTradeoffs = (note.tradeoffs || []).length >= 2 && (tradeoffs.match(TRADEOFF_PATTERNS) || []).length > 0;
  const tradeoffClarity = hasTradeoffs ? 100 : (note.tradeoffs?.length === 1 ? 50 : 0);

  // Evidence linkage: "because" in evidence bullets
  const becauseCount = (evidence.match(BECAUSE_PATTERNS) || []).length;
  const evidenceLinkage = Math.min(100, (note.evidence?.length || 0) * 25 + becauseCount * 25);

  // Risk honesty: top 2 risks + kill-shot language
  const hasRisks = (note.risks || []).length >= 2 && (risks.match(RISK_PATTERNS) || []).length > 0;
  const riskHonesty = hasRisks ? 100 : (note.risks?.length === 1 ? 50 : 0);

  const breakdown: Record<RubricDimension, number> = {
    specificity: Math.round(Math.min(100, specificity)),
    falsifiability: Math.round(Math.min(100, falsifiability)),
    tradeoffClarity: Math.round(tradeoffClarity),
    evidenceLinkage: Math.round(Math.min(100, evidenceLinkage)),
    riskHonesty: Math.round(riskHonesty),
  };

  const score = Math.round(
    (breakdown.specificity * 0.2 +
      breakdown.falsifiability * 0.2 +
      breakdown.tradeoffClarity * 0.25 +
      breakdown.evidenceLinkage * 0.2 +
      breakdown.riskHonesty * 0.15)
  );

  return { score: Math.min(100, Math.max(0, score)), breakdown };
}
