import { useState } from 'react';
import type { Question } from '../../types';
import { Button } from '../shared/Button';

interface FlashcardQuestionProps {
  question: Question;
  onSubmit: (answer: string) => void;
  showResult?: boolean;
}

export function FlashcardQuestion({
  question,
  onSubmit,
  showResult = false
}: FlashcardQuestionProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [userRating, setUserRating] = useState<'easy' | 'medium' | 'hard' | null>(null);

  const handleRating = (rating: 'easy' | 'medium' | 'hard') => {
    setUserRating(rating);
    // For flashcards, we consider it correct if they rate it easy or medium
    onSubmit(rating === 'easy' || rating === 'medium' ? 'correct' : 'incorrect');
  };

  return (
    <div className="space-y-6">
      <div
        className={`relative min-h-[300px] perspective-1000 cursor-pointer ${!showResult && !isFlipped ? 'hover:shadow-lg' : ''}`}
        onClick={() => !showResult && !isFlipped && setIsFlipped(true)}
      >
        <div className={`absolute inset-0 transition-all duration-500 transform-style-3d ${isFlipped || showResult ? 'rotate-y-180' : ''}`}>
          {/* Front of card (Question) */}
          <div className={`absolute inset-0 backface-hidden ${isFlipped || showResult ? 'hidden' : ''}`}>
            <div className="h-full p-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-xl flex flex-col items-center justify-center text-white">
              <p className="text-sm uppercase tracking-wide mb-4 opacity-80">Question</p>
              <p className="text-2xl font-medium text-center leading-relaxed">
                {question.question}
              </p>
              {!isFlipped && !showResult && (
                <p className="mt-8 text-sm opacity-75 animate-pulse">
                  Click to reveal answer
                </p>
              )}
            </div>
          </div>

          {/* Back of card (Answer) */}
          <div className={`absolute inset-0 backface-hidden ${!isFlipped && !showResult ? 'hidden' : ''}`}>
            <div className="h-full p-8 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl shadow-xl flex flex-col items-center justify-center text-white">
              <p className="text-sm uppercase tracking-wide mb-4 opacity-80">Answer</p>
              <p className="text-xl font-medium text-center leading-relaxed">
                {question.correctAnswer}
              </p>
            </div>
          </div>
        </div>
      </div>

      {(isFlipped || showResult) && !userRating && (
        <div className="space-y-3">
          <p className="text-center text-gray-600 dark:text-gray-400 font-medium">
            How well did you know this?
          </p>
          <div className="grid grid-cols-3 gap-3">
            <Button
              variant="success"
              onClick={() => handleRating('easy')}
              disabled={showResult}
            >
              😊 Easy
            </Button>
            <Button
              variant="primary"
              onClick={() => handleRating('medium')}
              disabled={showResult}
            >
              🤔 Medium
            </Button>
            <Button
              variant="danger"
              onClick={() => handleRating('hard')}
              disabled={showResult}
            >
              😓 Hard
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
