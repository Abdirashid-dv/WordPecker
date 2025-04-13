import { useEffect } from 'react';
import { useRecommendationsStore } from '@/stores/recommendationsStore';
import { ContentGenre, ContentLength, ContentType, LanguageLevel, RecommendationFilters, RecommendationItem, UserPreferences } from '@/types/recommendation';
import { getSavedRecommendations } from '@/utils/recommendationUtils';

export const useRecommendations = () => {
  const {
    recommendations,
    filteredRecommendations,
    featuredRecommendations,
    newRecommendations,
    personalizedRecommendations,
    userPreferences,
    filters,
    isLoading,
    error,
    setRecommendations,
    setUserPreferences,
    setFilters,
    resetFilters,
    saveItem,
    unsaveItem,
    fetchRecommendations
  } = useRecommendationsStore();
  
  // Fetch recommendations on mount
  useEffect(() => {
    fetchRecommendations();
  }, [fetchRecommendations]);
  
  // Get saved recommendations
  const savedRecommendations = getSavedRecommendations(
    recommendations,
    userPreferences.savedItems
  );
  
  // Check if an item is saved
  const isItemSaved = (itemId: string): boolean => {
    return userPreferences.savedItems.includes(itemId);
  };
  
  // Toggle save status for an item
  const toggleSaveItem = (itemId: string): void => {
    if (isItemSaved(itemId)) {
      unsaveItem(itemId);
    } else {
      saveItem(itemId);
    }
  };
  
  // Update user preferences
  const updatePreferences = (preferences: Partial<UserPreferences>): void => {
    setUserPreferences(preferences);
  };
  
  // Update filters
  const updateFilters = (newFilters: Partial<RecommendationFilters>): void => {
    setFilters(newFilters);
  };
  
  // Toggle a filter value (add if not present, remove if present)
  const toggleFilter = <T extends ContentType | ContentGenre | LanguageLevel | ContentLength>(
    filterType: keyof Pick<RecommendationFilters, 'types' | 'genres' | 'levels' | 'lengths'>,
    value: T
  ): void => {
    const currentValues = filters[filterType] as T[];
    
    if (currentValues.includes(value)) {
      // Remove the value
      const updatedValues = currentValues.filter(v => v !== value);
      setFilters({ [filterType]: updatedValues } as Partial<RecommendationFilters>);
    } else {
      // Add the value
      const updatedValues = [...currentValues, value];
      setFilters({ [filterType]: updatedValues } as Partial<RecommendationFilters>);
    }
  };
  
  return {
    recommendations,
    filteredRecommendations,
    featuredRecommendations,
    newRecommendations,
    personalizedRecommendations,
    savedRecommendations,
    userPreferences,
    filters,
    isLoading,
    error,
    actions: {
      fetchRecommendations,
      updatePreferences,
      updateFilters,
      resetFilters,
      toggleFilter,
      saveItem,
      unsaveItem,
      isItemSaved,
      toggleSaveItem
    }
  };
};