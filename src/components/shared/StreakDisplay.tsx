interface StreakDisplayProps {
  streak: number;
  longestStreak: number;
  size?: 'small' | 'medium' | 'large';
  showLongest?: boolean;
}

export function StreakDisplay({
  streak,
  longestStreak,
  size = 'medium',
  showLongest = false
}: StreakDisplayProps) {
  const sizeClasses = {
    small: 'text-2xl',
    medium: 'text-4xl',
    large: 'text-6xl'
  };

  const iconSizeClasses = {
    small: 'text-xl',
    medium: 'text-3xl',
    large: 'text-5xl'
  };

  const getStreakColor = (streakValue: number) => {
    if (streakValue >= 30) return 'text-purple-500';
    if (streakValue >= 14) return 'text-blue-500';
    if (streakValue >= 7) return 'text-green-500';
    if (streakValue >= 3) return 'text-yellow-500';
    return 'text-orange-500';
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex items-center gap-3">
        <span className={`${iconSizeClasses[size]} ${getStreakColor(streak)}`}>
          🔥
        </span>
        <div className="flex flex-col">
          <span className={`${sizeClasses[size]} font-bold ${getStreakColor(streak)}`}>
            {streak}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            day streak
          </span>
        </div>
      </div>

      {showLongest && longestStreak > 0 && (
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Longest streak: <span className="font-semibold">{longestStreak}</span> days
        </div>
      )}
    </div>
  );
}
