import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Question } from "@/types/learning";
import { colors } from "@/constants/colors";

interface QuestionCardProps {
    question: Question;
    onSelectAnswer: (answerId: string) => void;
}

const QuestionCard = ({ question, onSelectAnswer }: QuestionCardProps) => {
    return (
        <View style={styles.card}>
            <Text style={styles.questionText}>{question.text}</Text>

            {question.imageUrl && (
                <View style={styles.imageContainer}>
                    {/* Image would go here if we had actual images */}
                    <View style={styles.imagePlaceholder}>
                        <Text style={styles.imagePlaceholderText}>Image</Text>
                    </View>
                </View>
            )}

            <View style={styles.optionsContainer}>
                {question.options.map((option) => (
                    <TouchableOpacity
                        key={option.id}
                        style={styles.optionButton}
                        onPress={() => onSelectAnswer(option.id)}
                        activeOpacity={0.7}
                    >
                        <Text style={styles.optionText}>{option.text}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.cardBackground,
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    questionText: {
        fontSize: 20,
        fontWeight: "bold",
        color: colors.text,
        marginBottom: 20,
        textAlign: "center",
    },
    imageContainer: {
        alignItems: "center",
        marginBottom: 20,
    },
    imagePlaceholder: {
        width: "100%",
        height: 150,
        backgroundColor: "#334155",
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
    },
    imagePlaceholderText: {
        color: colors.textSecondary,
        fontSize: 16,
    },
    optionsContainer: {
        gap: 12,
    },
    optionButton: {
        backgroundColor: "#334155",
        borderRadius: 12,
        padding: 16,
        alignItems: "flex-start",
        borderWidth: 1,
        borderColor: colors.border,
    },
    optionText: {
        color: colors.text,
        fontSize: 16,
    },
});

export default QuestionCard;
