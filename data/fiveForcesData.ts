/**
 * Structured content for Porter's Five Forces — judgment-first, one force at a time.
 * Design: Judgment → Evidence → Correction → Insight
 */

export interface FiveForceItem {
  id: string;
  title: string;
  subtext: string;
  diagnosticLens: string;
  favorableConditions: string[];
  hostileConditions: string[];
  evidenceChecklist: string[];
  trap: string;
  reflectionPrompt: string;
}

export const FIVE_FORCES_DATA: FiveForceItem[] = [
  {
    id: 'competitive-rivalry',
    title: 'Competitive Rivalry',
    subtext: 'How aggressively incumbents fight over the same buyer',
    diagnosticLens: 'How intensely competitors compete for the same demand.',
    favorableConditions: [
      'Few serious rivals',
      'Differentiation holds',
      'Growth absorbs competition',
      'Stable pricing',
    ],
    hostileConditions: [
      'Price wars',
      'Feature copying within weeks',
      'High fixed costs force volume behavior',
      'Churn is normalized',
    ],
    evidenceChecklist: [
      'Number of meaningful rivals',
      'Price volatility',
      'Category growth rate',
      'Churn norms',
    ],
    trap: 'Confusing "we\'re better" with "we\'re different." Better doesn\'t reduce rivalry. Difference does.',
    reflectionPrompt: 'In one sentence: What would have to be true for rivalry to become favorable here?',
  },
  {
    id: 'buyer-power',
    title: 'Buyer Power',
    subtext: 'The buyer\'s ability to force price down or demand more value',
    diagnosticLens: 'The buyer\'s ability to force price down or demand more value.',
    favorableConditions: [
      'Fragmented buyers',
      'Switching is painful',
      'Buyer pays for outcome',
      'High-trust purchase',
    ],
    hostileConditions: [
      'Buyer compares in a spreadsheet',
      'Switching is instant',
      'Buyer threatens churn to negotiate',
      'Buyer can delay with low consequence',
    ],
    evidenceChecklist: [
      'How customers evaluate',
      'Switching friction',
      '% who negotiate',
      'Purchase cycle length',
    ],
    trap: '"Would you use this?" vs "What did you last pay for?" Interest is not power. Payment is power.',
    reflectionPrompt: 'In one sentence: What would have to be true for buyer power to become favorable here?',
  },
  {
    id: 'supplier-power',
    title: 'Supplier Power',
    subtext: 'Upstream control over cost, quality, lead times, or capacity',
    diagnosticLens: 'Upstream control over cost, quality, lead times, or capacity.',
    favorableConditions: [
      'Many equivalent suppliers',
      'Standardized inputs',
      'Low MOQ',
      'Short lead times',
    ],
    hostileConditions: [
      'One or two viable suppliers',
      'Supply constraints',
      'Supplier sets price and terms',
    ],
    evidenceChecklist: [
      'Number of qualified suppliers',
      'Lead times',
      'MOQ',
      'Exclusivity terms',
    ],
    trap: 'Ignoring chokepoints because "we\'ll figure it out later." Supplier leverage shows up after you\'re dependent.',
    reflectionPrompt: 'In one sentence: What would have to be true for supplier power to become favorable here?',
  },
  {
    id: 'substitutes',
    title: 'Threat of Substitutes',
    subtext: 'Alternative ways customers solve the same job',
    diagnosticLens: 'Alternative ways customers solve the same job.',
    favorableConditions: [
      'Substitutes are meaningfully worse',
      'Or require behavior change',
    ],
    hostileConditions: [
      'Substitutes are cheaper + easier',
      'Bundled elsewhere',
      '"Default" option is acceptable',
    ],
    evidenceChecklist: [
      'What customers use instead today',
      'What they do when they don\'t buy you',
      'Bundling',
    ],
    trap: 'Listing peers instead of substitutes. Your competitor might be sleep, YouTube, inertia, or a bundled alternative.',
    reflectionPrompt: 'In one sentence: What would have to be true for substitutes to become less threatening here?',
  },
  {
    id: 'new-entrants',
    title: 'Threat of New Entrants',
    subtext: 'How easy for new players to enter and compete effectively',
    diagnosticLens: 'How easy for new players to enter and compete effectively.',
    favorableConditions: [
      'Strong regulation',
      'Distribution gatekeepers',
      'Scale economies',
      'Trust moats',
    ],
    hostileConditions: [
      'Anyone can launch in 30 days',
      'Off-the-shelf suppliers',
      'Platform distribution open',
    ],
    evidenceChecklist: [
      'Startup density',
      'Time + money to replicate',
      'Channel barriers',
      'Trust barriers',
    ],
    trap: 'Thinking "hard work" is a barrier. Hard work is available to every entrant.',
    reflectionPrompt: 'In one sentence: What would have to be true for new entrants to become less of a threat here?',
  },
];

/** Scoring interpretation for total / 25 */
export const FIVE_FORCES_INTERPRETATION = {
  attractive: '≤12 — Structurally attractive',
  playable: '13–14 — Playable with clear positioning',
  moatRequired: '15–17 — Only playable with a real moat',
  unlikely: '≥18 — Value extraction unlikely (expect margin compression)',
} as const;
