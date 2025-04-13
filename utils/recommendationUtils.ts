import { ContentGenre, ContentLength, ContentType, LanguageLevel, RecommendationFilters, RecommendationItem, UserPreferences } from "@/types/recommendation";

/**
 * Filter recommendations based on user filters
 */
export const filterRecommendations = (
  recommendations: RecommendationItem[],
  filters: RecommendationFilters
): RecommendationItem[] => {
  return recommendations.filter(item => {
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
};

/**
 * Get featured recommendations
 */
export const getFeaturedRecommendations = (
  recommendations: RecommendationItem[]
): RecommendationItem[] => {
  return recommendations.filter(item => item.isFeatured);
};

/**
 * Get new recommendations (added in the last 7 days)
 */
export const getNewRecommendations = (
  recommendations: RecommendationItem[]
): RecommendationItem[] => {
  return recommendations.filter(item => item.isNew);
};

/**
 * Get personalized recommendations based on user preferences
 */
export const getPersonalizedRecommendations = (
  recommendations: RecommendationItem[],
  userPreferences: UserPreferences
): RecommendationItem[] => {
  // First, get recommendations that match the user's preferred level
  const levelMatches = recommendations.filter(item => {
    // Include items at the user's level and one level below and above
    const levelIndex = Object.values(LanguageLevel).indexOf(item.level);
    const preferredLevelIndex = Object.values(LanguageLevel).indexOf(userPreferences.preferredLevel);
    
    return Math.abs(levelIndex - preferredLevelIndex) <= 1;
  });
  
  // Then, score each recommendation based on how well it matches preferences
  const scoredRecommendations = levelMatches.map(item => {
    let score = 0;
    
    // Preferred genres
    if (userPreferences.preferredGenres.includes(item.genre)) {
      score += 2;
    }
    
    // Preferred content types
    if (userPreferences.preferredTypes.includes(item.type)) {
      score += 2;
    }
    
    // Preferred length
    if (item.length === userPreferences.preferredLength) {
      score += 1;
    }
    
    // Boost for featured items
    if (item.isFeatured) {
      score += 1;
    }
    
    // Boost for new items
    if (item.isNew) {
      score += 1;
    }
    
    // Boost for highly rated items
    if (item.rating >= 4.5) {
      score += 1;
    }
    
    return { item, score };
  });
  
  // Sort by score (highest first) and return the items
  return scoredRecommendations
    .sort((a, b) => b.score - a.score)
    .map(scored => scored.item);
};

/**
 * Get saved recommendations
 */
export const getSavedRecommendations = (
  recommendations: RecommendationItem[],
  savedItemIds: string[]
): RecommendationItem[] => {
  return recommendations.filter(item => savedItemIds.includes(item.id));
};

/**
 * Get language level label
 */
export const getLanguageLevelLabel = (level: LanguageLevel): string => {
  switch (level) {
    case LanguageLevel.A1:
      return 'Beginner (A1)';
    case LanguageLevel.A2:
      return 'Elementary (A2)';
    case LanguageLevel.B1:
      return 'Intermediate (B1)';
    case LanguageLevel.B2:
      return 'Upper Intermediate (B2)';
    case LanguageLevel.C1:
      return 'Advanced (C1)';
    case LanguageLevel.C2:
      return 'Proficient (C2)';
    default:
      return 'Unknown Level';
  }
};

/**
 * Get content type label
 */
export const getContentTypeLabel = (type: ContentType): string => {
  switch (type) {
    case ContentType.BOOK:
      return 'Book';
    case ContentType.ARTICLE:
      return 'Article';
    case ContentType.PODCAST:
      return 'Podcast';
    case ContentType.VIDEO:
      return 'Video';
    default:
      return 'Unknown Type';
  }
};

/**
 * Get content length label
 */
export const getContentLengthLabel = (length: ContentLength): string => {
  switch (length) {
    case ContentLength.SHORT:
      return 'Short';
    case ContentLength.MEDIUM:
      return 'Medium';
    case ContentLength.LONG:
      return 'Long';
    default:
      return 'Unknown Length';
  }
};

/**
 * Format date string to relative time (e.g., "2 days ago")
 */
export const formatRelativeDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) {
    return 'Today';
  } else if (diffDays === 1) {
    return 'Yesterday';
  } else if (diffDays < 7) {
    return `${diffDays} days ago`;
  } else if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
  } else if (diffDays < 365) {
    const months = Math.floor(diffDays / 30);
    return `${months} ${months === 1 ? 'month' : 'months'} ago`;
  } else {
    const years = Math.floor(diffDays / 365);
    return `${years} ${years === 1 ? 'year' : 'years'} ago`;
  }
};