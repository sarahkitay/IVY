import type { CasePack } from '@/types/case';

/**
 * Case Method Immersion: one full case with exhibits.
 * Exhibits: A = market/segment, B = unit economics, C = competitor matrix.
 */
export const casePacks: CasePack[] = [
  {
    id: 'case-velocity-d2c',
    company_name: 'Velocity',
    industry: 'D2C / Performance Apparel',
    time_period: 'Q3 2022',
    unit_economics_snapshot: {
      grossMarginPct: 52,
      cac: 94,
      ltv: 312,
      paybackMonths: 14,
      churnMonthlyPct: 4.2,
    },
    customer_segments: [
      { id: 's1', name: 'Serious runners (marathon+)', sizeOrShare: '~25% of revenue', characteristics: 'High LTV, low churn, price-insensitive, care about performance data.' },
      { id: 's2', name: 'Casual fitness', sizeOrShare: '~45% of revenue', characteristics: 'Largest volume, moderate LTV, churn sensitive to brand and fit.' },
      { id: 's3', name: 'Gift / one-time', sizeOrShare: '~30% of revenue', characteristics: 'Low repeat, high CAC if acquired as first purchase; often gifter segment.' },
    ],
    channel_mix: [
      { channel: 'Paid social (Meta/TikTok)', sharePct: 55, notes: 'CAC rising 40% YoY.' },
      { channel: 'Influencer / affiliates', sharePct: 25 },
      { channel: 'Email / retargeting', sharePct: 12 },
      { channel: 'Organic / community', sharePct: 8 },
    ],
    competitive_map: [
      { name: 'Nike / Adidas (mass)', type: 'direct', threatLevel: 5, notes: 'Brand and distribution; we win on fit and data.' },
      { name: 'On / Hoka (premium run)', type: 'direct', threatLevel: 4 },
      { name: 'Lululemon (cross-over)', type: 'substitute', threatLevel: 3 },
      { name: 'Generic Amazon brands', type: 'substitute', threatLevel: 2, notes: 'Price pressure on casual segment.' },
    ],
    org_chart: [
      { role: 'CEO', incentiveSummary: 'Growth + path to profitability', vetoAbility: true },
      { role: 'CFO', incentiveSummary: 'Payback and margin; skeptical of brand spend', vetoAbility: true },
      { role: 'Head of Growth', incentiveSummary: 'Top-of-funnel and CAC', vetoAbility: false },
      { role: 'Head of Product', incentiveSummary: 'Retention and NPS', vetoAbility: false },
    ],
    board_pressure: {
      runwayMonths: 18,
      revenueTarget: '2x in 24 months',
      investorExpectations: 'Next round contingent on payback &lt; 18 months and clear path to 60%+ gross margin.',
    },
    constraints: [
      'No change to product roadmap before next board meeting.',
      'Brand guidelines limit discounting below 20% off.',
      'Supply chain: 90-day lead time on new SKUs.',
    ],
    decision_deadline: 'Board meeting in 6 weeks.',
    decision_prompt: 'You must choose one primary bet: (1) Double down on serious runners and accept lower volume, (2) Shift mix toward casual fitness with a new retention play, or (3) Reduce CAC by cutting paid social and betting on community/organic. You cannot recommend "do both." What is your single decision and why?',
    single_decision_prompt: 'One segmentation bet, one channel bet, one position. No "do both."',
    exhibits: [
      {
        id: 'ex-a',
        label: 'Exhibit A',
        title: 'Market / Segment Overview',
        type: 'chart',
        content: 'Revenue by segment (last 12 months): Serious runners 25%, Casual fitness 45%, Gift/one-time 30%. LTV by segment: Serious $480, Casual $260, Gift $95. CAC by segment: Serious $110, Casual $88, Gift $120.',
      },
      {
        id: 'ex-b',
        label: 'Exhibit B',
        title: 'Unit Economics Snapshot',
        type: 'table',
        content: 'Gross margin 52%. CAC $94. LTV $312. Payback 14 months. Monthly churn 4.2%. Contribution margin per order (after variable costs) $41.',
      },
      {
        id: 'ex-c',
        label: 'Exhibit C',
        title: 'Competitor / Substitute Matrix',
        type: 'matrix',
        content: 'Direct: Nike/Adidas (threat 5), On/Hoka (4). Substitute: Lululemon (3), Amazon brands (2). Key differentiator for Velocity: fit + run data integration; under pressure from premium run brands on one side and price on the other.',
      },
    ],
  },
];

export function getCasePackById(id: string): CasePack | undefined {
  return casePacks.find((c) => c.id === id);
}
