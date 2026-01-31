'use client';

import { useEffect } from 'react';
import { setPersistence, browserLocalPersistence } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { subscribeToAuth } from '@/store/useAuthStore';

/**
 * Persist login across tab/browser close. You only need to log in again on a new device
 * or after signing out (or clearing site data).
 */
export default function AuthInit() {
  useEffect(() => {
    setPersistence(auth, browserLocalPersistence).catch(() => {});
    const unsub = subscribeToAuth();
    return () => unsub();
  }, []);
  return null;
}
