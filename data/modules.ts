import { Module } from '@/types';
import type { ReadingCompanion } from '@/types';

// This will contain all 15 modules - starting with Module 1 as example
export const modules: Module[] = [
  {
    id: 'module-1',
    pillar: 'pillar-1',
    title: 'Market Reality Before Marketing Illusion',
    thesis: 'Most marketing strategies fail not because execution is weak, but because the market was misunderstood at the moment of commitment.',
    whyExists: {
      academic: 'At Harvard, strategy begins before action.',
      operator: 'In startups, strategy often begins after momentum. That inversion is lethal.',
    },
    frameworks: [
      {
        id: 'framework-1-1',
        title: 'The Operator 5Cs',
        description: 'The traditional 5Cs are descriptive. This version is diagnostic and adversarial.',
        content: `C | The Question That Actually Matters
Company | What advantage do we have that cannot be copied fast enough to matter?
Customer | What job are they already paying to solve — and why is it insufficient?
Competitor | Who benefits if we fail — even if they aren't in our category?
Collaborator | Who controls our choke points without appearing to?
Context | What changes outside our control could flip this entire strategy?`,
        operatorWarning: 'Company: Confusing effort with advantage\nCustomer: Listening to "would you use this?" instead of "what did you last pay for?"\nCompetitor: Listing peers instead of substitutes',
      },
      {
        id: 'framework-1-2',
        title: 'Jobs-to-Be-Done (Full Stack)',
        description: 'Customers do not buy products. They hire them to make progress.',
        content: `Layer | Question
Functional | What practical task is being completed?
Emotional | How does the customer want to feel?
Social | What does this signal to others?
Risk | What fear are they avoiding?`,
      },
    ],
    worksheets: [
      {
        id: 'worksheet-1-1',
        title: 'Advantage Decomposition Table',
        description: 'To stress-test whether something survives replication pressure. Answer objective questions. The system infers defensibility.',
        fields: [
          { 
            id: 'advantage-source', 
            label: 'Source of Advantage', 
            type: 'checkbox-group', 
            required: true,
            options: [
              'Proprietary data',
              'Network effects',
              'Switching costs',
              'Brand / identity',
              'Process know-how',
              'Regulatory moat',
              'Capital intensity',
              'Speed / execution only',
            ],
            placeholder: 'Select all that apply. "Speed only" is automatically flagged as fragile.',
          },
          { 
            id: 'time-to-replicate', 
            label: 'Time to Replicate (in months)', 
            type: 'select', 
            required: true,
            options: ['0-3 months', '3-12 months', '12-36 months', '36+ months'],
            placeholder: 'If a well-funded competitor tried to copy this...',
          },
          { 
            id: 'founder-dependency', 
            label: 'Dependency on You Personally', 
            type: 'select', 
            required: true,
            options: [
              'Works without founder involvement',
              'Requires founder judgment',
              'Requires founder relationships',
              'Requires founder reputation',
            ],
            placeholder: 'Founder-dependent advantages decay unless converted.',
          },
          { 
            id: 'replication-cost', 
            label: 'Replication Cost to Competitor', 
            type: 'select', 
            required: true,
            options: ['<$50k', '$50k-$250k', '$250k-$1M', '$1M+'],
            placeholder: 'How expensive would it be for a competitor to replicate this?',
          },
        ],
        rules: ['You answer objective questions. The system calculates copyability. You never choose the outcome—you earn it.'],
      },
      {
        id: 'worksheet-1-2',
        title: 'Customer Job Stack',
        description: 'Map the layers of jobs your customer is hiring for.',
        fields: [
          { id: 'functional-job', label: 'Functional Job', type: 'textarea', required: true, placeholder: 'What concrete outcome must be achieved?' },
          { id: 'emotional-job', label: 'Emotional Job', type: 'textarea', required: true, placeholder: 'What internal relief or confidence must occur?' },
          { id: 'social-job', label: 'Social Job', type: 'textarea', required: true, placeholder: 'What status, identity, or signaling must improve?' },
          { id: 'risk-job', label: 'Risk Job', type: 'textarea', required: true, placeholder: 'What failure or regret must be avoided?' },
          { id: 'job-gets-worse', label: 'What job gets worse if this product succeeds? (optional)', type: 'textarea', required: false, placeholder: 'Second-order effects: what job or outcome gets worse if you win? (Yale / ethics-coded.)' },
        ],
      },
    ],
    coldCall: {
      question: 'Which assumption, if wrong, kills this business?',
      timeLimit: 90,
      semanticCriteria: {
        noHedging: true,
        minLength: 20,
      },
      penalty: 5,
    },
    redTeam: {
      question: 'Assume your top three customers disappear tomorrow. What actually breaks — and what were you lying to yourself about? Include one failure you personally caused, not the market.',
      checks: [
        {
          type: 'consistency',
          field1: 'advantage',
          field2: 'copyability',
          condition: 'all-high',
          message: 'Strategic Delusion: All advantages are highly copyable. This is not defensible.',
        },
      ],
    },
    boardLens: 'This is the module boards wish founders had completed honestly. Failure here shows up later as CAC shock, stalled growth, sudden pivots, executive firings framed as "execution issues."',
    requiredOutputs: [
      { id: 'market-assumption', label: 'One explicitly stated market assumption', type: 'text' },
      {
        id: 'market-structure-snapshot',
        label: 'Market Structure Snapshot (3 min). Which statement best describes your market today?',
        type: 'select',
        options: [
          'Fragmented, low differentiation',
          'Winner-take-most',
          'Regulated / permissioned',
          'Platform-mediated',
          'Status-driven / brand-constrained',
          'Commodity with switching friction',
        ],
      },
      {
        id: 'market-structure-strategy-exclusion',
        label: 'If this is true, what cannot be your strategy?',
        type: 'text',
      },
      {
        id: 'non-obvious-competitor',
        label: 'One non-obvious competitor (not a direct competitor or brand in your category)',
        type: 'text',
        placeholder: 'You may NOT name a direct competitor or a brand in your category. Instead choose one: spreadsheet/internal process, existing contract, status quo behavior, or emotional substitute ("do nothing," "delay," "avoid risk").',
      },
      { id: 'job-layer', label: 'One job layer competitors do not serve', type: 'text' },
      { id: 'context-risk', label: 'One context risk you cannot control', type: 'text' },
      { id: 'advantage', label: 'One advantage you are willing to bet on', type: 'text' },
      {
        id: 'base-rate-failure',
        label: 'Base Rate Reality Check. In businesses of this type, what usually fails first?',
        type: 'select',
        options: [
          'Demand is overestimated',
          'Sales cycles are longer than expected',
          'Trust never materializes',
          'Unit economics don\'t improve',
          'Founder fatigue / execution collapse',
        ],
      },
      {
        id: 'base-rate-pretense',
        label: 'Which one are you pretending won\'t apply to you — and why?',
        type: 'text',
      },
    ],
    professorNotes: {
      whatStudentsGetWrong: 'Students list features and "we have great product." They avoid naming a single non-obvious competitor or a real context risk. They confuse "mission" with "advantage."',
      whatAplusSmellsLike: 'One defensible advantage stated in copyability terms. One job layer competitors do not serve. One explicit market assumption that could be wrong. No hedging.',
      theTrap: 'The trap is answering the Company C with "our team" or "our culture." Strategy is about what cannot be copied fast enough to matter—not effort.',
    },
    sampleAnswers: {
      strong: {
        text: 'Our advantage is proprietary supply data that takes 18+ months to replicate; we are not dependent on founder relationships. The job layer competitors do not serve is the emotional relief of "I will not be surprised by price or availability." We assume the segment that pays for that relief is at least 15% of the category; if it is under 10%, we are wrong.',
        why: 'Specific, falsifiable (18 months, 15%), names a job layer, states one assumption that could be wrong.',
      },
      weak: {
        text: 'We have a great team and our product is better. Our customers love us. We are different from competitors because we care more.',
        whyFails: 'No copyability, no job layer, no falsifiable assumption. "Great team" and "care more" are not strategy—they are effort.',
      },
    },
    legitimacyLens: {
      whoCouldAttack: 'Who could credibly attack this?',
      whatLooksExploitative: 'What would make us look exploitative?',
      implicitPromise: 'What promise are we making implicitly?',
    },
    readingSpine: {
      primaryReading: { title: 'Competing Against Luck (Christensen et al.)', description: 'Jobs-to-be-done foundation.' },
      counterpointReading: { title: 'The Innovator\'s Dilemma', description: 'Why incumbents miss disruptive jobs.' },
      operatorArtifact: { title: 'Segment memo or teardown', description: 'One real company job-stack analysis.' },
    },
    readingCompanion: {
      essentials: {
        canon: {
          title: 'Good Strategy/Bad Strategy',
          author: 'Richard Rumelt',
          coreIdea: 'Strategy is not vision, ambition, or growth goals. Strategy is a diagnosis of reality, a guiding policy, and a set of coherent actions. Most companies skip diagnosis and call it strategy.',
          whyMatters: 'If you don\'t name the real constraint in your market, every downstream decision (branding, ads, pricing, hiring) is decoration.',
        },
        counterpoint: {
          title: 'The Mom Test',
          author: 'Rob Fitzpatrick',
          coreIdea: 'Customers will lie to you unintentionally. Opinions are useless. Past behavior with money is the only signal that matters.',
          whyMatters: 'Founders confuse encouragement with evidence. This book is an antidote to false confidence.',
        },
        operatorArtifact: {
          title: 'Assumption Kill-Switch Memo',
          description: '"If this assumption is false, the business fails." In-app template.',
          templateFields: ['Assumption', 'Why we believe it', 'What would disprove it', 'How we test it in 14 days', 'What we do if it fails'],
        },
      },
      keyIdeas: [
        'Strategy starts with what is actually happening, not what you wish were happening. (Good Strategy / Bad Strategy)',
        'A "strategy" that does not acknowledge obstacles is not a strategy.',
        'Coherence matters more than effort.',
        '"Would you use this?" is a trap. (The Mom Test)',
        'Talking about the future creates lies.',
        'Money, time, and switching behavior tell the truth.',
      ],
      keyExcerpt: {
        quote: 'A good strategy recognizes the nature of the challenge and offers a way to overcome it.',
        professorNote: 'Most founders jump to tactics because diagnosis is uncomfortable. This module exists to slow you down on purpose.',
      },
      listenScript: 'Before you market anything, you need to know what problem actually exists. Not what customers say they want. Not what competitors are doing. But what constraint in the market is preventing progress right now. Strategy begins with diagnosis. If you skip that step, every other decision becomes expensive guesswork.',
      applyPrompt: 'What belief are you currently treating as fact that you have not earned the right to believe? (Must reference paid behavior; must name a specific failure mode; one paragraph max.)',
      booksList: [
        { id: 'm1-canon', title: 'Good Strategy/Bad Strategy', author: 'Richard Rumelt', type: 'canon' },
        { id: 'm1-counterpoint', title: 'The Mom Test', author: 'Rob Fitzpatrick', type: 'counterpoint' },
        { id: 'm1-artifact', title: 'Assumption Kill-Switch Memo', type: 'artifact' },
      ],
    } as ReadingCompanion,
    synthesisDisciplines: ['economics', 'psychology', 'design', 'sociology', 'systems engineering'],
    order: 1,
  },
  // Modules 2-15 will follow similar structure
  // For brevity, I'll add key modules with their unique elements
  {
    id: 'module-2',
    pillar: 'pillar-1',
    title: 'Structural Attractiveness',
    thesis: 'A great strategy in a bad market is still a bad investment.',
    whyExists: {
      academic: 'Harvard teaches strategy as choice under constraint. Oxford teaches economics as incentives over time.',
      operator: 'Some markets punish excellence.',
    },
    frameworks: [
      {
        id: 'framework-2-1',
        title: "Porter's Five Forces — Applied",
        description: 'Porter\'s Five Forces are not a checklist. They are a stress test.',
        content: 'Score each force from 1 (favorable) to 5 (hostile). Total ≤ 12 → structurally attractive. ≥ 18 → value extraction is unlikely.',
      },
    ],
    worksheets: [
      {
        id: 'worksheet-2-1',
        title: 'Five Forces Scoring Table',
        description: 'Score each force from 1 (favorable) to 5 (hostile).',
        fields: [
          { id: 'competitive-rivalry', label: 'Competitive Rivalry', type: 'number', required: true },
          { id: 'buyer-power', label: 'Buyer Power', type: 'number', required: true },
          { id: 'supplier-power', label: 'Supplier Power', type: 'number', required: true },
          { id: 'substitutes', label: 'Substitutes', type: 'number', required: true },
          { id: 'new-entrants', label: 'New Entrants', type: 'number', required: true },
        ],
      },
    ],
    coldCall: {
      question: 'If this market commoditizes, who dies first — and why might it be you?',
      timeLimit: 90,
      semanticCriteria: { noHedging: true },
      penalty: 5,
    },
    requiredOutputs: [
      { id: 'five-forces-score', label: 'A Five Forces score you believe', type: 'number' },
      { id: 'profit-pool-position', label: 'A profit pool position you occupy', type: 'text' },
    ],
    readingSpine: {
      primaryReading: { title: "Competitive Strategy (Porter)", description: 'Five Forces and industry structure.' },
      counterpointReading: { title: 'Blue Ocean Strategy', description: 'Beyond structural determinism.' },
      operatorArtifact: { title: 'Industry memo or profit-pool map', description: 'One market structure analysis.' },
    },
    readingCompanion: {
      essentials: {
        canon: { title: 'Competitive Strategy', author: 'Michael Porter', coreIdea: 'Industry structure determines profitability. Five Forces reveal where value is extracted or destroyed.', whyMatters: 'Profitability is not created by effort. It is created by structure. If the structure is hostile, execution will only delay failure.' },
        counterpoint: { title: '7 Powers', author: 'Hamilton Helmer', coreIdea: 'Sustainable advantage requires a power that compounds over time.', whyMatters: 'Structural analysis alone can miss asymmetric advantages that defy industry norms.' },
        operatorArtifact: { title: 'Substitute-First 5 Forces Map', description: 'Define competitors by job, not category.' },
      },
      keyIdeas: ['Profitability is created by structure, not effort.', 'Define competitors by job, not category.', 'A hostile structure makes execution delay failure, not avoid it.'],
      listenScript: 'Profitability is not created by effort. It is created by structure. If the structure is hostile, execution will only delay failure.',
      booksList: [
        { id: 'm2-canon', title: 'Competitive Strategy', author: 'Michael Porter', type: 'canon' },
        { id: 'm2-counterpoint', title: '7 Powers', author: 'Hamilton Helmer', type: 'counterpoint' },
        { id: 'm2-artifact', title: 'Substitute-First 5 Forces Map', type: 'artifact' },
      ],
    } as ReadingCompanion,
    synthesisDisciplines: ['economics', 'psychology', 'design', 'sociology', 'systems engineering'],
    order: 2,
  },
  {
    id: 'module-3',
    pillar: 'pillar-1',
    title: 'Value Chain Deconstruction',
    thesis: 'Competitive advantage does not live in products. It lives in specific activities that competitors cannot easily replicate.',
    whyExists: {
      academic: 'Harvard teaches that advantage comes from doing different activities, or doing the same activities differently.',
      operator: 'Founders often believe advantage lives in product quality, taste, mission, talent. Those are inputs, not moats.',
    },
    frameworks: [
      {
        id: 'framework-3-1',
        title: 'The Activity-Level Value Chain',
        description: 'Forget the generic Porter diagram. We are working at granular resolution.',
        content: `Category | Examples
Inbound | Sourcing, data access, IP
Core Operations | Manufacturing, development, protocol
Experience | Onboarding, service delivery, UX
Distribution | Channels, partnerships, logistics
Brand & Narrative | Signaling, trust, authority
Post-Purchase | Retention, support, ecosystem`,
      },
    ],
    worksheets: [
      {
        id: 'worksheet-3-1',
        title: 'Activity Breakdown Table',
        description: 'List every meaningful activity involved in delivering value.',
        fields: [
          { id: 'activity', label: 'Activity', type: 'text', required: true },
          { id: 'cost-driver', label: 'Cost Driver', type: 'textarea', required: true },
          { id: 'value-driver', label: 'Value Driver', type: 'textarea', required: true },
          { id: 'strategic-or-commodity', label: 'Strategic or Commodity', type: 'select', required: true, options: ['Strategic', 'Commodity'] },
        ],
        rules: ['If an activity is both high cost and commodity, it is a liability.'],
      },
    ],
    coldCall: {
      question: 'Which single activity, if copied tomorrow, destroys your differentiation?',
      timeLimit: 90,
      semanticCriteria: { noHedging: true },
      penalty: 5,
    },
    requiredOutputs: [
      { id: 'value-chain', label: 'A fully mapped value chain', type: 'text' },
      { id: 'strategic-activity', label: 'At least one strategic activity', type: 'text' },
    ],
    readingCompanion: {
      essentials: {
        canon: { title: 'Competitive Advantage', author: 'Michael Porter', coreIdea: 'Advantage lives in the value chain—specific activities that are hard to replicate.', whyMatters: 'Most advantages live inside boring activities. If you can\'t point to a specific choke point, you don\'t have an advantage.' },
        counterpoint: { title: 'The Innovator\'s Dilemma', author: 'Clayton Christensen', coreIdea: 'Incumbents are disrupted when they optimize the wrong value chain.', whyMatters: 'Value chain strength can become rigidity when the job changes.' },
        operatorArtifact: { title: 'Value Chain Kill Point', description: 'Where margin or leverage actually accumulates.' },
      },
      keyIdeas: ['Advantage lives in specific activities, not products.', 'If you can\'t name the choke point, you don\'t have an advantage.', 'Boring activities often hold the moat.'],
      listenScript: 'Most advantages live inside boring activities. If you can\'t point to a specific choke point, you don\'t have an advantage.',
      booksList: [
        { id: 'm3-canon', title: 'Competitive Advantage', author: 'Michael Porter', type: 'canon' },
        { id: 'm3-counterpoint', title: "The Innovator's Dilemma", author: 'Clayton Christensen', type: 'counterpoint' },
        { id: 'm3-artifact', title: 'Value Chain Kill Point', type: 'artifact' },
      ],
    } as ReadingCompanion,
    order: 3,
  },
  {
    id: 'module-4',
    pillar: 'pillar-1',
    title: 'Positioning Through Exclusion',
    thesis: 'If too many people can say "this is for me," then no one believes it truly is.',
    whyExists: {
      academic: 'At Harvard, positioning is taught as trade-offs. At Brown and Yale, it\'s taught as identity formation.',
      operator: 'Founders often try to be "premium but accessible," widen positioning to chase growth, soften edges to avoid alienation.',
    },
    frameworks: [
      {
        id: 'framework-4-1',
        title: 'Advanced STP',
        description: 'The mistake is not misunderstanding STP. The mistake is stopping at Segmentation.',
        content: `Step | Amateur Question | Elite Question
Segmentation | Who could buy this? | Who already values what we stand for?
Targeting | Who should we target? | Who becomes more loyal as price rises?
Positioning | How are we better? | Why are we the only acceptable option?`,
      },
    ],
    worksheets: [
      {
        id: 'worksheet-4-1',
        title: 'Anti-Customer Declaration',
        description: 'An anti-customer is someone who might want your product but dilutes your positioning if served.',
        fields: [
          { id: 'anti-customer-type', label: 'Anti-Customer Type', type: 'text', required: true },
          { id: 'why-tempting', label: 'Why They\'re Tempting', type: 'textarea', required: true },
          { id: 'why-dangerous', label: 'Why They\'re Dangerous', type: 'textarea', required: true },
          { id: 'how-exclude', label: 'How You Will Exclude Them', type: 'textarea', required: true },
        ],
        rules: ['If you cannot name an anti-customer, your positioning is vague.'],
      },
    ],
    coldCall: {
      question: 'Who should never buy this — even if they want to?',
      timeLimit: 90,
      semanticCriteria: { noHedging: true },
      penalty: 5,
    },
    requiredOutputs: [
      { id: 'target-customer', label: 'A defined target customer', type: 'text' },
      { id: 'anti-customer', label: 'At least one anti-customer', type: 'text' },
    ],
    readingCompanion: {
      essentials: {
        canon: { title: 'Positioning', author: 'Al Ries & Jack Trout', coreIdea: 'Positioning is what you own in the mind of the customer. Clarity requires exclusion.', whyMatters: 'If your positioning doesn\'t repel anyone, it isn\'t positioning.' },
        counterpoint: { title: 'Obviously Awesome', author: 'April Dunford', coreIdea: 'Positioning is context-setting: who it\'s for, what category, why now.', whyMatters: 'Modern positioning is a repeatable process, not a one-time tagline.' },
        operatorArtifact: { title: 'Exclusion Statement', description: '"We are not for ___, even if it costs growth."' },
      },
      keyIdeas: ['Positioning that doesn\'t repel anyone isn\'t positioning.', 'Exclusion is the test of clarity.', 'Context (category, who, why) beats taglines.'],
      listenScript: 'If your positioning doesn\'t repel anyone, it isn\'t positioning.',
      booksList: [
        { id: 'm4-canon', title: 'Positioning', author: 'Al Ries & Jack Trout', type: 'canon' },
        { id: 'm4-counterpoint', title: 'Obviously Awesome', author: 'April Dunford', type: 'counterpoint' },
        { id: 'm4-artifact', title: 'Exclusion Statement', type: 'artifact' },
      ],
    } as ReadingCompanion,
    order: 4,
  },
  {
    id: 'module-5',
    pillar: 'pillar-1',
    title: 'Value Capture & Pricing Power',
    thesis: 'Value creation without value capture is charity. Pricing is where strategy proves it deserves to exist.',
    whyExists: {
      academic: 'Wharton Pricing + Oxford Microeconomics',
      operator: 'Most founders price backward from cost, anchor to competitors, discount to fix weak demand.',
    },
    frameworks: [
      {
        id: 'framework-5-1',
        title: 'The Value Wedge',
        description: 'Pricing power lives in the gap between Perceived Value and Cost.',
        content: 'Your job is not to lower cost alone. Your job is to expand the wedge.',
      },
    ],
    worksheets: [
      {
        id: 'worksheet-5-1',
        title: 'Value Wedge Decomposition',
        description: 'Expand the value wedge across multiple dimensions.',
        fields: [
          { id: 'functional-value', label: 'Functional Value', type: 'textarea', required: true },
          { id: 'emotional-value', label: 'Emotional Value', type: 'textarea', required: true },
          { id: 'risk-reduction', label: 'Risk Reduction', type: 'textarea', required: true },
        ],
      },
    ],
    requiredOutputs: [
      { id: 'value-wedge', label: 'A documented value wedge', type: 'text' },
      { id: 'wtp-levers', label: 'At least three WTP expansion levers', type: 'text' },
    ],
    readingCompanion: {
      essentials: {
        canon: { title: 'The Strategy and Tactics of Pricing', author: 'Thomas Nagle et al.', coreIdea: 'Pricing is a strategic lever, not a cost-plus exercise.', whyMatters: 'Value creation without value capture is charity.' },
        counterpoint: { title: 'Monetizing Innovation', author: 'Madhavan Ramanujam', coreIdea: 'Price before you build; willingness to pay should drive product.', whyMatters: 'Building first and pricing later leaves money on the table or kills products.' },
        operatorArtifact: { title: 'WTP Ladder', description: 'Cheapest acceptable → painful → no-brainer.' },
      },
      keyIdeas: ['Value creation without value capture is charity.', 'Price before you build where possible.', 'WTP ladder: acceptable, painful, no-brainer.'],
      listenScript: 'Value creation without value capture is charity.',
      booksList: [
        { id: 'm5-canon', title: 'The Strategy and Tactics of Pricing', author: 'Thomas Nagle et al.', type: 'canon' },
        { id: 'm5-counterpoint', title: 'Monetizing Innovation', author: 'Madhavan Ramanujam', type: 'counterpoint' },
        { id: 'm5-artifact', title: 'WTP Ladder', type: 'artifact' },
      ],
    } as ReadingCompanion,
    order: 5,
  },
  {
    id: 'module-6',
    pillar: 'pillar-1',
    title: 'Unit Economics & Defensibility',
    thesis: 'If your unit economics are weak, no amount of branding, growth, or narrative will save you.',
    whyExists: {
      academic: 'Wharton Finance × HBS General Manager Lens',
      operator: 'Most operators look at revenue, not contribution. They confuse gross margin with health.',
    },
    frameworks: [
      {
        id: 'framework-6-1',
        title: 'Unit Economics Stack',
        description: 'Every serious operator knows these by memory.',
        content: `Price - Variable Costs = Contribution Margin
Contribution Margin × Retention = LTV
LTV / CAC = Strategic Health Ratio`,
      },
    ],
    worksheets: [
      {
        id: 'worksheet-6-1',
        title: 'LTV:CAC Model',
        description: 'Calculate and stress-test your unit economics.',
        fields: [
          { id: 'price', label: 'Price', type: 'number', required: true },
          { id: 'variable-costs', label: 'Variable Costs', type: 'number', required: true },
          { id: 'monthly-churn', label: 'Monthly Churn %', type: 'number', required: true },
          { id: 'cac', label: 'CAC', type: 'number', required: true },
        ],
      },
    ],
    coldCall: {
      question: 'If CAC rises 30%, what breaks first?',
      timeLimit: 90,
      semanticCriteria: { noHedging: true },
      penalty: 5,
    },
    requiredOutputs: [
      { id: 'contribution-margin', label: 'Verified contribution margin per customer', type: 'number' },
      { id: 'ltv-range', label: 'A range, not a single-point LTV', type: 'text' },
    ],
    readingCompanion: {
      essentials: {
        canon: { title: 'Measuring and Managing Performance', author: 'HBS/Wharton canon', coreIdea: 'Unit economics are the grammar of growth and defensibility.', whyMatters: 'Unit economics reveal whether growth compounds or bleeds.' },
        counterpoint: { title: 'Lean Analytics', author: 'Alistair Croll & Benjamin Yoskovitz', coreIdea: 'One metric that matters; cohort over aggregate.', whyMatters: 'Operators need one north star and the discipline to ignore the rest.' },
        operatorArtifact: { title: 'Payback Stress Test', description: 'CAC vs contribution margin vs churn.' },
      },
      keyIdeas: ['Unit economics reveal whether growth compounds or bleeds.', 'One metric that matters beats a dashboard of vanity.', 'Payback and churn determine sustainability.'],
      listenScript: 'Unit economics reveal whether growth compounds or bleeds.',
      booksList: [
        { id: 'm6-canon', title: 'Measuring and Managing Performance', type: 'canon' },
        { id: 'm6-counterpoint', title: 'Lean Analytics', author: 'Alistair Croll & Benjamin Yoskovitz', type: 'counterpoint' },
        { id: 'm6-artifact', title: 'Payback Stress Test', type: 'artifact' },
      ],
    } as ReadingCompanion,
    order: 6,
  },
  {
    id: 'module-7',
    pillar: 'pillar-1',
    title: 'Competitive Dynamics & Game Theory',
    thesis: 'Markets are not chessboards. They are repeated games played by emotional, constrained, ego-driven actors.',
    whyExists: {
      academic: 'HBS Strategy × Oxford Game Theory',
      operator: 'Most founders respond reflexively, match competitor moves, assume price cuts are "temporary."',
    },
    frameworks: [
      {
        id: 'framework-7-1',
        title: 'The Prisoner\'s Dilemma (Applied)',
        description: 'In real markets, defection = price cut, over-promotion, feature race.',
        content: 'Short-term incentive to defect destroys long-term profit pools.',
      },
    ],
    worksheets: [
      {
        id: 'worksheet-7-1',
        title: 'Asymmetry Identification',
        description: 'The goal is not to beat competitors at what they do best. The goal is to force them into moves they hate.',
        fields: [
          { id: 'competitor-strength', label: 'Competitor Strength', type: 'text', required: true },
          { id: 'your-asymmetry', label: 'Your Asymmetry', type: 'textarea', required: true },
          { id: 'how-exploit', label: 'How You Exploit It', type: 'textarea', required: true },
        ],
      },
    ],
    coldCall: {
      question: 'What competitive move are you psychologically unwilling to make — and why?',
      timeLimit: 90,
      semanticCriteria: { noHedging: true },
      penalty: 5,
    },
    requiredOutputs: [
      { id: 'asymmetry', label: 'One explicit asymmetry', type: 'text' },
      { id: 'price-war-response', label: 'A price war response you will not violate', type: 'text' },
    ],
    readingCompanion: {
      essentials: {
        canon: { title: 'Co-opetition', author: 'Adam Brandenburger & Barry Nalebuff', coreIdea: 'Markets are games with competitors and complements. Value nets beat zero-sum thinking.', whyMatters: 'Markets are games. Pretending otherwise makes you the mark.' },
        counterpoint: { title: 'The Art of Strategy', author: 'Avinash Dixit', coreIdea: 'Game theory applied to business: commitment, credibility, and information.', whyMatters: 'Strategic moves require understanding how others will respond.' },
        operatorArtifact: { title: 'Competitor Response Map', description: 'What they do if you win.' },
      },
      keyIdeas: ['Markets are games; pretending otherwise makes you the mark.', 'Competitor response matters more than your move in isolation.', 'Value nets include complements, not just competitors.'],
      listenScript: 'Markets are games. Pretending otherwise makes you the mark.',
      booksList: [
        { id: 'm7-canon', title: 'Co-opetition', author: 'Adam Brandenburger & Barry Nalebuff', type: 'canon' },
        { id: 'm7-counterpoint', title: 'The Art of Strategy', author: 'Avinash Dixit', type: 'counterpoint' },
        { id: 'm7-artifact', title: 'Competitor Response Map', type: 'artifact' },
      ],
    } as ReadingCompanion,
    order: 7,
  },
  {
    id: 'module-8',
    pillar: 'pillar-1',
    title: 'Demand Creation vs Demand Capture',
    thesis: 'The most profitable companies do not win demand. They define it.',
    whyExists: {
      academic: 'Stanford GSB Market Design × Oxford Long-Run Economics',
      operator: 'Most businesses optimize conversion, tweak funnels, bid harder on keywords. Elite businesses reshape category language.',
    },
    frameworks: [
      {
        id: 'framework-8-1',
        title: 'The Demand Spectrum',
        description: 'All marketing spend falls somewhere on this continuum.',
        content: 'Demand Creation (Category shaping) ←──────→ Demand Capture (Keyword bidding)',
      },
    ],
    worksheets: [
      {
        id: 'worksheet-8-1',
        title: 'Demand Mix Audit',
        description: 'Early stage: lean capture. Mid stage: hybrid. Late stage: creation dominates.',
        fields: [
          { id: 'current-capture', label: 'Current % Capture', type: 'number', required: true },
          { id: 'current-creation', label: 'Current % Creation', type: 'number', required: true },
          { id: 'six-months-capture', label: '6 Months % Capture', type: 'number', required: true },
          { id: 'six-months-creation', label: '6 Months % Creation', type: 'number', required: true },
        ],
      },
    ],
    coldCall: {
      question: 'What demand will exist in 3 years because of you?',
      timeLimit: 90,
      semanticCriteria: { noHedging: true },
      penalty: 5,
    },
    requiredOutputs: [
      { id: 'owned-demand-asset', label: 'One owned demand asset', type: 'text' },
      { id: 'capture-to-creation-plan', label: 'A capture-to-creation transition plan', type: 'text' },
    ],
    readingCompanion: {
      essentials: {
        canon: { title: 'Crossing the Chasm', author: 'Geoffrey Moore', coreIdea: 'Early markets require creation; mainstream requires capture. The chasm is the gap.', whyMatters: 'Capture converts existing demand. Creation changes behavior.' },
        counterpoint: { title: 'Demand-Side Sales 101', author: 'Bob Moesta', coreIdea: 'Demand is created by progress, not messaging. Sales is helping people make the change they already want.', whyMatters: 'Creation is about triggering existing struggle, not inventing desire.' },
        operatorArtifact: { title: 'Trigger Map', description: 'What event makes buyers act now.' },
      },
      keyIdeas: ['Capture converts existing demand. Creation changes behavior.', 'The chasm is between early adopters and mainstream.', 'Triggers—what makes buyers act now—drive creation.'],
      listenScript: 'Capture converts existing demand. Creation changes behavior.',
      booksList: [
        { id: 'm8-canon', title: 'Crossing the Chasm', author: 'Geoffrey Moore', type: 'canon' },
        { id: 'm8-counterpoint', title: 'Demand-Side Sales 101', author: 'Bob Moesta', type: 'counterpoint' },
        { id: 'm8-artifact', title: 'Trigger Map', type: 'artifact' },
      ],
    } as ReadingCompanion,
    order: 8,
  },
  {
    id: 'module-9',
    pillar: 'pillar-1',
    title: 'Capital Allocation as a Marketing Skill',
    thesis: 'Most marketing failure is not creative failure. It is capital misallocation disguised as optimism.',
    whyExists: {
      academic: 'HBS Capital Allocation × Princeton Long-Term Strategy',
      operator: 'Most operators defend sunk costs, protect pet projects, spread spend evenly, avoid killing anything.',
    },
    frameworks: [
      {
        id: 'framework-9-1',
        title: 'Marketing Spend Is an Investment Portfolio',
        description: 'Every dollar has a job.',
        content: `Bucket | Purpose | Risk Profile
Core | Defend existing revenue | Low
Growth | Expand proven edges | Medium
Optionality | Buy future upside | High`,
      },
    ],
    worksheets: [
      {
        id: 'worksheet-9-1',
        title: 'Spend Portfolio Grid',
        description: 'If you can\'t classify it, you can\'t manage it.',
        fields: [
          { id: 'initiative', label: 'Initiative', type: 'text', required: true },
          { id: 'bucket', label: 'Bucket (Core/Growth/Optionality)', type: 'select', required: true, options: ['Core', 'Growth', 'Optionality'] },
          { id: 'expected-roi', label: 'Expected ROI', type: 'number', required: true },
          { id: 'time-horizon', label: 'Time Horizon (months)', type: 'number', required: true },
        ],
      },
    ],
    requiredOutputs: [
      { id: 'classified-portfolio', label: 'A classified spend portfolio', type: 'text' },
      { id: 'reallocation-decision', label: 'At least one reallocation decision', type: 'text' },
    ],
    readingCompanion: {
      essentials: {
        canon: { title: 'The Outsiders', author: 'William Thorndike', coreIdea: 'Capital allocation is the most underrated skill. Where you spend reveals your real strategy.', whyMatters: 'Where you spend reveals your real strategy.' },
        counterpoint: { title: 'Good Strategy/Bad Strategy', author: 'Richard Rumelt', coreIdea: 'Coherent action beats scattered initiative. One cut, one double-down.', whyMatters: 'Budget as strategy: one cut, one double-down.' },
        operatorArtifact: { title: 'Budget as Strategy', description: 'One cut, one double-down.' },
      },
      keyIdeas: ['Where you spend reveals your real strategy.', 'Capital allocation beats operational excellence for long-term returns.', 'One cut, one double-down beats spreading thin.'],
      listenScript: 'Where you spend reveals your real strategy.',
      booksList: [
        { id: 'm9-canon', title: 'The Outsiders', author: 'William Thorndike', type: 'canon' },
        { id: 'm9-counterpoint', title: 'Good Strategy/Bad Strategy', author: 'Richard Rumelt', type: 'counterpoint' },
        { id: 'm9-artifact', title: 'Budget as Strategy', type: 'artifact' },
      ],
    } as ReadingCompanion,
    order: 9,
  },
  {
    id: 'module-10',
    pillar: 'pillar-1',
    title: 'Strategic Failure & Exit Discipline',
    thesis: 'Most businesses don\'t fail. They persist past the point where success was mathematically impossible.',
    whyExists: {
      academic: 'Princeton Strategy × HBS Failure Case Canon',
      operator: 'Most founders rationalize stagnation, double down emotionally, chase sunk costs, confuse loyalty with discipline.',
    },
    frameworks: [
      {
        id: 'framework-10-1',
        title: 'Failure Is Usually Structural, Not Tactical',
        description: 'Tactics can be fixed. Structures rarely can.',
        content: 'Structural failure: margin compression, WTP ceiling, irreversible CAC inflation, regulatory shifts, category decay.',
      },
    ],
    worksheets: [
      {
        id: 'worksheet-10-1',
        title: 'Exit Trigger Declaration',
        description: 'Elite teams define exit conditions before crisis.',
        fields: [
          { id: 'metric', label: 'Metric', type: 'text', required: true },
          { id: 'threshold', label: 'Threshold', type: 'text', required: true },
          { id: 'action', label: 'Action', type: 'textarea', required: true },
        ],
      },
    ],
    coldCall: {
      question: 'If you were advising someone else, would you tell them to keep going?',
      timeLimit: 90,
      semanticCriteria: { noHedging: true },
      penalty: 5,
    },
    requiredOutputs: [
      { id: 'exit-area', label: 'Identified one area where exit is plausible', type: 'text' },
      { id: 'exit-trigger', label: 'Defined at least one exit trigger', type: 'text' },
    ],
    readingCompanion: {
      essentials: {
        canon: { title: 'Playing to Win', author: 'A.G. Lafley & Roger Martin', coreIdea: 'Strategy is choice. Where to play and how to win. Exit is a valid choice.', whyMatters: 'Quitting late is more expensive than quitting early.' },
        counterpoint: { title: 'Thinking in Bets', author: 'Annie Duke', coreIdea: 'Decisions under uncertainty; separating quality of decision from outcome.', whyMatters: 'Exit discipline requires accepting uncertainty; don\'t confuse outcome with decision quality.' },
        operatorArtifact: { title: 'Kill Criteria', description: 'What evidence forces a shutdown.' },
      },
      keyIdeas: ['Quitting late is more expensive than quitting early.', 'Kill criteria defined in advance beat emotional persistence.', 'Separate decision quality from outcome.'],
      listenScript: 'Quitting late is more expensive than quitting early.',
      booksList: [
        { id: 'm10-canon', title: 'Playing to Win', author: 'A.G. Lafley & Roger Martin', type: 'canon' },
        { id: 'm10-counterpoint', title: 'Thinking in Bets', author: 'Annie Duke', type: 'counterpoint' },
        { id: 'm10-artifact', title: 'Kill Criteria', type: 'artifact' },
      ],
    } as ReadingCompanion,
    order: 10,
  },
  {
    id: 'module-11',
    pillar: 'pillar-1',
    title: 'Market Creation & Category Design',
    thesis: 'The highest-margin companies do not compete. They force customers to learn a new way to evaluate value.',
    whyExists: {
      academic: 'Stanford GSB Market Design × Brown Sociocultural Theory',
      operator: 'Traditional strategy assumes known competitors, stable demand, shared evaluation criteria. Category creators face customer confusion, zero benchmarks, education costs.',
    },
    frameworks: [
      {
        id: 'framework-11-1',
        title: 'Category Creation vs Product Innovation',
        description: 'Product innovation improves something people already buy. Category creation changes what people buy.',
        content: 'If customers ask "How is this different from X?" you have not created a category yet.',
      },
    ],
    worksheets: [
      {
        id: 'worksheet-11-1',
        title: 'Education Burn Model',
        description: 'Category creators must teach before they sell. This is not waste. It is capitalized learning.',
        fields: [
          { id: 'phase', label: 'Phase', type: 'text', required: true },
          { id: 'cost', label: 'Cost', type: 'number', required: true },
          { id: 'outcome', label: 'Outcome', type: 'textarea', required: true },
        ],
      },
    ],
    coldCall: {
      question: 'What must customers unlearn to buy from you?',
      timeLimit: 90,
      semanticCriteria: { noHedging: true },
      penalty: 5,
    },
    requiredOutputs: [
      { id: 'enemy-status-quo', label: 'A clear enemy (status quo)', type: 'text' },
      { id: 'education-budget', label: 'A defined education budget', type: 'text' },
    ],
    readingCompanion: {
      essentials: {
        canon: { title: 'Play Bigger', author: 'Al Ramadan et al.', coreIdea: 'Category design precedes product. Categories create winners before products do.', whyMatters: 'Categories create winners before products do.' },
        counterpoint: { title: 'Blue Ocean Strategy', author: 'W. Chan Kim & Renée Mauborgne', coreIdea: 'Create uncontested space by redefining the frame.', whyMatters: 'Category creation is one path to blue ocean.' },
        operatorArtifact: { title: 'Category POV', description: 'What new lens you impose on the market.' },
      },
      keyIdeas: ['Categories create winners before products do.', 'Category POV: what new lens you impose on the market.', 'Education burn is capitalized learning, not waste.'],
      listenScript: 'Categories create winners before products do.',
      booksList: [
        { id: 'm11-canon', title: 'Play Bigger', author: 'Al Ramadan et al.', type: 'canon' },
        { id: 'm11-counterpoint', title: 'Blue Ocean Strategy', author: 'W. Chan Kim & Renée Mauborgne', type: 'counterpoint' },
        { id: 'm11-artifact', title: 'Category POV', type: 'artifact' },
      ],
    } as ReadingCompanion,
    order: 11,
  },
  {
    id: 'module-12',
    pillar: 'pillar-1',
    title: 'Strategy Under Constraint',
    thesis: 'Constraint is not the enemy of strategy. It is the forcing function that reveals whether you actually have one.',
    whyExists: {
      academic: 'HBS Entrepreneurial Strategy × Operator Reality',
      operator: 'Most founders fail not because their ideas are bad — but because they try to execute unconstrained strategy with constrained resources.',
    },
    frameworks: [
      {
        id: 'framework-12-1',
        title: 'Constraint Is a Design Variable',
        description: 'There are only three real constraints: Capital, Time, Attention.',
        content: 'Every strategy decision must explicitly choose which one to spend. If you don\'t choose, reality chooses for you — usually the worst one.',
      },
    ],
    worksheets: [
      {
        id: 'worksheet-12-1',
        title: 'Founder\'s 5C Reality Check',
        description: 'Traditional 5Cs assume abundance. Founders need constraint-adjusted clarity.',
        fields: [
          { id: 'c', label: 'C (Company/Collaborators/Customers/Competitors/Context)', type: 'text', required: true },
          { id: 'ideal-strategy', label: 'Ideal Strategy', type: 'textarea', required: true },
          { id: 'constrained-strategy', label: 'Constrained Strategy', type: 'textarea', required: true },
        ],
        rules: ['If the two columns look identical, the strategy is fantasy.'],
      },
    ],
    coldCall: {
      question: 'What decision are you delaying that constraint actually makes obvious?',
      timeLimit: 90,
      semanticCriteria: { noHedging: true },
      penalty: 5,
    },
    requiredOutputs: [
      { id: 'primary-constraint', label: 'Identified your primary constraint', type: 'text' },
      { id: 'narrowed-strategy', label: 'Narrowed strategy to one dominant wedge', type: 'text' },
    ],
    readingCompanion: {
      essentials: {
        canon: { title: 'The Goal', author: 'Eliyahu Goldratt', coreIdea: 'Constraints determine system output. Identify the bottleneck; the rest is noise.', whyMatters: 'Constraints are not excuses. They are design inputs.' },
        counterpoint: { title: 'High Output Management', author: 'Andy Grove', coreIdea: 'Leverage: focus on what only you can do. Constraint forces prioritization.', whyMatters: 'Constraint reversal: how the limit becomes leverage.' },
        operatorArtifact: { title: 'Constraint Reversal', description: 'How the limit becomes leverage.' },
      },
      keyIdeas: ['Constraints are not excuses. They are design inputs.', 'Identify the bottleneck; the rest is noise.', 'Constraint reversal: the limit becomes leverage.'],
      listenScript: 'Constraints are not excuses. They are design inputs.',
      booksList: [
        { id: 'm12-canon', title: 'The Goal', author: 'Eliyahu Goldratt', type: 'canon' },
        { id: 'm12-counterpoint', title: 'High Output Management', author: 'Andy Grove', type: 'counterpoint' },
        { id: 'm12-artifact', title: 'Constraint Reversal', type: 'artifact' },
      ],
    } as ReadingCompanion,
    order: 12,
  },
  {
    id: 'module-13',
    pillar: 'pillar-1',
    title: 'Multi-Business Orchestration',
    thesis: 'Running multiple businesses is not diversification. It is either a flywheel — or a slow-motion collapse.',
    whyExists: {
      academic: 'Princeton Systems Thinking × Operator Reality',
      operator: 'Most founders with multiple ventures context-switch constantly, duplicate effort, confuse activity with leverage, burn out emotionally.',
    },
    frameworks: [
      {
        id: 'framework-13-1',
        title: 'The Portfolio Is the Strategy',
        description: 'Once you run more than one business, the portfolio becomes the strategy.',
        content: 'The question is no longer "Is this business good?" It becomes "Does this business make the others stronger?"',
      },
    ],
    worksheets: [
      {
        id: 'worksheet-13-1',
        title: 'Portfolio Synergy Map',
        description: 'Flywheels form when output from one business becomes input for another.',
        fields: [
          { id: 'source-business', label: 'Source Business', type: 'text', required: true },
          { id: 'asset-produced', label: 'Asset Produced', type: 'text', required: true },
          { id: 'destination-business', label: 'Destination Business', type: 'text', required: true },
          { id: 'effect', label: 'Effect', type: 'textarea', required: true },
        ],
      },
    ],
    coldCall: {
      question: 'Which business would you double down on if you were forced to choose?',
      timeLimit: 90,
      semanticCriteria: { noHedging: true },
      penalty: 5,
    },
    requiredOutputs: [
      { id: 'portfolio-thesis', label: 'A declared portfolio thesis', type: 'text' },
      { id: 'primary-growth-engine', label: 'One primary growth engine', type: 'text' },
    ],
    readingCompanion: {
      essentials: {
        canon: { title: 'Corporate Strategy', author: 'HBS/Princeton canon', coreIdea: 'Multi-business logic: synergy that can be priced is real.', whyMatters: 'Synergy that can\'t be priced isn\'t real.' },
        counterpoint: { title: 'The Power of Bundling', author: 'Operator canon', coreIdea: 'Bundling creates value when the whole exceeds the sum of parts.', whyMatters: 'Portfolio logic: why each business exists together.' },
        operatorArtifact: { title: 'Portfolio Logic', description: 'Why each business exists together.' },
      },
      keyIdeas: ['Synergy that can\'t be priced isn\'t real.', 'Portfolio logic: why each business exists together.', 'The portfolio is the strategy once you have more than one business.'],
      listenScript: 'Synergy that can\'t be priced isn\'t real.',
      booksList: [
        { id: 'm13-canon', title: 'Corporate Strategy', type: 'canon' },
        { id: 'm13-counterpoint', title: 'The Power of Bundling', type: 'counterpoint' },
        { id: 'm13-artifact', title: 'Portfolio Logic', type: 'artifact' },
      ],
    } as ReadingCompanion,
    order: 13,
  },
  {
    id: 'module-14',
    pillar: 'pillar-1',
    title: 'Speed vs Perfection',
    thesis: 'Most failure is not caused by moving too fast. It\'s caused by moving fast in the wrong places — and slow in the ones that matter.',
    whyExists: {
      academic: 'Stanford Execution Bias × Amazon / Princeton Decision Theory',
      operator: 'Traditional education rewards analysis, completeness, certainty. Markets reward timing, learning velocity, reversible action, asymmetry.',
    },
    frameworks: [
      {
        id: 'framework-14-1',
        title: 'One-Way Doors vs Two-Way Doors',
        description: 'Every decision falls into one of two categories.',
        content: `Type I — One-Way Doors: Irreversible or extremely costly to undo (rebrands, pricing resets, fundraising, senior hires)
Type II — Two-Way Doors: Reversible (ad tests, landing pages, pilots, partnerships)

Elite operators move slow + deliberate on Type I, fast + imperfect on Type II.`,
      },
    ],
    worksheets: [
      {
        id: 'worksheet-14-1',
        title: 'Decision Classification Table',
        description: 'If you treat a two-way door like a one-way door, you are self-sabotaging.',
        fields: [
          { id: 'decision', label: 'Decision', type: 'text', required: true },
          { id: 'door-type', label: 'Door Type (Type I/Type II)', type: 'select', required: true, options: ['Type I', 'Type II'] },
          { id: 'reversibility', label: 'Reversibility (High/Low)', type: 'select', required: true, options: ['High', 'Low'] },
          { id: 'required-confidence', label: 'Required Confidence %', type: 'number', required: true },
        ],
      },
    ],
    coldCall: {
      question: 'Which decision are you pretending is Type I because you\'re afraid to be wrong?',
      timeLimit: 90,
      semanticCriteria: { noHedging: true },
      penalty: 5,
    },
    requiredOutputs: [
      { id: 'reclassified-decisions', label: 'At least three decisions reclassified as Type II', type: 'text' },
      { id: 'regret-comparison', label: 'A written regret comparison', type: 'text' },
    ],
    readingCompanion: {
      essentials: {
        canon: { title: 'The Lean Startup', author: 'Eric Ries', coreIdea: 'Build–Measure–Learn. Speed of learning beats speed of execution if execution is wrong.', whyMatters: 'Speed without learning is just motion.' },
        counterpoint: { title: 'Measure What Matters', author: 'John Doerr', coreIdea: 'OKRs: objectives and key results. What gets measured gets managed.', whyMatters: 'Learning velocity: insight gained per dollar.' },
        operatorArtifact: { title: 'Learning Velocity', description: 'Insight gained per dollar.' },
      },
      keyIdeas: ['Speed without learning is just motion.', 'Learning velocity: insight gained per dollar.', 'Type I vs Type II doors: slow on irreversible, fast on reversible.'],
      listenScript: 'Speed without learning is just motion.',
      booksList: [
        { id: 'm14-canon', title: 'The Lean Startup', author: 'Eric Ries', type: 'canon' },
        { id: 'm14-counterpoint', title: 'Measure What Matters', author: 'John Doerr', type: 'counterpoint' },
        { id: 'm14-artifact', title: 'Learning Velocity', type: 'artifact' },
      ],
    } as ReadingCompanion,
    order: 14,
  },
  {
    id: 'module-15',
    pillar: 'pillar-1',
    title: 'Narrative as Economic Infrastructure',
    thesis: 'Narrative is not branding. Narrative is the invisible system that determines Willingness to Pay, Retention, and CAC.',
    whyExists: {
      academic: 'Yale Moral Psychology × Princeton Institutional Power',
      operator: 'Markets do not evaluate products objectively. They evaluate them through stories. Without narrative, competitors compete on math alone — and math converges.',
    },
    frameworks: [
      {
        id: 'framework-15-1',
        title: 'Narrative Changes the Frame of Evaluation',
        description: 'People don\'t ask "Is this worth the price?" They ask "What kind of person buys this — and what does that say about me?"',
        content: 'Narrative determines whether price feels expensive or appropriate, whether friction feels annoying or intentional, whether waiting feels painful or prestigious.',
      },
    ],
    worksheets: [
      {
        id: 'worksheet-15-1',
        title: 'Strategic Narrative Framework',
        description: 'Every elite narrative contains five elements: The World As It Is, The Injustice, The Villain, The New World, The Hero (Customer).',
        fields: [
          { id: 'world-as-is', label: 'World As It Is', type: 'textarea', required: true },
          { id: 'injustice', label: 'The Injustice', type: 'textarea', required: true },
          { id: 'villain', label: 'The Villain', type: 'textarea', required: true },
          { id: 'new-world', label: 'The New World', type: 'textarea', required: true },
          { id: 'hero', label: 'The Hero (Customer)', type: 'textarea', required: true },
        ],
        rules: ['If the villain is vague, the story lacks force.'],
      },
    ],
    coldCall: {
      question: 'What belief must someone adopt to justify paying you?',
      timeLimit: 90,
      semanticCriteria: { noHedging: true },
      penalty: 5,
    },
    requiredOutputs: [
      { id: 'governing-narrative', label: 'A single governing narrative', type: 'text' },
      { id: 'required-belief', label: 'One belief your customer must adopt', type: 'text' },
    ],
    readingCompanion: {
      essentials: {
        canon: { title: 'The Power of Myth', author: 'Joseph Campbell', coreIdea: 'Narratives shape behavior; myth is the operating system of culture.', whyMatters: 'Narratives reduce friction. Friction is cost.' },
        counterpoint: { title: 'Building a StoryBrand', author: 'Donald Miller', coreIdea: 'Brand as story: hero (customer), guide (you), plan, call to action.', whyMatters: 'Narrative stack: belief → behavior → revenue.' },
        operatorArtifact: { title: 'Narrative Stack', description: 'Belief → behavior → revenue.' },
      },
      keyIdeas: ['Narratives reduce friction. Friction is cost.', 'Narrative stack: belief → behavior → revenue.', 'What belief must someone adopt to justify paying you?'],
      listenScript: 'Narratives reduce friction. Friction is cost.',
      booksList: [
        { id: 'm15-canon', title: 'The Power of Myth', author: 'Joseph Campbell', type: 'canon' },
        { id: 'm15-counterpoint', title: 'Building a StoryBrand', author: 'Donald Miller', type: 'counterpoint' },
        { id: 'm15-artifact', title: 'Narrative Stack', type: 'artifact' },
      ],
    } as ReadingCompanion,
    order: 15,
  },
];

// Helper to get module by ID
export const getModuleById = (id: string): Module | undefined => {
  return modules.find((m) => m.id === id);
};

// Helper to get all modules in order
export const getModulesInOrder = (): Module[] => {
  return [...modules].sort((a, b) => a.order - b.order);
};
