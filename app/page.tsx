'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useBusinessState } from '@/store/useBusinessState';
import { useProgress } from '@/store/useProgress';
import { useProjectStore } from '@/store/useProjectStore';
import { getModulesByPillar, getModuleById, getModulesInOrder } from '@/data/all-modules';
import { useEffect, useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import { exportModulePDF } from '@/utils/exportModulePDF';
import { caseStudies } from '@/data/caseStudies';

const ValueWedge = dynamic(() => import('@/components/ValueWedge'), { ssr: false });
const LiveValuationCAC = dynamic(() => import('@/components/LiveValuationCAC'), { ssr: false });
const StrategicTrajectoryGraph = dynamic(() => import('@/components/StrategicTrajectoryGraph'), { ssr: false });

export default function Home() {
  const router = useRouter();
  const { state } = useBusinessState();
  const { progress } = useProgress();
  const currentProjectId = useProjectStore((s) => s.currentProjectId);
  const loadProject = useProjectStore((s) => s.loadProject);
  const setCurrentProjectId = useProjectStore((s) => s.setCurrentProjectId);
  const [mounted, setMounted] = useState(false);
  const [hydrating, setHydrating] = useState(false);
  const [showAllModules, setShowAllModules] = useState(false);
  const dashboardRef = useRef<HTMLDivElement>(null);

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

  const stillHydrating = currentProjectId && !state.applicationContext && !String(currentProjectId).startsWith('local-');

  if (!currentProjectId) {
    return null; // Will redirect to dashboard
  }

  if (stillHydrating) {
    return (
      <div className="min-h-screen bg-cream overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 min-w-0">
          <header className="mb-8">
            <div className="flex items-start gap-4">
              <a href="/" className="shrink-0 self-start mt-[-2px]" aria-label="Ivy home">
                <img src="/ivy-corner-logo.png" alt="IVY" className="h-14 w-14 sm:h-16 sm:w-16 object-contain" />
              </a>
              <div className="min-w-0">
                <h1 className="overflow-hidden inline-block mb-2">
                  <span className="ivy-fade-in inline-block font-cinzel-decorative font-bold text-ink uppercase text-3xl sm:text-5xl" style={{ letterSpacing: '0.2em' }}>
                    IVY
                  </span>
                </h1>
                <p className="tier-2-instruction text-lg">Marketing as Value Architecture</p>
              </div>
            </div>
          </header>
          <div className="flex items-center justify-center py-16">
            <p className="text-charcoal/70">Loading project…</p>
          </div>
        </div>
      </div>
    );
  }

  const modulesInOrder = getModulesInOrder();
  const nextModule = modulesInOrder.find((m) => progress.unlockedModules.includes(m.id) && !progress.completedModules.includes(m.id))
    ?? modulesInOrder.filter((m) => progress.unlockedModules.includes(m.id)).pop() ?? modulesInOrder[0];

  const renderModuleCard = (module: ReturnType<typeof getModulesInOrder>[0]) => {
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
    const moduleData = getModuleById(module.id);
    return (
      <div
        key={module.id}
        className={`command-center p-6 transition-all border-l-4 ${
          isCompleted ? 'border-sage' : hasIncompleteOutputs ? 'border-orange-300' : 'border-transparent'
        } ${isUnlocked ? 'hover:shadow-md' : 'opacity-50'}`}
        style={{ borderRadius: 0 }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <button
            type="button"
            onClick={() => isUnlocked && router.push(`/modules/${module.id}`)}
            disabled={!isUnlocked}
            className="flex-1 text-left min-w-0"
          >
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
              <p className="tier-3-guidance mt-1">Founders who skip this section usually blame execution later.</p>
            )}
            <div className="mt-2">
              {isCompleted && <span className="text-sage text-sm">✓ Completed</span>}
              {!isUnlocked && <span className="text-charcoal/40 text-sm">Locked</span>}
            </div>
          </button>
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                if (moduleData) exportModulePDF(moduleData, module.id, state);
              }}
              className="label-small-caps border border-charcoal/25 hover:bg-charcoal/5 px-3 py-2 text-sm"
              style={{ borderRadius: 0 }}
            >
              Save as PDF
            </button>
            {isUnlocked && (
              <button
                type="button"
                onClick={() => router.push(`/modules/${module.id}`)}
                className="label-small-caps bg-charcoal text-cream hover:bg-gold px-3 py-2 text-sm transition-colors [color:var(--cream)]"
                style={{ borderRadius: 0 }}
              >
                Open
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-cream overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 min-w-0">
        {/* Header */}
        <header className="mb-8 sm:mb-12">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
            <div className="flex items-start gap-4">
              <a href="/" className="shrink-0 self-start mt-[-2px]" aria-label="Ivy home">
                <img src="/ivy-corner-logo.png" alt="IVY" className="h-14 w-14 sm:h-16 sm:w-16 object-contain" />
              </a>
              <div className="min-w-0">
                <h1 className="overflow-hidden inline-block mb-2">
                  <span className="ivy-fade-in inline-block font-cinzel-decorative text-3xl sm:text-5xl font-bold text-ink uppercase" style={{ letterSpacing: '0.2em' }}>
                    IVY
                  </span>
                </h1>
              <p className="tier-2-instruction text-lg">
                Marketing as Value Architecture
              </p>
              <p className="tier-3-guidance mt-2">
                Author: Sarah Kitay | Edition: Founders & Operators
              </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-end gap-2 sm:gap-4 ml-auto sm:ml-0">
            <Link
              href="/dashboard"
              className="label-small-caps text-charcoal/60 hover:text-ink text-sm"
            >
              Back to Dashboard
            </Link>
            <button
              type="button"
              onClick={() => dashboardRef.current?.scrollIntoView({ behavior: 'smooth' })}
              className="label-small-caps text-charcoal/60 hover:text-ink text-sm"
            >
              View Dashboard
            </button>
            {state.applicationContext && (
              <div className="ml-auto sm:ml-0 flex flex-col border-l-2 border-charcoal/25 pl-2 sm:pl-3 py-0.5 min-h-[28px] sm:command-center sm:flex-col sm:px-4 sm:py-2 sm:border sm:border-charcoal/15 sm:bg-parchment/50 sm:border-l-0 sm:pl-4 sm:gap-0.5">
                <p className="label-small-caps text-charcoal/50 text-[10px] sm:text-xs">CONTEXT</p>
                <p className="tier-2-instruction text-[11px] sm:text-sm truncate max-w-[90px] sm:max-w-[140px] md:max-w-none">
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

        {/* Next / current module only — expand to see all */}
        <h3 className="label-small-caps mb-3">
          {progress.completedModules.includes(nextModule.id) ? 'Current module' : 'Next module'}
        </h3>
        <div className="mb-4">
          {renderModuleCard(nextModule)}
        </div>
        <button
          type="button"
          onClick={() => setShowAllModules((v) => !v)}
          className="label-small-caps text-charcoal/70 hover:text-ink border border-charcoal/20 px-4 py-2 mb-6 w-full sm:w-auto"
          style={{ borderRadius: 0 }}
        >
          {showAllModules ? 'Hide modules' : 'View all modules'}
        </button>

        {showAllModules && (
        <>
        <div className="space-y-4 mb-12">
          <h3 className="label-small-caps mb-6">PILLAR I MODULES</h3>
          {getModulesByPillar('pillar-1').map((m) => renderModuleCard(m))}
        </div>
        <div className="mb-8">
          <div className="tier-a text-center py-12">
            <p className="label-small-caps mb-2">PILLAR II</p>
            <h2 className="font-serif text-4xl text-ink mb-4">CONSUMER BEHAVIOR & PSYCHOGRAPHICS</h2>
            <p className="tier-a-statement text-lg">Engineering Perceived Value</p>
          </div>
        </div>
        <div className="space-y-4 mb-12">
          <h3 className="label-small-caps mb-6">PILLAR II MODULES</h3>
          {getModulesByPillar('pillar-2').map((m) => renderModuleCard(m))}
        </div>
        <div className="mb-8">
          <div className="tier-a text-center py-12">
            <p className="label-small-caps mb-2">PILLAR III</p>
            <h2 className="font-serif text-4xl text-ink mb-4">GROWTH SYSTEMS & DATA SCIENCE</h2>
            <p className="tier-a-statement text-lg">Wharton / Stanford / HBS Lens</p>
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="label-small-caps mb-6">PILLAR III MODULES</h3>
          {getModulesByPillar('pillar-3').map((m) => renderModuleCard(m))}
        </div>
        </>
        )}

        {/* Live Dashboard — reactive to answers and quiz */}
        <div ref={dashboardRef} id="live-dashboard" className="mt-12 pt-8 border-t border-charcoal/20 scroll-mt-8">
          <h3 className="font-serif text-2xl mb-2">Live Dashboard</h3>
          <p className="tier-3-guidance mb-6">
            Valuation and CAC respond to answer quality (keywords, specificity) and correct quiz answers.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6 min-w-0">
            <div className="min-w-0"><LiveValuationCAC /></div>
            <div className="min-w-0"><ValueWedge /></div>
            <div className="min-w-0"><StrategicTrajectoryGraph /></div>
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

