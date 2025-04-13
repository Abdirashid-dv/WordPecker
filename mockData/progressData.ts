import { ProgressData } from '@/types/progress';

// Helper to get ISO date string for a day offset from today
const getDateString = (daysAgo: number): string => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString().split('T')[0];
};

// Generate last 7 days of activity data
const generateDailyActivity = () => {
  return Array.from({ length: 7 }, (_, i) => ({
    date: getDateString(i),
    wordsLearned: Math.floor(Math.random() * 15) + 1,
    quizzesCompleted: Math.floor(Math.random() * 3),
    minutesSpent: Math.floor(Math.random() * 30) + 5,
  })).reverse();
};

export const mockProgressData: ProgressData = {
  words: {
    learned: 87,
    total: 200,
    mastered: 42,
    reviewing: 45,
  },
  quizzes: {
    completed: 14,
    averageScore: 82,
    bestScore: 96,
  },
  streak: {
    current: 5,
    longest: 12,
    lastActive: getDateString(0), // Today
  },
  dailyActivity: generateDailyActivity(),
  weeklyGoal: 100,
  weeklyProgress: 64,
};