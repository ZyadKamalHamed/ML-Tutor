import type { MasteryLevel } from '../../types';

interface MasteryBadgeProps {
  level: MasteryLevel;
  size?: 'small' | 'medium' | 'large';
  showIcon?: boolean;
}

export function MasteryBadge({ level, size = 'medium', showIcon = true }: MasteryBadgeProps) {
  const config = {
    struggling: {
      icon: '⚠️',
      label: 'Struggling',
      bgColor: 'bg-red-100 dark:bg-red-900/30',
      textColor: 'text-red-700 dark:text-red-400',
      borderColor: 'border-red-300 dark:border-red-700'
    },
    learning: {
      icon: '📚',
      label: 'Learning',
      bgColor: 'bg-yellow-100 dark:bg-yellow-900/30',
      textColor: 'text-yellow-700 dark:text-yellow-400',
      borderColor: 'border-yellow-300 dark:border-yellow-700'
    },
    proficient: {
      icon: '✅',
      label: 'Proficient',
      bgColor: 'bg-green-100 dark:bg-green-900/30',
      textColor: 'text-green-700 dark:text-green-400',
      borderColor: 'border-green-300 dark:border-green-700'
    },
    mastered: {
      icon: '🏆',
      label: 'Mastered',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30',
      textColor: 'text-blue-700 dark:text-blue-400',
      borderColor: 'border-blue-300 dark:border-blue-700'
    }
  };

  const sizeClasses = {
    small: 'text-xs px-2 py-1',
    medium: 'text-sm px-3 py-1.5',
    large: 'text-base px-4 py-2'
  };

  const current = config[level];

  return (
    <span
      className={`
        inline-flex items-center gap-1.5 rounded-full border
        ${current.bgColor} ${current.textColor} ${current.borderColor}
        ${sizeClasses[size]} font-medium
      `}
    >
      {showIcon && <span>{current.icon}</span>}
      <span>{current.label}</span>
    </span>
  );
}
