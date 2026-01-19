import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { UserProgress, PracticeMode } from '../types';
import { useSession } from '../hooks/useSession';
import { QuestionRenderer } from './questions/QuestionRenderer';
import { ProgressBar } from './shared/ProgressBar';
import { Button } from './shared/Button';
import { LearningPanel } from './LearningPanel';
import { saveSessionToHistory } from '../utils/storage';

interface PracticeSessionProps {
  userProgress: UserProgress;
  onSessionComplete: (session: any) => void;
}

export function PracticeSession({ userProgress, onSessionComplete }: PracticeSessionProps) {
  const navigate = useNavigate();
  const { mode, concept } = useParams<{ mode: string; concept?: string }>();

  const {
    currentSession,
    currentQuestion,
    isSessionActive,
    startNewSession,
    submitAnswer,
    nextQuestion,
    getSessionProgress,
    getSessionStats,
    clearSession
  } = useSession(userProgress);

  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showLearningPanel, setShowLearningPanel] = useState(false);

  // Start session when component mounts
  useEffect(() => {
    if (!isSessionActive && mode) {
      const practiceMode = mode as PracticeMode;
      startNewSession(practiceMode, concept);
    }
  }, [mode, concept]);

  const handleSubmit = (answer: string | string[]) => {
    const correct = submitAnswer(answer);
    setIsCorrect(correct);
    setShowResult(true);

    // Show learning panel if answer is wrong
    if (!correct) {
      setShowLearningPanel(true);
    }
  };

  const handleNext = () => {
    setShowResult(false);
    setShowLearningPanel(false);
    nextQuestion();
  };

  const handleFinish = () => {
    if (currentSession) {
      onSessionComplete(currentSession);
      saveSessionToHistory(currentSession, userProgress);
    }
    clearSession();
    navigate('/results', { state: { stats: getSessionStats() } });
  };

  const progress = getSessionProgress();

  if (!currentQuestion) {
    return (
      <div className="max-w-2xl mx-auto p-6 text-center">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
          <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }

  const isLastQuestion = progress.current === progress.total;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Progress bar */}
      <div className="mb-8">
        <ProgressBar
          current={progress.current}
          total={progress.total}
          showLabel={true}
          color="gradient"
        />
      </div>

      {/* Question card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-6">
        {/* Category and difficulty badges */}
        <div className="flex gap-2 mb-4">
          <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-sm font-medium">
            {currentQuestion.category.toUpperCase()}
          </span>
          <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded-full text-sm font-medium">
            {currentQuestion.difficulty}
          </span>
        </div>

        {/* Question text */}
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">
          {currentQuestion.question}
        </h2>

        {/* Question component */}
        <QuestionRenderer
          question={currentQuestion}
          onSubmit={handleSubmit}
          showResult={showResult}
          isCorrect={isCorrect}
        />

        {/* Result feedback */}
        {showResult && (
          <div className="mt-6">
            <div className={`p-4 rounded-lg ${isCorrect ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'}`}>
              <p className="font-semibold text-lg mb-2 flex items-center gap-2">
                {isCorrect ? (
                  <>
                    <span className="text-green-600">✓</span>
                    <span className="text-green-800 dark:text-green-300">Correct!</span>
                  </>
                ) : (
                  <>
                    <span className="text-red-600">✗</span>
                    <span className="text-red-800 dark:text-red-300">Not quite right</span>
                  </>
                )}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                {currentQuestion.briefExplanation}
              </p>
            </div>

            {/* Next/Finish button */}
            <div className="mt-4">
              {isLastQuestion ? (
                <Button onClick={handleFinish} variant="success" size="large" fullWidth>
                  Finish Session
                </Button>
              ) : (
                <Button onClick={handleNext} variant="primary" size="large" fullWidth>
                  Next Question →
                </Button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Learning panel (shown when answer is wrong) */}
      {showLearningPanel && !isCorrect && (
        <LearningPanel
          concept={currentQuestion.subcategory}
          userProgress={userProgress}
          onClose={() => setShowLearningPanel(false)}
        />
      )}

      {/* Exit button */}
      <div className="text-center">
        <button
          onClick={() => navigate('/')}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-sm"
        >
          ← Back to Home
        </button>
      </div>
    </div>
  );
}
