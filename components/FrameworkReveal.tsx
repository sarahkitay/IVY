'use client';

import { useState } from 'react';

interface FrameworkRevealProps {
  content: string;
}

/**
 * Renders framework content in digestible chunks: dropdown reveals, no walls of text.
 * Splits by double newlines or numbered/bullet sections; one section visible at a time optional.
 */
export default function FrameworkReveal({ content }: FrameworkRevealProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  const sections = content
    .split(/\n\s*\n+/)
    .map((s) => s.trim())
    .filter(Boolean);

  if (sections.length <= 1) {
    const text = content.trim();
    const short = text.length <= 400;
    return (
      <div className="border border-charcoal/20 p-4 mb-4 bg-cream" style={{ borderRadius: 0 }}>
        <pre className="font-mono text-sm whitespace-pre-wrap text-charcoal leading-relaxed">
          {short ? text : (showAll ? text : text.slice(0, 400) + '…')}
        </pre>
        {!short && (
          <button
            type="button"
            onClick={() => setShowAll((v) => !v)}
            className="label-small-caps mt-3 text-charcoal/70 hover:text-ink underline"
          >
            {showAll ? 'Show less' : 'Show more'}
          </button>
        )}
      </div>
    );
  }

  // Multiple sections: accordion-style, one open at a time
  return (
    <div className="space-y-2 mb-4">
      {sections.map((section, i) => {
        const id = `section-${i}`;
        const isOpen = expandedId === id;
        const firstLine = section.split('\n')[0]?.trim() ?? `Section ${i + 1}`;
        const label = firstLine.length > 60 ? firstLine.slice(0, 57) + '…' : firstLine;
        return (
          <div
            key={id}
            className="border border-charcoal/20 bg-cream"
            style={{ borderRadius: 0 }}
          >
            <button
              type="button"
              onClick={() => setExpandedId(isOpen ? null : id)}
              className="w-full text-left px-4 py-3 sm:py-4 flex items-center justify-between gap-3 min-h-[48px] touch-manipulation hover:bg-parchment/20 transition-colors"
              aria-expanded={isOpen}
            >
              <span className="font-mono text-sm text-charcoal/90 truncate">{label}</span>
              <span className="shrink-0 text-charcoal/50">{isOpen ? '▼' : '▶'}</span>
            </button>
            {isOpen && (
              <div className="border-t border-charcoal/15 px-4 py-3">
                <pre className="font-mono text-sm whitespace-pre-wrap text-charcoal leading-relaxed">
                  {section}
                </pre>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
