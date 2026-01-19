import { useState } from 'react';
import type { Question } from '../../types';
import { Button } from '../shared/Button';
import { CodeBlock } from '../shared/CodeBlock';

interface ExplainCodeQuestionProps {
  question: Question;
  onSubmit: (answer: string) => void;
  showResult?: boolean;
  isCorrect?: boolean;
}

export function ExplainCodeQuestion({
  question,
  onSubmit,
  showResult = false,
  isCorrect = false
}: ExplainCodeQuestionProps) {
  const [explanation, setExplanation] = useState('');

  const handleSubmit = () => {
    if (explanation.trim()) {
      onSubmit(explanation.trim());
    }
  };

  return (
    <div className="space-y-6">
      {question.codeSnippet && (
        <CodeBlock code={question.codeSnippet} language="python" />
      )}

      <div className="space-y-4">
        {!showResult ? (
          <div>
            <label htmlFor="explanation-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Your explanation:
            </label>
            <textarea
              id="explanation-input"
              value={explanation}
              onChange={(e) => setExplanation(e.target.value)}
              placeholder="Explain what this code does..."
              rows={4}
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all resize-none"
              autoFocus
            />
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Tip: Focus on what the code does, not how it works line-by-line
            </p>
          </div>
        ) : (
          <>
            {explanation && (
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Your explanation:</p>
                <p className="text-gray-800 dark:text-gray-200">{explanation}</p>
              </div>
            )}

            <div className={`p-4 rounded-lg ${isCorrect ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' : 'bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800'}`}>
              <p className="text-sm font-medium mb-2 flex items-center gap-2">
                {isCorrect ? <span className="text-green-600">✓</span> : <span className="text-yellow-600">ℹ</span>}
                Expected answer:
              </p>
              <p className="text-gray-800 dark:text-gray-200">{question.correctAnswer}</p>
            </div>
          </>
        )}
      </div>

      {!showResult && (
        <Button
          onClick={handleSubmit}
          disabled={!explanation.trim()}
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
