'use client';

import { useState } from 'react';
import { getQuizForModule } from '@/data/moduleQuizzes';

interface ModuleQuizProps {
  moduleId: string;
}

export default function ModuleQuiz({ moduleId }: ModuleQuizProps) {
  const quiz = getQuizForModule(moduleId);
  const [selected, setSelected] = useState<{ [qId: string]: number }>({});
  const [submitted, setSubmitted] = useState(false);

  if (!quiz || quiz.questions.length === 0) return null;

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const correctCount = quiz.questions.filter((q) => selected[q.id] === q.correctIndex).length;
  const allAnswered = quiz.questions.every((q) => selected[q.id] !== undefined);

  return (
    <div className="command-center p-6 mb-8 border border-charcoal/20 vertical-rule" style={{ borderRadius: 0 }}>
      <h3 className="tier-2-instruction text-xl mb-2">KEY CONCEPTS CHECK</h3>
      <p className="label-small-caps text-charcoal/60 mb-4">
        Ivy syllabus: {quiz.title}
      </p>

      <div className="space-y-6">
        {quiz.questions.map((q) => {
          const userChoice = selected[q.id];
          const isCorrect = userChoice === q.correctIndex;
          const showResult = submitted;

          return (
            <div key={q.id} className="border-b border-charcoal/10 pb-4 last:border-0">
              <p className="tier-2-instruction text-base mb-3">{q.question}</p>
              <div className="space-y-2">
                {q.options.map((opt, idx) => {
                  let bg = 'bg-cream border-charcoal/20';
                  if (showResult) {
                    if (idx === q.correctIndex) bg = 'bg-green-50 border-green-400';
                    else if (userChoice === idx) bg = 'bg-red-50 border-red-400';
                  }
                  return (
                    <label
                      key={idx}
                      className={`flex items-center gap-3 p-3 border cursor-pointer transition-colors ${bg} ${!submitted ? 'hover:bg-parchment/50' : ''}`}
                      style={{ borderRadius: 0 }}
                    >
                      <input
                        type="radio"
                        name={q.id}
                        checked={userChoice === idx}
                        onChange={() => !submitted && setSelected((s) => ({ ...s, [q.id]: idx }))}
                        disabled={submitted}
                        className="w-4 h-4"
                      />
                      <span className="text-sm text-charcoal">{opt}</span>
                    </label>
                  );
                })}
              </div>
              {showResult && q.rationale && (
                <p className="tier-3-guidance text-xs mt-3 text-charcoal/70 italic">
                  {q.rationale}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {!submitted ? (
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!allAnswered}
          className="btn-formal mt-6"
        >
          Submit Answers
        </button>
      ) : (
        <p className="font-mono text-sm mt-6 text-charcoal/80">
          Score: {correctCount} / {quiz.questions.length}
          {correctCount === quiz.questions.length && ' — Board-ready.'}
        </p>
      )}
    </div>
  );
}
