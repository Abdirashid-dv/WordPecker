// Types for achievements and streaks

export interface Achievement {
    id: string;
    title: string;
    description: string;
    icon: string; // Icon name from lucide-react-native
    unlockedAt: string | null; // ISO date string when unlocked, null if locked
    category: AchievementCategory;
    level: AchievementLevel;
    progress: number; // 0-100
    requirement: number; // The value needed to unlock this achievement
  }
  
  export enum AchievementCategory {
    STREAK = 'streak',
    WORDS = 'words',
    QUIZZES = 'quizzes',
    MASTERY = 'mastery',
    SPECIAL = 'special'
  }
  
  export enum AchievementLevel {
    BRONZE = 'bronze',
    SILVER = 'silver',
    GOLD = 'gold',
    PLATINUM = 'platinum'
  }
  
  export interface AchievementSummary {
    totalAchievements: number;
    unlockedAchievements: number;
    recentlyUnlocked: Achievement[];
    nextAchievements: Achievement[];
  }
  
  export interface StreakMilestone {
    days: number;
    title: string;
    description: string;
    level: AchievementLevel;
  }