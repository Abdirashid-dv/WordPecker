import { useEffect } from 'react';
import { useMotivationStore } from '@/stores/motivationStore';
import { useProgressStore } from '@/stores/progressStore';
import { DailyGoal, GoalType, LanguageDifficulty, QuoteCategory, TipCategory } from '@/types/motivation';
import { createDailyGoal, getGoalSuggestions, getTodayGoals } from '@/utils/motivationUtils';
import { GOAL_TYPES } from '@/constants/motivationConstants';

export const useMotivation = () => {
  const { 
    currentTip,
    currentQuote,
    dailyGoals,
    tipPreferences,
    quotePreferences,
    goalPreferences,
    setCurrentTip,
    refreshTip,
    updateTipPreferences,
    setCurrentQuote,
    refreshQuote,
    updateQuotePreferences,
    addGoal,
    removeGoal,
    updateGoal,
    updateGoalProgressAmount,
    completeGoal,
    updateGoalPreferences,
    checkForNewDay
  } = useMotivationStore();
  
  const { progressData } = useProgressStore();
  
  // Check for a new day when the hook is used
  useEffect(() => {
    checkForNewDay();
  }, [checkForNewDay]);
  
  // Get goals for today
  const todayGoals = getTodayGoals(dailyGoals);
  
  // Get completed and incomplete goals
  const completedGoals = todayGoals.filter(goal => goal.isCompleted);
  const incompleteGoals = todayGoals.filter(goal => !goal.isCompleted);
  
  // Get goal suggestions based on user progress
  const goalSuggestions = goalPreferences.suggestGoals
    ? getGoalSuggestions(progressData, todayGoals)
    : [];
  
  // Create a new goal
  const createGoal = (
    type: GoalType,
    target: number,
    reminderTime: string | null = goalPreferences.defaultReminderTime,
    customTitle?: string,
    customDescription?: string
  ) => {
    const newGoal = createDailyGoal(
      type,
      target,
      goalPreferences.reminderEnabled ? reminderTime : null,
      customTitle,
      customDescription
    );
    
    addGoal(newGoal);
    return newGoal;
  };
  
  // Add a suggested goal
  const addSuggestedGoal = (goalIndex: number) => {
    if (goalIndex >= 0 && goalIndex < goalSuggestions.length) {
      const suggestion = goalSuggestions[goalIndex];
      createGoal(
        suggestion.type,
        suggestion.target,
        goalPreferences.defaultReminderTime
      );
    }
  };
  
  // Update goal progress
  const updateProgress = (goalId: string, progress: number) => {
    updateGoalProgressAmount(goalId, progress);
  };
  
  // Toggle reminder for a goal
  const toggleGoalReminder = (goalId: string, enabled: boolean) => {
    const goal = dailyGoals.find(g => g.id === goalId);
    if (!goal) return;
    
    updateGoal(goalId, {
      reminderTime: enabled ? goalPreferences.defaultReminderTime : null
    });
  };
  
  // Set reminder time for a goal
  const setGoalReminderTime = (goalId: string, time: string) => {
    updateGoal(goalId, { reminderTime: time });
  };
  
  // Toggle global reminder setting
  const toggleReminders = (enabled: boolean) => {
    updateGoalPreferences({ reminderEnabled: enabled });
  };
  
  // Set default reminder time
  const setDefaultReminderTime = (time: string) => {
    updateGoalPreferences({ defaultReminderTime: time });
  };
  
  // Toggle goal suggestions
  const toggleGoalSuggestions = (enabled: boolean) => {
    updateGoalPreferences({ suggestGoals: enabled });
  };
  
  // Update tip category preferences
  const updateTipCategories = (categories: TipCategory[]) => {
    updateTipPreferences({ categories });
  };
  
  // Update tip difficulty preference
  const updateTipDifficulty = (difficulty: LanguageDifficulty) => {
    updateTipPreferences({ difficulty });
  };
  
  // Update quote category preferences
  const updateQuoteCategories = (categories: QuoteCategory[]) => {
    updateQuotePreferences({ categories });
  };
  
  return {
    // State
    currentTip,
    currentQuote,
    dailyGoals: todayGoals,
    completedGoals,
    incompleteGoals,
    goalSuggestions,
    tipPreferences,
    quotePreferences,
    goalPreferences,
    
    // Actions
    refreshTip,
    refreshQuote,
    createGoal,
    removeGoal,
    updateGoal,
    updateProgress,
    completeGoal,
    addSuggestedGoal,
    toggleGoalReminder,
    setGoalReminderTime,
    toggleReminders,
    setDefaultReminderTime,
    toggleGoalSuggestions,
    updateTipCategories,
    updateTipDifficulty,
    updateQuoteCategories
  };
};