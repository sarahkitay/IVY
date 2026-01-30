'use client';

import { useEffect, useState } from 'react';
import { useBusinessState } from '@/store/useBusinessState';
import { getModulesInOrder } from '@/data/modules';

/**
 * Global Cold Call Hook
 * 
 * Randomly triggers a "Gray Page" takeover with a Cold Call question.
 * This simulates the high-stakes, unpredictable nature of boardroom scenarios.
 * 
 * Trigger conditions:
 * - User has been active for at least 5 minutes
 * - Random chance (configurable)
 * - User hasn't been cold-called in the last session
 */
export function useColdCallTrigger() {
  const [showColdCall, setShowColdCall] = useState(false);
  const [coldCallQuestion, setColdCallQuestion] = useState<string | null>(null);
  const { state, updateBoardCredibility } = useBusinessState();
  const [lastTriggerTime, setLastTriggerTime] = useState<number | null>(null);

  useEffect(() => {
    // Only trigger if user has completed at least one module
    const hasProgress = Object.keys(state.moduleOutputs).length > 0;
    if (!hasProgress) return;

    // Don't trigger if already shown recently (within 30 minutes)
    const now = Date.now();
    if (lastTriggerTime && now - lastTriggerTime < 30 * 60 * 1000) {
      return;
    }

    // Random trigger (5% chance per minute after 5 minutes of activity)
    const checkInterval = setInterval(() => {
      const shouldTrigger = Math.random() < 0.05; // 5% chance
      
      if (shouldTrigger) {
        // Select a random Cold Call question from completed modules
        const modules = getModulesInOrder();
        const completedModules = modules.filter(
          (m) => state.moduleOutputs[m.id]?.completed
        );
        
        if (completedModules.length > 0) {
          const randomModule = completedModules[
            Math.floor(Math.random() * completedModules.length)
          ];
          
          if (randomModule.coldCall) {
            setColdCallQuestion(randomModule.coldCall.question);
            setShowColdCall(true);
            setLastTriggerTime(now);
          }
        }
      }
    }, 60000); // Check every minute

    return () => clearInterval(checkInterval);
  }, [state.moduleOutputs, lastTriggerTime]);

  const handleColdCallComplete = (response: string) => {
    if (!response || response.trim().length < 20) {
      // Failed - apply penalty
      updateBoardCredibility(-5);
    }
    setShowColdCall(false);
    setColdCallQuestion(null);
  };

  return {
    showColdCall,
    coldCallQuestion,
    handleColdCallComplete,
    dismiss: () => {
      setShowColdCall(false);
      setColdCallQuestion(null);
      updateBoardCredibility(-2); // Small penalty for dismissing
    },
  };
}
