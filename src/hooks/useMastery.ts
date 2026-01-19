import { useMemo } from 'react';
import type { UserProgress } from '../types';
import {
  getConceptAccuracy,
  getMasteryLevel,
  getOverallAccuracy,
  getConceptsByMasteryLevel,
  getMasteryStats
} from '../utils/masteryTracker';

export function useMastery(userProgress: UserProgress) {
  const conceptsByLevel = useMemo(
    () => getConceptsByMasteryLevel(userProgress),
    [userProgress]
  );

  const masteryStats = useMemo(
    () => getMasteryStats(userProgress),
    [userProgress]
  );

  const overallAccuracy = useMemo(
    () => getOverallAccuracy(userProgress),
    [userProgress]
  );

  const getConceptDetails = (concept: string) => {
    const mastery = userProgress.conceptMastery[concept];

    if (!mastery || mastery.timesSeen === 0) {
      return {
        accuracy: 0,
        masteryLevel: 'learning' as const,
        timesSeen: 0,
        timesCorrect: 0,
        lastSeen: null,
        resourcesViewed: false
      };
    }

    return {
      accuracy: getConceptAccuracy(userProgress, concept),
      masteryLevel: getMasteryLevel(userProgress, concept),
      timesSeen: mastery.timesSeen,
      timesCorrect: mastery.timesCorrect,
      lastSeen: mastery.lastSeen,
      resourcesViewed: mastery.resourcesViewed || false
    };
  };

  const getConceptsNeedingWork = (limit: number = 5) => {
    const struggling = conceptsByLevel.struggling;
    const learning = conceptsByLevel.learning;

    // Combine struggling and learning, prioritize struggling
    const needsWork = [...struggling, ...learning].slice(0, limit);

    return needsWork.map(concept => ({
      concept,
      ...getConceptDetails(concept)
    }));
  };

  const getMasteryColor = (masteryLevel: string): string => {
    switch (masteryLevel) {
      case 'struggling':
        return 'text-struggling';
      case 'learning':
        return 'text-learning';
      case 'proficient':
        return 'text-proficient';
      case 'mastered':
        return 'text-mastered';
      default:
        return 'text-gray-500';
    }
  };

  const getMasteryBgColor = (masteryLevel: string): string => {
    switch (masteryLevel) {
      case 'struggling':
        return 'bg-struggling/10';
      case 'learning':
        return 'bg-learning/10';
      case 'proficient':
        return 'bg-proficient/10';
      case 'mastered':
        return 'bg-mastered/10';
      default:
        return 'bg-gray-100';
    }
  };

  return {
    conceptsByLevel,
    masteryStats,
    overallAccuracy,
    getConceptDetails,
    getConceptsNeedingWork,
    getMasteryColor,
    getMasteryBgColor
  };
}
