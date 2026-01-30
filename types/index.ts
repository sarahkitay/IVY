// Core Data Models for Strategic Logic Engine
import { ApplicationContext } from './context';

export interface BusinessState {
  // Application Context (required before starting)
  applicationContext?: ApplicationContext;
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
  
  // Timestamp
  lastUpdated: string;
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
  timestamp: string;
}

export interface WorksheetData {
  worksheetId: string;
  fields: {
    [key: string]: string | number | boolean;
  };
  completed: boolean;
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
  type: 'text' | 'number' | 'boolean' | 'worksheet';
  source?: string; // worksheet ID or module output key
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
