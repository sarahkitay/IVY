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
  /** If true, missing this question marks module "concept incomplete"; must retake and get it right to advance. */
  disqualifier?: boolean;
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
        rationale: 'Strategy begins with defensible advantage, not mission or revenue. This is the gate question: if you miss it, concept incomplete.',
        disqualifier: true,
      },
      {
        id: 'q1-2',
        question: 'A founder claims their advantage is "speed and execution." What is the most likely failure mode if this is untrue?',
        options: [
          'Brand awareness will lag.',
          'Advantage will decay with scale, or better-capitalized competitors will replicate and out-execute.',
          'Pricing will be too low.',
          'Customer support will suffer.',
        ],
        correctIndex: 1,
        rationale: 'Speed/execution is not defensible; it decays with scale and is replicated by well-funded competitors. Strategy requires something that cannot be copied fast enough.',
      },
      {
        id: 'q1-3',
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
        id: 'q1-4',
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
        id: 'q1-5',
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
        id: 'q1-6',
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
      {
        id: 'q1-7',
        question: 'The Competitor C in the Operator 5Cs asks "Who benefits if we fail?"—not just "Who competes with us?" because:',
        options: [
          'Investors want to see a competitive matrix.',
          'Real competition includes inaction, substitutes, and budget reallocation—not just direct rivals.',
          'Porter\'s Five Forces require a competitor list.',
          'Brand positioning depends on it.',
        ],
        correctIndex: 1,
        rationale: 'Competition is broader: status quo, spreadsheets, adjacent spend. Who benefits when you fail?',
      },
      {
        id: 'q1-8',
        question: 'Why does "diagnosis before strategy" matter (Good Strategy / Bad Strategy)?',
        options: [
          'It sounds more academic.',
          'Without naming the real constraint, every downstream decision (branding, pricing, hiring) is decoration.',
          'Boards require a diagnosis section.',
          'It lengthens the strategy document.',
        ],
        correctIndex: 1,
        rationale: 'Strategy is diagnosis + guiding policy + coherent action. Skipping diagnosis makes tactics arbitrary.',
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
      {
        id: 'q2-4',
        question: 'Why define competitors by job, not category (Substitute-First 5 Forces)?',
        options: [
          'Category labels are easier for investors.',
          'Customers hire for a job; substitutes are anything that satisfies that job—including "do nothing."',
          'Porter did not mention jobs.',
          'Category boundaries are legally required.',
        ],
        correctIndex: 1,
        rationale: 'Competition is defined by the job; substitutes and inaction are often the real rivals.',
      },
      {
        id: 'q2-5',
        question: 'If industry structure is hostile (Five Forces score high), what typically happens to excellent execution?',
        options: [
          'It always wins.',
          'It delays failure but does not reverse structure.',
          'It matters more than structure.',
          'Investors ignore structure.',
        ],
        correctIndex: 1,
        rationale: 'Profitability is created by structure; execution in a hostile structure only delays failure.',
      },
      {
        id: 'q2-6',
        question: 'Threat of substitutes is high when:',
        options: [
          'There are no alternatives.',
          'Customers can satisfy the same job with a different category or inaction at low switching cost.',
          'Suppliers are concentrated.',
          'Rivalry is low.',
        ],
        correctIndex: 1,
        rationale: 'Substitutes constrain price and share; "do nothing" or adjacent spend are often the substitute.',
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
      {
        id: 'q3-2',
        question: '"Most advantages live inside boring activities." If you cannot point to a specific choke point, you:',
        options: [
          'Have a strong brand.',
          'Do not have a defensible advantage.',
          'Need more marketing.',
          'Have a pricing advantage.',
        ],
        correctIndex: 1,
        rationale: 'Advantage lives in specific activities; if you can\'t name the choke point, you don\'t have one.',
      },
      {
        id: 'q3-3',
        question: 'The Value Chain Kill Point artifact asks:',
        options: [
          'Where are our offices?',
          'Where does margin or leverage actually accumulate in the chain?',
          'What is our CAC?',
          'How many SKUs do we have?',
        ],
        correctIndex: 1,
        rationale: 'Kill point = where advantage or margin concentrates; everything else can be commoditized.',
      },
      {
        id: 'q3-4',
        question: 'Why can value chain strength become a liability (Innovator\'s Dilemma)?',
        options: [
          'It never does.',
          'Incumbents optimize the wrong chain when the job or technology shifts; strength becomes rigidity.',
          'Chains are always flexible.',
          'Only startups have this problem.',
        ],
        correctIndex: 1,
        rationale: 'Optimizing the current chain can blind incumbents to disruptive job or tech shifts.',
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
      {
        id: 'q4-2',
        question: '"If your positioning doesn\'t repel anyone, it isn\'t positioning." This means:',
        options: [
          'You should offend some people on purpose.',
          'Clear positioning excludes segments; no exclusion = no clarity.',
          'Repulsion is a metric.',
          'Positioning is the same as targeting.',
        ],
        correctIndex: 1,
        rationale: 'Positioning through exclusion: who you are not for is as important as who you are for.',
      },
      {
        id: 'q4-3',
        question: 'The Exclusion Statement artifact ("We are not for ___, even if it costs growth") forces:',
        options: [
          'Larger TAM.',
          'Trade-off discipline: naming who you will not serve.',
          'Higher prices only.',
          'More features.',
        ],
        correctIndex: 1,
        rationale: 'Exclusion is the test of positioning; growth at the cost of clarity destroys advantage.',
      },
      {
        id: 'q4-4',
        question: 'Obviously Awesome (April Dunford) reframes positioning as:',
        options: [
          'Mission statement first.',
          'Context-setting: who it\'s for, what category, why now—not just tagline.',
          'Demographics only.',
          'Competitive feature matrix.',
        ],
        correctIndex: 1,
        rationale: 'Positioning is context: category, who, why now; repeatable process, not one-time tagline.',
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
      {
        id: 'q5-2',
        question: '"Value creation without value capture is charity." So pricing must:',
        options: [
          'Be as low as possible.',
          'Capture willingness-to-pay; otherwise value leaks.',
          'Match competitors only.',
          'Ignore cost.',
        ],
        correctIndex: 1,
        rationale: 'Strategy requires capturing value; pricing is the primary capture mechanism.',
      },
      {
        id: 'q5-3',
        question: 'The WTP Ladder (cheapest acceptable → painful → no-brainer) helps:',
        options: [
          'Set one price only.',
          'Frame where you sit on perceived value and how to move toward no-brainer.',
          'Eliminate tiers.',
          'Ignore willingness-to-pay.',
        ],
        correctIndex: 1,
        rationale: 'WTP ladder maps perceived value; strategy is moving offer toward no-brainer.',
      },
      {
        id: 'q5-4',
        question: 'Monetizing Innovation (price before you build) argues:',
        options: [
          'Build first, price later.',
          'Willingness-to-pay should inform what you build; building then pricing leaves money on the table or kills products.',
          'Price is irrelevant until launch.',
          'Only enterprise uses this.',
        ],
        correctIndex: 1,
        rationale: 'Price before build reduces waste and aligns product with what customers will pay.',
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
      {
        id: 'qp2-1-2',
        question: 'Loss aversion (losing $100 hurts ~2× more than gaining $100 feels good) implies:',
        options: [
          'Bonuses outperform discounts.',
          'Discounts and loss-framing often outperform pure gain-framing.',
          'Price has no effect on emotion.',
          'Only B2B is affected.',
        ],
        correctIndex: 1,
        rationale: 'Loss aversion drives churn prevention and framing; discounts remove loss.',
      },
      {
        id: 'qp2-1-3',
        question: 'Mental accounting means:',
        options: [
          'All dollars are equal to customers.',
          'Customers bucket money (e.g. "habit" vs "investment"); same price in different buckets gets different reactions.',
          'Accounting is only for finance teams.',
          'Price transparency eliminates buckets.',
        ],
        correctIndex: 1,
        rationale: 'Mental buckets (daily spend vs investment) change willingness to pay for the same number.',
      },
      {
        id: 'qp2-1-4',
        question: '"Free" works psychologically mainly because:',
        options: [
          'It saves the most money.',
          'It removes downside/risk; the brain overweights zero risk.',
          'Customers don\'t value free things.',
          'Only for commodities.',
        ],
        correctIndex: 1,
        rationale: 'Free is about loss elimination and zero risk, not just savings.',
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
      {
        id: 'qp3-1-2',
        question: 'CAC (Customer Acquisition Cost) should include:',
        options: [
          'Only paid media.',
          'Paid media, creative, sales commission, onboarding labor, promotions, attribution—everything to make the sale real.',
          'Only sales commission.',
          'Only onboarding.',
        ],
        correctIndex: 1,
        rationale: 'Understated CAC makes every scaling decision wrong; Wharton standard is full cost to acquire.',
      },
      {
        id: 'qp3-1-3',
        question: 'Payback period (vs LTV:CAC ratio) matters more in early stage because:',
        options: [
          'Ratios are illegal.',
          'Cash survival; revenue payback ≠ margin payback—scale can still kill you if margin payback is delayed.',
          'LTV doesn\'t exist.',
          'CAC doesn\'t matter.',
        ],
        correctIndex: 1,
        rationale: 'Cash and time to recover matter when capital is constrained; ratio alone can hide cash death.',
      },
      {
        id: 'qp3-1-4',
        question: 'Unit economics reveal whether growth:',
        options: [
          'Is always good.',
          'Compounds or bleeds; weak unit economics make growth destructive.',
          'Is only a marketing problem.',
          'Does not need to be measured.',
        ],
        correctIndex: 1,
        rationale: 'Growth on bad unit economics destroys value; unit economics are the grammar of scaling.',
      },
    ],
  },
];

/** Get quiz for a module; may be undefined if no quiz defined yet. */
export function getQuizForModule(moduleId: string): ModuleQuiz | undefined {
  return moduleQuizzes.find((q) => q.moduleId === moduleId);
}
