import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Filter, ArrowDownAZ, ArrowUpAZ, Clock, CheckCircle } from "lucide-react-native";
import { colors } from "@/constants/colors";
import { SortOption, SORT_OPTIONS, STATUS_FILTERS } from "@/constants/wordOptions";

interface WordSortFilterProps {
  sortOption: SortOption;
  filterStatus: string | null;
  onSortChange: (option: SortOption) => void;
  onFilterChange: (status: string | null) => void;
}

export const WordSortFilter: React.FC<WordSortFilterProps> = ({
  sortOption,
  filterStatus,
  onSortChange,
  onFilterChange,
}) => {
  const getSortIcon = () => {
    switch (sortOption) {
      case "alphabetical-asc":
        return <ArrowDownAZ size={18} color={colors.text} />;
      case "alphabetical-desc":
        return <ArrowUpAZ size={18} color={colors.text} />;
      case "status":
        return <CheckCircle size={18} color={colors.text} />;
      case "recently-reviewed":
        return <Clock size={18} color={colors.text} />;
      default:
        return <ArrowDownAZ size={18} color={colors.text} />;
    }
  };
  
  const getSortLabel = () => {
    return SORT_OPTIONS.find(option => option.value === sortOption)?.label || "Sort";
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.sortContainer}>
        <Text style={styles.label}>Sort by:</Text>
        <View style={styles.sortOptions}>
          {SORT_OPTIONS.map((option) => (
            <TouchableOpacity
              key={option.value}
              style={[
                styles.sortOption,
                sortOption === option.value && styles.activeSortOption
              ]}
              onPress={() => onSortChange(option.value)}
            >
              {option.value === sortOption && getSortIcon()}
              <Text style={[
                styles.sortOptionText,
                sortOption === option.value && styles.activeSortOptionText
              ]}>
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      
      <View style={styles.filterContainer}>
        <View style={styles.filterHeader}>
          <Filter size={18} color={colors.text} />
          <Text style={styles.label}>Filter by status:</Text>
        </View>
        
        <View style={styles.filterOptions}>
          <TouchableOpacity
            style={[
              styles.filterOption,
              filterStatus === null && styles.activeFilterOption
            ]}
            onPress={() => onFilterChange(null)}
          >
            <Text style={[
              styles.filterOptionText,
              filterStatus === null && styles.activeFilterOptionText
            ]}>
              All
            </Text>
          </TouchableOpacity>
          
          {STATUS_FILTERS.map((status) => (
            <TouchableOpacity
              key={status.value}
              style={[
                styles.filterOption,
                filterStatus === status.value && styles.activeFilterOption
              ]}
              onPress={() => onFilterChange(status.value)}
            >
              <Text style={[
                styles.filterOptionText,
                filterStatus === status.value && styles.activeFilterOptionText
              ]}>
                {status.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  sortContainer: {
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 8,
    marginLeft: 4,
  },
  sortOptions: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  sortOption: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.cardBackground,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  activeSortOption: {
    backgroundColor: `${colors.accent}30`,
  },
  sortOptionText: {
    color: colors.text,
    fontSize: 14,
  },
  activeSortOptionText: {
    color: colors.accent,
    fontWeight: "600",
  },
  filterContainer: {
    marginTop: 4,
  },
  filterHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  filterOptions: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  filterOption: {
    backgroundColor: colors.cardBackground,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  activeFilterOption: {
    backgroundColor: `${colors.highlight}30`,
  },
  filterOptionText: {
    color: colors.text,
    fontSize: 14,
  },
  activeFilterOptionText: {
    color: colors.highlight,
    fontWeight: "600",
  },
});