import { QuestionType } from "./learning";

export interface QuizQuestion {
  id: string;
  text: string;
  options: QuizOption[];
  correctOptionId: string;
  type: QuestionType;
  difficulty: QuizDifficulty;
  category?: string;
  explanation?: string;
  imageUrl?: string;
  // For sentence completion
  sentence?: string;
  // For synonym/antonym questions
  word?: string;
  // For matching questions
  matchPairs?: { left: string; right: string }[];
}

export interface QuizOption {
  id: string;
  text: string;
}

export enum QuizDifficulty {
  EASY = "EASY",
  MEDIUM = "MEDIUM",
  HARD = "HARD",
  EXPERT = "EXPERT"
}

export enum QuizCategory {
  VOCABULARY = "VOCABULARY",
  GRAMMAR = "GRAMMAR",
  IDIOMS = "IDIOMS",
  SYNONYMS = "SYNONYMS",
  ANTONYMS = "ANTONYMS",
  SENTENCE_STRUCTURE = "SENTENCE_STRUCTURE"
}

export interface QuizProgress {
  current: number;
  total: number;
}

export interface QuizScore {
  correct: number;
  incorrect: number;
  skipped: number;
  total: number;
  percentage: number;
  timeSpent: number; // in seconds
}

export interface QuizReview {
  questionId: string;
  question: string;
  userAnswer: string;
  correctAnswer: string;
  explanation?: string;
  timeSpent?: number; // in seconds
}

export interface QuizSession {
  id: string;
  date: string;
  score: QuizScore;
  difficulty: QuizDifficulty;
  categories: QuizCategory[];
  reviewItems: QuizReview[];
  timeLimit?: number; // in seconds per question, if applicable
}

export interface QuizSettings {
  difficulty: QuizDifficulty;
  categories: QuizCategory[];
  questionsPerQuiz: number;
  timeLimit: number | null; // null means no time limit
  showExplanations: boolean;
  autoAdvance: boolean;
}

export interface QuizTimerState {
  isActive: boolean;
  timeRemaining: number;
  totalTime: number;
}