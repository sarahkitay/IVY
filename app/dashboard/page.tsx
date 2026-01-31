'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useProjectStore } from '@/store/useProjectStore';
import { useAuthStore } from '@/store/useAuthStore';
import { IvyProject } from '@/types/project';
import { caseStudies } from '@/data/caseStudies';
import { getProject } from '@/lib/projects';

export default function DashboardPage() {
  const router = useRouter();
  const { user, signOut } = useAuthStore();
  const currentProjectId = useProjectStore((s) => s.currentProjectId);
  const cachedProjects = useProjectStore((s) => s.cachedProjects);
  const { listProjects, loadProject, setCurrentProjectId } = useProjectStore();
  const [projects, setProjects] = useState<IvyProject[]>(cachedProjects ?? []);
  const [currentProject, setCurrentProject] = useState<IvyProject | null>(null);
  const [loading, setLoading] = useState(!cachedProjects?.length);

  useEffect(() => {
    let cancelled = false;
    const cached = useProjectStore.getState().cachedProjects;
    if (cached?.length) {
      setProjects(cached);
      setLoading(false);
    }
    listProjects(user?.uid ?? null)
      .then((list) => { if (!cancelled) setProjects(list); })
      .catch(() => { if (!cancelled) setProjects([]); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [listProjects, user?.uid]);

  useEffect(() => {
    if (!currentProjectId) {
      setCurrentProject(null);
      return;
    }
    let cancelled = false;
    if (String(currentProjectId).startsWith('local-')) {
      setCurrentProject({
        id: currentProjectId,
        name: 'Current session (not saved to cloud)',
        applicationContext: { type: 'observer' },
        state: { moduleOutputs: {}, boardCredibilityScore: 0, economicConstraints: {}, controlLogic: {} },
        progress: { currentModule: 'module-1', completedModules: [], unlockedModules: ['module-1'], overallProgress: 0, pillar1Progress: 0, pillar2Progress: 0, pillar3Progress: 0 },
        createdAt: '',
        updatedAt: '',
      });
      return;
    }
    getProject(currentProjectId)
      .then((p) => { if (!cancelled && p) setCurrentProject(p); })
      .catch(() => { if (!cancelled) setCurrentProject(null); });
    return () => { cancelled = true; };
  }, [currentProjectId]);

  const handleOpenProject = async (projectId: string) => {
    if (projectId === currentProjectId) {
      router.push('/');
      return;
    }
    const ok = await loadProject(projectId);
    if (ok) router.push('/');
  };

  const handleStartNew = () => {
    setCurrentProjectId(null);
    router.push('/context-selection');
  };

  const getProjectLabel = (p: IvyProject) => {
    const ctx = p.applicationContext;
    if (ctx.type === 'my-company') return ctx.companyName;
    if (ctx.type === 'case-study') return ctx.caseName;
    if (ctx.type === 'hypothetical') return ctx.category;
    return 'Observer Mode';
  };

  const getProjectTypeLabel = (p: IvyProject) => {
    const t = p.applicationContext.type;
    if (t === 'my-company') return 'My Company';
    if (t === 'case-study') return 'Case Study';
    if (t === 'hypothetical') return 'Hypothetical';
    return 'Observer';
  };

  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="mb-8">
          <a href="/" className="inline-flex items-center gap-3 mb-6" aria-label="IVY home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <span className="shrink-0 flex items-center justify-center -translate-y-0.5">
              <img src="/ivy-corner-logo.png" alt="" className="h-12 w-12 object-contain" />
            </span>
            <span className="font-cinzel-decorative font-bold text-xl uppercase text-ink">IVY</span>
          </a>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="tier-1-gravitas text-2xl sm:text-4xl mb-2">Dashboard</h1>
              <p className="text-sm font-normal text-charcoal/55">
                Open a project or start a new one. {user ? 'Your data is saved to the cloud and visible only to you.' : 'Log in to save and see your projects across devices.'}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {user ? (
                <>
                  <span className="text-xs text-charcoal/60 truncate max-w-[140px] sm:max-w-[200px]" title={user.email ?? ''}>
                    {user.email}
                  </span>
                  <button
                    type="button"
                    onClick={() => signOut().then(() => router.push('/dashboard'))}
                    className="label-small-caps text-charcoal/60 hover:text-ink border border-charcoal/20 px-3 py-2 text-sm"
                  >
                    Log out
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  className="label-small-caps btn-dark px-4 py-2 text-sm inline-block"
                >
                  Log in
                </Link>
              )}
            </div>
          </div>
        </div>

        <div className="mb-8">
          <button
            onClick={handleStartNew}
            className="w-full command-center p-6 text-left hover:shadow-md transition-all border-2 border-dashed border-charcoal/20 hover:border-oxblood/40"
            style={{ borderRadius: 0 }}
          >
            <span className="label-small-caps text-charcoal/60 mb-2 block">START NEW PROJECT</span>
            <h2 className="tier-2-instruction text-xl mb-2">My Company / Client</h2>
            <p className="tier-3-guidance text-sm">Apply to a real business you work on.</p>
            <h2 className="tier-2-instruction text-xl mt-4 mb-2">Case Study</h2>
            <p className="tier-3-guidance text-sm">Work through a provided case.</p>
            <h2 className="tier-2-instruction text-xl mt-4 mb-2">Hypothetical</h2>
            <p className="tier-3-guidance text-sm">Build a hypothetical business.</p>
            <h2 className="tier-2-instruction text-xl mt-4 mb-2">Observer Mode</h2>
            <p className="tier-3-guidance text-sm">Read-only, no data saved.</p>
          </button>
        </div>

        <div>
          {currentProject && (
            <div className="mb-6">
              <h2 className="tier-2-instruction text-xl mb-4">Current session</h2>
              <button
                onClick={() => handleOpenProject(currentProject.id)}
                className="w-full command-center p-4 text-left hover:shadow-md transition-all flex items-center justify-between border-2 border-oxblood/30"
                style={{ borderRadius: 0 }}
              >
                <div>
                  <p className="tier-2-instruction font-medium">{getProjectLabel(currentProject)}</p>
                  <p className="tier-3-guidance text-xs text-charcoal/60">
                    {getProjectTypeLabel(currentProject)} · {currentProject.progress.completedModules.length} / 35 modules · Board: {currentProject.state?.boardCredibilityScore ?? 0}
                  </p>
                </div>
                <span className="label-small-caps text-oxblood">Open</span>
              </button>
            </div>
          )}
          <h2 className="tier-2-instruction text-xl mb-4">Your projects</h2>
          {loading ? (
            <p className="tier-3-guidance">Loading…</p>
          ) : projects.length === 0 && !currentProject ? (
            <p className="tier-3-guidance text-charcoal/70">No projects yet. Start a new one above.</p>
          ) : projects.length === 0 && currentProject ? (
            <p className="tier-3-guidance text-charcoal/70">No other projects in the cloud. Your current session is above.</p>
          ) : (
            <ul className="space-y-3">
              {projects.filter((p) => p.id !== currentProjectId).map((p) => (
                <li key={p.id}>
                  <button
                    onClick={() => handleOpenProject(p.id)}
                    className="w-full command-center p-4 text-left hover:shadow-md transition-all flex items-center justify-between"
                    style={{ borderRadius: 0 }}
                  >
                    <div>
                      <p className="tier-2-instruction font-medium">{getProjectLabel(p)}</p>
                      <p className="tier-3-guidance text-xs text-charcoal/60">
                        {getProjectTypeLabel(p)} · {p.progress.completedModules.length} / 35 modules · Board: {p.state.boardCredibilityScore}
                      </p>
                    </div>
                    <span className="label-small-caps text-charcoal/50">Open</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
