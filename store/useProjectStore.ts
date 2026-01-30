import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { IvyProject } from '@/types/project';
import { ApplicationContext } from '@/types/context';
import { BusinessState } from '@/types';
import { Progress } from '@/types';
import { createProject as createProjectInFirebase, getProject, listProjects as listProjectsFromFirebase, updateProject as updateProjectInFirebase } from '@/lib/projects';
import { useBusinessState } from './useBusinessState';
import { useProgress } from './useProgress';

const CURRENT_PROJECT_KEY = 'ivy-current-project-id';

interface ProjectStore {
  currentProjectId: string | null;
  setCurrentProjectId: (id: string | null) => void;
  loadProject: (projectId: string) => Promise<boolean>;
  createProject: (name: string, context: ApplicationContext) => Promise<string>;
  listProjects: () => Promise<IvyProject[]>;
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
        replaceState({
          applicationContext: project.applicationContext,
          moduleOutputs: project.state.moduleOutputs,
          boardCredibilityScore: project.state.boardCredibilityScore,
          economicConstraints: project.state.economicConstraints,
          controlLogic: project.state.controlLogic,
        });
        setProgress(project.progress);
        set({ currentProjectId: projectId });
        return true;
      },

      createProject: async (name, context) => {
        const { setApplicationContext, reset: resetBusiness } = useBusinessState.getState();
        const { setProgress } = useProgress.getState();
        const initialProgress: Progress = {
          currentModule: 'module-1',
          completedModules: [],
          unlockedModules: ['module-1'],
          overallProgress: 0,
          pillar1Progress: 0,
          pillar2Progress: 0,
          pillar3Progress: 0,
        };
        resetBusiness();
        setApplicationContext(context);
        setProgress(initialProgress);
        const state = useBusinessState.getState().state;
        const progress = useProgress.getState().progress;

        const localId = `local-${Date.now()}`;
        set({ currentProjectId: localId });

        createProjectInFirebase(name, context, state, progress)
          .then((realId) => {
            set({ currentProjectId: realId });
            get().syncCurrentProjectToFirebase();
          })
          .catch(() => {});

        return localId;
      },

      listProjects: async () => {
        const list = await listProjectsFromFirebase(30);
        set({ cachedProjects: list });
        return list;
      },

      syncCurrentProjectToFirebase: async () => {
        const { currentProjectId } = get();
        if (!currentProjectId || String(currentProjectId).startsWith('local-')) return;
        const { state } = useBusinessState.getState();
        const { progress } = useProgress.getState();
        await updateProjectInFirebase(
          currentProjectId,
          {
            moduleOutputs: state.moduleOutputs,
            boardCredibilityScore: state.boardCredibilityScore,
            economicConstraints: state.economicConstraints,
            controlLogic: state.controlLogic,
          },
          progress
        );
      },
    }),
    { name: 'ivy-project-store', partialize: (s) => ({ currentProjectId: s.currentProjectId }) }
  )
);
