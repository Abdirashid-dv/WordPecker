import { COLORS } from './colors';

// Default quick actions
export const DEFAULT_QUICK_ACTIONS = [
  {
    id: 'start-quiz',
    title: 'Start Quiz',
    description: 'Test your vocabulary knowledge',
    icon: 'Brain',
    route: '/quiz',
    color: COLORS.primary,
    isEnabled: true,
    order: 0
  },
  {
    id: 'learn-words',
    title: 'Learn Words',
    description: 'Discover new vocabulary',
    icon: 'BookOpen',
    route: '/learn',
    color: COLORS.accent,
    isEnabled: true,
    order: 1
  },
  {
    id: 'view-progress',
    title: 'View Progress',
    description: 'Check your learning statistics',
    icon: 'BarChart2',
    route: '/progress',
    color: COLORS.highlight,
    isEnabled: true,
    order: 2
  },
  {
    id: 'create-list',
    title: 'Create List',
    description: 'Make a custom word list',
    icon: 'ListPlus',
    route: '/lists/create',
    color: '#9333EA', // Purple
    isEnabled: true,
    order: 3
  },
  {
    id: 'daily-challenge',
    title: 'Daily Challenge',
    description: 'Complete today\'s challenge',
    icon: 'Calendar',
    route: '/challenges/daily',
    color: '#F97316', // Orange
    isEnabled: true,
    order: 4
  },
  {
    id: 'practice-speaking',
    title: 'Practice Speaking',
    description: 'Improve your pronunciation',
    icon: 'Mic',
    route: '/speaking',
    color: '#06B6D4', // Cyan
    isEnabled: true,
    order: 5
  },
  {
    id: 'explore-books',
    title: 'Explore Books',
    description: 'Find books at your level',
    icon: 'BookMarked',
    route: '/recommendations?type=book',
    color: '#EC4899', // Pink
    isEnabled: false,
    order: 6
  },
  {
    id: 'grammar-rules',
    title: 'Grammar Rules',
    description: 'Learn language grammar',
    icon: 'FileText',
    route: '/grammar',
    color: '#14B8A6', // Teal
    isEnabled: false,
    order: 7
  }
];

// Quick action categories
export const QUICK_ACTION_CATEGORIES = [
  {
    id: 'learning',
    title: 'Learning',
    actions: ['learn-words', 'grammar-rules']
  },
  {
    id: 'practice',
    title: 'Practice',
    actions: ['start-quiz', 'practice-speaking', 'daily-challenge']
  },
  {
    id: 'organization',
    title: 'Organization',
    actions: ['create-list', 'view-progress', 'explore-books']
  }
];

// Tutorial steps
export const TUTORIAL_STEPS = [
  {
    title: 'Customize Your Dashboard',
    description: 'Tap the Edit button to customize your quick actions.'
  },
  {
    title: 'Reorder Actions',
    description: 'In edit mode, tap the up/down arrows to change the order of actions.'
  },
  {
    title: 'Enable or Disable',
    description: 'Toggle actions on or off to show only what you need.'
  },
  {
    title: 'Save Your Changes',
    description: 'Tap Done when you\'re finished to save your customized dashboard.'
  }
];