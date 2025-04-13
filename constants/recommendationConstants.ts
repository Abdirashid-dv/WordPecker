import { ContentGenre, ContentLength, ContentType, LanguageLevel } from "@/types/recommendation";

// Language level descriptions
export const LANGUAGE_LEVEL_DESCRIPTIONS = {
  [LanguageLevel.A1]: 'Beginner - Can understand and use familiar everyday expressions',
  [LanguageLevel.A2]: 'Elementary - Can communicate in simple and routine tasks',
  [LanguageLevel.B1]: 'Intermediate - Can deal with most situations likely to arise while traveling',
  [LanguageLevel.B2]: 'Upper Intermediate - Can interact with a degree of fluency and spontaneity',
  [LanguageLevel.C1]: 'Advanced - Can express ideas fluently and spontaneously without much searching',
  [LanguageLevel.C2]: 'Proficient - Can understand with ease virtually everything heard or read',
};

// Content type labels
export const CONTENT_TYPE_LABELS = {
  [ContentType.BOOK]: 'Books',
  [ContentType.ARTICLE]: 'Articles',
  [ContentType.PODCAST]: 'Podcasts',
  [ContentType.VIDEO]: 'Videos',
};

// Content genre labels
export const CONTENT_GENRE_LABELS = {
  [ContentGenre.FICTION]: 'Fiction',
  [ContentGenre.NON_FICTION]: 'Non-Fiction',
  [ContentGenre.NEWS]: 'News',
  [ContentGenre.SCIENCE]: 'Science',
  [ContentGenre.HISTORY]: 'History',
  [ContentGenre.BUSINESS]: 'Business',
  [ContentGenre.TECHNOLOGY]: 'Technology',
  [ContentGenre.CULTURE]: 'Culture',
  [ContentGenre.TRAVEL]: 'Travel',
  [ContentGenre.ENTERTAINMENT]: 'Entertainment',
};

// Content length labels
export const CONTENT_LENGTH_LABELS = {
  [ContentLength.SHORT]: 'Short',
  [ContentLength.MEDIUM]: 'Medium',
  [ContentLength.LONG]: 'Long',
};

// Content length descriptions
export const CONTENT_LENGTH_DESCRIPTIONS = {
  [ContentLength.SHORT]: 'Less than 10 min read or 50 pages',
  [ContentLength.MEDIUM]: '10-30 min read or 50-200 pages',
  [ContentLength.LONG]: 'More than 30 min read or 200 pages',
};

// Default filters
export const DEFAULT_FILTERS: {
  types: ContentType[];
  genres: ContentGenre[];
  levels: LanguageLevel[];
  lengths: ContentLength[];
  searchQuery: string;
} = {
  types: [ContentType.BOOK, ContentType.ARTICLE],
  genres: [],
  levels: [LanguageLevel.A1, LanguageLevel.A2, LanguageLevel.B1],
  lengths: [ContentLength.SHORT, ContentLength.MEDIUM, ContentLength.LONG],
  searchQuery: '',
};

// Featured section title
export const FEATURED_SECTION_TITLE = "Editor's Picks";

// New content section title
export const NEW_CONTENT_SECTION_TITLE = "New This Week";

// Recommended for you section title
export const RECOMMENDED_SECTION_TITLE = "Recommended For You";

// Content type icons (from lucide-react-native)
export const CONTENT_TYPE_ICONS = {
  [ContentType.BOOK]: 'BookOpen',
  [ContentType.ARTICLE]: 'Newspaper',
  [ContentType.PODCAST]: 'Headphones',
  [ContentType.VIDEO]: 'Video',
};

// Genre icons (from lucide-react-native)
export const GENRE_ICONS = {
  [ContentGenre.FICTION]: 'BookOpen',
  [ContentGenre.NON_FICTION]: 'BookText',
  [ContentGenre.NEWS]: 'Newspaper',
  [ContentGenre.SCIENCE]: 'Flask',
  [ContentGenre.HISTORY]: 'Clock',
  [ContentGenre.BUSINESS]: 'Briefcase',
  [ContentGenre.TECHNOLOGY]: 'Laptop',
  [ContentGenre.CULTURE]: 'Globe',
  [ContentGenre.TRAVEL]: 'Map',
  [ContentGenre.ENTERTAINMENT]: 'Film',
};