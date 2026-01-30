'use client';

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { getModuleById } from '@/data/all-modules';
import { getQuizForModule } from '@/data/moduleQuizzes';
import { useBusinessState } from '@/store/useBusinessState';
import ModuleQuiz from '@/components/ModuleQuiz';

export default function ModuleQuizPage() {
  const params = useParams();
  const router = useRouter();
  const moduleId = params.id as string;
  const moduleData = getModuleById(moduleId);
  const quiz = getQuizForModule(moduleId);
  const { updateModuleOutput } = useBusinessState();

  if (!moduleData) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif text-2xl mb-4">Module not found</h1>
          <button
            onClick={() => router.push('/')}
            className="bg-ink text-white px-6 py-3 rounded-sm hover:bg-charcoal"
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  if (!quiz || quiz.questions.length === 0) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <h1 className="font-serif text-xl mb-4">No quiz for this module</h1>
          <Link
            href={`/modules/${moduleId}`}
            className="inline-block bg-ink text-cream px-6 py-3 hover:bg-charcoal transition-colors"
          >
            Back to module
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen h-screen bg-cream flex flex-col">
      <header className="flex-none border-b border-charcoal/15 bg-parchment/50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link
            href={`/modules/${moduleId}`}
            className="label-small-caps text-charcoal/70 hover:text-ink transition-colors"
          >
            ← Back to module
          </Link>
          <span className="label-small-caps text-charcoal/50">{moduleData.title}</span>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto py-8 sm:py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="mb-8 p-4 border border-charcoal/20 bg-parchment/30" style={{ borderRadius: 0 }}>
            <p className="tier-3-guidance text-sm text-charcoal/80">
              This check is separate from the module. You cannot refer back to the content while answering. Answer from memory to confirm key concepts.
            </p>
          </div>

          <ModuleQuiz
            moduleId={moduleId}
            standalone
            onQuizComplete={(correctCount, total, conceptIncomplete) => {
              updateModuleOutput(moduleId, {
                quizScore: correctCount,
                quizTotal: total,
                quizConceptIncomplete: conceptIncomplete ?? false,
              });
            }}
          />

          <div className="mt-8 pt-6 border-t border-charcoal/10">
            <Link
              href={`/modules/${moduleId}`}
              className="inline-block label-small-caps text-charcoal/70 hover:text-ink transition-colors"
            >
              ← Back to module
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
