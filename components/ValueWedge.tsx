'use client';

import { useState, useMemo } from 'react';
import { useBusinessState } from '@/store/useBusinessState';

export default function ValueWedge() {
  const { state, updateEconomicConstraints } = useBusinessState();
  
  const [price, setPrice] = useState(state.economicConstraints.unitEconomics?.price || 100);
  const [cost, setCost] = useState(
    state.economicConstraints.unitEconomics?.price 
      ? state.economicConstraints.unitEconomics.price - (state.economicConstraints.unitEconomics.contributionMargin || 0)
      : 40
  );

  const wedge = useMemo(() => {
    const contributionMargin = price - cost;
    const wedgeHeight = Math.max(0, contributionMargin);
    const wedgePercentage = price > 0 ? (wedgeHeight / price) * 100 : 0;
    
    return {
      price,
      cost,
      contributionMargin: wedgeHeight,
      wedgePercentage,
    };
  }, [price, cost]);

  const handlePriceChange = (newPrice: number) => {
    setPrice(newPrice);
    updateEconomicConstraints({
      unitEconomics: {
        price: newPrice,
        variableCosts: cost,
        contributionMargin: newPrice - cost,
      },
    });
  };

  const handleCostChange = (newCost: number) => {
    setCost(newCost);
    updateEconomicConstraints({
      unitEconomics: {
        price,
        variableCosts: newCost,
        contributionMargin: price - newCost,
      },
    });
  };

  // SVG dimensions
  const width = 400;
  const height = 300;
  const maxValue = Math.max(price, 200);
  const priceY = height - (price / maxValue) * (height - 40);
  const costY = height - (cost / maxValue) * (height - 40);
  const wedgeTop = Math.min(priceY, costY);
  const wedgeBottom = height;

  return (
    <div className="command-center p-6">
      <h3 className="font-serif text-xl mb-4">Value Wedge (Live)</h3>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-charcoal mb-2">
            Price: ${price}
          </label>
          <input
            type="range"
            min="10"
            max="500"
            value={price}
            onChange={(e) => handlePriceChange(Number(e.target.value))}
            className="w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-charcoal mb-2">
            Cost: ${cost}
          </label>
          <input
            type="range"
            min="0"
            max={price - 1}
            value={cost}
            onChange={(e) => handleCostChange(Number(e.target.value))}
            className="w-full"
          />
        </div>
      </div>

      {/* SVG Value Wedge */}
      <div className="flex justify-center">
        <svg width={width} height={height} className="border border-charcoal/20" style={{ borderRadius: 0 }}>
          {/* No grid lines - minimalist aesthetic */}

          {/* Price line with CSS transition */}
          <line
            x1="60"
            y1={priceY}
            x2={width - 20}
            y2={priceY}
            stroke="#1a1a1a"
            strokeWidth="3"
            style={{ transition: 'all 0.3s ease-out' }}
          />
          <text
            x="50"
            y={priceY + 4}
            className="font-mono text-xs fill-charcoal"
            textAnchor="end"
          >
            ${price}
          </text>
          <text
            x={width / 2}
            y={priceY - 5}
            className="font-mono text-xs fill-charcoal"
            textAnchor="middle"
          >
            Customer WTP
          </text>

          {/* Cost line with CSS transition */}
          <line
            x1="60"
            y1={costY}
            x2={width - 20}
            y2={costY}
            stroke="#8b9a7a"
            strokeWidth="3"
            style={{ transition: 'all 0.3s ease-out' }}
          />
          <text
            x="50"
            y={costY + 4}
            className="font-mono text-xs fill-sage"
            textAnchor="end"
          >
            ${cost}
          </text>
          <text
            x={width / 2}
            y={costY + 15}
            className="font-mono text-xs fill-sage"
            textAnchor="middle"
          >
            Cost
          </text>

          {/* Value Wedge (filled area) - Muted sage with CSS transition */}
          <polygon
            points={`60,${priceY} ${width - 20},${priceY} ${width - 20},${costY} 60,${costY}`}
            fill="#8b9a7a"
            fillOpacity="0.2"
            style={{ transition: 'all 0.3s ease-out' }}
          />
          
          {/* Wedge label */}
          <text
            x={width / 2}
            y={(priceY + costY) / 2}
            className="font-mono text-sm font-semibold fill-ink"
            textAnchor="middle"
          >
            Value Wedge
          </text>
          <text
            x={width / 2}
            y={(priceY + costY) / 2 + 15}
            className="font-mono text-xs fill-charcoal/70"
            textAnchor="middle"
          >
            ${wedge.contributionMargin.toFixed(2)} ({wedge.wedgePercentage.toFixed(1)}%)
          </text>

          {/* Y-axis label */}
          <text
            x="20"
            y={height / 2}
            className="font-mono text-xs fill-charcoal/60"
            textAnchor="middle"
            transform={`rotate(-90, 20, ${height / 2})`}
          >
            Value ($)
          </text>
        </svg>
      </div>

      <div className="mt-4 text-center">
        <p className="font-mono text-sm text-charcoal/70">
          Contribution Margin: <span className="font-semibold text-ink">${wedge.contributionMargin.toFixed(2)}</span>
        </p>
        <p className="font-mono text-xs text-charcoal/60 mt-1">
          Wedge Percentage: {wedge.wedgePercentage.toFixed(1)}%
        </p>
      </div>
    </div>
  );
}
