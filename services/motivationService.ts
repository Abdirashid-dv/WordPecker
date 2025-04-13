import { DailyGoal, MotivationState, Quote, Tip } from '@/types/motivation';
import { defaultMotivationState, mockQuotes, mockTips } from '@/mockData/motivationData';

// This is a placeholder service for future API integration
// Currently using mock data

export const motivationService = {
  // Fetch motivation data
  fetchMotivationData: async (): Promise<MotivationState> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(defaultMotivationState);
      }, 500);
    });
  },
  
  // Fetch all tips
  fetchTips: async (): Promise<Tip[]> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockTips);
      }, 500);
    });
  },
  
  // Fetch all quotes
  fetchQuotes: async (): Promise<Quote[]> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockQuotes);
      }, 500);
    });
  },
  
  // Update daily goals
  updateDailyGoals: async (goals: DailyGoal[]): Promise<DailyGoal[]> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Updated daily goals:', goals);
        resolve(goals);
      }, 500);
    });
  },
  
  // Update goal progress
  updateGoalProgress: async (goalId: string, progress: number): Promise<void> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Updated goal ${goalId} progress to ${progress}`);
        resolve();
      }, 500);
    });
  },
  
  // Update tip preferences
  updateTipPreferences: async (preferences: MotivationState['tipPreferences']): Promise<void> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Updated tip preferences:', preferences);
        resolve();
      }, 500);
    });
  },
  
  // Update quote preferences
  updateQuotePreferences: async (preferences: MotivationState['quotePreferences']): Promise<void> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Updated quote preferences:', preferences);
        resolve();
      }, 500);
    });
  },
  
  // Update goal preferences
  updateGoalPreferences: async (preferences: MotivationState['goalPreferences']): Promise<void> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Updated goal preferences:', preferences);
        resolve();
      }, 500);
    });
  },
  
  // Sync motivation data with server
  syncMotivationData: async (data: MotivationState): Promise<MotivationState> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Synced motivation data with server');
        resolve(data);
      }, 500);
    });
  },
};