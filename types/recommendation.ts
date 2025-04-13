// Types for book and news recommendations

export enum LanguageLevel {
    A1 = 'A1', // Beginner
    A2 = 'A2', // Elementary
    B1 = 'B1', // Intermediate
    B2 = 'B2', // Upper Intermediate
    C1 = 'C1', // Advanced
    C2 = 'C2'  // Proficient
  }
  
  export enum ContentType {
    BOOK = 'book',
    ARTICLE = 'article',
    PODCAST = 'podcast',
    VIDEO = 'video'
  }
  
  export enum ContentGenre {
    FICTION = 'fiction',
    NON_FICTION = 'non-fiction',
    NEWS = 'news',
    SCIENCE = 'science',
    HISTORY = 'history',
    BUSINESS = 'business',
    TECHNOLOGY = 'technology',
    CULTURE = 'culture',
    TRAVEL = 'travel',
    ENTERTAINMENT = 'entertainment'
  }
  
  export enum ContentLength {
    SHORT = 'short',    // < 10 min read or < 50 pages
    MEDIUM = 'medium',  // 10-30 min read or 50-200 pages
    LONG = 'long'       // > 30 min read or > 200 pages
  }
  
  export interface RecommendationItem {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    type: ContentType;
    genre: ContentGenre;
    level: LanguageLevel;
    length: ContentLength;
    source: string;
    url: string;
    dateAdded: string; // ISO date string
    isFeatured: boolean;
    isNew: boolean;
    rating: number; // 0-5
  }
  
  export interface RecommendationFilters {
    types: ContentType[];
    genres: ContentGenre[];
    levels: LanguageLevel[];
    lengths: ContentLength[];
    searchQuery: string;
  }
  
  export interface UserPreferences {
    preferredLevel: LanguageLevel;
    preferredGenres: ContentGenre[];
    preferredTypes: ContentType[];
    preferredLength: ContentLength;
    savedItems: string[]; // Array of recommendation IDs
  }