import { useState, useEffect } from 'react';
import type { UserProgress } from '../types';
import { loadFromStorage, saveUserProgress, updateStreak } from '../utils/storage';
import { updateProgressAfterSession } from '../utils/masteryTracker';
import type { PracticeSession } from '../types';

export function useUserProgress() {
  const [userProgress, setUserProgress] = useState<UserProgress>(() => {
    const stored = loadFromStorage();
    return stored.userProgress;
  });

  const [isLoading, setIsLoading] = useState(false);

  // Save to localStorage whenever userProgress changes
  useEffect(() => {
    saveUserProgress(userProgress);
  }, [userProgress]);

  const updateSettings = (settings: Partial<UserProgress['settings']>) => {
    setUserProgress(prev => ({
      ...prev,
      settings: {
        ...prev.settings,
        ...settings
      }
    }));
  };

  const completeSession = (session: PracticeSession) => {
    setIsLoading(true);
    try {
      // Update mastery after session
      let updated = updateProgressAfterSession(userProgress, session);

      // Update streak
      updated = updateStreak(updated);

      setUserProgress(updated);
    } finally {
      setIsLoading(false);
    }
  };

  const markResourcesViewed = (concept: string) => {
    setUserProgress(prev => ({
      ...prev,
      conceptMastery: {
        ...prev.conceptMastery,
        [concept]: {
          ...prev.conceptMastery[concept],
          resourcesViewed: true
        }
      }
    }));
  };

  const resetProgress = () => {
    const initial = loadFromStorage();
    setUserProgress(initial.userProgress);
  };

  return {
    userProgress,
    setUserProgress,
    updateSettings,
    completeSession,
    markResourcesViewed,
    resetProgress,
    isLoading
  };
}
