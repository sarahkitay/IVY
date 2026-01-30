'use client';

import { useState, useEffect } from 'react';
import { RedTeam as RedTeamType, ModuleOutput } from '@/types';
import { useBusinessState } from '@/store/useBusinessState';

interface RedTeamProps {
  redTeam: RedTeamType;
  moduleOutput: ModuleOutput | undefined;
  onComplete: (response: string) => void;
}

const MIN_RESPONSE_LENGTH = 10;

export default function RedTeam({ redTeam, moduleOutput, onComplete }: RedTeamProps) {
  const savedResponse = moduleOutput?.redTeamResponse ?? '';
  const [response, setResponse] = useState(savedResponse);
  const [warnings, setWarnings] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(!!savedResponse?.trim());
  const { state } = useBusinessState();

  // Keep local state in sync with saved response (e.g. after submit or when loaded)
  useEffect(() => {
    if (savedResponse?.trim()) {
      setResponse(savedResponse);
      setSubmitted(true);
    }
  }, [savedResponse]);

  useEffect(() => {
    const newWarnings: string[] = [];

    redTeam.checks.forEach((check) => {
      if (!moduleOutput) return;

      if (check.type === 'value') {
        const val1 = moduleOutput.worksheets?.[check.field1]?.fields?.[check.field1];
        const val2 = moduleOutput.worksheets?.[check.field2]?.fields?.[check.field2];
        if (val1 && val2 && check.condition === 'premium-elasticity' && val1 === 'Premium Brand' && val2 === 'High') {
          newWarnings.push(check.message);
        }
      }

      if (check.type === 'logic' && check.condition === 'all-high') {
        const worksheet = moduleOutput.worksheets?.[check.field1];
        if (worksheet) {
          const copyabilityValues = Object.values(worksheet.fields).filter(
            (val) => typeof val === 'string' && val.toLowerCase().includes('high')
          );
          if (copyabilityValues.length > 0) newWarnings.push(check.message);
        }
      }

      if (check.type === 'consistency' && check.condition === 'all-high') {
        const worksheet = moduleOutput.worksheets?.[check.field1];
        if (worksheet) {
          const copyabilityValues = Object.values(worksheet.fields).filter(
            (val) => typeof val === 'string' && val.toLowerCase().includes('high')
          );
          if (copyabilityValues.length > 2) newWarnings.push(check.message);
        }
      }
    });

    setWarnings(newWarnings);
  }, [moduleOutput, redTeam.checks]);

  const handleResponseChange = (value: string) => {
    setResponse(value);
  };

  const handleSubmit = () => {
    const trimmed = response.trim();
    if (trimmed.length < MIN_RESPONSE_LENGTH) return;
    onComplete(trimmed);
    setSubmitted(true);
  };

  const canSubmit = response.trim().length >= MIN_RESPONSE_LENGTH;

  return (
    <div className="tier-a-dangerous mb-6">
      <h2 className="tier-1-gravitas text-xl mb-4">RED TEAM ATTACK</h2>
      <p className="tier-2-instruction text-lg mb-4">{redTeam.question}</p>

      {warnings.length > 0 && (
        <div className="red-team-warning mb-4">
          <p className="font-serif font-semibold text-oxblood mb-2 italic">Strategic Delusion Detected:</p>
          <ul className="list-disc list-inside space-y-1 text-oxblood">
            {warnings.map((warning, idx) => (
              <li key={idx} className="text-sm">{warning}</li>
            ))}
          </ul>
        </div>
      )}

      {submitted ? (
        <div className="border border-sage/40 bg-green-50/50 p-4" style={{ borderRadius: 0 }}>
          <p className="label-small-caps text-green-800 mb-2 font-semibold">✓ SUBMITTED</p>
          <p className="tier-2-instruction text-sm text-charcoal whitespace-pre-wrap">{response}</p>
        </div>
      ) : (
        <>
          <div className="mb-4">
            <label className="label-small-caps mb-2 block">YOUR RESPONSE</label>
            <textarea
              value={response}
              onChange={(e) => handleResponseChange(e.target.value)}
              className="w-full worksheet-field min-h-[150px]"
              placeholder="Address the attack directly. No hedging. What actually breaks?"
              style={{ minHeight: '120px' }}
              aria-label="Red Team response"
            />
            {response.trim().length > 0 && response.trim().length < MIN_RESPONSE_LENGTH && (
              <p className="field-feedback warning mt-2">
                At least {MIN_RESPONSE_LENGTH} characters required.
              </p>
            )}
            <p className="field-feedback mt-2 text-charcoal/60">
              Vague answers here correlate with weak pricing power.
            </p>
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={!canSubmit}
            className="btn-formal bg-oxblood hover:bg-oxblood/90 disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px] min-w-[140px]"
          >
            Enter Record
          </button>
        </>
      )}
    </div>
  );
}
