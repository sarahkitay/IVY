'use client';

import { useEffect, useRef } from 'react';
import { useBusinessState } from '@/store/useBusinessState';
import { useProgress } from '@/store/useProgress';
import { useProjectStore } from '@/store/useProjectStore';

const DEBOUNCE_MS = 500;

export default function FirebaseSync() {
  const { state } = useBusinessState();
  const { progress } = useProgress();
  const currentProjectId = useProjectStore((s) => s.currentProjectId);
  const loadProject = useProjectStore((s) => s.loadProject);
  const syncCurrentProjectToFirebase = useProjectStore((s) => s.syncCurrentProjectToFirebase);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasHydratedRef = useRef(false);

  // Hydrate state from Firebase when app loads with a saved project (so data persists across refresh/close)
  useEffect(() => {
    if (!currentProjectId || String(currentProjectId).startsWith('local-')) return;
    if (hasHydratedRef.current) return;
    hasHydratedRef.current = true;
    loadProject(currentProjectId).catch(() => {
      hasHydratedRef.current = false;
    });
  }, [currentProjectId, loadProject]);

  // Debounced save to Firebase when state or progress changes
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

  // Flush save when tab is hidden (switch tab, minimize, or before close) so data isn't lost
  useEffect(() => {
    const flush = () => {
      if (!currentProjectId || String(currentProjectId).startsWith('local-')) return;
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      syncCurrentProjectToFirebase();
    };
    const onVisibilityChange = () => {
      if (typeof document !== 'undefined' && document.visibilityState === 'hidden') flush();
    };
    const onBeforeUnload = () => flush();
    if (typeof document !== 'undefined') {
      document.addEventListener('visibilitychange', onVisibilityChange);
      window.addEventListener('beforeunload', onBeforeUnload);
      return () => {
        document.removeEventListener('visibilitychange', onVisibilityChange);
        window.removeEventListener('beforeunload', onBeforeUnload);
      };
    }
  }, [currentProjectId, syncCurrentProjectToFirebase]);

  return null;
}
