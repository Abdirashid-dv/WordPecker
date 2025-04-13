import { QuestionType } from "@/types/learning";

// Feedback display time in milliseconds
export const FEEDBACK_DISPLAY_TIME = 2000;

// Streak thresholds for different messages
export const STREAK_THRESHOLDS = {
  GOOD: 3,
  GREAT: 5,
  EXCELLENT: 8,
  AMAZING: 10,
};

// Feedback messages
export const FEEDBACK_MESSAGES = {
  CORRECT: [
    "Great job!",
    "Correct!",
    "Well done!",
    "That's right!",
    "Perfect!",
  ],
  INCORRECT: [
    "Not quite right.",
    "Try again next time.",
    "That's not correct.",
    "Keep practicing!",
    "Almost there!",
  ],
  STREAK: {
    GOOD: "Good streak!",
    GREAT: "Great streak!",
    EXCELLENT: "Excellent streak!",
    AMAZING: "Amazing streak!",
  },
};

// Session settings
export const SESSION_SETTINGS = {
  DEFAULT_QUESTIONS_PER_SESSION: 10,
  MAX_HISTORY_ITEMS: 20,
};

// Question types
export const QUESTION_TYPES = {
  MULTIPLE_CHOICE: QuestionType.MULTIPLE_CHOICE,
  TRUE_FALSE: QuestionType.TRUE_FALSE,
  FILL_IN_BLANK: QuestionType.FILL_IN_BLANK,
  MATCHING: QuestionType.MATCHING,
};

// Exercise type labels
export const EXERCISE_TYPE_LABELS = {
  [QuestionType.MULTIPLE_CHOICE]: "Multiple Choice",
  [QuestionType.TRUE_FALSE]: "True or False",
  [QuestionType.FILL_IN_BLANK]: "Fill in the Blank",
  [QuestionType.MATCHING]: "Matching",
};

// Default learning settings
export const DEFAULT_LEARNING_SETTINGS = {
  selectedExerciseTypes: [
    QuestionType.MULTIPLE_CHOICE,
    QuestionType.TRUE_FALSE,
  ],
  questionsPerSession: 10,
  showExplanations: true,
  autoAdvance: false,
  autoAdvanceDelay: 1500,
};

// History view settings
export const HISTORY_VIEW = {
  MAX_DISPLAYED_SESSIONS: 20,
  CHART_DAYS: 7,
};