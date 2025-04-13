import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { colors } from "@/constants/colors";
import { ListProgress } from "@/types/wordList";
import { ProgressBar } from "@/components/library/ProgressBar";

interface ProgressStatsProps {
  progress: ListProgress;
}

export const ProgressStats: React.FC<ProgressStatsProps> = ({ progress }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Progress</Text>
      
      <View style={styles.progressBarContainer}>
        <ProgressBar progress={progress.percentage} />
        <Text style={styles.progressText}>{progress.percentage}% Complete</Text>
      </View>
      
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{progress.total}</Text>
          <Text style={styles.statLabel}>Total Words</Text>
        </View>
        
        <View style={styles.statItem}>
          <Text style={[styles.statValue, styles.masteredValue]}>
            {progress.mastered}
          </Text>
          <Text style={styles.statLabel}>Mastered</Text>
        </View>
        
        <View style={styles.statItem}>
          <Text style={[styles.statValue, styles.learningValue]}>
            {progress.learning}
          </Text>
          <Text style={styles.statLabel}>Learning</Text>
        </View>
        
        <View style={styles.statItem}>
          <Text style={[styles.statValue, styles.newValue]}>
            {progress.new}
          </Text>
          <Text style={styles.statLabel}>New</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 12,
  },
  progressBarContainer: {
    marginBottom: 16,
  },
  progressText: {
    color: colors.textSecondary,
    fontSize: 14,
    marginTop: 8,
    textAlign: "center",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 4,
  },
  masteredValue: {
    color: colors.primary,
  },
  learningValue: {
    color: colors.highlight,
  },
  newValue: {
    color: colors.accent,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
  },
});