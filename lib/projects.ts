import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  orderBy,
  query,
  limit,
  where,
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

/** Firestore does not allow undefined. Convert undefined -> null recursively (objects + arrays). */
function firestoreSafe(value: unknown): unknown {
  if (value === undefined) return null;
  if (value === null) return value;
  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') return value;
  if (value instanceof Date) return value;
  if (Array.isArray(value)) return value.map((item) => firestoreSafe(item));
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
    out[k] = firestoreSafe(v);
  }
  return out;
}

function toFirestore(project: Omit<IvyProject, 'id'>): Record<string, unknown> {
  const out: Record<string, unknown> = firestoreSafe({
    name: project.name,
    applicationContext: project.applicationContext,
    state: project.state,
    progress: project.progress,
    createdAt: project.createdAt,
    updatedAt: project.updatedAt,
    ...(project.userId ? { userId: project.userId } : {}),
  }) as Record<string, unknown>;
  return out;
}

function safeObject(v: unknown): Record<string, unknown> {
  return v != null && typeof v === 'object' && !Array.isArray(v) ? (v as Record<string, unknown>) : {};
}
function safeArray(v: unknown): string[] {
  return Array.isArray(v) ? v.filter((x): x is string => typeof x === 'string') : [];
}

function fromFirestore(id: string, data: Record<string, unknown>): IvyProject {
  const raw = safeObject(data.state);
  const moduleOutputsRaw = raw.moduleOutputs;
  const moduleOutputs = safeObject(moduleOutputsRaw) as BusinessState['moduleOutputs'];
  const progressRaw = safeObject(data.progress);
  const defaultProgress = {
    currentModule: 'module-1',
    completedModules: [] as string[],
    unlockedModules: ['module-1'] as string[],
    overallProgress: 0,
    pillar1Progress: 0,
    pillar2Progress: 0,
    pillar3Progress: 0,
  };
  const state: IvyProjectState = {
    ...defaultState,
    applicationContext: (raw.applicationContext ?? data.applicationContext ?? {}) as ApplicationContext,
    moduleOutputs,
    boardCredibilityScore: typeof raw.boardCredibilityScore === 'number' ? raw.boardCredibilityScore : 0,
    economicConstraints: safeObject(raw.economicConstraints) as BusinessState['economicConstraints'],
    controlLogic: safeObject(raw.controlLogic) as BusinessState['controlLogic'],
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
    userId: typeof data.userId === 'string' ? data.userId : undefined,
    applicationContext: (data.applicationContext ?? {}) as ApplicationContext,
    state,
    progress: {
      currentModule: typeof progressRaw.currentModule === 'string' ? progressRaw.currentModule : defaultProgress.currentModule,
      completedModules: safeArray(progressRaw.completedModules).length ? safeArray(progressRaw.completedModules) : defaultProgress.completedModules,
      unlockedModules: safeArray(progressRaw.unlockedModules).length ? safeArray(progressRaw.unlockedModules) : defaultProgress.unlockedModules,
      overallProgress: typeof progressRaw.overallProgress === 'number' ? progressRaw.overallProgress : defaultProgress.overallProgress,
      pillar1Progress: typeof progressRaw.pillar1Progress === 'number' ? progressRaw.pillar1Progress : defaultProgress.pillar1Progress,
      pillar2Progress: typeof progressRaw.pillar2Progress === 'number' ? progressRaw.pillar2Progress : defaultProgress.pillar2Progress,
      pillar3Progress: typeof progressRaw.pillar3Progress === 'number' ? progressRaw.pillar3Progress : defaultProgress.pillar3Progress,
    },
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
  progress: Progress,
  userId: string
): Promise<string> {
  try {
    const ref = doc(collection(db, PROJECTS_COLLECTION));
    const now = new Date().toISOString();
    const project: Omit<IvyProject, 'id'> = {
      name,
      userId,
      applicationContext,
      state: stateToProjectState(state),
      progress,
      createdAt: now,
      updatedAt: now,
    };
    const data = toFirestore(project);
    await setDoc(ref, data);
    return ref.id;
  } catch (e) {
    const err = e as { code?: string; message?: string };
    console.error('[Ivy] createProject failed:', err.code ?? err.message ?? String(e), e);
    throw e;
  }
}

export async function getProject(projectId: string): Promise<IvyProject | null> {
  if (String(projectId).startsWith('local-')) return null;
  try {
    const ref = doc(db, PROJECTS_COLLECTION, projectId);
    const snap = await getDoc(ref);
    if (!snap.exists()) return null;
    return fromFirestore(snap.id, (snap.data() ?? {}) as Record<string, unknown>);
  } catch (e) {
    console.error('[Ivy] getProject failed:', projectId, e);
    return null;
  }
}

export async function updateProject(
  projectId: string,
  state: BusinessState,
  progress: Progress
): Promise<void> {
  if (String(projectId).startsWith('local-')) return;
  try {
    const ref = doc(db, PROJECTS_COLLECTION, projectId);
    const payload = firestoreSafe({
      state: stateToProjectState(state),
      progress,
      updatedAt: new Date().toISOString(),
    }) as Record<string, unknown>;
    await setDoc(ref, payload, { merge: true });
  } catch (e) {
    const err = e as { code?: string; message?: string };
    console.error('[Ivy] updateProject failed:', err.code ?? err.message ?? String(e), e);
    throw e;
  }
}

/** List projects for a user. Returns [] if userId is null (not logged in). */
export async function listProjects(userId: string | null, limitCount: number = 30): Promise<IvyProject[]> {
  if (!userId) return [];
  try {
    const ref = collection(db, PROJECTS_COLLECTION);
    const q = query(
      ref,
      where('userId', '==', userId),
      orderBy('updatedAt', 'desc'),
      limit(limitCount)
    );
    const snap = await getDocs(q);
    return snap.docs.map((d) => fromFirestore(d.id, (d.data() ?? {}) as Record<string, unknown>));
  } catch (e) {
    console.error('[Ivy] listProjects failed:', e);
    return [];
  }
}
