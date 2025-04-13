import { useState, useCallback, useEffect } from "react";
import { useWordListStore } from "@/stores/wordListStore";
import { SortOption, FilterOption, Language } from "@/types/wordList";

export const useWordLists = () => {
  const {
    wordLists,
    sortOption,
    filterOptions,
    setSortOption,
    setFilterOptions,
    resetFilters,
    getSortedAndFilteredLists,
    toggleFavorite,
  } = useWordListStore();
  
  const [refreshing, setRefreshing] = useState(false);
  
  // Get the sorted and filtered lists
  const displayedLists = getSortedAndFilteredLists();
  
  // Handle pull-to-refresh
  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    
    // Simulate a network request
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);
  
  // Handle sort change
  const handleSortChange = useCallback((option: SortOption) => {
    setSortOption(option);
  }, [setSortOption]);
  
  // Handle language filter change
  const handleLanguageFilterChange = useCallback((languages: Language[]) => {
    setFilterOptions({ language: languages.length > 0 ? languages : undefined });
  }, [setFilterOptions]);
  
  // Handle status filter change
  const handleStatusFilterChange = useCallback((statuses: ("new" | "in-progress" | "completed")[]) => {
    setFilterOptions({ status: statuses.length > 0 ? statuses : undefined });
  }, [setFilterOptions]);
  
  // Handle favorite filter toggle
  const handleFavoriteFilterToggle = useCallback((value: boolean | undefined) => {
    setFilterOptions({ favorite: value });
  }, [setFilterOptions]);
  
  // Handle favorite toggle for a list
  const handleToggleFavorite = useCallback((id: string) => {
    toggleFavorite(id);
  }, [toggleFavorite]);
  
  // Reset all filters
  const handleResetFilters = useCallback(() => {
    resetFilters();
  }, [resetFilters]);
  
  // Get available languages from the word lists
  const availableLanguages = [...new Set(wordLists.map(list => list.language))];
  
  // Get active filters count
  const activeFiltersCount = Object.values(filterOptions).filter(
    value => value !== undefined && (
      Array.isArray(value) ? value.length > 0 : true
    )
  ).length;
  
  return {
    lists: displayedLists,
    totalLists: wordLists.length,
    refreshing,
    sortOption,
    filterOptions,
    availableLanguages,
    activeFiltersCount,
    handleRefresh,
    handleSortChange,
    handleLanguageFilterChange,
    handleStatusFilterChange,
    handleFavoriteFilterToggle,
    handleToggleFavorite,
    handleResetFilters,
  };
};