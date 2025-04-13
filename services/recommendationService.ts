import { ContentGenre, ContentLength, ContentType, LanguageLevel, RecommendationFilters, RecommendationItem, UserPreferences } from "@/types/recommendation";
import { mockRecommendations, mockUserPreferences } from "@/mockData/recommendationData";

// This is a placeholder service for future API integration
// Currently using mock data

export const recommendationService = {
  // Fetch all recommendations
  fetchRecommendations: async (): Promise<RecommendationItem[]> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockRecommendations);
      }, 500);
    });
  },
  
  // Fetch recommendations with filters
  fetchFilteredRecommendations: async (
    filters: RecommendationFilters
  ): Promise<RecommendationItem[]> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        // Filter recommendations based on filters
        const filtered = mockRecommendations.filter(item => {
          // Filter by content type
          if (filters.types.length > 0 && !filters.types.includes(item.type)) {
            return false;
          }
          
          // Filter by genre
          if (filters.genres.length > 0 && !filters.genres.includes(item.genre)) {
            return false;
          }
          
          // Filter by language level
          if (filters.levels.length > 0 && !filters.levels.includes(item.level)) {
            return false;
          }
          
          // Filter by content length
          if (filters.lengths.length > 0 && !filters.lengths.includes(item.length)) {
            return false;
          }
          
          // Filter by search query
          if (filters.searchQuery) {
            const query = filters.searchQuery.toLowerCase();
            return (
              item.title.toLowerCase().includes(query) ||
              item.description.toLowerCase().includes(query) ||
              item.source.toLowerCase().includes(query)
            );
          }
          
          return true;
        });
        
        resolve(filtered);
      }, 500);
    });
  },
  
  // Fetch featured recommendations
  fetchFeaturedRecommendations: async (): Promise<RecommendationItem[]> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const featured = mockRecommendations.filter(item => item.isFeatured);
        resolve(featured);
      }, 500);
    });
  },
  
  // Fetch new recommendations
  fetchNewRecommendations: async (): Promise<RecommendationItem[]> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const newItems = mockRecommendations.filter(item => item.isNew);
        resolve(newItems);
      }, 500);
    });
  },
  
  // Fetch user preferences
  fetchUserPreferences: async (): Promise<UserPreferences> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockUserPreferences);
      }, 500);
    });
  },
  
  // Update user preferences
  updateUserPreferences: async (
    preferences: Partial<UserPreferences>
  ): Promise<UserPreferences> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const updatedPreferences = {
          ...mockUserPreferences,
          ...preferences
        };
        console.log('Updated preferences:', updatedPreferences);
        resolve(updatedPreferences);
      }, 500);
    });
  },
  
  // Save an item to user's saved items
  saveItem: async (itemId: string): Promise<void> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Saved item: ${itemId}`);
        resolve();
      }, 500);
    });
  },
  
  // Remove an item from user's saved items
  unsaveItem: async (itemId: string): Promise<void> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Unsaved item: ${itemId}`);
        resolve();
      }, 500);
    });
  },
  
  // Record that user viewed an item
  recordItemView: async (itemId: string): Promise<void> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Recorded view for item: ${itemId}`);
        resolve();
      }, 500);
    });
  },
};