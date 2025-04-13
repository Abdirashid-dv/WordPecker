import { WordList, Language } from "@/types/wordList";

const generateWords = (count: number, language: Language) => {
  const statuses = ["new", "learning", "mastered"] as const;
  const words = [];
  
  for (let i = 0; i < count; i++) {
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    
    words.push({
      id: `word-${language.toLowerCase()}-${i}`,
      term: `${language} Word ${i + 1}`,
      definition: `Definition for ${language} word ${i + 1}`,
      example: i % 2 === 0 ? `Example sentence for ${language} word ${i + 1}` : undefined,
      status: randomStatus,
      lastReviewed: i % 3 === 0 ? new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000) : undefined,
    });
  }
  
  return words;
};

export const mockWordLists: WordList[] = [
  {
    id: "list-1",
    name: "Basic English Vocabulary",
    description: "Essential words for everyday conversations",
    language: "English",
    createdAt: new Date(2023, 0, 15),
    updatedAt: new Date(2023, 5, 20),
    words: generateWords(25, "English"),
    tags: ["beginner", "essential", "daily"],
    isFavorite: true,
  },
  {
    id: "list-2",
    name: "French Cuisine Terms",
    description: "Common words used in French cooking",
    language: "French",
    createdAt: new Date(2023, 1, 5),
    updatedAt: new Date(2023, 4, 12),
    words: generateWords(18, "French"),
    tags: ["food", "cooking", "intermediate"],
    isFavorite: true,
  },
  {
    id: "list-3",
    name: "Spanish Travel Phrases",
    description: "Useful phrases for traveling in Spanish-speaking countries",
    language: "Spanish",
    createdAt: new Date(2023, 2, 20),
    updatedAt: new Date(2023, 3, 15),
    words: generateWords(30, "Spanish"),
    tags: ["travel", "phrases", "intermediate"],
    isFavorite: false,
  },
  {
    id: "list-4",
    name: "German Business Vocabulary",
    description: "Professional terms for business communications",
    language: "German",
    createdAt: new Date(2023, 3, 10),
    updatedAt: new Date(2023, 6, 5),
    words: generateWords(22, "German"),
    tags: ["business", "professional", "advanced"],
    isFavorite: false,
  },
  {
    id: "list-5",
    name: "Italian Basics",
    description: "Fundamental Italian words and phrases",
    language: "Italian",
    createdAt: new Date(2023, 4, 25),
    updatedAt: new Date(2023, 6, 30),
    words: generateWords(15, "Italian"),
    tags: ["beginner", "basics"],
    isFavorite: false,
  },
  {
    id: "list-6",
    name: "Japanese Greetings",
    description: "Common greetings and introductions in Japanese",
    language: "Japanese",
    createdAt: new Date(2023, 5, 12),
    updatedAt: new Date(2023, 7, 8),
    words: generateWords(12, "Japanese"),
    tags: ["beginner", "greetings", "social"],
    isFavorite: true,
  },
  {
    id: "list-7",
    name: "Portuguese Slang",
    description: "Modern slang terms used in Brazil",
    language: "Portuguese",
    createdAt: new Date(2023, 6, 18),
    updatedAt: new Date(2023, 8, 2),
    words: generateWords(20, "Portuguese"),
    tags: ["slang", "informal", "advanced"],
    isFavorite: false,
  },
  {
    id: "list-8",
    name: "Russian Alphabet",
    description: "Learn the Russian Cyrillic alphabet",
    language: "Russian",
    createdAt: new Date(2023, 7, 5),
    updatedAt: new Date(2023, 8, 15),
    words: generateWords(33, "Russian"),
    tags: ["alphabet", "beginner", "essential"],
    isFavorite: false,
  },
];