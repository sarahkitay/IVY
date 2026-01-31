import { Module } from '@/types';
import type { ReadingCompanion } from '@/types';

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
    professorNotes: {
      whatStudentsGetWrong: 'Students focus on features and benefits. They avoid naming the loss the customer fears or the mental bucket they are triggering. They treat pricing as a math problem.',
      whatAplusSmellsLike: 'One specific loss named in the customer\'s words. One mental bucket identified. One reframe from loss to safety. No generic "value" language.',
      theTrap: 'The trap is answering "What do they gain?" without answering "What do they fear losing?" Prospect theory says loss weighs twice as much as gain.',
    },
    sampleAnswers: {
      strong: { text: 'The loss they fear is "I will look incompetent if this fails in front of my team." We are triggering the "investment" bucket, not "daily spend." One reframe: "You are not buying software — you are removing the risk of a failed launch."', why: 'Names emotional loss, specifies mental bucket, reframes loss to safety.' },
      weak: { text: 'Our product has great value. Customers get a lot of benefits. We offer a free trial.', whyFails: 'No loss named, no bucket, no reframe. "Great value" is not behavioral economics.' },
    },
    legitimacyLens: {
      whoCouldAttack: 'Who could credibly say this framing manipulates rather than informs?',
      whatLooksExploitative: 'What would make loss-framing feel exploitative?',
      implicitPromise: 'What promise are we making implicitly when we reframe loss to safety?',
    },
    synthesisDisciplines: ['Behavioral economics', 'Psychology', 'Neuroscience', 'Consumer research'],
    readingCompanion: {
      essentials: {
        canon: { title: 'Competing Against Luck', author: 'Christensen et al.', coreIdea: 'Customers don\'t buy products. They hire solutions to make progress in a specific moment.', whyMatters: 'Jobs-to-be-done beats personas for explaining why people choose, stay, and pay.' },
        counterpoint: { title: 'Demand-Side Sales 101', author: 'Bob Moesta', coreIdea: 'Demand is created by progress, not messaging. Sales is helping people make the change they already want.', whyMatters: 'Creation is about triggering existing struggle, not inventing desire.' },
        operatorArtifact: { title: 'JTBD Stack', description: 'Functional → emotional → social → risk (all four required).' },
      },
      keyIdeas: ['Customers hire solutions to make progress, not to buy products.', 'Jobs are progress in a specific moment.', 'Functional, emotional, social, and risk layers all matter.'],
      listenScript: 'Customers don\'t buy products. They hire solutions to make progress in a specific moment.',
      booksList: [
        { id: 'p2m1-canon', title: 'Competing Against Luck', author: 'Christensen et al.', type: 'canon' },
        { id: 'p2m1-counterpoint', title: 'Demand-Side Sales 101', author: 'Bob Moesta', type: 'counterpoint' },
        { id: 'p2m1-artifact', title: 'JTBD Stack', type: 'artifact' },
      ],
    } as ReadingCompanion,
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
    professorNotes: { whatStudentsGetWrong: 'Students list features and justify price. They avoid naming the first comparison or controlling the frame. They treat anchoring as optional.', whatAplusSmellsLike: 'One primary anchor named. At least three price frames. One harmful comparison removed. One non-price anchor designed.', theTrap: 'The trap is debating "Is this price fair?" instead of "What is the first number they see?"' },
    sampleAnswers: { strong: { text: 'Our primary anchor is the annual contract from the incumbent; we reframe to $X/month and $Y per outcome. We removed the "vs. doing nothing" comparison by leading with "cost of inaction." Non-price anchor: "Used by 3 of the Fortune 10."', why: 'Names anchor, multiple frames, removed harmful comparison, non-price anchor.' }, weak: { text: 'Our price is competitive. We offer great value. Customers can choose monthly or annual.', whyFails: 'No anchor, no frame control, no harmful comparison removed.' } },
    legitimacyLens: { whoCouldAttack: 'Who could say this anchoring manipulates?', whatLooksExploitative: 'When would framing feel exploitative?', implicitPromise: 'What promise do we make by controlling the frame?' },
    synthesisDisciplines: ['Behavioral economics', 'Pricing', 'Consumer psychology'],
    readingCompanion: {
      essentials: {
        canon: { title: 'How We Decide', author: 'Jonah Lehrer', coreIdea: 'Decisions are emotional first; reason justifies. Demand spikes around moments of tension.', whyMatters: 'Demand is rarely continuous. It spikes around moments of tension.' },
        counterpoint: { title: 'Hooked', author: 'Nir Eyal', coreIdea: 'Habit-forming products use trigger, action, reward, investment. Moments of pull drive behavior.', whyMatters: 'Triggers make inaction feel unacceptable.' },
        operatorArtifact: { title: 'Trigger Timeline', description: 'What event makes inaction unacceptable.' },
      },
      keyIdeas: ['Demand is rarely continuous. It spikes around moments of tension.', 'Triggers make inaction unacceptable.', 'What event makes the buyer act now?'],
      listenScript: 'Demand is rarely continuous. It spikes around moments of tension.',
      booksList: [
        { id: 'p2m2-canon', title: 'How We Decide', author: 'Jonah Lehrer', type: 'canon' },
        { id: 'p2m2-counterpoint', title: 'Hooked', author: 'Nir Eyal', type: 'counterpoint' },
        { id: 'p2m2-artifact', title: 'Trigger Timeline', type: 'artifact' },
      ],
    } as ReadingCompanion,
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
    professorNotes: { whatStudentsGetWrong: 'Students describe demographics. They avoid naming the enemy, the ritual, or who this is not for. They confuse "target market" with tribe.', whatAplusSmellsLike: 'One tribe defined. One enemy or anti-identity. One ritual. One quiet status signal. One "not for" sentence.', theTrap: 'The trap is "everyone could use this." If no one is excluded, no one is included.' },
    sampleAnswers: { strong: { text: 'Tribe: operators who have been burned by vendor lock-in. Enemy: "enterprise IT that sells shelfware." Ritual: sharing war stories in Slack. Quiet signal: we never say "enterprise." This is not for teams that need a single throat to choke.', why: 'Tribe, enemy, ritual, signal, not-for.' }, weak: { text: 'Our target is B2B decision-makers. We serve mid-market and enterprise. Everyone benefits from our platform.', whyFails: 'No tribe, no enemy, no "not for."' } },
    legitimacyLens: { whoCouldAttack: 'Who could say this tribal framing excludes or harms?', whatLooksExploitative: 'When does identity-based marketing feel manipulative?', implicitPromise: 'What promise do we make about belonging?' },
    synthesisDisciplines: ['Anthropology', 'Social psychology', 'Identity'],
    readingCompanion: {
      essentials: {
        canon: { title: "The Innovator's Solution", author: 'Clayton Christensen', coreIdea: 'Incumbents are disrupted when they optimize for the wrong job. Switching costs and inertia define defensibility.', whyMatters: 'The biggest competitor is almost always "do nothing."' },
        counterpoint: { title: '7 Powers', author: 'Hamilton Helmer', coreIdea: 'Sustainable advantage requires a power that compounds. Switching costs are one such power.', whyMatters: 'Inertia is a moat when you design for it.' },
        operatorArtifact: { title: 'Inertia Map', description: 'Habit, fear, sunk cost, social exposure.' },
      },
      keyIdeas: ['The biggest competitor is almost always "do nothing."', 'Inertia: habit, fear, sunk cost, social exposure.', 'Switching costs define defensibility.'],
      listenScript: 'The biggest competitor is almost always "do nothing."',
      booksList: [
        { id: 'p2m3-canon', title: "The Innovator's Solution", author: 'Clayton Christensen', type: 'canon' },
        { id: 'p2m3-counterpoint', title: '7 Powers', author: 'Hamilton Helmer', type: 'counterpoint' },
        { id: 'p2m3-artifact', title: 'Inertia Map', type: 'artifact' },
      ],
    } as ReadingCompanion,
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
    professorNotes: { whatStudentsGetWrong: 'Students blame motivation. They avoid diagnosing Ability or Prompt. They add more copy instead of removing steps.', whatAplusSmellsLike: 'One highest-friction step named. One action removed or simplified. One default path. Improved prompt timing. Reduced cognitive load.', theTrap: 'The trap is "they need more motivation." Fogg says if Ability is zero, behavior is zero.' },
    sampleAnswers: { strong: { text: 'Highest friction: account creation before trial. We removed it — trial with email only. Default path: annual plan pre-selected. Prompt: email 2 days after first use. Cognitive load: cut form from 8 to 3 fields.', why: 'Friction named, action removed, default, prompt, cognitive load.' }, weak: { text: 'We have a great product. Users just need to sign up. We added a video to explain benefits.', whyFails: 'No friction diagnosis, no removal, no default or prompt.' } },
    legitimacyLens: { whoCouldAttack: 'Who could say reducing friction is dark pattern?', whatLooksExploitative: 'When does default design feel manipulative?', implicitPromise: 'What do we promise by making the path easier?' },
    synthesisDisciplines: ['Behavioral design', 'BJ Fogg', 'Friction', 'Ability'],
    readingCompanion: {
      essentials: {
        canon: { title: 'Thinking, Fast and Slow', author: 'Daniel Kahneman', coreIdea: 'System 1 is automatic and loss-averse; System 2 is effortful. People fear losses more than they desire gains.', whyMatters: 'People fear losses more than they desire gains.' },
        counterpoint: { title: 'Predictably Irrational', author: 'Dan Ariely', coreIdea: 'Behavior is systematic and context-dependent. Risk and loss aversion can be designed for.', whyMatters: 'Trust and risk reversal change willingness to act.' },
        operatorArtifact: { title: 'Risk Reversal Stack', description: 'Guarantees, proof, reversibility.' },
      },
      keyIdeas: ['People fear losses more than they desire gains.', 'Risk reversal: guarantees, proof, reversibility.', 'Trust reduces perceived loss.'],
      listenScript: 'People fear losses more than they desire gains.',
      booksList: [
        { id: 'p2m4-canon', title: 'Thinking, Fast and Slow', author: 'Daniel Kahneman', type: 'canon' },
        { id: 'p2m4-counterpoint', title: 'Predictably Irrational', author: 'Dan Ariely', type: 'counterpoint' },
        { id: 'p2m4-artifact', title: 'Risk Reversal Stack', type: 'artifact' },
      ],
    } as ReadingCompanion,
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
    professorNotes: { whatStudentsGetWrong: 'Students add options. They avoid choosing one default or removing decoys. They treat choice as neutral.', whatAplusSmellsLike: 'One intentional default. One decoy added or removed. Reduced options. Reordered flow. Asymmetrical effort.', theTrap: 'The trap is "more choice is better." Defaults and decoys drive most decisions.' },
    sampleAnswers: { strong: { text: 'Default: annual plan. Removed decoy tier; kept two clear options. Reduced from 5 to 2 plans. Reordered: outcome first, price second. Asymmetrical: cancel is one click; upgrade is highlighted.', why: 'Default, decoy, reduced options, reorder, asymmetrical.' }, weak: { text: 'We offer many plans so customers can choose. All options are clearly presented.', whyFails: 'No default, no decoy strategy, no reduction or reorder.' } },
    legitimacyLens: { whoCouldAttack: 'Who could say defaults or decoys manipulate?', whatLooksExploitative: 'When does choice architecture feel exploitative?', implicitPromise: 'What do we promise by how we order options?' },
    synthesisDisciplines: ['Choice architecture', 'Defaults', 'Behavioral economics'],
    readingCompanion: {
      essentials: {
        canon: { title: 'The Presentation of Self in Everyday Life', author: 'Erving Goffman', coreIdea: 'People perform identity. Many purchases are about who the buyer gets to be.', whyMatters: 'Many purchases are about who the buyer gets to be.' },
        counterpoint: { title: 'Status Anxiety', author: 'Alain de Botton', coreIdea: 'Status drives behavior; anxiety drives consumption. Signaling is central to choice.', whyMatters: 'Social identity and signaling shape WTP.' },
        operatorArtifact: { title: 'Identity Claim', description: 'What buying signals to others.' },
      },
      keyIdeas: ['Many purchases are about who the buyer gets to be.', 'Identity claim: what buying signals to others.', 'Status and belonging drive choice.'],
      listenScript: 'Many purchases are about who the buyer gets to be.',
      booksList: [
        { id: 'p2m5-canon', title: 'The Presentation of Self in Everyday Life', author: 'Erving Goffman', type: 'canon' },
        { id: 'p2m5-counterpoint', title: 'Status Anxiety', author: 'Alain de Botton', type: 'counterpoint' },
        { id: 'p2m5-artifact', title: 'Identity Claim', type: 'artifact' },
      ],
    } as ReadingCompanion,
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
    professorNotes: { whatStudentsGetWrong: 'Students optimize for efficiency. They skip peaks and endings. They treat experience as linear.', whatAplusSmellsLike: 'One intentional peak. One dignified ending. One ritual. One memory sentence. One meaningless step removed.', theTrap: 'The trap is "get them through fast." Peak-end rule says memory is peak + end.' },
    sampleAnswers: { strong: { text: 'Peak: first successful outcome (we surface it in 30 sec). Ending: summary + "What\'s next" (no dead stop). Ritual: weekly recap email. Memory sentence: "I got my first result in under a minute." Removed: thank-you page with no next step.', why: 'Peak, ending, ritual, memory sentence, removal.' }, weak: { text: 'We have a great onboarding. Users complete the flow quickly.', whyFails: 'No peak, no ending, no ritual, no memory sentence.' } },
    legitimacyLens: { whoCouldAttack: 'Who could say peak-end design manipulates memory?', whatLooksExploitative: 'When does experience design feel exploitative?', implicitPromise: 'What do we promise by how we end the experience?' },
    synthesisDisciplines: ['Peak-end rule', 'Experience design', 'Memory'],
    readingCompanion: {
      essentials: {
        canon: { title: 'The Strategy and Tactics of Pricing', author: 'Thomas Nagle et al.', coreIdea: 'Price is a strategic and psychological lever. It frames quality, risk, and status.', whyMatters: 'Price is never neutral. It frames quality, risk, and status.' },
        counterpoint: { title: 'Priceless', author: 'William Poundstone', coreIdea: 'Price perception is constructed. Context and anchors determine what feels fair.', whyMatters: 'Price meaning is designed, not discovered.' },
        operatorArtifact: { title: 'Price Meaning Test', description: 'What your price implies unintentionally.' },
      },
      keyIdeas: ['Price is never neutral. It frames quality, risk, and status.', 'Price meaning: what your price implies unintentionally.', 'Context determines what feels fair.'],
      listenScript: 'Price is never neutral. It frames quality, risk, and status.',
      booksList: [
        { id: 'p2m6-canon', title: 'The Strategy and Tactics of Pricing', author: 'Thomas Nagle et al.', type: 'canon' },
        { id: 'p2m6-counterpoint', title: 'Priceless', author: 'William Poundstone', type: 'counterpoint' },
        { id: 'p2m6-artifact', title: 'Price Meaning Test', type: 'artifact' },
      ],
    } as ReadingCompanion,
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
    professorNotes: { whatStudentsGetWrong: 'Students blend in. They avoid naming the norm they break or the contrast they create. They fear standing out.', whatAplusSmellsLike: 'One category norm to break. Camouflage or rebellion chosen. One deliberate contrast. One generic element removed. Trust validated.', theTrap: 'The trap is "we look like everyone else but better." Contrast is the only way to be seen.' },
    sampleAnswers: { strong: { text: 'Norm we break: "Enterprise software is gray and dense." We chose rebellion: editorial tone, no jargon. Contrast: human headlines vs. competitor PDFs. Removed: stock hero images. Validated: trust score unchanged in testing.', why: 'Norm, choice, contrast, removal, validation.' }, weak: { text: 'We have a modern design. We stand out with better UX.', whyFails: 'No norm, no contrast, no validation.' } },
    legitimacyLens: { whoCouldAttack: 'Who could say contrast is deceptive?', whatLooksExploitative: 'When does standing out feel manipulative?', implicitPromise: 'What do we promise by breaking the norm?' },
    synthesisDisciplines: ['Category design', 'Contrast', 'Differentiation'],
    readingCompanion: {
      essentials: {
        canon: { title: 'Marketing Management', author: 'Kotler et al.', coreIdea: 'Value is created and captured in the customer\'s perception. Delivered value must translate into perceived value.', whyMatters: 'Value only exists in the customer\'s perception.' },
        counterpoint: { title: 'Obviously Awesome', author: 'April Dunford', coreIdea: 'Positioning is context-setting. Value translation: feature → outcome → belief.', whyMatters: 'Features don\'t sell; outcomes and beliefs do.' },
        operatorArtifact: { title: 'Value Translation Map', description: 'Feature → outcome → belief.' },
      },
      keyIdeas: ['Value only exists in the customer\'s perception.', 'Value translation: feature → outcome → belief.', 'Delivered value must become perceived value.'],
      listenScript: 'Value only exists in the customer\'s perception.',
      booksList: [
        { id: 'p2m7-canon', title: 'Marketing Management', author: 'Kotler et al.', type: 'canon' },
        { id: 'p2m7-counterpoint', title: 'Obviously Awesome', author: 'April Dunford', type: 'counterpoint' },
        { id: 'p2m7-artifact', title: 'Value Translation Map', type: 'artifact' },
      ],
    } as ReadingCompanion,
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
    professorNotes: { whatStudentsGetWrong: 'Students lead with features and benefits. They avoid limbic language. They over-explain.', whatAplusSmellsLike: 'One emotional driver. Headline in limbic language. CTA without buy/get. One rational explanation removed. Copy confirmed respectful.', theTrap: 'The trap is "we need to explain why." Limbic system decides before reason engages.' },
    sampleAnswers: { strong: { text: 'Driver: relief from overwhelm. Headline: "Stop juggling. Start knowing." CTA: "See your numbers in one place." Removed: "Our algorithm uses 50+ data points." Confirmed: user testing, no guilt or shame language.', why: 'Driver, limbic headline, CTA, removal, respectful.' }, weak: { text: 'We help teams be more productive. Get started today. Our platform has many features.', whyFails: 'No driver, no limbic, rational-heavy.' } },
    legitimacyLens: { whoCouldAttack: 'Who could say emotional copy manipulates?', whatLooksExploitative: 'When does limbic language feel exploitative?', implicitPromise: 'What do we promise emotionally?' },
    synthesisDisciplines: ['Limbic system', 'Copywriting', 'Emotional drivers'],
    readingCompanion: {
      essentials: {
        canon: { title: 'The Paradox of Choice', author: 'Barry Schwartz', coreIdea: 'More choices increase anxiety and decision paralysis. Too many choices feels like risk.', whyMatters: 'Too many choices feels like risk.' },
        counterpoint: { title: 'Nudge', author: 'Thaler & Sunstein', coreIdea: 'Choice architecture shapes behavior without removing freedom. Defaults and framing matter.', whyMatters: 'Decision path: clicks, choices, drop-off points.' },
        operatorArtifact: { title: 'Decision Path Audit', description: 'Clicks, choices, drop-off points.' },
      },
      keyIdeas: ['Too many choices feels like risk.', 'Decision path audit: clicks, choices, drop-off points.', 'Choice architecture shapes behavior.'],
      listenScript: 'Too many choices feels like risk.',
      booksList: [
        { id: 'p2m8-canon', title: 'The Paradox of Choice', author: 'Barry Schwartz', type: 'canon' },
        { id: 'p2m8-counterpoint', title: 'Nudge', author: 'Thaler & Sunstein', type: 'counterpoint' },
        { id: 'p2m8-artifact', title: 'Decision Path Audit', type: 'artifact' },
      ],
    } as ReadingCompanion,
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
    professorNotes: { whatStudentsGetWrong: 'Students explain everything. They use loud signals. They fear excluding anyone.', whatAplusSmellsLike: 'One insider cue (unexplained). One loud signal removed. One restraint-based signal. Wrong customers excluded. Right customers recognized.', theTrap: 'The trap is "we need to be clear for everyone." Inconspicuous status is for insiders only.' },
    sampleAnswers: { strong: { text: 'Insider cue: "Series A and beyond" (no definition). Removed: badge "Trusted by 500+ companies." Added: minimal footer, no logos. Wrong excluded: no freemium. Right recognized: invite-only community mention.', why: 'Cue, removal, restraint, exclusion, recognition.' }, weak: { text: 'We are the premium choice. Trusted by many. Clear value proposition.', whyFails: 'No insider cue, loud signals, no exclusion.' } },
    legitimacyLens: { whoCouldAttack: 'Who could say insider cues are exclusionary?', whatLooksExploitative: 'When does quiet status feel elitist?', implicitPromise: 'What do we promise by not explaining?' },
    synthesisDisciplines: ['Inconspicuous consumption', 'Status', 'Signaling'],
    readingCompanion: {
      essentials: {
        canon: { title: 'Atomic Habits', author: 'James Clear', coreIdea: 'Habits are cue, action, reward, reinforcement. Retention is behavior design, not reminders.', whyMatters: 'Retention is behavior design, not reminders.' },
        counterpoint: { title: 'Hooked', author: 'Nir Eyal', coreIdea: 'Habit-forming products use trigger, action, variable reward, investment. One-off use vs habit is design.', whyMatters: 'Habit loop: cue → action → reward → reinforcement.' },
        operatorArtifact: { title: 'Habit Loop', description: 'Cue → action → reward → reinforcement.' },
      },
      keyIdeas: ['Retention is behavior design, not reminders.', 'Habit loop: cue → action → reward → reinforcement.', 'One-off use vs habit is design.'],
      listenScript: 'Retention is behavior design, not reminders.',
      booksList: [
        { id: 'p2m9-canon', title: 'Atomic Habits', author: 'James Clear', type: 'canon' },
        { id: 'p2m9-counterpoint', title: 'Hooked', author: 'Nir Eyal', type: 'counterpoint' },
        { id: 'p2m9-artifact', title: 'Habit Loop', type: 'artifact' },
      ],
    } as ReadingCompanion,
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
    professorNotes: { whatStudentsGetWrong: 'Students use scarcity and urgency. They avoid "not for" or buyer-perspective reread. They optimize for conversion over trust.', whatAplusSmellsLike: 'One pressure tactic removed. One clarity explanation. One explicit exclusion. Reread from buyer. Relationship feels mutual.', theTrap: 'The trap is "we need to convert." Legitimacy requires clarity and exclusion.' },
    sampleAnswers: { strong: { text: 'Removed: "Only 3 left" countdown. Added: "How we make money" section. Exclusion: "Not for teams under 5." Reread: "Would I feel sold or informed?" Mutual: no auto-enroll, clear cancel.', why: 'Removal, clarity, exclusion, reread, mutual.' }, weak: { text: 'We use best practices. Our copy is clear. We have high conversion.', whyFails: 'No removal, no exclusion, no buyer perspective.' } },
    legitimacyLens: { whoCouldAttack: 'Who could say our copy is extractive?', whatLooksExploitative: 'When does conversion copy cross the line?', implicitPromise: 'What do we promise about the relationship?' },
    synthesisDisciplines: ['Legitimacy', 'Trust', 'Ethical persuasion'],
    readingCompanion: {
      essentials: {
        canon: { title: 'The Loyalty Effect', author: 'Frederick Reichheld', coreIdea: 'Churn is usually emotional before it is functional. Last meaningful win before churn matters.', whyMatters: 'Most churn is emotional before it is functional.' },
        counterpoint: { title: 'Lean Analytics', author: 'Alistair Croll & Benjamin Yoskovitz', coreIdea: 'Cohort and behavior data reveal why people leave. Silent failure: no single moment, slow drift.', whyMatters: 'Silent failure map: last meaningful win before churn.' },
        operatorArtifact: { title: 'Silent Failure Map', description: 'Last meaningful win before churn.' },
      },
      keyIdeas: ['Most churn is emotional before it is functional.', 'Silent failure map: last meaningful win before churn.', 'Why people quietly leave.'],
      listenScript: 'Most churn is emotional before it is functional.',
      booksList: [
        { id: 'p2m10-canon', title: 'The Loyalty Effect', author: 'Frederick Reichheld', type: 'canon' },
        { id: 'p2m10-counterpoint', title: 'Lean Analytics', author: 'Alistair Croll & Benjamin Yoskovitz', type: 'counterpoint' },
        { id: 'p2m10-artifact', title: 'Silent Failure Map', type: 'artifact' },
      ],
    } as ReadingCompanion,
    order: 10,
  },
  // Pillar II modules 11–15 (reading spine from syllabus)
  {
    id: 'p2-module-11',
    pillar: 'pillar-2',
    title: 'Trust Transfer & Social Proof',
    thesis: 'Borrowed trust often converts better than earned trust. Social proof and proof hierarchy shape choice.',
    whyExists: {
      academic: 'Yale Moral Psychology × Trust Research',
      operator: 'Elite brands use proof hierarchy: peer > expert > brand > claim.',
    },
    frameworks: [{ id: 'p2-framework-11-1', title: 'Proof Hierarchy', description: 'Peer > expert > brand > claim.', content: 'Borrowed trust often converts better than earned trust.' }],
    worksheets: [{ id: 'p2-worksheet-11-1', title: 'Proof Hierarchy', description: 'Map your proof sources.', fields: [{ id: 'proof-source', label: 'Proof Source', type: 'text', required: true }] }],
    requiredOutputs: [{ id: 'proof-hierarchy', label: 'Proof hierarchy for your offer', type: 'text' }],
    professorNotes: { whatStudentsGetWrong: 'Students list testimonials. They avoid ordering proof (peer > expert > brand > claim). They treat proof as additive.', whatAplusSmellsLike: 'One proof hierarchy: peer, expert, brand, claim. Ordered and justified.', theTrap: 'The trap is "more proof is better." Hierarchy matters more than volume.' },
    sampleAnswers: { strong: { text: 'Peer: "3 of 5 in my cohort use this." Expert: G2/Forrester. Brand: logos only for consideration. Claim: last. We lead with peer.', why: 'Hierarchy ordered and justified.' }, weak: { text: 'We have great reviews and case studies. Customers love us.', whyFails: 'No hierarchy, no order.' } },
    legitimacyLens: { whoCouldAttack: 'Who could say our proof is misleading?', whatLooksExploitative: 'When does proof feel manipulative?', implicitPromise: 'What do we promise by the proof we show?' },
    synthesisDisciplines: ['Social proof', 'Influence', 'Cialdini'],
    readingCompanion: {
      essentials: {
        canon: { title: 'Influence', author: 'Robert Cialdini', coreIdea: 'Social proof, authority, scarcity, and reciprocity drive compliance. Borrowed trust converts.', whyMatters: 'Borrowed trust often converts better than earned trust.' },
        counterpoint: { title: 'Alchemy', author: 'Rory Sutherland', coreIdea: 'Perception and framing create value. Proof is constructed, not discovered.', whyMatters: 'Proof hierarchy: peer > expert > brand > claim.' },
        operatorArtifact: { title: 'Proof Hierarchy', description: 'Peer > expert > brand > claim.' },
      },
      keyIdeas: ['Borrowed trust often converts better than earned trust.', 'Proof hierarchy: peer > expert > brand > claim.', 'Social proof shapes choice.'],
      listenScript: 'Borrowed trust often converts better than earned trust.',
      booksList: [
        { id: 'p2m11-canon', title: 'Influence', author: 'Robert Cialdini', type: 'canon' },
        { id: 'p2m11-counterpoint', title: 'Alchemy', author: 'Rory Sutherland', type: 'counterpoint' },
        { id: 'p2m11-artifact', title: 'Proof Hierarchy', type: 'artifact' },
      ],
    } as ReadingCompanion,
    order: 11,
  },
  {
    id: 'p2-module-12',
    pillar: 'pillar-2',
    title: 'Emotional Payoff & Relief',
    thesis: 'Relief is a stronger motivator than excitement. After-state definition shapes perceived value.',
    whyExists: {
      academic: 'Psychology of motivation × Experience design',
      operator: 'Elite brands define the after-state: what feels different post-purchase.',
    },
    frameworks: [{ id: 'p2-framework-12-1', title: 'After-State', description: 'What feels different post-purchase.', content: 'Relief is a stronger motivator than excitement.' }],
    worksheets: [{ id: 'p2-worksheet-12-1', title: 'After-State Definition', description: 'What feels different post-purchase.', fields: [{ id: 'after-state', label: 'After-State', type: 'textarea', required: true }] }],
    requiredOutputs: [{ id: 'after-state', label: 'After-state definition', type: 'text' }],
    professorNotes: { whatStudentsGetWrong: 'Students describe the product. They avoid defining what feels different after purchase. They confuse outcome with after-state.', whatAplusSmellsLike: 'One after-state: what feels different (emotionally) post-purchase. Specific, not generic.', theTrap: 'The trap is "they get the feature." After-state is emotional, not functional.' },
    sampleAnswers: { strong: { text: 'After-state: "I no longer dread the Monday numbers call. I know the story before anyone asks." Relief, not excitement.', why: 'Emotional, specific, post-purchase.' }, weak: { text: 'They get access to our platform and can run reports.', whyFails: 'Functional, not emotional after-state.' } },
    legitimacyLens: { whoCouldAttack: 'Who could say we overpromise the after-state?', whatLooksExploitative: 'When does after-state framing feel manipulative?', implicitPromise: 'What do we promise about life after purchase?' },
    synthesisDisciplines: ['Emotional payoff', 'Relief', 'Experience'],
    readingCompanion: {
      essentials: {
        canon: { title: 'Desire', author: 'William B. Irvine', coreIdea: 'Desire and relief drive behavior. Relief is often stronger than excitement.', whyMatters: 'Relief is a stronger motivator than excitement.' },
        counterpoint: { title: 'The Power of Moments', author: 'Chip & Dan Heath', coreIdea: 'Peak moments and transitions define experience. After-state matters.', whyMatters: 'After-state definition: what feels different post-purchase.' },
        operatorArtifact: { title: 'After-State Definition', description: 'What feels different post-purchase.' },
      },
      keyIdeas: ['Relief is a stronger motivator than excitement.', 'After-state definition: what feels different post-purchase.', 'Emotional payoff shapes loyalty.'],
      listenScript: 'Relief is a stronger motivator than excitement.',
      booksList: [
        { id: 'p2m12-canon', title: 'Desire', author: 'William B. Irvine', type: 'canon' },
        { id: 'p2m12-counterpoint', title: 'The Power of Moments', author: 'Chip & Dan Heath', type: 'counterpoint' },
        { id: 'p2m12-artifact', title: 'After-State Definition', type: 'artifact' },
      ],
    } as ReadingCompanion,
    order: 12,
  },
  {
    id: 'p2-module-13',
    pillar: 'pillar-2',
    title: 'Culture, Norms, and Adoption Curves',
    thesis: 'Adoption spreads through social permission. Early adopters legitimize; crossing the chasm requires different playbooks.',
    whyExists: {
      academic: 'Diffusion of innovations × Market design',
      operator: 'Elite strategy asks: who legitimizes you first?',
    },
    frameworks: [{ id: 'p2-framework-13-1', title: 'Early Adopter Signal', description: 'Who legitimizes you first.', content: 'Adoption spreads through social permission.' }],
    worksheets: [{ id: 'p2-worksheet-13-1', title: 'Early Adopter Signal', description: 'Who legitimizes you first.', fields: [{ id: 'early-adopter', label: 'Early Adopter', type: 'text', required: true }] }],
    requiredOutputs: [{ id: 'early-adopter-signal', label: 'Early adopter signal', type: 'text' }],
    readingCompanion: {
      essentials: {
        canon: { title: 'Diffusion of Innovations', author: 'Everett Rogers', coreIdea: 'Adoption spreads through social networks and permission. Innovators, early adopters, early majority, late majority, laggards.', whyMatters: 'Adoption spreads through social permission.' },
        counterpoint: { title: 'Crossing the Chasm', author: 'Geoffrey Moore', coreIdea: 'Early market and mainstream require different playbooks. The chasm is the gap.', whyMatters: 'Early adopter signal: who legitimizes you first.' },
        operatorArtifact: { title: 'Early Adopter Signal', description: 'Who legitimizes you first.' },
      },
      keyIdeas: ['Adoption spreads through social permission.', 'Early adopter signal: who legitimizes you first.', 'Culture and norms shape adoption curves.'],
      listenScript: 'Adoption spreads through social permission.',
      booksList: [
        { id: 'p2m13-canon', title: 'Diffusion of Innovations', author: 'Everett Rogers', type: 'canon' },
        { id: 'p2m13-counterpoint', title: 'Crossing the Chasm', author: 'Geoffrey Moore', type: 'counterpoint' },
        { id: 'p2m13-artifact', title: 'Early Adopter Signal', type: 'artifact' },
      ],
    } as ReadingCompanion,
    order: 13,
  },
  {
    id: 'p2-module-14',
    pillar: 'pillar-2',
    title: 'Moral Licensing & Justification',
    thesis: 'People want to feel good about why they bought. Justification scripts shape post-purchase satisfaction and referral.',
    whyExists: {
      academic: 'Moral psychology × Consumer behavior',
      operator: 'Elite brands design the justification script: what buyers tell themselves.',
    },
    frameworks: [{ id: 'p2-framework-14-1', title: 'Justification Script', description: 'What buyers tell themselves.', content: 'People want to feel good about why they bought.' }],
    worksheets: [{ id: 'p2-worksheet-14-1', title: 'Justification Script', description: 'What buyers tell themselves.', fields: [{ id: 'justification', label: 'Justification', type: 'textarea', required: true }] }],
    requiredOutputs: [{ id: 'justification-script', label: 'Justification script', type: 'text' }],
    professorNotes: { whatStudentsGetWrong: 'Students focus on features. They avoid naming what buyers tell themselves to feel good. They confuse rationale with justification.', whatAplusSmellsLike: 'One justification script: what buyers say to themselves (and others) to feel good about the purchase.', theTrap: 'The trap is "they buy for the features." They buy for the story they can tell.' },
    sampleAnswers: { strong: { text: 'Justification script: "I am investing in the team\'s productivity, not just buying software. This pays for itself in one saved meeting per week."', why: 'Moral, story-based, defensible.' }, weak: { text: 'They need our solution. It has the best features.', whyFails: 'No script, no story.' } },
    legitimacyLens: { whoCouldAttack: 'Who could say we enable self-deception?', whatLooksExploitative: 'When does justification scripting feel manipulative?', implicitPromise: 'What do we promise about how they will feel?' },
    synthesisDisciplines: ['Moral psychology', 'Haidt', 'Justification'],
    readingCompanion: {
      essentials: {
        canon: { title: 'The Righteous Mind', author: 'Jonathan Haidt', coreIdea: 'Moral intuition precedes reason. People want to feel good about why they bought.', whyMatters: 'People want to feel good about why they bought.' },
        counterpoint: { title: 'Buyology', author: 'Martin Lindstrom', coreIdea: 'Unconscious drivers and justification shape purchase. Stories matter more than features.', whyMatters: 'Justification script: what buyers tell themselves.' },
        operatorArtifact: { title: 'Justification Script', description: 'What buyers tell themselves.' },
      },
      keyIdeas: ['People want to feel good about why they bought.', 'Justification script: what buyers tell themselves.', 'Moral licensing shapes referral and retention.'],
      listenScript: 'People want to feel good about why they bought.',
      booksList: [
        { id: 'p2m14-canon', title: 'The Righteous Mind', author: 'Jonathan Haidt', type: 'canon' },
        { id: 'p2m14-counterpoint', title: 'Buyology', author: 'Martin Lindstrom', type: 'counterpoint' },
        { id: 'p2m14-artifact', title: 'Justification Script', type: 'artifact' },
      ],
    } as ReadingCompanion,
    order: 14,
  },
  {
    id: 'p2-module-15',
    pillar: 'pillar-2',
    title: 'Consumer Myths & Self-Deception',
    thesis: 'Stories feel true even when they\'re wrong. Belief audits reveal which narratives you rely on emotionally.',
    whyExists: {
      academic: 'Narrative psychology × Decision under uncertainty',
      operator: 'Elite strategy audits beliefs: which narratives you rely on emotionally.',
    },
    frameworks: [{ id: 'p2-framework-15-1', title: 'Belief Audit', description: 'Which narratives you rely on emotionally.', content: 'Stories feel true even when they\'re wrong.' }],
    worksheets: [{ id: 'p2-worksheet-15-1', title: 'Belief Audit', description: 'Which narratives you rely on emotionally.', fields: [{ id: 'belief', label: 'Belief', type: 'textarea', required: true }] }],
    requiredOutputs: [{ id: 'belief-audit', label: 'Belief audit', type: 'text' }],
    professorNotes: { whatStudentsGetWrong: 'Students list facts. They avoid naming which narratives they rely on emotionally. They confuse belief with data.', whatAplusSmellsLike: 'One belief audit: which narratives you (or the customer) rely on emotionally. Stress-tested.', theTrap: 'The trap is "we have the data." Beliefs drive choice before data does.' },
    sampleAnswers: { strong: { text: 'Belief audit: We believe "teams that instrument early win." Stress test: What if instrumentation delays launch and they lose the window? We hold both.', why: 'Narrative named, stress-tested.' }, weak: { text: 'We believe in data-driven decisions. Our product is the best.', whyFails: 'No narrative, no stress test.' } },
    legitimacyLens: { whoCouldAttack: 'Who could say we exploit narrative bias?', whatLooksExploitative: 'When does belief-based marketing feel manipulative?', implicitPromise: 'What do we promise about the stories we tell?' },
    synthesisDisciplines: ['Narrative', 'Taleb', 'Belief'],
    readingCompanion: {
      essentials: {
        canon: { title: 'The Black Swan', author: 'Nassim Taleb', coreIdea: 'Rare events and narrative bias shape perception. Stories feel true even when they\'re wrong.', whyMatters: 'Stories feel true even when they\'re wrong.' },
        counterpoint: { title: 'Thinking in Bets', author: 'Annie Duke', coreIdea: 'Decisions under uncertainty; separating quality of decision from outcome. Beliefs need stress-testing.', whyMatters: 'Belief audit: which narratives you rely on emotionally.' },
        operatorArtifact: { title: 'Belief Audit', description: 'Which narratives you rely on emotionally.' },
      },
      keyIdeas: ['Stories feel true even when they\'re wrong.', 'Belief audit: which narratives you rely on emotionally.', 'Consumer myths and self-deception shape choice.'],
      listenScript: 'Stories feel true even when they\'re wrong.',
      booksList: [
        { id: 'p2m15-canon', title: 'The Black Swan', author: 'Nassim Taleb', type: 'canon' },
        { id: 'p2m15-counterpoint', title: 'Thinking in Bets', author: 'Annie Duke', type: 'counterpoint' },
        { id: 'p2m15-artifact', title: 'Belief Audit', type: 'artifact' },
      ],
    } as ReadingCompanion,
    order: 15,
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
