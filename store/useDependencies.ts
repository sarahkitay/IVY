import { create } from 'zustand';
import { useBusinessState } from './useBusinessState';

interface Dependency {
  sourceModule: string;
  sourceField: string;
  targetModule: string;
  targetField: string;
  validation: (sourceValue: any, targetValue: any) => { valid: boolean; message: string };
}

// Define dependency rules
const dependencies: Dependency[] = [
  {
    sourceModule: 'module-4',
    sourceField: 'target-customer',
    targetModule: 'module-6',
    targetField: 'ltv-range',
    validation: (sourceValue, targetValue) => {
      if (sourceValue && targetValue) {
        // If target customer changed, LTV assumptions need re-verification
        return {
          valid: false,
          message: 'Your LTV assumptions were based on a different segment. Re-verify math.',
        };
      }
      return { valid: true, message: '' };
    },
  },
  {
    sourceModule: 'module-4',
    sourceField: 'anti-customer',
    targetModule: 'module-5',
    targetField: 'value-wedge',
    validation: (sourceValue, targetValue) => {
      if (sourceValue && !targetValue) {
        return {
          valid: false,
          message: 'Your value wedge must account for the customers you\'re excluding.',
        };
      }
      return { valid: true, message: '' };
    },
  },
  {
    sourceModule: 'module-5',
    sourceField: 'value-wedge',
    targetModule: 'module-6',
    targetField: 'contribution-margin',
    validation: (sourceValue, targetValue) => {
      if (sourceValue && targetValue) {
        // Value wedge should align with contribution margin
        return { valid: true, message: '' };
      }
      return { valid: true, message: '' };
    },
  },
];

interface DependencyStore {
  checkDependencies: (moduleId: string) => Array<{ moduleId: string; message: string }>;
  getInvalidatedModules: () => string[];
}

export const useDependencies = create<DependencyStore>((set, get) => ({
  checkDependencies: (moduleId: string) => {
    const { state } = useBusinessState.getState();
    const warnings: Array<{ moduleId: string; message: string }> = [];

    dependencies.forEach((dep) => {
      if (dep.sourceModule === moduleId) {
        const sourceOutput = state.moduleOutputs[dep.sourceModule];
        const targetOutput = state.moduleOutputs[dep.targetModule];

        if (sourceOutput && targetOutput) {
          const sourceValue = sourceOutput.requiredOutputs?.[dep.sourceField] ||
                           sourceOutput.worksheets?.[dep.sourceField]?.fields?.[dep.sourceField];
          const targetValue = targetOutput.requiredOutputs?.[dep.targetField] ||
                            targetOutput.worksheets?.[dep.targetField]?.fields?.[dep.targetField];

          const result = dep.validation(sourceValue, targetValue);
          if (!result.valid) {
            warnings.push({
              moduleId: dep.targetModule,
              message: result.message,
            });
          }
        }
      }
    });

    return warnings;
  },

  getInvalidatedModules: () => {
    const { state } = useBusinessState.getState();
    const invalidated: string[] = [];

    dependencies.forEach((dep) => {
      const sourceOutput = state.moduleOutputs[dep.sourceModule];
      const targetOutput = state.moduleOutputs[dep.targetModule];

      if (sourceOutput && targetOutput) {
        const sourceValue = sourceOutput.requiredOutputs?.[dep.sourceField] ||
                           sourceOutput.worksheets?.[dep.sourceField]?.fields?.[dep.sourceField];
        const targetValue = targetOutput.requiredOutputs?.[dep.targetField] ||
                          targetOutput.worksheets?.[dep.targetField]?.fields?.[dep.targetField];

        const result = dep.validation(sourceValue, targetValue);
        if (!result.valid) {
          if (!invalidated.includes(dep.targetModule)) {
            invalidated.push(dep.targetModule);
          }
        }
      }
    });

    return invalidated;
  },
}));
