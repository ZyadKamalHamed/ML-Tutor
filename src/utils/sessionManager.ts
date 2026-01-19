import type { Question, Difficulty, PracticeSession, UserProgress } from '../types';
import { questions } from '../data/questions';

// Generate a unique session ID
export function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Shuffle array using Fisher-Yates algorithm
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Generate a daily practice session
 * Composition: 40% weak areas, 30% learning, 20% proficient, 10% mastered
 * Total: 12 questions, mixed types
 */
export function generateDailySession(
  userProgress: UserProgress
): PracticeSession {
  const difficulty = userProgress.settings.difficulty;
  const conceptMastery = userProgress.conceptMastery;

  // Categorize concepts by mastery level
  const struggling: string[] = [];
  const learning: string[] = [];
  const proficient: string[] = [];
  const mastered: string[] = [];

  Object.entries(conceptMastery).forEach(([concept, mastery]) => {
    switch (mastery.masteryLevel) {
      case 'struggling':
        struggling.push(concept);
        break;
      case 'learning':
        learning.push(concept);
        break;
      case 'proficient':
        proficient.push(concept);
        break;
      case 'mastered':
        mastered.push(concept);
        break;
    }
  });

  // Calculate target counts (40% struggling, 30% learning, 20% proficient, 10% mastered)
  const strugglingCount = 5;
  const learningCount = 3;
  const proficientCount = 3;
  const masteredCount = 1;

  const selectedQuestions: Question[] = [];

  // Filter questions by difficulty
  const availableQuestions = questions.filter(
    q => q.difficulty === difficulty || difficulty === 'intermediate'
  );

  // Add struggling concept questions
  if (struggling.length > 0) {
    const strugglingQuestions = availableQuestions.filter(q =>
      struggling.includes(q.subcategory)
    );
    selectedQuestions.push(...shuffleArray(strugglingQuestions).slice(0, strugglingCount));
  }

  // Add learning concept questions
  if (learning.length > 0) {
    const learningQuestions = availableQuestions.filter(q =>
      learning.includes(q.subcategory)
    );
    selectedQuestions.push(...shuffleArray(learningQuestions).slice(0, learningCount));
  }

  // Add proficient concept questions
  if (proficient.length > 0) {
    const proficientQuestions = availableQuestions.filter(q =>
      proficient.includes(q.subcategory)
    );
    selectedQuestions.push(...shuffleArray(proficientQuestions).slice(0, proficientCount));
  }

  // Add mastered concept questions
  if (mastered.length > 0) {
    const masteredQuestions = availableQuestions.filter(q =>
      mastered.includes(q.subcategory)
    );
    selectedQuestions.push(...shuffleArray(masteredQuestions).slice(0, masteredCount));
  }

  // Fill remaining slots with random questions
  while (selectedQuestions.length < 12) {
    const remaining = availableQuestions.filter(
      q => !selectedQuestions.find(sq => sq.id === q.id)
    );
    if (remaining.length === 0) break;
    selectedQuestions.push(remaining[Math.floor(Math.random() * remaining.length)]);
  }

  return {
    id: generateSessionId(),
    questions: shuffleArray(selectedQuestions).slice(0, 12),
    results: [],
    startTime: new Date().toISOString()
  };
}

/**
 * Generate a weak areas focused session
 * All questions from struggling concepts
 */
export function generateWeakAreasSession(
  userProgress: UserProgress
): PracticeSession {
  const weakAreas = userProgress.weakAreas;
  const difficulty = userProgress.settings.difficulty;

  const weakQuestions = questions.filter(
    q => weakAreas.includes(q.subcategory) &&
         (q.difficulty === difficulty || difficulty === 'intermediate')
  );

  return {
    id: generateSessionId(),
    questions: shuffleArray(weakQuestions).slice(0, 10),
    results: [],
    startTime: new Date().toISOString()
  };
}

/**
 * Generate a concept-focused session
 * 5-10 questions on a specific concept
 */
export function generateConceptSession(
  concept: string,
  difficulty: Difficulty,
  count: number = 5
): PracticeSession {
  const conceptQuestions = questions.filter(
    q => q.subcategory === concept &&
         (q.difficulty === difficulty || difficulty === 'intermediate')
  );

  return {
    id: generateSessionId(),
    focusConcept: concept,
    questions: shuffleArray(conceptQuestions).slice(0, count),
    results: [],
    startTime: new Date().toISOString()
  };
}

/**
 * Generate a quick review session
 * 5 flashcard questions only
 */
export function generateQuickReview(
  userProgress: UserProgress
): PracticeSession {
  const difficulty = userProgress.settings.difficulty;

  const flashcards = questions.filter(
    q => q.type === 'flashcard' &&
         (q.difficulty === difficulty || difficulty === 'intermediate')
  );

  return {
    id: generateSessionId(),
    questions: shuffleArray(flashcards).slice(0, 5),
    results: [],
    startTime: new Date().toISOString()
  };
}

/**
 * Get related questions for a concept
 */
export function getRelatedQuestions(
  concept: string,
  difficulty: Difficulty,
  count: number = 3
): Question[] {
  const relatedQuestions = questions.filter(
    q => q.subcategory === concept &&
         (q.difficulty === difficulty || difficulty === 'intermediate')
  );

  return shuffleArray(relatedQuestions).slice(0, count);
}

/**
 * Evaluate if an answer is correct
 */
export function evaluateAnswer(
  question: Question,
  userAnswer: string | string[]
): boolean {
  const correctAnswer = question.correctAnswer;

  // Handle array answers (multiple correct answers)
  if (Array.isArray(correctAnswer)) {
    if (!Array.isArray(userAnswer)) return false;
    return userAnswer.length === correctAnswer.length &&
           userAnswer.every(ans => correctAnswer.includes(ans));
  }

  // Handle string answers (case-insensitive, trimmed)
  if (typeof userAnswer === 'string') {
    const normalizedUser = userAnswer.trim().toLowerCase();
    const normalizedCorrect = correctAnswer.trim().toLowerCase();

    // For fill-blank questions, allow minor variations
    if (question.type === 'fill-blank') {
      return normalizedUser === normalizedCorrect ||
             normalizedUser.includes(normalizedCorrect) ||
             normalizedCorrect.includes(normalizedUser);
    }

    return normalizedUser === normalizedCorrect;
  }

  return false;
}

/**
 * Calculate session statistics
 */
export function calculateSessionStats(session: PracticeSession) {
  const total = session.results.length;
  const correct = session.results.filter(r => r.correct).length;
  const accuracy = total > 0 ? (correct / total) * 100 : 0;

  return {
    total,
    correct,
    incorrect: total - correct,
    accuracy: Math.round(accuracy),
    averageTime: session.results.reduce((sum, r) => sum + r.timeSpent, 0) / total || 0
  };
}
