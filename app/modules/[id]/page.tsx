'use client';

import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
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
import FiveForcesAccordion from '@/components/FiveForcesAccordion';
import FrameworkReveal from '@/components/FrameworkReveal';
import { getQuizForModule } from '@/data/moduleQuizzes';
import { WorksheetData } from '@/types';
import { getCaseStudyById } from '@/data/caseStudies';
import { getCasePackById } from '@/data/casePacks';
import { exportModulePDFWithCorner } from '@/utils/exportModulePDF';

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
            className="btn-dark px-6 py-3 rounded-sm"
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  const moduleOutput = state.moduleOutputs[moduleId];
  const isObserver = state.applicationContext?.type === 'observer';
  const isUnlocked = isObserver || progress.unlockedModules.includes(moduleId);
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

  const handleExportPDF = () => {
    if (!moduleData) return;
    exportModulePDFWithCorner(moduleData, moduleId, state);
  };

  const handleCompleteModule = () => {
    // Observer mode cannot complete modules
    if (state.applicationContext?.type === 'observer') {
      alert('Observer Mode is read-only. You cannot complete modules. Switch to an active context to apply frameworks.');
      return;
    }

    // Cold Call required when module has one
    if (moduleData.coldCall && !moduleOutput?.coldCallResponse?.trim()) {
      alert('Complete the Cold Call before advancing.');
      return;
    }

    // Red Team required when module has one
    if (moduleData.redTeam && !moduleOutput?.redTeamResponse?.trim()) {
      alert('Complete the Red Team response (Enter Record) before advancing.');
      return;
    }

    // Key concepts check: if quiz has a disqualifier question, concept must be complete to advance
    const quiz = getQuizForModule(moduleId);
    if (quiz?.questions.some((q) => q.disqualifier)) {
      if (moduleOutput?.quizConceptIncomplete === true) {
        alert('Key concepts check: concept incomplete. Retake the quiz and get the required question right to advance.');
        return;
      }
      if (moduleOutput?.quizScore == null || moduleOutput?.quizTotal == null) {
        alert('Complete the Key concepts check (quiz) before advancing.');
        return;
      }
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
      const val = moduleOutput?.requiredOutputs?.[req.id];
      if (val === undefined || val === '') return false;
      if (req.type === 'select' && req.options?.length && !req.options.includes(String(val))) return false;
      return true;
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
            className="btn-dark px-6 py-3 rounded-sm"
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

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <button
              type="button"
              onClick={() => router.push('/')}
              className="text-charcoal/60 hover:text-ink text-sm min-h-[44px] touch-manipulation inline-flex items-center gap-2"
              aria-label="Back to modules"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <span className="shrink-0 flex items-center justify-center -translate-y-0.5">
                <img src="/ivy-corner-logo.png" alt="" className="h-8 w-8 object-contain" />
              </span>
              ← Back to Modules
            </button>
            <button
              type="button"
              onClick={handleExportPDF}
              className="label-small-caps border border-charcoal/25 hover:bg-charcoal/5 px-3 py-2 text-sm min-h-[44px]"
              style={{ borderRadius: 0 }}
            >
              Save as Ivy PDF
            </button>
          </div>
          <div className="label-small-caps mb-2">
            {moduleData.pillar === 'pillar-1' ? 'PILLAR I' : moduleData.pillar === 'pillar-2' ? 'PILLAR II' : 'PILLAR III'} — MODULE {moduleData.order}
          </div>
          <h1 className="tier-1-gravitas text-2xl sm:text-4xl mb-4">{moduleData.title}</h1>
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

        {/* Case pack context (HBS-style): show company and key numbers when in Case Mode */}
        {state.caseMode === 'case' && state.activeCasePackId && (() => {
          const pack = getCasePackById(state.activeCasePackId);
          if (!pack) return null;
          const ue = pack.unit_economics_snapshot;
          return (
            <div className="mb-8 p-4 sm:p-6 border border-charcoal/20 bg-parchment/30" style={{ borderRadius: 0 }}>
              <h3 className="label-small-caps text-charcoal/60 mb-2">CASE CONTEXT</h3>
              <p className="font-serif text-lg text-ink mb-2">{pack.company_name} — {pack.time_period}</p>
              <p className="text-sm text-charcoal/70 mb-3">{pack.industry}</p>
              {ue && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
                  <div><span className="text-charcoal/60">Gross margin</span> {ue.grossMarginPct}%</div>
                  <div><span className="text-charcoal/60">CAC</span> ${ue.cac}</div>
                  <div><span className="text-charcoal/60">LTV</span> ${ue.ltv}</div>
                  <div><span className="text-charcoal/60">Payback</span> {ue.paybackMonths} mo</div>
                  {ue.churnMonthlyPct != null && <div><span className="text-charcoal/60">Churn</span> {ue.churnMonthlyPct}%/mo</div>}
                </div>
              )}
            </div>
          );
        })()}

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
        {moduleId === 'module-2' ? (
          <div className="mb-8">
            <h2 className="tier-2-instruction text-xl mb-2">Porter&apos;s Five Forces — Applied</h2>
            <p className="tier-3-guidance mb-4">Five Forces are not a checklist. They are a stress test.</p>
            <div className="border-l-2 border-charcoal/30 bg-parchment/20 py-3 px-4 mb-6" style={{ borderRadius: 0 }}>
              <p className="label-small-caps text-charcoal/60 mb-1">Core design principle</p>
              <p className="text-sm text-charcoal/90">
                Do not show the &quot;answers&quot; first. Force the learner to take a position, then reveal the framework.
                <strong className="block mt-2"> Judgment → Evidence → Correction → Insight</strong>
                <span className="block mt-1 text-charcoal/70">Not: Explanation → Passive nodding.</span>
              </p>
            </div>
            <FiveForcesAccordion />
            <div className="mt-6 p-4 border border-charcoal/15 bg-parchment/10" style={{ borderRadius: 0 }}>
              <p className="label-small-caps text-charcoal/60 mb-2">Scoring rule (total / 25)</p>
              <p className="text-sm text-charcoal/80">
                ≤12 structurally attractive · 13–14 playable with clear positioning · 15–17 only playable with a real moat · ≥18 value extraction unlikely.
              </p>
              <p className="text-xs text-charcoal/60 mt-2">Non-negotiable: state facts only. Each force = one number (or bounded estimate) + one observed behavior.</p>
            </div>
          </div>
        ) : (
          moduleData.frameworks.map((framework) => (
            <div key={framework.id} className="mb-8">
              <h2 className="tier-2-instruction text-xl mb-2">{framework.title}</h2>
              <p className="tier-3-guidance mb-4">{framework.description}</p>
              {framework.id === 'framework-1-1' ? (
                <FiveCsFramework content={framework.content} />
              ) : (
                <FrameworkReveal content={framework.content} />
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
          ))
        )}

        {/* Professor Notes (Faculty layer: what students get wrong, A+ smell, the trap) */}
        {moduleData.professorNotes && (
          <div className="mb-8 border border-charcoal/20 bg-parchment/30 p-6" style={{ borderRadius: 0 }}>
            <h2 className="tier-2-instruction text-xl mb-4">PROFESSOR NOTES</h2>
            <div className="space-y-4">
              <div>
                <p className="label-small-caps text-charcoal/60 mb-1">What students get wrong</p>
                <p className="tier-3-guidance text-sm">{moduleData.professorNotes.whatStudentsGetWrong}</p>
              </div>
              <div>
                <p className="label-small-caps text-charcoal/60 mb-1">What the A+ answer smells like</p>
                <p className="tier-3-guidance text-sm">{moduleData.professorNotes.whatAplusSmellsLike}</p>
              </div>
              <div>
                <p className="label-small-caps text-charcoal/60 mb-1">The trap</p>
                <p className="tier-3-guidance text-sm">{moduleData.professorNotes.theTrap}</p>
              </div>
            </div>
          </div>
        )}

        {/* Sample answers: one strong (why), one weak (why it fails) */}
        {moduleData.sampleAnswers && (
          <div className="mb-8 border border-sage/30 bg-parchment/20 p-6" style={{ borderRadius: 0 }}>
            <h2 className="tier-2-instruction text-xl mb-4">SAMPLE ANSWERS</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="label-small-caps text-sage mb-2">Strong</p>
                <p className="tier-3-guidance text-sm mb-2">{moduleData.sampleAnswers.strong.text}</p>
                <p className="text-xs text-charcoal/70 italic">Why: {moduleData.sampleAnswers.strong.why}</p>
              </div>
              <div>
                <p className="label-small-caps text-oxblood mb-2">Weak</p>
                <p className="tier-3-guidance text-sm mb-2">{moduleData.sampleAnswers.weak.text}</p>
                <p className="text-xs text-charcoal/70 italic">Why it fails: {moduleData.sampleAnswers.weak.whyFails}</p>
              </div>
            </div>
          </div>
        )}

        {/* Legitimacy Lens (Yale): who could attack, exploitative risk, implicit promise */}
        {moduleData.legitimacyLens && (
          <div className="mb-8 border-l-2 border-charcoal/30 bg-parchment/20 p-6" style={{ borderRadius: 0 }}>
            <h2 className="tier-2-instruction text-xl mb-4">LEGITIMACY LENS</h2>
            <p className="tier-3-guidance text-sm text-charcoal/80 mb-4">
              Legitimacy and long-term trust affect pricing power and resilience.
            </p>
            <div className="space-y-4">
              <div>
                <label className="label-small-caps block mb-2">{moduleData.legitimacyLens.whoCouldAttack}</label>
                <textarea
                  value={moduleOutput?.legitimacyLensResponses?.whoCouldAttack ?? ''}
                  onChange={(e) => updateModuleOutput(moduleId, {
                    legitimacyLensResponses: {
                      ...moduleOutput?.legitimacyLensResponses,
                      whoCouldAttack: e.target.value,
                    },
                  })}
                  placeholder="One sentence."
                  className="w-full worksheet-field min-h-[72px]"
                  style={{ borderRadius: 0 }}
                />
              </div>
              <div>
                <label className="label-small-caps block mb-2">{moduleData.legitimacyLens.whatLooksExploitative}</label>
                <textarea
                  value={moduleOutput?.legitimacyLensResponses?.whatLooksExploitative ?? ''}
                  onChange={(e) => updateModuleOutput(moduleId, {
                    legitimacyLensResponses: {
                      ...moduleOutput?.legitimacyLensResponses,
                      whatLooksExploitative: e.target.value,
                    },
                  })}
                  placeholder="One sentence."
                  className="w-full worksheet-field min-h-[72px]"
                  style={{ borderRadius: 0 }}
                />
              </div>
              <div>
                <label className="label-small-caps block mb-2">{moduleData.legitimacyLens.implicitPromise}</label>
                <textarea
                  value={moduleOutput?.legitimacyLensResponses?.implicitPromise ?? ''}
                  onChange={(e) => updateModuleOutput(moduleId, {
                    legitimacyLensResponses: {
                      ...moduleOutput?.legitimacyLensResponses,
                      implicitPromise: e.target.value,
                    },
                  })}
                  placeholder="One sentence."
                  className="w-full worksheet-field min-h-[72px]"
                  style={{ borderRadius: 0 }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Reading Spine (Brown): optional but rewarded — primary, counterpoint, operator artifact */}
        {moduleData.readingSpine && (
          <div className="mb-8 border border-charcoal/15 bg-parchment/20 p-6" style={{ borderRadius: 0 }}>
            <h2 className="tier-2-instruction text-xl mb-2">READING SPINE</h2>
            <p className="tier-3-guidance text-sm text-charcoal/70 mb-4">
              Optional but rewarded. One primary (classic), one counterpoint (critique), one operator artifact.
            </p>
            <div className="space-y-3">
              <div className="border-l-2 border-sage/50 pl-3">
                <p className="label-small-caps text-charcoal/60 text-xs mb-1">Primary</p>
                <p className="tier-3-guidance text-sm font-medium">{moduleData.readingSpine.primaryReading.title}</p>
                {moduleData.readingSpine.primaryReading.description && (
                  <p className="text-xs text-charcoal/60 mt-1">{moduleData.readingSpine.primaryReading.description}</p>
                )}
              </div>
              <div className="border-l-2 border-sage/50 pl-3">
                <p className="label-small-caps text-charcoal/60 text-xs mb-1">Counterpoint</p>
                <p className="tier-3-guidance text-sm font-medium">{moduleData.readingSpine.counterpointReading.title}</p>
                {moduleData.readingSpine.counterpointReading.description && (
                  <p className="text-xs text-charcoal/60 mt-1">{moduleData.readingSpine.counterpointReading.description}</p>
                )}
              </div>
              <div className="border-l-2 border-sage/50 pl-3">
                <p className="label-small-caps text-charcoal/60 text-xs mb-1">Operator artifact</p>
                <p className="tier-3-guidance text-sm font-medium">{moduleData.readingSpine.operatorArtifact.title}</p>
                {moduleData.readingSpine.operatorArtifact.description && (
                  <p className="text-xs text-charcoal/60 mt-1">{moduleData.readingSpine.operatorArtifact.description}</p>
                )}
              </div>
            </div>
            {!state.applicationContext || state.applicationContext.type !== 'observer' ? (
              <label className="flex items-center gap-2 mt-4 text-sm text-charcoal/70">
                <input
                  type="checkbox"
                  checked={!!moduleOutput?.readingSpineCompleted}
                  onChange={(e) => updateModuleOutput(moduleId, { readingSpineCompleted: e.target.checked })}
                />
                Mark reading spine completed (optional)
              </label>
            ) : null}
          </div>
        )}

        {/* Synthesis prompt: connect to one other discipline (Brown) */}
        {moduleData.synthesisDisciplines && moduleData.synthesisDisciplines.length > 0 && (
          <div className="mb-8 border-l-2 border-charcoal/30 p-6 bg-parchment/10" style={{ borderRadius: 0 }}>
            <h2 className="tier-2-instruction text-xl mb-2">SYNTHESIS</h2>
            <p className="tier-3-guidance text-sm text-charcoal/80 mb-3">
              Connect this module to ONE other discipline: {moduleData.synthesisDisciplines.join(' / ')}.
            </p>
            {!state.applicationContext || state.applicationContext.type !== 'observer' ? (
              <textarea
                value={moduleOutput?.synthesisResponse ?? ''}
                onChange={(e) => updateModuleOutput(moduleId, { synthesisResponse: e.target.value })}
                placeholder="One sentence: how does this connect to another field?"
                className="w-full worksheet-field min-h-[80px]"
                style={{ borderRadius: 0 }}
              />
            ) : (
              <p className="tier-3-guidance text-sm text-charcoal/60 italic">Read-only in Observer Mode.</p>
            )}
          </div>
        )}

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
          <h3 className="tier-2-instruction text-lg mb-2">REQUIRED OUTPUTS TO ADVANCE</h3>
          <p className="tier-3-guidance text-sm mb-4 long-text">
            Fill out each item below. These are the concrete outputs boards and investors expect. When every item has a submitted answer, the module is marked BOARD-READY and you can advance. Items tied to a worksheet are completed when you finish that worksheet.
          </p>
          <ul className="space-y-4">
            {moduleData.requiredOutputs.map((req) => {
              const fromWorksheet = Boolean(req.source);
              const worksheetVal = req.source ? (worksheetData[req.source] ?? state.moduleOutputs[moduleId]?.worksheets?.[req.source])?.fields?.[req.id] : undefined;
              const directVal = moduleOutput?.requiredOutputs?.[req.id];
              const isComplete = fromWorksheet
                ? worksheetVal !== undefined && worksheetVal !== '' && (Array.isArray(worksheetVal) ? worksheetVal.length > 0 : true)
                : directVal !== undefined && directVal !== '' && (req.type !== 'select' || !req.options?.length || (req.options as string[]).includes(String(directVal)));
              const incompleteLabels = ['UNPROVEN', 'NOT DEFENSIBLE'];
              const incompleteLabel = incompleteLabels[moduleData.requiredOutputs.indexOf(req) % 2];
              return (
                <li key={req.id} className="border border-charcoal/15 p-4" style={{ borderRadius: 0 }}>
                  <div className="flex items-start gap-3 mb-2">
                    {isComplete ? (
                      <span className="incomplete-flag board-ready status-change mt-0 shrink-0">
                        <span className="text-green-700">✓</span>
                        <span className="label-small-caps text-green-700">BOARD-READY</span>
                      </span>
                    ) : (
                      <span className="incomplete-flag mt-0 shrink-0">
                        <span className="text-orange-600">○</span>
                        <span className="label-small-caps text-orange-700">{incompleteLabel}</span>
                      </span>
                    )}
                    <span className={`${isComplete ? 'text-charcoal/70' : 'text-charcoal font-medium'} long-text`}>
                      {req.label}
                    </span>
                  </div>
                  {fromWorksheet ? (
                    <p className="text-xs text-charcoal/50 mt-1">
                      Completed via worksheet. Fill the worksheet above to satisfy this output.
                    </p>
                  ) : (
                    <div className="mt-2">
                      {req.type === 'number' ? (
                        <input
                          type="number"
                          className="w-full border border-charcoal/20 px-3 py-2 text-sm bg-cream min-h-[44px]"
                          style={{ borderRadius: 0 }}
                          placeholder={`Enter: ${req.label}`}
                          value={directVal !== undefined && directVal !== '' ? String(directVal) : ''}
                          onChange={(e) => {
                            const v = e.target.value === '' ? undefined : Number(e.target.value);
                            updateModuleOutput(moduleId, { requiredOutputs: { [req.id]: v } });
                          }}
                        />
                      ) : req.type === 'select' && req.options?.length ? (
                        <>
                          <select
                            className="w-full border border-charcoal/20 px-3 py-2 text-sm bg-cream min-h-[44px]"
                            style={{ borderRadius: 0 }}
                            value={typeof directVal === 'string' && req.options.includes(directVal) ? directVal : ''}
                            onChange={(e) => {
                              const v = e.target.value || undefined;
                              updateModuleOutput(moduleId, { requiredOutputs: { [req.id]: v } });
                            }}
                          >
                            <option value="">Select…</option>
                            {req.options.map((opt) => (
                              <option key={opt} value={opt}>{opt}</option>
                            ))}
                          </select>
                          <button
                            type="button"
                            onClick={() => {
                              const current = moduleOutput?.requiredOutputs?.[req.id];
                              if (current && req.options?.includes(String(current)))
                                updateModuleOutput(moduleId, { requiredOutputs: { [req.id]: current } });
                            }}
                            className="label-small-caps mt-2 px-3 py-1.5 border border-charcoal/25 hover:bg-charcoal/5 text-sm disabled:opacity-70"
                            style={{ borderRadius: 0 }}
                            disabled={isComplete}
                          >
                            {isComplete ? 'Saved' : 'Save this output'}
                          </button>
                        </>
                      ) : (
                        <>
                          <textarea
                            className="w-full border border-charcoal/20 px-3 py-2 text-sm bg-cream min-h-[80px] resize-y"
                            style={{ borderRadius: 0 }}
                            placeholder={req.placeholder ?? `Enter: ${req.label}. State facts only; no adjectives.`}
                            value={typeof directVal === 'string' ? directVal : ''}
                            onChange={(e) => updateModuleOutput(moduleId, { requiredOutputs: { [req.id]: e.target.value } })}
                          />
                          {req.placeholder && (
                            <p className="text-xs text-charcoal/55 mt-1.5" aria-hidden="true">❗ {req.placeholder}</p>
                          )}
                          <button
                            type="button"
                            onClick={() => {
                              const current = moduleOutput?.requiredOutputs?.[req.id];
                              if (req.type === 'number' && (current === undefined || current === '')) return;
                              if (req.type !== 'number' && (!current || String(current).trim() === '')) return;
                              updateModuleOutput(moduleId, { requiredOutputs: { [req.id]: moduleOutput?.requiredOutputs?.[req.id] ?? (req.type === 'number' ? 0 : '') } });
                            }}
                            className="label-small-caps mt-2 px-3 py-1.5 border border-charcoal/25 hover:bg-charcoal/5 text-sm disabled:opacity-70"
                            style={{ borderRadius: 0 }}
                            disabled={isComplete}
                          >
                            {isComplete ? 'Saved' : 'Save this output'}
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        {/* Reading Companion: Essentials, Key Ideas, Listen, Apply, book check-off + extra credit */}
        {moduleData.readingCompanion && (
          <div className="command-center p-6 mb-8 border border-charcoal/20" style={{ borderRadius: 0 }}>
            <h3 className="tier-2-instruction text-xl mb-2">READING COMPANION</h3>
            <p className="label-small-caps text-charcoal/60 mb-4">
              Essentials • Key Ideas • Listen • Apply • Reading list (check off books for extra credit)
            </p>
            <a
              href={`/modules/${moduleId}/reading`}
              className="inline-block btn-formal"
            >
              Open Reading tab
            </a>
          </div>
        )}

        {/* Key concepts check: separate page (no scrolling back to module) */}
        {getQuizForModule(moduleId) && (
          <div className="command-center p-6 mb-8 border border-charcoal/20" style={{ borderRadius: 0 }}>
            <h3 className="tier-2-instruction text-xl mb-2">KEY CONCEPTS CHECK</h3>
            <p className="label-small-caps text-charcoal/60 mb-4">
              Ivy syllabus: {getQuizForModule(moduleId)?.title}. Taken on its own page — you cannot refer back to the module.
            </p>
            {moduleOutput?.quizConceptIncomplete === true && (
              <p className="text-sm font-medium text-orange-700 bg-orange-50 border border-orange-200 px-3 py-2 mb-4" style={{ borderRadius: 0 }}>
                Concept incomplete — required question(s) missed. Retake the quiz and get the required question right to advance.
              </p>
            )}
            {moduleOutput?.quizScore !== undefined && moduleOutput?.quizTotal !== undefined ? (
              <div className="flex flex-wrap items-center gap-4">
                <p className="font-mono text-sm text-charcoal/80">
                  Score: {moduleOutput.quizScore} / {moduleOutput.quizTotal}
                  {moduleOutput.quizScore === moduleOutput.quizTotal && !moduleOutput?.quizConceptIncomplete && ' — Board-ready.'}
                </p>
                <a
                  href={`/modules/${moduleId}/quiz`}
                  className="label-small-caps text-charcoal/70 hover:text-ink underline"
                >
                  {moduleOutput?.quizConceptIncomplete ? 'Retake (required to advance)' : 'Retake'}
                </a>
              </div>
            ) : (
              <a
                href={`/modules/${moduleId}/quiz`}
                className="inline-block btn-formal"
              >
                Take key concepts check
              </a>
            )}
          </div>
        )}

        {/* Hindsight Graph (future projections) */}
        <HindsightGraph currentModuleId={moduleId} />
        
        {/* Red Team Validator (floating notifications) */}
        <RedTeamValidator
          moduleOutput={moduleOutput}
          moduleData={moduleData}
        />

        {/* What would you do Monday? — Converts case learning into operator behavior. */}
        {!state.applicationContext || state.applicationContext.type !== 'observer' ? (
          <div className="mt-8 p-4 border border-charcoal/20 bg-parchment/30" style={{ borderRadius: 0 }}>
            <p className="label-small-caps text-charcoal/60 mb-2">What would you do Monday?</p>
            <p className="tier-3-guidance text-sm mb-3">In the next 7 days, what changes in the world if you&apos;re right?</p>
            <textarea
              value={moduleOutput?.whatWouldChangeIn7Days ?? ''}
              onChange={(e) => updateModuleOutput(moduleId, { whatWouldChangeIn7Days: e.target.value })}
              placeholder="One sentence or a few bullets."
              className="w-full worksheet-field min-h-[80px]"
              style={{ borderRadius: 0 }}
            />
          </div>
        ) : null}

        {/* Complete Button */}
        <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 sm:gap-4 mt-6">
          <button
            onClick={() => router.push('/')}
            className="btn-formal bg-charcoal/10 text-ink hover:bg-charcoal/20 w-full sm:w-auto"
          >
            Save & Exit
          </button>
          <button
            onClick={handleCompleteModule}
            disabled={isCompleted || state.applicationContext?.type === 'observer'}
            className="btn-formal w-full sm:w-auto"
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
