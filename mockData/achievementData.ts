import { Achievement, AchievementCategory, AchievementLevel } from '@/types/achievement';
import { 
  STREAK_MILESTONES, 
  WORDS_MILESTONES, 
  QUIZ_MILESTONES, 
  MASTERY_MILESTONES,
  SPECIAL_ACHIEVEMENTS,
  ACHIEVEMENT_CATEGORY_ICONS
} from '@/constants/achievementConstants';

// Helper to get ISO date string for a day offset from today
const getDateString = (daysAgo: number): string => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString();
};

// Generate streak achievements
const generateStreakAchievements = (currentStreak: number): Achievement[] => {
  return STREAK_MILESTONES.map(milestone => {
    const isUnlocked = currentStreak >= milestone.days;
    const progress = Math.min(Math.round((currentStreak / milestone.days) * 100), 100);
    
    return {
      id: `streak_${milestone.days}`,
      title: milestone.title,
      description: milestone.description,
      icon: ACHIEVEMENT_CATEGORY_ICONS[AchievementCategory.STREAK],
      unlockedAt: isUnlocked ? getDateString(0) : null,
      category: AchievementCategory.STREAK,
      level: milestone.level,
      progress: progress,
      requirement: milestone.days
    };
  });
};

// Generate word achievements
const generateWordAchievements = (wordsLearned: number): Achievement[] => {
  return WORDS_MILESTONES.map(milestone => {
    const isUnlocked = wordsLearned >= milestone.count;
    const progress = Math.min(Math.round((wordsLearned / milestone.count) * 100), 100);
    
    return {
      id: `words_${milestone.count}`,
      title: milestone.title,
      description: `Learned ${milestone.count} words`,
      icon: ACHIEVEMENT_CATEGORY_ICONS[AchievementCategory.WORDS],
      unlockedAt: isUnlocked ? getDateString(isUnlocked ? Math.floor(Math.random() * 7) : 0) : null,
      category: AchievementCategory.WORDS,
      level: milestone.level,
      progress: progress,
      requirement: milestone.count
    };
  });
};

// Generate quiz achievements
const generateQuizAchievements = (quizzesCompleted: number): Achievement[] => {
  return QUIZ_MILESTONES.map(milestone => {
    const isUnlocked = quizzesCompleted >= milestone.count;
    const progress = Math.min(Math.round((quizzesCompleted / milestone.count) * 100), 100);
    
    return {
      id: `quiz_${milestone.count}`,
      title: milestone.title,
      description: `Completed ${milestone.count} quizzes`,
      icon: ACHIEVEMENT_CATEGORY_ICONS[AchievementCategory.QUIZZES],
      unlockedAt: isUnlocked ? getDateString(isUnlocked ? Math.floor(Math.random() * 14) : 0) : null,
      category: AchievementCategory.QUIZZES,
      level: milestone.level,
      progress: progress,
      requirement: milestone.count
    };
  });
};

// Generate mastery achievements
const generateMasteryAchievements = (masteryPercent: number): Achievement[] => {
  return MASTERY_MILESTONES.map(milestone => {
    const isUnlocked = masteryPercent >= milestone.percent;
    const progress = Math.min(Math.round((masteryPercent / milestone.percent) * 100), 100);
    
    return {
      id: `mastery_${milestone.percent}`,
      title: milestone.title,
      description: `Mastered ${milestone.percent}% of your vocabulary`,
      icon: ACHIEVEMENT_CATEGORY_ICONS[AchievementCategory.MASTERY],
      unlockedAt: isUnlocked ? getDateString(isUnlocked ? Math.floor(Math.random() * 21) : 0) : null,
      category: AchievementCategory.MASTERY,
      level: milestone.level,
      progress: progress,
      requirement: milestone.percent
    };
  });
};

// Generate special achievements
const generateSpecialAchievements = (): Achievement[] => {
  return SPECIAL_ACHIEVEMENTS.map((achievement, index) => {
    // For mock data, let's unlock a couple of special achievements
    const isUnlocked = index < 2;
    
    return {
      id: achievement.id,
      title: achievement.title,
      description: achievement.description,
      icon: ACHIEVEMENT_CATEGORY_ICONS[AchievementCategory.SPECIAL],
      unlockedAt: isUnlocked ? getDateString(Math.floor(Math.random() * 30)) : null,
      category: AchievementCategory.SPECIAL,
      level: achievement.level,
      progress: isUnlocked ? 100 : 0,
      requirement: 1
    };
  });
};

// Mock data for achievements based on current progress
export const generateMockAchievements = (
  currentStreak: number = 5,
  wordsLearned: number = 87,
  quizzesCompleted: number = 14,
  masteryPercent: number = 21 // 42 mastered out of 200 total = 21%
): Achievement[] => {
  return [
    ...generateStreakAchievements(currentStreak),
    ...generateWordAchievements(wordsLearned),
    ...generateQuizAchievements(quizzesCompleted),
    ...generateMasteryAchievements(masteryPercent),
    ...generateSpecialAchievements()
  ];
};

// Export mock achievements data
export const mockAchievements: Achievement[] = generateMockAchievements();