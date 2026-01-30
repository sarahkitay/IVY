/**
 * Application Context Types
 * Users must choose what they're applying frameworks to before starting
 */

export type ContextType = 'my-company' | 'case-study' | 'hypothetical' | 'observer';

export interface MyCompanyContext {
  type: 'my-company';
  businessType: 'startup' | 'employer' | 'client' | 'side-project';
  companyName: string;
  description: string;
}

export interface CaseStudyContext {
  type: 'case-study';
  caseId: string;
  caseName: string;
}

export interface HypotheticalContext {
  type: 'hypothetical';
  businessDescription: string;
  category: string;
}

export interface ObserverContext {
  type: 'observer';
  // Read-only mode, no specific context needed
}

export type ApplicationContext = MyCompanyContext | CaseStudyContext | HypotheticalContext | ObserverContext;

export interface CaseStudy {
  id: string;
  name: string;
  period: string;
  description: string;
  category: string;
  prefillData?: {
    [moduleId: string]: {
      [worksheetId: string]: {
        [fieldId: string]: any;
      };
    };
  };
}
