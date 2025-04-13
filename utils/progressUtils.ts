import { DailyActivity, ProgressData, ProgressSummary } from '@/types/progress';

/**
 * Calculate the overall progress percentage
 */
export const calculateProgress = (learned: number, total: number): number => {
  if (total === 0) return 0;
  return Math.min(Math.round((learned / total) * 100), 100);
};

/**
 * Format a number with a + sign if positive
 */
export const formatWithSign = (num: number): string => {
  return num > 0 ? `+${num}` : `${num}`;
};

/**
 * Get today's activity data
 */
export const getTodayActivity = (activities: DailyActivity[]): DailyActivity | undefined => {
  const today = new Date().toISOString().split('T')[0];
  return activities.find(activity => activity.date === today);
};

/**
 * Calculate the sum of a property across all daily activities
 */
export const sumActivityProperty = (
  activities: DailyActivity[],
  property: keyof Pick<DailyActivity, 'wordsLearned' | 'quizzesCompleted' | 'minutesSpent'>
): number => {
  return activities.reduce((sum, activity) => sum + activity[property], 0);
};

/**
 * Calculate average daily words learned
 */
export const calculateAverageDailyWords = (activities: DailyActivity[]): number => {
  if (activities.length === 0) return 0;
  const totalWords = sumActivityProperty(activities, 'wordsLearned');
  return Math.round(totalWords / activities.length);
};

/**
 * Generate a summary of progress data
 */
export const generateProgressSummary = (data: ProgressData): ProgressSummary => {
  const todayActivity = getTodayActivity(data.dailyActivity) || {
    date: '',
    wordsLearned: 0,
    quizzesCompleted: 0,
    minutesSpent: 0
  };
  
  return {
    totalProgress: calculateProgress(data.words.learned, data.words.total),
    wordsLearned: data.words.learned,
    quizzesCompleted: data.quizzes.completed,
    currentStreak: data.streak.current,
    todayMinutes: todayActivity.minutesSpent,
  };
};

/**
 * Format minutes into hours and minutes
 */
export const formatMinutes = (minutes: number): string => {
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
};