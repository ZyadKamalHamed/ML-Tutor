import { Link } from 'react-router-dom';
import type { UserProgress } from '../types';
import { Button } from './shared/Button';
import { getResourcesForConcept, checkPrerequisites, formatConceptName } from '../utils/resourceManager';

interface LearningPanelProps {
  concept: string;
  userProgress: UserProgress;
  onClose?: () => void;
  showPracticeButton?: boolean;
}

export function LearningPanel({
  concept,
  userProgress,
  onClose,
  showPracticeButton = true
}: LearningPanelProps) {
  const resource = getResourcesForConcept(concept);
  const prerequisites = checkPrerequisites(concept, userProgress);

  if (!resource) {
    return (
      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
        <p className="text-yellow-800 dark:text-yellow-300">
          No learning resources available for this concept yet.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border-2 border-blue-200 dark:border-blue-800">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          📚 Learn: {formatConceptName(concept)}
        </h3>
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            ✕
          </button>
        )}
      </div>

      {/* Prerequisites warning */}
      {prerequisites.length > 0 && (
        <div className="mb-6 p-4 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg">
          <p className="text-sm font-semibold text-orange-800 dark:text-orange-300 mb-2 flex items-center gap-2">
            ⚠️ Prerequisites
          </p>
          <p className="text-sm text-orange-700 dark:text-orange-400 mb-2">
            You should understand these concepts first:
          </p>
          <div className="flex flex-wrap gap-2">
            {prerequisites.map(prereq => (
              <Link
                key={prereq}
                to={`/resources/${prereq}`}
                className="px-3 py-1 bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300 rounded-full text-sm hover:bg-orange-200 dark:hover:bg-orange-900/60 transition-colors"
              >
                {formatConceptName(prereq)}
              </Link>
            ))}
          </div>
        </div>
      )}

      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Here are curated resources to help you master this concept:
      </p>

      <div className="space-y-4 mb-6">
        {/* Video resource */}
        {resource.resources.video && (
          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-500 dark:hover:border-blue-500 transition-colors">
            <div className="flex items-start gap-3">
              <span className="text-2xl flex-shrink-0">🎥</span>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-1">
                  {resource.resources.video.title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {resource.resources.video.provider} • {resource.resources.video.duration}
                </p>
                <a
                  href={resource.resources.video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
                >
                  Watch Now →
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Article resource */}
        {resource.resources.article && (
          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-500 dark:hover:border-blue-500 transition-colors">
            <div className="flex items-start gap-3">
              <span className="text-2xl flex-shrink-0">📖</span>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-1">
                  {resource.resources.article.title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {resource.resources.article.readTime} read
                </p>
                <a
                  href={resource.resources.article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
                >
                  Read Article →
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Interactive resource */}
        {resource.resources.interactive && (
          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-500 dark:hover:border-blue-500 transition-colors">
            <div className="flex items-start gap-3">
              <span className="text-2xl flex-shrink-0">🎮</span>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-1">
                  {resource.resources.interactive.title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {resource.resources.interactive.description}
                </p>
                <a
                  href={resource.resources.interactive.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
                >
                  Try Interactive Tool →
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Practice resource */}
        {resource.resources.practice && (
          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-500 dark:hover:border-blue-500 transition-colors">
            <div className="flex items-start gap-3">
              <span className="text-2xl flex-shrink-0">💪</span>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-1">
                  {resource.resources.practice.title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {resource.resources.practice.description}
                </p>
                <a
                  href={resource.resources.practice.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
                >
                  Practice Exercises →
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Documentation resource */}
        {resource.resources.documentation && (
          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-500 dark:hover:border-blue-500 transition-colors">
            <div className="flex items-start gap-3">
              <span className="text-2xl flex-shrink-0">📚</span>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-1">
                  {resource.resources.documentation.title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Official documentation and reference
                </p>
                <a
                  href={resource.resources.documentation.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
                >
                  View Documentation →
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Practice button */}
      {showPracticeButton && (
        <Link to={`/practice/concept/${concept}`}>
          <Button variant="primary" size="large" fullWidth>
            Practice 3 More Questions on This Topic
          </Button>
        </Link>
      )}
    </div>
  );
}
