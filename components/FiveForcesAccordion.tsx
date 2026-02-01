'use client';

import { useState } from 'react';
import { FIVE_FORCES_DATA, FIVE_FORCES_INTERPRETATION } from '@/data/fiveForcesData';

type Judgment = 'favorable' | 'neutral' | 'hostile' | null;
type ForceJudgment = { judgment: Judgment; slider: number; reflection: string };

const JUDGMENT_LABELS: Record<NonNullable<Judgment>, string> = {
  favorable: 'Favorable',
  neutral: 'Neutral',
  hostile: 'Hostile',
};

const SLIDER_LABELS: Record<number, string> = {
  1: '1 — Favorable',
  2: '2',
  3: '3 — Neutral',
  4: '4',
  5: '5 — Hostile',
};

export default function FiveForcesAccordion() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [judgments, setJudgments] = useState<Record<string, ForceJudgment>>({});

  const getJudgment = (id: string): ForceJudgment => {
    return judgments[id] ?? { judgment: null, slider: 3, reflection: '' };
  };

  const setJudgment = (id: string, update: Partial<ForceJudgment>) => {
    setJudgments((prev) => ({
      ...prev,
      [id]: { ...getJudgment(id), ...update },
    }));
  };

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const hasJudgment = (id: string) => getJudgment(id).judgment !== null;

  return (
    <div className="space-y-2">
      <p className="tier-3-guidance text-sm text-charcoal/80 mb-4">
        One force at a time. Take a position first — then we reveal the lens.
      </p>

      {FIVE_FORCES_DATA.map((force) => {
        const isOpen = openId === force.id;
        const { judgment, slider, reflection } = getJudgment(force.id);
        const showReveal = hasJudgment(force.id);

        return (
          <div
            key={force.id}
            className="border border-charcoal/25 bg-cream"
            style={{ borderRadius: 0 }}
          >
            {/* Force Header (Collapsed View) */}
            <button
              type="button"
              onClick={() => toggle(force.id)}
              className="w-full text-left px-4 py-4 sm:px-5 sm:py-4 flex items-center justify-between gap-3 min-h-[56px] touch-manipulation hover:bg-parchment/30 transition-colors"
              aria-expanded={isOpen}
              aria-controls={`force-content-${force.id}`}
              id={`force-header-${force.id}`}
            >
              <div className="flex-1 min-w-0">
                <span className="font-mono font-semibold text-ink block truncate">
                  {force.title}
                </span>
                <span className="text-sm text-charcoal/60 block truncate mt-0.5">
                  {force.subtext}
                </span>
              </div>
              <span className="shrink-0 text-charcoal/50" aria-hidden>
                {isOpen ? '▼' : '▶'}
              </span>
            </button>

            {/* Expanded Content */}
            <div
              id={`force-content-${force.id}`}
              role="region"
              aria-labelledby={`force-header-${force.id}`}
              className={isOpen ? 'border-t border-charcoal/20' : 'hidden'}
            >
              <div className="px-4 py-4 sm:px-5 sm:py-5 space-y-5">
                {/* Step 1: Forced Judgment (Before Teaching) */}
                <div>
                  <p className="label-small-caps text-charcoal/70 mb-3">Your call</p>
                  <p className="text-sm text-charcoal/80 mb-3">
                    In this market, {force.title.toLowerCase()} is:
                  </p>
                  <div className="flex flex-wrap gap-3 mb-3" role="group" aria-label={`Rate ${force.title}`}>
                    {(['favorable', 'neutral', 'hostile'] as const).map((j) => (
                      <label
                        key={j}
                        className="flex items-center gap-2 cursor-pointer min-h-[44px] touch-manipulation"
                      >
                        <input
                          type="radio"
                          name={`force-${force.id}`}
                          checked={judgment === j}
                          onChange={() => setJudgment(force.id, { judgment: j, slider: j === 'favorable' ? 1 : j === 'hostile' ? 5 : 3 })}
                          className="w-4 h-4 border-charcoal/40"
                        />
                        <span className="text-sm font-medium text-charcoal">{JUDGMENT_LABELS[j]}</span>
                      </label>
                    ))}
                  </div>
                  <div className="mt-3">
                    <label className="block text-xs text-charcoal/60 mb-1">
                      1 — Favorable … 5 — Hostile
                    </label>
                    <input
                      type="range"
                      min={1}
                      max={5}
                      value={slider}
                      onChange={(e) => setJudgment(force.id, { slider: Number(e.target.value), judgment: judgment ?? 'neutral' })}
                      className="w-full h-2 accent-charcoal"
                    />
                    <p className="text-xs text-charcoal/50 mt-1">{SLIDER_LABELS[slider] ?? slider}</p>
                  </div>
                </div>

                {/* Step 2: Reveal Diagnostic Lens (After Selection) — show after they choose */}
                {showReveal && (
                  <>
                    <div className="pt-2 border-t border-charcoal/15">
                      <p className="label-small-caps text-charcoal/60 mb-1">What this force measures</p>
                      <p className="text-sm text-charcoal/90">{force.diagnosticLens}</p>
                    </div>

                    {/* Step 3: Split the World — Favorable vs Hostile */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="border border-sage/30 bg-parchment/20 p-4" style={{ borderRadius: 0 }}>
                        <p className="label-small-caps text-sage/90 mb-2">Favorable (1–2)</p>
                        <ul className="text-sm text-charcoal/80 space-y-1 list-disc list-inside">
                          {force.favorableConditions.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="border border-oxblood/20 bg-parchment/10 p-4" style={{ borderRadius: 0 }}>
                        <p className="label-small-caps text-oxblood/90 mb-2">Hostile (4–5)</p>
                        <ul className="text-sm text-charcoal/80 space-y-1 list-disc list-inside">
                          {force.hostileConditions.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Step 4: Evidence Checklist */}
                    <div>
                      <p className="label-small-caps text-charcoal/60 mb-2">Evidence to look for</p>
                      <ul className="space-y-2">
                        {force.evidenceChecklist.map((item, i) => (
                          <li key={i} className="flex items-center gap-3 min-h-[44px]">
                            <span className="flex-shrink-0 w-5 h-5 border border-charcoal/30 flex items-center justify-center text-xs" style={{ borderRadius: 0 }}>
                              ☐
                            </span>
                            <span className="text-sm text-charcoal/80">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Step 5: Trap Callout */}
                    <div className="border-l-2 border-oxblood/50 bg-parchment/30 py-3 px-4" style={{ borderRadius: 0 }}>
                      <p className="label-small-caps text-oxblood/90 mb-1">Common trap</p>
                      <p className="text-sm text-charcoal/90">{force.trap}</p>
                    </div>

                    {/* Step 6: Reflection / Mini-Write */}
                    <div>
                      <label className="block label-small-caps text-charcoal/70 mb-2">
                        {force.reflectionPrompt}
                      </label>
                      <textarea
                        value={reflection}
                        onChange={(e) => setJudgment(force.id, { reflection: e.target.value })}
                        placeholder="One sentence."
                        className="w-full border border-charcoal/20 px-3 py-2 text-sm bg-cream min-h-[72px] resize-y"
                        style={{ borderRadius: 0 }}
                        rows={2}
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        );
      })}

      {/* Optional: Strategist Score summary (after all five) */}
      <StrategistScoreSummary judgments={judgments} />
    </div>
  );
}

function StrategistScoreSummary({ judgments }: { judgments: Record<string, ForceJudgment> }) {
  const allRated = FIVE_FORCES_DATA.every((f) => judgments[f.id]?.judgment != null);
  if (!allRated) return null;

  const total = FIVE_FORCES_DATA.reduce((sum, f) => sum + (judgments[f.id]?.slider ?? 3), 0);
  const interpretation =
    total <= 12
      ? FIVE_FORCES_INTERPRETATION.attractive
      : total <= 14
        ? FIVE_FORCES_INTERPRETATION.playable
        : total <= 17
          ? FIVE_FORCES_INTERPRETATION.moatRequired
          : FIVE_FORCES_INTERPRETATION.unlikely;

  return (
    <div className="mt-8 p-4 sm:p-6 border border-charcoal/20 bg-parchment/30" style={{ borderRadius: 0 }}>
      <h3 className="tier-2-instruction text-lg mb-3">Strategist score</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
        {FIVE_FORCES_DATA.map((f) => {
          const j = judgments[f.id];
          const s = j?.slider ?? 3;
          const label = s <= 2 ? 'Favorable' : s >= 4 ? 'Hostile' : 'Neutral';
          return (
            <div key={f.id} className="flex justify-between text-sm">
              <span className="text-charcoal/80">{f.title}</span>
              <span className="font-mono">
                {s} ({label})
              </span>
            </div>
          );
        })}
      </div>
      <p className="font-mono text-sm text-charcoal/80 mb-2">
        Total: {total} / 25 — {interpretation}
      </p>
      <p className="text-sm text-charcoal/70 mt-2">
        What kind of strategy survives here? Scale? Differentiation? Regulatory moat? Distribution lock-in?
      </p>
    </div>
  );
}
