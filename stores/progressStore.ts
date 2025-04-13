import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ProgressData } from '@/types/progress';
import { mockProgressData } from '@/mockData/progressData';

interface ProgressState {
  progressData: ProgressData;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setProgressData: (data: ProgressData) => void;
  incrementWordsLearned: (count: number) => void;
  incrementQuizzesCompleted: (count: number, score: number) => void;
  updateStreak: () => void;
  addStudyMinutes: (minutes: number) => void;
  resetProgress: () => void;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      progressData: mockProgressData,
      isLoading: false,
      error: null,
      
      setProgressData: (data) => set({ progressData: data }),
      
      incrementWordsLearned: (count) => set((state) => {
        const { progressData } = state;
        const today = new Date().toISOString().split('T')[0];
        
        // Update words learned count
        const updatedWords = {
          ...progressData.words,
          learned: progressData.words.learned + count,
          reviewing: progressData.words.reviewing + count,
        };
        
        // Update daily activity
        const dailyActivity = [...progressData.dailyActivity];
        const todayIndex = dailyActivity.findIndex(day => day.date === today);
        
        if (todayIndex >= 0) {
          dailyActivity[todayIndex] = {
            ...dailyActivity[todayIndex],
            wordsLearned: dailyActivity[todayIndex].wordsLearned + count,
          };
        } else {
          dailyActivity.push({
            date: today,
            wordsLearned: count,
            quizzesCompleted: 0,
            minutesSpent: 0,
          });
        }
        
        // Update weekly progress
        const weeklyProgress = Math.min(
          progressData.weeklyProgress + count,
          progressData.weeklyGoal
        );
        
        return {
          progressData: {
            ...progressData,
            words: updatedWords,
            dailyActivity,
            weeklyProgress,
          }
        };
      }),
      
      incrementQuizzesCompleted: (count, score) => set((state) => {
        const { progressData } = state;
        const today = new Date().toISOString().split('T')[0];
        
        // Update quiz stats
        const totalQuizzes = progressData.quizzes.completed + count;
        const totalScore = progressData.quizzes.averageScore * progressData.quizzes.completed + score;
        const averageScore = Math.round(totalScore / totalQuizzes);
        const bestScore = Math.max(progressData.quizzes.bestScore, score);
        
        const updatedQuizzes = {
          completed: totalQuizzes,
          averageScore,
          bestScore,
        };
        
        // Update daily activity
        const dailyActivity = [...progressData.dailyActivity];
        const todayIndex = dailyActivity.findIndex(day => day.date === today);
        
        if (todayIndex >= 0) {
          dailyActivity[todayIndex] = {
            ...dailyActivity[todayIndex],
            quizzesCompleted: dailyActivity[todayIndex].quizzesCompleted + count,
          };
        } else {
          dailyActivity.push({
            date: today,
            wordsLearned: 0,
            quizzesCompleted: count,
            minutesSpent: 0,
          });
        }
        
        return {
          progressData: {
            ...progressData,
            quizzes: updatedQuizzes,
            dailyActivity,
          }
        };
      }),
      
      updateStreak: () => set((state) => {
        const { progressData } = state;
        const today = new Date().toISOString().split('T')[0];
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayString = yesterday.toISOString().split('T')[0];
        
        // If already updated today, do nothing
        if (progressData.streak.lastActive === today) {
          return { progressData };
        }
        
        let currentStreak = progressData.streak.current;
        
        // If last active was yesterday, increment streak
        if (progressData.streak.lastActive === yesterdayString) {
          currentStreak += 1;
        } 
        // If last active was not yesterday, reset streak to 1
        else if (progressData.streak.lastActive !== today) {
          currentStreak = 1;
        }
        
        const longestStreak = Math.max(progressData.streak.longest, currentStreak);
        
        return {
          progressData: {
            ...progressData,
            streak: {
              current: currentStreak,
              longest: longestStreak,
              lastActive: today,
            }
          }
        };
      }),
      
      addStudyMinutes: (minutes) => set((state) => {
        const { progressData } = state;
        const today = new Date().toISOString().split('T')[0];
        
        // Update daily activity
        const dailyActivity = [...progressData.dailyActivity];
        const todayIndex = dailyActivity.findIndex(day => day.date === today);
        
        if (todayIndex >= 0) {
          dailyActivity[todayIndex] = {
            ...dailyActivity[todayIndex],
            minutesSpent: dailyActivity[todayIndex].minutesSpent + minutes,
          };
        } else {
          dailyActivity.push({
            date: today,
            wordsLearned: 0,
            quizzesCompleted: 0,
            minutesSpent: minutes,
          });
        }
        
        return {
          progressData: {
            ...progressData,
            dailyActivity,
          }
        };
      }),
      
      resetProgress: () => set({ progressData: mockProgressData }),
    }),
    {
      name: 'wordpecker-progress',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
