import { Module } from '@/types';

export const pillar2Modules: Module[] = [
  {
    id: 'p2-module-1',
    pillar: 'pillar-2',
    title: 'The Irrational Value Engine',
    thesis: 'Value is not perceived linearly. It is distorted by loss, context, reference points, and fear. If humans valued things rationally, most pricing strategies would collapse overnight.',
    whyExists: {
      academic: 'Yale Behavioral Economics Foundation - Traditional economics assumes rational agents, stable preferences, objective evaluation.',
      operator: 'Behavioral economics proves humans overreact to loss, mentally misclassify money, evaluate relative not absolute value, feel pain more strongly than pleasure.',
    },
    frameworks: [
      {
        id: 'p2-framework-1-1',
        title: 'Prospect Theory (The Root Distortion)',
        description: 'Humans do not evaluate outcomes based on final value. They evaluate outcomes based on change from a reference point.',
        content: `Key asymmetry: Losing $100 hurts ~2× more than gaining $100 feels good.

This single bias explains:
- why discounts outperform bonuses
- why churn prevention matters more than acquisition
- why framing matters more than features`,
      },
      {
        id: 'p2-framework-1-2',
        title: 'Mental Accounting (Why Money Is Not Fungible)',
        description: 'Humans do not treat all dollars equally. We separate money into mental "accounts".',
        content: `Mental Accounts:
- daily spending
- investments
- indulgences
- necessities
- guilt-free money

This is why:
- $3/day feels acceptable
- $1,200/year feels painful
- "found money" gets spent recklessly
- subscriptions feel cheaper than purchases`,
      },
      {
        id: 'p2-framework-1-3',
        title: 'Why "Free" Breaks Logic',
        description: 'Free removes the downside entirely — and the brain overweights zero risk.',
        content: `This explains:
- why free trials outperform demos
- why "risk-free" converts
- why "cancel anytime" matters even when no one cancels

Free is not about savings. It is about loss elimination.`,
      },
      {
        id: 'p2-framework-1-4',
        title: 'Reference Dependence (Why Context Is King)',
        description: 'People never evaluate price alone. They evaluate compared to what, instead of what, before or after what.',
        content: `This is why:
- showing a higher price first increases acceptance
- decoys work
- premium tiers anchor mid-tier purchases

If you don't set the reference point, the market will — poorly.`,
      },
    ],
    worksheets: [
      {
        id: 'p2-worksheet-1-1',
        title: 'Loss Aversion Mapping',
        description: 'If your messaging only emphasizes gain, you are under-leveraging human psychology.',
        fields: [
          { id: 'scenario', label: 'Scenario', type: 'text', required: true },
          { id: 'what-customer-loses', label: 'What Customer Might Lose', type: 'textarea', required: true },
          { id: 'emotional-weight', label: 'Emotional Weight', type: 'textarea', required: true },
        ],
      },
      {
        id: 'p2-worksheet-1-2',
        title: 'Mental Bucket Audit',
        description: 'If your price lives in the wrong bucket, resistance is guaranteed.',
        fields: [
          { id: 'price-presentation', label: 'Price Presentation', type: 'text', required: true },
          { id: 'mental-bucket', label: 'Mental Bucket Triggered', type: 'select', required: true, options: ['Daily Spending', 'Investment', 'Indulgence', 'Necessity', 'Guilt-Free Money'] },
        ],
      },
      {
        id: 'p2-worksheet-1-3',
        title: 'Reference Point Control',
        description: 'If you don\'t set the reference point, the market will — poorly.',
        fields: [
          { id: 'customer-sees-first', label: 'Customer Sees First', type: 'text', required: true },
          { id: 'effect-on-value', label: 'Effect on Perceived Value', type: 'textarea', required: true },
        ],
      },
    ],
    coldCall: {
      question: 'If humans were perfectly rational, which industries would collapse?',
      timeLimit: 90,
      semanticCriteria: {
        noHedging: true,
        minLength: 20,
      },
      penalty: 5,
    },
    redTeam: {
      question: 'Where does your customer feel they are risking something emotionally — even if financially they are not?',
      checks: [],
    },
    boardLens: 'This is why pricing is not a math problem — it\'s a categorization problem. Elite brands don\'t ask "Can they afford this?" They ask "What emotional risk must be neutralized for this to feel safe?"',
    requiredOutputs: [
      { id: 'loss-customers-fear', label: 'Identified one loss customers fear', type: 'text' },
      { id: 'mental-bucket', label: 'Mapped your price to a mental bucket', type: 'text' },
      { id: 'hidden-reference-point', label: 'Found one hidden reference point', type: 'text' },
      { id: 'free-or-risk-removal', label: 'Identified one place free or risk removal matters', type: 'text' },
      { id: 'reframe-loss-to-safety', label: 'Written one sentence that reframes loss into safety', type: 'text' },
    ],
    order: 1,
  },
  {
    id: 'p2-module-2',
    pillar: 'pillar-2',
    title: 'Anchors, Frames, and Mental Buckets',
    thesis: 'People do not decide if a price is fair. They decide if it feels reasonable relative to the first thing they saw. Anchors don\'t persuade — they constrain perception.',
    whyExists: {
      academic: 'Yale Behavioral Econ × Wharton Pricing Logic',
      operator: 'Most marketers justify prices, explain features, negotiate objections. Elite operators control the comparison set, determine the frame, pre-wire acceptance, never debate price directly.',
    },
    frameworks: [
      {
        id: 'p2-framework-2-1',
        title: 'Anchoring & Adjustment (The Silent Dictator)',
        description: 'The first number seen becomes the default reference point — even if it\'s arbitrary.',
        content: `Anchors work because:
- the brain hates uncertainty
- adjustment requires effort
- most people stop early

This is why pricing pages are ordered — and why "starting at" language matters.`,
      },
      {
        id: 'p2-framework-2-2',
        title: 'Anchor Types (Not All Anchors Are Prices)',
        description: 'Anchors can be monetary, time-based, effort-based, status-based, risk-based.',
        content: `Examples:
- "Doctor-formulated" anchors expertise
- "Limited batch" anchors scarcity
- "White-glove service" anchors effort

You are anchoring whether you intend to or not.`,
      },
      {
        id: 'p2-framework-2-3',
        title: 'Framing: Same Price, Different Reality',
        description: 'Framing changes what the brain thinks it is evaluating.',
        content: `Examples:
- "$1,200 per year" → investment
- "$3.28 per day" → habit
- "$0.45 per use" → efficiency
- "Less than your morning coffee" → indulgence

The number did not change. The mental bucket did.`,
      },
    ],
    worksheets: [
      {
        id: 'p2-worksheet-2-1',
        title: 'Anchor Audit',
        description: 'If the first number is low, you have already lost pricing power.',
        fields: [
          { id: 'touchpoint', label: 'Touchpoint', type: 'text', required: true },
          { id: 'first-number-seen', label: 'First Number Seen', type: 'text', required: true },
          { id: 'anchor-effect', label: 'Anchor Effect', type: 'textarea', required: true },
        ],
      },
      {
        id: 'p2-worksheet-2-2',
        title: 'Price Reframing Lab',
        description: 'Rewrite your core price 5 ways. If one frame feels "obvious," that\'s your path.',
        fields: [
          { id: 'frame-annual', label: 'Annual Frame', type: 'text', required: true },
          { id: 'frame-monthly', label: 'Monthly Frame', type: 'text', required: true },
          { id: 'frame-daily', label: 'Daily Frame', type: 'text', required: true },
          { id: 'frame-per-outcome', label: 'Per Outcome Frame', type: 'text', required: true },
          { id: 'frame-per-avoided-loss', label: 'Per Avoided Loss Frame', type: 'text', required: true },
        ],
      },
    ],
    coldCall: {
      question: 'What is the very first comparison your customer makes — consciously or not?',
      timeLimit: 90,
      semanticCriteria: { noHedging: true },
      penalty: 5,
    },
    redTeam: {
      question: 'Which mental bucket would kill your conversion if customers placed you there?',
      checks: [],
    },
    requiredOutputs: [
      { id: 'primary-anchor', label: 'Identified your primary anchor', type: 'text' },
      { id: 'price-frames', label: 'Rewritten your price into at least 3 frames', type: 'text' },
      { id: 'mental-bucket', label: 'Selected the correct mental bucket', type: 'text' },
      { id: 'harmful-comparison', label: 'Eliminated one harmful comparison', type: 'text' },
      { id: 'non-price-anchor', label: 'Designed one non-price anchor to lead with', type: 'text' },
    ],
    order: 2,
  },
  {
    id: 'p2-module-3',
    pillar: 'pillar-2',
    title: 'Identity, Tribe, and Status',
    thesis: 'People do not buy products. They buy alignment with an identity, membership in a tribe, and distance from a status they reject. Price resistance disappears when the purchase protects who someone believes they are.',
    whyExists: {
      academic: 'Brown Anthropology × Yale Social Psychology',
      operator: 'Classical marketing assumes individuals decide alone, preferences are personal, utility is primary. Anthropology proves decisions are social, preferences are learned, identity protection comes first.',
    },
    frameworks: [
      {
        id: 'p2-framework-3-1',
        title: 'Identity Is a Defense Mechanism',
        description: 'People buy to affirm who they are, avoid who they are not, signal belonging, reduce social risk.',
        content: `Most "objections" are identity defenses, not financial concerns.

If your product threatens identity, no discount will save you.`,
      },
      {
        id: 'p2-framework-3-2',
        title: 'Tribes, Not Segments',
        description: 'Demographics are lazy proxies. Tribes are belief-based.',
        content: `Tribes form around:
- shared enemies
- shared language
- shared rituals
- shared taste

The tighter the tribe, the lower the price sensitivity.

This is why "niche" brands often outperform mass brands on margin.`,
      },
      {
        id: 'p2-framework-3-3',
        title: 'Status Signaling (Loud vs Quiet)',
        description: 'There are two kinds of status: Conspicuous and Inconspicuous.',
        content: `Conspicuous:
- logos
- volume
- flash
- visibility

Inconspicuous:
- knowledge
- restraint
- taste
- subtle cues

Modern elite markets favor inconspicuous status.`,
      },
    ],
    worksheets: [
      {
        id: 'p2-worksheet-3-1',
        title: 'Identity Protection Audit',
        description: 'If your product threatens identity, no discount will save you.',
        fields: [
          { id: 'who-customer-wants-to-be', label: 'Who does my customer want to be seen as?', type: 'textarea', required: true },
          { id: 'who-they-fear-being', label: 'Who do they fear being mistaken for?', type: 'textarea', required: true },
          { id: 'choice-protects-identity', label: 'What choice protects that identity?', type: 'textarea', required: true },
        ],
      },
      {
        id: 'p2-worksheet-3-2',
        title: 'Tribal Identity Map',
        description: 'If you can\'t name these, your tribe doesn\'t exist yet.',
        fields: [
          { id: 'the-enemy', label: 'The Enemy (Who they are not)', type: 'textarea', required: true },
          { id: 'the-ritual', label: 'The Ritual (How they participate)', type: 'textarea', required: true },
          { id: 'the-language', label: 'The Language (Words insiders use)', type: 'textarea', required: true },
          { id: 'the-signal', label: 'The Signal (How belonging is shown)', type: 'textarea', required: true },
        ],
      },
    ],
    coldCall: {
      question: 'Who should feel slightly uncomfortable buying this?',
      timeLimit: 90,
      semanticCriteria: { noHedging: true },
      penalty: 5,
    },
    redTeam: {
      question: 'If your brand disappeared tomorrow, what identity gap would remain?',
      checks: [],
    },
    requiredOutputs: [
      { id: 'defined-tribe', label: 'A clearly defined tribe', type: 'text' },
      { id: 'enemy-or-anti-identity', label: 'One enemy or anti-identity', type: 'text' },
      { id: 'ritual-or-behavior', label: 'At least one ritual or behavior', type: 'text' },
      { id: 'quiet-status-signal', label: 'A quiet status signal', type: 'text' },
      { id: 'who-this-is-not-for', label: 'A sentence that explains who this is not for', type: 'text' },
    ],
    order: 3,
  },
  {
    id: 'p2-module-4',
    pillar: 'pillar-2',
    title: 'Motivation, Ability, and Friction',
    thesis: 'Motivation is overrated. Most behavior fails because the environment demands too much effort at the moment of action. Friction, not desire, is the silent killer of conversion.',
    whyExists: {
      academic: 'Stanford BJ Fogg × Yale Behavioral Failure Analysis',
      operator: 'Most teams try to increase motivation, hype benefits, add urgency, push harder. Elite teams remove steps, reduce cognitive load, eliminate emotional friction, design behavior paths that feel inevitable.',
    },
    frameworks: [
      {
        id: 'p2-framework-4-1',
        title: 'The Fogg Behavior Model (Non-Negotiable)',
        description: 'Behavior happens only when: Motivation × Ability × Prompt. If any one is missing, behavior fails.',
        content: `Key insight:
- Motivation fluctuates
- Ability is designable
- Prompts must arrive at the right moment

You cannot rely on motivation alone.`,
      },
      {
        id: 'p2-framework-4-2',
        title: 'Friction Is Multidimensional',
        description: 'Friction is not just "too many clicks."',
        content: `It includes:
- cognitive friction (thinking)
- emotional friction (fear, doubt)
- physical friction (effort)
- temporal friction (bad timing)
- social friction (judgment risk)

Most teams only fix the first.`,
      },
      {
        id: 'p2-framework-4-3',
        title: 'Convenience Is a Value Proposition',
        description: 'Convenience is not laziness. It is respect for human bandwidth.',
        content: `People pay premiums to:
- avoid thinking
- avoid embarrassment
- avoid coordination
- avoid effort

This is why white-glove services win, defaults dominate, "done for you" outperforms "best-in-class".`,
      },
    ],
    worksheets: [
      {
        id: 'p2-worksheet-4-1',
        title: 'Behavior Failure Diagnosis',
        description: 'If Ability is low, motivation doesn\'t matter.',
        fields: [
          { id: 'action-you-want', label: 'Action You Want', type: 'text', required: true },
          { id: 'motivation-high', label: 'Motivation High?', type: 'checkbox', required: false },
          { id: 'ability-low', label: 'Ability Low?', type: 'checkbox', required: false },
          { id: 'prompt-missing', label: 'Prompt Missing?', type: 'checkbox', required: false },
        ],
      },
      {
        id: 'p2-worksheet-4-2',
        title: 'Friction Kill List',
        description: 'If a step has no value, it is theft.',
        fields: [
          { id: 'step', label: 'Step', type: 'text', required: true },
          { id: 'cognitive-cost', label: 'Cognitive Cost', type: 'number', required: true },
          { id: 'emotional-cost', label: 'Emotional Cost', type: 'number', required: true },
          { id: 'physical-cost', label: 'Physical Cost', type: 'number', required: true },
          { id: 'action', label: 'Action (Remove/Reduce)', type: 'text', required: true },
        ],
      },
    ],
    coldCall: {
      question: 'What would happen if the user did nothing?',
      timeLimit: 90,
      semanticCriteria: { noHedging: true },
      penalty: 5,
    },
    redTeam: {
      question: 'Where are you asking the user to do something slightly annoying — and hoping they\'ll tolerate it?',
      checks: [],
    },
    requiredOutputs: [
      { id: 'highest-friction-step', label: 'Identified the highest-friction step', type: 'text' },
      { id: 'removed-or-simplified', label: 'Removed or simplified one action', type: 'text' },
      { id: 'default-path', label: 'Designed one default path', type: 'text' },
      { id: 'improved-prompt-timing', label: 'Improved prompt timing', type: 'text' },
      { id: 'reduced-cognitive-load', label: 'Reduced cognitive load somewhere', type: 'text' },
    ],
    order: 4,
  },
  {
    id: 'p2-module-5',
    pillar: 'pillar-2',
    title: 'Choice Architecture',
    thesis: 'People do not choose freely. They follow defaults, avoid loss, and stop when decisions feel heavy. Your job is not to convince — it is to arrange.',
    whyExists: {
      academic: 'Yale Nudge Theory × Stanford Product Design',
      operator: 'Most brands ask "Which option should we promote?" Elite brands ask "What happens if the user does nothing?" Because inaction is a choice — and usually the dominant one.',
    },
    frameworks: [
      {
        id: 'p2-framework-5-1',
        title: 'The Default Bias (The Most Powerful Lever)',
        description: 'Humans interpret defaults as recommended, safe, socially approved, effort-minimizing.',
        content: `Defaults are perceived authority.

Key rule: If a user must opt out to save money, loss aversion activates.

If the default is not what you want most users to do, your system is misaligned.`,
      },
      {
        id: 'p2-framework-5-2',
        title: 'The Decoy Effect (Asymmetric Dominance)',
        description: 'A decoy exists only to make another option feel smarter.',
        content: `It must be:
- clearly inferior
- priced close to the target option
- easy to compare

Decoys don't sell. They redirect.`,
      },
      {
        id: 'p2-framework-5-3',
        title: 'Option Overload (When Choice Kills Action)',
        description: 'More options increase anxiety, regret anticipation, decision delay, abandonment.',
        content: `Humans choose faster when:
- differences are clear
- tradeoffs are explicit
- categories are limited

Random order is amateur hour.`,
      },
    ],
    worksheets: [
      {
        id: 'p2-worksheet-5-1',
        title: 'Default Audit',
        description: 'If the default is not what you want most users to do, your system is misaligned.',
        fields: [
          { id: 'decision-point', label: 'Decision Point', type: 'text', required: true },
          { id: 'default-option', label: 'Default Option', type: 'text', required: true },
          { id: 'user-must-act-to', label: 'User Must Act To...', type: 'textarea', required: true },
        ],
      },
      {
        id: 'p2-worksheet-5-2',
        title: 'Decoy Design Lab',
        description: 'If the decoy looks attractive, it failed.',
        fields: [
          { id: 'target-option', label: 'Target Option', type: 'text', required: true },
          { id: 'target-price', label: 'Target Price', type: 'number', required: true },
          { id: 'decoy-option', label: 'Decoy Option', type: 'text', required: true },
          { id: 'decoy-price', label: 'Decoy Price', type: 'number', required: true },
        ],
      },
    ],
    coldCall: {
      question: 'Which decision are you pretending the user is making — but actually already decided for them?',
      timeLimit: 90,
      semanticCriteria: { noHedging: true },
      penalty: 5,
    },
    requiredOutputs: [
      { id: 'intentional-default', label: 'Define one intentional default', type: 'text' },
      { id: 'add-or-remove-decoy', label: 'Add or remove one decoy', type: 'text' },
      { id: 'reduce-options', label: 'Reduce total options somewhere', type: 'text' },
      { id: 'reorder-decision-flow', label: 'Reorder at least one decision flow', type: 'text' },
      { id: 'asymmetrical-effort', label: 'Make effort asymmetrical', type: 'text' },
    ],
    order: 5,
  },
  {
    id: 'p2-module-6',
    pillar: 'pillar-2',
    title: 'Memory Engineering',
    thesis: 'People do not remember experiences accurately. They remember moments. And they decide loyalty based on memory, not reality.',
    whyExists: {
      academic: 'Kahneman × Yale Experience Design',
      operator: 'Customer satisfaction surveys lie. Humans don\'t average experiences, compress time, overweight emotion, rewrite history. Memory is not a recording. It is a story.',
    },
    frameworks: [
      {
        id: 'p2-framework-6-1',
        title: 'The Peak–End Rule',
        description: 'People remember: 1) the most intense moment (peak), 2) the final moment (end). Everything else fades.',
        content: `A mediocre experience with a strong ending beats a good experience with a weak exit.

If either is "accidental," you're gambling with retention.`,
      },
      {
        id: 'p2-framework-6-2',
        title: 'Memory Is Emotional, Not Logical',
        description: 'Memory favors relief over consistency, surprise over quality, emotion over accuracy.',
        content: `This is why:
- onboarding matters more than usage
- offboarding matters more than tenure
- rituals outperform features

Retention is a memory problem masquerading as a product problem.`,
      },
      {
        id: 'p2-framework-6-3',
        title: 'The Exit Moment Is Strategic',
        description: 'Most brands neglect offboarding, rush endings, ignore cancellation experience.',
        content: `Elite brands:
- dignify exits
- preserve identity
- leave emotional residue

People return to brands that treated them well when leaving.`,
      },
    ],
    worksheets: [
      {
        id: 'p2-worksheet-6-1',
        title: 'Peak & End Audit',
        description: 'If either is "accidental," you\'re gambling with retention.',
        fields: [
          { id: 'peak-moment', label: 'Peak Moment', type: 'textarea', required: true },
          { id: 'peak-intensity', label: 'Emotional Intensity', type: 'select', required: true, options: ['Low', 'Medium', 'High'] },
          { id: 'end-moment', label: 'End Moment', type: 'textarea', required: true },
          { id: 'end-intensity', label: 'End Intensity', type: 'select', required: true, options: ['Low', 'Medium', 'High'] },
        ],
      },
      {
        id: 'p2-worksheet-6-2',
        title: 'Ritual Design Lab',
        description: 'If you don\'t name the ritual, users won\'t feel it.',
        fields: [
          { id: 'onboarding-ritual', label: 'Onboarding Ritual', type: 'textarea', required: true },
          { id: 'milestone-ritual', label: 'Milestone Ritual', type: 'textarea', required: true },
          { id: 'exit-ritual', label: 'Exit Ritual', type: 'textarea', required: true },
        ],
      },
    ],
    coldCall: {
      question: 'Which moment would you eliminate — and lose nothing?',
      timeLimit: 90,
      semanticCriteria: { noHedging: true },
      penalty: 5,
    },
    redTeam: {
      question: 'If a customer leaves today, what do they remember feeling?',
      checks: [],
    },
    requiredOutputs: [
      { id: 'intentional-peak', label: 'Identify one intentional peak', type: 'text' },
      { id: 'dignified-ending', label: 'Design one dignified ending', type: 'text' },
      { id: 'one-ritual', label: 'Add one ritual', type: 'text' },
      { id: 'memory-sentence', label: 'Rewrite the memory sentence', type: 'text' },
      { id: 'remove-meaningless-step', label: 'Remove one meaningless step', type: 'text' },
    ],
    order: 6,
  },
  {
    id: 'p2-module-7',
    pillar: 'pillar-2',
    title: 'Perceptual Contrast & Distinctiveness',
    thesis: 'If you look like everyone else, you are invisible — no matter how good you are. Distinctiveness is remembered. Quality is inferred later.',
    whyExists: {
      academic: 'Von Restorff × Brown Cultural Theory × Market Reality',
      operator: 'In competitive markets, quality converges, pricing compresses, features blur. Memory becomes the battlefield. Distinctiveness is not aesthetic preference. It is a cognitive survival mechanism.',
    },
    frameworks: [
      {
        id: 'p2-framework-7-1',
        title: 'The Von Restorff Effect (Isolation Effect)',
        description: 'Humans remember what breaks the pattern, what contrasts the field, what feels anomalous.',
        content: `In a sea of similarity, the outlier wins recall.

Important: Outlier ≠ extreme. Outlier ≠ ugly. Outlier ≠ chaotic.
Outlier = unexpected within context.`,
      },
      {
        id: 'p2-framework-7-2',
        title: 'Pattern Interruption vs Pattern Violation',
        description: 'There are two ways to stand out: Interruption (subtle contrast) and Violation (overt rebellion).',
        content: `Elite brands usually interrupt.
Desperate brands violate.`,
      },
      {
        id: 'p2-framework-7-3',
        title: 'Category Camouflage vs Category Rebellion',
        description: 'Two valid strategies: Camouflage (look familiar enough to feel safe, differentiate quietly after entry) or Rebellion (reject category signals outright, demand interpretation).',
        content: `Choose deliberately. Most brands fail by doing both poorly.

Distinctiveness reduces CAC over time by increasing recall per impression.`,
      },
    ],
    worksheets: [
      {
        id: 'p2-worksheet-7-1',
        title: 'Category Pattern Scan',
        description: 'If most answers match the category, recall will be weak.',
        fields: [
          { id: 'visual-tone-category', label: 'Visual Tone (Category Norm)', type: 'text', required: true },
          { id: 'visual-tone-brand', label: 'Visual Tone (Your Brand)', type: 'text', required: true },
          { id: 'language-category', label: 'Language (Category Norm)', type: 'text', required: true },
          { id: 'language-brand', label: 'Language (Your Brand)', type: 'text', required: true },
        ],
      },
    ],
    coldCall: {
      question: 'If your brand logo were removed, could someone still identify you?',
      timeLimit: 90,
      semanticCriteria: { noHedging: true },
      penalty: 5,
    },
    redTeam: {
      question: 'Are you breaking the pattern because it\'s strategic — or because you\'re bored?',
      checks: [],
    },
    requiredOutputs: [
      { id: 'category-norm-to-break', label: 'Identify one category norm to break', type: 'text' },
      { id: 'camouflage-or-rebellion', label: 'Choose camouflage or rebellion', type: 'text' },
      { id: 'deliberate-contrast', label: 'Add one deliberate contrast', type: 'text' },
      { id: 'remove-generic-element', label: 'Remove one generic element', type: 'text' },
      { id: 'validate-contrast-trust', label: 'Validate that contrast doesn\'t reduce trust', type: 'text' },
    ],
    order: 7,
  },
  {
    id: 'p2-module-8',
    pillar: 'pillar-2',
    title: 'Neuro-Copy & Emotional Triggers',
    thesis: 'People do not buy when they are convinced. They buy when their nervous system feels safe, seen, or elevated. Copy does not transmit information. It activates emotion, then the brain justifies the choice afterward.',
    whyExists: {
      academic: 'Neuroscience × Yale Moral Psychology',
      operator: 'Most marketing copy fails because it describes features, explains benefits, argues rationally. Humans do not decide that way. This module teaches how to speak directly to the limbic system, trigger emotion without manipulation, increase WTP without changing the product.',
    },
    frameworks: [
      {
        id: 'p2-framework-8-1',
        title: 'The Two-Brain Reality',
        description: 'Human decision-making happens in layers: 1) Limbic Brain (emotional, fast, survival-based), 2) Prefrontal Cortex (rational, slow, justificatory).',
        content: `If limbic brain is not engaged:
- rational brain never activates
- conversion stalls

Copy must enter through emotion, not logic.`,
      },
      {
        id: 'p2-framework-8-2',
        title: 'Core Emotional Drivers',
        description: 'Nearly all effective copy maps to one of these: Safety/Relief, Status/Respect, Belonging/Identity, Time Recovery, Legacy/Meaning, Control/Certainty.',
        content: `Utility is table stakes. Emotion creates margin.

If you target more than one, clarity collapses.`,
      },
      {
        id: 'p2-framework-8-3',
        title: 'Time Is the Most Powerful Trigger',
        description: 'The brain values reclaimed time, future relief, reduced cognitive load.',
        content: `Time-based language increases conversion without discounting.

Examples:
- "Get your Friday back."
- "Sleep without thinking about it."
- "One less thing to manage."`,
      },
    ],
    worksheets: [
      {
        id: 'p2-worksheet-8-1',
        title: 'Emotional Target Selection',
        description: 'Choose one primary driver.',
        fields: [
          { id: 'product', label: 'Product', type: 'text', required: true },
          { id: 'feature', label: 'Feature', type: 'text', required: true },
          { id: 'emotional-driver', label: 'Emotional Driver', type: 'select', required: true, options: ['Safety/Relief', 'Status/Respect', 'Belonging/Identity', 'Time Recovery', 'Legacy/Meaning', 'Control/Certainty'] },
          { id: 'why-this-one', label: 'Why This One', type: 'textarea', required: true },
        ],
      },
      {
        id: 'p2-worksheet-8-2',
        title: 'Neuro-Copy Rewrite Table',
        description: 'Your limbic copy should reference lived experience, imply consequence, avoid adjectives unless necessary.',
        fields: [
          { id: 'feature', label: 'Feature', type: 'text', required: true },
          { id: 'rational-copy', label: 'Rational Copy', type: 'textarea', required: true },
          { id: 'limbic-copy', label: 'Limbic Copy', type: 'textarea', required: true },
          { id: 'trigger-activated', label: 'Trigger Activated', type: 'text', required: true },
        ],
      },
    ],
    coldCall: {
      question: 'Which emotion would disappear if your product didn\'t exist?',
      timeLimit: 90,
      semanticCriteria: { noHedging: true },
      penalty: 5,
    },
    requiredOutputs: [
      { id: 'dominant-emotional-driver', label: 'Select one dominant emotional driver', type: 'text' },
      { id: 'rewrite-headline-limbic', label: 'Rewrite your primary headline in limbic language', type: 'text' },
      { id: 'rewrite-cta', label: 'Rewrite one CTA without verbs like "buy" or "get"', type: 'text' },
      { id: 'remove-rational-explanation', label: 'Remove one rational explanation from your page', type: 'text' },
      { id: 'confirm-copy-respectful', label: 'Confirm copy still feels respectful', type: 'text' },
    ],
    order: 8,
  },
  {
    id: 'p2-module-9',
    pillar: 'pillar-2',
    title: 'Cultural Capital & Subtle Signaling',
    thesis: 'The most powerful brands do not shout status. They whisper belonging. Cultural capital is not about wealth. It is about taste, knowledge, and discernment.',
    whyExists: {
      academic: 'Brown / Yale / Sociology of Elites',
      operator: 'Modern status has shifted. Old status: logos, size, cost, visibility. New status: restraint, fluency, values, access, taste. Elite consumers avoid obvious signaling because obvious signals are available to everyone. Scarcity has moved from money → meaning.',
    },
    frameworks: [
      {
        id: 'p2-framework-9-1',
        title: 'Cultural Capital vs Economic Capital',
        description: 'Economic Capital can be bought, is loud, is imitable, is external. Cultural Capital must be learned, is quiet, is hard to fake, is internal.',
        content: `Brands that rely on price alone invite imitation.
Brands that rely on knowledge create moats.`,
      },
      {
        id: 'p2-framework-9-2',
        title: '"If You Know, You Know" Design',
        description: 'Subtle signals include references without explanation, restrained aesthetics, intentional omission, insider language, non-obvious rituals.',
        content: `These create selective legibility.

Not everyone is meant to understand.`,
      },
      {
        id: 'p2-framework-9-3',
        title: 'Taste as a Sorting Mechanism',
        description: 'Taste is a filter. Elite brands do not try to appeal to everyone because broad appeal destroys status density.',
        content: `When taste is clear:
- wrong customers self-select out
- right customers feel seen
- CAC decreases over time`,
      },
    ],
    worksheets: [
      {
        id: 'p2-worksheet-9-1',
        title: 'Insider Signal Inventory',
        description: 'If everything is obvious, nothing is special.',
        fields: [
          { id: 'element', label: 'Element', type: 'text', required: true },
          { id: 'visible-to-everyone', label: 'Visible to Everyone?', type: 'checkbox', required: false },
          { id: 'understood-by-insiders', label: 'Understood by Insiders?', type: 'checkbox', required: false },
        ],
      },
    ],
    coldCall: {
      question: 'What must someone already believe to want this?',
      timeLimit: 90,
      semanticCriteria: { noHedging: true },
      penalty: 5,
    },
    redTeam: {
      question: 'Could a fast-fashion brand copy this in 60 days?',
      checks: [],
    },
    requiredOutputs: [
      { id: 'insider-cue', label: 'Identify one insider cue you will not explain', type: 'text' },
      { id: 'remove-loud-signal', label: 'Remove one loud signal', type: 'text' },
      { id: 'restraint-based-signal', label: 'Add one restraint-based signal', type: 'text' },
      { id: 'wrong-customers-excluded', label: 'Ensure wrong customers feel subtly excluded', type: 'text' },
      { id: 'right-customers-recognized', label: 'Confirm right customers feel recognized', type: 'text' },
    ],
    order: 9,
  },
  {
    id: 'p2-module-10',
    pillar: 'pillar-2',
    title: 'Ethical Persuasion',
    thesis: 'Short-term persuasion can be engineered. Long-term value can only be earned. The difference between elite brands and manipulative ones is not ability — it\'s restraint.',
    whyExists: {
      academic: 'Ethics × Behavioral Economics × Trust Research',
      operator: 'Behavioral tools are powerful. Unbounded use creates dependency, backlash, churn masked as growth, regulatory risk, brand decay. Elite strategy optimizes lifetime trust, not just conversion rate.',
    },
    frameworks: [
      {
        id: 'p2-framework-10-1',
        title: 'Influence vs Manipulation',
        description: 'Influence clarifies decision, reduces friction, respects agency, builds trust, increases LTV. Manipulation distorts decision, creates pressure, exploits vulnerability, extracts value, increases churn.',
        content: `If a tactic only works once, it's extraction — not marketing.`,
      },
      {
        id: 'p2-framework-10-2',
        title: 'The Trust Horizon',
        description: 'Every brand operates on a trust timeline.',
        content: `Tactics that increase urgency, amplify fear, hide downside pull demand forward at the cost of future credibility.

Elite brands protect: Trust half-life — how long belief survives after purchase.`,
      },
      {
        id: 'p2-framework-10-3',
        title: 'Vulnerability Targeting (Red Line)',
        description: 'Unethical persuasion often targets fear states, shame, insecurity, financial stress, health anxiety.',
        content: `If your product benefits from someone feeling worse about themselves, you are borrowing value from harm.

Elite brands do not need desperation.`,
      },
    ],
    worksheets: [
      {
        id: 'p2-worksheet-10-1',
        title: 'Trust Erosion Audit',
        description: 'If cost > lift over time, it must go.',
        fields: [
          { id: 'tactic', label: 'Tactic', type: 'text', required: true },
          { id: 'short-term-lift', label: 'Short-Term Lift', type: 'number', required: true },
          { id: 'long-term-cost', label: 'Long-Term Cost', type: 'number', required: true },
          { id: 'decision', label: 'Decision (Keep/Kill)', type: 'select', required: true, options: ['Keep', 'Kill'] },
        ],
      },
    ],
    coldCall: {
      question: 'Which tactic would you remove if regulators or journalists were watching?',
      timeLimit: 90,
      semanticCriteria: { noHedging: true },
      penalty: 5,
    },
    requiredOutputs: [
      { id: 'remove-pressure-tactic', label: 'Remove one pressure-based tactic', type: 'text' },
      { id: 'add-clarity-explanation', label: 'Add one clarity-based explanation', type: 'text' },
      { id: 'define-explicit-exclusion', label: 'Define one explicit exclusion ("This is not for…")', type: 'text' },
      { id: 'reread-from-buyer-perspective', label: 'Re-read your copy from the buyer\'s perspective', type: 'text' },
      { id: 'confirm-mutual-relationship', label: 'Confirm the relationship feels mutual, not extractive', type: 'text' },
    ],
    order: 10,
  },
];

// Helper to get module by ID
export const getPillar2ModuleById = (id: string): Module | undefined => {
  return pillar2Modules.find((m) => m.id === id);
};

// Helper to get all modules in order
export const getPillar2ModulesInOrder = (): Module[] => {
  return [...pillar2Modules].sort((a, b) => a.order - b.order);
};
