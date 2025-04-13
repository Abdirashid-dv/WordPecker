import { AchievementCategory, AchievementLevel, StreakMilestone } from '@/types/achievement';

// Streak milestones
export const STREAK_MILESTONES: StreakMilestone[] = [
  {
    days: 3,
    title: 'Getting Started',
    description: 'Maintained a 3-day learning streak',
    level: AchievementLevel.BRONZE
  },
  {
    days: 7,
    title: 'Weekly Warrior',
    description: 'Maintained a 7-day learning streak',
    level: AchievementLevel.BRONZE
  },
  {
    days: 14,
    title: 'Fortnight Focus',
    description: 'Maintained a 14-day learning streak',
    level: AchievementLevel.SILVER
  },
  {
    days: 30,
    title: 'Monthly Master',
    description: 'Maintained a 30-day learning streak',
    level: AchievementLevel.SILVER
  },
  {
    days: 60,
    title: 'Dedicated Scholar',
    description: 'Maintained a 60-day learning streak',
    level: AchievementLevel.GOLD
  },
  {
    days: 100,
    title: 'Century Club',
    description: 'Maintained a 100-day learning streak',
    level: AchievementLevel.GOLD
  },
  {
    days: 365,
    title: 'Year-long Legend',
    description: 'Maintained a 365-day learning streak',
    level: AchievementLevel.PLATINUM
  }
];

// Words learned milestones
export const WORDS_MILESTONES = [
  { count: 10, title: 'Word Collector', level: AchievementLevel.BRONZE },
  { count: 50, title: 'Vocabulary Builder', level: AchievementLevel.BRONZE },
  { count: 100, title: 'Word Enthusiast', level: AchievementLevel.SILVER },
  { count: 250, title: 'Lexicon Expert', level: AchievementLevel.SILVER },
  { count: 500, title: 'Word Master', level: AchievementLevel.GOLD },
  { count: 1000, title: 'Vocabulary Virtuoso', level: AchievementLevel.PLATINUM }
];

// Quiz completion milestones
export const QUIZ_MILESTONES = [
  { count: 1, title: 'Quiz Taker', level: AchievementLevel.BRONZE },
  { count: 5, title: 'Quiz Enthusiast', level: AchievementLevel.BRONZE },
  { count: 10, title: 'Quiz Whiz', level: AchievementLevel.SILVER },
  { count: 25, title: 'Quiz Master', level: AchievementLevel.SILVER },
  { count: 50, title: 'Quiz Champion', level: AchievementLevel.GOLD },
  { count: 100, title: 'Quiz Legend', level: AchievementLevel.PLATINUM }
];

// Mastery level milestones (percentage of words mastered)
export const MASTERY_MILESTONES = [
  { percent: 10, title: 'Beginner Mastery', level: AchievementLevel.BRONZE },
  { percent: 25, title: 'Developing Mastery', level: AchievementLevel.BRONZE },
  { percent: 50, title: 'Intermediate Mastery', level: AchievementLevel.SILVER },
  { percent: 75, title: 'Advanced Mastery', level: AchievementLevel.GOLD },
  { percent: 90, title: 'Expert Mastery', level: AchievementLevel.PLATINUM },
  { percent: 100, title: 'Complete Mastery', level: AchievementLevel.PLATINUM }
];

// Special achievements
export const SPECIAL_ACHIEVEMENTS = [
  {
    id: 'first_day',
    title: 'First Steps',
    description: 'Completed your first day of learning',
    level: AchievementLevel.BRONZE
  },
  {
    id: 'perfect_quiz',
    title: 'Perfect Score',
    description: 'Achieved a perfect score on a quiz',
    level: AchievementLevel.SILVER
  },
  {
    id: 'comeback',
    title: 'Welcome Back',
    description: 'Returned after a break to continue learning',
    level: AchievementLevel.BRONZE
  },
  {
    id: 'night_owl',
    title: 'Night Owl',
    description: 'Studied after midnight',
    level: AchievementLevel.BRONZE
  },
  {
    id: 'early_bird',
    title: 'Early Bird',
    description: 'Studied before 7 AM',
    level: AchievementLevel.BRONZE
  }
];

// Achievement level colors
export const ACHIEVEMENT_LEVEL_COLORS = {
  [AchievementLevel.BRONZE]: '#CD7F32',
  [AchievementLevel.SILVER]: '#C0C0C0',
  [AchievementLevel.GOLD]: '#FFD700',
  [AchievementLevel.PLATINUM]: '#E5E4E2'
};

// Achievement category icons
export const ACHIEVEMENT_CATEGORY_ICONS = {
  [AchievementCategory.STREAK]: 'Flame',
  [AchievementCategory.WORDS]: 'Book',
  [AchievementCategory.QUIZZES]: 'CheckCircle',
  [AchievementCategory.MASTERY]: 'Award',
  [AchievementCategory.SPECIAL]: 'Star'
};