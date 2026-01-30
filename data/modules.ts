import { Module } from '@/types';

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
      question: 'Assume your top three customers disappear tomorrow. What actually breaks — and what were you lying to yourself about?',
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
      { id: 'non-obvious-competitor', label: 'One non-obvious competitor', type: 'text' },
      { id: 'job-layer', label: 'One job layer competitors do not serve', type: 'text' },
      { id: 'context-risk', label: 'One context risk you cannot control', type: 'text' },
      { id: 'advantage', label: 'One advantage you are willing to bet on', type: 'text' },
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
