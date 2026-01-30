// Core Data Models for Strategic Logic Engine
import { ApplicationContext } from './context';
import type { CaseMode } from './case';

export interface BusinessState {
  // Application Context (required before starting)
  applicationContext?: ApplicationContext;
  /** Case Method Immersion: My Company vs Case Mode (HBS-style). */
  caseMode?: CaseMode;
  /** When caseMode === 'case', which case pack is active. */
  activeCasePackId?: string;
  // Pillar I: Foundations
  economicConstraints: {
    unitEconomics?: {
      price: number;
      variableCosts: number;
      contributionMargin: number;
    };
    fiveForcesScores?: {
      competitiveRivalry: number;
      buyerPower: number;
      supplierPower: number;
      substitutes: number;
      newEntrants: number;
      total: number;
    };
    ltvCac?: {
      ltv: number;
      cac: number;
      ratio: number;
      paybackPeriod: number;
    };
  };
  
  // Pillar II: Psychology (placeholder for future)
  perceptionLayers?: {
    mentalAccounting?: any;
    lossAversion?: any;
    identityAnchors?: any;
  };
  
  // Pillar III: Systems (placeholder for future)
  controlLogic?: {
    pricingGuardrails?: any;
    experiments?: Experiment[];
    growthLoops?: any;
  };
  
  // Module-specific outputs
  moduleOutputs: {
    [moduleId: string]: ModuleOutput;
  };
  
  // Credibility score (affected by Cold Calls)
  boardCredibilityScore: number;

  /** 2-page Strategy Note (Yale/HBS): claim → evidence → tradeoffs → risks → decision. Rubric-scored. */
  strategyNote?: StrategyNote;
  /** Rubric score 0–100: specificity, falsifiability, tradeoff clarity, evidence linkage, risk honesty. */
  boardMemoRubricScore?: number;

  /** Stakeholder map + org friction (Execution Under Incentives). */
  stakeholderMap?: StakeholderEntry[];
  /** Boardroom pushback responses: CFO, Sales, Ops (3 bullets each). */
  boardPushbackResponses?: Record<string, string[]>;

  /** Cold Call Defense: 3 follow-ups after Strategy Note. */
  coldCallDefenseResponses?: Record<string, string>;

  /** Strategic Thesis Ledger (Brown): max 10 lines. "We believe ___ because ___; we will prove it by ___." */
  strategicThesisLedger?: string[];

  /** Studio Mode: memo submitted for peer critique. */
  studioSubmission?: StudioSubmission;
  /** Studio Mode: critiques you have given (peerId -> critique). Completing 2 grants credibility bonus. */
  peerCritiquesGiven?: Record<string, PeerCritique>;
  /** Studio Mode: credibility bonus already applied (so we don't double-apply). */
  studioCredibilityBonusApplied?: boolean;

  // Timestamp
  lastUpdated: string;
}

/** Snapshot of memo when user submits to Studio for peer critique. */
export interface StudioSubmission {
  memoSnapshot: string;
  submittedAt: string;
}

/** Peer critique rubric dimensions (1–5 each). */
export type PeerCritiqueDimension =
  | 'thesisClarity'
  | 'evidenceStrength'
  | 'tradeoffHonesty'
  | 'riskAcknowledgment'
  | 'actionability';

/** A single peer critique: rubric scores + optional written feedback. */
export interface PeerCritique {
  rubricScores: Record<PeerCritiqueDimension, number>;
  writtenFeedback?: string;
  completedAt: string;
}

export interface StrategyNote {
  thesis: string;
  evidence: string[]; // 3 bullets, each with "because"
  tradeoffs: string[]; // 2 bullets
  risks: string[]; // top 2
  mitigations: string[]; // 1 per risk
  decision: string;
  whatWouldChangeIn7Days?: string; // "What would you do Monday?"
}

export interface StakeholderEntry {
  id: string;
  name: string;
  role: string;
  power: 1 | 2 | 3 | 4 | 5;
  incentiveAlignment: number; // -2 to +2
  vetoAbility: boolean;
  fearsLosing: string;
  wantsToGain: string;
}

export interface Experiment {
  hypothesis: string;
  primaryMetric: string;
  guardrail: string;
  status: 'running' | 'paused' | 'killed' | 'completed';
  decisionDate: string;
  metricsLocked: boolean;
}

export interface ModuleOutput {
  moduleId: string;
  completed: boolean;
  requiredOutputs: {
    [key: string]: any;
  };
  worksheets: {
    [worksheetId: string]: WorksheetData;
  };
  coldCallResponse?: string;
  redTeamResponse?: string;
  quizScore?: number;
  quizTotal?: number;
  /** When true: key concepts check had a required (disqualifier) question missed; must retake to advance. */
  quizConceptIncomplete?: boolean;
  /** "What would you do Monday?" — In the next 7 days, what changes in the world if you're right? */
  whatWouldChangeIn7Days?: string;
  /** Legitimacy lens answers (Yale): who could attack, exploitative risk, implicit promise. */
  legitimacyLensResponses?: Record<string, string>;
  /** Synthesis: connect this module to one discipline (economics, psychology, etc.). */
  synthesisResponse?: string;
  /** Reading spine completed (optional but rewarded). */
  readingSpineCompleted?: boolean;
  /** Reading Companion: which books user has checked off (bookId -> true). */
  readingCompanionBooksCompleted?: Record<string, boolean>;
  /** Reading Companion: honors Apply response (one paragraph). */
  readingCompanionApplyResponse?: string;
  /** Reading Companion: user completed Listen (read-aloud). */
  readingCompanionListenCompleted?: boolean;
  /** Reading Companion: user completed Essentials or Listen (unlocks Apply). */
  readingCompanionEssentialsCompleted?: boolean;
  timestamp: string;
}

export interface WorksheetData {
  worksheetId: string;
  fields: {
    [key: string]: string | number | boolean;
  };
  completed: boolean;
}

/** Professor Notes: what elite courses do better than frameworks. */
export interface ProfessorNotes {
  whatStudentsGetWrong: string;
  whatAplusSmellsLike: string;
  theTrap: string;
}

/** Sample answers for Socratic feedback. */
export interface SampleAnswers {
  strong: { text: string; why: string };
  weak: { text: string; whyFails: string };
}

export interface Module {
  id: string;
  pillar: 'pillar-1' | 'pillar-2' | 'pillar-3';
  title: string;
  thesis: string;
  whyExists: {
    academic: string;
    operator: string;
  };
  frameworks: Framework[];
  worksheets: Worksheet[];
  coldCall?: ColdCall;
  redTeam?: RedTeam;
  boardLens?: string;
  requiredOutputs: RequiredOutput[];
  order: number;
  /** Faculty layer: what students get wrong, A+ smell, the trap. */
  professorNotes?: ProfessorNotes;
  /** Two sample answers: one strong (why), one weak (why it fails). */
  sampleAnswers?: SampleAnswers;
  /** Legitimacy lens (Yale): who could attack, what looks exploitative, implicit promise. */
  legitimacyLens?: {
    whoCouldAttack: string;
    whatLooksExploitative: string;
    implicitPromise: string;
  };
  /** Reading spine (Brown): optional but rewarded. */
  readingSpine?: {
    primaryReading: { title: string; description?: string; url?: string };
    counterpointReading: { title: string; description?: string; url?: string };
    operatorArtifact: { title: string; description?: string; url?: string };
  };
  /** Reading Companion (in-app): Essentials, Key Ideas, Listen, Apply, book check-off + extra credit. */
  readingCompanion?: ReadingCompanion;
  /** Synthesis prompt: connect to one other discipline. */
  synthesisDisciplines?: string[];
}

/** One book/resource in the Reading Companion list (check-off, extra credit). */
export interface ReadingCompanionBook {
  id: string;
  title: string;
  author?: string;
  url?: string;
  type: 'canon' | 'counterpoint' | 'artifact';
}

export interface ReadingCompanion {
  /** Essentials (10 min): canon, counterpoint, operator artifact. */
  essentials: {
    canon: { title: string; author?: string; url?: string; coreIdea: string; whyMatters: string };
    counterpoint: { title: string; author?: string; url?: string; coreIdea: string; whyMatters: string };
    operatorArtifact: { title: string; description?: string; url?: string; templateFields?: string[] };
  };
  /** Key Ideas (scan mode). */
  keyIdeas: string[];
  /** Key excerpt: quote + professor note. */
  keyExcerpt?: { quote: string; professorNote?: string };
  /** Listen: read-aloud script (audio-ready). */
  listenScript: string;
  /** Apply: honors prompt (unlocked when reading/listen completed). */
  applyPrompt?: string;
  /** Reading list: check off books; extra credit per book + comprehension. */
  booksList: ReadingCompanionBook[];
}

export interface Framework {
  id: string;
  title: string;
  description: string;
  content: string;
  operatorWarning?: string;
}

export interface Worksheet {
  id: string;
  title: string;
  description: string;
  fields: WorksheetField[];
  rules?: string[];
}

export interface WorksheetField {
  id: string;
  label: string;
  type: 'text' | 'number' | 'select' | 'textarea' | 'checkbox' | 'checkbox-group';
  required: boolean;
  options?: string[];
  placeholder?: string;
}

export interface ColdCall {
  question: string;
  timeLimit: number; // seconds
  semanticCriteria: {
    noHedging: boolean;
    minLength?: number;
    maxLength?: number;
  };
  penalty: number; // points deducted if failed
}

export interface RedTeam {
  question: string;
  checks: ContradictionCheck[];
}

export interface ContradictionCheck {
  type: 'value' | 'logic' | 'consistency';
  field1: string;
  field2: string;
  condition: string;
  message: string;
}

export interface RequiredOutput {
  id: string;
  label: string;
  type: 'text' | 'number' | 'boolean' | 'worksheet' | 'select';
  source?: string; // worksheet ID or module output key
  /** For type 'select': options for the dropdown. */
  options?: string[];
  /** Constraint or placeholder text (e.g. "You may NOT name a direct competitor..."). */
  placeholder?: string;
}

export interface Progress {
  currentModule: string;
  completedModules: string[];
  unlockedModules: string[];
  overallProgress: number;
  pillar1Progress: number;
  pillar2Progress: number;
  pillar3Progress: number;
}
