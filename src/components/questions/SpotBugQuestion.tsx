import { useState } from 'react';
import type { Question } from '../../types';
import { Button } from '../shared/Button';
import { CodeBlock } from '../shared/CodeBlock';

interface SpotBugQuestionProps {
  question: Question;
  onSubmit: (answer: string) => void;
  showResult?: boolean;
  isCorrect?: boolean;
}

export function SpotBugQuestion({
  question,
  onSubmit,
  showResult = false,
  isCorrect = false
}: SpotBugQuestionProps) {
  const [bugDescription, setBugDescription] = useState('');

  const handleSubmit = () => {
    if (bugDescription.trim()) {
      onSubmit(bugDescription.trim());
    }
  };

  return (
    <div className="space-y-6">
      <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
        <p className="text-sm font-medium text-red-800 dark:text-red-300 flex items-center gap-2">
          <span>🐛</span> This code has a bug!
        </p>
      </div>

      {question.codeSnippet && (
        <CodeBlock code={question.codeSnippet} language="python" />
      )}

      <div className="space-y-4">
        {!showResult ? (
          <div>
            <label htmlFor="bug-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Describe the bug:
            </label>
            <textarea
              id="bug-input"
              value={bugDescription}
              onChange={(e) => setBugDescription(e.target.value)}
              placeholder="What's wrong with this code?"
              rows={4}
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all resize-none"
              autoFocus
            />
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Tip: Explain what's wrong and why it's a problem
            </p>
          </div>
        ) : (
          <>
            {bugDescription && (
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Your answer:</p>
                <p className="text-gray-800 dark:text-gray-200">{bugDescription}</p>
              </div>
            )}

            <div className={`p-4 rounded-lg ${isCorrect ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' : 'bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800'}`}>
              <p className="text-sm font-medium mb-2 flex items-center gap-2">
                {isCorrect ? <span className="text-green-600">✓</span> : <span className="text-yellow-600">ℹ</span>}
                The bug:
              </p>
              <p className="text-gray-800 dark:text-gray-200">{question.correctAnswer}</p>
            </div>
          </>
        )}
      </div>

      {!showResult && (
        <Button
          onClick={handleSubmit}
          disabled={!bugDescription.trim()}
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
