'use client';

import { useEffect, useRef } from 'react';
import { useBusinessState } from '@/store/useBusinessState';
import { useProgress } from '@/store/useProgress';
import { useProjectStore } from '@/store/useProjectStore';

const DEBOUNCE_MS = 2000;

export default function FirebaseSync() {
  const { state } = useBusinessState();
  const { progress } = useProgress();
  const currentProjectId = useProjectStore((s) => s.currentProjectId);
  const syncCurrentProjectToFirebase = useProjectStore((s) => s.syncCurrentProjectToFirebase);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!currentProjectId || String(currentProjectId).startsWith('local-')) return;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      syncCurrentProjectToFirebase();
      timeoutRef.current = null;
    }, DEBOUNCE_MS);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [currentProjectId, state, progress, syncCurrentProjectToFirebase]);

  return null;
}
