'use client';

import { useState, useEffect, useRef } from 'react';
import { Worksheet as WorksheetType, WorksheetData } from '@/types';
import { useBusinessState } from '@/store/useBusinessState';
import { calculateDefensibility, AdvantageInputs, DefensibilityResult } from '@/utils/copyabilityCalculator';

interface WorksheetProps {
  worksheet: WorksheetType;
  moduleId: string;
  initialData?: WorksheetData;
  onUpdate: (data: WorksheetData) => void;
  isObserverMode?: boolean;
}

export default function Worksheet({ worksheet, moduleId, initialData, onUpdate, isObserverMode = false }: WorksheetProps) {
  const [fields, setFields] = useState<{ [key: string]: any }>(
    initialData?.fields || {}
  );
  const [defensibilityResult, setDefensibilityResult] = useState<DefensibilityResult | null>(null);
  const { updateModuleOutput } = useBusinessState();
  const prevFieldsRef = useRef<string>('');

  useEffect(() => {
    // Prevent infinite loops by checking if fields actually changed
    const fieldsString = JSON.stringify(fields);
    if (fieldsString === prevFieldsRef.current) {
      return;
    }
    prevFieldsRef.current = fieldsString;

    // Calculate defensibility for Advantage Decomposition worksheet
    if (worksheet.id === 'worksheet-1-1' && fields['advantage-source'] && fields['time-to-replicate'] && fields['founder-dependency'] && fields['replication-cost']) {
      const inputs: AdvantageInputs = {
        sources: Array.isArray(fields['advantage-source']) ? fields['advantage-source'] : [fields['advantage-source']],
        timeToReplicate: fields['time-to-replicate'],
        founderDependency: fields['founder-dependency'],
        replicationCost: fields['replication-cost'],
      };
      const result = calculateDefensibility(inputs);
      setDefensibilityResult(result);
    } else {
      setDefensibilityResult(null);
    }

    const worksheetData: WorksheetData = {
      worksheetId: worksheet.id,
      fields,
      completed: worksheet.fields.every((field) => {
        if (!field.required) return true;
        const value = fields[field.id];
        if (field.type === 'checkbox-group') {
          return Array.isArray(value) && value.length > 0;
        }
        return value !== undefined && value !== '' && value !== null;
      }),
    };

    onUpdate(worksheetData);

    // Update global state
    updateModuleOutput(moduleId, {
      worksheets: {
        [worksheet.id]: worksheetData,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fields, worksheet.id, moduleId]);

  const handleFieldChange = (fieldId: string, value: any) => {
    setFields((prev) => ({
      ...prev,
      [fieldId]: value,
    }));
  };

  return (
    <div className="command-center p-6 mb-6">
      <div className="mb-4">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="tier-2-instruction text-xl mb-2">{worksheet.title}</h3>
            <p className="tier-3-guidance text-sm">{worksheet.description}</p>
          </div>
          {isObserverMode && (
            <div className="command-center px-3 py-1">
              <p className="label-small-caps text-xs text-charcoal/60">READ-ONLY</p>
            </div>
          )}
        </div>
      </div>

      {worksheet.rules && worksheet.rules.length > 0 && (
        <div className="bg-parchment border border-sage/30 p-3 mb-4" style={{ borderRadius: 0 }}>
          <p className="text-xs font-medium text-charcoal/80 mb-1">Rule:</p>
          {worksheet.rules.map((rule, idx) => (
            <p key={idx} className="text-xs text-charcoal/70">{rule}</p>
          ))}
        </div>
      )}

      <div className="space-y-5">
        {worksheet.fields.map((field) => {
          // Generate provocative prompts based on field type/label
          const getProvocativePlaceholder = () => {
            if (field.placeholder) return field.placeholder;
            
            const labelLower = field.label.toLowerCase();
            if (labelLower.includes('job') || labelLower.includes('functional')) {
              return 'What must succeed for this customer to feel progress occurred?';
            }
            if (labelLower.includes('price') || labelLower.includes('pricing')) {
              return 'At what price point does this become irrational?';
            }
            if (labelLower.includes('competitor') || labelLower.includes('advantage')) {
              return 'What would make a competitor hesitate to copy this?';
            }
            if (labelLower.includes('assumption') || labelLower.includes('risk')) {
              return 'Which assumption, if wrong, kills this business?';
            }
            if (labelLower.includes('customer') || labelLower.includes('target')) {
              return 'Who are you willing to disappoint?';
            }
            return 'State facts only. No adjectives.';
          };

          const getMicroFeedback = (value: any) => {
            // Only show feedback if answer is vague or abstract
            if (!value || (typeof value === 'string' && value.length === 0) || (Array.isArray(value) && value.length === 0)) {
              return null; // Don't show feedback for empty fields
            }
            
            const text = typeof value === 'string' ? value.toLowerCase() : '';
            const abstractWords = ['better', 'premium', 'unique', 'special', 'great', 'good', 'nice', 'awesome', 'cool'];
            const isAbstract = abstractWords.some(word => text.includes(word));
            const isShort = typeof value === 'string' && text.length < 20;
            
            const labelLower = field.label.toLowerCase();
            if (labelLower.includes('job') || labelLower.includes('functional')) {
              if (isAbstract || isShort) {
                return 'Vague answers here correlate with weak pricing power.';
              }
            }
            if (labelLower.includes('price') || labelLower.includes('pricing')) {
              if (isAbstract || isShort) {
                return 'If you cannot justify this number, you cannot defend it.';
              }
            }
            if (labelLower.includes('competitor') || labelLower.includes('advantage')) {
              if (isAbstract || isShort) {
                return 'Generic advantages are not advantages.';
              }
            }
            if (labelLower.includes('assumption') || labelLower.includes('risk')) {
              if (isAbstract || isShort) {
                return 'Founders who skip this section usually blame execution later.';
              }
            }
            return null;
          };

          const feedback = getMicroFeedback(fields[field.id]);
          const hasValue = fields[field.id] !== undefined && fields[field.id] !== '' && fields[field.id] !== null && 
            !(Array.isArray(fields[field.id]) && fields[field.id].length === 0);
          const isEmpty = !hasValue && field.required;

          return (
            <div key={field.id}>
              <label className="label-small-caps mb-2 block">
                {field.label.toUpperCase()}
                {field.required && <span className="text-oxblood ml-1">*</span>}
              </label>
              
              {field.type === 'textarea' && (
                <>
                  <textarea
                    value={fields[field.id] || ''}
                    onChange={(e) => handleFieldChange(field.id, e.target.value)}
                    className="w-full worksheet-field min-h-[120px]"
                    placeholder={getProvocativePlaceholder()}
                    style={{ borderRadius: 0 }}
                  />
                  {feedback && (
                    <p className={`field-feedback ${isEmpty ? 'warning' : ''} mt-2`}>
                      {feedback}
                    </p>
                  )}
                </>
              )}
              
              {field.type === 'text' && (
                <>
                  <input
                    type="text"
                    value={fields[field.id] || ''}
                    onChange={(e) => handleFieldChange(field.id, e.target.value)}
                    disabled={isObserverMode}
                    className="w-full worksheet-field"
                    placeholder={getProvocativePlaceholder()}
                    style={{ borderRadius: 0 }}
                  />
                  {feedback && (
                    <p className={`field-feedback ${isEmpty ? 'warning' : ''} mt-2`}>
                      {feedback}
                    </p>
                  )}
                </>
              )}
              
              {field.type === 'number' && (
                <>
                  <input
                    type="number"
                    value={fields[field.id] || ''}
                    onChange={(e) => handleFieldChange(field.id, Number(e.target.value))}
                    className="w-full worksheet-field"
                    placeholder={getProvocativePlaceholder()}
                    style={{ borderRadius: 0 }}
                  />
                  {feedback && (
                    <p className={`field-feedback ${isEmpty ? 'warning' : ''} mt-2`}>
                      {feedback}
                    </p>
                  )}
                </>
              )}
              
              {field.type === 'select' && (
                <>
                  <select
                    value={fields[field.id] || ''}
                    onChange={(e) => handleFieldChange(field.id, e.target.value)}
                    disabled={isObserverMode}
                    className="w-full worksheet-field"
                    style={{ borderRadius: 0 }}
                  >
                    <option value="">Select...</option>
                    {field.options?.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  {feedback && (
                    <p className={`field-feedback ${isEmpty ? 'warning' : ''} mt-2`}>
                      {feedback}
                    </p>
                  )}
                </>
              )}
              
              {field.type === 'checkbox' && (
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={fields[field.id] || false}
                    onChange={(e) => handleFieldChange(field.id, e.target.checked)}
                    className="w-4 h-4"
                    style={{ borderRadius: 0 }}
                  />
                  <span className="text-sm text-charcoal/70">{field.label}</span>
                </div>
              )}
              
              {field.type === 'checkbox-group' && (
                <div className="space-y-2">
                  {field.options?.map((option) => (
                    <div key={option} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={Array.isArray(fields[field.id]) && fields[field.id].includes(option)}
                        onChange={(e) => {
                          const current = Array.isArray(fields[field.id]) ? fields[field.id] : [];
                          const updated = e.target.checked
                            ? [...current, option]
                            : current.filter((v: string) => v !== option);
                          handleFieldChange(field.id, updated);
                        }}
                        disabled={isObserverMode}
                        className="w-4 h-4"
                        style={{ borderRadius: 0 }}
                      />
                      <span className="text-sm text-charcoal/70">{option}</span>
                    </div>
                  ))}
                  {field.placeholder && (
                    <p className="tier-3-guidance text-xs mt-2">{field.placeholder}</p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      {/* Defensibility Result Display */}
      {defensibilityResult && (
        <div className="mt-6 pt-6 border-t border-charcoal/20">
          <div className="vertical-rule pl-4">
            <p className="label-small-caps mb-3 text-charcoal/70">SYSTEM INFERENCE</p>
            <div className="space-y-3">
              <div>
                <p className="tier-1-gravitas text-lg mb-1">
                  {defensibilityResult.level}
                </p>
                <p className="tier-2-instruction text-sm long-text">
                  {defensibilityResult.reasoning}
                </p>
              </div>
              {defensibilityResult.warnings.length > 0 && (
                <div className="mt-4">
                  {defensibilityResult.warnings.map((warning, idx) => (
                    <p key={idx} className="tier-3-guidance text-xs mb-1">
                      ⚠️ {warning}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
