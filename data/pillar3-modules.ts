import { Module } from '@/types';

export const pillar3Modules: Module[] = [
  {
    id: 'p3-module-1',
    pillar: 'pillar-3',
    title: 'Unit Economics & Value Capture Modeling',
    thesis: 'Growth without unit economics is not strategy — it is subsidized delusion. If I scale this business by 10×, do I become wealthier or poorer?',
    whyExists: {
      academic: 'Wharton Lens: Can This Business Scale Without Lying to Itself?',
      operator: 'Every other growth tactic is downstream of unit economics. Most startups collapse because they optimize Gross LTV while ignoring Contribution LTV.',
    },
    frameworks: [
      {
        id: 'p3-framework-1-1',
        title: 'LTV Is Not a Single Number',
        description: 'At Wharton, Lifetime Value is taught as a range — not a point estimate.',
        content: `Type | What It Answers | Used For
Gross LTV | How much revenue a customer generates | Vision / topline
Contribution LTV | How much profit they generate | Scaling decisions
Cash LTV | How much cash they return over time | Survival

Most startups collapse because they optimize Gross LTV while ignoring Contribution LTV.`,
      },
      {
        id: 'p3-framework-1-2',
        title: 'CAC Is Not Just Ads',
        description: 'Customer Acquisition Cost must include everything required to make the sale real.',
        content: `Included in CAC (Wharton standard):
- Paid media
- Creative production
- Sales commissions
- Onboarding labor
- Discounts / promotions
- Attribution tooling costs

If CAC is understated, every downstream decision is wrong.`,
      },
      {
        id: 'p3-framework-1-3',
        title: 'Payback Period > LTV:CAC (In Early Stage)',
        description: 'Elite investors care less about ratios and more about time.',
        content: `Cash payback determines whether you can survive volatility.

There are two payback clocks:
- Revenue Payback (cash-in)
- Margin Payback (profit-in)

You must know both.`,
      },
    ],
    worksheets: [
      {
        id: 'p3-worksheet-1-1',
        title: 'Unit Economics Truth Table',
        description: 'Which variable destroys the business fastest — and which saves it?',
        fields: [
          { id: 'current-cac', label: 'Current CAC', type: 'number', required: true },
          { id: 'current-aov', label: 'Current AOV', type: 'number', required: true },
          { id: 'current-gm', label: 'Current Gross Margin %', type: 'number', required: true },
          { id: 'current-retention', label: 'Current Monthly Retention %', type: 'number', required: true },
        ],
      },
    ],
    coldCall: {
      question: 'You can increase conversion by 15% using discounts, or increase retention by 10% by improving onboarding. Which do you choose — and why?',
      timeLimit: 90,
      semanticCriteria: {
        noHedging: true,
        minLength: 30,
      },
      penalty: 5,
    },
    redTeam: {
      question: 'Your LTV assumes customers behave perfectly forever. Why should we believe this model won\'t collapse in six months?',
      checks: [],
    },
    boardLens: 'Revenue payback ≠ safety. If revenue payback is immediate but margin payback is delayed, scale can still kill you.',
    requiredOutputs: [
      { id: 'ltv-calculation', label: 'Verified LTV calculation (contribution margin)', type: 'number' },
      { id: 'payback-period', label: 'Payback period (months)', type: 'number' },
      { id: 'sensitivity-analysis', label: 'Sensitivity analysis identifying which variable breaks first', type: 'text' },
      { id: 'cac-inflation-scenario', label: 'CAC inflation scenario (+25%, +50%)', type: 'text' },
    ],
    order: 1,
  },
  {
    id: 'p3-module-2',
    pillar: 'pillar-3',
    title: 'Instrumentation & Data Foundations',
    thesis: 'What data do we need to make decisions without lying to ourselves?',
    whyExists: {
      academic: 'Stanford Systems Lens: Data hygiene, event taxonomy, metric integrity.',
      operator: 'Most teams accidentally game numbers because they don\'t define what they\'re measuring. Elite teams instrument before they optimize.',
    },
    frameworks: [
      {
        id: 'p3-framework-2-1',
        title: 'Event Taxonomy',
        description: 'Events map to: view → intent → conversion → retention',
        content: `Every event must answer:
- What happened?
- Who did it?
- When did it happen?
- What context matters?

Without taxonomy, data becomes noise.`,
      },
      {
        id: 'p3-framework-2-2',
        title: 'North Star Metric vs Supporting Metrics',
        description: 'One metric that matters, many metrics that support it.',
        content: `North Star Metric:
- Reflects customer value
- Leads revenue
- Is hard to game

Supporting metrics explain why the North Star moves.`,
      },
    ],
    worksheets: [
      {
        id: 'p3-worksheet-2-1',
        title: 'Event Spec Sheet',
        description: 'Define events that matter for decision-making.',
        fields: [
          { id: 'event-name', label: 'Event Name', type: 'text', required: true },
          { id: 'trigger-condition', label: 'Trigger Condition', type: 'textarea', required: true },
          { id: 'properties-captured', label: 'Properties Captured', type: 'textarea', required: true },
          { id: 'owner', label: 'Owner', type: 'text', required: true },
          { id: 'downstream-use', label: 'Expected Downstream Use', type: 'textarea', required: true },
        ],
      },
    ],
    requiredOutputs: [
      { id: 'event-taxonomy', label: 'Customer Journey Data Map (events + properties + tools)', type: 'text' },
      { id: 'north-star-metric', label: 'North Star Metric definition', type: 'text' },
    ],
    order: 2,
  },
  {
    id: 'p3-module-3',
    pillar: 'pillar-3',
    title: 'Attribution, Incrementality & Causal Truth',
    thesis: 'Correlation makes dashboards look good. Causation keeps companies alive. Which marketing actions actually caused incremental revenue?',
    whyExists: {
      academic: 'Columbia / Wharton Lens: Attribution is taught as a finance problem, not a marketing one.',
      operator: 'Most companies fail because attribution models reward activity, not impact. Teams optimize what is easiest to measure.',
    },
    frameworks: [
      {
        id: 'p3-framework-3-1',
        title: 'Attribution ≠ Causation',
        description: 'Attribution answers "Which touchpoints appeared?" Causation answers "Would this have happened without marketing?"',
        content: `Model | What It Does Well | Where It Lies
Last Click | Simple, cheap | Over-credits bottom funnel
First Click | Values discovery | Ignores persuasion
Linear | Feels fair | Treats unequal actions equally
MTA | Pattern recognition | Confuses correlation for causation

Ivy Insight: MTA explains behavior. It does not prove impact.`,
      },
      {
        id: 'p3-framework-3-2',
        title: 'Incrementality: The Only Truth That Matters',
        description: 'Incrementality asks the counterfactual: What happens when we deliberately do nothing?',
        content: `Test Types:
1. Geo Holdout Tests (show ads in Region A, suppress in Region B)
2. User Holdouts (randomly suppress ads for subset)
3. PSA / Ghost Ads (replace ads with neutral content)

If you are not willing to accept the result before the test runs, do not run it.`,
      },
      {
        id: 'p3-framework-3-3',
        title: 'iROAS — Incremental Return on Ad Spend',
        description: 'This is the metric CFOs trust.',
        content: `iROAS = Incremental Revenue / Incremental Spend

Example:
- Spend: $100,000
- Observed Revenue: $400,000
- Control Revenue: $280,000
- Incremental Revenue: $120,000
- iROAS: 1.2

Anything below 1.0 is value destruction.`,
      },
    ],
    worksheets: [
      {
        id: 'p3-worksheet-3-1',
        title: 'Incrementality Test Design',
        description: 'If you are not willing to accept the result before the test runs, do not run it.',
        fields: [
          { id: 'channel-tested', label: 'Channel Tested', type: 'text', required: true },
          { id: 'control-group', label: 'Control Group', type: 'textarea', required: true },
          { id: 'duration', label: 'Duration', type: 'text', required: true },
          { id: 'success-metric', label: 'Success Metric', type: 'text', required: true },
          { id: 'guardrail-metric', label: 'Guardrail Metric', type: 'text', required: true },
        ],
      },
      {
        id: 'p3-worksheet-3-2',
        title: 'Attribution Truth Table',
        description: 'Separate correlation from causation.',
        fields: [
          { id: 'channel', label: 'Channel', type: 'text', required: true },
          { id: 'reported-roas', label: 'Reported ROAS', type: 'number', required: true },
          { id: 'incremental-lift', label: 'Incremental Lift', type: 'number', required: true },
          { id: 'decision', label: 'Decision (Keep/Kill/Test)', type: 'select', required: true, options: ['Keep', 'Kill', 'Test'] },
        ],
      },
    ],
    coldCall: {
      question: 'Your attribution model says Channel A is unprofitable. Your incrementality test says killing it reduces revenue by 15%. What do you do — and what do you tell the board?',
      timeLimit: 90,
      semanticCriteria: { noHedging: true, minLength: 30 },
      penalty: 5,
    },
    redTeam: {
      question: 'If attribution is imperfect, why spend on top-of-funnel at all?',
      checks: [],
    },
    requiredOutputs: [
      { id: 'incrementality-test-plan', label: 'One incrementality test plan', type: 'text' },
      { id: 'channel-classification', label: 'One channel classification (creator vs capturer)', type: 'text' },
      { id: 'budget-reallocation', label: 'One budget reallocation decision backed by iROAS', type: 'text' },
      { id: 'risk-statement', label: 'One risk statement explaining uncertainty', type: 'text' },
    ],
    order: 3,
  },
  {
    id: 'p3-module-4',
    pillar: 'pillar-3',
    title: 'Funnels vs Growth Loops',
    thesis: 'Funnels spend money to acquire customers. Loops turn customers into growth infrastructure. If I stop increasing ad spend, does growth slow — or does it continue?',
    whyExists: {
      academic: 'Stanford GSB Lens: Growth as systems engineering, not marketing tactics.',
      operator: 'Funnels are linear. Loops are nonlinear. Linear systems require constant energy. Nonlinear systems compound once activated.',
    },
    frameworks: [
      {
        id: 'p3-framework-4-1',
        title: 'The Funnel (What Everyone Knows — and Why It Fails)',
        description: 'Funnels assume infinite demand, stable CAC, constant conversion rates. None of these are true at scale.',
        content: `Funnel Failure Modes:
1. CAC Inflation (marginal customers are always more expensive)
2. Audience Saturation (you exhaust high-intent buyers first)
3. Fragility (platform changes break the system overnight)

If revenue growth requires proportional spend growth, the system is brittle.`,
      },
      {
        id: 'p3-framework-4-2',
        title: 'The Growth Loop (What Actually Compounds)',
        description: 'A growth loop is a closed system where an action by a user increases the probability of another user entering.',
        content: `Loop Structure:
Trigger → Action → Reward → Investment → Trigger

Every loop must include:
- a trigger
- a user action
- a reward
- a stored investment (data, status, habit, content)

Without stored investment, there is no compounding.`,
      },
      {
        id: 'p3-framework-4-3',
        title: 'Types of Growth Loops',
        description: 'Viral, Retention, Content/SEO, Data Improvement',
        content: `1. Viral Loops: K-factor = Invites per user × Conversion rate
   If K > 1 → exponential growth

2. Retention Loops: Usage increases value, making exit costly

3. Content/SEO Loops: User activity creates discoverable assets

4. Data Improvement Loops: More users → better product → higher retention`,
      },
    ],
    worksheets: [
      {
        id: 'p3-worksheet-4-1',
        title: 'Loop Identification Audit',
        description: 'If you cannot name the stored investment, mark it FAKE.',
        fields: [
          { id: 'user-action', label: 'User Action', type: 'text', required: true },
          { id: 'result', label: 'Result', type: 'textarea', required: true },
          { id: 'stored-investment', label: 'Stored Investment', type: 'textarea', required: true },
          { id: 'loop-type', label: 'Loop Type', type: 'select', required: true, options: ['Viral', 'Retention', 'Content/SEO', 'Data Improvement'] },
          { id: 'real-or-fake', label: 'Real or Fake', type: 'select', required: true, options: ['Real', 'Fake'] },
        ],
      },
      {
        id: 'p3-worksheet-4-2',
        title: 'Growth Loop Design Canvas',
        description: 'Design one loop only. Multiple half-built loops = zero compounding.',
        fields: [
          { id: 'trigger', label: 'Trigger', type: 'textarea', required: true },
          { id: 'user-action', label: 'User Action', type: 'textarea', required: true },
          { id: 'immediate-reward', label: 'Immediate Reward', type: 'textarea', required: true },
          { id: 'stored-investment', label: 'Stored Investment', type: 'textarea', required: true },
          { id: 'metric', label: 'Metric', type: 'text', required: true },
        ],
      },
    ],
    coldCall: {
      question: 'You can build a referral loop or a retention loop this quarter — not both. Which do you choose, and what math supports that decision?',
      timeLimit: 90,
      semanticCriteria: { noHedging: true, minLength: 30 },
      penalty: 5,
    },
    redTeam: {
      question: 'Which of your "loops" still works if no new users arrive for 60 days?',
      checks: [],
    },
    requiredOutputs: [
      { id: 'primary-growth-loop', label: 'One primary growth loop', type: 'text' },
      { id: 'stored-investment', label: 'One stored investment per loop', type: 'text' },
      { id: 'loop-health-metric', label: 'One loop health metric', type: 'text' },
      { id: 'kill-criterion', label: 'One kill criterion (when to abandon it)', type: 'text' },
    ],
    order: 4,
  },
  {
    id: 'p3-module-5',
    pillar: 'pillar-3',
    title: 'Cohort Analysis & Retention Curves',
    thesis: 'Revenue tells you how loud the engine is. Retention tells you whether it\'s going anywhere. Are customers staying longer over time — and if not, why are we pretending growth matters?',
    whyExists: {
      academic: 'Harvard Business School Lens: A GM asks "Are the new users better than the old ones?" Cohorts answer these questions. Aggregates hide them.',
      operator: 'If retention does not improve by cohort, nothing else compounds.',
    },
    frameworks: [
      {
        id: 'p3-framework-5-1',
        title: 'Cohorts Reveal Learning (or the Absence of It)',
        description: 'If later cohorts do not outperform earlier cohorts, the business is not learning.',
        content: `Cohort Types:
- Month joined
- Acquisition channel
- Onboarding version
- Feature exposure

If a cohort does not lead to a decision, do not track it.`,
      },
      {
        id: 'p3-framework-5-2',
        title: 'The Retention Curve (The Shape That Determines Destiny)',
        description: 'Retention has a shape: Death Spiral, Smile Curve, or Rising Floor.',
        content: `1. Death Spiral: Retention declines steadily to zero
   Meaning: Customers do not receive lasting value

2. Smile Curve: Retention drops early, then flattens
   Meaning: You have product-market fit for a subset

3. Rising Floor: Each cohort flattens higher than the last
   Meaning: The business is learning. Enterprise value compounds.`,
      },
      {
        id: 'p3-framework-5-3',
        title: 'Churn Math (Why Small Improvements Matter More Than Growth)',
        description: 'A 2.5% reduction in churn doubles enterprise value.',
        content: `Average Lifetime (months) = 1 / Monthly Churn

Monthly Churn | Avg Lifetime
10% | 10 months
5% | 20 months
2.5% | 40 months

Small changes in churn have massive effects on LTV.`,
      },
      {
        id: 'p3-framework-5-4',
        title: 'Time to Value (TTV): The Silent Killer',
        description: 'The time between purchase and the customer\'s first felt win.',
        content: `Rule: If TTV > refund window, retention collapses.

Customers churn before they consciously decide to leave because:
- value arrives too late
- effort precedes reward
- progress is invisible`,
      },
    ],
    worksheets: [
      {
        id: 'p3-worksheet-5-1',
        title: 'Cohort Definition Audit',
        description: 'If a cohort does not lead to a decision, do not track it.',
        fields: [
          { id: 'cohort-type', label: 'Cohort Type', type: 'text', required: true },
          { id: 'why-it-matters', label: 'Why It Matters', type: 'textarea', required: true },
          { id: 'used-for', label: 'Used For', type: 'textarea', required: true },
        ],
      },
      {
        id: 'p3-worksheet-5-2',
        title: 'Retention Sensitivity Table',
        description: 'Which lever creates the most value with the least risk?',
        fields: [
          { id: 'current-churn', label: 'Current Monthly Churn %', type: 'number', required: true },
          { id: 'minus-2-churn', label: 'Churn -2%', type: 'number', required: true },
          { id: 'plus-2-churn', label: 'Churn +2%', type: 'number', required: true },
        ],
      },
      {
        id: 'p3-worksheet-5-3',
        title: 'Aha Moment Identification',
        description: 'Rank these by impact on retention.',
        fields: [
          { id: 'moment-1', label: 'Moment 1', type: 'text', required: true },
          { id: 'rank-1', label: 'Rank', type: 'number', required: true },
          { id: 'evidence-1', label: 'Evidence', type: 'textarea', required: true },
        ],
      },
    ],
    coldCall: {
      question: 'Your total revenue is up 40%, but Month-3 retention is down 8%. Do you declare victory or call a crisis?',
      timeLimit: 90,
      semanticCriteria: { noHedging: true, minLength: 20 },
      penalty: 5,
    },
    requiredOutputs: [
      { id: 'cohort-table', label: 'At least one cohort table', type: 'text' },
      { id: 'retention-curve-interpretation', label: 'One retention curve interpretation', type: 'text' },
      { id: 'churn-reduction-opportunity', label: 'One quantified churn reduction opportunity', type: 'text' },
      { id: 'month-3-intervention', label: 'One Month-3 intervention hypothesis', type: 'text' },
    ],
    order: 5,
  },
  {
    id: 'p3-module-6',
    pillar: 'pillar-3',
    title: 'Segmentation & Behavioral Data Science',
    thesis: 'Treating all customers equally is not fair — it is negligent. Which customers deserve more investment — and which must be constrained, automated, or quietly deprioritized?',
    whyExists: {
      academic: 'Yale / Wharton Lens: Segmentation is taught as capital allocation, risk management, enterprise value protection.',
      operator: 'Most companies overserve low-value customers, underserve high-value customers, then blame churn, CAC, or the market.',
    },
    frameworks: [
      {
        id: 'p3-framework-6-1',
        title: 'Value-Based Segmentation (Not Personas)',
        description: 'Personas are storytelling tools. Segmentation is an economic weapon.',
        content: `Segment | Description | Risk
Whales | Top 5–10% by LTV | Overdependence
Core | Profitable majority | Neglect
Marginal | Barely profitable | Cost sink
Unprofitable | Value destroyers | Brand erosion

Every business has all four — even luxury brands.`,
      },
      {
        id: 'p3-framework-6-2',
        title: 'RFM Analysis (Yale Behavioral Data Lens)',
        description: 'RFM is deceptively simple — and extremely powerful.',
        content: `Dimension | What It Predicts
Recency | Likelihood to return
Frequency | Habit formation
Monetary | Willingness to pay

Each customer receives a score (1–5) on each dimension.
This predicts future value, not past behavior.`,
      },
      {
        id: 'p3-framework-6-3',
        title: 'Differential Investment (The White-Glove Problem)',
        description: 'Only customers whose future value increases with service should receive it.',
        content: `White-glove services create:
- loyalty
- signaling
- retention

They also:
- increase cost
- attract the wrong segment
- create entitlement

Not everyone deserves convenience.`,
      },
    ],
    worksheets: [
      {
        id: 'p3-worksheet-6-1',
        title: 'RFM Segmentation Table',
        description: 'If two customers pay the same amount but have different RFM scores, they are not equal.',
        fields: [
          { id: 'customer-id', label: 'Customer ID', type: 'text', required: true },
          { id: 'recency-score', label: 'Recency (1-5)', type: 'number', required: true },
          { id: 'frequency-score', label: 'Frequency (1-5)', type: 'number', required: true },
          { id: 'monetary-score', label: 'Monetary (1-5)', type: 'number', required: true },
          { id: 'segment', label: 'Segment', type: 'select', required: true, options: ['Whale', 'Core', 'Marginal', 'Unprofitable'] },
        ],
      },
      {
        id: 'p3-worksheet-6-2',
        title: 'Service Tier Allocation',
        description: 'This table must feel uncomfortable — that\'s how you know it\'s honest.',
        fields: [
          { id: 'segment', label: 'Segment', type: 'select', required: true, options: ['Whale', 'Core', 'Marginal', 'Unprofitable'] },
          { id: 'service-level', label: 'Service Level', type: 'text', required: true },
          { id: 'justification', label: 'Justification', type: 'textarea', required: true },
          { id: 'kill-criteria', label: 'Kill Criteria', type: 'textarea', required: true },
        ],
      },
    ],
    coldCall: {
      question: 'You can only afford white-glove service for 15% of customers. Your CEO wants it to "feel fair." Who gets it — and why?',
      timeLimit: 90,
      semanticCriteria: { noHedging: true, minLength: 30 },
      penalty: 5,
    },
    redTeam: {
      question: 'A journalist discovers your white-glove service is only offered to a subset of customers. How do you defend this publicly without sounding exploitative?',
      checks: [],
    },
    requiredOutputs: [
      { id: 'value-segmentation', label: 'A value-based segmentation schema', type: 'text' },
      { id: 'rfm-scoring', label: 'An RFM scoring model', type: 'text' },
      { id: 'differential-service', label: 'A differential service plan', type: 'text' },
      { id: 'deprioritized-segment', label: 'One segment you intentionally deprioritize', type: 'text' },
    ],
    order: 6,
  },
  {
    id: 'p3-module-7',
    pillar: 'pillar-3',
    title: 'Experimentation & Causal Learning',
    thesis: 'Running experiments is easy. Learning the right thing is rare. How do we design experiments that permanently improve decision quality — not just metrics?',
    whyExists: {
      academic: 'Harvard / Stanford Lens: Experimentation is treated as organizational design, capital allocation, epistemology.',
      operator: 'Common failure modes: testing too many things at once, optimizing local metrics, stopping tests early, shipping "winners" that hurt long-term value.',
    },
    frameworks: [
      {
        id: 'p3-framework-7-1',
        title: 'Hypotheses Before Metrics',
        description: 'An experiment without a hypothesis is exploration, not learning.',
        content: `Hypothesis Structure:
If we change X for Y users, then Z will increase because mechanism.

If you cannot state the mechanism, you are guessing.`,
      },
      {
        id: 'p3-framework-7-2',
        title: 'Types of Experiments',
        description: 'Not all tests are equal.',
        content: `1. Optimization Tests: Small changes, known direction, short-term impact
   Risk: local maxima

2. Discovery Tests: Unknown outcome, tests behavior, often counterintuitive
   Risk: discomfort

3. Strategic Bets: High impact, irreversible or costly, must be rare
   Risk: existential

Elite teams label their tests correctly.`,
      },
      {
        id: 'p3-framework-7-3',
        title: 'Statistical Discipline (This Is Non-Optional)',
        description: 'Harvard teaches this brutally.',
        content: `Required Standards:
- Pre-define success metric
- Pre-define sample size
- Pre-define duration
- No peeking
- p-value < 0.05 (or Bayesian equivalent)

Stopping early is lying to yourself.`,
      },
    ],
    worksheets: [
      {
        id: 'p3-worksheet-7-1',
        title: 'Hypothesis Builder',
        description: 'If you cannot state the mechanism, you are guessing.',
        fields: [
          { id: 'change-x', label: 'Change (X)', type: 'text', required: true },
          { id: 'segment-y', label: 'Segment (Y)', type: 'text', required: true },
          { id: 'expected-outcome-z', label: 'Expected Outcome (Z)', type: 'textarea', required: true },
          { id: 'mechanism', label: 'Mechanism', type: 'textarea', required: true },
          { id: 'risk-if-wrong', label: 'Risk if Wrong', type: 'textarea', required: true },
        ],
      },
      {
        id: 'p3-worksheet-7-2',
        title: 'Experiment Spec Sheet',
        description: 'If you can\'t define kill criteria, you\'re emotionally invested.',
        fields: [
          { id: 'test-type', label: 'Test Type', type: 'select', required: true, options: ['Optimization', 'Discovery', 'Strategic Bet'] },
          { id: 'primary-metric', label: 'Primary Metric', type: 'text', required: true },
          { id: 'guardrail-metric', label: 'Guardrail Metric', type: 'text', required: true },
          { id: 'sample-size', label: 'Sample Size', type: 'number', required: true },
          { id: 'duration', label: 'Duration (days)', type: 'number', required: true },
          { id: 'ship-criteria', label: 'Ship Criteria', type: 'textarea', required: true },
          { id: 'kill-criteria', label: 'Kill Criteria', type: 'textarea', required: true },
        ],
      },
    ],
    coldCall: {
      question: 'You have one experiment slot this month. Do you test acquisition, activation, retention, or pricing?',
      timeLimit: 90,
      semanticCriteria: { noHedging: true, minLength: 30 },
      penalty: 5,
    },
    requiredOutputs: [
      { id: 'three-hypotheses', label: 'Three well-formed hypotheses', type: 'text' },
      { id: 'experiment-spec', label: 'One approved experiment spec', type: 'text' },
      { id: 'killed-experiment', label: 'One killed experiment', type: 'text' },
      { id: 'learning-memo', label: 'One learning memo', type: 'text' },
    ],
    order: 7,
  },
  {
    id: 'p3-module-8',
    pillar: 'pillar-3',
    title: 'Pricing, Promotions & Algorithmic Revenue Control',
    thesis: 'Price is not a number. Price is a behavioral control system. How do we extract maximum value from demand without training customers to wait, churn, or arbitrage us?',
    whyExists: {
      academic: 'Wharton / Oxford Lens: Pricing is taught as market design, incentive alignment, long-term expectation setting.',
      operator: 'Most businesses fail not because prices are "too high," but because discounts destroy reference price, promotions teach customers to delay.',
    },
    frameworks: [
      {
        id: 'p3-framework-8-1',
        title: 'Willingness to Pay Is a Distribution, Not a Point',
        description: 'Most teams price to the "average customer." The average customer does not exist.',
        content: `WTP Curve:
- Left tail: price-sensitive (will churn)
- Middle: flexible (can be nudged)
- Right tail: inelastic (will pay more than you think)

Elite pricing extracts surplus from the right tail without losing the middle.`,
      },
      {
        id: 'p3-framework-8-2',
        title: 'Price Elasticity (Oxford Economic Rigor)',
        description: 'Elasticity measures how sensitive demand is to price changes.',
        content: `Elasticity (Ed) = % Change in Quantity / % Change in Price

|Ed| > 1 → Elastic (price-sensitive)
|Ed| < 1 → Inelastic (price-insensitive)

Elite brands engineer inelastic demand.`,
      },
      {
        id: 'p3-framework-8-3',
        title: 'Promotions Are Demand Training (Not Revenue Tools)',
        description: 'Every promotion teaches customers something.',
        content: `Common lessons you don't want to teach:
- "Wait and it gets cheaper"
- "Full price is for suckers"
- "Urgency is fake"

Discounts should solve a problem — not create demand.`,
      },
      {
        id: 'p3-framework-8-4',
        title: 'Tiering as Segmentation (Not Upsell Theater)',
        description: 'Pricing tiers exist to separate WTP, allocate service levels, protect margins.',
        content: `Tier | Purpose
Entry | Remove risk
Core | Capture majority value
Premium | Extract surplus + signal status

The premium tier should:
- be chosen by a minority
- subsidize the rest
- anchor value perception`,
      },
    ],
    worksheets: [
      {
        id: 'p3-worksheet-8-1',
        title: 'Elasticity Estimation (Empirical)',
        description: 'If you have never tested price, your elasticity assumptions are fiction.',
        fields: [
          { id: 'price-change', label: 'Price Change %', type: 'number', required: true },
          { id: 'conversion-change', label: 'Conversion Change %', type: 'number', required: true },
          { id: 'estimated-elasticity', label: 'Estimated Elasticity', type: 'number', required: true },
          { id: 'interpretation', label: 'Interpretation', type: 'textarea', required: true },
        ],
      },
      {
        id: 'p3-worksheet-8-2',
        title: 'Tier Integrity Audit',
        description: 'If your premium tier is the most popular, it\'s underpriced.',
        fields: [
          { id: 'tier', label: 'Tier', type: 'select', required: true, options: ['Entry', 'Core', 'Premium'] },
          { id: 'percent-users', label: '% Users', type: 'number', required: true },
          { id: 'margin', label: 'Margin %', type: 'number', required: true },
          { id: 'strategic-role', label: 'Strategic Role', type: 'textarea', required: true },
        ],
      },
    ],
    coldCall: {
      question: 'Revenue is down 12%. CAC is up 18%. The CEO suggests a 20% discount "just to get through the quarter." Do you approve — and what alternative do you propose?',
      timeLimit: 90,
      semanticCriteria: { noHedging: true, minLength: 40 },
      penalty: 5,
    },
    requiredOutputs: [
      { id: 'elasticity-estimate', label: 'One elasticity estimate', type: 'text' },
      { id: 'promotion-never-run', label: 'One promotion you will never run', type: 'text' },
      { id: 'tier-redesign', label: 'One tier redesign', type: 'text' },
      { id: 'pricing-experiment', label: 'One pricing experiment with guardrails', type: 'text' },
    ],
    order: 8,
  },
  {
    id: 'p3-module-9',
    pillar: 'pillar-3',
    title: 'Retention Engineering & Habit Systems',
    thesis: 'How do we build behavior that persists?',
    whyExists: {
      academic: 'Stanford / Wharton Adjacent: Hook model, streaks, variable rewards, token economies.',
      operator: 'Retention is not about features — it\'s about habit formation and identity reinforcement.',
    },
    frameworks: [
      {
        id: 'p3-framework-9-1',
        title: 'Hook Model (Trigger/Action/Reward/Investment)',
        description: 'Every habit-forming product follows this cycle.',
        content: `1. Trigger: External (notification) or Internal (emotion)
2. Action: Simplest behavior in anticipation of reward
3. Variable Reward: What satisfies the craving
4. Investment: Stored value that improves with use

Without investment, there is no habit.`,
      },
      {
        id: 'p3-framework-9-2',
        title: 'Streaks + Endowed Progress',
        description: 'People value what they\'ve already invested in.',
        content: `Streaks create:
- identity reinforcement ("I'm someone who...")
- loss aversion (breaking streak feels like failure)
- social proof (visible commitment)

Endowed progress: showing partial completion increases completion rates.`,
      },
      {
        id: 'p3-framework-9-3',
        title: 'Retention ROI Model',
        description: 'If Month-3 retention rises by X%, enterprise value rises by Y.',
        content: `Example:
- Current Month-3 retention: 54%
- Target: 59% (+5%)
- LTV increase: ~20%
- Enterprise value multiplier: 1.2x

Small retention improvements compound into massive value.`,
      },
    ],
    worksheets: [
      {
        id: 'p3-worksheet-9-1',
        title: 'Milestone Ladder',
        description: 'Tie milestones to access rewards, not discounts.',
        fields: [
          { id: 'milestone-1', label: 'Milestone (e.g., 5k points)', type: 'text', required: true },
          { id: 'reward-1', label: 'Reward (access-based)', type: 'textarea', required: true },
          { id: 'milestone-2', label: 'Milestone 2', type: 'text', required: true },
          { id: 'reward-2', label: 'Reward 2', type: 'textarea', required: true },
        ],
      },
    ],
    requiredOutputs: [
      { id: 'hook-model-design', label: 'One hook model design', type: 'text' },
      { id: 'streak-mechanic', label: 'One streak or endowed progress mechanic', type: 'text' },
      { id: 'retention-roi-calculation', label: 'One retention ROI calculation', type: 'text' },
    ],
    order: 9,
  },
  {
    id: 'p3-module-10',
    pillar: 'pillar-3',
    title: 'The MarTech Stack as Strategy',
    thesis: 'What systems do we need, and what is wasted complexity?',
    whyExists: {
      academic: 'Operator + Board Lens: Warehouse vs CDP vs analytics vs automation.',
      operator: 'Minimum viable stack vs scale stack. Data governance & privacy basics. Vendor evaluation (build vs buy).',
    },
    frameworks: [
      {
        id: 'p3-framework-10-1',
        title: 'Minimum Viable Stack vs Scale Stack',
        description: 'Early stage needs different tools than growth stage.',
        content: `MVP Stack:
- Analytics (basic)
- Email automation
- Payment processing

Scale Stack:
- Data warehouse
- CDP
- Attribution platform
- Experimentation platform

Most teams over-invest early, under-invest later.`,
      },
      {
        id: 'p3-framework-10-2',
        title: 'Data Governance & Privacy Basics',
        description: 'GDPR, CCPA, and future regulations require discipline.',
        content: `Required:
- Consent management
- Data retention policies
- Right to deletion
- Audit trails

This is not optional. It is table stakes.`,
      },
      {
        id: 'p3-framework-10-3',
        title: 'Vendor Evaluation (Build vs Buy)',
        description: 'When to build, when to buy, when to wait.',
        content: `Build when:
- Core to differentiation
- Vendor lock-in is dangerous
- You have engineering capacity

Buy when:
- Commodity functionality
- Speed matters
- Maintenance is expensive

Wait when:
- Market is immature
- Requirements are unclear`,
      },
    ],
    worksheets: [
      {
        id: 'p3-worksheet-10-1',
        title: 'Stack Blueprint',
        description: 'Tools + responsibilities + costs.',
        fields: [
          { id: 'tool', label: 'Tool', type: 'text', required: true },
          { id: 'category', label: 'Category', type: 'select', required: true, options: ['Analytics', 'Automation', 'Storage', 'Attribution', 'Experimentation'] },
          { id: 'responsibility', label: 'Responsibility (who owns it)', type: 'text', required: true },
          { id: 'monthly-cost', label: 'Monthly Cost', type: 'number', required: true },
          { id: 'build-vs-buy', label: 'Build vs Buy', type: 'select', required: true, options: ['Build', 'Buy', 'Wait'] },
        ],
      },
    ],
    requiredOutputs: [
      { id: 'stack-blueprint', label: 'Stack blueprint (tools + responsibilities + costs)', type: 'text' },
      { id: 'governance-policy', label: 'One data governance policy', type: 'text' },
      { id: 'vendor-decision', label: 'One build vs buy decision', type: 'text' },
    ],
    order: 10,
  },
];

export const getPillar3ModuleById = (id: string): Module | undefined => {
  return pillar3Modules.find((m) => m.id === id);
};

export const getPillar3ModulesInOrder = (): Module[] => {
  return [...pillar3Modules].sort((a, b) => a.order - b.order);
};
