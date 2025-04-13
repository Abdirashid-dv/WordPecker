import { 
    DailyGoal, 
    GoalType, 
    LanguageDifficulty, 
    Quote, 
    QuoteCategory, 
    Tip, 
    TipCategory 
  } from '@/types/motivation';
  
  // Helper to get ISO date string for today
  const getTodayString = (): string => {
    return new Date().toISOString();
  };
  
  // Helper to get ISO date string for a day offset from today
  const getDateString = (daysAgo: number): string => {
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    return date.toISOString();
  };
  
  // Mock language tips
  export const mockTips: Tip[] = [
    {
      id: 'tip-1',
      content: "When learning new vocabulary, create associations with words you already know. This helps with retention and recall.",
      category: TipCategory.LEARNING_STRATEGY,
      difficulty: LanguageDifficulty.ALL_LEVELS,
      dateAdded: getDateString(30)
    },
    {
      id: 'tip-2',
      content: "Practice using the present continuous tense for actions happening right now: 'I am learning' instead of 'I learn'.",
      category: TipCategory.GRAMMAR,
      difficulty: LanguageDifficulty.BEGINNER,
      dateAdded: getDateString(29)
    },
    {
      id: 'tip-3',
      content: "To improve your pronunciation, record yourself speaking and compare it to native speakers. Focus on one sound at a time.",
      category: TipCategory.PRONUNCIATION,
      difficulty: LanguageDifficulty.INTERMEDIATE,
      dateAdded: getDateString(28)
    },
    {
      id: 'tip-4',
      content: "The idiom 'break the ice' means to do or say something to reduce tension or make people feel more comfortable in a social situation.",
      category: TipCategory.IDIOMS,
      difficulty: LanguageDifficulty.INTERMEDIATE,
      dateAdded: getDateString(27)
    },
    {
      id: 'tip-5',
      content: "When learning a new language, understanding cultural context is as important as vocabulary. Research cultural norms and practices.",
      category: TipCategory.CULTURE,
      difficulty: LanguageDifficulty.ADVANCED,
      dateAdded: getDateString(26)
    },
    {
      id: 'tip-6',
      content: "Create word families by grouping related words together. For example: happy, happiness, unhappy, happily.",
      category: TipCategory.VOCABULARY,
      difficulty: LanguageDifficulty.BEGINNER,
      dateAdded: getDateString(25)
    },
    {
      id: 'tip-7',
      content: "Use conditional sentences to express hypothetical situations. For example: 'If I had more time, I would learn another language.'",
      category: TipCategory.GRAMMAR,
      difficulty: LanguageDifficulty.ADVANCED,
      dateAdded: getDateString(24)
    },
    {
      id: 'tip-8',
      content: "Practice the 'shadowing' technique: listen to native speakers and repeat what they say with the same intonation and rhythm.",
      category: TipCategory.PRONUNCIATION,
      difficulty: LanguageDifficulty.INTERMEDIATE,
      dateAdded: getDateString(23)
    },
    {
      id: 'tip-9',
      content: "The expression 'it's raining cats and dogs' means it's raining very heavily. It's an idiom, not to be taken literally!",
      category: TipCategory.IDIOMS,
      difficulty: LanguageDifficulty.BEGINNER,
      dateAdded: getDateString(22)
    },
    {
      id: 'tip-10',
      content: "Set specific, measurable goals for your language learning. Instead of 'learn more words', try 'learn 10 new words this week'.",
      category: TipCategory.LEARNING_STRATEGY,
      difficulty: LanguageDifficulty.ALL_LEVELS,
      dateAdded: getDateString(21)
    }
  ];
  
  // Mock motivational quotes
  export const mockQuotes: Quote[] = [
    {
      id: 'quote-1',
      content: "The limits of my language mean the limits of my world.",
      author: "Ludwig Wittgenstein",
      category: QuoteCategory.WISDOM,
      dateAdded: getDateString(30)
    },
    {
      id: 'quote-2',
      content: "One language sets you in a corridor for life. Two languages open every door along the way.",
      author: "Frank Smith",
      category: QuoteCategory.MOTIVATION,
      dateAdded: getDateString(29)
    },
    {
      id: 'quote-3',
      content: "To have another language is to possess a second soul.",
      author: "Charlemagne",
      category: QuoteCategory.WISDOM,
      dateAdded: getDateString(28)
    },
    {
      id: 'quote-4',
      content: "Learning another language is not only learning different words for the same things, but learning another way to think about things.",
      author: "Flora Lewis",
      category: QuoteCategory.LEARNING,
      dateAdded: getDateString(27)
    },
    {
      id: 'quote-5',
      content: "The more languages you know, the more you are human.",
      author: "Tomáš Garrigue Masaryk",
      category: QuoteCategory.WISDOM,
      dateAdded: getDateString(26)
    },
    {
      id: 'quote-6',
      content: "Language is the road map of a culture. It tells you where its people come from and where they are going.",
      author: "Rita Mae Brown",
      category: QuoteCategory.CULTURE,
      dateAdded: getDateString(25)
    },
    {
      id: 'quote-7',
      content: "With languages, you are at home anywhere.",
      author: "Edmund de Waal",
      category: QuoteCategory.MOTIVATION,
      dateAdded: getDateString(24)
    },
    {
      id: 'quote-8',
      content: "A different language is a different vision of life.",
      author: "Federico Fellini",
      category: QuoteCategory.WISDOM,
      dateAdded: getDateString(23)
    },
    {
      id: 'quote-9',
      content: "The struggle you're in today is developing the strength you need for tomorrow.",
      author: "Robert Tew",
      category: QuoteCategory.PERSEVERANCE,
      dateAdded: getDateString(22)
    },
    {
      id: 'quote-10',
      content: "Success is not final, failure is not fatal: It is the courage to continue that counts.",
      author: "Winston Churchill",
      category: QuoteCategory.SUCCESS,
      dateAdded: getDateString(21)
    }
  ];
  
  // Mock daily goals
  export const mockDailyGoals: DailyGoal[] = [
    {
      id: 'goal-1',
      title: "Learn New Words",
      description: "Learn 10 new vocabulary words today",
      type: GoalType.WORDS_TO_LEARN,
      target: 10,
      progress: 7,
      isCompleted: false,
      createdAt: getTodayString(),
      completedAt: null,
      reminderTime: '17:00' // 5:00 PM
    },
    {
      id: 'goal-2',
      title: "Study Time",
      description: "Study for at least 15 minutes today",
      type: GoalType.MINUTES_TO_STUDY,
      target: 15,
      progress: 15,
      isCompleted: true,
      createdAt: getTodayString(),
      completedAt: getTodayString(),
      reminderTime: '12:00' // 12:00 PM
    },
    {
      id: 'goal-3',
      title: "Complete Quiz",
      description: "Complete 1 vocabulary quiz",
      type: GoalType.QUIZZES_TO_COMPLETE,
      target: 1,
      progress: 0,
      isCompleted: false,
      createdAt: getTodayString(),
      completedAt: null,
      reminderTime: '20:00' // 8:00 PM
    }
  ];
  
  // Default motivation state
  export const defaultMotivationState = {
    currentTip: mockTips[0],
    currentQuote: mockQuotes[0],
    dailyGoals: mockDailyGoals,
    lastUpdated: getTodayString(),
    tipPreferences: {
      categories: Object.values(TipCategory),
      difficulty: LanguageDifficulty.ALL_LEVELS
    },
    quotePreferences: {
      categories: Object.values(QuoteCategory)
    },
    goalPreferences: {
      reminderEnabled: true,
      defaultReminderTime: '17:00', // 5:00 PM
      suggestGoals: true
    }
  };