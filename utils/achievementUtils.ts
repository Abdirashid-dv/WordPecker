import { Achievement, AchievementCategory, AchievementSummary } from '@/types/achievement';
import { ProgressData } from '@/types/progress';
import { 
  STREAK_MILESTONES, 
  WORDS_MILESTONES, 
  QUIZ_MILESTONES, 
  MASTERY_MILESTONES 
} from '@/constants/achievementConstants';

/**
 * Check if an achievement is unlocked
 */
export const isAchievementUnlocked = (achievement: Achievement): boolean => {
  return achievement.unlockedAt !== null;
};

/**
 * Get all unlocked achievements
 */
export const getUnlockedAchievements = (achievements: Achievement[]): Achievement[] => {
  return achievements.filter(isAchievementUnlocked);
};

/**
 * Get recently unlocked achievements (within the last 7 days)
 */
export const getRecentlyUnlockedAchievements = (achievements: Achievement[]): Achievement[] => {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  
  return achievements.filter(achievement => {
    if (!achievement.unlockedAt) return false;
    const unlockDate = new Date(achievement.unlockedAt);
    return unlockDate >= sevenDaysAgo;
  });
};

/**
 * Get the next achievements to unlock (closest to completion)
 */
export const getNextAchievements = (achievements: Achievement[], limit: number = 3): Achievement[] => {
  // Filter locked achievements
  const lockedAchievements = achievements.filter(a => !isAchievementUnlocked(a));
  
  // Sort by progress (highest first)
  return lockedAchievements
    .sort((a, b) => b.progress - a.progress)
    .slice(0, limit);
};

/**
 * Generate a summary of achievements
 */
export const generateAchievementSummary = (achievements: Achievement[]): AchievementSummary => {
  const unlockedAchievements = getUnlockedAchievements(achievements);
  const recentlyUnlocked = getRecentlyUnlockedAchievements(achievements);
  const nextAchievements = getNextAchievements(achievements);
  
  return {
    totalAchievements: achievements.length,
    unlockedAchievements: unlockedAchievements.length,
    recentlyUnlocked,
    nextAchievements
  };
};

/**
 * Calculate mastery percentage
 */
export const calculateMasteryPercentage = (mastered: number, total: number): number => {
  if (total === 0) return 0;
  return Math.round((mastered / total) * 100);
};

/**
 * Check for newly unlocked achievements based on progress data
 * Returns newly unlocked achievements
 */
export const checkForNewAchievements = (
  achievements: Achievement[],
  progressData: ProgressData
): Achievement[] => {
  const currentStreak = progressData.streak.current;
  const wordsLearned = progressData.words.learned;
  const quizzesCompleted = progressData.quizzes.completed;
  const masteryPercent = calculateMasteryPercentage(
    progressData.words.mastered,
    progressData.words.total
  );
  
  const newlyUnlocked: Achievement[] = [];
  const now = new Date().toISOString();
  
  // Check streak achievements
  achievements
    .filter(a => a.category === AchievementCategory.STREAK && !isAchievementUnlocked(a))
    .forEach(achievement => {
      if (currentStreak >= achievement.requirement) {
        achievement.unlockedAt = now;
        achievement.progress = 100;
        newlyUnlocked.push(achievement);
      } else {
        achievement.progress = Math.min(
          Math.round((currentStreak / achievement.requirement) * 100),
          99
        );
      }
    });
  
  // Check words achievements
  achievements
    .filter(a => a.category === AchievementCategory.WORDS && !isAchievementUnlocked(a))
    .forEach(achievement => {
      if (wordsLearned >= achievement.requirement) {
        achievement.unlockedAt = now;
        achievement.progress = 100;
        newlyUnlocked.push(achievement);
      } else {
        achievement.progress = Math.min(
          Math.round((wordsLearned / achievement.requirement) * 100),
          99
        );
      }
    });
  
  // Check quiz achievements
  achievements
    .filter(a => a.category === AchievementCategory.QUIZZES && !isAchievementUnlocked(a))
    .forEach(achievement => {
      if (quizzesCompleted >= achievement.requirement) {
        achievement.unlockedAt = now;
        achievement.progress = 100;
        newlyUnlocked.push(achievement);
      } else {
        achievement.progress = Math.min(
          Math.round((quizzesCompleted / achievement.requirement) * 100),
          99
        );
      }
    });
  
  // Check mastery achievements
  achievements
    .filter(a => a.category === AchievementCategory.MASTERY && !isAchievementUnlocked(a))
    .forEach(achievement => {
      if (masteryPercent >= achievement.requirement) {
        achievement.unlockedAt = now;
        achievement.progress = 100;
        newlyUnlocked.push(achievement);
      } else {
        achievement.progress = Math.min(
          Math.round((masteryPercent / achievement.requirement) * 100),
          99
        );
      }
    });
  
  return newlyUnlocked;
};

/**
 * Get the highest level achievement unlocked
 */
export const getHighestAchievementLevel = (achievements: Achievement[]): string => {
  const unlockedAchievements = getUnlockedAchievements(achievements);
  
  if (unlockedAchievements.length === 0) {
    return 'Beginner';
  }
  
  // Count achievements by level
  const platinumCount = unlockedAchievements.filter(a => a.level === 'platinum').length;
  const goldCount = unlockedAchievements.filter(a => a.level === 'gold').length;
  const silverCount = unlockedAchievements.filter(a => a.level === 'silver').length;
  
  if (platinumCount > 0) return 'Platinum Learner';
  if (goldCount > 0) return 'Gold Learner';
  if (silverCount > 0) return 'Silver Learner';
  return 'Bronze Learner';
};