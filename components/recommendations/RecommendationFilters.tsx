import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { COLORS } from '@/constants/colors';
import { ContentGenre, ContentLength, ContentType, LanguageLevel } from '@/types/recommendation';
import { useRecommendations } from '@/hooks/useRecommendations';
import { 
  CONTENT_TYPE_LABELS, 
  CONTENT_GENRE_LABELS, 
  LANGUAGE_LEVEL_DESCRIPTIONS,
  CONTENT_LENGTH_LABELS
} from '@/constants/recommendationConstants';
import { BookOpen, Newspaper, Headphones, Video, X, Filter } from 'lucide-react-native';

interface RecommendationFiltersProps {
  style?: any;
  onClose?: () => void;
}

export const RecommendationFilters: React.FC<RecommendationFiltersProps> = ({
  style,
  onClose,
}) => {
  const { filters, actions } = useRecommendations();
  const [expanded, setExpanded] = useState(false);
  
  // Toggle filter for content type
  const toggleTypeFilter = (type: ContentType) => {
    actions.toggleFilter('types', type);
  };
  
  // Toggle filter for genre
  const toggleGenreFilter = (genre: ContentGenre) => {
    actions.toggleFilter('genres', genre);
  };
  
  // Toggle filter for language level
  const toggleLevelFilter = (level: LanguageLevel) => {
    actions.toggleFilter('levels', level);
  };
  
  // Toggle filter for content length
  const toggleLengthFilter = (length: ContentLength) => {
    actions.toggleFilter('lengths', length);
  };
  
  // Reset all filters
  const handleResetFilters = () => {
    actions.resetFilters();
  };
  
  // Get icon for content type
  const getTypeIcon = (type: ContentType) => {
    const iconSize = 16;
    const isSelected = filters.types.includes(type);
    const iconColor = isSelected ? COLORS.text : COLORS.textSecondary;
    
    switch (type) {
      case ContentType.BOOK:
        return <BookOpen size={iconSize} color={iconColor} />;
      case ContentType.ARTICLE:
        return <Newspaper size={iconSize} color={iconColor} />;
      case ContentType.PODCAST:
        return <Headphones size={iconSize} color={iconColor} />;
      case ContentType.VIDEO:
        return <Video size={iconSize} color={iconColor} />;
      default:
        return null;
    }
  };
  
  // Count active filters
  const countActiveFilters = (): number => {
    let count = 0;
    
    if (filters.genres.length > 0) count += filters.genres.length;
    if (filters.levels.length > 0) count += filters.levels.length;
    if (filters.lengths.length > 0) count += filters.lengths.length;
    
    return count;
  };
  
  return (
    <View style={[styles.container, style]}>
      <View style={styles.header}>
        <View style={styles.headerTitleContainer}>
          <Filter size={18} color={COLORS.text} />
          <Text style={styles.headerTitle}>Filters</Text>
          {countActiveFilters() > 0 && (
            <View style={styles.filterCountBadge}>
              <Text style={styles.filterCountText}>{countActiveFilters()}</Text>
            </View>
          )}
        </View>
        
        <View style={styles.headerActions}>
          <Pressable 
            style={styles.resetButton} 
            onPress={handleResetFilters}
            hitSlop={10}
          >
            <Text style={styles.resetButtonText}>Reset</Text>
          </Pressable>
          
          {onClose && (
            <Pressable 
              style={styles.closeButton} 
              onPress={onClose}
              hitSlop={10}
            >
              <X size={20} color={COLORS.textSecondary} />
            </Pressable>
          )}
        </View>
      </View>
      
      {/* Content Type Filters */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Content Type</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.typeFiltersContainer}
        >
          {Object.values(ContentType).map((type) => (
            <Pressable
              key={type}
              style={[
                styles.typeFilterButton,
                filters.types.includes(type) && styles.typeFilterButtonActive
              ]}
              onPress={() => toggleTypeFilter(type)}
            >
              {getTypeIcon(type)}
              <Text 
                style={[
                  styles.typeFilterText,
                  filters.types.includes(type) && styles.typeFilterTextActive
                ]}
              >
                {CONTENT_TYPE_LABELS[type]}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>
      
      {/* Expanded Filters */}
      {expanded && (
        <>
          {/* Language Level Filters */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Language Level</Text>
            <View style={styles.levelFiltersContainer}>
              {Object.values(LanguageLevel).map((level) => (
                <Pressable
                  key={level}
                  style={[
                    styles.levelFilterButton,
                    filters.levels.includes(level) && styles.levelFilterButtonActive
                  ]}
                  onPress={() => toggleLevelFilter(level)}
                >
                  <Text 
                    style={[
                      styles.levelFilterText,
                      filters.levels.includes(level) && styles.levelFilterTextActive
                    ]}
                  >
                    {level}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
          
          {/* Genre Filters */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Genre</Text>
            <View style={styles.genreFiltersContainer}>
              {Object.values(ContentGenre).map((genre) => (
                <Pressable
                  key={genre}
                  style={[
                    styles.genreFilterButton,
                    filters.genres.includes(genre) && styles.genreFilterButtonActive
                  ]}
                  onPress={() => toggleGenreFilter(genre)}
                >
                  <Text 
                    style={[
                      styles.genreFilterText,
                      filters.genres.includes(genre) && styles.genreFilterTextActive
                    ]}
                  >
                    {CONTENT_GENRE_LABELS[genre]}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
          
          {/* Length Filters */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Length</Text>
            <View style={styles.lengthFiltersContainer}>
              {Object.values(ContentLength).map((length) => (
                <Pressable
                  key={length}
                  style={[
                    styles.lengthFilterButton,
                    filters.lengths.includes(length) && styles.lengthFilterButtonActive
                  ]}
                  onPress={() => toggleLengthFilter(length)}
                >
                  <Text 
                    style={[
                      styles.lengthFilterText,
                      filters.lengths.includes(length) && styles.lengthFilterTextActive
                    ]}
                  >
                    {CONTENT_LENGTH_LABELS[length]}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        </>
      )}
      
      {/* Expand/Collapse Button */}
      <Pressable 
        style={styles.expandButton}
        onPress={() => setExpanded(!expanded)}
      >
        <Text style={styles.expandButtonText}>
          {expanded ? 'Show Less' : 'Show More Filters'}
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginLeft: 8,
  },
  filterCountBadge: {
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  filterCountText: {
    color: COLORS.text,
    fontSize: 12,
    fontWeight: 'bold',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  resetButton: {
    marginRight: 16,
  },
  resetButtonText: {
    color: COLORS.accent,
    fontSize: 14,
  },
  closeButton: {
    padding: 4,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 12,
  },
  typeFiltersContainer: {
    paddingRight: 16,
  },
  typeFilterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  typeFilterButtonActive: {
    backgroundColor: COLORS.primary,
  },
  typeFilterText: {
    color: COLORS.textSecondary,
    fontSize: 14,
    marginLeft: 6,
  },
  typeFilterTextActive: {
    color: COLORS.text,
    fontWeight: '500',
  },
  levelFiltersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  levelFilterButton: {
    backgroundColor: COLORS.background,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  levelFilterButtonActive: {
    backgroundColor: COLORS.accent,
  },
  levelFilterText: {
    color: COLORS.textSecondary,
    fontSize: 14,
  },
  levelFilterTextActive: {
    color: COLORS.text,
    fontWeight: '500',
  },
  genreFiltersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  genreFilterButton: {
    backgroundColor: COLORS.background,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  genreFilterButtonActive: {
    backgroundColor: COLORS.highlight,
  },
  genreFilterText: {
    color: COLORS.textSecondary,
    fontSize: 14,
  },
  genreFilterTextActive: {
    color: COLORS.background,
    fontWeight: '500',
  },
  lengthFiltersContainer: {
    flexDirection: 'row',
  },
  lengthFilterButton: {
    backgroundColor: COLORS.background,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  lengthFilterButtonActive: {
    backgroundColor: COLORS.primary,
  },
  lengthFilterText: {
    color: COLORS.textSecondary,
    fontSize: 14,
  },
  lengthFilterTextActive: {
    color: COLORS.text,
    fontWeight: '500',
  },
  expandButton: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  expandButtonText: {
    color: COLORS.accent,
    fontSize: 14,
    fontWeight: '500',
  },
});