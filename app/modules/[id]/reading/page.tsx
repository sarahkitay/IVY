'use client';

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import { getModuleById } from '@/data/all-modules';
import { useBusinessState } from '@/store/useBusinessState';

const TABS = ['Essentials', 'Key Ideas', 'Listen', 'Apply', 'Reading List'] as const;
type TabId = (typeof TABS)[number];

const EXTRA_CREDIT_PER_BOOK = 5;

export default function ModuleReadingPage() {
  const params = useParams();
  const router = useRouter();
  const moduleId = params.id as string;
  const moduleData = getModuleById(moduleId);
  const { state, updateModuleOutput } = useBusinessState();
  const [activeTab, setActiveTab] = useState<TabId>('Essentials');

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

  const rc = moduleData.readingCompanion;
  const moduleOutput = state.moduleOutputs[moduleId];
  const booksCompleted = moduleOutput?.readingCompanionBooksCompleted ?? {};
  const booksDoneCount = rc ? rc.booksList.filter((b) => booksCompleted[b.id]).length : 0;
  const extraCreditFromBooks = booksDoneCount * EXTRA_CREDIT_PER_BOOK;
  const applyUnlocked =
    !!moduleOutput?.readingCompanionEssentialsCompleted || !!moduleOutput?.readingCompanionListenCompleted;

  if (!rc) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <h1 className="font-serif text-xl mb-4">No Reading Companion for this module</h1>
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

  const toggleBook = (bookId: string) => {
    const next = { ...booksCompleted, [bookId]: !booksCompleted[bookId] };
    updateModuleOutput(moduleId, { readingCompanionBooksCompleted: next });
  };

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <header className="flex-none border-b border-charcoal/15 bg-parchment/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between flex-wrap gap-2">
          <Link
            href={`/modules/${moduleId}`}
            className="label-small-caps text-charcoal/70 hover:text-ink transition-colors"
          >
            ← Back to module
          </Link>
          <span className="label-small-caps text-charcoal/50">{moduleData.title} — Reading</span>
        </div>
        {/* Tabs */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <nav className="flex flex-wrap gap-1 border-b border-charcoal/15 -mb-px">
            {TABS.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-2 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab
                    ? 'border-ink text-ink'
                    : 'border-transparent text-charcoal/60 hover:text-charcoal hover:border-charcoal/30'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto py-8 sm:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Essentials (10 min) */}
          {activeTab === 'Essentials' && (
            <div className="space-y-8">
              <p className="label-small-caps text-charcoal/50">~10 min</p>
              <section>
                <h2 className="tier-2-instruction text-xl mb-2">Canon</h2>
                <p className="font-medium text-charcoal/90">{rc.essentials.canon.title}</p>
                {rc.essentials.canon.author && (
                  <p className="text-sm text-charcoal/60 mb-2">{rc.essentials.canon.author}</p>
                )}
                <p className="tier-3-guidance text-charcoal/80 mb-2">
                  <span className="label-small-caps text-charcoal/50">Core idea:</span> {rc.essentials.canon.coreIdea}
                </p>
                <p className="text-sm text-charcoal/70">
                  <span className="label-small-caps text-charcoal/50">Why this matters here:</span>{' '}
                  {rc.essentials.canon.whyMatters}
                </p>
              </section>
              <section>
                <h2 className="tier-2-instruction text-xl mb-2">Counterpoint</h2>
                <p className="font-medium text-charcoal/90">{rc.essentials.counterpoint.title}</p>
                {rc.essentials.counterpoint.author && (
                  <p className="text-sm text-charcoal/60 mb-2">{rc.essentials.counterpoint.author}</p>
                )}
                <p className="tier-3-guidance text-charcoal/80 mb-2">
                  <span className="label-small-caps text-charcoal/50">Core idea:</span>{' '}
                  {rc.essentials.counterpoint.coreIdea}
                </p>
                <p className="text-sm text-charcoal/70">
                  <span className="label-small-caps text-charcoal/50">Why it matters here:</span>{' '}
                  {rc.essentials.counterpoint.whyMatters}
                </p>
              </section>
              <section>
                <h2 className="tier-2-instruction text-xl mb-2">Operator Artifact</h2>
                <p className="font-medium text-charcoal/90">{rc.essentials.operatorArtifact.title}</p>
                {rc.essentials.operatorArtifact.description && (
                  <p className="text-sm text-charcoal/70 mb-2">{rc.essentials.operatorArtifact.description}</p>
                )}
                {rc.essentials.operatorArtifact.templateFields && (
                  <ul className="list-disc list-inside text-sm text-charcoal/70 space-y-1 mt-2">
                    {rc.essentials.operatorArtifact.templateFields.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                )}
              </section>
              {!state.applicationContext || state.applicationContext.type !== 'observer' ? (
                <label className="flex items-center gap-2 text-sm text-charcoal/70">
                  <input
                    type="checkbox"
                    checked={!!moduleOutput?.readingCompanionEssentialsCompleted}
                    onChange={(e) =>
                      updateModuleOutput(moduleId, { readingCompanionEssentialsCompleted: e.target.checked })
                    }
                  />
                  I&apos;ve read the essentials (unlocks Apply)
                </label>
              ) : null}
            </div>
          )}

          {/* Key Ideas (scan) */}
          {activeTab === 'Key Ideas' && (
            <div className="space-y-6">
              <p className="label-small-caps text-charcoal/50">Scan mode</p>
              <ul className="space-y-3">
                {rc.keyIdeas.map((idea, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-charcoal/40 mt-0.5">•</span>
                    <span className="tier-3-guidance text-charcoal/80">{idea}</span>
                  </li>
                ))}
              </ul>
              {rc.keyExcerpt && (
                <div className="border-l-2 border-sage/50 pl-4 mt-6 py-2">
                  <p className="italic text-charcoal/80">&ldquo;{rc.keyExcerpt.quote}&rdquo;</p>
                  {rc.keyExcerpt.professorNote && (
                    <p className="text-sm text-charcoal/60 mt-2">
                      <span className="label-small-caps">Professor note:</span> {rc.keyExcerpt.professorNote}
                    </p>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Listen (read-aloud) */}
          {activeTab === 'Listen' && (
            <div className="space-y-6">
              <p className="label-small-caps text-charcoal/50">Read-aloud script — for audio or self-read</p>
              <div className="border border-charcoal/20 bg-parchment/30 p-6" style={{ borderRadius: 0 }}>
                <p className="tier-3-guidance text-charcoal/80 leading-relaxed whitespace-pre-line">
                  {rc.listenScript}
                </p>
              </div>
              <p className="text-xs text-charcoal/50">
                Audio controls: 0.8× – 1.4× speed • Highlight as read • Save as audio note (coming in-app)
              </p>
              {!state.applicationContext || state.applicationContext.type !== 'observer' ? (
                <label className="flex items-center gap-2 text-sm text-charcoal/70">
                  <input
                    type="checkbox"
                    checked={!!moduleOutput?.readingCompanionListenCompleted}
                    onChange={(e) =>
                      updateModuleOutput(moduleId, { readingCompanionListenCompleted: e.target.checked })
                    }
                  />
                  I&apos;ve listened / read aloud (unlocks Apply)
                </label>
              ) : null}
            </div>
          )}

          {/* Apply (honors) */}
          {activeTab === 'Apply' && (
            <div className="space-y-6">
              <p className="label-small-caps text-charcoal/50">
                Honors prompt — unlocked when Essentials or Listen is completed
              </p>
              {!applyUnlocked ? (
                <p className="tier-3-guidance text-charcoal/70">
                  Complete <button type="button" onClick={() => setActiveTab('Essentials')} className="underline">Essentials</button> or{' '}
                  <button type="button" onClick={() => setActiveTab('Listen')} className="underline">Listen</button> to unlock.
                </p>
              ) : (
                <>
                  <p className="tier-2-instruction text-lg">{rc.applyPrompt ?? 'What belief are you treating as fact that you have not earned the right to believe?'}</p>
                  <p className="text-sm text-charcoal/60">
                    Rules: Must reference paid behavior; must name a specific failure mode; one paragraph max. High-quality answers increase valuation confidence.
                  </p>
                  {!state.applicationContext || state.applicationContext.type !== 'observer' ? (
                    <textarea
                      value={moduleOutput?.readingCompanionApplyResponse ?? ''}
                      onChange={(e) =>
                        updateModuleOutput(moduleId, { readingCompanionApplyResponse: e.target.value })
                      }
                      placeholder="One paragraph."
                      className="w-full worksheet-field min-h-[120px]"
                      style={{ borderRadius: 0 }}
                    />
                  ) : (
                    <p className="tier-3-guidance text-charcoal/70 italic">Read-only in Observer Mode.</p>
                  )}
                </>
              )}
            </div>
          )}

          {/* Reading List — check off books, extra credit */}
          {activeTab === 'Reading List' && (
            <div className="space-y-6">
              <p className="label-small-caps text-charcoal/50">
                Cross off as you go. +{EXTRA_CREDIT_PER_BOOK} extra credit per book completed.
              </p>
              <div className="flex items-center gap-2 text-sm font-medium text-charcoal/80">
                <span>Extra credit from books this module:</span>
                <span className="font-mono text-gold">{extraCreditFromBooks} pts</span>
                {booksDoneCount > 0 && (
                  <span className="text-charcoal/50">
                    ({booksDoneCount}/{rc.booksList.length} books)
                  </span>
                )}
              </div>
              <ul className="space-y-3">
                {rc.booksList.map((book) => (
                  <li key={book.id} className="flex items-start gap-3">
                    {!state.applicationContext || state.applicationContext.type !== 'observer' ? (
                      <input
                        type="checkbox"
                        id={`book-${book.id}`}
                        checked={!!booksCompleted[book.id]}
                        onChange={() => toggleBook(book.id)}
                        className="mt-1"
                      />
                    ) : null}
                    <label
                      htmlFor={state.applicationContext?.type === 'observer' ? undefined : `book-${book.id}`}
                      className={`flex-1 ${booksCompleted[book.id] ? 'line-through text-charcoal/60' : 'text-charcoal/90'}`}
                    >
                      <span className="font-medium">{book.title}</span>
                      {book.author && (
                        <span className="text-sm text-charcoal/60 ml-2">— {book.author}</span>
                      )}
                      {book.url && (
                        <a
                          href={book.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-sage hover:underline ml-2"
                        >
                          Link
                        </a>
                      )}
                      <span className="label-small-caps text-charcoal/40 ml-2">({book.type})</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
