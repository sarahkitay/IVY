/**
 * Anonymized peer memos for Studio Mode.
 * Users critique 2 peers using the same rubric dimensions as the Strategy Note.
 */

import type { PeerCritiqueDimension } from '@/types';

export interface PeerMemoSample {
  id: string;
  title: string;
  /** Strategy Note–style memo text (anonymized). */
  memoText: string;
}

export interface PeerCritiqueDimensionConfig {
  id: PeerCritiqueDimension;
  label: string;
  hint: string;
}

export const STUDIO_PEER_SAMPLES: PeerMemoSample[] = [
  {
    id: 'peer-a',
    title: 'Peer memo A',
    memoText: `## Strategy Note (Anonymized)

**Thesis:** We should focus on the SMB segment because they have higher willingness to pay for time-saving tools and our product reduces admin time by 40% in early pilots.

**Evidence:**
- Pilot with 12 SMBs showed 40% reduction in admin hours because we automated their inventory and ordering.
- Churn in SMB cohort is 8% monthly vs 14% for enterprise because implementation is faster and stickier.
- Sales cycle is 3 weeks for SMB vs 6+ months for enterprise because we don't need legal or procurement.

**Tradeoffs:**
- We are not pursuing enterprise this year; we give up deal size for speed and retention.
- We are not building custom integrations; we give up some feature requests for a single workflow that works.

**Risks:**
- SMBs could consolidate and we lose accounts to acquisition.
- If CAC rises above $400, our unit economics break; we're dependent on organic and referrals.

**Mitigations:**
- We're building multi-location support so acquired SMBs can roll up into one contract.
- We're locking in a 12-month payback; if CAC exceeds that we'll cut paid acquisition and double down on community.

**Decision:** We will allocate 100% of sales and marketing to SMB through Q4 and reassess LTV:CAC in January.

**What would you do Monday?** Shift all paid spend from broad keywords to "inventory software for [vertical]" and launch the first vertical-specific landing page.`,
  },
  {
    id: 'peer-b',
    title: 'Peer memo B',
    memoText: `## Strategy Note (Anonymized)

**Thesis:** Our main bet is that restaurants will pay for a single platform that handles ordering, menu updates, and delivery aggregation instead of using 4–5 separate tools.

**Evidence:**
- We have 200 paying locations; 60% came from word of mouth because operators tell each other when something saves time.
- Our NPS is 52 in the cohort that uses all three modules because the integration reduces errors and support tickets.
- Competitors either do one thing (e.g. just delivery) or are legacy POS; we're the only integrated modern stack in our target segment.

**Tradeoffs:**
- We're not going after QSR or chains yet; we give up scale for focus on independents and small chains (2–10 locations).
- We're not building white-label; we give up some enterprise interest for a single brand and roadmap.

**Risks:**
- If one of the big delivery platforms bundles our functionality, we could get commoditized.
- If recession hits, independents may cut software first; we're the last line item before labor.

**Mitigations:**
- We're locking in annual contracts and positioning as "cost of doing business" not "nice to have."
- We're adding a revenue-share module so we're aligned with their top line, not just a cost.

**Decision:** We will double down on the 2–10 location segment, add one more integration (payments), and not pursue enterprise or white-label until we hit 1,000 locations.

**What would you do Monday?** Ship the payments integration beta to 20 locations and set a 30-day decision: if adoption is above 70%, we scale; if not, we deprioritize.`,
  },
];

export const PEER_CRITIQUE_DIMENSIONS: PeerCritiqueDimensionConfig[] = [
  { id: 'thesisClarity', label: 'Thesis clarity', hint: 'Is the central claim specific and testable?' },
  { id: 'evidenceStrength', label: 'Evidence strength', hint: 'Does evidence link to the thesis with "because"?' },
  { id: 'tradeoffHonesty', label: 'Tradeoff honesty', hint: 'Does it name what they are not doing?' },
  { id: 'riskAcknowledgment', label: 'Risk acknowledgment', hint: 'Are real risks named without hedging?' },
  { id: 'actionability', label: 'Actionability', hint: 'Is the decision and Monday test clear?' },
];
