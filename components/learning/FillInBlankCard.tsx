import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Question } from "@/types/learning";
import { colors } from "@/constants/colors";

interface FillInBlankCardProps {
    question: Question;
    onSelectAnswer: (answerId: string) => void;
}

const FillInBlankCard = ({
    question,
    onSelectAnswer,
}: FillInBlankCardProps) => {
    // Replace the blank in the statement with an underline
    const formattedStatement = question.statement?.replace(
        "___",
        "________________"
    );

    return (
        <View style={styles.card}>
            <Text style={styles.questionText}>{question.text}</Text>

            <View style={styles.statementContainer}>
                <Text style={styles.statementText}>{formattedStatement}</Text>
            </View>

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
    statementContainer: {
        backgroundColor: "#334155",
        borderRadius: 12,
        padding: 16,
        marginBottom: 24,
    },
    statementText: {
        fontSize: 18,
        color: colors.text,
        textAlign: "center",
        lineHeight: 26,
    },
    optionsContainer: {
        gap: 12,
    },
    optionButton: {
        backgroundColor: "#334155",
        borderRadius: 12,
        padding: 16,
        alignItems: "center",
        borderWidth: 1,
        borderColor: colors.border,
    },
    optionText: {
        color: colors.text,
        fontSize: 16,
    },
});

export default FillInBlankCard;
