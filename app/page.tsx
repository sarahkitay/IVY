'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useBusinessState } from '@/store/useBusinessState';
import { useProgress } from '@/store/useProgress';
import { useProjectStore } from '@/store/useProjectStore';
import { getModulesByPillar } from '@/data/all-modules';
import { useEffect, useState } from 'react';
import ValueWedge from '@/components/ValueWedge';
import StrategicTrajectoryGraph from '@/components/StrategicTrajectoryGraph';
import LiveValuationCAC from '@/components/LiveValuationCAC';
import { caseStudies } from '@/data/caseStudies';

export default function Home() {
  const router = useRouter();
  const { state } = useBusinessState();
  const { progress } = useProgress();
  const currentProjectId = useProjectStore((s) => s.currentProjectId);
  const loadProject = useProjectStore((s) => s.loadProject);
  const setCurrentProjectId = useProjectStore((s) => s.setCurrentProjectId);
  const [mounted, setMounted] = useState(false);
  const [hydrating, setHydrating] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Local projects don't persist context after refresh — send back to dashboard
  useEffect(() => {
    if (!mounted || !currentProjectId || state.applicationContext) return;
    if (!String(currentProjectId).startsWith('local-')) return;
    setCurrentProjectId(null);
    router.push('/dashboard');
  }, [mounted, currentProjectId, state.applicationContext, setCurrentProjectId, router]);

  // Hydrate from Firebase when we have a project id but no context (e.g. after refresh)
  useEffect(() => {
    if (!mounted || !currentProjectId || state.applicationContext) return;
    if (String(currentProjectId).startsWith('local-')) return;
    let cancelled = false;
    setHydrating(true);
    loadProject(currentProjectId)
      .then(() => { if (!cancelled) setHydrating(false); })
      .catch(() => { if (!cancelled) setHydrating(false); });
    return () => { cancelled = true; };
  }, [mounted, currentProjectId, state.applicationContext, loadProject]);

  // Redirect to dashboard if no project selected
  useEffect(() => {
    if (mounted && !currentProjectId) {
      router.push('/dashboard');
    }
  }, [mounted, currentProjectId, router]);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <p className="text-charcoal">Loading...</p>
      </div>
    );
  }

  if (hydrating || (currentProjectId && !state.applicationContext && !String(currentProjectId).startsWith('local-'))) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <p className="text-charcoal">Loading project…</p>
      </div>
    );
  }

  if (!currentProjectId) {
    return null; // Will redirect to dashboard
  }

  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Header */}
        <header className="mb-8 sm:mb-12">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
            <div className="flex items-start gap-4">
              <a href="/" className="shrink-0" aria-label="Ivy Workbook home">
                <Image
                  src="/logo.png"
                  alt="Ivy Workbook"
                  width={72}
                  height={72}
                  className="h-14 w-14 sm:h-16 sm:w-16 object-contain"
                />
              </a>
              <div>
                <h1 className="tier-1-gravitas text-3xl sm:text-5xl mb-2">
                  IVY WORKBOOK
                </h1>
              <p className="tier-2-instruction text-lg">
                Marketing as Value Architecture
              </p>
              <p className="tier-3-guidance mt-2">
                Author: Sarah Kitay | Edition: Founders & Operators
              </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="label-small-caps text-charcoal/60 hover:text-ink text-sm"
            >
              Back to Dashboard
            </Link>
            {state.applicationContext && (
              <div className="command-center px-4 py-2">
                <p className="label-small-caps mb-1 text-charcoal/50">CONTEXT</p>
                <p className="tier-2-instruction text-sm">
                  {state.applicationContext.type === 'my-company' && state.applicationContext.companyName}
                  {state.applicationContext.type === 'case-study' && (() => {
                    const caseId = state.applicationContext?.type === 'case-study' ? (state.applicationContext as { caseId: string }).caseId : '';
                    const caseStudy = caseStudies.find(c => c.id === caseId);
                    return caseStudy ? `${caseStudy.name} (${caseStudy.period})` : state.applicationContext.caseName;
                  })()}
                  {state.applicationContext.type === 'hypothetical' && state.applicationContext.category}
                  {state.applicationContext.type === 'observer' && 'Observer Mode'}
                </p>
              </div>
            )}
            </div>
          </div>
        </header>

        {/* Status Dashboard */}
        <div className="command-center p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            <div>
              <p className="text-sm text-charcoal/60 mb-1">Board Credibility</p>
              <p className="text-3xl font-serif">{state.boardCredibilityScore}</p>
            </div>
            <div>
              <p className="text-sm text-charcoal/60 mb-1">Modules Completed</p>
              <p className="text-3xl font-serif">
                {progress.completedModules.length} / 35
              </p>
            </div>
            <div>
              <p className="text-sm text-charcoal/60 mb-1">Progress</p>
              <p className="text-3xl font-serif">
                {Math.round((progress.completedModules.length / 35) * 100)}%
              </p>
            </div>
          </div>
        </div>

        {/* Pillar I Header - Tier A */}
        <div className="mb-8">
          <div className="tier-a text-center py-12">
            <p className="label-small-caps mb-2">PILLAR I</p>
            <h2 className="font-serif text-4xl text-ink mb-4">STRATEGIC FOUNDATIONS</h2>
            <p className="tier-a-statement text-lg">
              Marketing as Value Architecture
            </p>
          </div>
        </div>

        {/* Pillar I Modules */}
        <div className="space-y-4 mb-12">
          <h3 className="label-small-caps mb-6">PILLAR I MODULES</h3>
          {getModulesByPillar('pillar-1').map((module) => {
            const isCompleted = progress.completedModules.includes(module.id);
            const isUnlocked = progress.unlockedModules.includes(module.id);
            const moduleOutput = state.moduleOutputs[module.id];
            const hasIncompleteOutputs = module.requiredOutputs.some((req) => {
              if (req.source) {
                const worksheet = moduleOutput?.worksheets?.[req.source];
                return !worksheet?.fields?.[req.id];
              }
              return !moduleOutput?.requiredOutputs?.[req.id];
            });
            
            return (
              <button
                key={module.id}
                onClick={() => router.push(`/modules/${module.id}`)}
                disabled={!isUnlocked}
                className={`w-full text-left command-center p-6 transition-all ${
                  isUnlocked
                    ? 'hover:shadow-md cursor-pointer'
                    : 'opacity-50 cursor-not-allowed'
                } ${isCompleted ? 'border-l-4 border-sage' : hasIncompleteOutputs ? 'border-l-4 border-orange-300' : ''}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <p className="label-small-caps">MODULE {module.order}</p>
                      {hasIncompleteOutputs && !isCompleted && (
                        <span className="incomplete-flag">
                          <span className="label-small-caps text-orange-700">
                            {module.order % 2 === 0 ? 'UNPROVEN' : 'NOT DEFENSIBLE'}
                          </span>
                        </span>
                      )}
                      {isCompleted && (
                        <span className="incomplete-flag board-ready status-change">
                          <span className="label-small-caps text-green-700">BOARD-READY</span>
                        </span>
                      )}
                    </div>
                    <h4 className="tier-1-gravitas text-xl mb-1">{module.title}</h4>
                    {hasIncompleteOutputs && !isCompleted && (
                      <p className="tier-3-guidance mt-1">
                        Founders who skip this section usually blame execution later.
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    {isCompleted && (
                      <span className="text-sage text-sm">✓ Completed</span>
                    )}
                    {!isUnlocked && (
                      <span className="text-charcoal/40 text-sm">Locked</span>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Pillar II Header - Tier A */}
        <div className="mb-8">
          <div className="tier-a text-center py-12">
            <p className="label-small-caps mb-2">PILLAR II</p>
            <h2 className="font-serif text-4xl text-ink mb-4">CONSUMER BEHAVIOR & PSYCHOGRAPHICS</h2>
            <p className="tier-a-statement text-lg">
              Engineering Perceived Value
            </p>
          </div>
        </div>

        {/* Pillar II Modules */}
        <div className="space-y-4 mb-12">
          <h3 className="label-small-caps mb-6">PILLAR II MODULES</h3>
          {getModulesByPillar('pillar-2').map((module) => {
            const isCompleted = progress.completedModules.includes(module.id);
            const isUnlocked = progress.unlockedModules.includes(module.id);
            const moduleOutput = state.moduleOutputs[module.id];
            const hasIncompleteOutputs = module.requiredOutputs.some((req) => {
              if (req.source) {
                const worksheet = moduleOutput?.worksheets?.[req.source];
                return !worksheet?.fields?.[req.id];
              }
              return !moduleOutput?.requiredOutputs?.[req.id];
            });
            
            return (
              <button
                key={module.id}
                onClick={() => router.push(`/modules/${module.id}`)}
                disabled={!isUnlocked}
                className={`w-full text-left command-center p-6 transition-all ${
                  isUnlocked
                    ? 'hover:shadow-md cursor-pointer'
                    : 'opacity-50 cursor-not-allowed'
                } ${isCompleted ? 'border-l-4 border-sage' : hasIncompleteOutputs ? 'border-l-4 border-orange-300' : ''}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <p className="label-small-caps">MODULE {module.order}</p>
                      {hasIncompleteOutputs && !isCompleted && (
                        <span className="incomplete-flag">
                          <span className="label-small-caps text-orange-700">
                            {module.order % 2 === 0 ? 'UNPROVEN' : 'NOT DEFENSIBLE'}
                          </span>
                        </span>
                      )}
                      {isCompleted && (
                        <span className="incomplete-flag board-ready status-change">
                          <span className="label-small-caps text-green-700">BOARD-READY</span>
                        </span>
                      )}
                    </div>
                    <h4 className="tier-1-gravitas text-xl mb-1">{module.title}</h4>
                    {hasIncompleteOutputs && !isCompleted && (
                      <p className="tier-3-guidance mt-1">
                        Founders who skip this section usually blame execution later.
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    {isCompleted && (
                      <span className="text-sage text-sm">✓ Completed</span>
                    )}
                    {!isUnlocked && (
                      <span className="text-charcoal/40 text-sm">Locked</span>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Pillar III Header - Tier A */}
        <div className="mb-8">
          <div className="tier-a text-center py-12">
            <p className="label-small-caps mb-2">PILLAR III</p>
            <h2 className="font-serif text-4xl text-ink mb-4">GROWTH SYSTEMS & DATA SCIENCE</h2>
            <p className="tier-a-statement text-lg">
              Wharton / Stanford / HBS Lens
            </p>
          </div>
        </div>

        {/* Pillar III Modules */}
        <div className="space-y-4">
          <h3 className="label-small-caps mb-6">PILLAR III MODULES</h3>
          {getModulesByPillar('pillar-3').map((module) => {
            const isCompleted = progress.completedModules.includes(module.id);
            const isUnlocked = progress.unlockedModules.includes(module.id);
            const moduleOutput = state.moduleOutputs[module.id];
            const hasIncompleteOutputs = module.requiredOutputs.some((req) => {
              if (req.source) {
                const worksheet = moduleOutput?.worksheets?.[req.source];
                return !worksheet?.fields?.[req.id];
              }
              return !moduleOutput?.requiredOutputs?.[req.id];
            });
            
            return (
              <button
                key={module.id}
                onClick={() => router.push(`/modules/${module.id}`)}
                disabled={!isUnlocked}
                className={`w-full text-left command-center p-6 transition-all ${
                  isUnlocked
                    ? 'hover:shadow-md cursor-pointer'
                    : 'opacity-50 cursor-not-allowed'
                } ${isCompleted ? 'border-l-4 border-sage' : hasIncompleteOutputs ? 'border-l-4 border-orange-300' : ''}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <p className="label-small-caps">MODULE {module.order}</p>
                      {hasIncompleteOutputs && !isCompleted && (
                        <span className="incomplete-flag">
                          <span className="label-small-caps text-orange-700">
                            {module.order % 2 === 0 ? 'UNPROVEN' : 'NOT DEFENSIBLE'}
                          </span>
                        </span>
                      )}
                      {isCompleted && (
                        <span className="incomplete-flag board-ready status-change">
                          <span className="label-small-caps text-green-700">BOARD-READY</span>
                        </span>
                      )}
                    </div>
                    <h4 className="tier-1-gravitas text-xl mb-1">{module.title}</h4>
                    {hasIncompleteOutputs && !isCompleted && (
                      <p className="tier-3-guidance mt-1">
                        Founders who skip this section usually blame execution later.
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    {isCompleted && (
                      <span className="text-sage text-sm">✓ Completed</span>
                    )}
                    {!isUnlocked && (
                      <span className="text-charcoal/40 text-sm">Locked</span>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Live Dashboard — reactive to answers and quiz */}
        <div className="mt-12 pt-8 border-t border-charcoal/20">
          <h3 className="font-serif text-2xl mb-2">Live Dashboard</h3>
          <p className="tier-3-guidance mb-6">
            Valuation and CAC respond to answer quality (keywords, specificity) and correct quiz answers.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <LiveValuationCAC />
            <ValueWedge />
            <StrategicTrajectoryGraph />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-12 pt-8 border-t border-charcoal/20">
          <h3 className="font-serif text-2xl mb-4">Quick Actions</h3>
          <div className="flex gap-4">
            <button
              onClick={() => router.push('/scenario-simulator')}
              className="command-center px-6 py-3 hover:shadow-md transition-all"
            >
              Scenario Simulator
            </button>
            <button
              onClick={() => router.push('/board-memo')}
              className="command-center px-6 py-3 hover:shadow-md transition-all"
            >
              Generate Board Memo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

