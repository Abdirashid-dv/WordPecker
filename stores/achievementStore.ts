import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Achievement } from '@/types/achievement';
import { mockAchievements, generateMockAchievements } from '@/mockData/achievementData';
import { checkForNewAchievements } from '@/utils/achievementUtils';
import { ProgressData } from '@/types/progress';

interface AchievementState {
  achievements: Achievement[];
  recentlyUnlocked: Achievement[];
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setAchievements: (achievements: Achievement[]) => void;
  checkAchievements: (progressData: ProgressData) => Achievement[];
  markAchievementSeen: (achievementId: string) => void;
  resetAchievements: () => void;
}

export const useAchievementStore = create<AchievementState>()(
  persist(
    (set, get) => ({
      achievements: mockAchievements,
      recentlyUnlocked: [],
      isLoading: false,
      error: null,
      
      setAchievements: (achievements) => set({ achievements }),
      
      checkAchievements: (progressData) => {
        const { achievements } = get();
        
        // Check for newly unlocked achievements
        const newlyUnlocked = checkForNewAchievements(achievements, progressData);
        
        // If there are newly unlocked achievements, update the store
        if (newlyUnlocked.length > 0) {
          set({
            achievements: [...achievements], // This triggers a re-render
            recentlyUnlocked: newlyUnlocked
          });
        }
        
        return newlyUnlocked;
      },
      
      markAchievementSeen: (achievementId) => {
        const { recentlyUnlocked } = get();
        
        // Remove the achievement from recently unlocked
        const updatedRecentlyUnlocked = recentlyUnlocked.filter(
          achievement => achievement.id !== achievementId
        );
        
        set({ recentlyUnlocked: updatedRecentlyUnlocked });
      },
      
      resetAchievements: () => {
        // Generate fresh mock achievements
        const freshAchievements = generateMockAchievements();
        set({ 
          achievements: freshAchievements,
          recentlyUnlocked: []
        });
      },
    }),
    {
      name: 'wordpecker-achievements',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);