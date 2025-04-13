import { mockSuggestions } from "@/mockData/autocomplete";
import { AutocompleteSuggestion } from "@/types/dictionary";

// This is a placeholder service for future API integration
// In a real app, this would connect to an autocomplete API

export const getSuggestions = async (query: string, language: string): Promise<AutocompleteSuggestion[]> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const lowerQuery = query.toLowerCase();
      
      // Check if we have mock suggestions for this language
      const languageSuggestions = mockSuggestions[language] || [];
      
      // Filter suggestions that match the query
      const filteredSuggestions = languageSuggestions.filter(
        suggestion => suggestion.word.toLowerCase().includes(lowerQuery)
      );
      
      // Limit to 5 suggestions
      resolve(filteredSuggestions.slice(0, 5));
    }, 300); // Simulate network delay
  });
};