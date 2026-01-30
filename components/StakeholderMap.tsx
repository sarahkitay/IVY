'use client';

import { useState } from 'react';
import { useBusinessState } from '@/store/useBusinessState';
import type { StakeholderEntry } from '@/types';

const DEFAULT_STAKEHOLDERS: Omit<StakeholderEntry, 'id'>[] = [
  { name: '', role: 'CEO', power: 5, incentiveAlignment: 0, vetoAbility: true, fearsLosing: '', wantsToGain: '' },
  { name: '', role: 'CFO', power: 5, incentiveAlignment: 0, vetoAbility: true, fearsLosing: '', wantsToGain: '' },
  { name: '', role: 'Head of Growth', power: 3, incentiveAlignment: 0, vetoAbility: false, fearsLosing: '', wantsToGain: '' },
  { name: '', role: 'Head of Product', power: 3, incentiveAlignment: 0, vetoAbility: false, fearsLosing: '', wantsToGain: '' },
];

export default function StakeholderMap() {
  const { state, replaceState } = useBusinessState();
  const existing = state.stakeholderMap ?? [];
  const [stakeholders, setStakeholders] = useState<StakeholderEntry[]>(
    existing.length > 0 ? existing : DEFAULT_STAKEHOLDERS.map((s, i) => ({ ...s, id: `sh-${i}` }))
  );
  const [saved, setSaved] = useState(false);

  const update = (id: string, updates: Partial<StakeholderEntry>) => {
    setStakeholders((prev) => prev.map((s) => (s.id === id ? { ...s, ...updates } : s)));
  };

  const handleSave = () => {
    replaceState({ stakeholderMap: stakeholders });
    setSaved(true);
  };

  return (
    <div className="space-y-6">
      <p className="label-small-caps text-charcoal/60 mb-2">
        Execution Under Incentives: Who loses if we win? Who wins if we fail? Where will sabotage look like &quot;execution issues&quot;?
      </p>

      {stakeholders.map((s) => (
        <div key={s.id} className="border border-charcoal/15 p-4 space-y-3" style={{ borderRadius: 0 }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Name (optional)"
              value={s.name}
              onChange={(e) => update(s.id, { name: e.target.value })}
              className="worksheet-field text-sm"
              style={{ borderRadius: 0 }}
            />
            <input
              type="text"
              placeholder="Role"
              value={s.role}
              onChange={(e) => update(s.id, { role: e.target.value })}
              className="worksheet-field text-sm"
              style={{ borderRadius: 0 }}
            />
          </div>
          <div className="flex flex-wrap gap-4 items-center">
            <label className="flex items-center gap-2 text-sm">
              Power (1–5):
              <select
                value={s.power}
                onChange={(e) => update(s.id, { power: Number(e.target.value) as 1 | 2 | 3 | 4 | 5 })}
                className="border border-charcoal/20 px-2 py-1"
              >
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </label>
            <label className="flex items-center gap-2 text-sm">
              Incentive alignment (−2 to +2):
              <select
                value={s.incentiveAlignment}
                onChange={(e) => update(s.id, { incentiveAlignment: Number(e.target.value) })}
                className="border border-charcoal/20 px-2 py-1"
              >
                {[-2, -1, 0, 1, 2].map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={s.vetoAbility}
                onChange={(e) => update(s.id, { vetoAbility: e.target.checked })}
              />
              Veto ability
            </label>
          </div>
          <div>
            <input
              type="text"
              placeholder="What they fear losing"
              value={s.fearsLosing}
              onChange={(e) => update(s.id, { fearsLosing: e.target.value })}
              className="w-full worksheet-field text-sm"
              style={{ borderRadius: 0 }}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="What they want to gain"
              value={s.wantsToGain}
              onChange={(e) => update(s.id, { wantsToGain: e.target.value })}
              className="w-full worksheet-field text-sm"
              style={{ borderRadius: 0 }}
            />
          </div>
        </div>
      ))}

      <div className="border-t border-charcoal/15 pt-4">
        <p className="tier-3-guidance text-xs text-charcoal/70 mb-2">
          Which team&apos;s KPIs conflict with this strategy? What must be true about culture for this to work? What changes in reporting/ownership are required?
        </p>
      </div>

      <button type="button" onClick={handleSave} className="btn-formal">
        {saved ? 'Saved' : 'Save Stakeholder Map'}
      </button>
    </div>
  );
}
