import { Link } from 'react-router-dom';
import type { UserProgress } from '../types';
import { MasteryBadge } from './shared/MasteryBadge';
import { Button } from './shared/Button';
import { useMastery } from '../hooks/useMastery';
import { formatConceptName } from '../utils/resourceManager';

interface WeakAreasPageProps {
  userProgress: UserProgress;
}

export function WeakAreasPage({ userProgress }: WeakAreasPageProps) {
  const { conceptsByLevel, masteryStats, overallAccuracy } = useMastery(userProgress);

  const allConcepts = [
    ...conceptsByLevel.struggling.map(c => ({ concept: c, level: 'struggling' as const })),
    ...conceptsByLevel.learning.map(c => ({ concept: c, level: 'learning' as const })),
    ...conceptsByLevel.proficient.map(c => ({ concept: c, level: 'proficient' as const })),
    ...conceptsByLevel.mastered.map(c => ({ concept: c, level: 'mastered' as const }))
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div>
        <Link to="/" className="text-blue-600 dark:text-blue-400 hover:underline mb-4 inline-block">
          ← Back to Home
        </Link>
        <h1 className="text-3xl font-bold mb-2">Your Progress</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Track your mastery across all concepts
        </p>
      </div>

      {/* Overall stats */}
      <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow text-center">
          <div className="text-3xl font-bold text-blue-600">{overallAccuracy}%</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Overall</div>
        </div>
        <div className="p-4 bg-red-50 dark:bg-red-900/30 rounded-lg shadow text-center">
          <div className="text-3xl font-bold text-red-600">{masteryStats.strugglingPercent}%</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Struggling</div>
        </div>
        <div className="p-4 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg shadow text-center">
          <div className="text-3xl font-bold text-yellow-600">{masteryStats.learningPercent}%</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Learning</div>
        </div>
        <div className="p-4 bg-green-50 dark:bg-green-900/30 rounded-lg shadow text-center">
          <div className="text-3xl font-bold text-green-600">{masteryStats.proficientPercent}%</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Proficient</div>
        </div>
        <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg shadow text-center">
          <div className="text-3xl font-bold text-blue-600">{masteryStats.masteredPercent}%</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Mastered</div>
        </div>
      </div>

      {/* Concepts list */}
      <div className="space-y-6">
        {/* Struggling concepts */}
        {conceptsByLevel.struggling.length > 0 && (
          <div>
            <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
              <span>⚠️</span> Struggling ({conceptsByLevel.struggling.length})
            </h2>
            <div className="space-y-2">
              {conceptsByLevel.struggling.map(concept => {
                const mastery = userProgress.conceptMastery[concept];
                const accuracy = Math.round((mastery.timesCorrect / mastery.timesSeen) * 100);

                return (
                  <div key={concept} className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-lg">{formatConceptName(concept)}</h3>
                      <MasteryBadge level="struggling" />
                    </div>
                    <div className="flex items-center gap-4 mb-3">
                      <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-red-500 h-2 rounded-full"
                          style={{ width: `${accuracy}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {mastery.timesCorrect}/{mastery.timesSeen} • {accuracy}%
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Link to={`/practice/concept/${concept}`} className="flex-1">
                        <Button variant="primary" size="small" fullWidth>
                          Practice
                        </Button>
                      </Link>
                      <Link to={`/resources/${concept}`} className="flex-1">
                        <Button variant="outline" size="small" fullWidth>
                          Learn
                        </Button>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Learning concepts */}
        {conceptsByLevel.learning.length > 0 && (
          <div>
            <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
              <span>📚</span> Learning ({conceptsByLevel.learning.length})
            </h2>
            <div className="space-y-2">
              {conceptsByLevel.learning.map(concept => {
                const mastery = userProgress.conceptMastery[concept];
                const accuracy = Math.round((mastery.timesCorrect / mastery.timesSeen) * 100);

                return (
                  <div key={concept} className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{formatConceptName(concept)}</h3>
                      <MasteryBadge level="learning" size="small" />
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-yellow-500 h-2 rounded-full"
                          style={{ width: `${accuracy}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {accuracy}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Proficient concepts */}
        {conceptsByLevel.proficient.length > 0 && (
          <div>
            <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
              <span>✅</span> Proficient ({conceptsByLevel.proficient.length})
            </h2>
            <div className="grid md:grid-cols-2 gap-2">
              {conceptsByLevel.proficient.map(concept => {
                const mastery = userProgress.conceptMastery[concept];
                const accuracy = Math.round((mastery.timesCorrect / mastery.timesSeen) * 100);

                return (
                  <div key={concept} className="bg-white dark:bg-gray-800 rounded-lg shadow p-3">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">{formatConceptName(concept)}</span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">{accuracy}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Mastered concepts */}
        {conceptsByLevel.mastered.length > 0 && (
          <div>
            <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
              <span>🏆</span> Mastered ({conceptsByLevel.mastered.length})
            </h2>
            <div className="grid md:grid-cols-3 gap-2">
              {conceptsByLevel.mastered.map(concept => (
                <div key={concept} className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-3">
                  <span className="font-medium text-sm text-blue-800 dark:text-blue-300">
                    {formatConceptName(concept)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {allConcepts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Start practicing to see your progress!
            </p>
            <Link to="/practice/daily">
              <Button variant="primary">Start Daily Practice</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
