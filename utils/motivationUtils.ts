import { Platform } from 'react-native';
import { 
  DailyGoal, 
  GoalType, 
  LanguageDifficulty, 
  MotivationState, 
  Quote, 
  QuoteCategory, 
  Tip, 
  TipCategory 
} from '@/types/motivation';
import { 
  DEFAULT_GOAL_SUGGESTIONS, 
  GOAL_COMPLETION_MESSAGES, 
  GOAL_PROGRESS_MESSAGES, 
  GOAL_TYPES 
} from '@/constants/motivationConstants';
import { ProgressData } from '@/types/progress';

/**
 * Check if it's a new day compared to the last updated date
 */
export const isNewDay = (lastUpdated: string): boolean => {
  const lastDate = new Date(lastUpdated).setHours(0, 0, 0, 0);
  const today = new Date().setHours(0, 0, 0, 0);
  return lastDate < today;
};

/**
 * Get a random tip based on user preferences
 */
export const getRandomTip = (
  tips: Tip[],
  categories: TipCategory[],
  difficulty: LanguageDifficulty
): Tip | null => {
  if (!tips || tips.length === 0) return null;
  
  // Filter tips by category and difficulty
  const filteredTips = tips.filter(tip => 
    (categories.includes(tip.category) || categories.length === 0) &&
    (tip.difficulty === difficulty || difficulty === LanguageDifficulty.ALL_LEVELS || tip.difficulty === LanguageDifficulty.ALL_LEVELS)
  );
  
  if (filteredTips.length === 0) return tips[Math.floor(Math.random() * tips.length)];
  
  return filteredTips[Math.floor(Math.random() * filteredTips.length)];
};

/**
 * Get a random quote based on user preferences
 */
export const getRandomQuote = (
  quotes: Quote[],
  categories: QuoteCategory[]
): Quote | null => {
  if (!quotes || quotes.length === 0) return null;
  
  // Filter quotes by category
  const filteredQuotes = quotes.filter(quote => 
    categories.includes(quote.category as QuoteCategory) || categories.length === 0
  );
  
  if (filteredQuotes.length === 0) return quotes[Math.floor(Math.random() * quotes.length)];
  
  return filteredQuotes[Math.floor(Math.random() * filteredQuotes.length)];
};

/**
 * Generate a unique ID
 */
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

/**
 * Create a new daily goal
 */
export const createDailyGoal = (
  type: GoalType,
  target: number,
  reminderTime: string | null = null,
  customTitle?: string,
  customDescription?: string
): DailyGoal => {
  const goalType = GOAL_TYPES[type];
  
  return {
    id: generateId(),
    title: customTitle || goalType.label,
    description: customDescription || `${goalType.description} (${target} ${goalType.unit})`,
    type,
    target,
    progress: 0,
    isCompleted: false,
    createdAt: new Date().toISOString(),
    completedAt: null,
    reminderTime
  };
};

/**
 * Update goal progress
 */
export const updateGoalProgress = (
  goal: DailyGoal,
  progress: number
): DailyGoal => {
  const updatedProgress = Math.min(progress, goal.target);
  const isCompleted = updatedProgress >= goal.target;
  
  return {
    ...goal,
    progress: updatedProgress,
    isCompleted,
    completedAt: isCompleted ? new Date().toISOString() : null
  };
};

/**
 * Get a random goal completion message
 */
export const getGoalCompletionMessage = (): string => {
  return GOAL_COMPLETION_MESSAGES[Math.floor(Math.random() * GOAL_COMPLETION_MESSAGES.length)];
};

/**
 * Get a random goal progress message
 */
export const getGoalProgressMessage = (): string => {
  return GOAL_PROGRESS_MESSAGES[Math.floor(Math.random() * GOAL_PROGRESS_MESSAGES.length)];
};

/**
 * Determine user level based on progress data
 */
export const getUserLevel = (progressData: ProgressData): 'beginner' | 'intermediate' | 'advanced' => {
  const { words } = progressData;
  const progressPercentage = (words.learned / words.total) * 100;
  
  if (progressPercentage < 30) return 'beginner';
  if (progressPercentage < 70) return 'intermediate';
  return 'advanced';
};

/**
 * Get goal suggestions based on user level and progress
 */
export const getGoalSuggestions = (
  progressData: ProgressData,
  existingGoals: DailyGoal[]
): DailyGoal[] => {
  const userLevel = getUserLevel(progressData);
  const suggestions = DEFAULT_GOAL_SUGGESTIONS[userLevel];
  
  // Filter out goal types that already exist
  const existingTypes = existingGoals.map(goal => goal.type);
  const filteredSuggestions = suggestions.filter(suggestion => 
    !existingTypes.includes(suggestion.type)
  );
  
  // Create goal objects from suggestions
  return filteredSuggestions.map(suggestion => 
    createDailyGoal(suggestion.type, suggestion.target)
  );
};

/**
 * Format time string (HH:MM) to a more readable format
 */
export const formatTimeString = (timeString: string | null): string => {
  if (!timeString) return '';
  
  const [hours, minutes] = timeString.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes.toString().padStart(2, '0');
  
  return `${formattedHours}:${formattedMinutes} ${period}`;
};

/**
 * Calculate goal progress percentage
 */
export const calculateGoalProgress = (progress: number, target: number): number => {
  if (target === 0) return 0;
  return Math.min(Math.round((progress / target) * 100), 100);
};

/**
 * Check if a goal is due today
 */
export const isGoalDueToday = (goal: DailyGoal): boolean => {
  const goalDate = new Date(goal.createdAt).setHours(0, 0, 0, 0);
  const today = new Date().setHours(0, 0, 0, 0);
  return goalDate === today;
};

/**
 * Filter goals that are due today
 */
export const getTodayGoals = (goals: DailyGoal[]): DailyGoal[] => {
  return goals.filter(isGoalDueToday);
};

/**
 * Schedule a notification for a goal reminder
 * This is a placeholder that would use expo-notifications in a real app
 */
export const scheduleGoalReminder = async (
  goal: DailyGoal
): Promise<void> => {
  // Skip on web platform
  if (Platform.OS === 'web') {
    console.log('Notifications not supported on web');
    return;
  }
  
  if (!goal.reminderTime) return;
  
  // This would use expo-notifications in a real implementation
  console.log(`Scheduled reminder for goal "${goal.title}" at ${formatTimeString(goal.reminderTime)}`);
  
  // Example implementation with expo-notifications would be:
  /*
  import * as Notifications from 'expo-notifications';
  
  // Parse the reminder time
  const [hours, minutes] = goal.reminderTime.split(':').map(Number);
  
  // Create a Date object for the reminder time today
  const reminderDate = new Date();
  reminderDate.setHours(hours, minutes, 0, 0);
  
  // If the time has already passed today, schedule for tomorrow
  if (reminderDate < new Date()) {
    reminderDate.setDate(reminderDate.getDate() + 1);
  }
  
  // Schedule the notification
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Goal Reminder',
      body: `Don't forget to ${goal.title.toLowerCase()}!`,
      data: { goalId: goal.id }
    },
    trigger: {
      date: reminderDate
    }
  });
  */
};

/**
 * Cancel a scheduled notification for a goal reminder
 * This is a placeholder that would use expo-notifications in a real app
 */
export const cancelGoalReminder = async (
  goalId: string
): Promise<void> => {
  // Skip on web platform
  if (Platform.OS === 'web') {
    console.log('Notifications not supported on web');
    return;
  }
  
  // This would use expo-notifications in a real implementation
  console.log(`Cancelled reminder for goal with ID ${goalId}`);
  
  // Example implementation with expo-notifications would be:
  /*
  import * as Notifications from 'expo-notifications';
  
  // Get all scheduled notifications
  const scheduledNotifications = await Notifications.getAllScheduledNotificationsAsync();
  
  // Find the notification for this goal
  const notification = scheduledNotifications.find(
    n => n.content.data?.goalId === goalId
  );
  
  // Cancel the notification if found
  if (notification) {
    await Notifications.cancelScheduledNotificationAsync(notification.identifier);
  }
  */
};

/**
 * Share a tip or quote
 * This is a placeholder that would use the Share API in a real app
 */
export const shareContent = async (
  content: string,
  source?: string
): Promise<void> => {
  // This would use the Share API in a real implementation
  console.log(`Sharing: ${content}${source ? ` - ${source}` : ''}`);
  
  // Example implementation with Share API would be:
  /*
  import { Share } from 'react-native';
  
  try {
    await Share.share({
      message: `${content}${source ? ` - ${source}` : ''}`,
      title: 'Check out this language learning tip!'
    });
  } catch (error) {
    console.error('Error sharing content:', error);
  }
  */
};

/**
 * Reset daily goals for a new day
 */
export const resetDailyGoals = (
  goals: DailyGoal[],
  keepIncomplete: boolean = true
): DailyGoal[] => {
  const today = new Date().toISOString();
  
  // Keep incomplete goals from yesterday if keepIncomplete is true
  const goalsToKeep = keepIncomplete 
    ? goals.filter(goal => !goal.isCompleted && isGoalDueToday(goal))
    : [];
  
  // Reset progress for kept goals
  const resetGoals = goalsToKeep.map(goal => ({
    ...goal,
    createdAt: today,
    progress: 0,
    isCompleted: false,
    completedAt: null
  }));
  
  return resetGoals;
};

/**
 * Check if motivation data needs to be refreshed (new day)
 */
export const shouldRefreshMotivationData = (
  motivationState: MotivationState
): boolean => {
  return isNewDay(motivationState.lastUpdated);
};

/**
 * Refresh motivation data for a new day
 */
export const refreshMotivationData = (
  motivationState: MotivationState,
  allTips: Tip[],
  allQuotes: Quote[]
): MotivationState => {
  const { tipPreferences, quotePreferences } = motivationState;
  
  // Get new random tip and quote
  const newTip = getRandomTip(
    allTips,
    tipPreferences.categories,
    tipPreferences.difficulty
  );
  
  const newQuote = getRandomQuote(
    allQuotes,
    quotePreferences.categories
  );
  
  // Reset daily goals
  const resetGoals = resetDailyGoals(motivationState.dailyGoals);
  
  return {
    ...motivationState,
    currentTip: newTip,
    currentQuote: newQuote,
    dailyGoals: resetGoals,
    lastUpdated: new Date().toISOString()
  };
};