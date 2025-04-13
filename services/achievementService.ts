import { Achievement } from '@/types/achievement';
import { mockAchievements } from '@/mockData/achievementData';

// This is a placeholder service for future API integration
// Currently using mock data

export const achievementService = {
  // Fetch user achievements
  fetchAchievements: async (): Promise<Achievement[]> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockAchievements);
      }, 500);
    });
  },
  
  // Update achievement progress
  updateAchievementProgress: async (achievementId: string, progress: number): Promise<void> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Updated achievement ${achievementId} progress to ${progress}`);
        resolve();
      }, 500);
    });
  },
  
  // Unlock an achievement
  unlockAchievement: async (achievementId: string): Promise<void> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Unlocked achievement ${achievementId}`);
        resolve();
      }, 500);
    });
  },
  
  // Sync achievements with server
  syncAchievements: async (achievements: Achievement[]): Promise<Achievement[]> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Synced achievements with server');
        resolve(achievements);
      }, 500);
    });
  },
};