import { useState } from 'react';
import type { Question } from '../../types';
import { Button } from '../shared/Button';

interface MultipleChoiceQuestionProps {
  question: Question;
  onSubmit: (answer: string) => void;
  showResult?: boolean;
  isCorrect?: boolean;
}

export function MultipleChoiceQuestion({
  question,
  onSubmit,
  showResult = false,
  isCorrect = false
}: MultipleChoiceQuestionProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleSubmit = () => {
    if (selectedOption) {
      onSubmit(selectedOption);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {question.options?.map((option, index) => {
          const isSelected = selectedOption === option;
          const isCorrectAnswer = showResult && option === question.correctAnswer;
          const isWrongSelection = showResult && isSelected && !isCorrect;

          let optionClasses = 'w-full text-left p-4 rounded-lg border-2 transition-all ';

          if (showResult) {
            if (isCorrectAnswer) {
              optionClasses += 'border-green-500 bg-green-50 dark:bg-green-900/20';
            } else if (isWrongSelection) {
              optionClasses += 'border-red-500 bg-red-50 dark:bg-red-900/20';
            } else {
              optionClasses += 'border-gray-200 dark:border-gray-700 opacity-50';
            }
          } else {
            optionClasses += isSelected
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
              : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 hover:bg-gray-50 dark:hover:bg-gray-800';
          }

          return (
            <button
              key={index}
              onClick={() => !showResult && setSelectedOption(option)}
              disabled={showResult}
              className={optionClasses}
            >
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-medium">
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="flex-1 text-left">{option}</span>
                {showResult && isCorrectAnswer && (
                  <span className="flex-shrink-0 text-green-600">✓</span>
                )}
                {showResult && isWrongSelection && (
                  <span className="flex-shrink-0 text-red-600">✗</span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {!showResult && (
        <Button
          onClick={handleSubmit}
          disabled={!selectedOption}
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
