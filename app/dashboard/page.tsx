'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useProjectStore } from '@/store/useProjectStore';
import { IvyProject } from '@/types/project';
import { caseStudies } from '@/data/caseStudies';

export default function DashboardPage() {
  const router = useRouter();
  const { listProjects, loadProject, setCurrentProjectId } = useProjectStore();
  const [projects, setProjects] = useState<IvyProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listProjects()
      .then(setProjects)
      .catch(() => setProjects([]))
      .finally(() => setLoading(false));
  }, [listProjects]);

  const handleOpenProject = async (projectId: string) => {
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
          <a href="/" className="inline-flex items-center gap-3 mb-6">
            <Image src="/logo.png" alt="Ivy Workbook" width={48} height={48} className="h-12 w-12 object-contain" />
            <span className="tier-1-gravitas text-xl">Ivy Workbook</span>
          </a>
          <h1 className="tier-1-gravitas text-2xl sm:text-4xl mb-2">Dashboard</h1>
          <p className="tier-2-instruction text-lg text-charcoal/80">
            Open a project or start a new one. Each project keeps its own data.
          </p>
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
          <h2 className="tier-2-instruction text-xl mb-4">Your projects</h2>
          {loading ? (
            <p className="tier-3-guidance">Loading…</p>
          ) : projects.length === 0 ? (
            <p className="tier-3-guidance text-charcoal/70">No projects yet. Start a new one above.</p>
          ) : (
            <ul className="space-y-3">
              {projects.map((p) => (
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
