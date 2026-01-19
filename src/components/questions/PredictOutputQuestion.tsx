import { useState } from 'react';
import type { Question } from '../../types';
import { Button } from '../shared/Button';
import { CodeBlock } from '../shared/CodeBlock';

interface PredictOutputQuestionProps {
  question: Question;
  onSubmit: (answer: string) => void;
  showResult?: boolean;
  isCorrect?: boolean;
}

export function PredictOutputQuestion({
  question,
  onSubmit,
  showResult = false,
  isCorrect = false
}: PredictOutputQuestionProps) {
  const [prediction, setPrediction] = useState('');

  const handleSubmit = () => {
    if (prediction.trim()) {
      onSubmit(prediction.trim());
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.shiftKey) {
      // Allow Shift+Enter for new lines
      return;
    } else if (e.key === 'Enter' && prediction.trim()) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="space-y-6">
      {question.codeSnippet && (
        <CodeBlock code={question.codeSnippet} language="python" />
      )}

      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
        <p className="text-sm font-medium text-blue-800 dark:text-blue-300 flex items-center gap-2">
          <span>💡</span> What will this code output?
        </p>
      </div>

      <div className="space-y-4">
        {!showResult ? (
          <div>
            <label htmlFor="prediction-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Predicted output:
            </label>
            <textarea
              id="prediction-input"
              value={prediction}
              onChange={(e) => setPrediction(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter the expected output..."
              rows={3}
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all resize-none font-mono"
              autoFocus
            />
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Tip: Be precise with brackets, quotes, and spacing
            </p>
          </div>
        ) : (
          <>
            {prediction && (
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Your prediction:</p>
                <pre className="text-gray-800 dark:text-gray-200 font-mono whitespace-pre-wrap">{prediction}</pre>
              </div>
            )}

            <div className={`p-4 rounded-lg ${isCorrect ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' : 'bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800'}`}>
              <p className="text-sm font-medium mb-2 flex items-center gap-2">
                {isCorrect ? <span className="text-green-600">✓</span> : <span className="text-yellow-600">ℹ</span>}
                Correct output:
              </p>
              <pre className="text-gray-800 dark:text-gray-200 font-mono whitespace-pre-wrap">{question.correctAnswer}</pre>
            </div>
          </>
        )}
      </div>

      {!showResult && (
        <Button
          onClick={handleSubmit}
          disabled={!prediction.trim()}
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
