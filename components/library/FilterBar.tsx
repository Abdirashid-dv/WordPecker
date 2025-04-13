import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Filter, X, ChevronDown, ChevronUp, Star } from "lucide-react-native";
import { SortOption, Language } from "@/types/wordList";
import { SORT_OPTIONS, STATUS_FILTERS } from "@/constants/libraryOptions";
import { colors } from "@/constants/colors";

interface FilterBarProps {
  sortOption: SortOption;
  onSortChange: (option: SortOption) => void;
  availableLanguages: Language[];
  onLanguageFilterChange: (languages: Language[]) => void;
  onStatusFilterChange: (statuses: ("new" | "in-progress" | "completed")[]) => void;
  onFavoriteFilterToggle: (value: boolean | undefined) => void;
  onResetFilters: () => void;
  activeFiltersCount: number;
  filterOptions: any;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  sortOption,
  onSortChange,
  availableLanguages,
  onLanguageFilterChange,
  onStatusFilterChange,
  onFavoriteFilterToggle,
  onResetFilters,
  activeFiltersCount,
  filterOptions,
}) => {
  const [showFilters, setShowFilters] = useState(false);
  const [showSortOptions, setShowSortOptions] = useState(false);
  
  const toggleFilters = () => {
    setShowFilters(!showFilters);
    if (showSortOptions) setShowSortOptions(false);
  };
  
  const toggleSortOptions = () => {
    setShowSortOptions(!showSortOptions);
    if (showFilters) setShowFilters(false);
  };
  
  const handleSortSelect = (option: SortOption) => {
    onSortChange(option);
    setShowSortOptions(false);
  };
  
  const handleLanguageSelect = (language: Language) => {
    const currentLanguages = filterOptions.language || [];
    if (currentLanguages.includes(language)) {
      onLanguageFilterChange(currentLanguages.filter(l => l !== language));
    } else {
      onLanguageFilterChange([...currentLanguages, language]);
    }
  };
  
  const handleStatusSelect = (status: "new" | "in-progress" | "completed") => {
    const currentStatuses = filterOptions.status || [];
    if (currentStatuses.includes(status)) {
      onStatusFilterChange(currentStatuses.filter(s => s !== status));
    } else {
      onStatusFilterChange([...currentStatuses, status]);
    }
  };
  
  const handleFavoriteToggle = () => {
    onFavoriteFilterToggle(filterOptions.favorite === true ? undefined : true);
  };
  
  const currentSortLabel = SORT_OPTIONS.find(option => option.value === sortOption)?.label || "Sort";
  
  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity 
          style={styles.filterButton} 
          onPress={toggleFilters}
        >
          <Filter size={18} color={activeFiltersCount > 0 ? colors.highlight : colors.text} />
          <Text style={[
            styles.filterButtonText, 
            activeFiltersCount > 0 && styles.activeFilterText
          ]}>
            Filter{activeFiltersCount > 0 ? ` (${activeFiltersCount})` : ""}
          </Text>
          {showFilters ? (
            <ChevronUp size={18} color={colors.text} />
          ) : (
            <ChevronDown size={18} color={colors.text} />
          )}
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.sortButton} 
          onPress={toggleSortOptions}
        >
          <Text style={styles.sortButtonText}>{currentSortLabel}</Text>
          {showSortOptions ? (
            <ChevronUp size={18} color={colors.text} />
          ) : (
            <ChevronDown size={18} color={colors.text} />
          )}
        </TouchableOpacity>
      </View>
      
      {showSortOptions && (
        <View style={styles.sortOptionsContainer}>
          {SORT_OPTIONS.map((option) => (
            <TouchableOpacity
              key={option.value}
              style={[
                styles.sortOption,
                sortOption === option.value && styles.selectedSortOption
              ]}
              onPress={() => handleSortSelect(option.value)}
            >
              <Text style={[
                styles.sortOptionText,
                sortOption === option.value && styles.selectedSortOptionText
              ]}>
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
      
      {showFilters && (
        <View style={styles.filtersContainer}>
          <View style={styles.filterSection}>
            <Text style={styles.filterSectionTitle}>Languages</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.filterChipsContainer}>
                {availableLanguages.map((language) => (
                  <TouchableOpacity
                    key={language}
                    style={[
                      styles.filterChip,
                      filterOptions.language?.includes(language) && styles.selectedFilterChip
                    ]}
                    onPress={() => handleLanguageSelect(language)}
                  >
                    <Text style={[
                      styles.filterChipText,
                      filterOptions.language?.includes(language) && styles.selectedFilterChipText
                    ]}>
                      {language}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>
          
          <View style={styles.filterSection}>
            <Text style={styles.filterSectionTitle}>Status</Text>
            <View style={styles.filterChipsContainer}>
              {STATUS_FILTERS.map((status) => (
                <TouchableOpacity
                  key={status.value}
                  style={[
                    styles.filterChip,
                    filterOptions.status?.includes(status.value) && styles.selectedFilterChip
                  ]}
                  onPress={() => handleStatusSelect(status.value)}
                >
                  <Text style={[
                    styles.filterChipText,
                    filterOptions.status?.includes(status.value) && styles.selectedFilterChipText
                  ]}>
                    {status.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          
          <View style={styles.filterSection}>
            <Text style={styles.filterSectionTitle}>Other</Text>
            <View style={styles.filterChipsContainer}>
              <TouchableOpacity
                style={[
                  styles.filterChip,
                  filterOptions.favorite === true && styles.selectedFilterChip
                ]}
                onPress={handleFavoriteToggle}
              >
                <Star size={14} color={filterOptions.favorite === true ? colors.highlight : colors.textSecondary} />
                <Text style={[
                  styles.filterChipText,
                  filterOptions.favorite === true && styles.selectedFilterChipText
                ]}>
                  Favorites
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          
          <TouchableOpacity 
            style={styles.resetButton} 
            onPress={onResetFilters}
          >
            <X size={14} color={colors.text} />
            <Text style={styles.resetButtonText}>Reset Filters</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    borderRadius: 8,
    backgroundColor: colors.background,
  },
  filterButtonText: {
    color: colors.text,
    marginHorizontal: 8,
    fontSize: 14,
    fontWeight: "500",
  },
  activeFilterText: {
    color: colors.highlight,
  },
  sortButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    borderRadius: 8,
    backgroundColor: colors.background,
  },
  sortButtonText: {
    color: colors.text,
    marginRight: 8,
    fontSize: 14,
    fontWeight: "500",
  },
  sortOptionsContainer: {
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  sortOption: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 4,
  },
  selectedSortOption: {
    backgroundColor: `${colors.accent}30`,
  },
  sortOptionText: {
    color: colors.text,
    fontSize: 14,
  },
  selectedSortOptionText: {
    fontWeight: "600",
    color: colors.accent,
  },
  filtersContainer: {
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  filterSection: {
    marginBottom: 16,
  },
  filterSectionTitle: {
    color: colors.textSecondary,
    fontSize: 14,
    marginBottom: 8,
    fontWeight: "500",
  },
  filterChipsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  filterChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.background,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  selectedFilterChip: {
    backgroundColor: `${colors.highlight}30`,
  },
  filterChipText: {
    color: colors.text,
    fontSize: 14,
    marginLeft: 4,
  },
  selectedFilterChipText: {
    fontWeight: "600",
    color: colors.highlight,
  },
  resetButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.border,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: "center",
    marginTop: 8,
  },
  resetButtonText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 8,
  },
});