'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useCallback } from 'react';
import { getModuleById } from '@/data/all-modules';
import { useBusinessState } from '@/store/useBusinessState';
import { useProgress } from '@/store/useProgress';
import Worksheet from '@/components/Worksheet';
import ColdCall from '@/components/ColdCall';
import RedTeam from '@/components/RedTeam';
import UnitEconomicsCalculator from '@/components/UnitEconomicsCalculator';
import DependencyWarning from '@/components/DependencyWarning';
import RedTeamValidator from '@/components/RedTeamValidator';
import ChurnSlider from '@/components/ChurnSlider';
import HindsightGraph from '@/components/HindsightGraph';
import FiveCsFramework from '@/components/FiveCsFramework';
import ModuleQuiz from '@/components/ModuleQuiz';
import { WorksheetData } from '@/types';
import { getCaseStudyById } from '@/data/caseStudies';

export default function ModulePage() {
  const params = useParams();
  const router = useRouter();
  const moduleId = params.id as string;
  const moduleData = getModuleById(moduleId);
  
  const { state, updateModuleOutput } = useBusinessState();
  const { progress, completeModule } = useProgress();
  
  const [showColdCall, setShowColdCall] = useState(false);
  const [coldCallCompleted, setColdCallCompleted] = useState(false);
  const [worksheetData, setWorksheetData] = useState<{ [key: string]: WorksheetData }>({});

  const handleWorksheetUpdate = useCallback((data: WorksheetData) => {
    setWorksheetData((prev) => ({
      ...prev,
      [data.worksheetId]: data,
    }));
  }, []);

  if (!moduleData) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif text-2xl mb-4">Module not found</h1>
          <button
            onClick={() => router.push('/')}
            className="bg-ink text-white px-6 py-3 rounded-sm hover:bg-charcoal"
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  const moduleOutput = state.moduleOutputs[moduleId];
  const isUnlocked = progress.unlockedModules.includes(moduleId);
  const isCompleted = progress.completedModules.includes(moduleId);

  const handleColdCallComplete = (response: string) => {
    setColdCallCompleted(true);
    updateModuleOutput(moduleId, {
      coldCallResponse: response,
    });
  };

  const handleRedTeamComplete = (response: string) => {
    updateModuleOutput(moduleId, {
      redTeamResponse: response,
    });
  };

  const handleCompleteModule = () => {
    // Observer mode cannot complete modules
    if (state.applicationContext?.type === 'observer') {
      alert('Observer Mode is read-only. You cannot complete modules. Switch to an active context to apply frameworks.');
      return;
    }

    // All worksheets must be completed for this module
    const allWorksheetsComplete = moduleData.worksheets.every((ws) => {
      const data = worksheetData[ws.id] ?? state.moduleOutputs[moduleId]?.worksheets?.[ws.id];
      return data?.completed === true;
    });

    // Required outputs: either from worksheet (source) or from direct moduleOutput; if no source, satisfied when all worksheets are complete
    const allOutputsPresent = moduleData.requiredOutputs.every((req) => {
      if (req.source) {
        const worksheet = worksheetData[req.source] ?? state.moduleOutputs[moduleId]?.worksheets?.[req.source];
        const val = worksheet.fields?.[req.id];
        return Boolean(worksheet?.completed && val !== undefined && val !== '' && (Array.isArray(val) ? (val as unknown[]).length > 0 : true));
      }
      // No source: accept if we have it in moduleOutput, or if all worksheets are complete (worksheet-driven modules)
      if (moduleOutput?.requiredOutputs?.[req.id] !== undefined && moduleOutput.requiredOutputs[req.id] !== '') return true;
      return allWorksheetsComplete;
    });

    if (allWorksheetsComplete && allOutputsPresent) {
      completeModule(moduleId);
      router.push('/');
    } else {
      alert('Please complete all diagnostics and required outputs before advancing.');
    }
  };

  if (!isUnlocked) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif text-2xl mb-4">Module Locked</h1>
          <p className="text-charcoal/70 mb-6">
            Complete the previous module to unlock this one.
          </p>
          <button
            onClick={() => router.push('/')}
            className="bg-ink text-white px-6 py-3 rounded-sm hover:bg-charcoal"
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      {showColdCall && moduleData.coldCall && (
        <ColdCall
          coldCall={moduleData.coldCall}
          onComplete={handleColdCallComplete}
          onClose={() => setShowColdCall(false)}
        />
      )}

      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.push('/')}
            className="text-charcoal/60 hover:text-ink mb-4 text-sm"
          >
            ← Back to Modules
          </button>
          <div className="label-small-caps mb-2">
            {moduleData.pillar === 'pillar-1' ? 'PILLAR I' : moduleData.pillar === 'pillar-2' ? 'PILLAR II' : 'PILLAR III'} — MODULE {moduleData.order}
          </div>
          <h1 className="tier-1-gravitas text-4xl mb-4">{moduleData.title}</h1>
          <div className="tier-a mb-6">
            <p className="tier-2-instruction text-lg long-text">{moduleData.thesis}</p>
          </div>
          
          {/* Module Progress Bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="label-small-caps">COMPLETION</span>
              <span className="font-mono text-xs text-charcoal/60">
                {Math.round((moduleData.requiredOutputs.filter((req) => {
                  const isComplete = req.source
                    ? worksheetData[req.source]?.fields?.[req.id] !== undefined
                    : moduleOutput?.requiredOutputs?.[req.id] !== undefined;
                  return isComplete;
                }).length / moduleData.requiredOutputs.length) * 100)}%
              </span>
            </div>
            <div className="module-progress">
              <div 
                className="module-progress-fill"
                style={{ 
                  width: `${(moduleData.requiredOutputs.filter((req) => {
                    const isComplete = req.source
                      ? worksheetData[req.source]?.fields?.[req.id] !== undefined
                      : moduleOutput?.requiredOutputs?.[req.id] !== undefined;
                    return isComplete;
                  }).length / moduleData.requiredOutputs.length) * 100}%` 
                }}
              />
            </div>
            {moduleData.requiredOutputs.some((req) => {
              const isComplete = req.source
                ? worksheetData[req.source]?.fields?.[req.id] !== undefined
                : moduleOutput?.requiredOutputs?.[req.id] !== undefined;
              return !isComplete;
            }) && (
              <p className="incomplete-warning mt-2">
                Founders who skip this section usually blame execution later.
              </p>
            )}
          </div>
        </div>

        {/* Why This Exists - No box, inline flow */}
        <div className="mb-8">
          <h2 className="tier-2-instruction text-xl mb-4">WHY THIS MODULE EXISTS</h2>
          <div className="space-y-6 long-text">
            <div className="vertical-rule">
              <p className="label-small-caps mb-2 text-charcoal/50">ACADEMIC</p>
              <p className="tier-2-instruction text-base leading-relaxed">{moduleData.whyExists.academic}</p>
            </div>
            <div className="vertical-rule">
              <p className="label-small-caps mb-2 text-charcoal/50">OPERATOR</p>
              <p className="tier-2-instruction text-base leading-relaxed">{moduleData.whyExists.operator}</p>
            </div>
          </div>
        </div>

        {/* Frameworks */}
        {moduleData.frameworks.map((framework) => (
          <div key={framework.id} className="mb-8">
            <h2 className="tier-2-instruction text-xl mb-2">{framework.title}</h2>
            <p className="tier-3-guidance mb-4">{framework.description}</p>
            
            {/* Special handling for 5Cs Framework */}
            {framework.id === 'framework-1-1' ? (
              <FiveCsFramework content={framework.content} />
            ) : (
              <div className="border border-charcoal/20 p-4 mb-4" style={{ borderRadius: 0, boxShadow: 'none' }}>
                <pre className="font-mono text-sm whitespace-pre-wrap text-charcoal leading-relaxed">
                  {framework.content}
                </pre>
              </div>
            )}
            {framework.operatorWarning && (
              <div className="vertical-rule mb-4">
                <p className="font-mono text-xs font-bold text-charcoal mb-3 warning-flash tracking-widest uppercase">
                  WARNING
                </p>
                <p className="font-mono text-base font-medium text-charcoal leading-relaxed whitespace-pre-wrap tracking-tight">
                  {framework.operatorWarning}
                </p>
              </div>
            )}
          </div>
        ))}

        {/* Interactive Calculator for P3 Module 1 */}
        {moduleId === 'p3-module-1' && (
          <div className="mb-8">
            <h2 className="font-serif text-2xl mb-6">Interactive Unit Economics Model</h2>
            <UnitEconomicsCalculator />
          </div>
        )}

        {/* Churn Slider for P3 Module 5 */}
        {moduleId === 'p3-module-5' && (
          <div className="mb-8">
            <h2 className="font-serif text-2xl mb-6">Quant Walkthrough: Churn Impact</h2>
            <ChurnSlider />
          </div>
        )}

        {/* Diagnostics */}
        <div className="mb-8">
          <h2 className="tier-2-instruction text-xl mb-6">DIAGNOSTICS</h2>
          {moduleData.worksheets.map((worksheet) => {
            // Get pre-filled data for Observer Mode or Case Studies
            let initialData = moduleOutput?.worksheets?.[worksheet.id];
            if (state.applicationContext?.type === 'observer' || state.applicationContext?.type === 'case-study') {
              const caseStudy = state.applicationContext.type === 'case-study' 
                ? getCaseStudyById(state.applicationContext.caseId)
                : null;
              const prefillData = caseStudy?.prefillData?.[moduleId]?.[worksheet.id];
              if (prefillData) {
                initialData = {
                  ...initialData,
                  fields: {
                    ...initialData?.fields,
                    ...prefillData,
                  },
                };
              }
            }
            
            return (
              <Worksheet
                key={worksheet.id}
                worksheet={worksheet}
                moduleId={moduleId}
                initialData={initialData}
                onUpdate={handleWorksheetUpdate}
                isObserverMode={state.applicationContext?.type === 'observer'}
              />
            );
          })}
        </div>

        {/* Cold Call - Dangerous Tier A */}
        {moduleData.coldCall && (
          <div className="mb-8">
            {!coldCallCompleted && !moduleOutput?.coldCallResponse ? (
              <button
                onClick={() => setShowColdCall(true)}
                className="w-full tier-a-dangerous hover:bg-parchment/80 transition-all text-left"
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl mt-1">⏱</span>
                  <div className="flex-1">
                    <h3 className="tier-1-gravitas text-xl mb-3">COLD CALL</h3>
                    <p className="tier-2-instruction text-lg mb-3">{moduleData.coldCall.question}</p>
                    <p className="tier-3-guidance mt-3">
                      {moduleData.coldCall.timeLimit} seconds remaining. No hedging.
                    </p>
                  </div>
                </div>
              </button>
            ) : (
              <div className="command-center p-6 bg-green-50 border-green-200" style={{ borderRadius: 0 }}>
                <p className="font-medium text-green-800 mb-2">✓ Cold Call Completed</p>
                <p className="text-sm text-green-700">{moduleOutput?.coldCallResponse}</p>
              </div>
            )}
          </div>
        )}

        {/* Red Team */}
        {moduleData.redTeam && (
          <div className="mb-8">
            <RedTeam
              redTeam={moduleData.redTeam}
              moduleOutput={moduleOutput}
              onComplete={handleRedTeamComplete}
            />
          </div>
        )}

        {/* Board Lens - Vertical rule motif */}
        {moduleData.boardLens && (
          <div className="vertical-rule mb-8">
            <h3 className="label-small-caps mb-3 text-charcoal/70">BOARD LENS</h3>
            <p className="tier-2-instruction text-base long-text">{moduleData.boardLens}</p>
          </div>
        )}

        {/* Required Outputs */}
        <div className="mb-8">
          <h3 className="tier-2-instruction text-lg mb-4">REQUIRED OUTPUTS TO ADVANCE</h3>
          <ul className="space-y-3">
            {moduleData.requiredOutputs.map((req) => {
              const isComplete = req.source
                ? worksheetData[req.source]?.fields?.[req.id] !== undefined
                : moduleOutput?.requiredOutputs?.[req.id] !== undefined;
              
              // Rotate between "UNPROVEN" and "NOT DEFENSIBLE" for incomplete
              const incompleteLabels = ['UNPROVEN', 'NOT DEFENSIBLE'];
              const incompleteLabel = incompleteLabels[moduleData.requiredOutputs.indexOf(req) % 2];
              
              return (
                <li key={req.id} className="flex items-start gap-3">
                  {isComplete ? (
                    <span className="incomplete-flag board-ready status-change mt-0">
                      <span className="text-green-700">✓</span>
                      <span className="label-small-caps text-green-700">BOARD-READY</span>
                    </span>
                  ) : (
                    <span className="incomplete-flag mt-0">
                      <span className="text-orange-600">○</span>
                      <span className="label-small-caps text-orange-700">{incompleteLabel}</span>
                    </span>
                  )}
                  <span className={`${isComplete ? 'text-charcoal/70' : 'text-charcoal font-medium'} long-text`}>
                    {req.label}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Post-module quiz (Ivy syllabus key concepts) */}
        <ModuleQuiz moduleId={moduleId} />

        {/* Hindsight Graph (future projections) */}
        <HindsightGraph currentModuleId={moduleId} />
        
        {/* Red Team Validator (floating notifications) */}
        <RedTeamValidator
          moduleOutput={moduleOutput}
          moduleData={moduleData}
        />

        {/* Complete Button */}
        <div className="flex justify-end gap-4">
          <button
            onClick={() => router.push('/')}
            className="btn-formal bg-charcoal/10 text-ink hover:bg-charcoal/20"
          >
            Save & Exit
          </button>
          <button
            onClick={handleCompleteModule}
            disabled={isCompleted || state.applicationContext?.type === 'observer'}
            className="btn-formal"
          >
            {state.applicationContext?.type === 'observer' 
              ? 'Observer Mode (Read-Only)' 
              : isCompleted 
                ? 'Module Completed' 
                : 'Advance to Next Module'}
          </button>
        </div>
      </div>
    </div>
  );
}
