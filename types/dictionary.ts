export interface AutocompleteSuggestion {
    word: string;
    definition?: string;
    frequency?: number; // How common the word is (higher = more common)
    partOfSpeech?: string; // e.g., noun, verb, adjective
  }
  
  export interface DictionaryEntry {
    word: string;
    phonetic?: string; // Pronunciation guide
    phonetics?: {
      text?: string;
      audio?: string;
    }[];
    meanings: {
      partOfSpeech: string;
      definitions: {
        definition: string;
        example?: string;
        synonyms?: string[];
        antonyms?: string[];
      }[];
    }[];
    sourceUrls?: string[];
  }
  
  export interface ExtractedWord {
    term: string;
    definition: string;
    example?: string;
    confidence?: number;
  }