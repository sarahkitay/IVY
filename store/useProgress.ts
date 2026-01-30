import { create } from 'zustand';
import { Progress, Module, RequiredOutput } from '@/types';
import { useBusinessState } from './useBusinessState';
import { calculateBoardCredibilityPoints } from '@/utils/answerQuality';

interface ProgressStore {
  progress: Progress;
  setProgress: (progress: Progress) => void;
  checkModuleUnlock: (module: Module) => boolean;
  completeModule: (moduleId: string) => void;
  getOverallProgress: () => number;
}

const initialProgress: Progress = {
  currentModule: 'module-1',
  completedModules: [],
  unlockedModules: ['module-1'],
  overallProgress: 0,
  pillar1Progress: 0,
  pillar2Progress: 0,
  pillar3Progress: 0,
};

export const useProgress = create<ProgressStore>((set, get) => ({
  progress: initialProgress,

  setProgress: (progress) => set({ progress }),

  checkModuleUnlock: (module: Module) => {
    const { state } = useBusinessState.getState();
    
    // Observer mode cannot unlock modules
    if (state.applicationContext?.type === 'observer') return false;
    
    const moduleOutput = state.moduleOutputs[module.id];
    if (!moduleOutput) return false;
    
    // Check if all required outputs are present
    return module.requiredOutputs.every((req) => {
      if (req.source) {
        // Check worksheet completion
        const worksheet = moduleOutput.worksheets?.[req.source];
        return worksheet?.completed && worksheet.fields[req.id] !== undefined;
      }
      // Check direct output
      return moduleOutput.requiredOutputs?.[req.id] !== undefined;
    });
  },
  
  completeModule: (moduleId) =>
    set((store) => {
      const completed = [...store.progress.completedModules];
      if (!completed.includes(moduleId)) {
        completed.push(moduleId);
        
        // Award Board Credibility points based on completion and answer quality
        const { state, updateBoardCredibility } = useBusinessState.getState();
        const moduleOutput = state.moduleOutputs[moduleId];
        const points = calculateBoardCredibilityPoints(moduleOutput);
        updateBoardCredibility(points);
      }
      
      // Determine pillar and unlock next module
      let nextModuleId: string | null = null;
      const unlocked = [...store.progress.unlockedModules];
      
      if (moduleId.startsWith('module-')) {
        // Pillar 1
        const moduleNum = parseInt(moduleId.split('-')[1]);
        if (moduleNum < 15) {
          nextModuleId = `module-${moduleNum + 1}`;
          if (!unlocked.includes(nextModuleId)) {
            unlocked.push(nextModuleId);
          }
        } else if (moduleNum === 15) {
          // Unlock first Pillar 2 module when Pillar 1 is complete
          nextModuleId = 'p2-module-1';
          if (!unlocked.includes(nextModuleId)) {
            unlocked.push(nextModuleId);
          }
        }
      } else if (moduleId.startsWith('p2-module-')) {
        // Pillar 2
        const moduleNum = parseInt(moduleId.split('-')[2]);
        if (moduleNum < 10) {
          nextModuleId = `p2-module-${moduleNum + 1}`;
          if (!unlocked.includes(nextModuleId)) {
            unlocked.push(nextModuleId);
          }
        } else if (moduleNum === 10) {
          // Unlock first Pillar 3 module when Pillar 2 is complete
          nextModuleId = 'p3-module-1';
          if (!unlocked.includes(nextModuleId)) {
            unlocked.push(nextModuleId);
          }
        }
      } else if (moduleId.startsWith('p3-module-')) {
        // Pillar 3
        const moduleNum = parseInt(moduleId.split('-')[2]);
        if (moduleNum < 10) {
          nextModuleId = `p3-module-${moduleNum + 1}`;
          if (!unlocked.includes(nextModuleId)) {
            unlocked.push(nextModuleId);
          }
        }
      }
      
      // Calculate pillar progress
      const pillar1Completed = completed.filter((id) => id.startsWith('module-')).length;
      const pillar2Completed = completed.filter((id) => id.startsWith('p2-module-')).length;
      const pillar3Completed = completed.filter((id) => id.startsWith('p3-module-')).length;
      
      return {
        progress: {
          ...store.progress,
          completedModules: completed,
          unlockedModules: unlocked,
          currentModule: nextModuleId || store.progress.currentModule,
          pillar1Progress: (pillar1Completed / 15) * 100,
          pillar2Progress: (pillar2Completed / 10) * 100,
          pillar3Progress: (pillar3Completed / 10) * 100,
        },
      };
    }),
  
  getOverallProgress: () => {
    const { progress } = get();
    // Total modules: 15 (Pillar 1) + 10 (Pillar 2) + 10 (Pillar 3) = 35
    return (progress.completedModules.length / 35) * 100;
  },
}));
