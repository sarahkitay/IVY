'use client';

import { useEffect, useState } from 'react';
import { useDependencies } from '@/store/useDependencies';

interface DependencyWarningProps {
  moduleId: string;
}

export default function DependencyWarning({ moduleId }: DependencyWarningProps) {
  const { checkDependencies, getInvalidatedModules } = useDependencies();
  const [warnings, setWarnings] = useState<Array<{ moduleId: string; message: string }>>([]);
  const [isInvalidated, setIsInvalidated] = useState(false);

  useEffect(() => {
    const deps = checkDependencies(moduleId);
    setWarnings(deps);
    
    const invalidated = getInvalidatedModules();
    setIsInvalidated(invalidated.includes(moduleId));
  }, [moduleId, checkDependencies, getInvalidatedModules]);

  if (warnings.length === 0 && !isInvalidated) {
    return null;
  }

  return (
    <div className="mb-6">
      {warnings.map((warning, idx) => (
        <div
          key={idx}
          className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-sm mb-3"
        >
          <p className="text-sm font-medium text-yellow-800 mb-1">Dependency Warning</p>
          <p className="text-sm text-yellow-700">{warning.message}</p>
          <p className="text-xs text-yellow-600 mt-1">
            Module {warning.moduleId} may need re-verification.
          </p>
        </div>
      ))}
      
      {isInvalidated && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-sm">
          <p className="text-sm font-medium text-red-800 mb-1">State Invalidation</p>
          <p className="text-sm text-red-700">
            This module&apos;s assumptions have been invalidated by changes in a prerequisite module.
            Please re-verify your inputs.
          </p>
        </div>
      )}
    </div>
  );
}
