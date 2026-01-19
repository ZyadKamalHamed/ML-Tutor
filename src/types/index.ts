export type QuestionType =
  | 'multiple-choice'
  | 'fill-blank'
  | 'explain-code'
  | 'flashcard'
  | 'spot-bug'
  | 'predict-output';

export type Category = 'ml-concepts' | 'python' | 'sql';

export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

export type MasteryLevel = 'struggling' | 'learning' | 'proficient' | 'mastered';

export interface Question {
  id: string;
  type: QuestionType;
  category: Category;
  subcategory: string; // e.g., 'backpropagation', 'pandas', 'joins'
  difficulty: Difficulty;
  question: string;
  codeSnippet?: string;
  options?: string[]; // for multiple-choice
  correctAnswer: string | string[];
  briefExplanation: string; // 2-3 sentences max
  detailedExplanation?: string; // optional longer explanation
  relatedConcepts?: string[]; // concepts this builds on
}

export interface ResourceLink {
  title: string;
  url: string;
  duration?: string; // for videos
  readTime?: string; // for articles
  provider?: string; // e.g., '3Blue1Brown', 'StatQuest'
  description?: string; // for interactive tools/practice
}

export interface LearningResource {
  concept: string;
  resources: {
    video?: ResourceLink;
    article?: ResourceLink;
    interactive?: ResourceLink;
    documentation?: ResourceLink;
    practice?: ResourceLink;
  };
  prerequisites?: string[]; // concepts to learn first
}

export interface ConceptMastery {
  timesSeen: number;
  timesCorrect: number;
  lastSeen: string;
  masteryLevel: MasteryLevel;
  resourcesViewed?: boolean;
}

export interface UserSettings {
  difficulty: Difficulty;
  darkMode: boolean;
}

export interface UserProgress {
  streak: number;
  longestStreak: number;
  lastPracticeDate: string;
  totalAnswered: number;
  conceptMastery: {
    [concept: string]: ConceptMastery;
  };
  weakAreas: string[]; // Top 5 concepts with lowest accuracy
  practiceDates: string[];
  settings: UserSettings;
}

export interface SessionResult {
  questionId: string;
  correct: boolean;
  timeSpent: number;
  userAnswer?: string | string[];
}

export interface PracticeSession {
  id: string;
  focusConcept?: string; // if practicing specific concept
  questions: Question[];
  results: SessionResult[];
  startTime: string;
  endTime?: string;
}

export interface SessionHistory {
  [sessionId: string]: {
    date: string;
    questionsAnswered: number;
    correctAnswers: number;
    conceptsCovered: string[];
    resourcesAccessed: string[];
  };
}

// Practice session modes
export type PracticeMode =
  | 'daily' // Mixed 12 questions, all categories
  | 'weak-areas' // 10 questions from struggling concepts
  | 'concept-dive' // 5-10 questions on single concept
  | 'quick-review'; // 5 flashcards only

// Storage schema for localStorage
export interface StorageSchema {
  userProgress: UserProgress;
  sessionHistory: SessionHistory;
  currentSession?: PracticeSession;
}
