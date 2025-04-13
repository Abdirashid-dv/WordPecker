import { useEffect } from 'react';
import { useAchievementStore } from '@/stores/achievementStore';
import { useProgressStore } from '@/stores/progressStore';
import { 
  generateAchievementSummary, 
  getHighestAchievementLevel,
  getNextAchievements
} from '@/utils/achievementUtils';
import { Achievement } from '@/types/achievement';

export const useAchievements = () => {
  const { 
    achievements, 
    recentlyUnlocked,
    isLoading, 
    error,
    checkAchievements,
    markAchievementSeen,
    resetAchievements
  } = useAchievementStore();
  
  const { progressData } = useProgressStore();
  
  // Check for new achievements when progress data changes
  useEffect(() => {
    checkAchievements(progressData);
  }, [progressData, checkAchievements]);
  
  // Generate achievement summary
  const achievementSummary = generateAchievementSummary(achievements);
  
  // Get highest achievement level
  const highestLevel = getHighestAchievementLevel(achievements);
  
  // Get next achievements to unlock (top 3)
  const nextAchievements = getNextAchievements(achievements, 3);
  
  return {
    achievements,
    recentlyUnlocked,
    achievementSummary,
    highestLevel,
    nextAchievements,
    isLoading,
    error,
    actions: {
      checkAchievements,
      markAchievementSeen,
      resetAchievements
    }
  };
};