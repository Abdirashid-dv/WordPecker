// Types for progress tracking

export interface WordStats {
    learned: number;
    total: number;
    mastered: number;
    reviewing: number;
  }
  
  export interface QuizStats {
    completed: number;
    averageScore: number;
    bestScore: number;
  }
  
  export interface StreakStats {
    current: number;
    longest: number;
    lastActive: string; // ISO date string
  }
  
  export interface DailyActivity {
    date: string; // ISO date string
    wordsLearned: number;
    quizzesCompleted: number;
    minutesSpent: number;
  }
  
  export interface ProgressData {
    words: WordStats;
    quizzes: QuizStats;
    streak: StreakStats;
    dailyActivity: DailyActivity[];
    weeklyGoal: number;
    weeklyProgress: number;
  }
  
  export interface ProgressSummary {
    totalProgress: number; // 0-100
    wordsLearned: number;
    quizzesCompleted: number;
    currentStreak: number;
    todayMinutes: number;
  }