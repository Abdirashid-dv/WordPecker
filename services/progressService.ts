import { ProgressData } from '@/types/progress';
import { mockProgressData } from '@/mockData/progressData';

// This is a placeholder service for future API integration
// Currently using mock data

export const progressService = {
  // Fetch user progress data
  fetchProgressData: async (): Promise<ProgressData> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockProgressData);
      }, 500);
    });
  },
  
  // Update user progress data
  updateProgressData: async (data: Partial<ProgressData>): Promise<ProgressData> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const updatedData = {
          ...mockProgressData,
          ...data,
        };
        resolve(updatedData);
      }, 500);
    });
  },
  
  // Record a learning session
  recordLearningSession: async (
    wordsLearned: number,
    minutesSpent: number
  ): Promise<void> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Recorded session: ${wordsLearned} words, ${minutesSpent} minutes`);
        resolve();
      }, 500);
    });
  },
  
  // Record quiz completion
  recordQuizCompletion: async (score: number): Promise<void> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Recorded quiz completion with score: ${score}`);
        resolve();
      }, 500);
    });
  },
};