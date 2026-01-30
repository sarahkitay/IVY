import { Module } from '@/types';
import { modules as pillar1Modules } from './modules';
import { pillar2Modules } from './pillar2-modules';
import { pillar3Modules } from './pillar3-modules';

// Combined modules helper
export const getAllModules = (): Module[] => {
  return [...pillar1Modules, ...pillar2Modules, ...pillar3Modules];
};

export const getModuleById = (id: string): Module | undefined => {
  const allModules = getAllModules();
  return allModules.find((m) => m.id === id);
};

export const getModulesByPillar = (pillar: 'pillar-1' | 'pillar-2' | 'pillar-3'): Module[] => {
  const allModules = getAllModules();
  return allModules.filter((m) => m.pillar === pillar).sort((a, b) => a.order - b.order);
};

export const getModulesInOrder = (): Module[] => {
  return getAllModules().sort((a, b) => {
    // Sort by pillar first, then by order
    if (a.pillar !== b.pillar) {
      return a.pillar.localeCompare(b.pillar);
    }
    return a.order - b.order;
  });
};
