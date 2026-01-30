/**
 * Post-module quizzes: key concepts from Ivy-style syllabi (HBS, Wharton, Stanford).
 * One quiz per module; 2–4 multiple choice questions each.
 */

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  rationale?: string;
}

export interface ModuleQuiz {
  moduleId: string;
  title: string;
  questions: QuizQuestion[];
}

export const moduleQuizzes: ModuleQuiz[] = [
  {
    moduleId: 'module-1',
    title: 'Market Reality & 5Cs',
    questions: [
      {
        id: 'q1-1',
        question: 'In the Operator 5Cs, the Company question that actually matters is:',
        options: [
          'What is our mission statement?',
          'What advantage do we have that cannot be copied fast enough to matter?',
          'Who are our main competitors?',
          'What is our revenue target?',
        ],
        correctIndex: 1,
        rationale: 'Strategy begins with defensible advantage, not mission or revenue.',
      },
      {
        id: 'q1-2',
        question: 'Jobs-to-Be-Done emphasizes that customers:',
        options: [
          'Buy products for features.',
          'Hire products to make progress.',
          'Choose the cheapest option.',
          'Follow brand loyalty.',
        ],
        correctIndex: 1,
        rationale: 'Customers hire solutions to make progress on a job; features serve that job.',
      },
      {
        id: 'q1-3',
        question: 'A common operator mistake in the Customer C is:',
        options: [
          'Asking "would you use this?" instead of "what did you last pay for?"',
          'Segmenting by demographics only.',
          'Ignoring churn.',
          'Focusing on NPS.',
        ],
        correctIndex: 0,
        rationale: 'Revealed preference (what they paid for) beats stated preference.',
      },
      {
        id: 'q1-4',
        question: 'The Customer Job Stack (Functional / Emotional / Social / Risk) is used to:',
        options: [
          'Segment customers by demographics.',
          'Map the layers of jobs the customer is hiring for—concrete outcome, internal state, signaling, and what to avoid.',
          'Prioritize features by engineering effort.',
          'Set pricing tiers.',
        ],
        correctIndex: 1,
        rationale: 'Jobs-to-Be-Done layers: functional (outcome), emotional (relief/confidence), social (status/signaling), risk (failure/regret to avoid).',
      },
      {
        id: 'q1-5',
        question: 'Copyability in the Advantage Decomposition table refers to:',
        options: [
          'How easy it is to copy marketing copy.',
          'How expensive or slow it would be for a competitor to replicate your advantage.',
          'Patent strength only.',
          'Brand recognition.',
        ],
        correctIndex: 1,
        rationale: 'Copyability combines time to replicate, founder dependency, and replication cost—not just IP.',
      },
    ],
  },
  {
    moduleId: 'module-2',
    title: 'Structural Attractiveness',
    questions: [
      {
        id: 'q2-1',
        question: "Porter's Five Forces assess:",
        options: [
          'Brand strength and awareness.',
          'Structural attractiveness of an industry.',
          'Customer satisfaction scores.',
          'Marketing spend efficiency.',
        ],
        correctIndex: 1,
        rationale: 'Five Forces frame industry structure: rivalry, buyers, suppliers, substitutes, new entrants.',
      },
      {
        id: 'q2-2',
        question: 'A great strategy in a bad market is:',
        options: [
          'Still a good investment with execution.',
          'Still a bad investment.',
          'Good for short-term gains.',
          'Dependent on market size.',
        ],
        correctIndex: 1,
        rationale: 'Structure constrains outcomes; some markets punish excellence.',
      },
      {
        id: 'q2-3',
        question: 'Buyer power in Five Forces is high when:',
        options: [
          'There are few buyers and switching costs are low.',
          'Buyers are fragmented and your product is undifferentiated.',
          'Buyers are concentrated, purchase large volumes, or can backward-integrate.',
          'Suppliers have more leverage than buyers.',
        ],
        correctIndex: 2,
        rationale: 'Buyer power rises with concentration, volume, and threat of vertical integration.',
      },
    ],
  },
  {
    moduleId: 'module-3',
    title: 'Value Chain & Activity',
    questions: [
      {
        id: 'q3-1',
        question: 'Strategic activities in the value chain are those that:',
        options: [
          'Cost the most.',
          'Differentiate and are hard to copy.',
          'Are outsourced.',
          'Have the most headcount.',
        ],
        correctIndex: 1,
        rationale: 'Strategy focuses on activities that create and sustain advantage.',
      },
    ],
  },
  {
    moduleId: 'module-4',
    title: 'Positioning & Segmentation',
    questions: [
      {
        id: 'q4-1',
        question: 'Defining an "anti-customer" helps:',
        options: [
          'Maximize total addressable market.',
          'Clarify who you are willing to disappoint.',
          'Reduce ad spend.',
          'Simplify pricing.',
        ],
        correctIndex: 1,
        rationale: 'Strategy requires choice; you cannot serve everyone well.',
      },
    ],
  },
  {
    moduleId: 'module-5',
    title: 'Value Wedge & WTP',
    questions: [
      {
        id: 'q5-1',
        question: 'The value wedge is the gap between:',
        options: [
          'Revenue and costs.',
          'Customer willingness-to-pay and your cost to serve.',
          'List price and discount.',
          'CAC and LTV.',
        ],
        correctIndex: 1,
        rationale: 'WTP minus cost is where margin and strategy live.',
      },
    ],
  },
  {
    moduleId: 'p2-module-1',
    title: 'Psychology & Perceived Value',
    questions: [
      {
        id: 'qp2-1-1',
        question: 'Anchoring in pricing works because:',
        options: [
          'Customers always choose the middle option.',
          'First numbers frame subsequent judgments.',
          'Discounts increase perceived quality.',
          'Price has no psychological effect.',
        ],
        correctIndex: 1,
        rationale: 'Anchors set reference points; later choices are evaluated relative to them.',
      },
    ],
  },
  {
    moduleId: 'p3-module-1',
    title: 'Unit Economics',
    questions: [
      {
        id: 'qp3-1-1',
        question: 'Contribution margin per unit is:',
        options: [
          'Revenue minus all fixed costs.',
          'Price minus variable cost per unit.',
          'LTV minus CAC.',
          'Gross margin minus OpEx.',
        ],
        correctIndex: 1,
        rationale: 'Contribution margin = price - variable cost; it funds fixed costs and profit.',
      },
    ],
  },
];

/** Get quiz for a module; may be undefined if no quiz defined yet. */
export function getQuizForModule(moduleId: string): ModuleQuiz | undefined {
  return moduleQuizzes.find((q) => q.moduleId === moduleId);
}
