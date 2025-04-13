import { useEffect } from 'react';
import { useProgressStore } from '@/stores/progressStore';
import { generateProgressSummary } from '@/utils/progressUtils';
import { ProgressData, ProgressSummary } from '@/types/progress';

export const useProgress = () => {
  const { 
    progressData, 
    isLoading, 
    error,
    incrementWordsLearned,
    incrementQuizzesCompleted,
    updateStreak,
    addStudyMinutes,
    resetProgress
  } = useProgressStore();
  
  // Update streak when the hook is used
  useEffect(() => {
    updateStreak();
  }, [updateStreak]);
  
  // Generate a summary of the progress data
  const progressSummary: ProgressSummary = generateProgressSummary(progressData);
  
  return {
    progressData,
    progressSummary,
    isLoading,
    error,
    actions: {
      incrementWordsLearned,
      incrementQuizzesCompleted,
      addStudyMinutes,
      resetProgress
    }
  };
};