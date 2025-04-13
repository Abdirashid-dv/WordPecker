import { COLORS } from '@/constants/colors';
import { GoalType, LanguageDifficulty, QuoteCategory, TipCategory } from '@/types/motivation';

// Tip categories with labels and colors
export const TIP_CATEGORIES = {
  [TipCategory.GRAMMAR]: {
    label: 'Grammar',
    color: COLORS.accent,
    icon: 'FileText'
  },
  [TipCategory.VOCABULARY]: {
    label: 'Vocabulary',
    color: COLORS.primary,
    icon: 'BookOpen'
  },
  [TipCategory.PRONUNCIATION]: {
    label: 'Pronunciation',
    color: '#9333EA', // Purple
    icon: 'Mic'
  },
  [TipCategory.IDIOMS]: {
    label: 'Idioms',
    color: '#EC4899', // Pink
    icon: 'MessageCircle'
  },
  [TipCategory.CULTURE]: {
    label: 'Culture',
    color: '#F97316', // Orange
    icon: 'Globe'
  },
  [TipCategory.LEARNING_STRATEGY]: {
    label: 'Learning Strategy',
    color: COLORS.highlight,
    icon: 'Lightbulb'
  }
};

// Language difficulty levels with labels
export const LANGUAGE_DIFFICULTIES = {
  [LanguageDifficulty.BEGINNER]: {
    label: 'Beginner',
    color: COLORS.primary
  },
  [LanguageDifficulty.INTERMEDIATE]: {
    label: 'Intermediate',
    color: COLORS.accent
  },
  [LanguageDifficulty.ADVANCED]: {
    label: 'Advanced',
    color: COLORS.highlight
  },
  [LanguageDifficulty.ALL_LEVELS]: {
    label: 'All Levels',
    color: '#9333EA' // Purple
  }
};

// Quote categories with labels and colors
export const QUOTE_CATEGORIES = {
  [QuoteCategory.MOTIVATION]: {
    label: 'Motivation',
    color: COLORS.primary,
    icon: 'Zap'
  },
  [QuoteCategory.LEARNING]: {
    label: 'Learning',
    color: COLORS.accent,
    icon: 'BookOpen'
  },
  [QuoteCategory.PERSEVERANCE]: {
    label: 'Perseverance',
    color: '#9333EA', // Purple
    icon: 'Dumbbell'
  },
  [QuoteCategory.SUCCESS]: {
    label: 'Success',
    color: COLORS.highlight,
    icon: 'Award'
  },
  [QuoteCategory.WISDOM]: {
    label: 'Wisdom',
    color: '#14B8A6', // Teal
    icon: 'Brain'
  }
};

// Goal types with labels, descriptions, and icons
export const GOAL_TYPES = {
  [GoalType.WORDS_TO_LEARN]: {
    label: 'Learn Words',
    description: 'Set a target for new words to learn today',
    icon: 'BookOpen',
    color: COLORS.primary,
    defaultTarget: 10,
    unit: 'words'
  },
  [GoalType.MINUTES_TO_STUDY]: {
    label: 'Study Time',
    description: 'Set a target for minutes to study today',
    icon: 'Clock',
    color: COLORS.accent,
    defaultTarget: 15,
    unit: 'minutes'
  },
  [GoalType.QUIZZES_TO_COMPLETE]: {
    label: 'Complete Quizzes',
    description: 'Set a target for quizzes to complete today',
    icon: 'CheckCircle',
    color: '#9333EA', // Purple
    defaultTarget: 2,
    unit: 'quizzes'
  },
  [GoalType.ARTICLES_TO_READ]: {
    label: 'Read Articles',
    description: 'Set a target for articles to read today',
    icon: 'FileText',
    color: '#F97316', // Orange
    defaultTarget: 1,
    unit: 'articles'
  },
  [GoalType.CUSTOM]: {
    label: 'Custom Goal',
    description: 'Create a custom goal',
    icon: 'Target',
    color: COLORS.highlight,
    defaultTarget: 1,
    unit: 'items'
  }
};

// Default goal suggestions based on user level
export const DEFAULT_GOAL_SUGGESTIONS = {
  beginner: [
    {
      type: GoalType.WORDS_TO_LEARN,
      target: 5
    },
    {
      type: GoalType.MINUTES_TO_STUDY,
      target: 10
    },
    {
      type: GoalType.QUIZZES_TO_COMPLETE,
      target: 1
    }
  ],
  intermediate: [
    {
      type: GoalType.WORDS_TO_LEARN,
      target: 10
    },
    {
      type: GoalType.MINUTES_TO_STUDY,
      target: 20
    },
    {
      type: GoalType.QUIZZES_TO_COMPLETE,
      target: 2
    },
    {
      type: GoalType.ARTICLES_TO_READ,
      target: 1
    }
  ],
  advanced: [
    {
      type: GoalType.WORDS_TO_LEARN,
      target: 15
    },
    {
      type: GoalType.MINUTES_TO_STUDY,
      target: 30
    },
    {
      type: GoalType.QUIZZES_TO_COMPLETE,
      target: 3
    },
    {
      type: GoalType.ARTICLES_TO_READ,
      target: 2
    }
  ]
};

// Motivational messages for goal completion
export const GOAL_COMPLETION_MESSAGES = [
  "Great job! You've completed your goal!",
  "Excellent work! Keep up the momentum!",
  "You did it! One step closer to fluency!",
  "Goal achieved! Your dedication is paying off!",
  "Success! You're making fantastic progress!"
];

// Motivational messages for goal progress
export const GOAL_PROGRESS_MESSAGES = [
  "You're making great progress!",
  "Keep going, you're doing well!",
  "You're on the right track!",
  "Almost there, keep it up!",
  "You can do it, just a bit more!"
];

// Default reminder times
export const DEFAULT_REMINDER_TIMES = [
  '08:00', // 8:00 AM
  '12:00', // 12:00 PM
  '17:00', // 5:00 PM
  '20:00'  // 8:00 PM
];

// Section titles
export const SECTION_TITLES = {
  DAILY_TIP: "Today's Language Tip",
  MOTIVATIONAL_QUOTE: "Daily Inspiration",
  DAILY_GOALS: "Your Daily Goals",
  GOAL_SUGGESTIONS: "Suggested Goals"
};