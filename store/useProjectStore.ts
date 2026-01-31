import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { IvyProject } from '@/types/project';
import { ApplicationContext } from '@/types/context';
import { BusinessState } from '@/types';
import { Progress } from '@/types';
import { auth } from '@/lib/firebase';
import { createProject as createProjectInFirebase, getProject, listProjects as listProjectsFromFirebase, updateProject as updateProjectInFirebase } from '@/lib/projects';
import { getObserverPrefill, getAllModuleIds } from '@/data/observerPrefill';
import { getCaseStudyById } from '@/data/caseStudies';
import { useBusinessState } from './useBusinessState';
import { useProgress } from './useProgress';

const CURRENT_PROJECT_KEY = 'ivy-current-project-id';

interface ProjectStore {
  currentProjectId: string | null;
  setCurrentProjectId: (id: string | null) => void;
  loadProject: (projectId: string) => Promise<boolean>;
  createProject: (name: string, context: ApplicationContext) => Promise<string>;
  listProjects: (userId: string | null) => Promise<IvyProject[]>;
  cachedProjects: IvyProject[] | null;
  syncCurrentProjectToFirebase: () => Promise<void>;
}

export const useProjectStore = create<ProjectStore>()(
  persist(
    (set, get) => ({
      currentProjectId: null,
      cachedProjects: null,

      setCurrentProjectId: (id) => set({ currentProjectId: id }),

      loadProject: async (projectId) => {
        const project = await getProject(projectId);
        if (!project) return false;
        const { replaceState } = useBusinessState.getState();
        const { setProgress } = useProgress.getState();
        const isObserver = project.state.applicationContext?.type === 'observer';
        const allIds = getAllModuleIds();
        replaceState({
          applicationContext: project.state.applicationContext ?? project.applicationContext,
          moduleOutputs: isObserver ? { ...getObserverPrefill(), ...(project.state.moduleOutputs ?? {}) } : (project.state.moduleOutputs ?? {}),
          boardCredibilityScore: project.state.boardCredibilityScore ?? 0,
          economicConstraints: project.state.economicConstraints ?? {},
          controlLogic: project.state.controlLogic ?? {},
          strategyNote: project.state.strategyNote,
          boardMemoRubricScore: project.state.boardMemoRubricScore,
          stakeholderMap: project.state.stakeholderMap,
          boardPushbackResponses: project.state.boardPushbackResponses,
          coldCallDefenseResponses: project.state.coldCallDefenseResponses,
          strategicThesisLedger: project.state.strategicThesisLedger,
          studioSubmission: project.state.studioSubmission,
          peerCritiquesGiven: project.state.peerCritiquesGiven,
          studioCredibilityBonusApplied: project.state.studioCredibilityBonusApplied,
          caseMode: project.state.caseMode,
          activeCasePackId: project.state.activeCasePackId,
        });
        setProgress(isObserver ? { ...project.progress, unlockedModules: allIds } : project.progress);
        set({ currentProjectId: projectId });
        return true;
      },

      createProject: async (name, context) => {
        const { setApplicationContext, replaceState, reset: resetBusiness } = useBusinessState.getState();
        const { setProgress } = useProgress.getState();
        const allModuleIds = getAllModuleIds();
        const isObserver = context.type === 'observer';
        const initialProgress: Progress = {
          currentModule: 'module-1',
          completedModules: [],
          unlockedModules: isObserver ? allModuleIds : ['module-1'],
          overallProgress: 0,
          pillar1Progress: 0,
          pillar2Progress: 0,
          pillar3Progress: 0,
        };
        resetBusiness();
        setApplicationContext(context);
        if (isObserver) {
          replaceState({ moduleOutputs: getObserverPrefill() });
        } else if (context.type === 'case-study') {
          const caseStudy = getCaseStudyById(context.caseId);
          const prefill = caseStudy?.prefillData;
          if (prefill && Object.keys(prefill).length > 0) {
            const merged: Record<string, import('@/types').ModuleOutput> = {};
            for (const [modId, worksheets] of Object.entries(prefill)) {
              const wsMap: Record<string, { worksheetId: string; fields: Record<string, string | number | boolean>; completed: boolean }> = {};
              for (const [wsId, fields] of Object.entries(worksheets)) {
                wsMap[wsId] = { worksheetId: wsId, fields: { ...fields } as Record<string, string | number | boolean>, completed: true };
              }
              merged[modId] = {
                moduleId: modId,
                completed: false,
                requiredOutputs: {},
                worksheets: wsMap,
                timestamp: new Date().toISOString(),
              };
            }
            replaceState({ moduleOutputs: merged });
          }
        }
        setProgress(initialProgress);
        const state = useBusinessState.getState().state;
        const progress = useProgress.getState().progress;

        const localId = `local-${Date.now()}`;
        set({ currentProjectId: localId });

        const uid = auth.currentUser?.uid;
        if (uid) {
          createProjectInFirebase(name, context, state, progress, uid)
            .then((realId) => {
              set({ currentProjectId: realId });
              get().syncCurrentProjectToFirebase();
            })
            .catch(() => {});
        }

        return localId;
      },

      listProjects: async (userId) => {
        const list = await listProjectsFromFirebase(userId ?? null, 30);
        set({ cachedProjects: list });
        return list;
      },

      syncCurrentProjectToFirebase: async () => {
        const { currentProjectId } = get();
        if (!currentProjectId || String(currentProjectId).startsWith('local-')) return;
        const { state } = useBusinessState.getState();
        const { progress } = useProgress.getState();
        await updateProjectInFirebase(currentProjectId, state, progress);
      },
    }),
    { name: 'ivy-project-store', partialize: (s) => ({ currentProjectId: s.currentProjectId }) }
  )
);
