import React, { useState } from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import { colors } from "@/constants/colors";
import { Word } from "@/types/wordList";
import { WordItem } from "./WordItem";
import { WordSortFilter } from "./WordSortFilter";
import { SortOption } from "@/constants/wordOptions";

interface WordsListProps {
  words: Word[];
  onEdit: (wordId: string, updates: Partial<Word>) => void;
  onDelete: (wordId: string) => void;
  onToggleStatus: (wordId: string) => void;
}

export const WordsList: React.FC<WordsListProps> = ({
  words,
  onEdit,
  onDelete,
  onToggleStatus,
}) => {
  const [sortOption, setSortOption] = useState<SortOption>("alphabetical-asc");
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  
  // Apply sorting and filtering
  const filteredWords = words.filter(word => {
    if (!filterStatus) return true;
    return word.status === filterStatus;
  });
  
  const sortedWords = [...filteredWords].sort((a, b) => {
    switch (sortOption) {
      case "alphabetical-asc":
        return a.term.localeCompare(b.term);
      case "alphabetical-desc":
        return b.term.localeCompare(a.term);
      case "status":
        const statusOrder = { mastered: 0, learning: 1, new: 2 };
        return statusOrder[a.status] - statusOrder[b.status];
      case "recently-reviewed":
        if (!a.lastReviewed && !b.lastReviewed) return 0;
        if (!a.lastReviewed) return 1;
        if (!b.lastReviewed) return -1;
        return b.lastReviewed.getTime() - a.lastReviewed.getTime();
      default:
        return 0;
    }
  });
  
  const renderItem = ({ item }: { item: Word }) => (
    <WordItem
      word={item}
      onEdit={onEdit}
      onDelete={onDelete}
      onToggleStatus={onToggleStatus}
    />
  );
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Words</Text>
        <Text style={styles.count}>{words.length} total</Text>
      </View>
      
      <WordSortFilter
        sortOption={sortOption}
        filterStatus={filterStatus}
        onSortChange={setSortOption}
        onFilterChange={setFilterStatus}
      />
      
      <FlatList
        data={sortedWords}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false} // Parent ScrollView handles scrolling
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No words match the current filters
          </Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.text,
  },
  count: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  listContent: {
    paddingTop: 8,
  },
  emptyText: {
    color: colors.textSecondary,
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
    fontStyle: "italic",
  },
});