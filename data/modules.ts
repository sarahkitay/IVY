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
    thesis: 'A great strategy in a bad market is still a bad investment. This module is not about ambition. It\'s about survival.',
    whyExists: {
      academic: 'Harvard teaches strategy as choice under constraint. Markets have physics. You can\'t "outwork" structural economics. Porter\'s Five Forces isn\'t a checklist — it\'s a stress test for whether profit is available to be captured.',
      operator: 'Some markets punish excellence. You can build a world-class product and still lose if buyers force price down, suppliers control costs, substitutes are "good enough," new entrants flood in, or rivalry makes margin evaporate. Rule: If profit is structurally unavailable, marketing becomes expensive theater.',
    },
    frameworks: [
      {
        id: 'framework-2-1',
        title: "Porter's Five Forces — Applied",
        description: 'Five Forces are not a checklist. They are a stress test.',
        content: `Scoring rule: Score each force from 1 (favorable) to 5 (hostile).

• Total ≤ 12 → structurally attractive
• 13–14 → playable with clear positioning
• 15–17 → only playable with a real moat
• ≥ 18 → value extraction is unlikely (expect margin compression)

Non-negotiable evidence rule: State facts only. No adjectives.
Each force must include: one number (or bounded estimate), and one observed behavior (what buyers/suppliers/competitors actually do).`,
      },
      {
        id: 'framework-2-2',
        title: 'Five Forces Field Guide',
        description: 'How to score like a board, not like a student.',
        content: `1) COMPETITIVE RIVALRY
What it is: How aggressively incumbents fight over the same buyer.
Drivers: slow growth, undifferentiated offers, high fixed costs, low switching costs.

1 (favorable): few serious rivals, stable pricing, differentiation holds, growth gives everyone oxygen.
5 (hostile): frequent discounting, feature copying within weeks, churn is normal, high fixed costs force volume behavior.
Evidence: number of meaningful rivals, price volatility, category growth rate, churn norms.
Trap: Confusing "we're better" with "we're different." Better doesn't reduce rivalry. Difference does.

2) BUYER POWER
What it is: The buyer's ability to force price down or demand more value.
Drivers: easy comparison, low switching costs, standardized offerings, concentrated buyers.

1 (favorable): fragmented buyers, switching is painful, buyer pays for outcome, high trust purchase.
5 (hostile): buyer compares in a spreadsheet, switching is instant, buyer threatens churn to negotiate, buyer can delay with low consequence.
Evidence: how customers evaluate, switching friction, % who negotiate, purchase cycle length.
Trap: "Would you use this?" vs "What did you last pay for?" Interest is not power. Payment is power.

3) SUPPLIER POWER
What it is: Upstream control over cost, quality, lead times, or capacity.
Drivers: concentration, unique inputs, switching pain, limited capacity.

1 (favorable): many equivalent suppliers, standardized inputs, low MOQ, short lead times.
5 (hostile): one or two viable suppliers, supply constraints, supplier sets price and terms.
Evidence: number of qualified suppliers, lead times, MOQ, exclusivity terms.
Trap: Ignoring chokepoints because "we'll figure it out later." Supplier leverage shows up after you're dependent.

4) THREAT OF SUBSTITUTES
What it is: Alternative ways customers solve the same job.
Drivers: "good enough" options, bundling, habit, free defaults.

1 (favorable): substitutes are meaningfully worse or require behavior change.
5 (hostile): substitutes are cheaper + easier, bundled elsewhere, "default" option is acceptable.
Evidence: what customers use instead today, what they do when they don't buy you, bundling.
Trap: Listing peers instead of substitutes. Your competitor might be sleep, YouTube, inertia, or a bundled alternative.

5) THREAT OF NEW ENTRANTS
What it is: How easy for new players to enter and compete effectively.
Drivers: low capex, easy distribution, white-label supply, ad platforms, weak regulation.

1 (favorable): strong regulation, distribution gatekeepers, scale economies, trust moats.
5 (hostile): anyone can launch in 30 days, off-the-shelf suppliers, platform distribution open.
Evidence: startup density, time + money to replicate, channel barriers, trust barriers.
Trap: Thinking "hard work" is a barrier. Hard work is available to every entrant.`,
      },
    ],
    worksheets: [
      {
        id: 'worksheet-2-1',
        title: 'Five Forces Scoring Table',
        description: 'For each force, write facts only. Minimum: one number + one observed behavior. Then score 1–5. Total / 25. Interpretation: ≤12 attractive, 13–14 playable, 15–17 moat required, ≥18 value extraction unlikely.',
        fields: [
          { id: 'competitive-rivalry-evidence', label: 'Competitive Rivalry — Evidence (number + behavior)', type: 'textarea', required: true, placeholder: 'State facts only. No adjectives.' },
          { id: 'competitive-rivalry-score', label: 'Competitive Rivalry — Score (1–5)', type: 'number', required: true },
          { id: 'buyer-power-evidence', label: 'Buyer Power — Evidence (number + behavior)', type: 'textarea', required: true, placeholder: 'State facts only. No adjectives.' },
          { id: 'buyer-power-score', label: 'Buyer Power — Score (1–5)', type: 'number', required: true },
          { id: 'supplier-power-evidence', label: 'Supplier Power — Evidence (number + behavior)', type: 'textarea', required: true, placeholder: 'State facts only. No adjectives.' },
          { id: 'supplier-power-score', label: 'Supplier Power — Score (1–5)', type: 'number', required: true },
          { id: 'substitutes-evidence', label: 'Substitutes — Evidence (number + behavior)', type: 'textarea', required: true, placeholder: 'State facts only. No adjectives.' },
          { id: 'substitutes-score', label: 'Substitutes — Score (1–5)', type: 'number', required: true },
          { id: 'new-entrants-evidence', label: 'New Entrants — Evidence (number + behavior)', type: 'textarea', required: true, placeholder: 'State facts only. No adjectives.' },
          { id: 'new-entrants-score', label: 'New Entrants — Score (1–5)', type: 'number', required: true },
          { id: 'five-forces-total', label: 'Total Score (/ 25)', type: 'number', required: true },
          { id: 'breaker-force', label: 'The breaker force (the force you cannot fix by execution alone)', type: 'textarea', required: true, placeholder: '"The breaker force is ________, and we cannot fix it by execution alone."' },
        ],
        rules: ['One number + one observed behavior per force. No adjectives.'],
      },
      {
        id: 'worksheet-2-2',
        title: 'Profit Pool Analysis',
        description: 'Where does profit actually concentrate? Most founders ask "Can we sell this?" Boards ask: Who keeps the money once the market matures?',
        fields: [
          { id: 'where-profit-concentrates', label: 'Where profit concentrates (layer: upstream / manufacturing / distribution / brand / post-purchase) + why', type: 'textarea', required: true, placeholder: 'Profit concentrates in ________ because ________.' },
          { id: 'who-pricing-power', label: 'Who has pricing power (buyers / suppliers / platforms / incumbents / regulators) + why', type: 'textarea', required: true, placeholder: 'Pricing power sits with ________ because ________.' },
          { id: 'margin-killer', label: 'The margin killer (what structurally compresses margin)', type: 'textarea', required: true, placeholder: 'Margin is structurally compressed by ________.' },
          { id: 'our-capture-point', label: 'Our capture point (where we capture profit and why there)', type: 'textarea', required: true, placeholder: 'We capture profit by owning ________ and avoiding ________.' },
        ],
        rules: ['If you cannot name the profit pool, you don\'t have a strategy — you have a product plan.'],
      },
      {
        id: 'worksheet-2-3',
        title: 'Market Death Signals Checklist',
        description: 'If these are true, the market will punish you. Check any that apply. Verdict: If you check 5+, assume the market trends toward extraction unless you have a moat.',
        fields: [
          {
            id: 'death-signals',
            label: 'Signals that apply',
            type: 'checkbox-group',
            required: false,
            options: [
              'Customers compare primarily on price',
              'Differentiation copied within a quarter',
              'Promotions required to maintain volume',
              'Reviews mention "same as" or "similar to"',
              'Few large players control demand, volume games',
              'CAC inflation is the real tax',
              'Switching is normal and expected',
              'Buyers negotiate routinely or churn when prices rise',
              'Customers delay purchase without meaningful pain',
              'Procurement exists or buyer behaves like procurement',
              'One platform or distributor controls access',
              'Take rates high, rules change without warning',
              'New brands launch weekly',
              'White-label supply dominates category',
              'Influencer distribution is the default moat (fragile)',
            ],
            placeholder: 'Check all that apply.',
          },
        ],
      },
    ],
    coldCall: {
      question: 'If this market commoditizes, who dies first — and why might it be you?',
      timeLimit: 90,
      semanticCriteria: { noHedging: true, minLength: 20 },
      penalty: 5,
    },
    boardLens: 'Founders who skip this section usually blame execution later. This is the module boards wish founders had completed honestly.',
    requiredOutputs: [
      { id: 'five-forces-score', label: 'A Five Forces score you believe (total + 2 facts per force; then one line: "The breaker force is ________, and we cannot fix it by execution alone.")', type: 'text', placeholder: 'Total score + 2 facts per force + breaker force line.' },
      { id: 'profit-pool-position', label: 'A profit pool position you occupy ("In this industry, profit concentrates in ________. We capture profit by owning ________. If we fail, ________ captures it instead.")', type: 'text', placeholder: 'Three-part statement: where profit concentrates, how we capture, who captures if we fail.' },
    ],
    professorNotes: {
      whatStudentsGetWrong: 'They score based on vibes — if you can\'t cite evidence, you don\'t get to claim the score. They confuse market size with attractiveness (big markets can be brutal). They assume execution beats structure — execution matters only after structure allows profit.',
      whatAplusSmellsLike: 'Two factual indicators per force. One force identified as the "breaker" (the force you cannot fix). One explicit assumption that could be wrong.',
      theTrap: '"We\'ll out-execute incumbents." That\'s not strategy. That\'s hope.',
    },
    sampleAnswers: {
      strong: {
        text: 'Rivalry: Top 3 incumbents control ~65% of spend; discount cycles quarterly; category growth 2–4% YoY; competitors copy features within 6–8 weeks. Buyer power: Customers compare 3–5 options; switching cost near-zero; 20–30% request discounts or wait for promos. The breaker force is buyer power — we cannot fix it by execution alone. We assume buyer power decreases if contracts exceed 12 months.',
        why: 'Two facts per force cited, one breaker force named, one falsifiable assumption. State facts only.',
      },
      weak: {
        text: 'Competition is intense, but our product is better. Customers love us and will stay.',
        whyFails: 'No facts, no structure. "Better" and "love" are not forces — they ignore who captures value when structure shifts.',
      },
    },
    legitimacyLens: {
      whoCouldAttack: 'Who could credibly dispute your Five Forces score? (e.g. procurement, channel partners, suppliers, incumbents, adjacent substitutes.)',
      whatLooksExploitative: 'What would make our analysis look exploitative or naive? (e.g. claiming low rivalry while prices are unstable; claiming low buyer power while customers comparison-shop.)',
      implicitPromise: 'What promise are we implicitly making? ("We can hold margin without continuous concessions.")',
    },
    readingSpine: {
      primaryReading: { title: 'Competitive Strategy (Porter)', description: 'Industry structure, Five Forces.' },
      counterpointReading: { title: 'Blue Ocean Strategy', description: 'Beyond structural determinism — value innovation.' },
      operatorArtifact: { title: 'Industry memo or profit-pool map', description: 'One page: your market, your capture point.' },
    },
    readingCompanion: {
      essentials: {
        canon: { title: 'Competitive Strategy', author: 'Michael Porter', coreIdea: 'Industry structure determines profitability. Five Forces reveal where value is extracted or destroyed.', whyMatters: 'Profitability is not created by effort. It is created by structure. If the structure is hostile, execution will only delay failure.' },
        counterpoint: { title: 'Blue Ocean Strategy', author: 'Kim & Mauborgne', coreIdea: 'Value innovation can reshape industry structure.', whyMatters: 'Structural analysis alone can miss moves that redefine the playing field.' },
        operatorArtifact: { title: 'Industry memo or profit-pool map', description: 'One page: where profit concentrates, who has pricing power, your capture point.' },
      },
      keyIdeas: ['Profitability is created by structure, not effort.', 'Define competitors by job, not category.', 'A hostile structure makes execution delay failure, not avoid it.', 'If you cannot name the profit pool, you have a product plan, not a strategy.'],
      listenScript: 'Profitability is not created by effort. It is created by structure. If the structure is hostile, execution will only delay failure.',
      applyPrompt: 'What belief are you currently treating as fact about this market that you have not earned the right to believe? (Must cite one number + one behavior; one paragraph max.)',
      booksList: [
        { id: 'm2-canon', title: 'Competitive Strategy', author: 'Michael Porter', type: 'canon' },
        { id: 'm2-counterpoint', title: 'Blue Ocean Strategy', author: 'Kim & Mauborgne', type: 'counterpoint' },
        { id: 'm2-artifact', title: 'Industry memo or profit-pool map', type: 'artifact' },
      ],
    } as ReadingCompanion,
    synthesisDisciplines: ['economics', 'psychology', 'design', 'sociology', 'systems engineering'],
    order: 2,
  },
  {
    id: 'module-3',
    pillar: 'pillar-1',
    title: 'Value Chain Deconstruction',
    thesis: 'Competitive advantage does not live in products. It lives in specific activities competitors cannot easily replicate.',
    whyExists: {
      academic: 'Strategy isn\'t "be better." Strategy is choose an activity system—a chain of reinforcing choices—where competitors can\'t copy you without breaking themselves.',
      operator: 'Most founders over-invest in inputs (quality, taste, talent, aesthetics) and under-invest in moats (systems, channels, trust loops, process leverage). Inputs can be matched. Systems compound.',
    },
    frameworks: [
      {
        id: 'framework-3-1',
        title: 'The Activity-Level Value Chain',
        description: 'Forget the generic Porter diagram. We\'re working at granular resolution. Rule: If you can\'t name the activity in a sentence, you can\'t defend it in a boardroom.',
        content: `Categories (your "granularity map")

1. Inbound — sourcing, data access, IP, supplier leverage
2. Core Operations — manufacturing, development, protocols, QA
3. Experience — onboarding, service delivery, UX, outcomes
4. Distribution — channels, partnerships, logistics, placement
5. Brand & Narrative — signaling, trust, authority, meaning
6. Post-Purchase — retention loops, support, ecosystem, community

Elite rule: If you can't name the exact activities that create your premium, you don't have a premium—just a higher price.`,
      },
      {
        id: 'framework-3-2',
        title: 'Cost Drivers vs Value Drivers',
        description: 'The split most people never make. Every activity has two sides.',
        content: `COST DRIVERS (what makes it expensive)
Labor intensity / specialization, time / cycle length, complexity / coordination overhead, waste / defect rate / returns, tooling / capex / MOQ, compliance / risk.

VALUE DRIVERS (what increases willingness-to-pay)
Outcome reliability ("it always works"), speed / convenience / reduced friction, trust and safety (proof, authority, credibility), status signaling (taste, rarity, membership), personalization / fit / identity alignment, ecosystem benefits (it gets better as you use it).

Rules: Cost high + value weak → kill or commoditize. Value strong + cost low → scale aggressively. Both high → moat or downfall.

Board lens: A premium brand is simply a company whose value drivers are strong enough that customers stop negotiating.`,
      },
      {
        id: 'framework-3-2b',
        title: '"Better product" is rarely the answer',
        description: 'The market doesn\'t reward "better"—it rewards difference that is hard to copy.',
        content: `If your differentiation is mostly in materials or features, expect imitation. If it's in workflow, process, relationships, or trust infrastructure, it's durable.

The uncomfortable truth: You can lose while being objectively better—if your "better" is copyable and your rivals have distribution.`,
      },
      {
        id: 'framework-3-3',
        title: 'Strategic vs Commodity (The True Sort)',
        description: 'Porter: strategy is not a list of strengths—it\'s a system of reinforcing choices.',
        content: `COMMODITY — Customers don't pay more. Replication in < 12–18 months. Improvements don't change WTP. Table stakes.

STRATEGIC — Customers pay more (directly or indirectly). Replication requires time + system change, not just money. Creates preference, not just satisfaction. Strengthens other activities (locks the system).`,
      },
      {
        id: 'framework-3-4',
        title: 'The Christensen Counterpoint',
        description: 'Your value chain advantage can be destroyed by a shift in what the market values.',
        content: `Christensen's warning: Don't build moats around yesterday's basis of competition. A value chain can be "perfect"… for the wrong game.

BASIS-OF-COMPETITION SHIFT TEST
If the market begins to prefer: simpler, cheaper, more convenient, "good enough" performance — then a disruptor can enter from below and win without matching your excellence.

Your job: Locate the activity where you win today—and identify the "kill point" where disruption could make that activity irrelevant.`,
      },
      {
        id: 'framework-3-5',
        title: 'The Value Chain Kill Point',
        description: 'The single activity that collapses the whole chain. Your job: identify it—then fortify it, diversify it, or replace it.',
        content: `In most businesses, one activity—if disrupted—destroys the value chain:

• A channel dependency (algorithm change, platform ban)
• A single supplier or manufacturing capability
• A trust bottleneck (reviews, authority, compliance)
• A talent constraint (one irreplaceable operator)
• A conversion step (trial, onboarding, proof)

Examples: premium retail experience → killed by convenience. High-touch onboarding → killed by self-serve. Extreme performance → killed by "good enough." Bespoke → killed by modular.

Your job: Identify it. Then either fortify it, diversify it, or replace it with a stronger mechanism.`,
      },
      {
        id: 'framework-3-6',
        title: 'Christensen: your value chain can become your prison',
        description: 'Good management kills you when the basis of competition shifts.',
        content: `Your processes + values create your current advantage—and also your disability. This module doesn't just map today. It asks:

• Which activities create advantage NOW
• Which activities will become COMMODITIES LATER
• Which activities will PREVENT you from adopting a disruptive path when the market shifts`,
      },
    ],
    worksheets: [
      {
        id: 'worksheet-3-1',
        title: 'Activity Breakdown Table',
        description: 'List every meaningful activity involved in delivering value. Use specific verb phrases—e.g. "Produce 3 weekly founder-led videos demonstrating product use cases" not "Marketing"; "Same-day resolution protocol for high-LTV customers" not "Customer service." If an activity is both high cost and commodity, it is a liability.',
        fields: [
          { id: 'activity-1', label: 'Activity 1 (specific verb phrase)', type: 'textarea', required: true, placeholder: 'e.g. Pre-ship QA checklist + measurement verification to reduce returns' },
          { id: 'cost-driver-1', label: 'Activity 1 — Cost driver (why it costs)', type: 'textarea', required: true },
          { id: 'value-driver-1', label: 'Activity 1 — Value driver (why it matters)', type: 'textarea', required: true },
          { id: 'strategic-or-commodity-1', label: 'Activity 1 — Strategic or Commodity', type: 'select', required: true, options: ['Strategic', 'Commodity'] },
          { id: 'activity-2', label: 'Activity 2 (specific verb phrase)', type: 'textarea', required: true },
          { id: 'cost-driver-2', label: 'Activity 2 — Cost driver', type: 'textarea', required: true },
          { id: 'value-driver-2', label: 'Activity 2 — Value driver', type: 'textarea', required: true },
          { id: 'strategic-or-commodity-2', label: 'Activity 2 — Strategic or Commodity', type: 'select', required: true, options: ['Strategic', 'Commodity'] },
          { id: 'activity-3', label: 'Activity 3 (specific verb phrase)', type: 'textarea', required: false },
          { id: 'cost-driver-3', label: 'Activity 3 — Cost driver', type: 'textarea', required: false },
          { id: 'value-driver-3', label: 'Activity 3 — Value driver', type: 'textarea', required: false },
          { id: 'strategic-or-commodity-3', label: 'Activity 3 — Strategic or Commodity', type: 'select', required: false, options: ['Strategic', 'Commodity'] },
        ],
        rules: ['If an activity is both high cost and commodity, it is a liability. Name activities at granular resolution—you must be able to defend each in a boardroom.'],
      },
      {
        id: 'worksheet-3-2',
        title: 'Differentiation Misalignment Audit',
        description: 'You invest heavily in something customers don\'t value enough to pay for. Rate activities: Cost intensity (L/M/H), WTP impact (L/M/H), Copyability (Easy/Moderate/Hard). Red flags: High cost + Low WTP = vanity work. High WTP + Easy copy = temporary edge. Hard to copy + Medium WTP = hidden moat. High WTP + Hard copy + Reinforces = crown jewel. Output: Stop / Fix / Double down.',
        fields: [
          { id: 'obsess-customers-barely-mention', label: 'What do we obsess over that customers barely mention?', type: 'textarea', required: false },
          { id: 'customers-rave-we-underinvest', label: 'What do customers rave about that we underinvest in?', type: 'textarea', required: false },
          { id: 'overbuilding', label: 'Where are we "overbuilding"?', type: 'textarea', required: false },
          { id: 'under-signaling', label: 'Where are we "under-signaling"?', type: 'textarea', required: false },
          { id: 'impressive-internally-no-wtp', label: 'What activity looks impressive internally but doesn\'t raise WTP?', type: 'textarea', required: false },
          { id: 'stop-fix-double-down', label: 'Stop / Fix / Double down (short list)', type: 'textarea', required: false, placeholder: 'List what to stop, what to fix, what to double down on.' },
        ],
      },
      {
        id: 'worksheet-3-3',
        title: 'Value Chain Kill Point',
        description: 'The single activity where your cost structure concentrates and a market shift could make it less valuable. Name it before it kills you.',
        fields: [
          { id: 'kill-point-activity', label: 'Kill point (the activity at risk)', type: 'textarea', required: true, placeholder: 'e.g. Premium retail experience; high-touch onboarding' },
          { id: 'kill-point-shift', label: 'What shift would make this activity less valuable?', type: 'textarea', required: true, placeholder: 'e.g. Convenience-driven buying; self-serve tooling' },
        ],
      },
    ],
    coldCall: {
      question: 'Your competitor matches your product quality within 6 months. Where does your advantage live after that—and what activity system makes copying you painful?',
      timeLimit: 90,
      semanticCriteria: { noHedging: true, minLength: 20 },
      penalty: 5,
    },
    redTeam: {
      question: 'If this market commoditizes, what becomes your most expensive useless activity? What would you remove first to survive? What would you protect at all costs?',
      checks: [],
    },
    boardLens: 'This is where "good operators" become "strategic executives." Elite strategy does Porter and Christensen at once: build advantage in activities, and name where that advantage gets invalidated.',
    requiredOutputs: [
      { id: 'value-chain', label: 'A fully mapped value chain (board-ready: 10–30 activities, strategic vs commodity, cost + value drivers; show where margin is created, where destroyed, where the moat lives)', type: 'text', placeholder: 'Map: where margin is created (value drivers), where destroyed (liabilities), where the moat lives (hard-to-copy activities).' },
      { id: 'strategic-activity', label: 'At least one strategic activity — mini memo: Activity, Why it creates WTP, Why competitors can\'t copy quickly, What it depends on, How you\'ll protect it, How you\'ll scale it without breaking it. Elite rule: If you can\'t describe how to scale the activity, it isn\'t strategic—it\'s artisanal.', type: 'text', placeholder: 'Activity / Why WTP / Why can\'t copy / Depends on / How protect / How scale without breaking.' },
      { id: 'kill-point', label: 'The value chain kill point (activity where cost concentrates and a market shift could make it less valuable)', type: 'text', placeholder: 'Name the kill point and the shift that would make it irrelevant.' },
    ],
    professorNotes: {
      whatStudentsGetWrong: 'List activities without naming cost or value drivers. Call everything "strategic." Confuse product features with activity-level advantage. Ignore the basis-of-competition shift—optimize for yesterday\'s game.',
      whatAplusSmellsLike: 'One strategic activity stated in replication terms (time, system change). One choke point where margin or leverage accumulates. One kill point named—where cost concentrates and a shift could invalidate it. Clear strategic vs commodity split.',
      theTrap: 'The trap is pointing to "product quality" or "our team" as the activity. Advantage lives in specific activities. And: building a perfect value chain for the wrong basis of competition (Christensen).',
    },
    sampleAnswers: {
      strong: {
        text: 'Our advantage does not come from the product alone. It comes from (1) proprietary data ingestion and normalization—which increases WTP by certainty and reduced integration risk—reinforced by (2) same-day resolution protocol for high-LTV customers, and protected by (3) 12+ months and credibility to replicate. The strategic activity is the integration layer; competitors would need time, process, and trust. The kill point is high-touch onboarding—if the market shifts to self-serve and "good enough," that activity becomes our most expensive liability.',
        why: 'Board-ready narrative. One strategic activity with value driver and defensibility. One kill point named. Activity-level specificity.',
      },
      weak: {
        text: 'We have a great product and our team executes better. Our value chain is product development, marketing, and sales.',
        whyFails: 'No activity-level diagnosis. "Great product" and "team" are not activities. Generic categories. No kill point. No replication logic.',
      },
    },
    legitimacyLens: {
      whoCouldAttack: 'If one activity is commoditized (e.g. outsourced), who captures the margin?',
      whatLooksExploitative: 'Which activity, if exposed, would make the model look extractive?',
      implicitPromise: 'Where does the value chain assume a stable basis of competition—and what if it shifts?',
    },
    readingSpine: {
      primaryReading: { title: 'Competitive Advantage (Porter)', description: 'Value chain, activity-level advantage.' },
      counterpointReading: { title: "The Innovator's Dilemma (Christensen)", description: 'How advantage gets invalidated when the basis of competition shifts.' },
      operatorArtifact: { title: 'Value Chain Kill Point', description: 'One page: where you win today, where disruption could make an activity irrelevant.' },
    },
    readingCompanion: {
      essentials: {
        canon: { title: 'Competitive Advantage', author: 'Michael Porter', coreIdea: 'Advantage is built in activities, not claims. "Differentiation" must be expressed as an activity system. Competitors can copy features; copying systems is slower + harder. You must choose what not to do, or you become average everywhere.', whyMatters: 'Most advantages live inside boring activities. If you can\'t point to a specific choke point, you don\'t have an advantage.' },
        counterpoint: { title: "The Innovator's Dilemma", author: 'Clayton Christensen', coreIdea: 'Disruption changes the basis of competition. Incumbents often "do everything right" and still lose. When performance overshoots what customers need, the market shifts to convenience/price.', whyMatters: 'Value chain strength can become rigidity when the job changes. Don\'t build moats around yesterday\'s game.' },
        operatorArtifact: { title: 'Value Chain Kill Point', description: 'The single activity where cost concentrates and a market shift could make it less valuable. Name it before it kills you.' },
      },
      keyIdeas: ['Advantage lives in specific activities, not products.', 'Porter tells you how to build advantage; Christensen tells you how advantage gets invalidated. Elite strategy does both.', 'If you can\'t name the choke point, you don\'t have an advantage.', 'High cost + commodity = liability. Value strong + cost low = scale it. Both high = moat or downfall.', 'Name the kill point before it kills you.'],
      listenScript: 'Most advantages live inside boring activities. If you can\'t point to a specific choke point, you don\'t have an advantage. And: don\'t build a perfect value chain for the wrong game.',
      applyPrompt: 'What activity do you currently treat as strategic that could become a kill point if the basis of competition shifts? (One paragraph; name the activity and the shift.)',
      booksList: [
        { id: 'm3-canon', title: 'Competitive Advantage', author: 'Michael Porter', type: 'canon' },
        { id: 'm3-counterpoint', title: "The Innovator's Dilemma", author: 'Clayton Christensen', type: 'counterpoint' },
        { id: 'm3-artifact', title: 'Value Chain Kill Point', type: 'artifact' },
      ],
    } as ReadingCompanion,
    synthesisDisciplines: ['economics', 'psychology', 'design', 'sociology', 'systems engineering'],
    order: 3,
  },
  {
    id: 'module-4',
    pillar: 'pillar-1',
    title: 'Positioning Through Exclusion',
    thesis: 'If too many people can say "this is for me," then no one believes it truly is.',
    whyExists: {
      academic: 'Positioning isn\'t just market structure—it\'s identity formation. People buy what they can become. (Yale / Brown lens.)',
      operator: 'Founders try to be "premium but accessible." That usually means: vague target, softened edges, diluted meaning, weak conversion, endless objections about price. Elite positioning is a constraint system. It reduces choice.',
    },
    frameworks: [
      {
        id: 'framework-4-1',
        title: 'Advanced STP (the elite version)',
        description: 'Most people stop at segmentation. That\'s amateur hour.',
        content: `Segmentation — Amateur: "Who could buy this?" Elite: "Who already values what we stand for?"

Targeting — Amateur: "Who should we target?" Elite: "Who becomes more loyal as price rises?"

Positioning — Amateur: "How are we better?" Elite: "Why are we the only acceptable option?"`,
      },
      {
        id: 'framework-4-2',
        title: 'The Two Maps: White Space vs Dead Space',
        description: 'Module 4 forces you to prove which is which before you build your entire brand around a fantasy.',
        content: `WHITE SPACE — An empty area of the market that customers want—but no one owns credibly. Signal: strong pull + weak alternatives.

DEAD SPACE — An empty area because it's structurally unattractive or incoherent. Signal: no pull, low WTP, high churn, impossible economics.

Elite twist: You must explain why the space is empty—not just that it is.`,
      },
      {
        id: 'framework-4-3',
        title: 'Ladders and the first slot in the mind',
        description: 'Classic positioning: people rank brands in mental ladders. The top rung is sticky.',
        content: `If you can't be #1 on an existing ladder, create a new ladder you can own: not "best activewear" but "best activewear for ___" where the blank is a real identity / use-case / philosophy.

Key move: Stop attacking the leader head-on. Own a dimension they can't credibly claim.`,
      },
      {
        id: 'framework-4-4',
        title: 'Positioning is context, not slogans',
        description: 'Obviously Awesome: positioning is the frame of reference that makes your value obvious.',
        content: `People use cues (price, design, customers, partners, language) to decide: "What is this and is it for me?"

Your job: pick the context, control the comparison set, make the alternative look irrational.`,
      },
      {
        id: 'framework-4-5',
        title: 'The 5+1 components (Dunford-style)',
        description: 'Clean and implementable. Elite rule: If you can\'t name the alternatives, you can\'t position.',
        content: `1. Competitive alternatives (what they do without you)
2. Unique attributes (what you can do that alternatives can't)
3. Value clusters (benefits that matter, grouped)
4. Ideal customer (who cares most)
5. Market category (the "frame" you want)
+ Optional: Why now (trend)

If you can't name the alternatives, you're just describing yourself.`,
      },
      {
        id: 'framework-4-6',
        title: 'Exclusion is not negativity—it\'s credibility',
        description: 'The anti-customer is the person who might buy but makes your brand worse if you serve them.',
        content: `If you cannot name an anti-customer, your positioning is vague.

Danger is not "they don't like us." Danger is: they force price concessions, demand features you shouldn't build, increase churn/returns, dilute your identity, attract more of the wrong customers.`,
      },
    ],
    worksheets: [
      {
        id: 'worksheet-4-1',
        title: 'Anti-Customer Declaration',
        description: 'Rule: If you cannot name an anti-customer, your positioning is vague. Danger = they force price concessions, demand wrong features, increase churn/returns, dilute identity, attract wrong customers—not just "they don\'t like us."',
        fields: [
          { id: 'anti-customer-type', label: 'Anti-Customer Type', type: 'text', required: true },
          { id: 'why-tempting', label: 'Why They\'re Tempting', type: 'textarea', required: true },
          { id: 'why-dangerous', label: 'Why They\'re Dangerous', type: 'textarea', required: true, placeholder: 'Price concessions, wrong features, churn, dilute identity, attract wrong customers' },
          { id: 'how-exclude', label: 'How You Will Exclude Them', type: 'textarea', required: true, placeholder: 'Pricing, channel, messaging, product constraints, qualification, trade-offs. Must be real, not a vibe.' },
        ],
        rules: ['If you cannot name an anti-customer, your positioning is vague. The exclusion mechanism must be real, not a vibe.'],
      },
      {
        id: 'worksheet-4-2',
        title: 'Competitive Positioning Map',
        description: 'Choose two industry variables that actually drive decisions (e.g. Status ↔ Convenience, Performance ↔ Aesthetic, Luxury experience ↔ Price efficiency). Plot your brand + 4 competitors. Identify white space and dead space. You must explain why the space is empty—not just that it is.',
        fields: [
          { id: 'axis-1', label: 'Axis 1 (e.g. Status ↔ Convenience)', type: 'text', required: false },
          { id: 'axis-2', label: 'Axis 2 (e.g. Performance ↔ Aesthetic)', type: 'text', required: false },
          { id: 'position-map', label: 'Where you sit vs 4 competitors; white space and dead space', type: 'textarea', required: false, placeholder: 'Plot: your brand, 4 competitors. Identify white space and dead space. Why is each space empty?' },
        ],
      },
    ],
    coldCall: {
      question: 'Who should never buy this—even if they want to—and what will you do to keep them out?',
      timeLimit: 90,
      semanticCriteria: { noHedging: true, minLength: 20 },
      penalty: 5,
    },
    boardLens: 'If sales can\'t identify the target in 10 seconds, it\'s not a target. It\'s a hope. Elite positioning is a constraint system—it reduces choice.',
    requiredOutputs: [
      { id: 'target-customer', label: 'A defined target customer (board-ready: who they are, what they believe, what they refuse, what they pay for, what success feels like, what alternatives they use)', type: 'text', placeholder: 'Who / what they believe / what they refuse / what they pay for / what success feels like / what alternatives they use. If sales can\'t identify them in 10 seconds, it\'s not a target.' },
      { id: 'anti-customer', label: 'At least one anti-customer + exclusion mechanism (pricing, channel, messaging, product constraints, qualification, trade-offs). Elite rule: exclusion mechanism must be real, not a vibe.', type: 'text', placeholder: 'Anti-customer type + how you exclude them (real lever, not vibe).' },
    ],
    professorNotes: {
      whatStudentsGetWrong: 'Try to be "premium but accessible." Widen positioning to chase growth. Cannot name an anti-customer. Soften edges to avoid alienation. Describe themselves instead of naming alternatives.',
      whatAplusSmellsLike: 'One anti-customer named. One exclusion statement with a real mechanism. Target customer identifiable in 10 seconds. Positioning that repels someone.',
      theTrap: 'The trap is answering "who is this for?" with "everyone who cares about quality." If too many people can say "this is for me," no one believes it.',
    },
    sampleAnswers: {
      strong: {
        text: 'We are for operators who already pay for reliability and will tolerate a higher price for zero surprise. We are not for price-shoppers or first-time buyers—even if it costs growth. Our anti-customer is the buyer who needs hand-holding; we exclude them via self-serve only and qualification at signup. Target: someone who can identify themselves in 10 seconds—revenue ops lead, 50+ employees, already uses a direct competitor or spreadsheet; they refuse to tolerate surprise; they pay for certainty; success feels like "I never think about this."',
        why: 'Target defined (identifiable in 10 sec), anti-customer named, exclusion mechanism real (self-serve + qualification). Positioning that repels.',
      },
      weak: {
        text: 'We are for everyone who wants quality. We are premium but accessible. Our customers love us.',
        whyFails: 'No anti-customer, no exclusion. "Premium but accessible" and "everyone who wants quality" are not positioning. No alternatives named.',
      },
    },
    legitimacyLens: {
      whoCouldAttack: 'Who could credibly claim we are excluding the wrong people?',
      whatLooksExploitative: 'What would make our exclusion look arbitrary or discriminatory?',
      implicitPromise: 'What promise are we making by who we exclude?',
    },
    readingSpine: {
      primaryReading: { title: 'Positioning (Ries & Trout)', description: 'Ladders, firstness, category creation, line-extension risk.' },
      counterpointReading: { title: 'Obviously Awesome (Dunford)', description: '5+1 components, competitive alternatives, value clusters, market frame.' },
      operatorArtifact: { title: 'Exclusion Statement', description: '"We are not for ___, even if it costs growth." + real mechanism.' },
    },
    readingCompanion: {
      essentials: {
        canon: { title: 'Positioning', author: 'Al Ries & Jack Trout', coreIdea: 'Positioning is what you own in the mind of the customer. People rank brands in mental ladders; the top rung is sticky. Clarity requires exclusion. If you can\'t be #1 on a ladder, create a new one you can own.', whyMatters: 'If your positioning doesn\'t repel anyone, it isn\'t positioning.' },
        counterpoint: { title: 'Obviously Awesome', author: 'April Dunford', coreIdea: 'Positioning is context, not slogans. The 5+1: competitive alternatives, unique attributes, value clusters, ideal customer, market category, optional trend. If you can\'t name the alternatives, you can\'t position—you\'re just describing yourself.', whyMatters: 'Modern positioning is a repeatable process; pick the context, control the comparison set.' },
        operatorArtifact: { title: 'Exclusion Statement', description: '"We are not for ___, even if it costs growth." Exclusion mechanism must be real: pricing, channel, messaging, product constraints, qualification, trade-offs.' },
      },
      keyIdeas: ['Positioning that doesn\'t repel anyone isn\'t positioning.', 'Exclusion is the test of clarity—and it\'s credibility, not negativity.', 'Context (category, who, why) beats taglines.', 'If you can\'t name the alternatives, you can\'t position.', 'White space = pull + weak alternatives. Dead space = no pull, bad economics. Prove which is which.'],
      listenScript: 'If your positioning doesn\'t repel anyone, it isn\'t positioning. Elite positioning is a constraint system—it reduces choice.',
      applyPrompt: 'Who should never buy this—even if they want to—and what will you do to keep them out? (Name the anti-customer and the real exclusion mechanism.)',
      booksList: [
        { id: 'm4-canon', title: 'Positioning', author: 'Al Ries & Jack Trout', type: 'canon' },
        { id: 'm4-counterpoint', title: 'Obviously Awesome', author: 'April Dunford', type: 'counterpoint' },
        { id: 'm4-artifact', title: 'Exclusion Statement', type: 'artifact' },
      ],
    } as ReadingCompanion,
    synthesisDisciplines: ['economics', 'psychology', 'design', 'sociology', 'systems engineering'],
    order: 4,
  },
  {
    id: 'module-5',
    pillar: 'pillar-1',
    title: 'Value Capture & Pricing Power',
    thesis: 'Pricing isn\'t "what should we charge?" It is: what value do we create, for whom, compared to what alternative, and how do we capture it—without collapsing trust or margin?',
    whyExists: {
      academic: 'Pricing is where strategy meets psychology. It is the translation layer between value creation (what the product actually does) and value capture (what the business gets paid).',
      operator: 'Most companies fail at pricing for 3 reasons: (1) Cost-plus delusion—"we\'ll add a margin and be fine." (2) Customer-said-so delusion—customers understate value, especially for innovation. (3) Competition-led pricing—price wars feel aggressive but often destroy profit. This module makes pricing a discipline—not a reaction.',
    },
    frameworks: [
      {
        id: 'framework-5-1',
        title: 'Economic Value ≠ Use Value',
        description: 'Use value = how good it feels. Economic value = price of best alternative (reference value) + markup for what makes you better (differential value).',
        content: `Formula (operational):
Price Ceiling ≈ Reference Value + Differential Value (as perceived)
Price Floor ≈ Reference Value (or your minimum viable price if you can credibly justify why the alternative isn't comparable)

Use value can be $10; economic value is anchored by the $1.99 grocery-store alternative. The "beach lemonade" example: same product, different reference.`,
      },
      {
        id: 'framework-5-2',
        title: 'Value-Based vs Proactive vs Profit-Based Pricing',
        description: 'The triad—make it actionable.',
        content: `VALUE-BASED — Prices change when perceived value changes (feature parity, new entrant, new benchmark).

PROACTIVE — Anticipate value shifts and defend margin with non-price levers: loyalty mechanics, bundling, versioning, add-ons, new metric (how you charge).

PROFIT-BASED — Optimizes profit, not volume. Fewer models, clearer offer, higher profitability (Ford ethos).`,
      },
      {
        id: 'framework-5-3',
        title: 'Segmentation by Willingness-to-Pay (WTP), not demographics',
        description: 'Demographics are weak predictors. WTP segmentation maps to value intensity.',
        content: `The airline logic: same plane, segmented with seat class, flexibility (refundability), baggage, priority, perks.

Your takeaway: Pricing architecture is the product.`,
      },
      {
        id: 'framework-5-4',
        title: 'Behavioral pricing isn\'t "tricks"—it\'s framing',
        description: 'Customers evaluate price relative to anchors and context.',
        content: `• Anchoring (high option makes others look reasonable)
• Compromise effect (middle option wins)
• Relative discounting (5 dollars matters more at $15 than $125)
• "Free" bundling beats small discounts
• Price signals quality (especially in luxury)`,
      },
      {
        id: 'framework-5-5',
        title: 'Price Before You Build (Monetizing Innovation)',
        description: 'The spine of Module 5. Design around price, not after.',
        content: `Most new products fail because companies: design → build → launch → then "figure out pricing" — which causes feature shock, minivation, undead, or missed hidden gems.

Instead:
1. Have the willingness-to-pay talk early
2. Identify "leaders, fillers, killers"
3. Build Good/Better/Best based on WTP pockets
4. Choose a monetization model before development
5. Maintain price integrity post-launch (avoid knee-jerk discounting)`,
      },
    ],
    worksheets: [
      {
        id: 'worksheet-5-1',
        title: 'Pricing Fallacy Check',
        description: 'Pick the one you\'re currently doing (most companies do at least one). If any are true: you have a monetization risk.',
        fields: [
          {
            id: 'pricing-fallacy',
            label: 'Which fallacy applies?',
            type: 'checkbox-group',
            required: false,
            options: [
              'Cost-plus is running the business',
              'Competition is running the business',
              'Sales discounts are running the business',
              'Customer requests are running the roadmap',
              'We don\'t know WTP but we\'re building anyway',
            ],
            placeholder: 'Check any that apply.',
          },
        ],
      },
      {
        id: 'worksheet-5-2',
        title: 'Identify the Reference Alternative',
        description: 'If you can\'t name the alternative, you can\'t price. Mandatory diagnostic.',
        fields: [
          { id: 'best-alternative', label: 'Best alternative customers use today if you don\'t exist (competitor / DIY / assistant / "do nothing")', type: 'textarea', required: true, placeholder: 'What do they use today?' },
          { id: 'alternative-cost', label: 'What does that alternative cost them? (money + time + risk + hassle)', type: 'textarea', required: true },
        ],
        rules: ['If you can\'t name the alternative, you can\'t price.'],
      },
      {
        id: 'worksheet-5-3',
        title: 'Feature Audit: Leaders / Fillers / Killers / Hidden Gems',
        description: 'Monetizing Innovation taxonomy. Leaders = drive purchase (high WTP). Fillers = nice-to-have. Killers = >20% actively dislike paying, or they confuse/overwhelm. Hidden gems = customers would pay more but you\'re giving it away. This forces discipline in what you include and how you bundle.',
        fields: [
          { id: 'leaders', label: 'Leaders (drive purchase, high WTP)', type: 'textarea', required: false, placeholder: 'Features that drive purchase' },
          { id: 'fillers', label: 'Fillers (nice-to-have)', type: 'textarea', required: false },
          { id: 'killers', label: 'Killers (>20% dislike paying, or confuse/overwhelm)', type: 'textarea', required: false },
          { id: 'hidden-gems', label: 'Hidden gems (customers would pay more; you\'re giving away)', type: 'textarea', required: false, placeholder: 'Don\'t put these in your entry tier.' },
        ],
      },
      {
        id: 'worksheet-5-4',
        title: 'Value Wedge (Reference + Differential)',
        description: 'Expand the value wedge: reference value (best alternative) + differential value (what makes you better). Your job is to expand the wedge—not just lower cost.',
        fields: [
          { id: 'reference-value', label: 'Reference value (price/cost of best alternative)', type: 'textarea', required: true },
          { id: 'differential-value', label: 'Differential value (what makes you better—perceived)', type: 'textarea', required: true },
          { id: 'functional-value', label: 'Functional value (outcomes)', type: 'textarea', required: false },
          { id: 'emotional-value', label: 'Emotional value (relief, status)', type: 'textarea', required: false },
          { id: 'risk-reduction', label: 'Risk reduction', type: 'textarea', required: false },
        ],
      },
    ],
    coldCall: {
      question: 'What\'s the reference alternative, what\'s your differential value worth, and what would you remove from the product if you had to hit a target price profitably?',
      timeLimit: 90,
      semanticCriteria: { noHedging: true, minLength: 20 },
      penalty: 5,
    },
    boardLens: 'Value creation without value capture is charity. If you can\'t defend your target price in 2–3 sentences, you don\'t own it. Three non-pricing actions before any price decrease.',
    requiredOutputs: [
      { id: 'price-window', label: 'Your price window + why (floor = reference or min entry; ceiling = reference + differential; target = where you land and why; defensibility = how you justify without sounding defensive). Rule: if you can\'t defend target in 2–3 sentences, you don\'t own it.', type: 'text', placeholder: 'Floor / Ceiling / Target / Defensibility.' },
      { id: 'offer-architecture', label: 'Segmented offer architecture (Good / Better / Best): 2–4 packages, who each is for (WTP segment), what each includes, what each deliberately excludes. Rule: entry tier must not give away your hidden gem.', type: 'text', placeholder: '2–4 packages; who, what included, what excluded.' },
      { id: 'monetization-model', label: 'Monetization model selection (subscription / pay-as-you-go / dynamic / market-based / freemium / land+expand). Justify: why customers will accept it, how it scales, how competitors will respond, implementation complexity.', type: 'text', placeholder: 'One primary model + justification.' },
      { id: 'pricing-policy', label: 'Pricing policy (integrity + guardrails): discounts (max, who approves, when), price floors, price increases (cadence + triggers), reaction plan when sales miss plan (3 non-price actions first). Rule: three non-pricing actions before any price decrease.', type: 'text', placeholder: 'Discount rules, floors, increases, reaction plan.' },
    ],
    professorNotes: {
      whatStudentsGetWrong: 'Cost-plus, competition-led, or customer-request-led pricing. Confuse use value with economic value. Segment by demographics instead of WTP. Build first, price later. Knee-jerk discounting when sales miss.',
      whatAplusSmellsLike: 'Reference alternative named. Price window (floor/ceiling/target) with defensibility. Good/Better/Best based on WTP. One monetization model justified. Pricing policy with discount guardrails and "three non-price actions first."',
      theTrap: 'The trap is "we will charge more when we have more features." Pricing power lives in economic value (reference + differential)—not in feature lists. And: design around price, not after.',
    },
    sampleAnswers: {
      strong: {
        text: 'Reference alternative: spreadsheets + manual process; cost to customer ~$40/hr. Our differential value is certainty and no surprise (reduces risk). Floor: $X (min entry). Ceiling: reference + 30% for differential. Target: mid-tier subscription; we defend it with outcome guarantees and tiering by usage. Good/Better/Best: Good = core use case only (no hidden gem); Better = + support + SLA; Best = + custom. We chose subscription; customers accept it because it aligns with ongoing value; we scale by usage tiers; we have discount guardrails and three non-price actions before any decrease.',
        why: 'Reference named, price window with defensibility, offer architecture that doesn\'t give away hidden gem, model justified, policy with integrity rule.',
      },
      weak: {
        text: 'We have great value and we will price competitively. We will raise prices when we add more features.',
        whyFails: 'No reference alternative, no price window, no WTP segmentation. "Competitively" and "when we add features" are not strategy.',
      },
    },
    legitimacyLens: {
      whoCouldAttack: 'Who could credibly undercut our value wedge (e.g. same job, lower price)?',
      whatLooksExploitative: 'What would make our pricing look extractive (e.g. lock-in, hidden fees)?',
      implicitPromise: 'What promise are we making with this price (e.g. support, reliability)?',
    },
    readingSpine: {
      primaryReading: { title: 'The Strategy and Tactics of Pricing (Nagle et al.)', description: 'Economic value, segmentation, psychology, policy.' },
      counterpointReading: { title: 'Monetizing Innovation (Ramanujam)', description: 'Price-before-build, failure modes, WTP, configuration, integrity.' },
      operatorArtifact: { title: 'Price Window + WTP Ladder', description: 'Floor/ceiling/target; acceptable → painful → no-brainer.' },
    },
    readingCompanion: {
      essentials: {
        canon: { title: 'The Strategy and Tactics of Pricing', author: 'Thomas Nagle et al.', coreIdea: 'Pricing is a strategic lever, not cost-plus. Economic value = reference value + differential value. Segmentation by WTP beats demographics. Behavioral pricing is framing—anchors, compromise, relative discounting.', whyMatters: 'Value creation without value capture is charity.' },
        counterpoint: { title: 'Monetizing Innovation', author: 'Madhavan Ramanujam', coreIdea: 'Price before you build. Willingness-to-pay should drive product. Failure modes: feature shock, minivation, undead, missed hidden gems. Leaders/Fillers/Killers taxonomy. Have the WTP talk early; choose monetization model before development; maintain price integrity.', whyMatters: 'Building first and pricing later leaves money on the table or kills products.' },
        operatorArtifact: { title: 'Price Window + Pricing Policy', description: 'Floor/ceiling/target + defensibility. Discount guardrails. Three non-pricing actions before any price decrease.' },
      },
      keyIdeas: ['Economic value ≠ use value. Reference + differential = price ceiling.', 'Price before you build. Design around price, not after.', 'Leaders/Fillers/Killers/Hidden Gems—don\'t give away the hidden gem in entry tier.', 'Segmentation by WTP, not demographics. Pricing architecture is the product.', 'Behavioral pricing: anchors, compromise, relative discounting. "Free" bundling beats small discounts.', 'Price metric beats price point. Integrity rules + discount governance. Three non-price actions before any decrease.'],
      listenScript: 'Value creation without value capture is charity. If you can\'t name the reference alternative, you can\'t price. Three non-pricing actions before any price decrease.',
      applyPrompt: 'What\'s your reference alternative, what\'s your differential value worth, and what would you remove from the product if you had to hit a target price profitably?',
      booksList: [
        { id: 'm5-canon', title: 'The Strategy and Tactics of Pricing', author: 'Thomas Nagle et al.', type: 'canon' },
        { id: 'm5-counterpoint', title: 'Monetizing Innovation', author: 'Madhavan Ramanujam', type: 'counterpoint' },
        { id: 'm5-artifact', title: 'Price Window + Pricing Policy', type: 'artifact' },
      ],
    } as ReadingCompanion,
    synthesisDisciplines: ['economics', 'psychology', 'design', 'sociology', 'systems engineering'],
    order: 5,
  },
  {
    id: 'module-6',
    pillar: 'pillar-1',
    title: 'Unit Economics & Defensibility',
    thesis: 'Proving Strategy With Numbers. If your unit economics are weak, no amount of branding, growth, or narrative will save you. Objective: know when to scale — and when to stop.',
    whyExists: {
      academic: 'Wharton Finance × HBS General Manager Lens (Measuring and Managing Performance, Robert D. Austin).',
      operator: 'Most operators look at revenue, not contribution. They confuse gross margin with health. They scale before knowing when to stop.',
    },
    frameworks: [
      {
        id: 'framework-6-1',
        title: 'Core Definitions (Non-Negotiable)',
        description: 'CM, LTV, CAC, Payback, Strategic Health Ratio. Variable costs scale per customer/order; CM% = CM / Price.',
        content: `CONTRIBUTION MARGIN — CM = Price − Variable Costs. Variable = COGS, shipping, payment processing, support per customer, refunds. CM% = CM / Price.

LTV (by model):
• Subscription: LTV ≈ (ARPA × GM%) / Monthly Churn (if churn stable).
• Ecom/repeat: LTV = (AOV × GM%) × Purchases per customer over horizon (6/12/24 mo); use ranges (low/base/high).
• Service: LTV = Avg package revenue × GM% × expected repeats.

CAC = Total acquisition spend / New customers. Include ads, agency/creative, sales comp, promo. Define once; be consistent.

PAYBACK (months) = CAC / (monthly gross margin per customer). For ecom: # orders to recover CAC.

STRATEGIC HEALTH = LTV / CAC. Misleading unless paired with payback + retention reality.`,
      },
      {
        id: 'framework-6-2',
        title: 'Lean Analytics Translation + OMTM',
        description: 'Data-informed, not data-driven. Good metrics are ratios. Module 6\'s One Metric That Matters: Payback period.',
        content: `• Data is the antidote to self-delusion.
• Be data-informed, not data-driven (don't optimize one metric at the expense of the business).
• Good metrics are ratios (comparable + understandable).
• One metric above all others changes by stage.

Module 6 OMTM: Payback period — because it tells you if growth kills you or compounds you.`,
      },
      {
        id: 'framework-6-3',
        title: 'The Unit Economics Stack (Memorize It)',
        description: 'Every serious operator knows these by memory.',
        content: `1. Price − Variable costs = Contribution margin
2. Contribution margin × Retention = LTV
3. LTV / CAC = Strategic health ratio
4. Add Payback to avoid ratio delusion
5. Stress-test with sensitivity (what breaks first)`,
      },
      {
        id: 'framework-6-4',
        title: 'Defensibility Overlay (Numbers + Mechanism)',
        description: 'Unit economics are often proof of moat. Board-level line.',
        content: `Defensibility shows up numerically as:
• CAC advantage (distribution moat, brand search, referrals, partnerships)
• Retention advantage (switching costs, habit, workflow embedding, community)
• Margin advantage (unique supply chain, IP, proprietary process, fewer refunds)
• Payback speed (faster reinvestment → compounding growth)

Board line: "We're defensible because we acquire at X CAC due to Y mechanism, retain at Z due to W mechanism, producing payback in N weeks, letting us reinvest faster than competitors."`,
      },
    ],
    worksheets: [
      {
        id: 'worksheet-6-1',
        title: 'LTV:CAC Model (Stress-Test)',
        description: 'Inputs required; outputs auto-calc: CM ($ and %), LTV (low/base/high), LTV:CAC, Payback. Stress tests: CAC +30%, Churn +30%, Variable +10%, Price −10%, Refunds +X (ecom). Interpretation: If payback > cash runway tolerance, growth is dangerous; if LTV:CAC looks good but payback long → you may die before you\'re "right"; if hypersensitive to one input → that input is strategy priority.',
        fields: [
          { id: 'price', label: 'Price (or ARPA)', type: 'number', required: true },
          { id: 'variable-costs', label: 'Variable costs per customer (total)', type: 'number', required: true },
          { id: 'variable-cost-breakdown', label: 'Variable cost breakdown (COGS, shipping, fees, support, returns)', type: 'textarea', required: false, placeholder: 'Itemize; ensures nothing missed.' },
          { id: 'gross-margin-pct', label: 'Gross margin %', type: 'number', required: false },
          { id: 'monthly-churn', label: 'Monthly churn % (or retention curve)', type: 'number', required: true },
          { id: 'cac', label: 'CAC', type: 'number', required: true },
          { id: 'time-horizon', label: 'Time horizon (6/12/24 mo if non-subscription)', type: 'text', required: false, placeholder: 'E.g. 12 months' },
          { id: 'stress-cac', label: 'Stress: CAC +30%. Payback → ? LTV:CAC → ?', type: 'textarea', required: false },
          { id: 'stress-churn', label: 'Stress: Churn +30%. LTV → ?', type: 'textarea', required: false },
          { id: 'stress-variable', label: 'Stress: Variable costs +10%. CM → ?', type: 'textarea', required: false },
          { id: 'stress-price', label: 'Stress: Price −10%. CM% → ? Payback → ?', type: 'textarea', required: false },
          { id: 'breaks-first', label: 'Which lever breaks first? (CM / retention / CAC)', type: 'text', required: false },
        ],
        rules: ['If payback > cash runway tolerance, growth is dangerous. If model hypersensitive to one input, that input is strategy priority.'],
      },
      {
        id: 'worksheet-6-2',
        title: 'Margin Destruction Calculator',
        description: '"Don\'t let marketing destroy the business." Output: True CM per order after promos, CM%, break-even discount threshold, "promo that kills you" warning. Rule: If a growth tactic drops CM% below reinvestment threshold, it\'s not growth—it\'s liquidation.',
        fields: [
          { id: 'baseline-price', label: 'Baseline price', type: 'number', required: true },
          { id: 'baseline-variable', label: 'Baseline variable costs', type: 'number', required: true },
          { id: 'promo-discount-rate', label: 'Baseline promo/discount rate (%)', type: 'number', required: false },
          { id: 'shipping-subsidy', label: 'Shipping subsidy level', type: 'number', required: false },
          { id: 'return-rate-cost', label: 'Return rate & cost per return', type: 'textarea', required: false },
          { id: 'payment-fees', label: 'Payment fees', type: 'number', required: false },
          { id: 'support-cost-per-customer', label: 'Support cost per customer', type: 'number', required: false },
          { id: 'true-cm-after-promos', label: 'True CM per order/customer after promos', type: 'number', required: false },
          { id: 'cm-pct-after-promos', label: 'CM% after promos', type: 'number', required: false },
          { id: 'break-even-discount', label: 'Break-even discount threshold (max discount allowed)', type: 'text', required: false },
          { id: 'promo-kills-warning', label: '"Promo that kills you" warning (board-ready one line)', type: 'textarea', required: false },
        ],
        rules: ['If CM% drops below reinvestment threshold, it\'s not growth—it\'s liquidation.'],
      },
    ],
    coldCall: {
      question: 'If CAC rises 30%, what breaks first?',
      timeLimit: 90,
      semanticCriteria: { noHedging: true },
      penalty: 5,
    },
    redTeam: {
      question: 'Stress-test your unit economics: If CAC +30%, churn +20%, and variable cost +10%, are you still scalable? What is your scaling rule (one sentence, numeric)?',
      checks: [
        { type: 'consistency', field1: 'requiredOutputs.scaling-rule', field2: 'requiredOutputs.defensibility-claim', condition: 'both_present', message: 'Scaling rule and defensibility claim must be backed by the same math.' },
      ],
    },
    boardLens: 'Boards want: Verified CM (board-ready template), LTV range with assumptions, one sentence "We only scale when payback ≤ X and LTV:CAC ≥ Y after stress test." Defensibility in numbers + mechanism.',
    requiredOutputs: [
      { id: 'contribution-margin', label: 'Verified contribution margin per customer (board-ready). Template: Price (ARPA/AOV): $__; Variable costs: $__ (COGS + shipping + fees + support + returns); CM: $__; CM%: __%', type: 'text', placeholder: 'Price: $__. Variable costs: $__. CM: $__. CM%: __%.' },
      { id: 'ltv-range', label: 'LTV as a range, not single-point. Template: LTV (Low/Base/High): $__ / $__ / $__. Assumptions: churn __, repeat purchases __, refunds __. "What would make LTV fall below CAC?": __', type: 'text', placeholder: 'Low/Base/High + assumptions + what breaks LTV.' },
      { id: 'scaling-rule', label: 'Scaling rule (one sentence, numeric): e.g. "We only scale when payback ≤ 3 months AND LTV:CAC ≥ 3 after CAC+30% stress test."', type: 'text', placeholder: 'One sentence with numbers.' },
      { id: 'defensibility-claim', label: 'Defensibility claim: numbers + mechanism. E.g. "We acquire at X CAC due to Y mechanism, retain at Z due to W mechanism, payback N weeks."', type: 'text', placeholder: 'Numbers + mechanism.' },
    ],
    professorNotes: {
      whatStudentsGetWrong: 'Confuse revenue with health; gross margin with contribution margin. Use blended CAC; miss channel-level death. Hand-wave retention. Scale before stress-testing. Optimize one metric at expense of business.',
      whatAplusSmellsLike: 'CM and LTV range with itemized costs. Stress tests run (CAC +30%, churn +30%, variable +10%, price −10%). First break named. Scaling rule and defensibility in one sentence each, numeric. Board-ready CM template filled.',
      theTrap: 'The trap is "we will fix unit economics after we scale." If payback exceeds runway, you die before you\'re right. OMTM for scale readiness = Payback.',
    },
    sampleAnswers: {
      strong: {
        text: 'A 30% CAC increase pushes payback from 2.8 months to 3.6 months. That breaks our cash conversion cycle first—we can\'t reinvest fast enough. We\'d pause scaling that channel, shift to lower-CAC partners, and protect CM by tightening discounts before we spend more. (Name fragile ratio → math directionally → first operational constraint → decision: pause scale / shift channel / raise price / cut variable costs.)',
        why: 'A+ structure: (1) Name the fragile ratio (payback or CM), (2) Show math directionally, (3) State first operational constraint, (4) Give the decision.',
      },
      weak: {
        text: 'We will optimize CAC and improve retention. Our unit economics are healthy.',
        whyFails: 'No math. No breakpoint. No decision. "Optimize" and "healthy" are not board-ready.',
      },
    },
    legitimacyLens: {
      whoCouldAttack: 'Who could credibly say your CAC is understated or your "variable" costs hide fixed components?',
      whatLooksExploitative: 'What would make your unit economics look like you are buying growth at a loss?',
      implicitPromise: 'What promise are you making when you scale (e.g. payback, path to profitability)?',
    },
    readingCompanion: {
      essentials: {
        canon: { title: 'Measuring and Managing Performance', author: 'Robert D. Austin', coreIdea: 'Unit economics are the grammar of growth and defensibility. CM, LTV, CAC, Payback; stress-test before scale.', whyMatters: 'Unit economics reveal whether growth compounds or bleeds.' },
        counterpoint: { title: 'Lean Analytics', author: 'Alistair Croll & Benjamin Yoskovitz', coreIdea: 'One metric that matters; data-informed not data-driven; good metrics are ratios. OMTM for Module 6: Payback period.', whyMatters: 'Payback tells you if growth kills you or compounds you.' },
        operatorArtifact: { title: 'Payback Stress Test + Margin Destruction Calculator', description: 'LTV:CAC model with stress tests; True CM after promos, break-even discount, "promo that kills you" warning.' },
      },
      keyIdeas: ['CM = Price − Variable costs. CM% = CM/Price. LTV by model (subscription / ecom / service). CAC = full acquisition cost.', 'Payback = CAC / monthly margin. LTV:CAC without payback can delude.', 'OMTM for scale readiness: Payback period.', 'Defensibility = CAC, retention, margin, or payback advantage—with mechanism.', 'If payback > runway tolerance, growth is dangerous.'],
      listenScript: 'Unit economics reveal whether growth compounds or bleeds. Know when to scale—and when to stop. Payback is the one metric that matters for scale readiness.',
      applyPrompt: 'If CAC rises 30%, what breaks first? Name the fragile ratio, show the math directionally, state the first operational constraint, give the decision.',
      booksList: [
        { id: 'm6-canon', title: 'Measuring and Managing Performance', author: 'Robert D. Austin', type: 'canon' },
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
    thesis: 'Why Price Wars Are Loser Games. Markets are repeated games—your competitor\'s cheapest move matters more than your cleverest plan. Objective: avoid mutual destruction.',
    whyExists: {
      academic: 'HBS Strategy × Oxford Game Theory. Art of Strategy: competition + cooperation; psychology (honor, status, fairness); repeated games → policy beats impulse.',
      operator: 'Most founders respond reflexively, match competitor moves, assume price cuts are "temporary." The goal is not to beat competitors at what they do best—it\'s to force them into moves they hate.',
    },
    frameworks: [
      {
        id: 'framework-7-1',
        title: 'Mindset Shift (Art of Strategy)',
        description: 'Competition-only thinking is a strategic error. Real strategy = mix of competition + cooperation.',
        content: `• Competition-only thinking is a strategic error.
• Real strategy = mix of competition + cooperation.
• Strategy must include psychology (honor, status, fairness, identity).
• In repeated games: encourage cooperation, punish exploitation, avoid escalation spirals.

Anchor line: "The goal is not to beat competitors at what they do best. The goal is to force them into moves they hate."`,
      },
      {
        id: 'framework-7-2',
        title: 'Game Theory Tools You Actually Use',
        description: 'Prisoner\'s Dilemma applied; repeated games → policy; psychology non-optional.',
        content: `PRISONER'S DILEMMA (applied): In markets, "defect" = price cuts, feature racing, over-promotion, undercutting partners. Short-term incentive to defect destroys long-term profit pools.

REPEATED GAMES → Policy beats impulse: set expectations, build reputation, respond predictably to defection.

PSYCHOLOGY: People punish "unfairness" even at cost to themselves. You can't model competitors as robots; signaling, pride, and "face" matter.`,
      },
      {
        id: 'framework-7-3',
        title: 'Three Strategic Outputs',
        description: 'Asymmetry, Competitive Response Matrix, Price War Policy.',
        content: `1. ASYMMETRY — Structural advantage that changes the game: distribution access, supply chain costs, brand/search demand, switching costs, niche specialization, speed of iteration, regulatory advantage.

2. COMPETITIVE RESPONSE MATRIX — Rows: competitor actions. Columns: your response types. Prevents reflexive reactions.

3. PRICE WAR RESPONSE (policy) — Pre-committed policy prevents panic decisions. Floor price, min CM%, max discount, when you walk away, non-price levers first.`,
      },
      {
        id: 'framework-7-4',
        title: 'Versioning (Key Tool)',
        description: 'Compete without destroying margins.',
        content: `• Keep premium price; introduce "fighting brand" or stripped-down SKU.
• Change terms instead of price (annual vs monthly; bundles; minimums).
• Add constraints that preserve margin.
• Targeted rebates (loyal customers only)—no broad price war.`,
      },
    ],
    worksheets: [
      {
        id: 'worksheet-7-1',
        title: 'Competitive Response Matrix',
        description: 'Rows: competitor actions. Columns: your response types. Decision rule: "We do not respond to moves that don\'t change customer choice."',
        fields: [
          { id: 'competitor-actions', label: 'Competitor actions to plan for (price cut, new feature, partnership, content blitz, copy your positioning, attack supply chain, attack credibility)', type: 'textarea', required: true, placeholder: 'List 3–7 actions.' },
          { id: 'response-options', label: 'Your response options: Ignore / Counter-position / Improve product / Create switching costs / Increase perceived risk of competitor / Match price (within policy) / Partner or coopetition', type: 'textarea', required: true, placeholder: 'Map each action to 1–3 response options.' },
          { id: 'counter-1', label: 'Move 1: Expected counter-response', type: 'textarea', required: false },
          { id: 'counter-2', label: 'Move 2: Expected counter-response', type: 'textarea', required: false },
          { id: 'counter-3', label: 'Move 3: Expected counter-response', type: 'textarea', required: false },
          { id: 'decision-rule', label: 'Decision rule (e.g. We do not respond to moves that don\'t change customer choice.)', type: 'text', required: true },
        ],
        rules: ['We do not respond to moves that don\'t change customer choice.'],
      },
      {
        id: 'worksheet-7-2',
        title: 'Asymmetry Identification',
        description: '"Strength" = operational fact (cost, channel, brand, product scope). "Asymmetry" = durable (not "we try harder"). "Exploit" = concrete move with measurable outcome.',
        fields: [
          { id: 'competitor-strength', label: 'Competitor Strength (what they do best—operational fact)', type: 'text', required: true },
          { id: 'your-asymmetry', label: 'Your Asymmetry (structurally different, durable)', type: 'textarea', required: true },
          { id: 'how-exploit', label: 'How You Exploit It (3 actions, 1 metric each)', type: 'textarea', required: true, placeholder: 'E.g. Win on speed so they must overbuild; win on niche so they must dilute message; win on distribution so they must outspend.' },
          { id: 'move-they-hate', label: 'The move they hate most is ___ because it forces them to ___.', type: 'textarea', required: true },
        ],
        rules: ['Exploitation moves: win on speed+iteration (they overbuild), niche+depth (they dilute), distribution (they outspend), service+trust (they add humans = costly).'],
      },
      {
        id: 'worksheet-7-3',
        title: 'Price War Policy You Will Not Violate',
        description: 'Pre-committed policy prevents panic. Versioning: fighting brand, terms, bundles, constraints that preserve margin.',
        fields: [
          { id: 'floor-price', label: 'Floor price (by segment/channel)', type: 'text', required: true },
          { id: 'min-cm-pct', label: 'Minimum CM% allowed', type: 'text', required: true },
          { id: 'max-discount', label: 'Maximum discount allowed', type: 'text', required: true },
          { id: 'walk-away', label: 'When we will walk away from a segment', type: 'textarea', required: true },
          { id: 'non-price-levers', label: 'Non-price levers we will use first (bundles, versioning, terms, guarantees)', type: 'textarea', required: true },
        ],
        rules: ['Before any price cut: use non-price levers first. Versioning helps compete without destroying margins.'],
      },
    ],
    coldCall: {
      question: 'What competitive move are you psychologically unwilling to make — and why?',
      timeLimit: 90,
      semanticCriteria: { noHedging: true },
      penalty: 5,
    },
    redTeam: {
      question: 'If your competitor wants to hurt you, what\'s the cheapest move they can make? (Name the move, why it\'s cheap, their likely follow-up, and your PARTS-style "change the game" counter.)',
      checks: [
        { type: 'consistency', field1: 'requiredOutputs.asymmetry', field2: 'worksheets.worksheet-7-2.move-they-hate', condition: 'aligned', message: 'Asymmetry and "move they hate" must align.' },
      ],
    },
    boardLens: 'Boards want: One explicit asymmetry (board-ready template). Price war policy you will not violate (floor, non-price levers, when you walk away). Response matrix prevents reflexive matching.',
    requiredOutputs: [
      { id: 'asymmetry', label: 'One explicit asymmetry (board-ready). Template: Competitor strength: __. Our asymmetry: __. Exploit plan: __ (3 actions, 1 metric each)', type: 'text', placeholder: 'Strength / Asymmetry / Exploit plan (3 actions, 1 metric each).' },
      { id: 'price-war-constitution', label: 'Price war response you will not violate. Template: We will not discount below __% or $__ floor. If competitor cuts price, we respond with: __ (non-price #1), __ (#2). If pressure persists, we exit: __ segment/channel.', type: 'text', placeholder: 'Floor / Non-price levers / Exit segment.' },
      { id: 'response-matrix', label: 'Competitive Response Matrix completed for 3+ competitor moves (action → response options → decision rule)', type: 'text', placeholder: 'Actions / response options / decision rule.' },
    ],
    professorNotes: {
      whatStudentsGetWrong: 'Match price reflexively; assume price wars are temporary; compete on the dimension the competitor owns. Ignore psychology; think only about "our move" not "change the game."',
      whatAplusSmellsLike: 'Cheapest competitor move named. Asymmetry + exploit plan (3 actions, 1 metric). Price war policy: floor, non-price levers first, walk-away segment. Response matrix with decision rule.',
      theTrap: 'The trap is "we will match them this once." Once you match, the game shifts. Check CM floor + use non-price levers first. Versioning (fighting brand, terms, bundles) competes without destroying margins.',
    },
    sampleAnswers: {
      strong: {
        text: 'Their cheapest move is a targeted discount to our highest-intent keyword traffic, raising our CAC and forcing reactive pricing. We counter by shifting budget to owned demand + partnerships, tightening our offer architecture (bundles/terms), and refusing to chase them below our CM floor. Escalation ladder: (1) Non-price levers (value, terms), (2) Segment rebate only to loyal, (3) Walk away from segment if pressure persists. (Name cheapest move → why it hurts → counter: make their move expensive/ineffective → escalation ladder.)',
        why: 'A+ Red Team structure: (1) Name cheapest credible move, (2) Show why it hurts (what lever: CAC/retention/margin), (3) Your counter: make their move expensive/ineffective, (4) Escalation ladder (small → bigger).',
      },
      weak: {
        text: 'We will compete on quality and customer service. We might match price if we have to.',
        whyFails: 'No cheapest move. No counter. "Might match" is the trap. No policy. No escalation ladder.',
      },
    },
    legitimacyLens: {
      whoCouldAttack: 'Who could say your "asymmetry" is just positioning—or that your price war rules are arbitrary?',
      whatLooksExploitative: 'What would make your competitive response look like collusion or predatory pricing?',
      implicitPromise: 'What promise are you making with your constitution (e.g. no broad price war, loyalty-based only)?',
    },
    readingCompanion: {
      essentials: {
        canon: { title: 'Co-opetition', author: 'Adam Brandenburger & Barry Nalebuff', coreIdea: 'Markets are games with competitors and complements. PARTS: Players, Added Values, Rules, Tactics, Scope. Change the game, not just play it. Value nets beat zero-sum thinking.', whyMatters: 'Markets are games. Pretending otherwise makes you the mark.' },
        counterpoint: { title: 'The Art of Strategy', author: 'Avinash Dixit', coreIdea: 'Game theory applied to business: commitment, credibility, and information.', whyMatters: 'Strategic moves require understanding how others will respond.' },
        operatorArtifact: { title: 'Competitive Response Matrix + Price War Constitution', description: 'For 3 competitor moves: response options, counter, profit impact, escalation, PARTS option. Constitution: what you will not violate.' },
      },
      keyIdeas: ['Prisoner\'s Dilemma: defection wins the week, loses the decade. Price wars shrink the profit pool.', 'PARTS: change the game (Players, Added Values, Rules, Tactics, Scope), not just compete harder.', 'Cheapest competitor move: usually price/promo/copy/distribution wedge—not "build better."', 'Compete where they hate to play. The move they hate most forces them to damage economics or brand.', 'Rules: most-favored-customer, meet-the-competition, targeted rebates—stabilize without broad price war.'],
      listenScript: 'Markets are games. Stop reacting; start predicting. Change the game—not just play it.',
      applyPrompt: 'If your competitor wants to hurt you, what\'s the cheapest move they can make? Name it, why it\'s cheap, their follow-up, and your PARTS-style counter.',
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
    thesis: 'Where Margins Are Born. Capture is competing over existing demand. Creation is building demand that defaults to you. Stop fighting over scraps. Objective: stop fighting over scraps.',
    whyExists: {
      academic: 'Stanford GSB Market Design × Oxford Long-Run Economics. Crossing the Chasm: early adopters vs early majority; demand creation changes by stage.',
      operator: 'Most businesses optimize conversion, tweak funnels, bid harder on keywords. Elite businesses reshape category language. Margins are born upstream—in the category language that defines what buyers want.',
    },
    frameworks: [
      {
        id: 'framework-8-1',
        title: 'The Demand Spectrum (Define These Cleanly)',
        description: 'All marketing spend falls somewhere on this continuum.',
        content: `DEMAND CAPTURE (keyword bidding) — Captures people already searching for a solution. Often auction-based (ads, SEO on existing queries). Tends to inflate CAC over time. Good early-stage for signal + cashflow.

DEMAND SHAPING (positioning & reframing) — Changes how buyers evaluate options. Introduces new criteria ("luxury of science", "modular convertible", "progress moments"). Moves buyer from generic comparison to your comparison.

DEMAND CREATION (category shaping) — Creates a new "first thought" in the buyer's mind. Teaches new language + new problems + new metrics. Produces branded demand and CAC compression long-term.

Board line: "Margins are born upstream—in the category language that defines what buyers want."`,
      },
      {
        id: 'framework-8-2',
        title: 'Crossing the Chasm (How It Maps Here)',
        description: 'Early adopters vs early majority; demand creation changes by stage.',
        content: `• Early adopters buy on vision + advantage.
• Early majority buys on risk reduction + proof + reliability.
• To cross: shift from tech orientation to human/job orientation—message, distribution, proof, references, whole product.

Demand creation by stage: Early = capture + learn. Mid = hybrid. Late = creation dominates.`,
      },
      {
        id: 'framework-8-3',
        title: 'Demand Side Sales 101 — Demand Creation in Plain English',
        description: 'Demand is created by a struggling moment. No struggle → no demand.',
        content: `FOUR FORCES OF PROGRESS (must be taught):
• Push of situation
• Pull of new solution
• Anxiety of new solution
• Habit of the present

FOUR WAYS TO CREATE A FIRST THOUGHT (demand creation playbook):
1. Ask a good question (without giving the answer)
2. Tell a story
3. Give a new metric
4. State the obvious (that people don't notice yet)`,
      },
    ],
    worksheets: [
      {
        id: 'worksheet-8-1',
        title: 'Demand Mix Audit',
        description: 'Capture + Creation must total 100%. Define what counts as each so people don\'t lie. Capture: Google Search ads, SEO on high-intent queries, retargeting. Creation: narrative content, category education, creator partnerships that teach, original frameworks, branded search growth, owned audience.',
        fields: [
          { id: 'current-capture', label: 'Current % Capture', type: 'number', required: true },
          { id: 'current-creation', label: 'Current % Creation', type: 'number', required: true },
          { id: 'six-months-capture', label: '6 Months % Capture', type: 'number', required: true },
          { id: 'six-months-creation', label: '6 Months % Creation', type: 'number', required: true },
          { id: 'what-counts-capture', label: 'What we count as Capture (list channels)', type: 'textarea', required: false },
          { id: 'what-counts-creation', label: 'What we count as Creation (list initiatives)', type: 'textarea', required: false },
        ],
        rules: ['Capture + Creation must total 100%. Define what counts as each.'],
      },
      {
        id: 'worksheet-8-2',
        title: 'Channel Risk Map',
        description: 'Prevent channel collapse and platform dependency. If a channel is rented + high volatility + long payback → it cannot be your foundation.',
        fields: [
          { id: 'channel-1', label: 'Channel 1: Name', type: 'text', required: false },
          { id: 'control-1', label: 'Control level (Owned / Rented / Borrowed)', type: 'text', required: false },
          { id: 'cac-volatility-1', label: 'CAC volatility risk (low/med/high)', type: 'text', required: false },
          { id: 'saturation-1', label: 'Saturation risk', type: 'text', required: false },
          { id: 'policy-risk-1', label: 'Policy risk (platform rules)', type: 'text', required: false },
          { id: 'time-to-payback-1', label: 'Time-to-payback', type: 'text', required: false },
          { id: 'evidence-quality-1', label: 'Evidence quality (how sure are you)', type: 'text', required: false },
          { id: 'channel-2', label: 'Channel 2 (repeat fields as needed)', type: 'textarea', required: false, placeholder: 'Channel / Control / Volatility / Saturation / Policy / Payback / Evidence.' },
        ],
        rules: ['If rented + high volatility + long payback → cannot be your foundation.'],
      },
      {
        id: 'worksheet-8-3',
        title: 'One Owned Demand Asset',
        description: 'Owned demand assets: flagship guide, diagnostic tool, benchmark metric, email course, community, proprietary calculator, category glossary/framework. Must include: target struggling moment, trigger (first thought mechanism), distribution plan, conversion bridge.',
        fields: [
          { id: 'asset', label: 'Asset (e.g. flagship guide, diagnostic, benchmark, email course, community, calculator, framework)', type: 'text', required: true },
          { id: 'struggling-moment', label: 'Target struggling moment', type: 'textarea', required: true },
          { id: 'first-thought-trigger', label: '"First thought" trigger: question / story / new metric / state the obvious', type: 'textarea', required: true },
          { id: 'distribution-plan', label: 'Distribution plan (how it\'s found)', type: 'textarea', required: true },
          { id: 'conversion-bridge', label: 'Conversion bridge (how created demand gets captured: email list, retargeting, branded search, partnerships)', type: 'textarea', required: true },
        ],
        rules: ['Must have: struggling moment, first-thought trigger, distribution, conversion bridge.'],
      },
      {
        id: 'worksheet-8-4',
        title: 'Capture-to-Creation Transition Plan',
        description: 'Structure: (1) What capture channel funds you now, (2) What creation engine you\'re building, (3) Bridge: how created demand gets captured, (4) Proof metric (branded search %, direct traffic, CAC trend, inbound lead quality).',
        fields: [
          { id: 'capture-funds-now', label: 'What capture channel funds you now', type: 'textarea', required: true },
          { id: 'creation-engine', label: 'What creation engine you\'re building (3 initiatives)', type: 'textarea', required: true },
          { id: 'bridge', label: 'Bridge: how created demand gets captured (email list, retargeting, branded search, partnerships)', type: 'textarea', required: true },
          { id: 'proof-metric', label: 'Proof metric (must be measurable: branded search %, direct traffic, CAC trend, inbound lead quality)', type: 'text', required: true },
        ],
        rules: ['Transition must define bridge from created demand to conversion. Proof metric must be measurable.'],
      },
    ],
    coldCall: {
      question: 'What demand will exist in 3 years because of you?',
      timeLimit: 90,
      semanticCriteria: { noHedging: true },
      penalty: 5,
    },
    boardLens: 'Boards want: One owned demand asset (struggling moment, first-thought trigger, distribution, capture bridge). Capture-to-creation transition plan with proof metric.',
    requiredOutputs: [
      { id: 'owned-demand-asset', label: 'One owned demand asset (board-ready). Template: Asset: __. Struggling moment: __. First-thought trigger (question/story/metric/obvious): __. Distribution: __. Capture bridge: __', type: 'text', placeholder: 'Asset / Struggling moment / Trigger / Distribution / Bridge.' },
      { id: 'capture-to-creation-plan', label: 'Capture-to-creation transition plan. Template: Today __% capture / __% creation. 6 months __% / __%. Creation engine: __ (3 initiatives). Proof metric: __ (measurable)', type: 'text', placeholder: 'Today mix / 6mo mix / Creation engine / Proof metric.' },
    ],
    professorNotes: {
      whatStudentsGetWrong: 'Optimize capture only; ignore creation. No definition of what counts as capture vs creation. No bridge from created demand to conversion. No proof metric.',
      whatAplusSmellsLike: 'Demand Mix with defined capture/creation. Channel Risk Map (owned/rented, volatility, payback). One owned asset with struggling moment + first-thought trigger + bridge. Transition plan with proof metric.',
      theTrap: 'The trap is "we will do more content." Creation without a bridge to capture (email, retargeting, branded search) and a proof metric is theater. Margins are born upstream.',
    },
    sampleAnswers: {
      strong: {
        text: 'Asset: Category playbook + diagnostic. Struggling moment: operator doesn\'t know which lever to fix first. First thought: "What breaks first?" (question). Distribution: SEO + partnerships. Bridge: diagnostic → email + retargeting → branded search. Today 70% capture / 30% creation; 6 months 50/50. Creation engine: playbook, benchmark report, community. Proof metric: branded search % and direct traffic trend.',
        why: 'Asset with struggling moment, trigger (question), distribution, bridge. Transition with proof metric.',
      },
      weak: {
        text: 'We will do more content and SEO. We want to be thought leaders.',
        whyFails: 'No struggling moment. No first-thought mechanism. No bridge. No proof metric. "Thought leaders" is not a plan.',
      },
    },
    legitimacyLens: {
      whoCouldAttack: 'Who could say your "creation" is just content marketing with no category redefinition?',
      whatLooksExploitative: 'What would make your demand creation look like manipulation rather than education?',
      implicitPromise: 'What promise are you making with your category language (e.g. new metric, new problem)?',
    },
    readingCompanion: {
      essentials: {
        canon: { title: 'Crossing the Chasm', author: 'Geoffrey Moore', coreIdea: 'Early adopters vs early majority; demand creation by stage. Early: capture + learn. Mid: hybrid. Late: creation dominates. The chasm is shift in buyer type + criteria.', whyMatters: 'Capture converts existing demand. Creation changes behavior.' },
        counterpoint: { title: 'Demand-Side Sales 101', author: 'Bob Moesta', coreIdea: 'Demand is created by struggling moment. Four Forces: Push, Pull, Anxiety, Habit. Four ways to create first thought: question, story, new metric, state the obvious.', whyMatters: 'No struggle → no demand. Creation is triggering existing struggle.' },
        operatorArtifact: { title: 'Owned Demand Asset + Transition Plan', description: 'Asset: struggling moment, trigger, distribution, capture bridge. Transition: today/6mo mix, creation engine, proof metric.' },
      },
      keyIdeas: ['Capture = competing over existing intent. Creation = building demand that defaults to you.', 'Margins are born upstream—category language that defines what buyers want.', 'Struggling moment creates demand. Four Forces: Push, Pull, Anxiety, Habit.', 'First thought: question / story / new metric / state the obvious.', 'Bridge from created demand to conversion (email, retargeting, branded search). Proof metric required.'],
      listenScript: 'Capture converts existing demand. Creation changes behavior. Stop fighting over scraps. Margins are born upstream.',
      applyPrompt: 'What demand will exist in 3 years because of you? Name one owned demand asset and your capture-to-creation bridge.',
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
    title: 'Capital Allocation & Strategy Kernel',
    thesis: 'Where CEOs Actually Win. Most businesses don\'t lose because they lack ideas. They lose because they (1) allocate capital poorly and (2) call goals "strategy." Objective: turn strategy into a repeatable decision machine that compounds per-share value.',
    whyExists: {
      academic: 'HBS Capital Allocation × Princeton Long-Term Strategy. The Outsiders (Thorndike) × Good Strategy/Bad Strategy (Rumelt).',
      operator: 'Most founders are trained to improve product, marketing, operations—few are trained to do the job that determines whether all that work compounds or evaporates: capital allocation.',
    },
    frameworks: [
      {
        id: 'framework-9-1',
        title: "The CEO's Two Jobs (The Outsiders Lens)",
        description: 'Run the business to generate cash. Deploy cash to maximize returns.',
        content: `1. Run the business to generate cash
2. Deploy cash to maximize returns (capital allocation)

Key correction: Revenue growth is not the scoreboard. The scoreboard is per-share value (or owner value per unit). Even in private companies: "Value created per unit of ownership" (per share / per member unit / per % equity).`,
      },
      {
        id: 'framework-9-2',
        title: 'The 5 Ways to Deploy Capital (The Only Five)',
        description: 'Your business is an investing machine that throws off cash, then makes bets.',
        content: `1. Invest in existing operations (product, hiring, capacity, marketing, systems)
2. Acquire other businesses/assets
3. Pay dividends / distributions
4. Pay down debt
5. Repurchase equity (buybacks / buying out partners / retiring units)

The 3 ways to raise capital: Internal cash flow | Debt | Equity

Operator reality: you can't avoid these choices—you're making them implicitly every month.`,
      },
      {
        id: 'framework-9-3',
        title: 'Per-Share Mindset (Denominator Discipline)',
        description: 'Most leaders manage the numerator (revenue, profit, growth). Outsider CEOs also manage the denominator.',
        content: `Denominator: number of shares/units outstanding, dilution, capital structure, what portion of value each owner actually gets.

Module rule: A decision is "good" only if it increases long-term owner value per unit under realistic assumptions.`,
      },
      {
        id: 'framework-9-4',
        title: 'Goals Are Not Strategy (Definitions You Must Use)',
        description: 'You can have clear goals, motivated people, lots of activity—and still have no strategy.',
        content: `Goals: values/desires ("be the best", "grow fast")
Objectives: measurable targets ("$X revenue", "Y% margin")
Strategy: a coherent plan for overcoming obstacles and concentrating resources on the pivotal issue(s)

"Grow 3x" is not a strategy.`,
      },
      {
        id: 'framework-9-5',
        title: "Good Strategy / Bad Strategy (Rumelt's Kernel)",
        description: 'A good strategy has a kernel: Diagnosis → Guiding Policy → Coherent Actions.',
        content: `(1) DIAGNOSIS — Names the one or two critical issues; explains what's happening. Not symptoms, not a vibe, not "market is big." Test: if diagnosis is true, most random actions look irrelevant.

(2) GUIDING POLICY — Your approach; guardrails. Reduces complexity; rules out many actions; tells people how to decide. Not a vision statement. Not a slogan.

(3) COHERENT ACTIONS — Coordinated set of actions + resource commitments that reinforce each other. Not a long list; not a department wish-list; must create leverage.`,
      },
      {
        id: 'framework-9-6',
        title: 'Leverage, Pivot Points, Bottlenecks',
        description: 'Strategy becomes force multiplication instead of "try harder."',
        content: `LEVERAGE — Anticipation (how others react), insight (what's pivotal), concentration (focus resources). Rule: If your "strategy" requires everybody to work harder everywhere, it's not a strategy.

PIVOT POINT — Where a small move produces outsized result. E.g. one channel that drives most qualified leads; one onboarding step where churn is created; one message that changes conversion.

BOTTLENECK — Your business is a chain. Growth is capped by the weakest link. Rule: Do not fund "nice improvements" until the bottleneck is addressed.

INERTIA & ENTROPY — Inertia: people cling to the old way. Entropy: complexity grows unless pruned. "New initiatives" without pruning become failure factories.`,
      },
      {
        id: 'framework-9-7',
        title: 'Bad Strategy Patterns (What You Must Eliminate)',
        description: 'Fluff, failure to face the challenge, mistaking goals for strategy, bad objectives, template-style strategy.',
        content: `1. Fluff — High-sounding language that avoids real choices.
2. Failure to face the challenge — If you can't name the obstacle, you can't design the response.
3. Mistaking goals for strategy — "Grow 3x" is not a strategy.
4. Bad strategic objectives — Impractical or not tied to solving the critical issue.
5. Template-style strategy — Vision/mission/values fill-in-the-blank decks that don't constrain action.

Anti-test: If the deck could be swapped with a competitor's name and still sound right, it's fluff.`,
      },
      {
        id: 'framework-9-8',
        title: 'Capital Allocation Cadence (How Outsiders Operate)',
        description: 'Quarterly + annual rhythm.',
        content: `QUARTERLY (operator): (1) Review cash generation (FCF / owner earnings). (2) Review returns by bucket. (3) Decide deployment for next quarter using explicit thresholds. (4) Kill or prune low-return projects (entropy control).

ANNUAL (board): (1) Diagnose the year (what changed, where advantage is). (2) Set guiding policy (what we will do + not do). (3) Fund coherent actions (concentrated). (4) Define capital plan (allocations + triggers + stop-loss rules).`,
      },
      {
        id: 'framework-9-9',
        title: 'Diagnostics (Fast but Brutal)',
        description: 'Answer in facts only.',
        content: `1. What is your biggest bottleneck today?
2. What is the most expensive form of capital you're using (time, debt, dilution)?
3. Name one initiative you're funding that doesn't pass a return hurdle.
4. Where does complexity keep accumulating?
5. If you had to cut 30% of projects tomorrow, what would you cut first — and why?`,
      },
    ],
    worksheets: [
      {
        id: 'worksheet-9-1',
        title: 'Capital Allocation Map (5 Uses / 3 Sources)',
        description: 'Fill in facts only. No adjectives. Deploy must total 100%. Return hurdle: minimum acceptable ROI/payback—anything below does not get funded.',
        fields: [
          { id: 'cash-last-12', label: 'Cash generated last 12 months', type: 'number', required: true },
          { id: 'cash-next-12', label: 'Cash available next 12 months (forecast)', type: 'number', required: true },
          { id: 'deploy-ops', label: 'Deploy: Invest in existing operations (%)', type: 'number', required: true },
          { id: 'deploy-acquire', label: 'Deploy: Acquisitions/assets (%)', type: 'number', required: true },
          { id: 'deploy-dividends', label: 'Deploy: Dividends/distributions (%)', type: 'number', required: true },
          { id: 'deploy-debt', label: 'Deploy: Pay down debt (%)', type: 'number', required: true },
          { id: 'deploy-repurchase', label: 'Deploy: Repurchase equity / buy out units (%)', type: 'number', required: true },
          { id: 'raise-internal', label: 'Raise: Internal cash flow', type: 'text', required: false },
          { id: 'raise-debt', label: 'Raise: Debt', type: 'text', required: false },
          { id: 'raise-equity', label: 'Raise: Equity', type: 'text', required: false },
          { id: 'return-hurdle', label: 'Return hurdle: Minimum acceptable ROI / payback (anything below does not get funded)', type: 'text', required: true },
        ],
        rules: ['Deploy must total 100%. Facts only. No adjectives.'],
      },
      {
        id: 'worksheet-9-2',
        title: 'Strategy Kernel Builder (Non-Negotiable)',
        description: 'Diagnosis (1–3 sentences): critical issue, why, evidence. Guiding Policy (one paragraph): approach, what we refuse, tradeoffs. Coherent Actions (max 5): owner, budget, metric, deadline, dependency.',
        fields: [
          { id: 'diagnosis', label: 'Diagnosis (1–3 sentences): What\'s the critical issue? Why is it happening? What evidence supports it?', type: 'textarea', required: true },
          { id: 'guiding-policy', label: 'Guiding Policy (one paragraph): What approach? What will we refuse? What tradeoffs are we accepting?', type: 'textarea', required: true },
          { id: 'action-1', label: 'Coherent Action 1: owner / budget / metric / deadline / dependency', type: 'textarea', required: true },
          { id: 'action-2', label: 'Coherent Action 2', type: 'textarea', required: false },
          { id: 'action-3', label: 'Coherent Action 3', type: 'textarea', required: false },
          { id: 'action-4', label: 'Coherent Action 4', type: 'textarea', required: false },
          { id: 'action-5', label: 'Coherent Action 5', type: 'textarea', required: false },
        ],
        rules: ['Max 5 coherent actions. Each must create leverage; not a department wish-list.'],
      },
      {
        id: 'worksheet-9-3',
        title: 'Pivot Point & Bottleneck Scan',
        description: 'Chain: Lead gen → qualification → sales → onboarding → repeat use → referrals → retention. Identify bottleneck (single biggest constraint), evidence, pivot point (small change, big result), one metric that proves it moved.',
        fields: [
          { id: 'chain-notes', label: 'Your chain (map your funnel)', type: 'textarea', required: false, placeholder: 'E.g. Lead gen → qualification → sales → onboarding → repeat → referrals → retention' },
          { id: 'bottleneck', label: 'Bottleneck (single biggest constraint)', type: 'text', required: true },
          { id: 'bottleneck-evidence', label: 'Why it\'s the bottleneck (evidence)', type: 'textarea', required: true },
          { id: 'pivot-point', label: 'Pivot point (small change, big result)', type: 'text', required: true },
          { id: 'pivot-metric', label: 'One metric that proves it moved', type: 'text', required: true },
        ],
        rules: ['Do not fund nice improvements until the bottleneck is addressed.'],
      },
      {
        id: 'worksheet-9-4',
        title: 'Capital Decision Memo (1 Page, Board Format)',
        description: 'One-page format for any capital decision. Must include kill switch.',
        fields: [
          { id: 'decision-title', label: 'Decision title', type: 'text', required: true },
          { id: 'capital-required', label: 'Capital required', type: 'text', required: true },
          { id: 'expected-return', label: 'Expected return mechanism', type: 'textarea', required: true },
          { id: 'best-alternative', label: 'Best alternative use of capital', type: 'textarea', required: true },
          { id: 'downside-risks', label: 'Downside risks', type: 'textarea', required: true },
          { id: 'kill-switch', label: 'Kill switch (when we stop)', type: 'textarea', required: true },
          { id: 'owner-value-impact', label: 'Owner value impact (per unit)', type: 'text', required: true },
        ],
        rules: ['Every capital decision memo must include a kill switch.'],
      },
      {
        id: 'worksheet-9-5',
        title: '"Say No" List (Anti-Strategy Filter)',
        description: 'List 10 things you will not fund this quarter because they: do not hit the hurdle rate; are not bottleneck-driven; are not coherent with guiding policy; are entropy (complexity) disguised as progress.',
        fields: [
          { id: 'no-1', label: 'We will not fund 1', type: 'text', required: true },
          { id: 'no-2', label: 'We will not fund 2', type: 'text', required: true },
          { id: 'no-3', label: 'We will not fund 3', type: 'text', required: true },
          { id: 'no-4', label: 'We will not fund 4', type: 'text', required: false },
          { id: 'no-5', label: 'We will not fund 5', type: 'text', required: false },
          { id: 'no-6', label: 'We will not fund 6–10 (list)', type: 'textarea', required: false, placeholder: 'List up to 10. Reason: hurdle / not bottleneck / not coherent / entropy.' },
        ],
        rules: ['Each "no" must have a reason: hurdle, not bottleneck, not coherent, or entropy.'],
      },
    ],
    coldCall: {
      question: 'If I gave you $100k today, where would you allocate it — and what would you refuse to do?',
      timeLimit: 90,
      semanticCriteria: { noHedging: true },
      penalty: 5,
    },
    boardLens: 'Boards want: One explicit capital allocation policy. One complete Strategy Kernel (diagnosis + guiding policy + coherent actions). One 12-month capital plan with rationale and kill-switches. Facts only; no adjectives.',
    requiredOutputs: [
      { id: 'capital-allocation-policy', label: 'Capital allocation policy (board-ready). Template: Our priority order: __ → __ → __. Our minimum return hurdle: __. We will not fund: __ (3 items). We will prune/kill: __ (2 existing projects)', type: 'text', placeholder: 'Priority order / Hurdle / Will not fund (3) / Prune/kill (2).' },
      { id: 'strategy-kernel', label: 'Completed strategy kernel (board-ready). Diagnosis: __. Guiding Policy: __. Coherent Actions (max 5): __', type: 'text', placeholder: 'Diagnosis / Guiding Policy / Coherent Actions.' },
      { id: 'capital-plan-12mo', label: '12-month capital plan with triggers. Template: 12-month allocation by bucket: __% / __% / __% / __% / __%. Triggers to increase: __. Triggers to cut: __. One stop-loss rule: __', type: 'text', placeholder: 'Allocation / Triggers up / Triggers down / Stop-loss.' },
    ],
    professorNotes: {
      whatStudentsGetWrong: 'Confuse goals with strategy; fund nice improvements before addressing bottleneck; spread capital evenly; avoid saying no; template-style vision/mission/values; no kill switch.',
      whatAplusSmellsLike: 'Diagnosis names critical issue + evidence. Guiding policy constrains action. Coherent actions (max 5) with owner/budget/metric/deadline. Capital map with hurdle. Say No list with reasons. Capital decision memo with kill switch.',
      theTrap: 'The trap is "we need to do more." If your strategy requires everybody to work harder everywhere, it\'s not a strategy. Concentration on pivot points; do not fund non-bottleneck work until bottleneck is addressed.',
    },
    sampleAnswers: {
      strong: {
        text: 'Our bottleneck is [X]. Our policy is [Y]—we only fund initiatives that clear our return hurdle and are coherent with our guiding policy. I\'d allocate $100k into [A], [B], and [C] because they reinforce each other. I would not spend on [D] or [E] because they don\'t clear our hurdle. If [metric] doesn\'t improve by [threshold] within [N] weeks, we stop. (Diagnosis → Guiding policy → 1–3 coherent actions → 1–2 explicit no\'s → Kill switch.)',
        why: 'A+ cold call: (1) State diagnosis (bottleneck/pivotal issue), (2) State guiding policy, (3) Allocate across 1–3 coherent actions, (4) Name 1–2 no\'s explicitly, (5) Give the kill switch.',
      },
      weak: {
        text: 'We would invest in growth and marketing. We might do a few things.',
        whyFails: 'No diagnosis. No guiding policy. No coherent actions. No no\'s. No kill switch. "Growth" and "marketing" are not strategy.',
      },
    },
    legitimacyLens: {
      whoCouldAttack: 'Who could say your capital allocation is undisciplined or your "strategy" is just goals?',
      whatLooksExploitative: 'What would make your allocation look like empire-building or favoritism rather than owner value?',
      implicitPromise: 'What promise are you making to owners with your allocation policy (e.g. hurdle rate, stop-loss)?',
    },
    readingCompanion: {
      essentials: {
        canon: { title: 'The Outsiders', author: 'William Thorndike', coreIdea: 'Capital allocation is the CEO\'s real job. Run the business to generate cash; deploy cash to maximize returns. Per-share value is the scoreboard, not revenue growth.', whyMatters: 'Where you spend reveals your real strategy. Capital allocation beats operational excellence for long-term owner returns.' },
        counterpoint: { title: 'Good Strategy/Bad Strategy', author: 'Richard Rumelt', coreIdea: 'Strategy has a kernel: Diagnosis (critical issue + evidence), Guiding Policy (guardrails that constrain action), Coherent Actions (coordinated, leverage-creating). Goals are not strategy. Fluff and template-style strategy must be eliminated.', whyMatters: 'Most "strategy" is goals + fluff. Good strategy concentrates resources on the pivotal issue.' },
        operatorArtifact: { title: 'Capital Allocation Map + Strategy Kernel + Capital Decision Memo', description: '5 uses / 3 sources; Diagnosis → Guiding Policy → Coherent Actions; 1-page memo with kill switch.' },
      },
      keyIdeas: ['CEO\'s two jobs: generate cash, deploy for best owner returns. Scoreboard = per-share value.', 'Five deployment choices: invest in ops, acquire, dividends, pay down debt, repurchase equity. Three funding: internal, debt, equity.', 'Goals ≠ strategy. Strategy = coherent plan to overcome obstacles and concentrate on pivotal issue.', 'Kernel: Diagnosis → Guiding Policy → Coherent Actions. No fluff; no template strategy.', 'Leverage = anticipation + insight + concentration. Bottleneck caps the chain; don\'t fund non-bottleneck until bottleneck is addressed. Kill switch on every capital decision.'],
      listenScript: 'Where CEOs actually win: capital allocation and strategy kernel. Goals are not strategy. Diagnosis, guiding policy, coherent actions—and a kill switch.',
      applyPrompt: 'If I gave you $100k today, where would you allocate it—and what would you refuse to do? State diagnosis, guiding policy, 1–3 coherent actions, 1–2 no\'s, kill switch.',
      booksList: [
        { id: 'm9-canon', title: 'The Outsiders', author: 'William Thorndike', type: 'canon' },
        { id: 'm9-counterpoint', title: 'Good Strategy/Bad Strategy', author: 'Richard Rumelt', type: 'counterpoint' },
        { id: 'm9-artifact', title: 'Capital Decision Memo', type: 'artifact' },
      ],
    } as ReadingCompanion,
    order: 9,
  },
  {
    id: 'module-10',
    pillar: 'pillar-1',
    title: 'Strategy Under Uncertainty',
    thesis: 'Choice Cascades + Betting Discipline. Most teams don\'t lose because they "worked too little." They lose because they refused to choose, and then confused outcomes with decision quality. Objective: build a strategy you can explain in one breath—then execute it with a decision system that survives uncertainty.',
    whyExists: {
      academic: 'P&G-style strategy (Playing to Win choice cascade) × decision science (Thinking in Bets: calibration, bias, uncertainty).',
      operator: 'Most founders call goals "strategy," chase everything, interpret wins as skill and losses as bad luck, change direction constantly without updating beliefs. This module forces you to choose, then think probabilistically so you don\'t self-sabotage when outcomes wobble.',
    },
    frameworks: [
      {
        id: 'framework-10-1',
        title: 'Strategy Is a Set of Choices (Not Mission, Plan, or Best Practices)',
        description: 'If you cannot state what you won\'t do, you don\'t have a strategy.',
        content: `Strategy is not: a mission statement, a plan/calendar, "best practices," "we'll grow 30%."

Strategy is an integrated set of choices that makes you win.

If you cannot state what you won't do, you don't have a strategy.`,
      },
      {
        id: 'framework-10-2',
        title: 'The Choice Cascade (Playing to Win — Non-Negotiable Structure)',
        description: 'Five choices, one screen, not a deck.',
        content: `1. WINNING ASPIRATION — What winning means (not generic). Measurable anchor. Must imply tradeoffs; stable 6–12 months; meaningful externally.

2. WHERE TO PLAY — The arenas you choose (and refuse). Pick one primary arena, up to one adjacent. Choose across: customer segment, geography, channel, product scope, price tier, use-case/job. Hard rule: If where-to-play is "everyone," you have no where-to-play.

3. HOW TO WIN — The mechanism of advantage. Cost leadership (rare, brutal) or differentiation (distinct value, similar cost). "We win because we deliver [value equation] that competitors can't match without breaking their model."

4. CAPABILITIES — The system you must be elite at (3–5 that reinforce each other). Not skills; system. E.g. distribution engine → conversion system → retention loop.

5. MANAGEMENT SYSTEMS — The measures + routines that make it real. Weekly review rhythm; 3–6 KPIs that map to how-to-win; one kill metric; decision journal habit.`,
      },
      {
        id: 'framework-10-3',
        title: 'The Kernel (So It Doesn\'t Become Fluff)',
        description: 'Diagnosis → Guiding Policy → Coherent Actions.',
        content: `(1) DIAGNOSIS — What is the real challenge? One sentence that simplifies reality. Not symptoms, not moralizing, not "competition is tough."

(2) GUIDING POLICY — What is our approach to the obstacle? A directional rule that eliminates a bunch of options. Not a goal, not "be the best."

(3) COHERENT ACTIONS — What coordinated actions reinforce each other? Must fit together like a system, not a list.`,
      },
      {
        id: 'framework-10-4',
        title: 'Life Is Poker, Not Chess (Decision Quality vs Outcome)',
        description: 'You decide with incomplete information. Sometimes the right decision loses.',
        content: `Separate:
• DECISION QUALITY (process) — Did we reason well? Did we use evidence? Did we update?
• OUTCOME QUALITY (result) — Did we win?

In business you decide with incomplete information. The right decision can lose. So you must separate process from result.`,
      },
      {
        id: 'framework-10-5',
        title: 'Betting Discipline (Minimum Standard)',
        description: 'Every meaningful decision must include: belief, odds, unknowns, update rule, downside control.',
        content: `Every meaningful decision must include:
• BELIEF — What you think is true
• ODDS — Confidence level (e.g. 60/40)
• UNKNOWNS — What could change your view
• UPDATE RULE — What evidence would make you revise
• DOWNSIDE CONTROL — What prevents catastrophic loss

Review date is mandatory. No review = no learning.`,
      },
      {
        id: 'framework-10-6',
        title: 'Pre-Commitments and Ulysses Pacts',
        description: 'Prevents emotional doubling-down. Pick one: budget cap, time cap, loss limit, exit trigger, "no new variables" rule.',
        content: `Ulysses pact = pre-commitment you lock in before emotion hits.

Examples (structure only):
• "If CAC payback exceeds X for Y weeks, pause spend and revise offer."
• "If retention is below A after B cohorts, stop scaling and redesign onboarding."
• "If partnership doesn't produce N qualified leads by date D, end it."

Must be measurable. Not "if it feels bad."`,
      },
      {
        id: 'framework-10-7',
        title: 'Diagnostic 1 — Do We Actually Have a Strategy?',
        description: 'Answer in facts only. Pass: all 4 in under 90 seconds.',
        content: `A. What are we explicitly not doing this quarter?
B. What is our chosen "where-to-play" arena (one sentence)?
C. What is the mechanism of winning (not a feature list)?
D. What must be true for this strategy to work?

Pass: You can answer all 4 in under 90 seconds. Facts only. No adjectives.`,
      },
      {
        id: 'framework-10-8',
        title: 'Diagnostic 2 — Decision Quality Audit',
        description: 'Pick one recent decision. Fill: decision, options, belief, confidence, unknowns, what would change our mind, downside control, result (separate from quality).',
        content: `Pass: You can name at least one place you were uncertain before the outcome.

Separate result from decision quality.`,
      },
    ],
    worksheets: [
      {
        id: 'worksheet-10-1',
        title: 'Choice Cascade Board',
        description: 'Winning Aspiration → Where to Play → How to Win → Capabilities → Management Systems. One screen, not a deck. Board-ready only if it fits on one screen.',
        fields: [
          { id: 'winning-aspiration', label: 'Winning Aspiration (what winning means; measurable anchor)', type: 'textarea', required: true, placeholder: 'E.g. Win by owning premium tier in [niche] with repeat rate ≥ X and margin ≥ Y.' },
          { id: 'where-to-play', label: 'Where to Play (one primary arena, up to one adjacent; segment, geography, channel, scope, price tier, use-case)', type: 'textarea', required: true, placeholder: 'If "everyone," you have no where-to-play.' },
          { id: 'how-to-win', label: 'How to Win (mechanism: cost leadership or differentiation; value equation competitors can\'t match)', type: 'textarea', required: true },
          { id: 'capabilities', label: 'Capabilities (3–5 that reinforce each other; system not skills)', type: 'textarea', required: true, placeholder: 'E.g. distribution engine → conversion system → retention loop.' },
          { id: 'management-systems', label: 'Management Systems (weekly rhythm; 3–6 KPIs; one kill metric; decision journal habit)', type: 'textarea', required: true },
        ],
        rules: ['Must fit on one screen. Must imply tradeoffs. Where-to-play cannot be "everyone."'],
      },
      {
        id: 'worksheet-10-2',
        title: 'Decision Quality Journal',
        description: 'For each major decision: beliefs, odds, unknowns, update rules. Review date mandatory. No review = no learning.',
        fields: [
          { id: 'decision', label: 'Decision', type: 'text', required: true },
          { id: 'date', label: 'Date', type: 'text', required: true },
          { id: 'options-considered', label: 'Options considered (2–4)', type: 'textarea', required: true },
          { id: 'belief', label: 'Belief (what we think is true and why)', type: 'textarea', required: true },
          { id: 'confidence', label: 'Confidence (0–100%)', type: 'text', required: true },
          { id: 'unknowns', label: 'What we don\'t know', type: 'textarea', required: true },
          { id: 'update-rule', label: 'What would change our mind', type: 'textarea', required: true },
          { id: 'downside-control', label: 'Downside control (how we avoid ruin)', type: 'textarea', required: true },
          { id: 'time-horizon', label: 'Time horizon (10 min / 10 months / 10 years)', type: 'text', required: false },
          { id: 'review-date', label: 'Review date (mandatory)', type: 'text', required: true },
          { id: 'result', label: 'Result (separate from decision quality—fill after outcome)', type: 'textarea', required: false },
        ],
        rules: ['Review date is mandatory. Must include confidence %, unknowns, update rule, downside control.'],
      },
      {
        id: 'worksheet-10-3',
        title: 'Pre-Mortem + Ulysses Pact',
        description: 'Downside locks + exit triggers. Pre-commitments: budget cap, time cap, loss limit, exit trigger, or "no new variables" rule. Must be measurable.',
        fields: [
          { id: 'ulysses-pact', label: 'Ulysses pact (the lock—what we pre-commit to)', type: 'textarea', required: true, placeholder: 'E.g. We will not spend more than $X on channel Y past date Z.' },
          { id: 'exit-trigger', label: 'Exit trigger (the condition—when we stop)', type: 'textarea', required: true, placeholder: 'E.g. If metric A does not reach B by date C, we stop.' },
          { id: 'action-if-triggered', label: 'Action if triggered (what happens immediately)', type: 'textarea', required: true },
          { id: 'pre-mortem', label: 'Pre-mortem: What could go wrong? What would we do?', type: 'textarea', required: false },
        ],
        rules: ['Must be measurable. Not "if it feels bad."'],
      },
    ],
    coldCall: {
      question: 'What are we explicitly not doing this quarter—and what is our where-to-play in one sentence?',
      timeLimit: 90,
      semanticCriteria: { noHedging: true },
      penalty: 5,
    },
    boardLens: 'Boards want: Completed Choice Cascade (five sections, one screen). One Decision Journal entry for a real decision (confidence %, unknowns, update rule, downside control). One Ulysses Pact + exit trigger (measurable).',
    requiredOutputs: [
      { id: 'choice-cascade', label: 'Completed Choice Cascade (board-ready). All five: Winning Aspiration, Where to Play, How to Win, Capabilities, Management Systems. Fits on one screen.', type: 'text', placeholder: 'Five one-liners. Board-ready only if one screen.' },
      { id: 'decision-journal-entry', label: 'One Decision Journal entry (real strategic decision). Must include confidence %, unknowns, update rule, downside control.', type: 'text', placeholder: 'Decision / Belief / Confidence / Unknowns / Update rule / Downside control.' },
      { id: 'ulysses-pact-exit-trigger', label: 'One Ulysses Pact + one Exit Trigger. Ulysses pact: the lock. Exit trigger: the condition. Action: what happens if triggered. Must be measurable.', type: 'text', placeholder: 'Pact / Trigger / Action.' },
    ],
    professorNotes: {
      whatStudentsGetWrong: 'Call goals "strategy"; where-to-play = "everyone"; no explicit "won\'t do"; confuse outcome with decision quality; no confidence levels; no update rule; no downside control; no Ulysses pact.',
      whatAplusSmellsLike: 'Choice Cascade with five sections, one screen. Explicit where-to-play (not everyone). Decision Journal with confidence %, unknowns, update rule, downside control, review date. Ulysses pact + exit trigger measurable.',
      theTrap: 'The trap is "we\'ll work harder and see." Refusing to choose creates fake strategy. Life is poker: separate decision quality from outcome. Install betting discipline and one lock.',
    },
    sampleAnswers: {
      strong: {
        text: 'We are explicitly not doing [X] or [Y] this quarter. Where to play: [one primary arena, one sentence]. How to win: [value equation]. Capabilities: [3–5 that reinforce]. Management systems: [rhythm, KPIs, kill metric, decision journal]. For [decision]: we believed [X] at [confidence]%; unknowns were [A, B]; we\'d change our mind if [evidence]; downside control was [cap/trigger]. Ulysses pact: if [metric] doesn\'t hit [threshold] by [date], we [action].',
        why: 'Explicit no\'s. Choice Cascade complete. Decision quality fields (belief, odds, unknowns, update rule, downside). Ulysses pact + trigger measurable.',
      },
      weak: {
        text: 'We want to grow and be the best. We\'ll focus on quality. We might do a few things.',
        whyFails: 'No where-to-play. No "won\'t do." No mechanism. No decision quality. No Ulysses pact. "Grow" and "best" are not strategy.',
      },
    },
    legitimacyLens: {
      whoCouldAttack: 'Who could say your "strategy" is just goals or your where-to-play is everyone?',
      whatLooksExploitative: 'What would make your pre-commitments look arbitrary or your decision process opaque?',
      implicitPromise: 'What promise are you making with your Ulysses pact and exit trigger (e.g. we will stop if X)?',
    },
    readingCompanion: {
      essentials: {
        canon: { title: 'Playing to Win', author: 'A.G. Lafley & Roger Martin', coreIdea: 'Strategy is an integrated set of choices. Choice Cascade: Winning Aspiration → Where to Play → How to Win → Capabilities → Management Systems. If where-to-play is everyone, you have no strategy.', whyMatters: 'Refusing to choose creates fake strategy.' },
        counterpoint: { title: 'Thinking in Bets', author: 'Annie Duke', coreIdea: 'Decisions under uncertainty. Separate decision quality (process) from outcome quality (result). Betting discipline: belief, odds, unknowns, update rule, downside control. Calibration and pre-commitments prevent emotional doubling-down.', whyMatters: 'Life is poker, not chess. Right decision can lose. Confidence levels and Ulysses pacts force clarity.' },
        operatorArtifact: { title: 'Choice Cascade Board + Decision Journal + Ulysses Pact', description: 'One-screen cascade; decision journal with review date; one lock + one exit trigger (measurable).' },
      },
      keyIdeas: ['Strategy is an integrated set of choices. If you can\'t state what you won\'t do, you don\'t have a strategy.', 'Choice Cascade: Winning Aspiration → Where to Play → How to Win → Capabilities → Management Systems. Where-to-play cannot be "everyone."', 'Decision quality ≠ outcome quality. Separate process from result. Right decision can lose.', 'Betting discipline: belief, odds, unknowns, update rule, downside control. Review date mandatory.', 'Ulysses pacts prevent emotional doubling-down. Exit trigger must be measurable.'],
      listenScript: 'Strategy under uncertainty: choose explicitly, think probabilistically. Refusing to choose creates fake strategy. Decision quality is process; outcome is result. Install one lock and one trigger.',
      applyPrompt: 'Write your Choice Cascade (five sections, one screen). Journal one real decision with confidence %, unknowns, update rule, downside control. Install one Ulysses pact + exit trigger.',
      booksList: [
        { id: 'm10-canon', title: 'Playing to Win', author: 'A.G. Lafley & Roger Martin', type: 'canon' },
        { id: 'm10-counterpoint', title: 'Thinking in Bets', author: 'Annie Duke', type: 'counterpoint' },
        { id: 'm10-artifact', title: 'Decision Journal + Ulysses Pact', type: 'artifact' },
      ],
    } as ReadingCompanion,
    order: 10,
  },
  {
    id: 'module-11',
    pillar: 'pillar-1',
    title: 'Market Creation & Category Design',
    thesis: 'The highest-margin companies do not compete. They force the market to learn a new way to evaluate value.',
    whyExists: {
      academic: 'Stanford GSB Category Design × Strategy-as-Systems × Sociocultural Value Formation.',
      operator: 'Most companies believe they are competing in a market. In reality, they are competing inside a frame they did not choose. Traditional strategy assumes known competitors, stable demand, shared evaluation criteria. Category creators face no benchmarks, customer confusion, education costs before revenue, delayed validation despite strong conviction. This module teaches how to escape comparison, design a category, and reorganize the market around your definition of value.',
    },
    frameworks: [
      {
        id: 'framework-11-1',
        title: 'Category Creation vs Product Innovation',
        description: 'Product innovation improves something people already buy. Category creation changes what people buy — and why.',
        content: `Product innovation improves something people already buy.
Category creation changes what people buy — and why.

If customers ask "How is this different from X?" you have not created a category yet.

Category creators do not win by being better. They win by making comparison feel wrong.`,
      },
      {
        id: 'framework-11-2',
        title: 'The Core Truth: Categories Are Taught',
        description: 'Markets do not discover categories. Customers learn to want your product when a latent problem is named, the old solution is reframed as insufficient, and a new mental model replaces the old one.',
        content: `Markets do not discover categories. Categories are taught.

Customers do not wake up wanting your product. They learn to want it when:
1. A latent problem is named
2. The old solution is reframed as insufficient
3. A new mental model replaces the old one

This is not branding. It is cognitive re-anchoring.`,
      },
      {
        id: 'framework-11-3',
        title: 'The Education Burn Model',
        description: 'Category creators must teach before they sell. This is not waste. It is capitalized learning.',
        content: `Phase: Observer → Learner → User → Advocate

Cost (state facts only): Time to explain the problem; repetition across channels; lower early conversion; misclassification by press, customers, and investors.

Outcome: Higher willingness to pay; stronger retention; structural differentiation; long-term pricing power.

If you cannot afford education burn, you cannot afford category creation.`,
      },
      {
        id: 'framework-11-4',
        title: 'Why Most Category Attempts Fail',
        description: 'Category creation rewards patience only when paired with discipline.',
        content: `1. Selling the solution before naming the problem
2. Benchmarking against incumbents
3. Optimizing conversion instead of comprehension
4. Expanding before belief exists
5. Abandoning conviction too early

Category creation rewards patience only when paired with discipline.`,
      },
      {
        id: 'framework-11-5',
        title: 'Category Kings (Play Bigger)',
        description: 'Category kings do not sell "better." They sell different.',
        content: `They: Reveal problems customers couldn't articulate; reframe the market's evaluation logic; make the old way feel painful in hindsight; design ecosystems, not just products.

Uber did not beat taxis. It made taxis feel obsolete.`,
      },
      {
        id: 'framework-11-6',
        title: 'The Category Design Sequence',
        description: 'Six steps: POV → Condition the market → Define the enemy → Design the ecosystem → Fire a lightning strike → Expand the category.',
        content: `1. DEVELOP A POV — Why does this category exist now? What structural, technological, or cultural shift makes the old way inadequate?

2. CONDITION THE MARKET — Teach customers how to see the problem. If the pain is latent, create contrast.

3. DEFINE THE ENEMY — Every category needs a villain. Not a competitor — a status quo behavior or belief.

4. DESIGN THE ECOSYSTEM — Language, partners, creators, incentives, distribution. Categories are social systems, not feature sets.

5. FIRE A LIGHTNING STRIKE — A moment that forces attention and reframing. Must be: simple, memorable, directional.

6. EXPAND THE CATEGORY — Once belief exists: new use cases, new segments, adjacent problems.`,
      },
      {
        id: 'framework-11-7',
        title: 'Blue Ocean vs Category Design',
        description: 'Blue Ocean escapes competition. Category Design replaces the battlefield.',
        content: `Blue Ocean Strategy teaches you to escape competition.
Category Design teaches you to replace the battlefield.

Red oceans compete on features. Blue oceans compete on value innovation. Categories compete on meaning and identity.`,
      },
      {
        id: 'framework-11-8',
        title: 'Strategic Discipline (Good Strategy Applied)',
        description: 'A category is not a vision statement. It is a coherent system.',
        content: `Every viable category obeys the kernel:
1. Diagnosis — what is actually broken?
2. Guiding policy — how will we solve it differently?
3. Coherent action — what must align to make this real?

If you cannot articulate these clearly, you do not have a category — only ambition.`,
      },
      {
        id: 'framework-11-9',
        title: 'Diagnostics (Answer Honestly)',
        description: 'If these answers are vague, the category is not formed yet.',
        content: `1. What problem did customers not articulate before you?
2. What old solution feels embarrassing in hindsight?
3. What metric matters that incumbents ignore?
4. What must be true for this category to feel inevitable in five years?
5. What comparison are you actively trying to eliminate?`,
      },
    ],
    worksheets: [
      {
        id: 'worksheet-11-1',
        title: 'Category Design Board',
        description: 'Clear enemy (status quo), category POV, lightning strike concept, category boundary. Every category needs a villain—not a competitor, but a status quo behavior or belief.',
        fields: [
          { id: 'enemy-status-quo', label: 'Clear enemy (status quo)—the villain: behavior or belief, not a competitor', type: 'textarea', required: true, placeholder: 'E.g. "Accepting that X is good enough" / "Believing that Y is the only way."' },
          { id: 'category-pov', label: 'Category POV statement: Why does this category exist now? What shift makes the old way inadequate?', type: 'textarea', required: true },
          { id: 'lightning-strike', label: 'Lightning strike concept: A moment that forces attention and reframing. Simple, memorable, directional.', type: 'textarea', required: true },
          { id: 'category-boundary', label: 'Category boundary: What you explicitly are not (what you refuse to be or do)', type: 'textarea', required: true },
          { id: 'diagnosis', label: 'Diagnosis (kernel): What is actually broken?', type: 'textarea', required: false },
          { id: 'guiding-policy', label: 'Guiding policy: How will we solve it differently?', type: 'textarea', required: false },
        ],
        rules: ['Enemy = status quo, not competitor. POV = why now. Lightning strike = simple, memorable, directional. Boundary = what you are not.'],
      },
      {
        id: 'worksheet-11-2',
        title: 'Education Budget (Time + Tolerance for Delay)',
        description: 'Category creators must teach before they sell. Define your education budget: time to explain the problem, repetition across channels, lower early conversion tolerance, misclassification tolerance. If you cannot afford education burn, you cannot afford category creation.',
        fields: [
          { id: 'time-to-explain', label: 'Time budget: How long will we spend explaining the problem (before revenue)?', type: 'text', required: true },
          { id: 'tolerance-delay', label: 'Tolerance for delay: How long will we accept lower conversion / delayed validation?', type: 'text', required: true },
          { id: 'repetition-channels', label: 'Repetition across channels (what we will repeat, where)', type: 'textarea', required: false },
          { id: 'misclassification-tolerance', label: 'Misclassification tolerance: Press, customers, investors will get it wrong. For how long?', type: 'text', required: false },
          { id: 'phase', label: 'Current phase: Observer / Learner / User / Advocate', type: 'text', required: false },
        ],
        rules: ['Education burn is capitalized learning. State facts only. If you cannot afford it, you cannot afford category creation.'],
      },
    ],
    coldCall: {
      question: 'What category are you creating — and why does it need to exist?',
      timeLimit: 90,
      semanticCriteria: { noHedging: true },
      penalty: 5,
    },
    redTeam: {
      question: 'Stress-test your category: Why does this problem matter now and not five years ago? What happens if the customer ignores this category entirely? What would an incumbent say to dismiss you? What assumption, if wrong, destroys the category?',
      checks: [
        { type: 'consistency', field1: 'requiredOutputs.enemy-status-quo', field2: 'requiredOutputs.category-pov', condition: 'aligned', message: 'Enemy (status quo) and category POV must align—villain is not a competitor.' },
      ],
    },
    boardLens: 'Boards want: Clear enemy (status quo). Defined education budget (time + tolerance for delay). Category POV statement. Lightning strike concept. Category boundary (what you are not). Pass cold call: name problem not product, identify enemy, explain why now, avoid competitor comparison.',
    requiredOutputs: [
      { id: 'enemy-status-quo', label: 'Clear enemy (status quo)—the villain: behavior or belief, not a competitor', type: 'text', placeholder: 'Status quo you are against.' },
      { id: 'education-budget', label: 'Defined education budget: time + tolerance for delay (state facts only)', type: 'text', placeholder: 'Time to explain; tolerance for lower conversion / delayed validation.' },
      { id: 'category-pov', label: 'Category POV statement: Why does this category exist now? What shift makes the old way inadequate?', type: 'text', placeholder: 'POV in one paragraph.' },
      { id: 'lightning-strike', label: 'Lightning strike concept: Simple, memorable, directional moment that forces attention and reframing', type: 'text', placeholder: 'One concept.' },
      { id: 'category-boundary', label: 'Category boundary: What you explicitly are not (what you refuse to be or do)', type: 'text', placeholder: 'What we are not.' },
    ],
    professorNotes: {
      whatStudentsGetWrong: 'Sell solution before naming problem; benchmark against incumbents; optimize conversion instead of comprehension; expand before belief exists; abandon conviction too early; define enemy as a competitor.',
      whatAplusSmellsLike: 'Enemy = status quo (not competitor). POV names why now. Lightning strike simple and directional. Category boundary explicit. Education budget with time + tolerance. Red team: defend diagnosis, admit fragility, show why old way fails structurally.',
      theTrap: 'The trap is "we are like X but better." If customers ask how you are different from X, you have not created a category yet. Category creators make comparison feel wrong.',
    },
    sampleAnswers: {
      strong: {
        text: 'We are creating the category of [X]. The problem is [latent problem we name]—customers could not articulate it before us. The enemy is [status quo behavior or belief], not [competitor]. It needs to exist now because [structural/tech/cultural shift] makes the old way inadequate. We teach customers how to see the problem; our lightning strike is [simple, memorable, directional]. We are explicitly not [boundary]. Our education budget is [time] and we tolerate [delay] before validation. (Names problem not product; identifies enemy; explains why now; avoids competitor comparison.)',
        why: 'Passing cold call: names problem, identifies enemy (status quo), explains why now, avoids competitor comparison. No feature lists, no "we are like X but better," no market size without reframing.',
      },
      weak: {
        text: 'We are the best [product] in the [market]. We are better than [competitor]. The market is huge.',
        whyFails: 'Feature list. Competitor comparison. No enemy. No why now. No category. "Best" and "better" are not category creation.',
      },
    },
    legitimacyLens: {
      whoCouldAttack: 'Who could say your "category" is just positioning or your enemy is really a competitor?',
      whatLooksExploitative: 'What would make your category language look like manipulation rather than education?',
      implicitPromise: 'What promise are you making by defining this category (e.g. new way to evaluate value)?',
    },
    readingCompanion: {
      essentials: {
        canon: { title: 'Play Bigger', author: 'Al Ramadan et al.', coreIdea: 'Category design precedes product. Category kings do not sell better—they sell different. Reveal problems customers couldn\'t articulate; reframe evaluation logic; make the old way feel painful in hindsight; design ecosystems.', whyMatters: 'Categories create winners before products do. If customers ask how you are different from X, you have not created a category yet.' },
        counterpoint: { title: 'Blue Ocean Strategy', author: 'W. Chan Kim & Renée Mauborgne', coreIdea: 'Create uncontested space by redefining the frame. Red oceans = features; blue oceans = value innovation; categories = meaning and identity. Category Design replaces the battlefield.', whyMatters: 'Blue Ocean escapes competition; Category Design replaces the battlefield.' },
        operatorArtifact: { title: 'Category POV + Lightning Strike + Education Budget', description: 'POV (why now); lightning strike (simple, memorable, directional); education budget (time + tolerance for delay). Enemy = status quo.' },
      },
      keyIdeas: ['Category creation changes what people buy and why. Product innovation improves what they already buy.', 'If customers ask "How is this different from X?" you have not created a category yet. Make comparison feel wrong.', 'Categories are taught. Latent problem named → old solution reframed → new mental model. Cognitive re-anchoring.', 'Education burn is capitalized learning. If you cannot afford it, you cannot afford category creation.', 'Enemy = status quo (behavior or belief), not competitor. Lightning strike = simple, memorable, directional. Category boundary = what you are not.'],
      listenScript: 'The highest-margin companies do not compete. They force the market to learn a new way to evaluate value. Categories are taught. Teach the right people how to see differently.',
      applyPrompt: 'What category are you creating—and why does it need to exist? Name the problem, the enemy (status quo), why now, and what you are not.',
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
    title: 'Execution Systems: Constraints, Throughput, and High-Output Management',
    thesis: 'Strategy is a hypothesis. Execution is a system. This module teaches how to turn strategy into operational reality using Theory of Constraints (The Goal) and Managerial Leverage (High Output Management).',
    whyExists: {
      academic: 'Operations as a systems discipline: dependent events + statistical fluctuations → flow collapse. Management as leverage: output is a function of systems and coaching, not individual effort.',
      operator: 'Most teams "work harder" when things break—that usually makes outcomes worse. Symptoms: late shipments, growing backlog + rising inventory, local efficiency up / global results down, meetings everywhere / decisions nowhere, leaders drowning in activity with no measurable output. This module replaces effort with design.',
    },
    frameworks: [
      {
        id: 'framework-12-1',
        title: 'The Goal — Theory of Constraints (TOC)',
        description: 'Every action that brings the company closer to its goal is productive. Every action that does not is not. The goal is making money (flow + profitability).',
        content: `THE THREE MEASUREMENTS (TIOE):
• Throughput (T): rate the system generates money through sales (net of variable costs)
• Inventory/Investment (I): money tied up in things intended to sell (incl. equipment)
• Operating Expense (OE): money spent to turn inventory into throughput

Key insight: Increasing Throughput usually dominates cutting I or OE.

SYSTEM TRUTH: The constraint (bottleneck) determines maximum throughput. A lost hour at the constraint is global lost throughput—not "local downtime."

Dependent events + statistical fluctuations: Variability accumulates; flow collapses. Balanced capacity + variability ⇒ throughput down, inventory up.`,
      },
      {
        id: 'framework-12-2',
        title: 'The Five Focusing Steps (POOGI)',
        description: 'Identify → Exploit → Subordinate → Elevate → Repeat.',
        content: `1. Identify the constraint
2. Exploit the constraint (keep it fully utilized)
3. Subordinate everything else to the constraint
4. Elevate the constraint (add capacity if needed)
5. If the constraint moves, repeat — do not let inertia create the next constraint`,
      },
      {
        id: 'framework-12-3',
        title: 'High Output Management — Managerial Leverage',
        description: 'Manager output = output of their org + output of neighboring orgs they influence.',
        content: `Your job is not "doing work." Your job is creating output via:
• Clarity before action (pre-work is high-leverage)
• Training and coaching as compounding systems
• Decision hygiene (waffling = negative leverage)

Training is the boss's job—by a credible, practicing authority; continuous, not one-time.

Motivation: "Can't" vs "won't." If their life depended on it, could they do it? Yes → motivation. No → capability. Tools: train and motivate.

Meetings: chairman, objective (what decision), minutes (what / who / when).
O3s: subordinate owns agenda; mutual teaching + surfacing hidden problems; cadence by TRM.
Delegation without follow-through is abdication. Monitoring is not meddling—QA for outcomes.
KPIs: measure output, not activity. Pair indicators to avoid over-optimizing one side.`,
      },
      {
        id: 'framework-12-4',
        title: 'TOC + High Output = Operational Execution System',
        description: 'TOC tells you where leverage exists. High Output tells you how leaders convert leverage into sustained performance.',
        content: `A high-performing operation is not "everyone busy."
It is: constraint protected | flow predictable | decisions fast | people coached | metrics aligned.`,
      },
      {
        id: 'framework-12-5',
        title: 'Professor Notes (What You Write on the Board)',
        description: 'Seven non-negotiables.',
        content: `1. A system is only as fast as its constraint.
2. Local efficiency is often the enemy of global throughput.
3. Balanced plants fail under variability. Flow > balance.
4. Leaders create output by: training, decision-making, designing environments.
5. "No decision" is a decision that blocks work.
6. Measure outputs. Pair KPIs to prevent self-sabotage.
7. Continuous improvement is a loop, not a project.`,
      },
      {
        id: 'framework-12-6',
        title: 'Diagnostics (Answer for Your Business/Team)',
        description: 'Operator facts, no fluff.',
        content: `1. What is the current constraint? (people, process, machine, budget, approvals, demand)
2. What evidence proves it is the constraint? (queue, WIP, wait time, SLA misses)
3. What work is stealing time from the constraint?
4. What decisions are delayed that block flow?
5. Which KPI is currently rewarding the wrong behavior?`,
      },
    ],
    worksheets: [
      {
        id: 'worksheet-12-1',
        title: 'System Profile & Constraint Evidence',
        description: 'Learning data: system profile (dropdowns), constraint evidence (WIP, wait time, SLA, rework, lost hour cost), cadence + leverage (meetings, O3s, training, time allocation). State facts only.',
        fields: [
          { id: 'industry', label: 'Industry', type: 'select', required: true, options: ['Services', 'Ecommerce', 'Manufacturing', 'Agency', 'Clinic', 'Software'] },
          { id: 'work-type', label: 'Work type', type: 'select', required: true, options: ['Project', 'Pipeline', 'Recurring ops'] },
          { id: 'primary-output-unit', label: 'Primary output unit', type: 'select', required: true, options: ['Revenue shipped', 'Orders shipped', 'Appts booked', 'Conversions', 'Deployments'] },
          { id: 'constraint-type', label: 'Constraint type', type: 'select', required: true, options: ['People', 'Machine', 'Approvals', 'Tooling', 'Demand', 'Cash'] },
          { id: 'variability-source', label: 'Variability source', type: 'select', required: false, options: ['Inbound volatility', 'Batching', 'Dependencies', 'Rework', 'Quality escapes'] },
          { id: 'wip-at-constraint', label: 'WIP count at constraint', type: 'text', required: false },
          { id: 'avg-wait-time', label: 'Avg wait time', type: 'text', required: false },
          { id: 'sla-breach-rate', label: 'SLA breach rate', type: 'text', required: false },
          { id: 'rework-rate', label: 'Rework rate', type: 'text', required: false },
          { id: 'lost-hour-cost', label: '"Lost hour" cost at constraint (rough)', type: 'text', required: false },
          { id: 'meeting-inventory', label: 'Meeting inventory (type, freq, decision owner)', type: 'textarea', required: false },
          { id: 'o3-cadence', label: 'O3 cadence', type: 'text', required: false },
          { id: 'training-sessions-per-month', label: 'Training sessions per month', type: 'text', required: false },
          { id: 'time-allocation', label: 'Time allocation % (deep work / reactive / meetings)', type: 'text', required: false },
        ],
        rules: ['State facts only. No adjectives.'],
      },
      {
        id: 'worksheet-12-2',
        title: 'Constraint Map (1 Page)',
        description: 'Constraint identified; upstream/downstream dependencies; where WIP accumulates; what "lost time" at the constraint costs (roughly).',
        fields: [
          { id: 'constraint-identified', label: 'Constraint identified', type: 'text', required: true },
          { id: 'upstream-downstream', label: 'Upstream/downstream dependencies', type: 'textarea', required: true },
          { id: 'where-wip-accumulates', label: 'Where WIP accumulates', type: 'textarea', required: true },
          { id: 'lost-time-cost', label: 'What "lost time" at the constraint costs (roughly)', type: 'text', required: true },
        ],
        rules: ['One page. Evidence-based.'],
      },
      {
        id: 'worksheet-12-3',
        title: 'Exploit Plan (Next 7 Days)',
        description: 'How you will keep the constraint fully utilized; what gets de-prioritized; what rules change immediately (batching, approvals, scheduling).',
        fields: [
          { id: 'keep-constraint-utilized', label: 'How you will keep the constraint fully utilized', type: 'textarea', required: true },
          { id: 'deprioritized', label: 'What gets de-prioritized', type: 'textarea', required: true },
          { id: 'rules-change', label: 'What rules change immediately (batching, approvals, scheduling)', type: 'textarea', required: true },
        ],
        rules: ['7-day plan. Concrete actions.'],
      },
      {
        id: 'worksheet-12-4',
        title: 'Subordination Rules (Operating Policy)',
        description: '"Everything else serves the constraint" policies. E.g. priority tags, intake throttles, WIP limits, meeting limits, SLAs.',
        fields: [
          { id: 'subordination-policy', label: 'Subordination policy: what we will do / not do so the constraint is protected', type: 'textarea', required: true, placeholder: 'E.g. priority tags, WIP limits, meeting limits, intake throttles.' },
        ],
        rules: ['Everything else serves the constraint.'],
      },
      {
        id: 'worksheet-12-5',
        title: 'Cadence System (High Output)',
        description: 'Meeting types + owners + decision scope. O3 cadence by TRM. Training loop (what is taught weekly).',
        fields: [
          { id: 'meeting-types-owners-scope', label: 'Meeting types + owners + decision scope', type: 'textarea', required: true },
          { id: 'o3-cadence-trm', label: 'O3 cadence by TRM (task-relevant maturity)', type: 'textarea', required: true },
          { id: 'training-loop', label: 'Training loop (what is taught weekly)', type: 'textarea', required: true },
        ],
        rules: ['Every meeting: chairman, objective (what decision), minutes (what/who/when).'],
      },
      {
        id: 'worksheet-12-6',
        title: 'KPI Pair Set (3–5 Pairs)',
        description: 'Each KPI must measure output + quality/counter-effect. Must not reward local efficiency at the expense of throughput.',
        fields: [
          { id: 'pair-1', label: 'Pair 1: output metric + quality/counter-effect metric', type: 'textarea', required: true },
          { id: 'pair-2', label: 'Pair 2', type: 'textarea', required: true },
          { id: 'pair-3', label: 'Pair 3', type: 'textarea', required: true },
          { id: 'pair-4', label: 'Pair 4 (optional)', type: 'textarea', required: false },
          { id: 'pair-5', label: 'Pair 5 (optional)', type: 'textarea', required: false },
        ],
        rules: ['Pair output with quality/counter-effect. Do not reward local efficiency at expense of throughput.'],
      },
    ],
    coldCall: {
      question: 'What\'s the constraint in your system right now, and what are you doing this week to increase throughput?',
      timeLimit: 90,
      semanticCriteria: { noHedging: true },
      penalty: 5,
    },
    redTeam: {
      question: 'Stress-test your execution system: Are you sure that\'s the constraint—or just the loudest pain? If we remove that constraint tomorrow, where will the next one appear? What local metric is lying to you? What are you protecting the constraint from? What behavior are your KPIs incentivizing that harms throughput?',
      checks: [
        { type: 'consistency', field1: 'requiredOutputs.constraint-map', field2: 'requiredOutputs.exploit-plan-7day', condition: 'aligned', message: 'Constraint Map and Exploit Plan must align—same constraint, evidence-based exploit.' },
      ],
    },
    boardLens: 'Boards want: Constraint Map (1 page). Exploit Plan (7 days). Subordination Rules (operating policy). Cadence System (meetings + O3s + training). KPI Pair Set (3+ pairs, output + counter-effect). Cold call pass: constraint + evidence + exploit action + what is subordinated.',
    requiredOutputs: [
      { id: 'constraint-map', label: 'Constraint Map (1 page): constraint identified, upstream/downstream, where WIP accumulates, lost time cost', type: 'text', placeholder: 'Constraint / Dependencies / WIP / Lost time cost.' },
      { id: 'exploit-plan-7day', label: 'Exploit Plan (next 7 days): how constraint fully utilized, what de-prioritized, what rules change', type: 'text', placeholder: 'Utilized / De-prioritized / Rules change.' },
      { id: 'subordination-rules', label: 'Subordination Rules (operating policy): "everything else serves the constraint" policies', type: 'text', placeholder: 'E.g. priority tags, WIP limits, meeting limits.' },
      { id: 'cadence-system', label: 'Cadence System: meeting types + owners + decision scope; O3 cadence by TRM; training loop', type: 'text', placeholder: 'Meetings / O3s / Training.' },
      { id: 'kpi-pair-set', label: 'KPI Pair Set (3–5 pairs): each output + quality/counter-effect; no local efficiency at expense of throughput', type: 'text', placeholder: '3+ pairs: output + counter-effect.' },
    ],
    professorNotes: {
      whatStudentsGetWrong: 'Confuse "everyone busy" with efficiency; optimize local metrics; ignore the constraint; waffle on decisions; measure activity not output; no subordination policy.',
      whatAplusSmellsLike: 'Constraint identified with evidence (queue, WIP, wait time, SLA). Exploit plan for 7 days. Subordination rules live. Cadence with meeting/O3/training discipline. KPI pairs (output + counter-effect). Next-constraint plan (POOGI).',
      theTrap: 'The trap is "we need to work harder." A system is only as fast as its constraint. Local efficiency is often the enemy of global throughput. Replace effort with design.',
    },
    sampleAnswers: {
      strong: {
        text: 'Our constraint is [X]—it\'s where work queues up and downstream teams wait. We know because [proof: backlog / wait time / SLA / WIP]. This week we\'re exploiting it by [protecting time / removing interruptions / scheduling priority work first / batching] and subordinating everything else by [WIP limit / intake rule / meeting cuts / priority tags]. Success is measured by throughput: [units shipped / revenue shipped / qualified leads closed / turnaround time], paired with [quality metric]. (Constraint + evidence + exploit action + what is subordinated + throughput metric paired.)',
        why: 'Passing cold call: constraint (specific), evidence (one proof), exploit action (this week), what is being subordinated (what you stop doing). No "we\'re hiring" without timeline, no "we need better people" without system diagnosis, no "we\'re busy," no activity lists with no constraint logic.',
      },
      weak: {
        text: 'We\'re really busy. We\'re hiring. We need better people.',
        whyFails: 'No constraint. No evidence. No exploit action. No subordination. "Busy" and "hiring" without system diagnosis are fail conditions.',
      },
    },
    legitimacyLens: {
      whoCouldAttack: 'Who could say your "constraint" is just the loudest pain, not the real bottleneck?',
      whatLooksExploitative: 'What would make your execution system look like burnout culture rather than leverage?',
      implicitPromise: 'What promise are you making with your subordination rules and KPIs (e.g. flow, throughput, quality)?',
    },
    readingCompanion: {
      essentials: {
        canon: { title: 'The Goal', author: 'Eliyahu Goldratt', coreIdea: 'Every action that brings the company closer to its goal is productive. The constraint determines throughput. TIOE: Throughput, Inventory, Operating Expense. Five Focusing Steps: Identify → Exploit → Subordinate → Elevate → Repeat. Balanced plants fail under variability; flow > balance.', whyMatters: 'A system is only as fast as its constraint. Local efficiency is often the enemy of global throughput.' },
        counterpoint: { title: 'High Output Management', author: 'Andy Grove', coreIdea: 'Manager output = output of org + output of neighboring orgs. Create output via clarity, training, decision hygiene. Waffling = negative leverage. Meetings: chairman, objective, minutes. O3s: subordinate owns agenda. Measure output; pair KPIs.', whyMatters: 'Leaders create output by training, decision-making, designing environments. "No decision" is a decision that blocks work.' },
        operatorArtifact: { title: 'Constraint Map + Exploit Plan + Subordination Rules + Cadence + KPI Pairs', description: '1-page constraint map; 7-day exploit plan; subordination policy; meeting/O3/training cadence; 3+ KPI pairs (output + counter-effect).' },
      },
      keyIdeas: ['Strategy is a hypothesis. Execution is a system.', 'TOC: constraint determines throughput. Lost hour at constraint = global lost throughput. Increase T usually dominates cutting I or OE.', 'Five Focusing Steps: Identify → Exploit → Subordinate → Elevate → Repeat. POOGI.', 'High Output: manager output = org + influence. Training is boss\'s job. Waffling = negative leverage. Pair KPIs.', 'High-performing operation: constraint protected, flow predictable, decisions fast, people coached, metrics aligned.'],
      listenScript: 'Strategy is a hypothesis. Execution is a system. A system is only as fast as its constraint. Replace effort with design.',
      applyPrompt: 'What\'s the constraint in your system right now, and what are you doing this week to increase throughput? Constraint + evidence + exploit + subordination.',
      booksList: [
        { id: 'm12-canon', title: 'The Goal', author: 'Eliyahu Goldratt', type: 'canon' },
        { id: 'm12-counterpoint', title: 'High Output Management', author: 'Andy Grove', type: 'counterpoint' },
        { id: 'm12-artifact', title: 'Constraint Map + Exploit Plan', type: 'artifact' },
      ],
    } as ReadingCompanion,
    order: 12,
  },
  {
    id: 'module-13',
    pillar: 'pillar-1',
    title: 'Corporate Advantage',
    thesis: 'The CEO\'s job is not "make each business good" (that\'s business strategy). It is to create corporate advantage: making the portfolio worth more together than as separate companies. (Attribution: Phanish Puranam, INSEAD; Bart Vanneste, UCL.)',
    whyExists: {
      academic: 'INSEAD × UCL Corporate Strategy (Puranam & Vanneste). Corporate vs business strategy; synergy types; governance costs; governance structure choice.',
      operator: 'Mario @ MoveIt: revenues +15% each year, profits at all-time high—but "I should be doing more, I don\'t know what." The CEO scorecard: portfolio logic explicit, synergies real and valued, governance costs managed, HQ adds value, capital markets test passed.',
    },
    frameworks: [
      {
        id: 'framework-13-1',
        title: 'The CEO Problem (Cold Open)',
        description: 'Mario @ MoveIt: diversified manufacturer. His job is corporate advantage, not business strategy.',
        content: `CEO scorecard (what "good" looks like):
1. Portfolio logic is explicit (why these businesses belong together)
2. Synergies are real and valued (not slogans)
3. Governance costs are managed (not ignored)
4. HQ adds value (not bureaucracy)
5. Capital markets test is passed (investors could not replicate your advantage by holding similar stocks)`,
      },
      {
        id: 'framework-13-2',
        title: 'Corporate Strategy vs Business Strategy',
        description: 'Business strategy: how one business competes. Corporate strategy: how a collection creates extra value because they are owned/managed together.',
        content: `Business strategy: how one business competes (customers, positioning, advantage in its market).
Corporate strategy: how a collection of businesses creates extra value because they are owned/managed together.

Business model identity test (Who/What/How): Who are the customers? What are we selling? How do we produce/deliver it (value chain)? Two businesses differ if they differ on any one. If you can't separate the firm into distinct "businesses," you can't do corporate strategy.`,
      },
      {
        id: 'framework-13-3',
        title: 'Corporate Advantage (The Only Goal That Matters)',
        description: 'Value created by jointly owning and coordinating a portfolio that exceeds the value as stand-alone firms.',
        content: `Corporate advantage = The value created by jointly owning and coordinating a portfolio of businesses that exceeds the value those businesses would have as stand-alone firms.

Investors can replicate a portfolio by buying stocks. So HQ must justify why ownership + coordination beats "do-it-yourself diversification."`,
      },
      {
        id: 'framework-13-4',
        title: 'The Two Big Variables: Synergies vs Governance Costs',
        description: 'Pick the governance structure that maximizes: Synergy value − Governance costs.',
        content: `SYNERGIES (upside): Joint operation makes the combined system more valuable than separate operation. Operational synergy requires coordination beyond simple market pricing.

GOVERNANCE COSTS (the taxes): Ownership costs (inside the firm): politics, slower decisions, incentive misalignment, HQ meddling, internal complexity. Transaction costs (between firms): contracting limits, hold-up risk, monitoring, renegotiation, leakage, lack of authority.

Rule: Pick the governance structure that maximizes Synergy value − Governance costs.`,
      },
      {
        id: 'framework-13-5',
        title: 'Synergy Types (So "Synergy" Stops Being a Buzzword)',
        description: 'Shared Activities / Scale | Capability Transfer / Learning | Market Access / Revenue.',
        content: `A) SHARED ACTIVITIES / SCALE — Shared facilities, procurement, logistics, systems. Upside: lower unit costs, better utilization. Risk: coordination overhead, internal fights over priorities/capacity.

B) CAPABILITY TRANSFER / LEARNING — One business transfers know-how (design, R&D, marketing, ops). Upside: faster innovation, better execution. Risk: "not invented here," tacit knowledge expensive, cultural mismatch.

C) MARKET ACCESS / REVENUE — Shared channels, cross-selling, distribution, branding, bundling, co-marketing. Upside: higher conversion, lower CAC, larger basket. Risk: channel conflict, brand dilution, incentive fights (who gets credit).`,
      },
      {
        id: 'framework-13-6',
        title: 'Governance Structure Choice Map',
        description: 'Market/Contract | Non-equity alliance | Equity alliance/JV | Acquisition.',
        content: `Option 1: MARKET / CONTRACT — Best when synergy is simple, measurable, contractible.
Option 2: NON-EQUITY ALLIANCE — Best when you need collaboration but don't need control.
Option 3: EQUITY ALLIANCE / JV — Best when you need stronger commitment, shared upside, some control rights.
Option 4: ACQUISITION — Best when synergy requires deep coordination + authority, and governance costs under contracting would be too high.`,
      },
      {
        id: 'framework-13-7',
        title: 'Bundling as a Corporate-Advantage Lever',
        description: 'Bundling is a portfolio coordination move. Mixed bundling often beats pure bundling and pure components.',
        content: `Bundling can create revenue synergies, shift timing/segmentation, interact with network effects.

Key takeaways (Derdenger & Kumar): (1) Mixed bundling often beats pure bundling and pure components (bundle + components available). (2) Bundling works through dynamic consumer segmentation, not just "homogenizing valuations." (3) Bundles can behave like distinct products. (4) Bundling and indirect network effects can substitute—bundling relatively less effective when network effects are stronger.

Corporate tie-in: Is bundling here a substitute for building stronger network effects? When would HQ push bundling across units vs let each unit price independently?`,
      },
      {
        id: 'framework-13-8',
        title: 'Cold Call Flow (Professor Notes)',
        description: 'What business is MoveIt in? What would corporate advantage look like? Name one synergy and one governance cost. Why not ally instead of acquire?',
        content: `Cold call 1: "What business is MoveIt in?" — Force Who/What/How: planes vs trains vs tractors might be distinct.
Cold call 2: "What would corporate advantage look like at MoveIt?" — shared procurement? shared manufacturing tech? shared channels? shared R&D?
Cold call 3: "Name one synergy and one governance cost for each synergy." — Pair upside with friction.
Cold call 4: "If the synergy is real, why not ally instead of acquire?" — Push into governance-structure logic.`,
      },
    ],
    worksheets: [
      {
        id: 'worksheet-13-1',
        title: 'Business Definition & Portfolio Logic',
        description: 'Define businesses using Who/What/How. State why these businesses belong together (portfolio logic).',
        fields: [
          { id: 'business-1', label: 'Business 1: Who / What / How', type: 'textarea', required: true },
          { id: 'business-2', label: 'Business 2 (if multi-business): Who / What / How', type: 'textarea', required: false },
          { id: 'portfolio-logic', label: 'Portfolio logic: Why do these businesses belong together?', type: 'textarea', required: true },
        ],
        rules: ['Two businesses differ if they differ on Who, What, or How. Portfolio logic must be explicit.'],
      },
      {
        id: 'worksheet-13-2',
        title: 'Synergy Bets (Type, Value Driver, Governance Cost)',
        description: 'List 3 synergy bets: scale, capability transfer, or market access. For each: value driver (revenue/cost/capex/time), required coordination mechanism, primary governance cost risk.',
        fields: [
          { id: 'synergy-type-1', label: 'Synergy 1: Type (Scale / Capability Transfer / Market Access)', type: 'select', required: true, options: ['Scale', 'Capability Transfer', 'Market Access'] },
          { id: 'value-driver-1', label: 'Synergy 1: Value driver + coordination mechanism + primary governance cost risk', type: 'textarea', required: true },
          { id: 'synergy-type-2', label: 'Synergy 2: Type', type: 'select', required: true, options: ['Scale', 'Capability Transfer', 'Market Access'] },
          { id: 'value-driver-2', label: 'Synergy 2: Value driver + coordination + governance cost risk', type: 'textarea', required: true },
          { id: 'synergy-type-3', label: 'Synergy 3: Type', type: 'select', required: true, options: ['Scale', 'Capability Transfer', 'Market Access'] },
          { id: 'value-driver-3', label: 'Synergy 3: Value driver + coordination + governance cost risk', type: 'textarea', required: true },
        ],
        rules: ['Each synergy: value driver, coordination mechanism, governance cost risk. Pair upside with friction.'],
      },
      {
        id: 'worksheet-13-3',
        title: 'Governance Structure Choice',
        description: 'For each synergy bet: choose governance structure (Contract / Non-equity alliance / Equity alliance / Acquisition). Justify why.',
        fields: [
          { id: 'governance-1', label: 'Synergy 1: Governance structure (Contract / Non-equity alliance / Equity alliance / Acquisition)', type: 'select', required: true, options: ['Contract', 'Non-equity alliance', 'Equity alliance', 'Acquisition'] },
          { id: 'governance-why-1', label: 'Why (e.g. contractible vs deep coordination needed)', type: 'textarea', required: true },
          { id: 'governance-2', label: 'Synergy 2: Governance structure', type: 'select', required: true, options: ['Contract', 'Non-equity alliance', 'Equity alliance', 'Acquisition'] },
          { id: 'governance-3', label: 'Synergy 3: Governance structure', type: 'select', required: true, options: ['Contract', 'Non-equity alliance', 'Equity alliance', 'Acquisition'] },
        ],
        rules: ['Pick structure that maximizes Synergy value − Governance costs.'],
      },
      {
        id: 'worksheet-13-4',
        title: 'HQ Operating Model & CEO KPI Dashboard',
        description: 'What HQ does that businesses cannot do alone. What HQ stops doing (anti-bureaucracy). How HQ measures its own ROI. CEO dashboard: synergy capture vs plan, governance cost metrics, divest/exit triggers.',
        fields: [
          { id: 'hq-does', label: 'What HQ does that businesses cannot do alone', type: 'textarea', required: true },
          { id: 'hq-stops', label: 'What HQ stops doing (anti-bureaucracy commitments)', type: 'textarea', required: true },
          { id: 'hq-roi', label: 'How HQ measures its own ROI', type: 'textarea', required: true },
          { id: 'ceo-dashboard', label: 'CEO KPI dashboard: synergy capture vs plan; governance cost metrics (cycle time, conflict costs, overhead); divest/exit triggers', type: 'textarea', required: true },
        ],
        rules: ['HQ must add value, not bureaucracy. Capital markets test: investors could not replicate your advantage by holding similar stocks.'],
      },
      {
        id: 'worksheet-13-5',
        title: 'Learning Data & Failure Modes',
        description: 'Governance costs dropdown: Incentives / Politics / Contracting limits / Hold-up / Culture / Complexity. Failure modes: Integration overload / Synergy never operationalized / Channel conflict / Talent flight / Measurement illusion.',
        fields: [
          { id: 'governance-costs-selected', label: 'Top governance cost risks for your portfolio (select or list)', type: 'textarea', required: false, placeholder: 'E.g. Incentives, Politics, Contracting limits, Hold-up, Culture, Complexity' },
          { id: 'failure-mode', label: 'Most likely integration failure mode for your case', type: 'select', required: false, options: ['Integration overload', 'Synergy never operationalized', 'Channel conflict', 'Talent flight', 'Measurement illusion'] },
        ],
        rules: ['Always pair synergy with governance cost. Name the failure mode you are mitigating.'],
      },
    ],
    coldCall: {
      question: 'What would corporate advantage look like at your portfolio—and how would you know if the portfolio is worth more together than apart?',
      timeLimit: 90,
      semanticCriteria: { noHedging: true },
      penalty: 5,
    },
    redTeam: {
      question: 'Stress-test your corporate advantage: (1) Show me the synergy in dollars, and why it requires joint ownership. (2) Prove HQ adds value rather than slowing decisions—what HQ does, what it stops doing, how it measures ROI. (3) Why can\'t shareholders replicate your portfolio without you? (coordination / governance / capability transfer / timing advantage)',
      checks: [
        { type: 'consistency', field1: 'requiredOutputs.portfolio-logic', field2: 'requiredOutputs.synergy-bets', condition: 'aligned', message: 'Portfolio logic and synergy bets must align—synergies must support why businesses belong together.' },
      ],
    },
    boardLens: 'Board-ready: Portfolio logic explicit. Three synergy bets (type, value driver, governance cost). Governance structure choice per bet. HQ operating model (what HQ does + stops doing + ROI). CEO KPI dashboard (synergy capture, governance costs, divest triggers). Capital markets test passed. (Attribution: Puranam & Vanneste.)',
    requiredOutputs: [
      { id: 'portfolio-logic', label: 'Portfolio logic explicit: why these businesses belong together', type: 'text', placeholder: 'One paragraph. Why together > apart.' },
      { id: 'synergy-bets', label: 'Three synergy bets: each with type (Scale / Capability Transfer / Market Access), value driver, required coordination, primary governance cost risk', type: 'text', placeholder: '3 bets: type + value driver + coordination + governance cost.' },
      { id: 'governance-structure', label: 'Governance structure choice for each bet (Contract / Alliance / JV / Acquisition) + why', type: 'text', placeholder: 'Per bet: structure + justification.' },
      { id: 'hq-operating-model', label: 'HQ operating model: what HQ does that businesses cannot do alone; what HQ stops doing; how HQ measures ROI', type: 'text', placeholder: 'HQ does / HQ stops / HQ ROI.' },
      { id: 'ceo-kpi-dashboard', label: 'CEO KPI dashboard: synergy capture vs plan; governance cost metrics; divest/exit triggers for businesses that don\'t fit thesis', type: 'text', placeholder: 'Synergy metrics / Governance cost metrics / Exit triggers.' },
    ],
    professorNotes: {
      whatStudentsGetWrong: 'Confuse business strategy with corporate strategy; use "synergy" as slogan without value driver or governance cost; ignore governance costs; assume HQ always adds value; cannot pass capital markets test.',
      whatAplusSmellsLike: 'Businesses defined by Who/What/How. Corporate advantage thesis in one sentence. Three synergy bets with type, value driver, coordination, governance cost. Governance structure chosen per bet (maximize synergy − governance cost). HQ does / stops / ROI. CEO dashboard with synergy capture, governance costs, exit triggers.',
      theTrap: 'The trap is "we have synergies." Synergies must be real and valued; governance costs eat them. Pick structure that maximizes Synergy value − Governance costs. Investors can replicate a portfolio—so prove why ownership + coordination beats DIY.',
    },
    sampleAnswers: {
      strong: {
        text: '(1) MoveIt\'s businesses: planes, trains, tractors—distinct Who/What/How. (2) Corporate advantage thesis: "MoveIt wins because shared procurement, shared R&D, and shared distribution create more value than the sum of stand-alone firms, and governance costs are contained by X." (3) Three synergy bets: Scale (shared procurement—value driver: unit cost reduction; governance cost: allocation fights). Capability transfer (shared R&D—innovation pipeline; cost: "not invented here," talent retention). Market access (shared distribution—lower CAC, larger basket; cost: channel conflict). (4) Governance: procurement = shared services; R&D = equity JV; distribution = contract + incentives. (5) HQ does: capital allocation, talent mobility, shared systems. HQ stops: meddling in P&L decisions, duplicate approvals. HQ ROI: portfolio TSR vs basket of comparable stand-alones. (6) Dashboard: synergy capture vs plan; cycle time, conflict costs, overhead %; divest trigger if business fails synergy test for 2 years.',
        why: 'A+ template: Define businesses (Who/What/How). State corporate advantage thesis. List 3 synergy bets with value driver, coordination, governance cost. Choose governance structure per bet. HQ operating model. CEO KPI dashboard.',
      },
      weak: {
        text: 'We have great synergies. Our portfolio is diversified. HQ supports the businesses.',
        whyFails: 'No business definition. No portfolio logic. "Synergies" without value driver or governance cost. No governance structure choice. No HQ accountability. No capital markets test.',
      },
    },
    legitimacyLens: {
      whoCouldAttack: 'Who could say your "synergies" are slogans or your governance costs are ignored?',
      whatLooksExploitative: 'What would make your corporate advantage look like empire-building rather than value creation?',
      implicitPromise: 'What promise are you making to investors (e.g. portfolio worth more together; HQ adds value)?',
    },
    // TODO (curriculum): Consider adding "Optimal Bundling: Marketing Strategies for Improving Economic Performance" by Ralph Fuegder as alternate/required reading; keep Derdenger & Kumar bundling paper as empirical anchor.
    readingCompanion: {
      essentials: {
        canon: { title: 'Corporate Strategy', author: 'Phanish Puranam (INSEAD) & Bart Vanneste (UCL)', coreIdea: 'Corporate advantage = value from jointly owning and coordinating a portfolio that exceeds stand-alone value. Synergies (scale, capability transfer, market access) minus governance costs (ownership + transaction costs). Pick governance structure to maximize Synergy − Governance cost.', whyMatters: 'Investors can replicate a portfolio. HQ must justify why ownership + coordination beats DIY. Portfolio logic must be explicit; synergies real and valued; governance costs managed; HQ adds value.' },
        counterpoint: { title: 'The Dynamic Effects of Bundling as a Product Strategy', author: 'Timothy Derdenger & Vineet Kumar', coreIdea: 'Bundling as portfolio coordination move. Mixed bundling often beats pure bundling and pure components. Dynamic segmentation; bundles as distinct products; bundling and network effects can substitute. When would HQ push bundling across units vs let each price independently?', whyMatters: 'Bundling creates revenue synergies; interacts with network effects. Corporate tie-in: bundling vs stronger network effects.' },
        operatorArtifact: { title: 'Portfolio Logic + Synergy Bets + Governance Structure + HQ Model + CEO Dashboard', description: 'Why together; 3 synergy bets (type, value driver, governance cost); governance choice per bet; HQ does/stops/ROI; synergy capture, governance metrics, exit triggers.' },
      },
      keyIdeas: ['Corporate strategy: how a collection creates extra value because owned/managed together. Business strategy: how one business competes.', 'Business = Who/What/How. Two businesses differ if they differ on any one.', 'Corporate advantage = portfolio value together > stand-alone. Investors can replicate—prove why ownership + coordination beats DIY.', 'Synergy types: Scale (shared activities), Capability Transfer (learning), Market Access (revenue). Governance costs eat synergy—pick structure that maximizes Synergy − Governance cost.', 'HQ must add value (what it does, what it stops doing, how it measures ROI). CEO scorecard: portfolio logic, synergies real, governance costs managed, capital markets test.'],
      listenScript: 'Corporate advantage: the portfolio worth more together than apart. Synergies real and valued; governance costs managed; HQ adds value. (Puranam & Vanneste.)',
      applyPrompt: 'What would corporate advantage look like at your portfolio? Name one synergy and one governance cost. Why not ally instead of acquire?',
      booksList: [
        { id: 'm13-canon', title: 'Corporate Strategy', author: 'Phanish Puranam & Bart Vanneste', type: 'canon' },
        { id: 'm13-counterpoint', title: 'The Dynamic Effects of Bundling as a Product Strategy', author: 'Timothy Derdenger & Vineet Kumar', type: 'counterpoint' },
        { id: 'm13-artifact', title: 'Portfolio Logic', type: 'artifact' },
      ],
    } as ReadingCompanion,
    order: 13,
  },
  {
    id: 'module-14',
    pillar: 'pillar-1',
    title: 'Speed vs Perfection',
    thesis: 'Your job: design a system where speed produces quality (instead of speed fighting quality). Most people don\'t choose "perfection"—they choose delay disguised as quality. Two operating systems: Lean Startup loop (build → measure → learn) and OKRs (Measure What Matters)—so speed is aimed, not chaotic.',
    whyExists: {
      academic: 'Stanford Execution Bias × Lean Startup (Eric Ries) × Measure What Matters (John Doerr).',
      operator: 'Move fast → learn sooner, ship sooner, earn sooner. Make it perfect → avoid embarrassment, protect quality. The tension is real. This module gives you work type, definition of done, and guardrails so speed produces learning and quality.',
    },
    frameworks: [
      {
        id: 'framework-14-1',
        title: 'Speed Is Only Valuable If It Creates Learning',
        description: 'Lean Startup: steer via build–measure–learn feedback loop. Validated learning = empirically proving what\'s true vs vibes.',
        content: `Instead of complex plans based on assumptions, steer via the build–measure–learn feedback loop.

Startups (and creators) win by validated learning: empirically proving what's true vs what's just vibes.

Translation: If your "fast" work doesn't produce a testable learning outcome, it's just motion.`,
      },
      {
        id: 'framework-14-2',
        title: 'MVP ≠ Tiny. MVP = Fastest Learning Loop',
        description: 'An MVP is the version that enables a full turn of Build–Measure–Learn with minimal effort/time.',
        content: `MVP = the version that enables a full turn of the Build–Measure–Learn loop with minimal effort/time.

It may look "low quality"—allowed if it helps you learn what customers actually care about.

Translation: Perfection is not the enemy. Unmeasured effort is.`,
      },
      {
        id: 'framework-14-3',
        title: 'OKRs Make Speed Directional',
        description: 'Objective = ambitious direction. Key Results = specific, time-bound, measurable proof you\'re moving.',
        content: `Objective = ambitious direction (should feel uncomfortable)
Key Results = specific, time-bound, measurable proof you're moving
Committed (expected 1.0) vs aspirational (expected ~0.7) OKRs

Translation: Speed without OKRs becomes thrash. OKRs without speed becomes fantasy.`,
      },
      {
        id: 'framework-14-4',
        title: 'Small Batches Expose Quality Problems Sooner',
        description: 'Lean: small batches help identify quality problems earlier.',
        content: `You don't "choose" speed or quality. You choose batch size.

Large batches hide quality issues until it's expensive. Small batches reveal them earlier.`,
      },
      {
        id: 'framework-14-5',
        title: 'Speed–Perfection Decision Framework',
        description: 'Work type → Definition of done → Speed with safety rules.',
        content: `STEP 1 — WORK TYPE (pick one):
• Reversible (can undo easily) → default to speed
• Hard-to-reverse (public launch, legal, safety, brand harm) → add guardrails
• Compounding (systems, habits, infrastructure) → speed + standards

STEP 2 — DEFINITION OF DONE (pick one):
• Learning Done: data answers the hypothesis
• Customer Done: customer can complete the core job
• Brand Done: it matches brand quality bar
• Compliance Done: meets legal/safety needs

Most people mistakenly apply Brand Done to everything. That's how you get stuck.

STEP 3 — SPEED WITH SAFETY (3–5 non-negotiables max): No broken checkout/booking; no misleading claims; no security/privacy sloppiness; no untested pricing changes; no shipping without measurement instrumentation. Everything else is allowed to be "v1 ugly."`,
      },
      {
        id: 'framework-14-6',
        title: 'Professor Notes (The Mindset You\'re Graded On)',
        description: 'You\'re running experiments. Measure reality; run the next experiment based on data.',
        content: `• You're not building a product. You're running experiments.
• Your job is to measure reality and then run the next experiment based on data.
• Small batches reveal quality issues earlier; large batches hide them until it's expensive.
• OKRs exist to prevent speed from turning into random output.`,
      },
    ],
    worksheets: [
      {
        id: 'worksheet-14-1',
        title: 'Work Type + Definition of Done + Guardrails',
        description: 'Work type (reversible / hard-to-reverse / compounding). Definition of done (Learning / Customer / Brand / Compliance). Speed with safety: pick 3–5 non-negotiables (max).',
        fields: [
          { id: 'work-type', label: 'Work type', type: 'select', required: true, options: ['Reversible', 'Hard-to-reverse', 'Compounding'] },
          { id: 'definition-of-done', label: 'Definition of done', type: 'select', required: true, options: ['Learning Done', 'Customer Done', 'Brand Done', 'Compliance Done'] },
          { id: 'guardrail-1', label: 'Guardrail 1 (non-negotiable)', type: 'text', required: true, placeholder: 'E.g. No broken checkout' },
          { id: 'guardrail-2', label: 'Guardrail 2', type: 'text', required: true },
          { id: 'guardrail-3', label: 'Guardrail 3', type: 'text', required: true },
          { id: 'guardrail-4', label: 'Guardrail 4 (optional)', type: 'text', required: false },
          { id: 'guardrail-5', label: 'Guardrail 5 (optional)', type: 'text', required: false },
        ],
        rules: ['Pick 3–5 non-negotiables max. Everything else is allowed to be "v1 ugly."'],
      },
      {
        id: 'worksheet-14-2',
        title: '1-Week OKR',
        description: 'Objective (ambitious + directional). Key Results (3–5, measurable). Committed vs Aspirational. Cycle length.',
        fields: [
          { id: 'objective', label: 'Objective (ambitious + directional)', type: 'textarea', required: true },
          { id: 'kr-1', label: 'Key Result 1 (measurable)', type: 'text', required: true },
          { id: 'kr-2', label: 'Key Result 2', type: 'text', required: true },
          { id: 'kr-3', label: 'Key Result 3', type: 'text', required: true },
          { id: 'kr-4', label: 'Key Result 4 (optional)', type: 'text', required: false },
          { id: 'kr-5', label: 'Key Result 5 (optional)', type: 'text', required: false },
          { id: 'okr-type', label: 'Committed vs Aspirational', type: 'select', required: true, options: ['Committed', 'Aspirational'] },
          { id: 'cycle-length', label: 'Cycle length', type: 'select', required: true, options: ['Weekly', 'Biweekly', 'Monthly'] },
        ],
        rules: ['Key Results must be specific, time-bound, measurable. Speed without OKRs = thrash.'],
      },
      {
        id: 'worksheet-14-3',
        title: 'Leap-of-Faith Assumptions + Build–Measure–Learn Plan',
        description: 'Value hypothesis + Growth hypothesis. MVP type. Build (≤7 days) / Measure / Learn (decision rule).',
        fields: [
          { id: 'value-hypothesis', label: 'Value hypothesis: We believe users will ___ because ___.', type: 'textarea', required: true },
          { id: 'growth-hypothesis', label: 'Growth hypothesis: We believe new users will come from ___ via ___.', type: 'textarea', required: true },
          { id: 'mvp-type', label: 'MVP type', type: 'select', required: true, options: ['Concierge MVP', 'Landing page MVP', 'Prototype/demo video', 'Wizard-of-Oz', 'Limited beta'] },
          { id: 'build', label: 'Build: What you will ship in ≤7 days', type: 'textarea', required: true },
          { id: 'measure', label: 'Measure: What metric will move / what data you\'ll capture', type: 'textarea', required: true },
          { id: 'learn', label: 'Learn: What decision you\'ll make based on outcomes', type: 'textarea', required: true },
        ],
        rules: ['MVP = fastest way to complete a Build–Measure–Learn loop. Unmeasured effort is the enemy.'],
      },
      {
        id: 'worksheet-14-4',
        title: 'Batch Size + Cadence',
        description: 'Batch size rule. Cadence: build days, measure days, decision day (pivot / persevere / iterate).',
        fields: [
          { id: 'batch-size-rule', label: 'Batch size rule: I ship changes in batches no larger than ___', type: 'text', required: true },
          { id: 'build-days', label: 'Build days', type: 'text', required: true },
          { id: 'measure-days', label: 'Measure days', type: 'text', required: true },
          { id: 'decision-day', label: 'Decision day (pivot / persevere / iterate)', type: 'text', required: true },
        ],
        rules: ['Small batches expose quality problems sooner.'],
      },
      {
        id: 'worksheet-14-5',
        title: 'Red Team + Kill Switch',
        description: 'Red Team: most likely misleading result; vanity metric trap; ego vs rule if MVP fails; minimum quality bar. Kill switch: one condition to ship within 24h; one condition to pause and patch.',
        fields: [
          { id: 'redteam-misleading', label: 'Most likely reason your MVP result will be misleading', type: 'textarea', required: true },
          { id: 'redteam-vanity', label: 'Metric that could look "good" while product is actually failing (vanity metric trap)', type: 'textarea', required: true },
          { id: 'redteam-ego-vs-rule', label: 'If MVP "fails": what ego wants to do (cope) vs what you will do instead (rule)', type: 'textarea', required: true },
          { id: 'kill-switch-ship', label: 'Kill switch (ship): If I have ___ (proof), I ship within 24 hours', type: 'text', required: true },
          { id: 'kill-switch-pause', label: 'Kill switch (pause): If ___ breaks or harms trust, I pause and patch', type: 'text', required: true },
        ],
        rules: ['Define one condition to ship; one condition to pause.'],
      },
    ],
    coldCall: {
      question: 'You\'re behind. You can either ship a rough v1 today or polish for 2 more weeks. What do you do?',
      timeLimit: 90,
      semanticCriteria: { noHedging: true },
      penalty: 5,
    },
    redTeam: {
      question: 'Stress-test your plan: (1) What\'s the most likely reason your MVP result will be misleading? (2) What metric could look "good" while the product is actually failing? (3) If the MVP "fails," what will your ego want to do—and what will you do instead? (4) What\'s the minimum quality bar you refuse to violate (your 3–5 guardrails)? Define one kill switch to ship; one to pause.',
      checks: [
        { type: 'consistency', field1: 'requiredOutputs.okr-1week', field2: 'requiredOutputs.leap-of-faith-plan', condition: 'aligned', message: '1-week OKR and Build–Measure–Learn plan must align—same cycle, measurable outcome.' },
      ],
    },
    boardLens: 'Board-ready: 1-week OKR (objective + 3–5 key results, committed vs aspirational, cycle length). Leap-of-faith + Build–Measure–Learn plan (value + growth hypothesis, MVP type, build/measure/learn). Batch size + cadence. Guardrails (3–5). Kill switch (ship + pause). Cold call: work type, definition of done, hypothesis, MVP + metric, decision rule.',
    requiredOutputs: [
      { id: 'okr-1week', label: '1-week OKR: Objective (ambitious + directional), Key Results (3–5 measurable), Committed vs Aspirational, Cycle length', type: 'text', placeholder: 'Objective / KRs / Type / Cycle.' },
      { id: 'leap-of-faith-plan', label: 'Leap-of-faith assumptions + test plan: Value + Growth hypothesis, MVP type, Build (≤7 days) / Measure / Learn (decision rule)', type: 'text', placeholder: 'Value hyp / Growth hyp / MVP type / Build / Measure / Learn.' },
      { id: 'batch-cadence', label: 'Batch size rule + Cadence (build days, measure days, decision day: pivot / persevere / iterate)', type: 'text', placeholder: 'Batch size / Build days / Measure days / Decision day.' },
      { id: 'guardrails-kill-switch', label: 'Guardrails (3–5 non-negotiables) + Kill switch (one condition to ship within 24h; one condition to pause and patch)', type: 'text', placeholder: 'Guardrails / Ship condition / Pause condition.' },
    ],
    professorNotes: {
      whatStudentsGetWrong: 'Apply Brand Done to everything; ship without measurement; no definition of done; no guardrails; speed without OKRs (thrash) or OKRs without speed (fantasy); large batches that hide quality issues.',
      whatAplusSmellsLike: 'Work type named. Definition of done (Learning / Customer / Brand / Compliance) chosen. 1-week OKR with measurable key results. Leap-of-faith + Build–Measure–Learn plan. Batch size + cadence. 3–5 guardrails. Kill switch (ship + pause). Cold call: work type, definition of done, hypothesis, MVP + metric, decision rule.',
      theTrap: 'The trap is delay disguised as quality. Perfection is not the enemy—unmeasured effort is. Design a system where speed produces quality.',
    },
    sampleAnswers: {
      strong: {
        text: 'This is reversible, so I ship a learning-MVP today. My definition of done is "instrumented + usable." Hypothesis: users will complete the core action without help. I\'ll measure activation and drop-off. If activation is under X%, I iterate the onboarding; if it\'s over X%, I move to brand polish. (Work type → definition of done → hypothesis → MVP + metric → decision rule.)',
        why: 'A+ cold call: (1) Work type (reversible vs irreversible), (2) Definition of done, (3) Hypothesis, (4) MVP + metric, (5) Decision rule.',
      },
      weak: {
        text: 'I\'ll polish for 2 more weeks so it\'s perfect. We don\'t want to embarrass ourselves.',
        whyFails: 'No work type. No definition of done. No hypothesis. No metric. No decision rule. Delay disguised as quality.',
      },
    },
    legitimacyLens: {
      whoCouldAttack: 'Who could say your "speed" is just motion without learning, or your guardrails are arbitrary?',
      whatLooksExploitative: 'What would make your "v1 ugly" ship look like you\'re shipping broken or misleading product?',
      implicitPromise: 'What promise are you making with your guardrails (e.g. no broken checkout, no misleading claims)?',
    },
    readingCompanion: {
      essentials: {
        canon: { title: 'The Lean Startup', author: 'Eric Ries', coreIdea: 'Build–Measure–Learn. MVP = fastest way to complete a learning loop. Validated learning beats perfect planning. Speed without learning is just motion.', whyMatters: 'If your fast work doesn\'t produce a testable learning outcome, it\'s motion. Perfection is not the enemy—unmeasured effort is.' },
        counterpoint: { title: 'Measure What Matters', author: 'John Doerr', coreIdea: 'OKRs: Objective (ambitious direction) + Key Results (specific, time-bound, measurable). Committed vs aspirational. Speed without OKRs = thrash; OKRs without speed = fantasy.', whyMatters: 'OKRs make speed directional—aimed, not chaotic.' },
        operatorArtifact: { title: 'Work Type + Definition of Done + Guardrails + Kill Switch', description: 'Reversible/hard-to-reverse/compounding. Learning/Customer/Brand/Compliance done. 3–5 guardrails. One condition to ship; one to pause.' },
      },
      keyIdeas: ['Speed is only valuable if it creates learning. Build–Measure–Learn. Validated learning beats perfect planning.', 'MVP = fastest way to complete a learning loop, not "smallest product." Unmeasured effort is the enemy.', 'OKRs make speed directional. Objective + Key Results. Speed without OKRs = thrash; OKRs without speed = fantasy.', 'Small batches expose quality sooner. You choose batch size, not "speed or quality."', 'Work type (reversible / hard-to-reverse / compounding). Definition of done (Learning / Customer / Brand / Compliance). 3–5 guardrails. Kill switch (ship + pause).'],
      listenScript: 'Design a system where speed produces quality. You\'re running experiments—measure reality, run the next experiment based on data. Perfection is not the enemy; unmeasured effort is.',
      applyPrompt: 'You\'re behind. Ship rough v1 today or polish 2 more weeks. What do you do? Work type, definition of done, hypothesis, MVP + metric, decision rule.',
      booksList: [
        { id: 'm14-canon', title: 'The Lean Startup', author: 'Eric Ries', type: 'canon' },
        { id: 'm14-counterpoint', title: 'Measure What Matters', author: 'John Doerr', type: 'counterpoint' },
        { id: 'm14-artifact', title: 'Build–Measure–Learn + OKR', type: 'artifact' },
      ],
    } as ReadingCompanion,
    order: 14,
  },
  {
    id: 'module-15',
    pillar: 'pillar-1',
    title: 'Narrative as Economic Infrastructure',
    thesis: 'Narrative is not decoration. It\'s infrastructure: it lowers the cost of coordination, increases trust, creates identity, and makes collective action possible. Myths did this for civilizations; brands do it for markets. (Power of Myth × StoryBrand × story as coordination technology.)',
    whyExists: {
      academic: 'Power of Myth (Joseph Campbell) × StoryBrand (Donald Miller) × story as coordination technology.',
      operator: 'Markets don\'t run on facts alone. They run on shared belief + shared interpretation. That\'s narrative. If you build identity, meaning, norms, roles, rituals, symbols, and rites of passage well, your marketing stops being "convincing" and starts being obvious.',
    },
    frameworks: [
      {
        id: 'framework-15-1',
        title: 'The Opening Case: Myths United People',
        description: 'In ancient societies, myths explained reality and united people into functioning groups (identity, shared meaning, shared norms).',
        content: `In modern life we still need "myths" because they help us navigate purpose, belonging, transitions, mortality, and meaning.

Translation for business: Markets don't run on facts alone. They run on shared belief + shared interpretation. That's narrative.`,
      },
      {
        id: 'framework-15-2',
        title: 'Narrative as Economic Infrastructure (The Highway Model)',
        description: 'Identity, Meaning, Norms, Roles, Rituals, Symbols, Rites of passage.',
        content: `Identity (Who are we?) → reduces decision friction ("people like us do things like this")
Meaning (Why does this matter?) → increases endurance (people persist through difficulty)
Norms (How do we behave?) → reduces policing costs
Roles (Who is the hero / guide?) → clarifies authority and trust
Rituals (What do we do repeatedly?) → creates habit + loyalty
Symbols (robes, uniforms, logos, objects) → make the invisible visible
Rites of passage (joining, upgrading, graduating) → transforms customers into members

If you build this well, your marketing stops being "convincing" and starts being obvious.`,
      },
      {
        id: 'framework-15-3',
        title: 'Power of Myth: 3 Functions You\'re Stealing for Business',
        description: 'Myths create shared identity; give a framework for how to live; help face fear + meaning.',
        content: `A) MYTHS CREATE SHARED IDENTITY — Unify communities; separate "us" from "not us." Business: Your brand story should make the right people feel "This is for me. This is my world. These are my values."

B) MYTHS GIVE A FRAMEWORK FOR HOW TO LIVE — Myths + rituals guide life transitions. Business: Ritualizable moments—onboarding (initiation), first win (proof of transformation), leveling up (status), community recognition (belonging).

C) MYTHS HELP FACE FEAR + MEANING — Business: Address modern fears—wasting time, looking stupid, falling behind, being alone, not becoming who you could be. Narrative turns fear into motion.`,
      },
      {
        id: 'framework-15-4',
        title: 'StoryBrand: SB7 (The BrandScript)',
        description: 'Character → Problem → Guide → Plan → CTA → Failure → Success. Customer is the hero; enemy is confusion.',
        content: `A Character wants something → faces a Problem → meets a Guide → gets a Plan → receives a Call to Action → avoids Failure → achieves Success.

Core rules: Customer is the hero, not your brand. The enemy is confusion; clarity wins. Your message must be understood fast: (1) What do you offer? (2) How does it improve my life? (3) What do I do next?`,
      },
      {
        id: 'framework-15-5',
        title: 'Professor Notes (What You\'re Graded On)',
        description: 'Myth isn\'t fake. Myth is meaning technology.',
        content: `• Myth isn't "fake." Myth is meaning technology.
• Brands that win create shared identity + simple action.
• The goal is not to sound poetic. The goal is to be understood instantly.
• Clarity is a profit lever.`,
      },
      {
        id: 'framework-15-6',
        title: 'Narrative Integrity Kill-Switch',
        description: 'If your marketing would still make sense with your logo removed, you have story. If it becomes generic, you have slogans.',
        content: `If your marketing would still make sense with your logo removed, you have story.
If it becomes generic, you have slogans.`,
      },
    ],
    worksheets: [
      {
        id: 'worksheet-15-1',
        title: 'Myth Map (Economic Infrastructure Checklist)',
        description: 'Identity ("People like us…"). Villain (singular, real, relatable). Rituals. Symbols. Rites of passage.',
        fields: [
          { id: 'identity-we-are', label: 'Identity: We are the kind of people who ___', type: 'textarea', required: true },
          { id: 'identity-we-refuse', label: 'Identity: We refuse to ___', type: 'textarea', required: true },
          { id: 'identity-we-value', label: 'Identity: We value ___', type: 'textarea', required: true },
          { id: 'villain', label: 'Villain (singular, real, relatable)—e.g. noise, mediocrity, overwhelm, weak systems, junk fitness, scammy marketing', type: 'textarea', required: true },
          { id: 'ritual-daily', label: 'Ritual: Daily/weekly ritual (repeatable behavior that signals membership)', type: 'textarea', required: true },
          { id: 'ritual-first-win', label: 'Ritual: "First win" ritual', type: 'textarea', required: true },
          { id: 'ritual-community', label: 'Ritual: Community ritual', type: 'textarea', required: true },
          { id: 'symbol-visual', label: 'Symbol: Visual symbol', type: 'text', required: true },
          { id: 'symbol-language', label: 'Symbol: Language/phrase', type: 'text', required: true },
          { id: 'symbol-uniform', label: 'Symbol: "Uniform" (style/cues)', type: 'text', required: false },
          { id: 'rite-initiation', label: 'Rite of passage: Initiation (new member)', type: 'textarea', required: true },
          { id: 'rite-level-up', label: 'Rite of passage: Level-up', type: 'textarea', required: true },
          { id: 'rite-mastery', label: 'Rite of passage: Mastery badge', type: 'textarea', required: true },
        ],
        rules: ['Villain must be singular, relatable, real—not a feeling. Rituals create belonging + habit + loyalty.'],
      },
      {
        id: 'worksheet-15-2',
        title: 'BrandScript v1 (StoryBrand SB7)',
        description: 'Character, Want, Problem (external/internal/philosophical), Guide (empathy + authority), Plan (process + agreement), CTA (direct + transitional), Failure, Success, Transformation (From → To).',
        fields: [
          { id: 'character', label: 'Character: Who is the customer?', type: 'textarea', required: true },
          { id: 'want', label: 'Want: What do they want?', type: 'textarea', required: true },
          { id: 'problem-external', label: 'Problem: External', type: 'textarea', required: true },
          { id: 'problem-internal', label: 'Problem: Internal', type: 'textarea', required: true },
          { id: 'problem-philosophical', label: 'Problem: Philosophical', type: 'textarea', required: true },
          { id: 'guide-empathy', label: 'Guide: "We understand how it feels to ___"', type: 'textarea', required: true },
          { id: 'guide-authority', label: 'Guide: Authority proof (testimonial/stat/award/logos)', type: 'textarea', required: true },
          { id: 'plan-process', label: 'Plan: Process (3 steps max)', type: 'textarea', required: true },
          { id: 'plan-agreement', label: 'Plan: Agreement (guarantees/values)', type: 'textarea', required: true },
          { id: 'cta-direct', label: 'Call to Action: Direct CTA', type: 'text', required: true },
          { id: 'cta-transitional', label: 'Call to Action: Transitional CTA', type: 'text', required: true },
          { id: 'failure', label: 'Failure: If they don\'t act, what happens?', type: 'textarea', required: true },
          { id: 'success', label: 'Success: After they act, what life looks like', type: 'textarea', required: true },
          { id: 'transformation', label: 'Transformation: From ___ → To ___', type: 'textarea', required: true },
        ],
        rules: ['Customer is the hero. Guide (you) has empathy + authority. Message: What do you offer? How does it improve my life? What do I do next?'],
      },
      {
        id: 'worksheet-15-3',
        title: '5-Second Website Test',
        description: 'In 5 seconds a stranger must answer: (1) What do you offer? (2) How will it make my life better? (3) What do I do next? If any answer is fuzzy: you need a better story, not better ads.',
        fields: [
          { id: 'test-offer', label: '5-sec test: What do you offer? (one line)', type: 'text', required: true },
          { id: 'test-benefit', label: '5-sec test: How will it make my life better? (one line)', type: 'text', required: true },
          { id: 'test-cta', label: '5-sec test: What do I do next? (one line)', type: 'text', required: true },
          { id: 'pass-fail', label: 'Does your current site pass? (Yes/No + what to fix)', type: 'textarea', required: false },
        ],
        rules: ['If any answer is fuzzy: you don\'t need better ads. You need a better story.'],
      },
      {
        id: 'worksheet-15-4',
        title: 'Learning Data & Writing Prompts',
        description: 'Store: industry/offer type, customer hero archetype, villain type, primary internal problem, CTAs, transformation From→To, ritual, rites of passage. Prompts: Myth identity, Villain + stakes, Transformation.',
        fields: [
          { id: 'hero-archetype', label: 'Customer hero archetype', type: 'select', required: false, options: ['Achiever', 'Overwhelmed', 'Beginner', 'Elite', 'Injured', 'Other'] },
          { id: 'villain-type', label: 'Villain type', type: 'select', required: false, options: ['Confusion', 'Mediocrity', 'Inertia', 'Bad info', 'Scammy industry', 'Overwhelm', 'Weak systems', 'Other'] },
          { id: 'transformation-from-to', label: 'Transformation: From ___ → To ___', type: 'textarea', required: false },
          { id: 'one-liner', label: '1-liner (Character + Problem + Plan + Success)', type: 'textarea', required: false },
        ],
        rules: ['Use prompts: "We are for people who ___." "The real enemy isn\'t ___. It\'s ___." "From ___ to ___."'],
      },
    ],
    coldCall: {
      question: 'Explain why narrative is economic infrastructure, not marketing fluff—using one example from myth and one from business.',
      timeLimit: 90,
      semanticCriteria: { noHedging: true },
      penalty: 5,
    },
    redTeam: {
      question: 'Stress-test your narrative: (1) Is your brand accidentally making itself the hero? (2) Is your villain just a feeling instead of a root cause? (3) Is your message too complex (multiple offers, CTAs, heroes)? (4) Are you promising "success" without defining it concretely? (5) Does your story create status, belonging, or transformation—or none? Narrative integrity: If your marketing would still make sense with your logo removed, you have story. If it becomes generic, you have slogans.',
      checks: [
        { type: 'consistency', field1: 'requiredOutputs.myth-map', field2: 'requiredOutputs.brandscript', condition: 'aligned', message: 'Myth Map (identity, villain, rituals) and BrandScript (hero, guide, plan) must align—customer is hero, villain is singular.' },
      ],
    },
    boardLens: 'Board-ready: Myth Map (identity, villain, rituals, symbols, rites of passage). BrandScript v1 (SB7: character, problem, guide, plan, CTA, failure, success, transformation). 5-second test pass (offer / benefit / next step). Cold call: narrative reduces coordination costs; myth example (identity + ritual); business example (hero/guide + CTA); result = faster decisions + loyalty + WTP.',
    requiredOutputs: [
      { id: 'myth-map', label: 'Myth Map: Identity ("people like us…"), Villain (singular, real), Rituals (daily, first win, community), Symbols, Rites of passage (initiation, level-up, mastery)', type: 'text', placeholder: 'Identity / Villain / Rituals / Symbols / Rites.' },
      { id: 'brandscript', label: 'BrandScript v1 (StoryBrand SB7): Character, Want, Problem (3 levels), Guide (empathy + authority), Plan, CTA (direct + transitional), Failure, Success, Transformation (From → To)', type: 'text', placeholder: 'SB7 complete. Customer = hero.' },
      { id: 'five-second-test', label: '5-second test: Stranger can answer—What do you offer? How will it make my life better? What do I do next? (Pass/fail + fix if needed)', type: 'text', placeholder: 'Offer / Benefit / Next step. Pass or what to fix.' },
    ],
    professorNotes: {
      whatStudentsGetWrong: 'Make the brand the hero; villain is vague or just a feeling; message too complex; multiple offers/CTAs/heroes; "success" undefined; story creates neither status nor belonging nor transformation.',
      whatAplusSmellsLike: 'Customer is hero. Villain singular and relatable. Myth Map (identity, villain, rituals, symbols, rites). BrandScript v1 with SB7. 5-second test pass. Narrative reduces coordination costs; one myth example; one business example.',
      theTrap: 'The trap is "we need better copy." If your marketing would still make sense with your logo removed, you have story. If it becomes generic, you have slogans. Clarity is a profit lever.',
    },
    sampleAnswers: {
      strong: {
        text: 'Narrative reduces coordination costs—trust + shared meaning let people decide faster and stick. Myth example: ancient myths created shared identity and rituals that united communities ("people like us do this"). Business example: our brand story makes the customer the hero, us the guide; we offer one clear plan and one direct CTA, so they know what we offer, how it improves their life, and what to do next. Result: faster decisions, loyalty, and willingness to pay. (1. Coordination costs 2. Myth example 3. Business example 4. Result.)',
        why: 'A-level cold call: (1) Narrative reduces coordination costs (trust + shared meaning), (2) Myth example (identity + ritual + norms), (3) Business example (brand story clarifies hero/guide + CTA), (4) Result = faster decisions + loyalty + WTP.',
      },
      weak: {
        text: 'Narrative is important for branding. We tell a good story.',
        whyFails: 'No coordination-cost logic. No myth example. No business example. No result. "Important" and "good story" are not economic infrastructure.',
      },
    },
    legitimacyLens: {
      whoCouldAttack: 'Who could say your narrative is generic (slogans) or your brand is the hero instead of the customer?',
      whatLooksExploitative: 'What would make your story look like manipulation rather than meaning?',
      implicitPromise: 'What promise are you making with your narrative (identity, transformation, belonging)?',
    },
    readingCompanion: {
      essentials: {
        canon: { title: 'The Power of Myth', author: 'Joseph Campbell', coreIdea: 'Myths create shared identity, give a framework for how to live, help face fear and meaning. Narrative is meaning technology—identity, rituals, norms, rites of passage. Myths united people; brands do it for markets.', whyMatters: 'Markets run on shared belief + shared interpretation. Narrative reduces friction; friction is cost.' },
        counterpoint: { title: 'Building a StoryBrand', author: 'Donald Miller', coreIdea: 'SB7: Character wants something → Problem → Guide (you) → Plan → CTA → Failure → Success. Customer is the hero; enemy is confusion. Message: What do you offer? How does it improve my life? What do I do next?', whyMatters: 'StoryBrand is the economic version of myth—same psychology, tuned for buying decisions.' },
        operatorArtifact: { title: 'Myth Map + BrandScript + 5-Second Test', description: 'Identity, villain, rituals, symbols, rites. SB7. Offer / benefit / next step in 5 seconds.' },
      },
      keyIdeas: ['Narrative is infrastructure: coordination, trust, identity, collective action. Myths for civilizations; brands for markets.', 'Identity, Meaning, Norms, Roles, Rituals, Symbols, Rites of passage = economic infrastructure. Build well → marketing becomes obvious.', 'Power of Myth: shared identity, framework for how to live, face fear + meaning. Ritualizable moments: onboarding, first win, level-up, community recognition.', 'StoryBrand: Customer = hero. Guide = you (empathy + authority). Clarity wins. What do you offer? How does it improve my life? What do I do next?', 'Villain = singular, relatable, real (not a feeling). If marketing makes sense with logo removed = story. If generic = slogans.'],
      listenScript: 'Narrative is not decoration. It\'s infrastructure. Myth isn\'t fake—myth is meaning technology. Clarity is a profit lever.',
      applyPrompt: 'Explain why narrative is economic infrastructure—one example from myth, one from business. Result: coordination, trust, faster decisions, loyalty, WTP.',
      booksList: [
        { id: 'm15-canon', title: 'The Power of Myth', author: 'Joseph Campbell', type: 'canon' },
        { id: 'm15-counterpoint', title: 'Building a StoryBrand', author: 'Donald Miller', type: 'counterpoint' },
        { id: 'm15-artifact', title: 'Myth Map + BrandScript', type: 'artifact' },
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
