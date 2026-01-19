import { Link } from 'react-router-dom';
import type { UserProgress } from '../types';
import { StreakDisplay } from './shared/StreakDisplay';
import { MasteryBadge } from './shared/MasteryBadge';
import { useMastery } from '../hooks/useMastery';
import { formatConceptName } from '../utils/resourceManager';

interface HomePageProps {
  userProgress: UserProgress;
}

export function HomePage({ userProgress }: HomePageProps) {
  const { overallAccuracy, getConceptsNeedingWork, masteryStats } = useMastery(userProgress);
  const conceptsNeedingWork = getConceptsNeedingWork(5);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header with streak */}
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          ML Concepts Quiz
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Master Machine Learning, Python, and SQL
        </p>
      </div>

      {/* Streak display */}
      <div className="flex justify-center">
        <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
          <StreakDisplay
            streak={userProgress.streak}
            longestStreak={userProgress.longestStreak}
            showLongest={true}
          />
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow text-center">
          <div className="text-3xl font-bold text-blue-600">{userProgress.totalAnswered}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Questions Answered</div>
        </div>
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow text-center">
          <div className="text-3xl font-bold text-green-600">{overallAccuracy}%</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Overall Accuracy</div>
        </div>
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow text-center">
          <div className="text-3xl font-bold text-purple-600">{masteryStats.totalConcepts}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Concepts Practiced</div>
        </div>
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow text-center">
          <div className="text-3xl font-bold text-yellow-600">{userProgress.practiceDates.length}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Practice Days</div>
        </div>
      </div>

      {/* Practice modes */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Start Practicing</h2>

        <div className="grid md:grid-cols-2 gap-4">
          <Link to="/practice/daily" className="block">
            <div className="p-6 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-lg shadow-lg text-white transition-all transform hover:scale-105">
              <div className="text-3xl mb-2">📚</div>
              <h3 className="text-xl font-bold mb-2">Daily Practice</h3>
              <p className="text-blue-100 text-sm">
                12 mixed questions from all topics
              </p>
            </div>
          </Link>

          <Link to="/practice/weak-areas" className="block">
            <div className="p-6 bg-gradient-to-br from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 rounded-lg shadow-lg text-white transition-all transform hover:scale-105">
              <div className="text-3xl mb-2">💪</div>
              <h3 className="text-xl font-bold mb-2">Practice Weak Areas</h3>
              <p className="text-orange-100 text-sm">
                Focus on concepts you're struggling with
              </p>
            </div>
          </Link>

          <Link to="/practice/quick-review" className="block">
            <div className="p-6 bg-gradient-to-br from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 rounded-lg shadow-lg text-white transition-all transform hover:scale-105">
              <div className="text-3xl mb-2">⚡</div>
              <h3 className="text-xl font-bold mb-2">Quick Review</h3>
              <p className="text-green-100 text-sm">
                5 flashcards for quick practice
              </p>
            </div>
          </Link>

          <Link to="/weak-areas" className="block">
            <div className="p-6 bg-gradient-to-br from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 rounded-lg shadow-lg text-white transition-all transform hover:scale-105">
              <div className="text-3xl mb-2">📊</div>
              <h3 className="text-xl font-bold mb-2">View Progress</h3>
              <p className="text-purple-100 text-sm">
                See your mastery levels and stats
              </p>
            </div>
          </Link>
        </div>
      </div>

      {/* Concepts needing work */}
      {conceptsNeedingWork.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Concepts to Review</h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="space-y-3">
              {conceptsNeedingWork.map(({ concept, accuracy, masteryLevel, timesSeen, timesCorrect }) => (
                <Link
                  key={concept}
                  to={`/practice/concept/${concept}`}
                  className="block p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{formatConceptName(concept)}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {timesCorrect}/{timesSeen} correct • {accuracy}% accuracy
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <MasteryBadge level={masteryLevel} />
                      <span className="text-gray-400">→</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
