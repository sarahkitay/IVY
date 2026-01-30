'use client';

import { useState } from 'react';
import { useBusinessState } from '@/store/useBusinessState';

const PUSHBACK_CARDS = [
  { id: 'cfo', role: 'CFO', complaint: 'Margin / payback complaint', placeholder: 'Respond in 3 bullets.' },
  { id: 'sales', role: 'Sales', complaint: 'Pipeline complaint', placeholder: 'Respond in 3 bullets.' },
  { id: 'ops', role: 'Ops', complaint: 'Capacity complaint', placeholder: 'Respond in 3 bullets.' },
] as const;

export default function BoardPushbackCards() {
  const { state, replaceState } = useBusinessState();
  const existing = state.boardPushbackResponses ?? {};
  const [responses, setResponses] = useState<Record<string, string[]>>({
    cfo: existing.cfo ?? ['', '', ''],
    sales: existing.sales ?? ['', '', ''],
    ops: existing.ops ?? ['', '', ''],
  });
  const [saved, setSaved] = useState(false);

  const setBullets = (role: string, bullets: string[]) => {
    setResponses((prev) => ({ ...prev, [role]: bullets }));
  };

  const handleSave = () => {
    replaceState({ boardPushbackResponses: responses });
    setSaved(true);
  };

  return (
    <div className="space-y-6">
      <p className="label-small-caps text-charcoal/60 mb-2">
        Boardroom simulation: respond to pushback. 3 bullets per role.
      </p>

      {PUSHBACK_CARDS.map(({ id, role, complaint, placeholder }) => (
        <div key={id} className="border border-charcoal/20 p-4 bg-parchment/30" style={{ borderRadius: 0 }}>
          <p className="font-serif font-bold text-ink mb-1">{role}</p>
          <p className="text-sm text-charcoal/70 mb-3">{complaint}</p>
          <div className="space-y-2">
            {[0, 1, 2].map((i) => (
              <input
                key={i}
                type="text"
                value={responses[id]?.[i] ?? ''}
                onChange={(e) => {
                  const next = [...(responses[id] ?? ['', '', ''])];
                  next[i] = e.target.value;
                  setBullets(id, next);
                }}
                placeholder={`Bullet ${i + 1}`}
                className="w-full worksheet-field text-sm"
                style={{ borderRadius: 0 }}
              />
            ))}
          </div>
        </div>
      ))}

      <button type="button" onClick={handleSave} className="btn-formal">
        {saved ? 'Saved' : 'Save Pushback Responses'}
      </button>
    </div>
  );
}
