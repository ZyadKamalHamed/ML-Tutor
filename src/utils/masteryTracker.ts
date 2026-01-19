import type { UserProgress, MasteryLevel, ConceptMastery, PracticeSession } from '../types';

/**
 * Calculate mastery level based on accuracy and frequency
 * - struggling: <40% accuracy
 * - learning: 40-70% accuracy
 * - proficient: 70-90% accuracy
 * - mastered: >90% accuracy AND seen 5+ times
 */
export function calculateMasteryLevel(conceptMastery: ConceptMastery): MasteryLevel {
  const accuracy = conceptMastery.timesCorrect / conceptMastery.timesSeen;

  if (accuracy >= 0.9 && conceptMastery.timesSeen >= 5) {
    return 'mastered';
  } else if (accuracy >= 0.7) {
    return 'proficient';
  } else if (accuracy >= 0.4) {
    return 'learning';
  } else {
    return 'struggling';
  }
}

/**
 * Update mastery for a specific concept
 */
export function updateConceptMastery(
  userProgress: UserProgress,
  concept: string,
  correct: boolean
): UserProgress {
  const conceptMastery = userProgress.conceptMastery[concept] || {
    timesSeen: 0,
    timesCorrect: 0,
    lastSeen: new Date().toISOString(),
    masteryLevel: 'learning' as MasteryLevel,
    resourcesViewed: false
  };

  const updated: ConceptMastery = {
    ...conceptMastery,
    timesSeen: conceptMastery.timesSeen + 1,
    timesCorrect: conceptMastery.timesCorrect + (correct ? 1 : 0),
    lastSeen: new Date().toISOString()
  };

  updated.masteryLevel = calculateMasteryLevel(updated);

  return {
    ...userProgress,
    conceptMastery: {
      ...userProgress.conceptMastery,
      [concept]: updated
    },
    totalAnswered: userProgress.totalAnswered + 1
  };
}

/**
 * Update progress after a session
 */
export function updateProgressAfterSession(
  userProgress: UserProgress,
  session: PracticeSession
): UserProgress {
  let updatedProgress = { ...userProgress };

  // Update mastery for each question
  session.results.forEach((result, index) => {
    const question = session.questions[index];
    if (question) {
      updatedProgress = updateConceptMastery(
        updatedProgress,
        question.subcategory,
        result.correct
      );
    }
  });

  // Update weak areas
  updatedProgress.weakAreas = identifyWeakAreas(updatedProgress, 5);

  return updatedProgress;
}

/**
 * Identify top weak areas (concepts with lowest accuracy)
 */
export function identifyWeakAreas(
  userProgress: UserProgress,
  limit: number = 5
): string[] {
  const conceptAccuracy: Array<{ concept: string; accuracy: number; lastSeen: string }> = [];

  Object.entries(userProgress.conceptMastery).forEach(([concept, mastery]) => {
    const accuracy = mastery.timesCorrect / mastery.timesSeen;
    // Only include concepts seen at least once
    if (mastery.timesSeen > 0) {
      conceptAccuracy.push({
        concept,
        accuracy,
        lastSeen: mastery.lastSeen
      });
    }
  });

  // Sort by accuracy (ascending) then by recency (recent first)
  conceptAccuracy.sort((a, b) => {
    if (a.accuracy !== b.accuracy) {
      return a.accuracy - b.accuracy; // Lower accuracy first
    }
    // If same accuracy, prioritize recently seen
    return new Date(b.lastSeen).getTime() - new Date(a.lastSeen).getTime();
  });

  return conceptAccuracy.slice(0, limit).map(item => item.concept);
}

/**
 * Get mastery level for a specific concept
 */
export function getMasteryLevel(
  userProgress: UserProgress,
  concept: string
): MasteryLevel {
  const conceptMastery = userProgress.conceptMastery[concept];
  if (!conceptMastery || conceptMastery.timesSeen === 0) {
    return 'learning'; // Default for unseen concepts
  }
  return conceptMastery.masteryLevel;
}

/**
 * Get accuracy for a specific concept
 */
export function getConceptAccuracy(
  userProgress: UserProgress,
  concept: string
): number {
  const conceptMastery = userProgress.conceptMastery[concept];
  if (!conceptMastery || conceptMastery.timesSeen === 0) {
    return 0;
  }
  return Math.round((conceptMastery.timesCorrect / conceptMastery.timesSeen) * 100);
}

/**
 * Get overall accuracy across all concepts
 */
export function getOverallAccuracy(userProgress: UserProgress): number {
  let totalSeen = 0;
  let totalCorrect = 0;

  Object.values(userProgress.conceptMastery).forEach(mastery => {
    totalSeen += mastery.timesSeen;
    totalCorrect += mastery.timesCorrect;
  });

  if (totalSeen === 0) return 0;
  return Math.round((totalCorrect / totalSeen) * 100);
}

/**
 * Get concepts grouped by mastery level
 */
export function getConceptsByMasteryLevel(userProgress: UserProgress): {
  struggling: string[];
  learning: string[];
  proficient: string[];
  mastered: string[];
} {
  const grouped = {
    struggling: [] as string[],
    learning: [] as string[],
    proficient: [] as string[],
    mastered: [] as string[]
  };

  Object.entries(userProgress.conceptMastery).forEach(([concept, mastery]) => {
    if (mastery.timesSeen > 0) {
      grouped[mastery.masteryLevel].push(concept);
    }
  });

  return grouped;
}

/**
 * Mark resources as viewed for a concept
 */
export function markResourcesViewed(
  userProgress: UserProgress,
  concept: string
): UserProgress {
  const conceptMastery = userProgress.conceptMastery[concept];
  if (!conceptMastery) return userProgress;

  return {
    ...userProgress,
    conceptMastery: {
      ...userProgress.conceptMastery,
      [concept]: {
        ...conceptMastery,
        resourcesViewed: true
      }
    }
  };
}

/**
 * Get mastery statistics
 */
export function getMasteryStats(userProgress: UserProgress): {
  strugglingPercent: number;
  learningPercent: number;
  proficientPercent: number;
  masteredPercent: number;
  totalConcepts: number;
} {
  const grouped = getConceptsByMasteryLevel(userProgress);
  const total = Object.keys(userProgress.conceptMastery).filter(
    concept => userProgress.conceptMastery[concept].timesSeen > 0
  ).length;

  if (total === 0) {
    return {
      strugglingPercent: 0,
      learningPercent: 0,
      proficientPercent: 0,
      masteredPercent: 0,
      totalConcepts: 0
    };
  }

  return {
    strugglingPercent: Math.round((grouped.struggling.length / total) * 100),
    learningPercent: Math.round((grouped.learning.length / total) * 100),
    proficientPercent: Math.round((grouped.proficient.length / total) * 100),
    masteredPercent: Math.round((grouped.mastered.length / total) * 100),
    totalConcepts: total
  };
}
