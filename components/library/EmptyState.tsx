import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { BookOpen, Plus } from "lucide-react-native";
import { colors } from "@/constants/colors";

interface EmptyStateProps {
  onCreateList?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ onCreateList }) => {
  const router = useRouter();
  
  const handleCreateList = () => {
    if (onCreateList) {
      onCreateList();
    } else {
      router.push("/create-list");
    }
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <BookOpen size={48} color={colors.textSecondary} />
      </View>
      <Text style={styles.title}>No Word Lists Found</Text>
      <Text style={styles.description}>
        You don't have any word lists yet. Create your first list to start learning!
      </Text>
      <TouchableOpacity style={styles.button} onPress={handleCreateList}>
        <Plus size={20} color={colors.text} />
        <Text style={styles.buttonText}>Create New List</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.cardBackground,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: "center",
    marginBottom: 24,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
});