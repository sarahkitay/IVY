'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ScenarioData {
  price: number;
  retention: number; // as percentage
  cac: number;
}

export default function ScenarioSimulator() {
  const [scenario, setScenario] = useState<ScenarioData>({
    price: 100,
    retention: 0.95, // 95%
    cac: 50,
  });

  // Calculate Enterprise Value based on unit economics
  const enterpriseValue = useMemo(() => {
    const contributionMargin = scenario.price * 0.6; // Assume 60% margin
    const monthlyChurn = 1 - scenario.retention;
    const avgLifetime = monthlyChurn > 0 ? 1 / monthlyChurn : 50; // months
    const ltv = contributionMargin * avgLifetime;
    const ltvCacRatio = scenario.cac > 0 ? ltv / scenario.cac : 0;
    
    // Simplified EV calculation (LTV * scale factor - CAC)
    const scaleFactor = 1000; // hypothetical customer base
    const ev = (ltv * scaleFactor) - (scenario.cac * scaleFactor);
    
    return {
      ltv,
      ltvCacRatio,
      paybackPeriod: scenario.cac / contributionMargin,
      enterpriseValue: ev,
      contributionMargin,
    };
  }, [scenario]);

  // Generate sensitivity data
  const sensitivityData = useMemo(() => {
    const data = [];
    for (let i = -50; i <= 50; i += 5) {
      const priceChange = scenario.price * (1 + i / 100);
      const contributionMargin = priceChange * 0.6;
      const monthlyChurn = 1 - scenario.retention;
      const avgLifetime = monthlyChurn > 0 ? 1 / monthlyChurn : 50;
      const ltv = contributionMargin * avgLifetime;
      const ev = (ltv * 1000) - (scenario.cac * 1000);
      data.push({ change: i, value: ev });
    }
    return data;
  }, [scenario]);

  return (
    <div className="min-h-screen bg-cream p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="font-serif text-4xl text-ink mb-8">Scenario Simulator</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Controls */}
          <div className="lg:col-span-1 space-y-6">
            <div className="command-center p-6">
              <h2 className="font-serif text-xl mb-6">Parameters</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">
                    Price: ${scenario.price}
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="500"
                    value={scenario.price}
                    onChange={(e) => setScenario({ ...scenario, price: Number(e.target.value) })}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">
                    Monthly Retention: {(scenario.retention * 100).toFixed(1)}%
                  </label>
                  <input
                    type="range"
                    min="0.7"
                    max="0.99"
                    step="0.01"
                    value={scenario.retention}
                    onChange={(e) => setScenario({ ...scenario, retention: Number(e.target.value) })}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">
                    CAC: ${scenario.cac}
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="200"
                    value={scenario.cac}
                    onChange={(e) => setScenario({ ...scenario, cac: Number(e.target.value) })}
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            {/* Metrics Display */}
            <div className="command-center p-6">
              <h2 className="font-serif text-xl mb-4">Unit Economics</h2>
              <div className="space-y-3 font-mono text-sm">
                <div className="flex justify-between">
                  <span className="text-charcoal/70">LTV:</span>
                  <span className="font-semibold">${enterpriseValue.ltv.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-charcoal/70">LTV:CAC:</span>
                  <span className={`font-semibold ${
                    enterpriseValue.ltvCacRatio >= 3 ? 'text-green-600' : 
                    enterpriseValue.ltvCacRatio >= 1 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {enterpriseValue.ltvCacRatio.toFixed(2)}x
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-charcoal/70">Payback:</span>
                  <span className="font-semibold">{enterpriseValue.paybackPeriod.toFixed(1)} months</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-charcoal/20">
                  <span className="text-charcoal/70">Enterprise Value:</span>
                  <span className="font-semibold text-lg">
                    ${(enterpriseValue.enterpriseValue / 1000).toFixed(0)}K
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Chart */}
          <div className="lg:col-span-2">
            <div className="command-center p-6">
              <h2 className="font-serif text-xl mb-4">Price Sensitivity Analysis</h2>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={sensitivityData}>
                  {/* No grid lines - minimalist aesthetic */}
                  <XAxis 
                    dataKey="change" 
                    label={{ value: 'Price Change %', position: 'insideBottom', offset: -5 }}
                    stroke="#1a1a1a"
                    strokeWidth={2}
                    tick={{ fill: '#1a1a1a', fontSize: 11, fontFamily: 'JetBrains Mono' }}
                  />
                  <YAxis 
                    label={{ value: 'Enterprise Value', angle: -90, position: 'insideLeft' }}
                    stroke="#1a1a1a"
                    strokeWidth={2}
                    tick={{ fill: '#1a1a1a', fontSize: 11, fontFamily: 'JetBrains Mono' }}
                  />
                  <Tooltip 
                    formatter={(value: number) => `$${(value / 1000).toFixed(0)}K`}
                    labelFormatter={(label) => `${label}%`}
                    contentStyle={{ 
                      backgroundColor: '#faf8f3', 
                      border: '1px solid #1a1a1a',
                      borderRadius: 0,
                      fontFamily: 'JetBrains Mono',
                      fontSize: '11px'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#1a1a1a" 
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
              <p className="text-xs text-charcoal/60 mt-4">
                Shows how Enterprise Value changes as price varies ±50% from current setting.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-charcoal/20">
          <Link
            href="/"
            className="label-small-caps inline-flex items-center gap-2 text-charcoal/70 hover:text-ink border border-charcoal/20 px-4 py-2"
          >
            ← Back to home page
          </Link>
        </div>
      </div>
    </div>
  );
}
