import { mockDefinitions } from "@/mockData/dictionary";

// This is a placeholder service for future API integration
// In a real app, this would connect to a dictionary API

export const fetchWordDefinition = async (word: string, language: string): Promise<string> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      // Check if we have a mock definition for this word
      const lowerWord = word.toLowerCase();
      const mockDef = mockDefinitions[language]?.[lowerWord];
      
      if (mockDef) {
        resolve(mockDef);
      } else {
        // Generate a placeholder definition
        resolve(`Definition for "${word}" in ${language}. This is a placeholder that would be replaced with a real API call in production.`);
      }
    }, 500); // Simulate network delay
  });
};

export const fetchWordExamples = async (word: string, language: string): Promise<string[]> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      // Generate placeholder examples
      resolve([
        `Example sentence for "${word}" in ${language}.`,
        `Another example using "${word}" in context.`
      ]);
    }, 500); // Simulate network delay
  });
};

export const fetchWordPronunciation = async (word: string, language: string): Promise<string> => {
  // Simulate API call - in a real app, this would return a URL to an audio file
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`https://example.com/pronunciation/${language}/${encodeURIComponent(word)}.mp3`);
    }, 500); // Simulate network delay
  });
};