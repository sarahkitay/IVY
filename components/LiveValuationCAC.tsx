'use client';

import { useBusinessState } from '@/store/useBusinessState';
import { getReactiveValuationAndCAC } from '@/utils/reactiveMetrics';

function formatCurrency(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(1)}k`;
  return `$${n}`;
}

export default function LiveValuationCAC() {
  const { state } = useBusinessState();
  const { valuation, cac, qualityIndex, quizIndex } = getReactiveValuationAndCAC(state);

  const qualityPct = Math.round(qualityIndex * 100);
  const quizPct = Math.round(quizIndex * 100);

  return (
    <div className="command-center p-6 border border-charcoal/20" style={{ borderRadius: 0 }}>
      <h3 className="font-serif text-xl mb-2">Valuation & CAC</h3>
      <p className="text-xs font-mono text-charcoal/60 mb-2">
        Reactive to answer quality and quiz performance. Better answers → higher valuation, lower CAC.
      </p>
      <p className="text-xs text-charcoal/50 mb-4 italic">
        This is a directional simulation, not a valuation engine.
      </p>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <p className="label-small-caps text-charcoal/60 mb-1">VALUATION</p>
          <p className="tier-1-gravitas text-2xl text-ink" style={{ fontVariantNumeric: 'tabular-nums' }}>
            {formatCurrency(valuation)}
          </p>
          <p className="tier-3-guidance text-xs mt-1">
            Answer quality: {qualityPct}% · Quiz: {quizPct}%
          </p>
        </div>
        <div>
          <p className="label-small-caps text-charcoal/60 mb-1">CAC</p>
          <p className="tier-1-gravitas text-2xl text-ink" style={{ fontVariantNumeric: 'tabular-nums' }}>
            ${cac}
          </p>
          <p className="tier-3-guidance text-xs mt-1">
            Lower with stronger answers and correct quizzes
          </p>
        </div>
      </div>
    </div>
  );
}
