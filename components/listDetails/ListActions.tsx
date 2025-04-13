import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { BookOpen, Brain, Plus, Camera } from "lucide-react-native";
import { colors } from "@/constants/colors";

interface ListActionsProps {
  onStartLearning: () => void;
  onStartQuiz: () => void;
  onAddWord: () => void;
  onCaptureWords: () => void;
}

export const ListActions: React.FC<ListActionsProps> = ({
  onStartLearning,
  onStartQuiz,
  onAddWord,
  onCaptureWords,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Actions</Text>
      
      <View style={styles.buttonsContainer}>
        <TouchableOpacity 
          style={[styles.button, styles.learnButton]} 
          onPress={onStartLearning}
        >
          <BookOpen size={24} color={colors.text} />
          <Text style={styles.buttonText}>Start Learning</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, styles.quizButton]} 
          onPress={onStartQuiz}
        >
          <Brain size={24} color={colors.text} />
          <Text style={styles.buttonText}>Start Quiz</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.secondaryButtonsContainer}>
        <TouchableOpacity 
          style={styles.addWordButton} 
          onPress={onAddWord}
        >
          <Plus size={20} color={colors.text} />
          <Text style={styles.addWordText}>Add New Word</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.captureButton} 
          onPress={onCaptureWords}
        >
          <Camera size={20} color={colors.text} />
          <Text style={styles.addWordText}>Capture Words</Text>
        </TouchableOpacity>
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
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 4,
  },
  learnButton: {
    backgroundColor: colors.primary,
  },
  quizButton: {
    backgroundColor: colors.accent,
  },
  buttonText: {
    color: colors.text,
    fontWeight: "600",
    fontSize: 16,
    marginLeft: 8,
  },
  secondaryButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  addWordButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.border,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    flex: 1,
    marginRight: 6,
  },
  captureButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.highlight,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    flex: 1,
    marginLeft: 6,
  },
  addWordText: {
    color: colors.text,
    fontWeight: "500",
    fontSize: 16,
    marginLeft: 8,
  },
});