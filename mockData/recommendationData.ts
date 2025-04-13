import { ContentGenre, ContentLength, ContentType, LanguageLevel, RecommendationItem } from "@/types/recommendation";

// Helper to get ISO date string for a day offset from today
const getDateString = (daysAgo: number): string => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString();
};

// Mock book recommendations
export const mockBooks: RecommendationItem[] = [
  {
    id: 'book-1',
    title: "Short Stories for Beginners",
    description: "A collection of 20 simple stories perfect for language learners just starting out. Each story uses basic vocabulary and simple sentence structures.",
    imageUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    type: ContentType.BOOK,
    genre: ContentGenre.FICTION,
    level: LanguageLevel.A1,
    length: ContentLength.SHORT,
    source: "WordPecker Publishing",
    url: "https://example.com/book1",
    dateAdded: getDateString(30),
    isFeatured: true,
    isNew: false,
    rating: 4.5
  },
  {
    id: 'book-2',
    title: "Everyday Conversations",
    description: "Learn common phrases and expressions used in daily conversations. This book includes dialogues for various situations like shopping, dining, and travel.",
    imageUrl: "https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    type: ContentType.BOOK,
    genre: ContentGenre.NON_FICTION,
    level: LanguageLevel.A2,
    length: ContentLength.MEDIUM,
    source: "Language Learning Press",
    url: "https://example.com/book2",
    dateAdded: getDateString(45),
    isFeatured: false,
    isNew: false,
    rating: 4.2
  },
  {
    id: 'book-3',
    title: "The Hidden City",
    description: "An adventure novel written specifically for intermediate language learners. Follow Alex as he discovers a mysterious city beneath his hometown.",
    imageUrl: "https://images.unsplash.com/photo-1513001900722-370f803f498d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    type: ContentType.BOOK,
    genre: ContentGenre.FICTION,
    level: LanguageLevel.B1,
    length: ContentLength.MEDIUM,
    source: "Graded Readers International",
    url: "https://example.com/book3",
    dateAdded: getDateString(15),
    isFeatured: true,
    isNew: false,
    rating: 4.7
  },
  {
    id: 'book-4',
    title: "Business Communication",
    description: "Master the language of business meetings, emails, and presentations. Includes vocabulary, phrases, and cultural notes for professional settings.",
    imageUrl: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    type: ContentType.BOOK,
    genre: ContentGenre.BUSINESS,
    level: LanguageLevel.B2,
    length: ContentLength.LONG,
    source: "Professional Language Institute",
    url: "https://example.com/book4",
    dateAdded: getDateString(60),
    isFeatured: false,
    isNew: false,
    rating: 4.0
  },
  {
    id: 'book-5',
    title: "Cultural Perspectives",
    description: "An in-depth exploration of cultural nuances and expressions. Perfect for advanced learners who want to understand cultural contexts and idioms.",
    imageUrl: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    type: ContentType.BOOK,
    genre: ContentGenre.CULTURE,
    level: LanguageLevel.C1,
    length: ContentLength.LONG,
    source: "Global Language Studies",
    url: "https://example.com/book5",
    dateAdded: getDateString(2),
    isFeatured: false,
    isNew: true,
    rating: 4.8
  },
  {
    id: 'book-6',
    title: "The Art of Conversation",
    description: "Master the subtle art of natural, flowing conversation. This book covers advanced techniques for expressing complex ideas and emotions.",
    imageUrl: "https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    type: ContentType.BOOK,
    genre: ContentGenre.NON_FICTION,
    level: LanguageLevel.C2,
    length: ContentLength.MEDIUM,
    source: "Fluency Masters",
    url: "https://example.com/book6",
    dateAdded: getDateString(5),
    isFeatured: true,
    isNew: true,
    rating: 4.9
  }
];

// Mock article recommendations
export const mockArticles: RecommendationItem[] = [
  {
    id: 'article-1',
    title: "10 Basic Phrases Every Beginner Should Know",
    description: "Start your language journey with these essential phrases that will help you in everyday situations.",
    imageUrl: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    type: ContentType.ARTICLE,
    genre: ContentGenre.NON_FICTION,
    level: LanguageLevel.A1,
    length: ContentLength.SHORT,
    source: "WordPecker Blog",
    url: "https://example.com/article1",
    dateAdded: getDateString(10),
    isFeatured: false,
    isNew: false,
    rating: 4.3
  },
  {
    id: 'article-2',
    title: "Understanding Weather Forecasts",
    description: "Learn vocabulary related to weather and practice with simplified weather reports from around the world.",
    imageUrl: "https://images.unsplash.com/photo-1534088568595-a066f410bcda?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    type: ContentType.ARTICLE,
    genre: ContentGenre.NEWS,
    level: LanguageLevel.A2,
    length: ContentLength.SHORT,
    source: "Simple News Network",
    url: "https://example.com/article2",
    dateAdded: getDateString(20),
    isFeatured: false,
    isNew: false,
    rating: 4.1
  },
  {
    id: 'article-3',
    title: "The History of Chocolate",
    description: "Discover the fascinating journey of chocolate from ancient Mesoamerica to modern confectionery. Article adapted for intermediate learners.",
    imageUrl: "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    type: ContentType.ARTICLE,
    genre: ContentGenre.HISTORY,
    level: LanguageLevel.B1,
    length: ContentLength.MEDIUM,
    source: "Cultural Digest",
    url: "https://example.com/article3",
    dateAdded: getDateString(15),
    isFeatured: true,
    isNew: false,
    rating: 4.6
  },
  {
    id: 'article-4',
    title: "Sustainable Technology Trends",
    description: "Explore how technology is addressing environmental challenges. This article uses upper-intermediate vocabulary with helpful annotations.",
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    type: ContentType.ARTICLE,
    genre: ContentGenre.TECHNOLOGY,
    level: LanguageLevel.B2,
    length: ContentLength.MEDIUM,
    source: "Tech Insights",
    url: "https://example.com/article4",
    dateAdded: getDateString(3),
    isFeatured: false,
    isNew: true,
    rating: 4.4
  },
  {
    id: 'article-5',
    title: "The Psychology of Language Learning",
    description: "An in-depth analysis of how our brains process and acquire new languages. Written for advanced learners with academic vocabulary.",
    imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    type: ContentType.ARTICLE,
    genre: ContentGenre.SCIENCE,
    level: LanguageLevel.C1,
    length: ContentLength.LONG,
    source: "Linguistic Research Journal",
    url: "https://example.com/article5",
    dateAdded: getDateString(7),
    isFeatured: true,
    isNew: true,
    rating: 4.7
  },
  {
    id: 'article-6',
    title: "Literary Analysis: Modern Poetry",
    description: "A sophisticated examination of contemporary poetic forms and their cultural significance. For proficient readers who enjoy literary criticism.",
    imageUrl: "https://images.unsplash.com/photo-1474932430478-367dbb6832c1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    type: ContentType.ARTICLE,
    genre: ContentGenre.CULTURE,
    level: LanguageLevel.C2,
    length: ContentLength.LONG,
    source: "Literary Perspectives",
    url: "https://example.com/article6",
    dateAdded: getDateString(1),
    isFeatured: false,
    isNew: true,
    rating: 4.9
  }
];

// Mock podcast recommendations
export const mockPodcasts: RecommendationItem[] = [
  {
    id: 'podcast-1',
    title: "Language Basics",
    description: "A podcast series for absolute beginners. Each 5-minute episode teaches one essential phrase with clear pronunciation.",
    imageUrl: "https://images.unsplash.com/photo-1589903308904-1010c2294adc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    type: ContentType.PODCAST,
    genre: ContentGenre.NON_FICTION,
    level: LanguageLevel.A1,
    length: ContentLength.SHORT,
    source: "WordPecker Audio",
    url: "https://example.com/podcast1",
    dateAdded: getDateString(25),
    isFeatured: false,
    isNew: false,
    rating: 4.2
  },
  {
    id: 'podcast-2',
    title: "Travel Conversations",
    description: "Learn how to navigate common travel situations with this podcast series. Each episode covers a different travel scenario.",
    imageUrl: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    type: ContentType.PODCAST,
    genre: ContentGenre.TRAVEL,
    level: LanguageLevel.A2,
    length: ContentLength.MEDIUM,
    source: "Globetrotter Linguistics",
    url: "https://example.com/podcast2",
    dateAdded: getDateString(4),
    isFeatured: false,
    isNew: true,
    rating: 4.5
  },
  {
    id: 'podcast-3',
    title: "Cultural Insights",
    description: "Explore different aspects of culture and traditions. This intermediate-level podcast uses clear speech with some challenging vocabulary.",
    imageUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    type: ContentType.PODCAST,
    genre: ContentGenre.CULTURE,
    level: LanguageLevel.B1,
    length: ContentLength.MEDIUM,
    source: "Global Perspectives",
    url: "https://example.com/podcast3",
    dateAdded: getDateString(12),
    isFeatured: true,
    isNew: false,
    rating: 4.6
  }
];

// Mock video recommendations
export const mockVideos: RecommendationItem[] = [
  {
    id: 'video-1',
    title: "Pronunciation Basics",
    description: "A video series focusing on proper pronunciation of difficult sounds. Includes slow-motion mouth movements and practice exercises.",
    imageUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    type: ContentType.VIDEO,
    genre: ContentGenre.NON_FICTION,
    level: LanguageLevel.A1,
    length: ContentLength.SHORT,
    source: "WordPecker Video",
    url: "https://example.com/video1",
    dateAdded: getDateString(18),
    isFeatured: false,
    isNew: false,
    rating: 4.4
  },
  {
    id: 'video-2',
    title: "Cooking Vocabulary",
    description: "Learn kitchen and cooking terms by following along with simple recipes. Perfect for visual learners at the elementary level.",
    imageUrl: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    type: ContentType.VIDEO,
    genre: ContentGenre.CULTURE,
    level: LanguageLevel.A2,
    length: ContentLength.MEDIUM,
    source: "Language Kitchen",
    url: "https://example.com/video2",
    dateAdded: getDateString(8),
    isFeatured: true,
    isNew: true,
    rating: 4.7
  },
  {
    id: 'video-3',
    title: "Science Explained Simply",
    description: "Fascinating science concepts explained using intermediate-level vocabulary with visual aids and animations.",
    imageUrl: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    type: ContentType.VIDEO,
    genre: ContentGenre.SCIENCE,
    level: LanguageLevel.B1,
    length: ContentLength.MEDIUM,
    source: "Science Simplified",
    url: "https://example.com/video3",
    dateAdded: getDateString(6),
    isFeatured: false,
    isNew: true,
    rating: 4.5
  }
];

// Combine all recommendations
export const mockRecommendations: RecommendationItem[] = [
  ...mockBooks,
  ...mockArticles,
  ...mockPodcasts,
  ...mockVideos
];

// Mock user preferences
export const mockUserPreferences = {
  preferredLevel: LanguageLevel.B1,
  preferredGenres: [ContentGenre.FICTION, ContentGenre.CULTURE, ContentGenre.TRAVEL],
  preferredTypes: [ContentType.BOOK, ContentType.ARTICLE],
  preferredLength: ContentLength.MEDIUM,
  savedItems: ['book-3', 'article-3', 'podcast-3']
};