export interface QuestionOption {
    id: string;
    text: string;
}

export interface Question {
    id: string;
    text: string;
    options: QuestionOption[];
    correctOptionId: string;
    type: QuestionType;
    imageUrl?: string;
    explanation?: string;
    // For fill-in-blank questions
    blanks?: string[];
    // For matching questions
    matchPairs?: { left: string; right: string }[];
    // For true/false questions
    statement?: string;
    isTrue?: boolean;
}

export enum QuestionType {
    MULTIPLE_CHOICE = "MULTIPLE_CHOICE",
    TRUE_FALSE = "TRUE_FALSE",
    FILL_IN_BLANK = "FILL_IN_BLANK",
    MATCHING = "MATCHING",
}

export interface Progress {
    current: number;
    total: number;
}

export interface Streak {
    current: number;
    highest: number;
}

export interface SessionHistory {
    date: string;
    correct: number;
    total: number;
    streakHighest: number;
    exerciseTypes?: QuestionType[];
    timeSpent?: number; // in seconds
    topics?: string[];
}

export interface CurrentSession {
    correct: number;
    total: number;
    date: string;
    exerciseTypes: QuestionType[];
    startTime: string;
    timeSpent: number; // in seconds
}

export interface FeedbackState {
    visible: boolean;
    isCorrect: boolean;
    message: string;
    correctAnswer?: string;
}

export interface ExerciseFilter {
    types: QuestionType[];
    difficulty?: string;
    isActive: boolean;
}

export interface LearningSettings {
    selectedExerciseTypes: QuestionType[];
    questionsPerSession: number;
    showExplanations: boolean;
    autoAdvance: boolean;
    autoAdvanceDelay: number; // in milliseconds
}
