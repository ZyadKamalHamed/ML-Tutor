interface ProgressBarProps {
  current: number;
  total: number;
  showLabel?: boolean;
  color?: 'blue' | 'green' | 'purple' | 'gradient';
  height?: 'small' | 'medium' | 'large';
}

export function ProgressBar({
  current,
  total,
  showLabel = true,
  color = 'blue',
  height = 'medium'
}: ProgressBarProps) {
  const percentage = total > 0 ? (current / total) * 100 : 0;

  const heightClasses = {
    small: 'h-1.5',
    medium: 'h-2.5',
    large: 'h-4'
  };

  const colorClasses = {
    blue: 'bg-blue-600',
    green: 'bg-green-600',
    purple: 'bg-purple-600',
    gradient: 'bg-gradient-to-r from-blue-500 to-purple-600'
  };

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between items-center mb-2 text-sm">
          <span className="text-gray-700 dark:text-gray-300 font-medium">
            Question {current} of {total}
          </span>
          <span className="text-gray-500 dark:text-gray-400">
            {Math.round(percentage)}%
          </span>
        </div>
      )}
      <div className={`w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden ${heightClasses[height]}`}>
        <div
          className={`${heightClasses[height]} ${colorClasses[color]} transition-all duration-300 ease-out rounded-full`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
