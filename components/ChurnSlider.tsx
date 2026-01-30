'use client';

import { useState, useMemo } from 'react';

interface ChurnSliderProps {
  initialChurn?: number;
  onChurnChange?: (churn: number, ltv: number, evMultiplier: number) => void;
}

export default function ChurnSlider({ initialChurn = 5, onChurnChange }: ChurnSliderProps) {
  const [churn, setChurn] = useState(initialChurn);

  const calculations = useMemo(() => {
    const monthlyChurn = churn / 100;
    const avgLifetime = monthlyChurn > 0 ? 1 / monthlyChurn : 50;
    const contributionMargin = 60; // Assume $60 contribution margin
    const ltv = contributionMargin * avgLifetime;
    
    // Enterprise value multiplier (simplified)
    const baseLtv = 60 * 20; // Base LTV at 5% churn
    const evMultiplier = ltv / baseLtv;
    
    return {
      churn,
      avgLifetime,
      ltv,
      evMultiplier,
    };
  }, [churn]);

  const handleChurnChange = (newChurn: number) => {
    setChurn(newChurn);
    if (onChurnChange) {
      onChurnChange(
        newChurn,
        calculations.ltv,
        calculations.evMultiplier
      );
    }
  };

  return (
    <div className="command-center p-6">
      <h3 className="font-serif text-xl mb-4">Churn Impact Simulator</h3>
      <p className="text-sm text-charcoal/70 mb-4">
        Drag the churn slider to see your Enterprise Value collapse or expand.
      </p>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-charcoal mb-2">
          Monthly Churn: {churn}%
        </label>
        <input
          type="range"
          min="1"
          max="15"
          step="0.1"
          value={churn}
          onChange={(e) => handleChurnChange(Number(e.target.value))}
          className="w-full"
        />
      </div>

      <div className="grid grid-cols-3 gap-4 font-mono">
        <div>
          <p className="text-xs text-charcoal/60 mb-1">Avg Lifetime</p>
          <p className="text-2xl font-semibold">{calculations.avgLifetime.toFixed(1)} months</p>
        </div>
        <div>
          <p className="text-xs text-charcoal/60 mb-1">LTV</p>
          <p className="text-2xl font-semibold">${calculations.ltv.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-xs text-charcoal/60 mb-1">EV Multiplier</p>
          <p className={`text-2xl font-semibold ${
            calculations.evMultiplier >= 1 ? 'text-green-600' : 'text-red-600'
          }`}>
            {calculations.evMultiplier.toFixed(2)}x
          </p>
        </div>
      </div>

      {calculations.evMultiplier < 0.8 && (
        <div className="mt-4 p-3 bg-red-50 border border-oxblood/30" style={{ borderRadius: 0 }}>
          <p className="text-sm text-red-800 font-medium">
            ⚠️ Enterprise Value collapsing: {((1 - calculations.evMultiplier) * 100).toFixed(1)}% below baseline
          </p>
        </div>
      )}
    </div>
  );
}
