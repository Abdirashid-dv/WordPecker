// Types for daily tips, motivational quotes, and goals

export interface Tip {
    id: string;
    content: string;
    category: TipCategory;
    difficulty: LanguageDifficulty;
    source?: string;
    dateAdded: string; // ISO date string
}

export enum TipCategory {
    GRAMMAR = "grammar",
    VOCABULARY = "vocabulary",
    PRONUNCIATION = "pronunciation",
    IDIOMS = "idioms",
    CULTURE = "culture",
    LEARNING_STRATEGY = "learning_strategy",
}

export enum LanguageDifficulty {
    BEGINNER = "beginner",
    INTERMEDIATE = "intermediate",
    ADVANCED = "advanced",
    ALL_LEVELS = "all_levels",
}

export interface Quote {
    id: string;
    content: string;
    author: string;
    source?: string;
    category: QuoteCategory;
    dateAdded: string; // ISO date string
}

export enum QuoteCategory {
    MOTIVATION = "motivation",
    LEARNING = "learning",
    PERSEVERANCE = "perseverance",
    SUCCESS = "success",
    WISDOM = "wisdom",
    CULTURE = "culture",
}

export interface DailyGoal {
    id: string;
    title: string;
    description: string;
    type: GoalType;
    target: number;
    progress: number;
    isCompleted: boolean;
    createdAt: string; // ISO date string
    completedAt: string | null; // ISO date string or null if not completed
    reminderTime: string | null; // Time string (HH:MM) or null if no reminder
}

export enum GoalType {
    WORDS_TO_LEARN = "words_to_learn",
    MINUTES_TO_STUDY = "minutes_to_study",
    QUIZZES_TO_COMPLETE = "quizzes_to_complete",
    ARTICLES_TO_READ = "articles_to_read",
    CUSTOM = "custom",
}

export interface MotivationState {
    currentTip: Tip | null;
    currentQuote: Quote | null;
    dailyGoals: DailyGoal[];
    lastUpdated: string; // ISO date string
    tipPreferences: {
        categories: TipCategory[];
        difficulty: LanguageDifficulty;
    };
    quotePreferences: {
        categories: QuoteCategory[];
    };
    goalPreferences: {
        reminderEnabled: boolean;
        defaultReminderTime: string | null; // Time string (HH:MM) or null
        suggestGoals: boolean;
    };
}
