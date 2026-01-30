'use client';

import { useState } from 'react';
import type { PeerCritique, PeerCritiqueDimension } from '@/types';
import { PEER_CRITIQUE_DIMENSIONS } from '@/data/studioSamples';
import type { PeerMemoSample } from '@/data/studioSamples';

const DEFAULT_SCORES: Record<PeerCritiqueDimension, number> = {
  thesisClarity: 3,
  evidenceStrength: 3,
  tradeoffHonesty: 3,
  riskAcknowledgment: 3,
  actionability: 3,
};

interface PeerCritiqueCardProps {
  peer: PeerMemoSample;
  existingCritique?: PeerCritique;
  onSubmit: (critique: PeerCritique) => void;
  disabled?: boolean;
}

export default function PeerCritiqueCard({ peer, existingCritique, onSubmit, disabled }: PeerCritiqueCardProps) {
  const [scores, setScores] = useState<Record<PeerCritiqueDimension, number>>(
    existingCritique?.rubricScores ?? DEFAULT_SCORES
  );
  const [writtenFeedback, setWrittenFeedback] = useState(existingCritique?.writtenFeedback ?? '');
  const [submitted, setSubmitted] = useState(!!existingCritique);

  const handleScore = (dim: PeerCritiqueDimension, value: number) => {
    setScores((prev) => ({ ...prev, [dim]: value }));
  };

  const handleSubmit = () => {
    const critique: PeerCritique = {
      rubricScores: { ...scores },
      writtenFeedback: writtenFeedback.trim() || undefined,
      completedAt: new Date().toISOString(),
    };
    onSubmit(critique);
    setSubmitted(true);
  };

  const allScored = Object.values(scores).every((v) => v >= 1 && v <= 5);

  if (existingCritique) {
    return (
      <div className="border border-charcoal/20 bg-parchment/20 p-6" style={{ borderRadius: 0 }}>
        <h3 className="tier-2-instruction text-lg mb-2">{peer.title} — Critique submitted</h3>
        <div className="flex flex-wrap gap-4 text-sm text-charcoal/80">
          {PEER_CRITIQUE_DIMENSIONS.map((d) => (
            <span key={d.id}>
              {d.label}: <strong>{existingCritique.rubricScores[d.id]}/5</strong>
            </span>
          ))}
        </div>
        {existingCritique.writtenFeedback && (
          <p className="mt-3 text-sm text-charcoal/70 italic">&ldquo;{existingCritique.writtenFeedback}&rdquo;</p>
        )}
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="border border-sage/30 bg-parchment/20 p-6" style={{ borderRadius: 0 }}>
        <h3 className="tier-2-instruction text-lg mb-2">{peer.title} — Critique submitted</h3>
        <div className="flex flex-wrap gap-4 text-sm text-charcoal/80">
          {PEER_CRITIQUE_DIMENSIONS.map((d) => (
            <span key={d.id}>
              {d.label}: <strong>{scores[d.id]}/5</strong>
            </span>
          ))}
        </div>
        {writtenFeedback.trim() && (
          <p className="mt-3 text-sm text-charcoal/70 italic">&ldquo;{writtenFeedback}&rdquo;</p>
        )}
      </div>
    );
  }

  return (
    <div className="border border-charcoal/20 bg-parchment/20 p-6" style={{ borderRadius: 0 }}>
      <h3 className="tier-2-instruction text-lg mb-3">{peer.title}</h3>
      <div className="max-h-48 overflow-y-auto border border-charcoal/10 bg-cream p-4 mb-4 text-sm text-charcoal/80 whitespace-pre-wrap">
        {peer.memoText}
      </div>
      <p className="label-small-caps text-charcoal/60 mb-3">Rubric (1–5)</p>
      <div className="space-y-3 mb-4">
        {PEER_CRITIQUE_DIMENSIONS.map((d) => (
          <div key={d.id} className="flex flex-wrap items-center gap-2">
            <label className="text-sm font-medium text-charcoal/80 w-40 shrink-0">{d.label}</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <label key={n} className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="radio"
                    name={`${peer.id}-${d.id}`}
                    checked={scores[d.id] === n}
                    onChange={() => handleScore(d.id, n)}
                    className="sr-only peer"
                  />
                  <span
                    className={`inline-flex items-center justify-center w-8 h-8 border text-sm ${
                      scores[d.id] === n
                        ? 'border-ink bg-ink text-cream'
                        : 'border-charcoal/30 text-charcoal/70 hover:border-charcoal/50'
                    }`}
                    style={{ borderRadius: 0 }}
                  >
                    {n}
                  </span>
                </label>
              ))}
            </div>
            <span className="text-xs text-charcoal/50">{d.hint}</span>
          </div>
        ))}
      </div>
      <label className="block text-sm font-medium text-charcoal/70 mb-1">Written feedback (optional)</label>
      <textarea
        value={writtenFeedback}
        onChange={(e) => setWrittenFeedback(e.target.value)}
        placeholder="One or two sentences: what would make this memo stronger?"
        className="w-full worksheet-field min-h-[72px] mb-4"
        style={{ borderRadius: 0 }}
      />
      <button
        type="button"
        onClick={handleSubmit}
        disabled={disabled || !allScored}
        className="btn-formal disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Submit critique
      </button>
    </div>
  );
}
