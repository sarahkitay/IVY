'use client';

import { useState } from 'react';
import { useBusinessState } from '@/store/useBusinessState';

const MAX_LINES = 10;
const TEMPLATE = 'We believe ___ because ___; we will prove it by ___.';

export default function ThesisLedger() {
  const { state, replaceState } = useBusinessState();
  const existing = state.strategicThesisLedger ?? [];
  const [lines, setLines] = useState<string[]>(existing.length > 0 ? existing : ['']);
  const [saved, setSaved] = useState(false);

  const updateLine = (index: number, value: string) => {
    setLines((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  const addLine = () => {
    if (lines.length >= MAX_LINES) return;
    setLines((prev) => [...prev, '']);
  };

  const removeLine = (index: number) => {
    setLines((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    const trimmed = lines.map((l) => l.trim()).filter(Boolean);
    replaceState({ strategicThesisLedger: trimmed });
    setSaved(true);
  };

  return (
    <div className="space-y-6">
      <p className="label-small-caps text-charcoal/60 mb-2">
        Strategic Thesis Ledger (Brown). Max {MAX_LINES} lines. Each module add one line.
      </p>
      <p className="tier-3-guidance text-sm text-charcoal/80 mb-4">
        Format: &quot;We believe ___ because ___; we will prove it by ___.&quot;
      </p>
      <div className="space-y-3">
        {lines.map((line, i) => (
          <div key={i} className="flex gap-2 items-start">
            <span className="label-small-caps text-charcoal/50 shrink-0 w-6">{i + 1}.</span>
            <textarea
              value={line}
              onChange={(e) => updateLine(i, e.target.value)}
              placeholder={TEMPLATE}
              className="flex-1 worksheet-field min-h-[72px] text-sm"
              style={{ borderRadius: 0 }}
              rows={2}
            />
            {lines.length > 1 && (
              <button
                type="button"
                onClick={() => removeLine(i)}
                className="label-small-caps text-oxblood/80 hover:text-oxblood text-xs shrink-0"
              >
                Remove
              </button>
            )}
          </div>
        ))}
      </div>
      {lines.length < MAX_LINES && (
        <button
          type="button"
          onClick={addLine}
          className="label-small-caps text-charcoal/60 hover:text-ink border border-dashed border-charcoal/20 px-4 py-2 w-full"
          style={{ borderRadius: 0 }}
        >
          + Add line
        </button>
      )}
      <button type="button" onClick={handleSave} className="btn-formal">
        {saved ? 'Saved' : 'Save Thesis Ledger'}
      </button>
    </div>
  );
}
