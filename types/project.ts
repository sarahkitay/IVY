import { ApplicationContext } from './context';
import { BusinessState } from './index';
import { Progress } from './index';

/** Fields we persist to Firebase (full working state so nothing is lost on refresh). */
export type IvyProjectState = Pick<
  BusinessState,
  | 'applicationContext'
  | 'moduleOutputs'
  | 'boardCredibilityScore'
  | 'economicConstraints'
  | 'controlLogic'
  | 'strategyNote'
  | 'boardMemoRubricScore'
  | 'stakeholderMap'
  | 'boardPushbackResponses'
  | 'coldCallDefenseResponses'
  | 'strategicThesisLedger'
  | 'studioSubmission'
  | 'peerCritiquesGiven'
  | 'studioCredibilityBonusApplied'
  | 'caseMode'
  | 'activeCasePackId'
>;

export interface IvyProject {
  id: string;
  name: string;
  applicationContext: ApplicationContext;
  state: IvyProjectState;
  progress: Progress;
  createdAt: string;
  updatedAt: string;
}
