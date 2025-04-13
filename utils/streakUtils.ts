import { StreakStats } from '@/types/progress';

/**
 * Check if a streak is active (last active was today or yesterday)
 */
export const isStreakActive = (lastActiveDate: string): boolean => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  const todayString = today.toISOString().split('T')[0];
  const yesterdayString = yesterday.toISOString().split('T')[0];
  
  return lastActiveDate === todayString || lastActiveDate === yesterdayString;
};

/**
 * Check if a streak should be reset (last active was more than 1 day ago)
 */
export const shouldResetStreak = (lastActiveDate: string): boolean => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  const yesterdayString = yesterday.toISOString().split('T')[0];
  const lastActive = new Date(lastActiveDate);
  
  return lastActive < new Date(yesterdayString);
};

/**
 * Format streak for display
 */
export const formatStreak = (streak: number): string => {
  if (streak === 1) return '1 day';
  return `${streak} days`;
};

/**
 * Get streak status message
 */
export const getStreakStatusMessage = (streak: StreakStats): string => {
  const today = new Date().toISOString().split('T')[0];
  
  if (streak.lastActive === today) {
    return 'Streak updated today!';
  }
  
  if (isStreakActive(streak.lastActive)) {
    return 'Complete an activity today to maintain your streak!';
  }
  
  return 'Your streak was reset. Start a new one today!';
};

/**
 * Calculate days until next streak milestone
 */
export const daysUntilNextMilestone = (currentStreak: number, milestones: number[]): number => {
  // Find the next milestone
  const nextMilestone = milestones.find(milestone => milestone > currentStreak);
  
  if (!nextMilestone) {
    return 0; // All milestones achieved
  }
  
  return nextMilestone - currentStreak;
};