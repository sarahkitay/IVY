'use client';

import { useState } from 'react';
import { useBusinessState } from '@/store/useBusinessState';

const DEFENSE_QUESTIONS = [
  { id: 'fail', question: 'What would have to be true for this to fail?' },
  { id: 'counter', question: 'What is the strongest counterargument?' },
  { id: 'data', question: 'What data would change your mind?' },
];

export default function ColdCallDefense() {
  const { state, replaceState } = useBusinessState();
  const existing = state.coldCallDefenseResponses ?? {};
  const [responses, setResponses] = useState<Record<string, string>>({
    fail: existing.fail ?? '',
    counter: existing.counter ?? '',
    data: existing.data ?? '',
  });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    replaceState({ coldCallDefenseResponses: responses });
    setSaved(true);
  };

  if (!state.strategyNote?.thesis?.trim()) {
    return (
      <div className="mt-6 p-4 border border-charcoal/15 bg-parchment/20" style={{ borderRadius: 0 }}>
        <p className="label-small-caps text-charcoal/60 mb-2">COLD CALL DEFENSE</p>
        <p className="tier-3-guidance text-sm text-charcoal/70">
          Save your Strategy Note first. Then return here to answer three follow-up challenges.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8 pt-6 border-t border-charcoal/20">
      <p className="label-small-caps text-charcoal/60 mb-2">COLD CALL DEFENSE</p>
      <p className="tier-3-guidance text-sm text-charcoal/80 mb-4">
        After memo submission: defend your strategy under pressure. Answer each in 1–2 sentences.
      </p>
      <div className="space-y-4">
        {DEFENSE_QUESTIONS.map(({ id, question }) => (
          <div key={id} className="border-l-2 border-oxblood/50 pl-4 py-2">
            <p className="tier-2-instruction text-sm font-medium text-ink mb-2">{question}</p>
            <textarea
              value={responses[id] ?? ''}
              onChange={(e) => setResponses((r) => ({ ...r, [id]: e.target.value }))}
              placeholder="Your response…"
              className="w-full worksheet-field min-h-[72px] text-sm"
              style={{ borderRadius: 0 }}
            />
          </div>
        ))}
      </div>
      <button type="button" onClick={handleSave} className="btn-formal mt-4">
        {saved ? 'Saved' : 'Save Defense Responses'}
      </button>
    </div>
  );
}
