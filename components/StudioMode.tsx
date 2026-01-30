'use client';

import { useCallback } from 'react';
import { useBusinessState } from '@/store/useBusinessState';
import { STUDIO_PEER_SAMPLES } from '@/data/studioSamples';
import PeerCritiqueCard from '@/components/PeerCritiqueCard';
import type { PeerCritique } from '@/types';

const CREDIBILITY_BONUS_FOR_TWO_CRITIQUES = 10;

interface StudioModeProps {
  /** Current memo content (from Board Memo tab — generate first). */
  memoContent: string;
  /** Callback when user submits memo for critique (parent may save to state). */
  onSubmitForCritique?: (memoSnapshot: string) => void;
}

export default function StudioMode({ memoContent, onSubmitForCritique }: StudioModeProps) {
  const { state, replaceState, updateBoardCredibility } = useBusinessState();

  const studioSubmission = state.studioSubmission;
  const peerCritiquesGiven = state.peerCritiquesGiven ?? {};
  const critiqueCount = Object.keys(peerCritiquesGiven).length;
  const hasBonus = state.studioCredibilityBonusApplied === true;

  const handleSubmitForCritique = useCallback(() => {
    if (!memoContent.trim()) return;
    const snapshot = memoContent;
    replaceState({
      studioSubmission: {
        memoSnapshot: snapshot,
        submittedAt: new Date().toISOString(),
      },
    });
    onSubmitForCritique?.(snapshot);
  }, [memoContent, replaceState, onSubmitForCritique]);

  const handleCritiqueSubmit = useCallback(
    (peerId: string, critique: PeerCritique) => {
      const previousCount = Object.keys(peerCritiquesGiven).length;
      replaceState({
        peerCritiquesGiven: {
          ...peerCritiquesGiven,
          [peerId]: critique,
        },
      });
      const newCount = previousCount + 1;
      if (newCount >= 2 && !hasBonus) {
        updateBoardCredibility(CREDIBILITY_BONUS_FOR_TWO_CRITIQUES);
        replaceState({ studioCredibilityBonusApplied: true });
      }
    },
    [peerCritiquesGiven, replaceState, hasBonus, updateBoardCredibility]
  );

  return (
    <div className="space-y-8">
      {/* Submit memo for critique */}
      <section className="command-center p-6 border border-charcoal/20" style={{ borderRadius: 0 }}>
        <h2 className="tier-2-instruction text-xl mb-2">Submit memo for critique</h2>
        <p className="tier-3-guidance text-charcoal/70 mb-4">
          Submit your Board Memo to the studio. Peers will critique it (and you will critique 2 peers). Generate your memo from the Board Memo tab first if you haven&apos;t yet.
        </p>
        {studioSubmission ? (
          <div className="p-4 bg-parchment/30 border border-sage/30">
            <p className="label-small-caps text-sage mb-1">Submitted for critique</p>
            <p className="text-sm text-charcoal/70">
              Your memo was submitted on {new Date(studioSubmission.submittedAt).toLocaleDateString()}. Complete 2 peer critiques below to earn the credibility bonus.
            </p>
          </div>
        ) : (
          <button
            type="button"
            onClick={handleSubmitForCritique}
            disabled={!memoContent.trim()}
            className="btn-formal disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Submit memo for critique
          </button>
        )}
        {!memoContent.trim() && (
          <p className="text-sm text-charcoal/50 mt-2">
            Generate your memo from the Board Memo tab first, then return here to submit.
          </p>
        )}
      </section>

      {/* Critique 2 peers */}
      <section>
        <h2 className="tier-2-instruction text-xl mb-2">Critique 2 peers</h2>
        <p className="tier-3-guidance text-charcoal/70 mb-4">
          Use the rubric below for each anonymized peer memo. Completing 2 critiques earns +{CREDIBILITY_BONUS_FOR_TWO_CRITIQUES} Board Credibility.
        </p>
        <div className="space-y-6">
          {STUDIO_PEER_SAMPLES.map((peer) => (
            <PeerCritiqueCard
              key={peer.id}
              peer={peer}
              existingCritique={peerCritiquesGiven[peer.id]}
              onSubmit={(critique) => handleCritiqueSubmit(peer.id, critique)}
            />
          ))}
        </div>
      </section>

      {/* Credibility impact */}
      <section className="p-6 border border-charcoal/15 bg-parchment/20" style={{ borderRadius: 0 }}>
        <h2 className="tier-2-instruction text-lg mb-2">Credibility impact</h2>
        <p className="text-sm text-charcoal/70 mb-2">
          Board Credibility: <strong>{state.boardCredibilityScore}/100</strong>
          {hasBonus && (
            <span className="text-sage ml-2">(+{CREDIBILITY_BONUS_FOR_TWO_CRITIQUES} from Studio)</span>
          )}
        </p>
        {critiqueCount < 2 ? (
          <p className="text-sm text-charcoal/60">
            Complete {2 - critiqueCount} more critique{2 - critiqueCount === 1 ? '' : 's'} to earn +{CREDIBILITY_BONUS_FOR_TWO_CRITIQUES} Board Credibility.
          </p>
        ) : (
          <p className="text-sm text-sage">
            You&apos;ve completed 2 peer critiques. Your credibility bonus has been applied.
          </p>
        )}
      </section>

      {/* Your critiques received (placeholder) */}
      <section className="p-6 border border-charcoal/10 bg-parchment/10" style={{ borderRadius: 0 }}>
        <h2 className="tier-2-instruction text-lg mb-2">Critiques you receive</h2>
        <p className="text-sm text-charcoal/60">
          When peers critique your memo, their feedback will appear here. In a live cohort, you&apos;d receive 2 anonymized critiques; this build uses sample memos for you to practice giving critique.
        </p>
      </section>
    </div>
  );
}
