/**
 * Case Method Immersion (HBS-style): messy context, single decision, no "do both."
 */

export type CaseMode = 'my-company' | 'case';

export interface UnitEconomicsSnapshot {
  grossMarginPct: number;
  cac: number;
  ltv: number;
  paybackMonths: number;
  churnMonthlyPct?: number;
}

export interface CustomerSegment {
  id: string;
  name: string;
  sizeOrShare: string;
  characteristics: string;
}

export interface ChannelMixItem {
  channel: string;
  sharePct: number;
  notes?: string;
}

export interface CompetitiveMapItem {
  name: string;
  type: 'direct' | 'substitute';
  threatLevel: 1 | 2 | 3 | 4 | 5;
  notes?: string;
}

export interface OrgChartRole {
  role: string;
  incentiveSummary: string;
  vetoAbility: boolean;
}

export interface BoardPressure {
  runwayMonths?: number;
  revenueTarget?: string;
  investorExpectations: string;
}

export interface CaseExhibit {
  id: string;
  label: string; // "Exhibit A", "Exhibit B", etc.
  title: string;
  type: 'chart' | 'table' | 'matrix' | 'narrative';
  content: string; // markdown or structured description
  data?: Record<string, unknown>; // for tables/charts
}

export interface CasePack {
  id: string;
  company_name: string;
  industry: string;
  time_period: string;
  unit_economics_snapshot: UnitEconomicsSnapshot;
  customer_segments: CustomerSegment[];
  channel_mix: ChannelMixItem[];
  competitive_map: CompetitiveMapItem[];
  org_chart: OrgChartRole[];
  board_pressure: BoardPressure;
  constraints: string[]; // legal, ops, brand, supply
  decision_deadline: string;
  decision_prompt: string;
  exhibits: CaseExhibit[];
  /** Module-specific: forces one segmentation, one channel bet, one position, one pricing stance. */
  single_decision_prompt?: string;
}
