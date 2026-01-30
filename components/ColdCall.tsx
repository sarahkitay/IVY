'use client';

import { useState, useEffect } from 'react';
import { ColdCall as ColdCallType } from '@/types';
import { useBusinessState } from '@/store/useBusinessState';

interface ColdCallProps {
  coldCall: ColdCallType;
  onComplete: (response: string) => void;
  onClose: () => void;
}

export default function ColdCall({ coldCall, onComplete, onClose }: ColdCallProps) {
  const [timeRemaining, setTimeRemaining] = useState(coldCall.timeLimit);
  const [response, setResponse] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { updateBoardCredibility } = useBusinessState();

  useEffect(() => {
    if (timeRemaining <= 0 && !submitted) {
      // Time expired - apply penalty
      updateBoardCredibility(-coldCall.penalty);
      onComplete('');
      return;
    }

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          if (!submitted) {
            updateBoardCredibility(-coldCall.penalty);
            onComplete('');
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining, submitted, coldCall.penalty, updateBoardCredibility, onComplete]);

  const validateResponse = (text: string): boolean => {
    // Check minimum length
    if (coldCall.semanticCriteria.minLength && text.length < coldCall.semanticCriteria.minLength) {
      return false;
    }

    // Check maximum length
    if (coldCall.semanticCriteria.maxLength && text.length > coldCall.semanticCriteria.maxLength) {
      return false;
    }

    // Check for hedging (no hedging requirement)
    if (coldCall.semanticCriteria.noHedging) {
      const hedgingWords = ['maybe', 'perhaps', 'possibly', 'might', 'could', 'sort of', 'kind of', 'a bit'];
      const lowerText = text.toLowerCase();
      if (hedgingWords.some((word) => lowerText.includes(word))) {
        return false;
      }
    }

    return true;
  };

  const handleSubmit = () => {
    if (validateResponse(response)) {
      setSubmitted(true);
      onComplete(response);
    } else {
      // Invalid response - apply penalty
      updateBoardCredibility(-coldCall.penalty);
      onComplete(response);
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50">
      <div 
        className={`absolute inset-0 bg-charcoal/95 backdrop-blur-sm cold-call-active`} 
        style={{ filter: 'grayscale(100%)' }} 
      />
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="bg-white p-8 max-w-2xl w-full shadow-2xl" style={{ borderRadius: 0 }}>
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-charcoal/20">
          <div className="flex items-center gap-3">
            <span className="text-4xl">⏱</span>
            <div>
              <span className="font-mono text-3xl font-bold text-charcoal">
                {formatTime(timeRemaining)}
              </span>
              <p className="tier-3-guidance mt-1">
                {timeRemaining} seconds remaining
              </p>
            </div>
          </div>
          {timeRemaining < 30 && (
            <span className="text-oxblood font-semibold tier-1-gravitas">Time Running Out</span>
          )}
        </div>

        <div className="mb-6">
          <h2 className="tier-1-gravitas text-2xl mb-4">Cold Call</h2>
          <p className="tier-2-instruction text-lg long-text">{coldCall.question}</p>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-charcoal mb-2">
            Your Answer (One sentence. No hedging.)
          </label>
          <textarea
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            disabled={submitted || timeRemaining === 0}
            className="w-full worksheet-field min-h-[120px] font-sans"
            placeholder="Type your answer here..."
            autoFocus
          />
          <p className="tier-3-guidance mt-2">
            {coldCall.semanticCriteria.minLength && `Minimum ${coldCall.semanticCriteria.minLength} characters. `}
            {coldCall.semanticCriteria.noHedging && 'No hedging words (maybe, perhaps, might, etc.).'}
          </p>
        </div>

        <div className="flex gap-4">
          <button
            onClick={handleSubmit}
            disabled={submitted || timeRemaining === 0 || !response.trim()}
            className="btn-formal"
          >
            Enter Record
          </button>
          {submitted && (
            <button
              onClick={onClose}
              className="bg-sage text-white px-6 py-3 rounded-sm hover:bg-sage/80 transition-all"
            >
              Continue
            </button>
          )}
        </div>

        {timeRemaining === 0 && !submitted && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-sm">
            <p className="text-red-800 font-medium">Time expired. Board Credibility -{coldCall.penalty} points.</p>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}
