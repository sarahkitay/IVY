'use client';

import { create } from 'zustand';
import type { User } from 'firebase/auth';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '@/lib/firebase';

interface AuthStore {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  loading: true,
  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),

  signIn: async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password);
    // user state is set by onAuthStateChanged
  },

  signUp: async (email, password) => {
    await createUserWithEmailAndPassword(auth, email, password);
    // user state is set by onAuthStateChanged
  },

  signOut: async () => {
    await firebaseSignOut(auth);
    set({ user: null });
  },
}));

/** Call once in app (e.g. AuthProvider) to subscribe to auth state. */
export function subscribeToAuth() {
  return onAuthStateChanged(auth, (user) => {
    useAuthStore.getState().setUser(user);
    useAuthStore.getState().setLoading(false);
  });
}
