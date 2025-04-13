import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Plus, BookOpen } from "lucide-react-native";
import { colors } from "@/constants/colors";

interface EmptyWordsListProps {
    onAddWord: () => void;
}

export const EmptyWordsList: React.FC<EmptyWordsListProps> = ({
    onAddWord,
}) => {
    return (
        <View style={styles.container}>
            <View style={styles.iconContainer}>
                <BookOpen size={48} color={colors.textSecondary} />
            </View>
            <Text style={styles.title}>No Words Yet</Text>
            <Text style={styles.description}>
                This list doesn't have any words yet. Add your first word to
                start learning!
            </Text>
            <TouchableOpacity style={styles.button} onPress={onAddWord}>
                <Plus size={20} color={colors.text} />
                <Text style={styles.buttonText}>Add First Word</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.cardBackground,
        borderRadius: 16,
        padding: 24,
        alignItems: "center",
        justifyContent: "center",
    },
    iconContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: colors.background,
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
