import { FEEDBACK_MESSAGES, STREAK_THRESHOLDS } from "@/constants/learning";

/**
 * Generates a feedback message based on whether the answer was correct
 */
export const generateFeedbackMessage = (isCorrect: boolean): string => {
  const messages = isCorrect 
    ? FEEDBACK_MESSAGES.CORRECT 
    : FEEDBACK_MESSAGES.INCORRECT;
  
  // Return a random message from the appropriate array
  return messages[Math.floor(Math.random() * messages.length)];
};

/**
 * Generates a streak message based on the current streak count
 */
export const generateStreakMessage = (streakCount: number): string | null => {
  if (streakCount >= STREAK_THRESHOLDS.AMAZING) {
    return FEEDBACK_MESSAGES.STREAK.AMAZING;
  } else if (streakCount >= STREAK_THRESHOLDS.EXCELLENT) {
    return FEEDBACK_MESSAGES.STREAK.EXCELLENT;
  } else if (streakCount >= STREAK_THRESHOLDS.GREAT) {
    return FEEDBACK_MESSAGES.STREAK.GREAT;
  } else if (streakCount >= STREAK_THRESHOLDS.GOOD) {
    return FEEDBACK_MESSAGES.STREAK.GOOD;
  }
  
  return null;
};

/**
 * Calculates a score based on correct answers and streak
 */
export const calculateScore = (
  correctCount: number, 
  totalCount: number, 
  highestStreak: number
): number => {
  const baseScore = (correctCount / totalCount) * 100;
  const streakBonus = highestStreak * 2;
  
  return Math.round(baseScore + streakBonus);
};