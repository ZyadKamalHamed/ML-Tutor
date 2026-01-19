import { useState } from 'react';
import type { PracticeSession, Question, SessionResult, PracticeMode, UserProgress } from '../types';
import {
  generateDailySession,
  generateWeakAreasSession,
  generateConceptSession,
  generateQuickReview,
  evaluateAnswer,
  calculateSessionStats
} from '../utils/sessionManager';

export function useSession(userProgress: UserProgress) {
  const [currentSession, setCurrentSession] = useState<PracticeSession | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [isSessionActive, setIsSessionActive] = useState(false);

  const startNewSession = (mode: PracticeMode, concept?: string) => {
    let session: PracticeSession;

    switch (mode) {
      case 'daily':
        session = generateDailySession(userProgress);
        break;
      case 'weak-areas':
        session = generateWeakAreasSession(userProgress);
        break;
      case 'concept-dive':
        if (!concept) {
          throw new Error('Concept is required for concept-dive mode');
        }
        session = generateConceptSession(concept, userProgress.settings.difficulty, 5);
        break;
      case 'quick-review':
        session = generateQuickReview(userProgress);
        break;
      default:
        session = generateDailySession(userProgress);
    }

    setCurrentSession(session);
    setCurrentQuestionIndex(0);
    setStartTime(Date.now());
    setIsSessionActive(true);
  };

  const getCurrentQuestion = (): Question | null => {
    if (!currentSession || currentQuestionIndex >= currentSession.questions.length) {
      return null;
    }
    return currentSession.questions[currentQuestionIndex];
  };

  const submitAnswer = (userAnswer: string | string[]): boolean => {
    if (!currentSession) return false;

    const question = getCurrentQuestion();
    if (!question) return false;

    const correct = evaluateAnswer(question, userAnswer);
    const timeSpent = Math.floor((Date.now() - startTime) / 1000); // in seconds

    const result: SessionResult = {
      questionId: question.id,
      correct,
      timeSpent,
      userAnswer
    };

    setCurrentSession({
      ...currentSession,
      results: [...currentSession.results, result]
    });

    return correct;
  };

  const nextQuestion = () => {
    if (!currentSession) return;

    if (currentQuestionIndex < currentSession.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setStartTime(Date.now());
    } else {
      endSession();
    }
  };

  const endSession = () => {
    if (!currentSession) return;

    setCurrentSession({
      ...currentSession,
      endTime: new Date().toISOString()
    });
    setIsSessionActive(false);
  };

  const getSessionProgress = () => {
    if (!currentSession) return { current: 0, total: 0 };

    return {
      current: currentQuestionIndex + 1,
      total: currentSession.questions.length
    };
  };

  const getSessionStats = () => {
    if (!currentSession) return null;
    return calculateSessionStats(currentSession);
  };

  const isSessionComplete = () => {
    if (!currentSession) return false;
    return currentSession.results.length === currentSession.questions.length;
  };

  const clearSession = () => {
    setCurrentSession(null);
    setCurrentQuestionIndex(0);
    setIsSessionActive(false);
  };

  return {
    currentSession,
    currentQuestion: getCurrentQuestion(),
    currentQuestionIndex,
    isSessionActive,
    startNewSession,
    submitAnswer,
    nextQuestion,
    endSession,
    getSessionProgress,
    getSessionStats,
    isSessionComplete,
    clearSession
  };
}
