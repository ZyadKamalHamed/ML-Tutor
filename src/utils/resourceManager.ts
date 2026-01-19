import type { LearningResource, UserProgress } from '../types';
import { learningResources } from '../data/resources';

/**
 * Get resources for a specific concept
 */
export function getResourcesForConcept(concept: string): LearningResource | null {
  return learningResources[concept] || null;
}

/**
 * Check if a concept has prerequisite concepts that haven't been mastered
 */
export function checkPrerequisites(
  concept: string,
  userProgress: UserProgress
): string[] {
  const resource = learningResources[concept];
  if (!resource || !resource.prerequisites) {
    return [];
  }

  const unmasteredPrereqs: string[] = [];

  resource.prerequisites.forEach(prereq => {
    const conceptMastery = userProgress.conceptMastery[prereq];

    // If concept hasn't been seen or is struggling/learning, it's unmastered
    if (!conceptMastery ||
        conceptMastery.timesSeen === 0 ||
        conceptMastery.masteryLevel === 'struggling' ||
        conceptMastery.masteryLevel === 'learning') {
      unmasteredPrereqs.push(prereq);
    }
  });

  return unmasteredPrereqs;
}

/**
 * Get all prerequisites for a concept (including nested prerequisites)
 */
export function getAllPrerequisites(concept: string, visited: Set<string> = new Set()): string[] {
  if (visited.has(concept)) {
    return []; // Avoid circular dependencies
  }

  visited.add(concept);
  const resource = learningResources[concept];

  if (!resource || !resource.prerequisites) {
    return [];
  }

  const allPrereqs: string[] = [];

  resource.prerequisites.forEach(prereq => {
    allPrereqs.push(prereq);
    // Recursively get prerequisites of prerequisites
    const nestedPrereqs = getAllPrerequisites(prereq, visited);
    allPrereqs.push(...nestedPrereqs);
  });

  // Remove duplicates
  return Array.from(new Set(allPrereqs));
}

/**
 * Get resource availability status
 */
export function getResourceAvailability(concept: string): {
  hasVideo: boolean;
  hasArticle: boolean;
  hasInteractive: boolean;
  hasDocumentation: boolean;
  hasPractice: boolean;
} {
  const resource = learningResources[concept];

  if (!resource) {
    return {
      hasVideo: false,
      hasArticle: false,
      hasInteractive: false,
      hasDocumentation: false,
      hasPractice: false
    };
  }

  return {
    hasVideo: !!resource.resources.video,
    hasArticle: !!resource.resources.article,
    hasInteractive: !!resource.resources.interactive,
    hasDocumentation: !!resource.resources.documentation,
    hasPractice: !!resource.resources.practice
  };
}

/**
 * Get suggested learning path for a concept
 * Returns resources in recommended order
 */
export function getSuggestedLearningPath(
  concept: string,
  userProgress: UserProgress
): {
  concept: string;
  prerequisites: string[];
  unmasteredPrereqs: string[];
  suggestedOrder: Array<{
    type: 'video' | 'article' | 'interactive' | 'documentation' | 'practice';
    reason: string;
  }>;
} {
  const resource = learningResources[concept];
  const unmasteredPrereqs = checkPrerequisites(concept, userProgress);

  if (!resource) {
    return {
      concept,
      prerequisites: [],
      unmasteredPrereqs: [],
      suggestedOrder: []
    };
  }

  const suggestedOrder: Array<{
    type: 'video' | 'article' | 'interactive' | 'documentation' | 'practice';
    reason: string;
  }> = [];

  // Recommend video first (visual learning)
  if (resource.resources.video) {
    suggestedOrder.push({
      type: 'video',
      reason: 'Best for initial understanding - visual and engaging'
    });
  }

  // Then article (deeper understanding)
  if (resource.resources.article) {
    suggestedOrder.push({
      type: 'article',
      reason: 'Detailed explanation with examples'
    });
  }

  // Then interactive tool (hands-on practice)
  if (resource.resources.interactive) {
    suggestedOrder.push({
      type: 'interactive',
      reason: 'Interactive visualization for deeper insight'
    });
  }

  // Documentation for reference
  if (resource.resources.documentation) {
    suggestedOrder.push({
      type: 'documentation',
      reason: 'Official reference and technical details'
    });
  }

  // Practice exercises last
  if (resource.resources.practice) {
    suggestedOrder.push({
      type: 'practice',
      reason: 'Apply what you learned with hands-on exercises'
    });
  }

  return {
    concept,
    prerequisites: resource.prerequisites || [],
    unmasteredPrereqs,
    suggestedOrder
  };
}

/**
 * Get concepts that need review based on time since last seen
 */
export function getConceptsNeedingReview(
  userProgress: UserProgress,
  daysSinceLastSeen: number = 7
): string[] {
  const now = new Date().getTime();
  const cutoffTime = now - (daysSinceLastSeen * 24 * 60 * 60 * 1000);

  const needsReview: string[] = [];

  Object.entries(userProgress.conceptMastery).forEach(([concept, mastery]) => {
    const lastSeenTime = new Date(mastery.lastSeen).getTime();

    // Include if:
    // 1. Not mastered AND hasn't been seen in the cutoff period
    // 2. OR is mastered but hasn't been seen in 30 days (retention check)
    if ((mastery.masteryLevel !== 'mastered' && lastSeenTime < cutoffTime) ||
        (mastery.masteryLevel === 'mastered' && lastSeenTime < (now - (30 * 24 * 60 * 60 * 1000)))) {
      needsReview.push(concept);
    }
  });

  return needsReview;
}

/**
 * Format concept name for display
 */
export function formatConceptName(concept: string): string {
  return concept
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Get recommended next concepts to learn
 * Based on prerequisites of unmastered concepts
 */
export function getRecommendedNextConcepts(
  userProgress: UserProgress,
  limit: number = 3
): string[] {
  const allConcepts = Object.keys(learningResources);
  const masteredConcepts = new Set(
    Object.entries(userProgress.conceptMastery)
      .filter(([_, mastery]) => mastery.masteryLevel === 'mastered')
      .map(([concept]) => concept)
  );

  // Find concepts whose prerequisites are all mastered
  const readyConcepts = allConcepts.filter(concept => {
    const resource = learningResources[concept];

    // Skip if already mastered
    if (masteredConcepts.has(concept)) {
      return false;
    }

    // If no prerequisites, it's ready
    if (!resource.prerequisites || resource.prerequisites.length === 0) {
      return true;
    }

    // Check if all prerequisites are mastered
    return resource.prerequisites.every(prereq => masteredConcepts.has(prereq));
  });

  // Prioritize concepts that have been started but not mastered
  const started = readyConcepts.filter(concept => {
    const mastery = userProgress.conceptMastery[concept];
    return mastery && mastery.timesSeen > 0;
  });

  const notStarted = readyConcepts.filter(concept => {
    const mastery = userProgress.conceptMastery[concept];
    return !mastery || mastery.timesSeen === 0;
  });

  // Combine: started concepts first, then not started
  return [...started, ...notStarted].slice(0, limit);
}
