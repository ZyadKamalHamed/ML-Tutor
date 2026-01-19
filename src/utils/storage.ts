import type { UserProgress, PracticeSession, StorageSchema } from '../types';

const STORAGE_KEY = 'ml-tutor-data';

/**
 * Get initial user progress
 */
export function getInitialUserProgress(): UserProgress {
  return {
    streak: 0,
    longestStreak: 0,
    lastPracticeDate: '',
    totalAnswered: 0,
    conceptMastery: {},
    weakAreas: [],
    practiceDates: [],
    settings: {
      difficulty: 'intermediate',
      darkMode: false
    }
  };
}

/**
 * Load data from localStorage
 */
export function loadFromStorage(): StorageSchema {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return {
        userProgress: getInitialUserProgress(),
        sessionHistory: {}
      };
    }

    const parsed = JSON.parse(stored) as StorageSchema;

    // Ensure userProgress has all required fields
    if (!parsed.userProgress) {
      parsed.userProgress = getInitialUserProgress();
    }

    // Ensure sessionHistory exists
    if (!parsed.sessionHistory) {
      parsed.sessionHistory = {};
    }

    return parsed;
  } catch (error) {
    console.error('Error loading from storage:', error);
    return {
      userProgress: getInitialUserProgress(),
      sessionHistory: {}
    };
  }
}

/**
 * Save data to localStorage
 */
export function saveToStorage(data: Partial<StorageSchema>): void {
  try {
    const current = loadFromStorage();
    const updated: StorageSchema = {
      ...current,
      ...data
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Error saving to storage:', error);
  }
}

/**
 * Update user progress in storage
 */
export function saveUserProgress(userProgress: UserProgress): void {
  saveToStorage({ userProgress });
}

/**
 * Save session to history
 */
export function saveSessionToHistory(
  session: PracticeSession,
  userProgress: UserProgress
): void {
  const stored = loadFromStorage();

  const conceptsCovered = session.questions.map(q => q.subcategory);
  const uniqueConcepts = Array.from(new Set(conceptsCovered));

  const correctAnswers = session.results.filter(r => r.correct).length;

  stored.sessionHistory[session.id] = {
    date: session.startTime,
    questionsAnswered: session.results.length,
    correctAnswers,
    conceptsCovered: uniqueConcepts,
    resourcesAccessed: [] // Will be updated when user views resources
  };

  saveToStorage({
    sessionHistory: stored.sessionHistory,
    userProgress
  });
}

/**
 * Add resource access to session history
 */
export function addResourceAccessToSession(
  sessionId: string,
  concept: string
): void {
  const stored = loadFromStorage();

  if (stored.sessionHistory[sessionId]) {
    if (!stored.sessionHistory[sessionId].resourcesAccessed.includes(concept)) {
      stored.sessionHistory[sessionId].resourcesAccessed.push(concept);
      saveToStorage({ sessionHistory: stored.sessionHistory });
    }
  }
}

/**
 * Update streak in user progress
 */
export function updateStreak(userProgress: UserProgress): UserProgress {
  const today = new Date().toISOString().split('T')[0];
  const lastPractice = userProgress.lastPracticeDate;

  // If practiced today already, no change
  if (lastPractice === today) {
    return userProgress;
  }

  const lastPracticeDate = lastPractice ? new Date(lastPractice) : null;
  const todayDate = new Date(today);

  let newStreak = userProgress.streak;

  if (!lastPracticeDate) {
    // First time practicing
    newStreak = 1;
  } else {
    const daysDiff = Math.floor(
      (todayDate.getTime() - lastPracticeDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (daysDiff === 1) {
      // Consecutive day
      newStreak = userProgress.streak + 1;
    } else if (daysDiff > 1) {
      // Streak broken
      newStreak = 1;
    }
  }

  const updated: UserProgress = {
    ...userProgress,
    streak: newStreak,
    longestStreak: Math.max(newStreak, userProgress.longestStreak),
    lastPracticeDate: today,
    practiceDates: [...userProgress.practiceDates, today]
  };

  return updated;
}

/**
 * Clear all data (for testing or reset)
 */
export function clearStorage(): void {
  localStorage.removeItem(STORAGE_KEY);
}

/**
 * Export data as JSON
 */
export function exportData(): string {
  const data = loadFromStorage();
  return JSON.stringify(data, null, 2);
}

/**
 * Import data from JSON
 */
export function importData(jsonString: string): boolean {
  try {
    const data = JSON.parse(jsonString) as StorageSchema;

    // Validate structure
    if (!data.userProgress || !data.sessionHistory) {
      throw new Error('Invalid data structure');
    }

    saveToStorage(data);
    return true;
  } catch (error) {
    console.error('Error importing data:', error);
    return false;
  }
}
