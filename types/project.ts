import { ApplicationContext } from './context';
import { BusinessState } from './index';
import { Progress } from './index';

export interface IvyProject {
  id: string;
  name: string;
  applicationContext: ApplicationContext;
  state: Pick<BusinessState, 'moduleOutputs' | 'boardCredibilityScore' | 'economicConstraints' | 'controlLogic'>;
  progress: Progress;
  createdAt: string;
  updatedAt: string;
}
