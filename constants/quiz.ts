import { QuizDifficulty, QuizCategory } from "@/types/quiz";

// Quiz settings
export const DEFAULT_QUIZ_SETTINGS = {
  difficulty: QuizDifficulty.MEDIUM,
  categories: [QuizCategory.VOCABULARY, QuizCategory.SYNONYMS],
  questionsPerQuiz: 10,
  timeLimit: 30, // seconds per question, null for no limit
  showExplanations: true,
  autoAdvance: false,
};

// Time limits in seconds
export const TIME_LIMITS = {
  SHORT: 15,
  MEDIUM: 30,
  LONG: 60,
  NONE: null,
};

// Score thresholds
export const SCORE_THRESHOLDS = {
  EXCELLENT: 90,
  GOOD: 75,
  AVERAGE: 60,
  POOR: 40,
};

// Feedback messages based on score
export const SCORE_FEEDBACK = {
  EXCELLENT: [
    "Outstanding performance!",
    "Excellent work!",
    "You're a language master!",
  ],
  GOOD: [
    "Great job!",
    "Well done!",
    "You're making good progress!",
  ],
  AVERAGE: [
    "Good effort!",
    "Keep practicing!",
    "You're on the right track!",
  ],
  POOR: [
    "Don't give up!",
    "Practice makes perfect!",
    "Let's review the areas you struggled with.",
  ],
};

// Timer warning thresholds
export const TIMER_WARNINGS = {
  CRITICAL: 5, // seconds remaining
  WARNING: 10, // seconds remaining
};

// Quiz category labels
export const QUIZ_CATEGORY_LABELS = {
  [QuizCategory.VOCABULARY]: "Vocabulary",
  [QuizCategory.GRAMMAR]: "Grammar",
  [QuizCategory.IDIOMS]: "Idioms & Phrases",
  [QuizCategory.SYNONYMS]: "Synonyms",
  [QuizCategory.ANTONYMS]: "Antonyms",
  [QuizCategory.SENTENCE_STRUCTURE]: "Sentence Structure",
};

// Quiz difficulty labels
export const QUIZ_DIFFICULTY_LABELS = {
  [QuizDifficulty.EASY]: "Easy",
  [QuizDifficulty.MEDIUM]: "Medium",
  [QuizDifficulty.HARD]: "Hard",
  [QuizDifficulty.EXPERT]: "Expert",
};

// Suggestions based on performance
export const PERFORMANCE_SUGGESTIONS = {
  VOCABULARY: "Focus on expanding your vocabulary with daily practice.",
  GRAMMAR: "Review basic grammar rules and practice with simple sentences.",
  IDIOMS: "Learn common idioms and their meanings through context.",
  SYNONYMS: "Practice finding alternative words with similar meanings.",
  ANTONYMS: "Work on identifying words with opposite meanings.",
  SENTENCE_STRUCTURE: "Practice constructing sentences with proper structure.",
  TIME_MANAGEMENT: "Try to answer questions more quickly without sacrificing accuracy.",
};

// Share message template
export const SHARE_MESSAGE_TEMPLATE = "I scored {score}% on the {difficulty} {category} quiz in WordPecker! #LanguageLearning #WordPecker";