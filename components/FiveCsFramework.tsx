'use client';

import { useState } from 'react';

interface FiveCsFrameworkProps {
  content: string;
}

interface CItem {
  label: string;
  question: string;
  explanation: string;
}

export default function FiveCsFramework({ content }: FiveCsFrameworkProps) {
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});

  // Parse the content into individual C items
  const parseContent = (): CItem[] => {
    const lines = content.split('\n').filter(line => line.trim());
    const items: CItem[] = [];
    
    lines.forEach((line, index) => {
      if (index === 0) return; // Skip header line
      
      const parts = line.split('|').map(p => p.trim());
      if (parts.length >= 2) {
        const label = parts[0];
        const question = parts[1];
        
        // Default explanations for each C
        const explanations: { [key: string]: string } = {
          'Company': 'Most founders confuse "what we do" with "what we own that others cannot replicate." A true advantage is structural—it exists in your business model, not your pitch deck. Ask: If a well-funded competitor copied your exact product tomorrow, what would still protect you?',
          'Customer': 'Customers don\'t buy products—they hire them to make progress. The question isn\'t "would you use this?" but "what did you last pay for that failed to solve this?" If they\'re not already paying, you\'re creating a new category, which is 10x harder.',
          'Competitor': 'Your real competitor isn\'t who you think. It\'s whoever benefits when you fail. This could be a substitute product, a different category entirely, or the status quo. List peers and you\'ll miss the real threat.',
          'Collaborator': 'Who controls your choke points without appearing to? This could be a platform (App Store, AWS), a supplier, or a distribution channel. If they change the rules, you die. Most founders ignore this until it\'s too late.',
          'Context': 'What changes outside your control could flip this entire strategy? Regulatory shifts, economic cycles, platform changes, consumer behavior shifts. If you\'re not monitoring these, you\'re flying blind.',
        };
        
        items.push({
          label,
          question,
          explanation: explanations[label] || 'Deeper explanation coming soon.',
        });
      }
    });
    
    return items;
  };

  const items = parseContent();

  const toggleExplanation = (label: string) => {
    setExpanded((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  return (
    <div className="space-y-2 mb-6">
      {items.map((item) => (
        <div
          key={item.label}
          className="border border-charcoal/30 p-4 hover:border-charcoal/50 transition-all"
          style={{ borderRadius: 0, boxShadow: 'none' }}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="font-mono text-lg font-bold text-ink">
                  {item.label}
                </span>
                <span className="text-charcoal/40">|</span>
              </div>
              <p className="font-serif text-base text-charcoal/90 leading-relaxed">
                {item.question}
              </p>
            </div>
            <button
              onClick={() => toggleExplanation(item.label)}
              className="flex-shrink-0 font-mono text-xs uppercase tracking-wide text-charcoal/70 hover:text-ink transition-colors underline-offset-2 hover:underline"
              style={{ borderRadius: 0, background: 'none', border: 'none', padding: 0 }}
            >
              {expanded[item.label] ? '← HIDE' : 'EXPLAIN →'}
            </button>
          </div>
          
          {expanded[item.label] && (
            <div className="mt-4 pt-4 border-l-2 border-charcoal/20 pl-4 bg-charcoal/5">
              <p className="academic-quote text-sm leading-relaxed">
                {item.explanation}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
