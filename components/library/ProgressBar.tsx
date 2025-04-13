import React from "react";
import { View, StyleSheet } from "react-native";
import { colors } from "@/constants/colors";

interface ProgressBarProps {
  progress: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  // Ensure progress is between 0 and 100
  const clampedProgress = Math.min(Math.max(progress, 0), 100);
  
  // Determine color based on progress
  let progressColor = colors.primary;
  if (clampedProgress < 30) {
    progressColor = colors.accent;
  } else if (clampedProgress < 70) {
    progressColor = colors.highlight;
  }
  
  return (
    <View style={styles.container}>
      <View 
        style={[
          styles.progressBar, 
          { width: `${clampedProgress}%`, backgroundColor: progressColor }
        ]} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 8,
    backgroundColor: colors.border,
    borderRadius: 4,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    borderRadius: 4,
  },
});