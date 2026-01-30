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
import { IvyProject } from '@/types/project';
import { ApplicationContext } from '@/types/context';
import { BusinessState } from '@/types';
import { Progress } from '@/types';

const PROJECTS_COLLECTION = 'projects';

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
  return {
    id,
    name: typeof data.name === 'string' ? data.name : '',
    applicationContext: (data.applicationContext ?? {}) as ApplicationContext,
    state: (data.state ?? { moduleOutputs: {}, boardCredibilityScore: 0, economicConstraints: {}, controlLogic: {} }) as IvyProject['state'],
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
    state: {
      moduleOutputs: state.moduleOutputs ?? {},
      boardCredibilityScore: state.boardCredibilityScore ?? 0,
      economicConstraints: state.economicConstraints ?? {},
      controlLogic: state.controlLogic ?? {},
    },
    progress,
    createdAt: now,
    updatedAt: now,
  };
  await setDoc(ref, toFirestore(project));
  return ref.id;
}

export async function getProject(projectId: string): Promise<IvyProject | null> {
  const ref = doc(db, PROJECTS_COLLECTION, projectId);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return fromFirestore(snap.id, (snap.data() ?? {}) as Record<string, unknown>);
}

export async function updateProject(
  projectId: string,
  state: Pick<BusinessState, 'moduleOutputs' | 'boardCredibilityScore' | 'economicConstraints' | 'controlLogic'>,
  progress: Progress
): Promise<void> {
  const ref = doc(db, PROJECTS_COLLECTION, projectId);
  await setDoc(
    ref,
    {
      state,
      progress,
      updatedAt: new Date().toISOString(),
    },
    { merge: true }
  );
}

export async function listProjects(limitCount: number = 30): Promise<IvyProject[]> {
  const ref = collection(db, PROJECTS_COLLECTION);
  const q = query(ref, orderBy('updatedAt', 'desc'), limit(limitCount));
  const snap = await getDocs(q);
  return snap.docs.map((d) => fromFirestore(d.id, (d.data() ?? {}) as Record<string, unknown>));
}
