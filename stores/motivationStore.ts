import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DailyGoal, GoalType, MotivationState, Quote, QuoteCategory, Tip, TipCategory } from '@/types/motivation';
import { defaultMotivationState, mockQuotes, mockTips } from '@/mockData/motivationData';
import { 
  cancelGoalReminder, 
  createDailyGoal, 
  getRandomQuote, 
  getRandomTip, 
  refreshMotivationData, 
  scheduleGoalReminder, 
  shouldRefreshMotivationData, 
  updateGoalProgress 
} from '@/utils/motivationUtils';

interface MotivationStore extends MotivationState {
  // Tips actions
  setCurrentTip: (tip: Tip | null) => void;
  refreshTip: () => void;
  updateTipPreferences: (preferences: Partial<MotivationState['tipPreferences']>) => void;
  
  // Quotes actions
  setCurrentQuote: (quote: Quote | null) => void;
  refreshQuote: () => void;
  updateQuotePreferences: (preferences: Partial<MotivationState['quotePreferences']>) => void;
  
  // Goals actions
  addGoal: (goal: DailyGoal) => void;
  removeGoal: (goalId: string) => void;
  updateGoal: (goalId: string, updates: Partial<DailyGoal>) => void;
  updateGoalProgressAmount: (goalId: string, progress: number) => void;
  completeGoal: (goalId: string) => void;
  updateGoalPreferences: (preferences: Partial<MotivationState['goalPreferences']>) => void;
  
  // General actions
  checkForNewDay: () => void;
  resetState: () => void;
}

export const useMotivationStore = create<MotivationStore>()(
  persist(
    (set, get) => ({
      ...defaultMotivationState,
      
      // Tips actions
      setCurrentTip: (tip) => set({ currentTip: tip }),
      
      refreshTip: () => {
        const { tipPreferences } = get();
        const newTip = getRandomTip(
          mockTips,
          tipPreferences.categories,
          tipPreferences.difficulty
        );
        set({ currentTip: newTip });
      },
      
      updateTipPreferences: (preferences) => set(state => ({
        tipPreferences: {
          ...state.tipPreferences,
          ...preferences
        }
      })),
      
      // Quotes actions
      setCurrentQuote: (quote) => set({ currentQuote: quote }),
      
      refreshQuote: () => {
        const { quotePreferences } = get();
        const newQuote = getRandomQuote(
          mockQuotes,
          quotePreferences.categories
        );
        set({ currentQuote: newQuote });
      },
      
      updateQuotePreferences: (preferences) => set(state => ({
        quotePreferences: {
          ...state.quotePreferences,
          ...preferences
        }
      })),
      
      // Goals actions
      addGoal: (goal) => {
        // Schedule reminder if enabled
        if (goal.reminderTime) {
          scheduleGoalReminder(goal);
        }
        
        set(state => ({
          dailyGoals: [...state.dailyGoals, goal]
        }));
      },
      
      removeGoal: (goalId) => {
        // Cancel reminder
        cancelGoalReminder(goalId);
        
        set(state => ({
          dailyGoals: state.dailyGoals.filter(goal => goal.id !== goalId)
        }));
      },
      
      updateGoal: (goalId, updates) => {
        set(state => {
          const updatedGoals = state.dailyGoals.map(goal => {
            if (goal.id === goalId) {
              const updatedGoal = { ...goal, ...updates };
              
              // Handle reminder changes
              if (updates.reminderTime !== undefined && 
                  updates.reminderTime !== goal.reminderTime) {
                if (goal.reminderTime) {
                  cancelGoalReminder(goalId);
                }
                if (updates.reminderTime) {
                  scheduleGoalReminder(updatedGoal);
                }
              }
              
              return updatedGoal;
            }
            return goal;
          });
          
          return { dailyGoals: updatedGoals };
        });
      },
      
      updateGoalProgressAmount: (goalId, progress) => {
        set(state => {
          const updatedGoals = state.dailyGoals.map(goal => {
            if (goal.id === goalId) {
              const updatedGoal = updateGoalProgress(goal, progress);
              
              // If goal is completed, cancel reminder
              if (updatedGoal.isCompleted && goal.reminderTime) {
                cancelGoalReminder(goalId);
              }
              
              return updatedGoal;
            }
            return goal;
          });
          
          return { dailyGoals: updatedGoals };
        });
      },
      
      completeGoal: (goalId) => {
        set(state => {
          const updatedGoals = state.dailyGoals.map(goal => {
            if (goal.id === goalId) {
              // Cancel reminder
              if (goal.reminderTime) {
                cancelGoalReminder(goalId);
              }
              
              return {
                ...goal,
                progress: goal.target,
                isCompleted: true,
                completedAt: new Date().toISOString()
              };
            }
            return goal;
          });
          
          return { dailyGoals: updatedGoals };
        });
      },
      
      updateGoalPreferences: (preferences) => set(state => ({
        goalPreferences: {
          ...state.goalPreferences,
          ...preferences
        }
      })),
      
      // General actions
      checkForNewDay: () => {
        const state = get();
        
        if (shouldRefreshMotivationData(state)) {
          const refreshedState = refreshMotivationData(state, mockTips, mockQuotes);
          set(refreshedState);
        }
      },
      
      resetState: () => set(defaultMotivationState),
    }),
    {
      name: 'wordpecker-motivation',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);