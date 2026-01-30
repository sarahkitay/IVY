import { create } from 'zustand';
import { BusinessState, ModuleOutput, Experiment } from '@/types';
import { ApplicationContext } from '@/types/context';
import type { CaseMode } from '@/types/case';

interface BusinessStateStore {
  state: BusinessState;
  updateEconomicConstraints: (constraints: Partial<BusinessState['economicConstraints']>) => void;
  updateModuleOutput: (moduleId: string, output: Partial<ModuleOutput>) => void;
  addExperiment: (experiment: Experiment) => void;
  updateBoardCredibility: (delta: number) => void;
  setApplicationContext: (context: ApplicationContext) => void;
  setCaseMode: (mode: CaseMode, casePackId?: string) => void;
  replaceState: (state: Partial<BusinessState>) => void;
  reset: () => void;
}

const initialState: BusinessState = {
  economicConstraints: {},
  moduleOutputs: {},
  boardCredibilityScore: 0,
  applicationContext: undefined,
  caseMode: 'my-company',
  activeCasePackId: undefined,
  lastUpdated: new Date().toISOString(),
};

export const useBusinessState = create<BusinessStateStore>((set) => ({
  state: initialState,
  
  updateEconomicConstraints: (constraints) =>
    set((store) => ({
      state: {
        ...store.state,
        economicConstraints: {
          ...store.state.economicConstraints,
          ...constraints,
        },
        lastUpdated: new Date().toISOString(),
      },
    })),
  
  updateModuleOutput: (moduleId, output) =>
    set((store) => {
      const existing = store.state.moduleOutputs[moduleId];
      const worksheets = output.worksheets
        ? { ...(existing?.worksheets || {}), ...output.worksheets }
        : existing?.worksheets;
      const requiredOutputs = output.requiredOutputs
        ? { ...(existing?.requiredOutputs || {}), ...output.requiredOutputs }
        : existing?.requiredOutputs;
      const { worksheets: _w, requiredOutputs: _ro, ...rest } = output;
      const merged = {
        ...existing,
        moduleId,
        ...rest,
        ...(worksheets && { worksheets }),
        ...(requiredOutputs && { requiredOutputs }),
        timestamp: new Date().toISOString(),
      };
      return {
        state: {
          ...store.state,
          moduleOutputs: {
            ...store.state.moduleOutputs,
            [moduleId]: merged,
          },
          lastUpdated: new Date().toISOString(),
        },
      };
    }),
  
  addExperiment: (experiment) =>
    set((store) => ({
      state: {
        ...store.state,
        controlLogic: {
          ...store.state.controlLogic,
          experiments: [
            ...(store.state.controlLogic?.experiments || []),
            experiment,
          ],
        },
        lastUpdated: new Date().toISOString(),
      },
    })),
  
  updateBoardCredibility: (delta) =>
    set((store) => ({
      state: {
        ...store.state,
        // Allow negative scores to show lost credibility, but cap at 100
        boardCredibilityScore: Math.min(100, store.state.boardCredibilityScore + delta),
        lastUpdated: new Date().toISOString(),
      },
    })),
  
  setApplicationContext: (context) =>
    set((store) => ({
      state: {
        ...store.state,
        applicationContext: context,
        lastUpdated: new Date().toISOString(),
      },
    })),

  setCaseMode: (mode, casePackId) =>
    set((store) => ({
      state: {
        ...store.state,
        caseMode: mode,
        activeCasePackId: mode === 'case' ? casePackId : undefined,
        lastUpdated: new Date().toISOString(),
      },
    })),

  replaceState: (partial) =>
    set((store) => ({
      state: {
        ...store.state,
        ...partial,
        lastUpdated: new Date().toISOString(),
      },
    })),

  reset: () => set({ state: initialState }),
}));
