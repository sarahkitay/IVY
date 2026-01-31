import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  orderBy,
  query,
  limit,
} from 'firebase/firestore';
import { db } from './firebase';
import { IvyProject, IvyProjectState } from '@/types/project';
import { ApplicationContext } from '@/types/context';
import { BusinessState } from '@/types';
import { Progress } from '@/types';

const PROJECTS_COLLECTION = 'projects';

const defaultState: IvyProjectState = {
  moduleOutputs: {},
  boardCredibilityScore: 0,
  economicConstraints: {},
  controlLogic: {},
};

function toFirestore(project: Omit<IvyProject, 'id'>): Record<string, unknown> {
  return {
    name: project.name,
    applicationContext: project.applicationContext,
    state: project.state,
    progress: project.progress,
    createdAt: project.createdAt,
    updatedAt: project.updatedAt,
  };
}

function fromFirestore(id: string, data: Record<string, unknown>): IvyProject {
  const raw = (data.state ?? {}) as Record<string, unknown>;
  const state: IvyProjectState = {
    ...defaultState,
    applicationContext: (raw.applicationContext ?? data.applicationContext ?? {}) as ApplicationContext,
    moduleOutputs: (raw.moduleOutputs ?? {}) as BusinessState['moduleOutputs'],
    boardCredibilityScore: typeof raw.boardCredibilityScore === 'number' ? raw.boardCredibilityScore : 0,
    economicConstraints: (raw.economicConstraints ?? {}) as BusinessState['economicConstraints'],
    controlLogic: (raw.controlLogic ?? {}) as BusinessState['controlLogic'],
    strategyNote: raw.strategyNote as BusinessState['strategyNote'],
    boardMemoRubricScore: raw.boardMemoRubricScore as number | undefined,
    stakeholderMap: raw.stakeholderMap as BusinessState['stakeholderMap'],
    boardPushbackResponses: raw.boardPushbackResponses as BusinessState['boardPushbackResponses'],
    coldCallDefenseResponses: raw.coldCallDefenseResponses as BusinessState['coldCallDefenseResponses'],
    strategicThesisLedger: raw.strategicThesisLedger as BusinessState['strategicThesisLedger'],
    studioSubmission: raw.studioSubmission as BusinessState['studioSubmission'],
    peerCritiquesGiven: raw.peerCritiquesGiven as BusinessState['peerCritiquesGiven'],
    studioCredibilityBonusApplied: raw.studioCredibilityBonusApplied as boolean | undefined,
    caseMode: raw.caseMode as BusinessState['caseMode'],
    activeCasePackId: raw.activeCasePackId as string | undefined,
  };
  return {
    id,
    name: typeof data.name === 'string' ? data.name : '',
    applicationContext: (data.applicationContext ?? {}) as ApplicationContext,
    state,
    progress: (data.progress ?? {
      currentModule: 'module-1',
      completedModules: [],
      unlockedModules: ['module-1'],
      overallProgress: 0,
      pillar1Progress: 0,
      pillar2Progress: 0,
      pillar3Progress: 0,
    }) as Progress,
    createdAt: typeof data.createdAt === 'string' ? data.createdAt : new Date().toISOString(),
    updatedAt: typeof data.updatedAt === 'string' ? data.updatedAt : new Date().toISOString(),
  };
}

function stateToProjectState(state: BusinessState): IvyProjectState {
  return {
    applicationContext: state.applicationContext,
    moduleOutputs: state.moduleOutputs ?? {},
    boardCredibilityScore: state.boardCredibilityScore ?? 0,
    economicConstraints: state.economicConstraints ?? {},
    controlLogic: state.controlLogic ?? {},
    strategyNote: state.strategyNote,
    boardMemoRubricScore: state.boardMemoRubricScore,
    stakeholderMap: state.stakeholderMap,
    boardPushbackResponses: state.boardPushbackResponses,
    coldCallDefenseResponses: state.coldCallDefenseResponses,
    strategicThesisLedger: state.strategicThesisLedger,
    studioSubmission: state.studioSubmission,
    peerCritiquesGiven: state.peerCritiquesGiven,
    studioCredibilityBonusApplied: state.studioCredibilityBonusApplied,
    caseMode: state.caseMode,
    activeCasePackId: state.activeCasePackId,
  };
}

export async function createProject(
  name: string,
  applicationContext: ApplicationContext,
  state: BusinessState,
  progress: Progress
): Promise<string> {
  const ref = doc(collection(db, PROJECTS_COLLECTION));
  const now = new Date().toISOString();
  const project: Omit<IvyProject, 'id'> = {
    name,
    applicationContext,
    state: stateToProjectState(state),
    progress,
    createdAt: now,
    updatedAt: now,
  };
  await setDoc(ref, toFirestore(project));
  return ref.id;
}

export async function getProject(projectId: string): Promise<IvyProject | null> {
  if (String(projectId).startsWith('local-')) return null;
  const ref = doc(db, PROJECTS_COLLECTION, projectId);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return fromFirestore(snap.id, (snap.data() ?? {}) as Record<string, unknown>);
}

export async function updateProject(
  projectId: string,
  state: BusinessState,
  progress: Progress
): Promise<void> {
  if (String(projectId).startsWith('local-')) return;
  const ref = doc(db, PROJECTS_COLLECTION, projectId);
  await setDoc(
    ref,
    {
      state: stateToProjectState(state),
      progress,
      updatedAt: new Date().toISOString(),
    },
    { merge: true }
  );
}

export async function listProjects(limitCount: number = 30): Promise<IvyProject[]> {
  try {
    const ref = collection(db, PROJECTS_COLLECTION);
    const q = query(ref, orderBy('updatedAt', 'desc'), limit(limitCount));
    const snap = await getDocs(q);
    return snap.docs.map((d) => fromFirestore(d.id, (d.data() ?? {}) as Record<string, unknown>));
  } catch (e) {
    console.error('[Ivy] listProjects failed:', e);
    return [];
  }
}
