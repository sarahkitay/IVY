'use client';

import { useState, useEffect } from 'react';
import { useBusinessState } from '@/store/useBusinessState';
import { scoreStrategyNote } from '@/utils/boardMemoRubric';
import type { StrategyNote } from '@/types';

export default function StrategyNoteForm() {
  const { state, replaceState } = useBusinessState();
  const existing = state.strategyNote;
  const [thesis, setThesis] = useState(existing?.thesis ?? '');
  const [evidence, setEvidence] = useState<string[]>(existing?.evidence ?? ['', '', '']);
  const [tradeoffs, setTradeoffs] = useState<string[]>(existing?.tradeoffs ?? ['', '']);
  const [risks, setRisks] = useState<string[]>(existing?.risks ?? ['', '']);
  const [mitigations, setMitigations] = useState<string[]>(existing?.mitigations ?? ['', '']);
  const [decision, setDecision] = useState(existing?.decision ?? '');
  const [whatWouldChangeIn7Days, setWhatWouldChangeIn7Days] = useState(existing?.whatWouldChangeIn7Days ?? '');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (existing) {
      setThesis(existing.thesis ?? '');
      setEvidence(existing.evidence?.length ? existing.evidence : ['', '', '']);
      setTradeoffs(existing.tradeoffs?.length ? existing.tradeoffs : ['', '']);
      setRisks(existing.risks?.length ? existing.risks : ['', '']);
      setMitigations(existing.mitigations?.length ? existing.mitigations : ['', '']);
      setDecision(existing.decision ?? '');
      setWhatWouldChangeIn7Days(existing.whatWouldChangeIn7Days ?? '');
    }
  }, [existing]);

  const handleSave = () => {
    const note: StrategyNote = {
      thesis,
      evidence: evidence.slice(0, 3),
      tradeoffs: tradeoffs.slice(0, 2),
      risks: risks.slice(0, 2),
      mitigations: mitigations.slice(0, 2),
      decision,
      whatWouldChangeIn7Days: whatWouldChangeIn7Days || undefined,
    };
    const { score } = scoreStrategyNote(note);
    replaceState({ strategyNote: note, boardMemoRubricScore: score });
    setSaved(true);
  };

  const noteForRubric: StrategyNote = {
    thesis,
    evidence: evidence.slice(0, 3),
    tradeoffs: tradeoffs.slice(0, 2),
    risks: risks.slice(0, 2),
    mitigations: mitigations.slice(0, 2),
    decision,
    whatWouldChangeIn7Days: whatWouldChangeIn7Days || undefined,
  };
  const { score, breakdown } = scoreStrategyNote(noteForRubric);

  return (
    <div className="space-y-6">
      <p className="label-small-caps text-charcoal/60 mb-2">
        2-page Strategy Note: claim → evidence → tradeoffs → risks → decision. Locked form.
      </p>

      <div>
        <label className="label-small-caps block mb-2">Thesis (max 2 sentences) *</label>
        <textarea
          value={thesis}
          onChange={(e) => setThesis(e.target.value)}
          placeholder="One claim."
          className="w-full worksheet-field min-h-[80px]"
          maxLength={200}
          style={{ borderRadius: 0 }}
        />
      </div>

      <div>
        <label className="label-small-caps block mb-2">Evidence (3 bullets, each with &quot;because&quot;) *</label>
        {[0, 1, 2].map((i) => (
          <input
            key={i}
            type="text"
            value={evidence[i] ?? ''}
            onChange={(e) => {
              const next = [...evidence];
              next[i] = e.target.value;
              setEvidence(next);
            }}
            placeholder={`Bullet ${i + 1}: claim because [reason]`}
            className="w-full worksheet-field mb-2"
            style={{ borderRadius: 0 }}
          />
        ))}
      </div>

      <div>
        <label className="label-small-caps block mb-2">Tradeoffs (2 bullets — what you&apos;re not doing) *</label>
        {[0, 1].map((i) => (
          <input
            key={i}
            type="text"
            value={tradeoffs[i] ?? ''}
            onChange={(e) => {
              const next = [...tradeoffs];
              next[i] = e.target.value;
              setTradeoffs(next);
            }}
            placeholder={`Tradeoff ${i + 1}`}
            className="w-full worksheet-field mb-2"
            style={{ borderRadius: 0 }}
          />
        ))}
      </div>

      <div>
        <label className="label-small-caps block mb-2">Risks (top 2 kill shots) *</label>
        {[0, 1].map((i) => (
          <input
            key={i}
            type="text"
            value={risks[i] ?? ''}
            onChange={(e) => {
              const next = [...risks];
              next[i] = e.target.value;
              setRisks(next);
            }}
            placeholder={`Risk ${i + 1}`}
            className="w-full worksheet-field mb-2"
            style={{ borderRadius: 0 }}
          />
        ))}
      </div>

      <div>
        <label className="label-small-caps block mb-2">Mitigations (1 per risk) *</label>
        {[0, 1].map((i) => (
          <input
            key={i}
            type="text"
            value={mitigations[i] ?? ''}
            onChange={(e) => {
              const next = [...mitigations];
              next[i] = e.target.value;
              setMitigations(next);
            }}
            placeholder={`Mitigation ${i + 1}`}
            className="w-full worksheet-field mb-2"
            style={{ borderRadius: 0 }}
          />
        ))}
      </div>

      <div>
        <label className="label-small-caps block mb-2">Decision (one sentence) *</label>
        <input
          type="text"
          value={decision}
          onChange={(e) => setDecision(e.target.value)}
          placeholder="One sentence."
          className="w-full worksheet-field"
          maxLength={150}
          style={{ borderRadius: 0 }}
        />
      </div>

      <div>
        <label className="label-small-caps block mb-2">What would you do Monday?</label>
        <textarea
          value={whatWouldChangeIn7Days}
          onChange={(e) => setWhatWouldChangeIn7Days(e.target.value)}
          placeholder="In the next 7 days, what changes in the world if you're right?"
          className="w-full worksheet-field min-h-[80px]"
          style={{ borderRadius: 0 }}
        />
      </div>

      <div className="border-t border-charcoal/15 pt-4">
        <p className="label-small-caps text-charcoal/60 mb-2">Rubric preview</p>
        <p className="text-sm text-charcoal/80">
          Specificity {breakdown.specificity} · Falsifiability {breakdown.falsifiability} · Tradeoffs {breakdown.tradeoffClarity} · Evidence {breakdown.evidenceLinkage} · Risk honesty {breakdown.riskHonesty} → Score: {score}/100
        </p>
        <p className="tier-3-guidance text-xs mt-1">High rubric score reduces CAC and increases valuation more than quizzes.</p>
      </div>

      <button
        type="button"
        onClick={handleSave}
        className="btn-formal"
      >
        {saved ? 'Saved' : 'Save Strategy Note & Update Rubric'}
      </button>
    </div>
  );
}
