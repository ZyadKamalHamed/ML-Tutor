import { useState } from 'react';
import type { Question } from '../../types';
import { Button } from '../shared/Button';

interface FillBlankQuestionProps {
  question: Question;
  onSubmit: (answer: string) => void;
  showResult?: boolean;
  isCorrect?: boolean;
}

export function FillBlankQuestion({
  question,
  onSubmit,
  showResult = false,
  isCorrect = false
}: FillBlankQuestionProps) {
  const [answer, setAnswer] = useState('');

  const handleSubmit = () => {
    if (answer.trim()) {
      onSubmit(answer.trim());
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && answer.trim()) {
      handleSubmit();
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <p className="text-lg leading-relaxed">
            {question.question.split('____').map((part, index, array) => (
              <span key={index}>
                {part}
                {index < array.length - 1 && (
                  showResult ? (
                    <span
                      className={`inline-flex px-3 py-1 mx-1 rounded font-mono font-semibold ${
                        isCorrect
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                          : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                      }`}
                    >
                      {answer}
                    </span>
                  ) : (
                    <span className="inline-flex mx-1">
                      <span className="border-b-2 border-blue-500 min-w-[120px] inline-block">
                        {answer && (
                          <span className="px-2 font-mono font-semibold text-blue-600 dark:text-blue-400">
                            {answer}
                          </span>
                        )}
                      </span>
                    </span>
                  )
                )}
              </span>
            ))}
          </p>
        </div>

        {!showResult && (
          <div>
            <label htmlFor="answer-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Your answer:
            </label>
            <input
              id="answer-input"
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your answer here..."
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
              autoFocus
            />
          </div>
        )}

        {showResult && (
          <div className={`p-4 rounded-lg ${isCorrect ? 'bg-green-50 dark:bg-green-900/20' : 'bg-yellow-50 dark:bg-yellow-900/20'}`}>
            <p className="text-sm font-medium mb-1">
              {isCorrect ? '✓ Correct answer:' : 'Correct answer:'}
            </p>
            <p className="font-mono font-semibold text-lg">
              {question.correctAnswer}
            </p>
          </div>
        )}
      </div>

      {!showResult && (
        <Button
          onClick={handleSubmit}
          disabled={!answer.trim()}
          variant="primary"
          size="large"
          fullWidth
        >
          Submit Answer
        </Button>
      )}
    </div>
  );
}
