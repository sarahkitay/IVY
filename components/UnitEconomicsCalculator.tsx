'use client';

import { useState, useMemo } from 'react';
import { useBusinessState } from '@/store/useBusinessState';

interface UnitEconomicsInputs {
  cac: number;
  aov: number;
  grossMargin: number; // as percentage
  monthlyRetention: number; // as percentage
  refundRate?: number; // as percentage
  supportCost?: number; // per customer
}

export default function UnitEconomicsCalculator() {
  const { state, updateEconomicConstraints } = useBusinessState();
  
  const [inputs, setInputs] = useState<UnitEconomicsInputs>({
    cac: state.economicConstraints.unitEconomics?.price || 100,
    aov: state.economicConstraints.unitEconomics?.price || 100,
    grossMargin: 60,
    monthlyRetention: 95,
    refundRate: 5,
    supportCost: 0,
  });

  const [scenarios, setScenarios] = useState({
    cacIncrease: 0,
    priceChange: 0,
    retentionChange: 0,
    marginCompression: 0,
  });

  // Core calculations
  const calculations = useMemo(() => {
    const contributionMargin = inputs.aov * (inputs.grossMargin / 100);
    const netContribution = contributionMargin - (inputs.supportCost || 0);
    const monthlyChurn = 1 - (inputs.monthlyRetention / 100);
    const avgLifetime = monthlyChurn > 0 ? 1 / monthlyChurn : 50; // months
    const ltv = netContribution * avgLifetime;
    const ltvCacRatio = inputs.cac > 0 ? ltv / inputs.cac : 0;
    const paybackPeriod = netContribution > 0 ? inputs.cac / netContribution : 0;

    return {
      contributionMargin,
      netContribution,
      monthlyChurn: monthlyChurn * 100,
      avgLifetime,
      ltv,
      ltvCacRatio,
      paybackPeriod,
    };
  }, [inputs]);

  // Scenario calculations
  const scenarioResults = useMemo(() => {
    const scenarioCac = inputs.cac * (1 + scenarios.cacIncrease / 100);
    const scenarioAov = inputs.aov * (1 + scenarios.priceChange / 100);
    const scenarioMargin = inputs.grossMargin - scenarios.marginCompression;
    const scenarioRetention = inputs.monthlyRetention + scenarios.retentionChange;

    const scenarioContribution = scenarioAov * (scenarioMargin / 100) - (inputs.supportCost || 0);
    const scenarioChurn = 1 - (scenarioRetention / 100);
    const scenarioLifetime = scenarioChurn > 0 ? 1 / scenarioChurn : 50;
    const scenarioLtv = scenarioContribution * scenarioLifetime;
    const scenarioRatio = scenarioCac > 0 ? scenarioLtv / scenarioCac : 0;
    const scenarioPayback = scenarioContribution > 0 ? scenarioCac / scenarioContribution : 0;

    return {
      ltv: scenarioLtv,
      ratio: scenarioRatio,
      payback: scenarioPayback,
      status: scenarioRatio >= 3 ? 'safe' : scenarioRatio >= 1 ? 'fragile' : 'dangerous',
    };
  }, [inputs, scenarios]);

  const handleInputChange = (field: keyof UnitEconomicsInputs, value: number) => {
    setInputs((prev) => ({ ...prev, [field]: value }));
    
    // Auto-save to global state
    if (field === 'aov' || field === 'cac') {
      updateEconomicConstraints({
        unitEconomics: {
          price: inputs.aov,
          variableCosts: inputs.aov * (1 - inputs.grossMargin / 100),
          contributionMargin: calculations.contributionMargin,
        },
        ltvCac: {
          ltv: calculations.ltv,
          cac: inputs.cac,
          ratio: calculations.ltvCacRatio,
          paybackPeriod: calculations.paybackPeriod,
        },
      });
    }
  };

  const getStatusColor = (ratio: number) => {
    if (ratio >= 3) return 'text-green-600';
    if (ratio >= 1) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getStatusLabel = (ratio: number) => {
    if (ratio >= 3) return 'Safe to Scale';
    if (ratio >= 1) return 'Fragile';
    return 'Dangerous';
  };

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <div className="command-center p-6">
        <h3 className="font-serif text-xl mb-4">Unit Economics Inputs</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-charcoal mb-2">
              CAC (Customer Acquisition Cost)
            </label>
            <input
              type="number"
              value={inputs.cac}
              onChange={(e) => handleInputChange('cac', Number(e.target.value))}
              className="w-full worksheet-field"
              min="0"
              step="1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-charcoal mb-2">
              AOV (Average Order Value)
            </label>
            <input
              type="number"
              value={inputs.aov}
              onChange={(e) => handleInputChange('aov', Number(e.target.value))}
              className="w-full worksheet-field"
              min="0"
              step="1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-charcoal mb-2">
              Gross Margin %
            </label>
            <input
              type="number"
              value={inputs.grossMargin}
              onChange={(e) => handleInputChange('grossMargin', Number(e.target.value))}
              className="w-full worksheet-field"
              min="0"
              max="100"
              step="1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-charcoal mb-2">
              Monthly Retention %
            </label>
            <input
              type="number"
              value={inputs.monthlyRetention}
              onChange={(e) => handleInputChange('monthlyRetention', Number(e.target.value))}
              className="w-full worksheet-field"
              min="0"
              max="100"
              step="0.1"
            />
          </div>
        </div>
      </div>

      {/* Core Metrics */}
      <div className="command-center p-6">
        <h3 className="font-serif text-xl mb-4">Core Metrics</h3>
        <div className="grid grid-cols-3 gap-4 font-mono">
          <div>
            <p className="text-sm text-charcoal/60 mb-1">LTV (Contribution)</p>
            <p className="text-2xl font-semibold">${calculations.ltv.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-sm text-charcoal/60 mb-1">LTV:CAC Ratio</p>
            <p className={`text-2xl font-semibold ${getStatusColor(calculations.ltvCacRatio)}`}>
              {calculations.ltvCacRatio.toFixed(2)}x
            </p>
            <p className="text-xs text-charcoal/60 mt-1">{getStatusLabel(calculations.ltvCacRatio)}</p>
          </div>
          <div>
            <p className="text-sm text-charcoal/60 mb-1">Payback Period</p>
            <p className="text-2xl font-semibold">{calculations.paybackPeriod.toFixed(1)} months</p>
          </div>
          <div>
            <p className="text-sm text-charcoal/60 mb-1">Avg Lifetime</p>
            <p className="text-2xl font-semibold">{calculations.avgLifetime.toFixed(1)} months</p>
          </div>
          <div>
            <p className="text-sm text-charcoal/60 mb-1">Monthly Churn</p>
            <p className="text-2xl font-semibold">{calculations.monthlyChurn.toFixed(2)}%</p>
          </div>
          <div>
            <p className="text-sm text-charcoal/60 mb-1">Contribution Margin</p>
            <p className="text-2xl font-semibold">${calculations.contributionMargin.toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* Scenario Analysis */}
      <div className="command-center p-6">
        <h3 className="font-serif text-xl mb-4">Scenario Analysis</h3>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-charcoal mb-2">
              CAC Change: {scenarios.cacIncrease > 0 ? '+' : ''}{scenarios.cacIncrease}%
            </label>
            <input
              type="range"
              min="-50"
              max="100"
              value={scenarios.cacIncrease}
              onChange={(e) => setScenarios({ ...scenarios, cacIncrease: Number(e.target.value) })}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-charcoal mb-2">
              Price Change: {scenarios.priceChange > 0 ? '+' : ''}{scenarios.priceChange}%
            </label>
            <input
              type="range"
              min="-30"
              max="30"
              value={scenarios.priceChange}
              onChange={(e) => setScenarios({ ...scenarios, priceChange: Number(e.target.value) })}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-charcoal mb-2">
              Retention Change: {scenarios.retentionChange > 0 ? '+' : ''}{scenarios.retentionChange}%
            </label>
            <input
              type="range"
              min="-10"
              max="10"
              value={scenarios.retentionChange}
              onChange={(e) => setScenarios({ ...scenarios, retentionChange: Number(e.target.value) })}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-charcoal mb-2">
              Margin Compression: {scenarios.marginCompression}%
            </label>
            <input
              type="range"
              min="0"
              max="20"
              value={scenarios.marginCompression}
              onChange={(e) => setScenarios({ ...scenarios, marginCompression: Number(e.target.value) })}
              className="w-full"
            />
          </div>
        </div>

        {/* Scenario Results */}
        <div className="bg-parchment border border-sage/30 p-4" style={{ borderRadius: 0 }}>
          <h4 className="font-serif text-lg mb-3">Scenario Impact</h4>
          <div className="grid grid-cols-3 gap-4 font-mono">
            <div>
              <p className="text-sm text-charcoal/60 mb-1">Scenario LTV</p>
              <p className="text-xl font-semibold">${scenarioResults.ltv.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-charcoal/60 mb-1">Scenario LTV:CAC</p>
              <p className={`text-xl font-semibold ${getStatusColor(scenarioResults.ratio)}`}>
                {scenarioResults.ratio.toFixed(2)}x
              </p>
            </div>
            <div>
              <p className="text-sm text-charcoal/60 mb-1">Scenario Payback</p>
              <p className="text-xl font-semibold">{scenarioResults.payback.toFixed(1)} months</p>
            </div>
          </div>
          <div className="mt-4">
            <p className={`text-sm font-medium ${
              scenarioResults.status === 'safe' ? 'text-green-600' :
              scenarioResults.status === 'fragile' ? 'text-yellow-600' : 'text-red-600'
            }`}>
              Status: {scenarioResults.status === 'safe' ? '✓ Safe to Scale' :
                      scenarioResults.status === 'fragile' ? '⚠ Fragile' : '✗ Dangerous'}
            </p>
          </div>
        </div>
      </div>

      {/* Sensitivity Table */}
      <div className="command-center p-6">
        <h3 className="font-serif text-xl mb-4">Sensitivity Analysis</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-charcoal/20">
                <th className="text-left py-2">Metric</th>
                <th className="text-right py-2">Current</th>
                <th className="text-right py-2">+25% CAC</th>
                <th className="text-right py-2">-10% Price</th>
                <th className="text-right py-2">+10% Retention</th>
              </tr>
            </thead>
            <tbody className="font-mono">
              <tr>
                <td className="py-2">LTV</td>
                <td className="text-right">${calculations.ltv.toFixed(2)}</td>
                <td className="text-right">${(calculations.ltv / 1.25).toFixed(2)}</td>
                <td className="text-right">${(calculations.ltv * 0.9).toFixed(2)}</td>
                <td className="text-right text-green-600">${(calculations.ltv * 1.1).toFixed(2)}</td>
              </tr>
              <tr>
                <td className="py-2">LTV:CAC</td>
                <td className="text-right">{calculations.ltvCacRatio.toFixed(2)}x</td>
                <td className="text-right text-red-600">{(calculations.ltvCacRatio / 1.25).toFixed(2)}x</td>
                <td className="text-right text-red-600">{(calculations.ltvCacRatio * 0.9).toFixed(2)}x</td>
                <td className="text-right text-green-600">{(calculations.ltvCacRatio * 1.1).toFixed(2)}x</td>
              </tr>
              <tr>
                <td className="py-2">Payback</td>
                <td className="text-right">{calculations.paybackPeriod.toFixed(1)}m</td>
                <td className="text-right text-red-600">{(calculations.paybackPeriod * 1.25).toFixed(1)}m</td>
                <td className="text-right text-red-600">{(calculations.paybackPeriod * 1.11).toFixed(1)}m</td>
                <td className="text-right text-green-600">{(calculations.paybackPeriod * 0.9).toFixed(1)}m</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-charcoal/60 mt-4 italic">
          Which variable destroys the business fastest — and which saves it?
        </p>
      </div>
    </div>
  );
}
