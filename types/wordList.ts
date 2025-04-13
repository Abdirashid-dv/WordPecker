export type Language = 
  | "English" 
  | "Spanish" 
  | "French" 
  | "German" 
  | "Italian" 
  | "Portuguese" 
  | "Russian" 
  | "Japanese" 
  | "Chinese" 
  | "Korean";

export type WordStatus = "new" | "learning" | "mastered";

export interface Word {
  id: string;
  term: string;
  definition: string;
  example?: string;
  status: WordStatus;
  lastReviewed?: Date;
  image?: string;
  pronunciation?: string;
}

export interface WordList {
  id: string;
  name: string;
  description: string;
  language: Language;
  createdAt: Date;
  updatedAt: Date;
  words: Word[];
  tags: string[];
  isFavorite: boolean;
}

export interface ListProgress {
  total: number;
  new: number;
  learning: number;
  mastered: number;
  percentage: number;
}

export type SortOption = 
  | "name-asc" 
  | "name-desc" 
  | "date-asc" 
  | "date-desc" 
  | "progress-asc" 
  | "progress-desc";

export type FilterOption = {
  language?: Language[];
  status?: ("new" | "in-progress" | "completed")[];
  favorite?: boolean;
  tags?: string[];
};