'use client';

import { useEffect, useState } from 'react';
import { ModuleOutput } from '@/types';
import { Module } from '@/types';

interface ValidationRule {
  type: string;
  field1: string;
  field2?: string;
  condition: string;
  message: string;
}

interface RedTeamValidatorProps {
  moduleOutput: ModuleOutput | undefined;
  moduleData: Module;
}

export default function RedTeamValidator({ moduleOutput, moduleData }: RedTeamValidatorProps) {
  const [violations, setViolations] = useState<string[]>([]);

  useEffect(() => {
    if (!moduleOutput || !moduleData.redTeam?.checks) {
      setViolations([]);
      return;
    }

    const newViolations: string[] = [];
    const rules = moduleData.redTeam.checks as ValidationRule[];

    rules.forEach((rule) => {
      const val1 = moduleOutput.worksheets?.[rule.field1]?.fields?.[rule.field1] ||
                   moduleOutput.requiredOutputs?.[rule.field1];
      const val2 = rule.field2 
        ? (moduleOutput.worksheets?.[rule.field2]?.fields?.[rule.field2] ||
           moduleOutput.requiredOutputs?.[rule.field2])
        : null;

      let isViolation = false;

      switch (rule.condition) {
        case 'premium-elasticity':
          // Premium brand but high price elasticity is incoherent
          if (val1 === 'Premium Brand' && val2 === 'High') {
            isViolation = true;
          }
          break;
        case 'no-differentiation-high-price':
          // High price without differentiation
          if (val1 === 'High' && !val2) {
            isViolation = true;
          }
          break;
        case 'all-high':
        case 'all-high-copyability':
          // All advantages are highly copyable
          if (val1 && typeof val1 === 'string' && val1.toLowerCase().includes('high')) {
            const worksheet = moduleOutput.worksheets?.[rule.field1];
            if (worksheet) {
              const copyabilityValues = Object.values(worksheet.fields).filter(
                (v) => typeof v === 'string' && v.toLowerCase().includes('high')
              );
              if (copyabilityValues.length > 2) {
                isViolation = true;
              }
            }
          }
          break;
        case 'consistency':
          // Check for strategic consistency
          if (val1 && val2 && typeof val1 === 'string' && typeof val2 === 'string') {
            // Example: Premium pricing requires differentiation
            if (val1.toLowerCase().includes('premium') && 
                (val2.toLowerCase().includes('none') || val2.toLowerCase().includes('low'))) {
              isViolation = true;
            }
          }
          break;
      }

      if (isViolation) {
        newViolations.push(rule.message);
      }
    });

    setViolations(newViolations);
  }, [moduleOutput, moduleData]);

  if (violations.length === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-40 max-w-md">
      {violations.map((violation, idx) => (
        <div
          key={idx}
          className="bg-oxblood text-white p-4 shadow-xl mb-3 animate-slide-up border-l-4 border-white/20"
          style={{ borderRadius: 0 }}
        >
          <div className="flex items-start gap-3">
            <span className="text-xl">⚔️</span>
            <div>
              <p className="font-serif font-semibold mb-1 text-sm uppercase tracking-wide">
                Strategic Incoherence Detected
              </p>
              <p className="text-sm leading-relaxed">{violation}</p>
              <p className="text-xs mt-2 opacity-80 font-mono">
                Refactor now?
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
