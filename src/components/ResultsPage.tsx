import { useLocation, Link } from 'react-router-dom';
import { Button } from './shared/Button';

export function ResultsPage() {
  const location = useLocation();
  const stats = location.state?.stats;

  if (!stats) {
    return (
      <div className="max-w-2xl mx-auto p-6 text-center">
        <p className="text-gray-600 dark:text-gray-400 mb-4">No results to display</p>
        <Link to="/">
          <Button variant="primary">Go Home</Button>
        </Link>
      </div>
    );
  }

  const { total, correct, incorrect, accuracy } = stats;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center">
        <h1 className="text-3xl font-bold mb-6">Session Complete!</h1>

        {/* Big accuracy circle */}
        <div className="mb-8">
          <div className="relative inline-flex items-center justify-center w-48 h-48 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white">
            <div>
              <div className="text-5xl font-bold">{accuracy}%</div>
              <div className="text-sm opacity-90">Accuracy</div>
            </div>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-2xl font-bold text-gray-800 dark:text-gray-100">{total}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total</div>
          </div>
          <div className="p-4 bg-green-50 dark:bg-green-900/30 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{correct}</div>
            <div className="text-sm text-green-600 dark:text-green-400">Correct</div>
          </div>
          <div className="p-4 bg-red-50 dark:bg-red-900/30 rounded-lg">
            <div className="text-2xl font-bold text-red-600">{incorrect}</div>
            <div className="text-sm text-red-600 dark:text-red-400">Incorrect</div>
          </div>
        </div>

        {/* Encouragement message */}
        <div className="mb-6">
          {accuracy === 100 ? (
            <p className="text-lg text-gray-700 dark:text-gray-300">
              🎉 Perfect score! You're mastering these concepts!
            </p>
          ) : accuracy >= 80 ? (
            <p className="text-lg text-gray-700 dark:text-gray-300">
              ✨ Great job! Keep up the excellent work!
            </p>
          ) : accuracy >= 60 ? (
            <p className="text-lg text-gray-700 dark:text-gray-300">
              💪 Good effort! Review the concepts you missed and try again.
            </p>
          ) : (
            <p className="text-lg text-gray-700 dark:text-gray-300">
              📚 Don't give up! Learning takes time. Review the resources and practice more.
            </p>
          )}
        </div>

        {/* Action buttons */}
        <div className="space-y-3">
          <Link to="/practice/daily">
            <Button variant="primary" size="large" fullWidth>
              Practice Again
            </Button>
          </Link>
          <Link to="/weak-areas">
            <Button variant="outline" size="large" fullWidth>
              View Progress
            </Button>
          </Link>
          <Link to="/">
            <Button variant="secondary" size="large" fullWidth>
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
