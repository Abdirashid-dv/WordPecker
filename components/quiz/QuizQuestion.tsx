import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { HelpCircle, SkipForward } from "lucide-react-native";
import { QuizQuestion as QuizQuestionType } from "@/types/quiz";
import { QuestionType } from "@/types/learning";
import { colors } from "@/constants/colors";

interface QuizQuestionProps {
    question: QuizQuestionType;
    onSelectAnswer: (answerId: string) => void;
    onSkip: () => void;
}

const QuizQuestion = ({
    question,
    onSelectAnswer,
    onSkip,
}: QuizQuestionProps) => {
    // Render different question types
    const renderQuestionContent = () => {
        switch (question.type) {
            case QuestionType.FILL_IN_BLANK:
                return (
                    <View style={styles.sentenceContainer}>
                        <Text style={styles.sentenceText}>
                            {question.sentence}
                        </Text>
                    </View>
                );
            case QuestionType.MULTIPLE_CHOICE:
            default:
                return null;
        }
    };

    return (
        <View style={styles.card}>
            <View style={styles.questionHeader}>
                <Text style={styles.questionText}>{question.text}</Text>

                {question.word && (
                    <View style={styles.wordContainer}>
                        <Text style={styles.wordText}>{question.word}</Text>
                    </View>
                )}
            </View>

            {renderQuestionContent()}

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

            <View style={styles.actionsContainer}>
                <TouchableOpacity
                    style={styles.skipButton}
                    onPress={onSkip}
                    activeOpacity={0.7}
                >
                    <SkipForward size={18} color={colors.textSecondary} />
                    <Text style={styles.skipButtonText}>Skip</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.hintButton} activeOpacity={0.7}>
                    <HelpCircle size={18} color={colors.textSecondary} />
                    <Text style={styles.hintButtonText}>Hint</Text>
                </TouchableOpacity>
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
    questionHeader: {
        marginBottom: 20,
    },
    questionText: {
        fontSize: 20,
        fontWeight: "bold",
        color: colors.text,
        marginBottom: 8,
        textAlign: "center",
    },
    wordContainer: {
        backgroundColor: "rgba(33, 150, 243, 0.1)",
        borderRadius: 8,
        paddingVertical: 6,
        paddingHorizontal: 12,
        alignSelf: "center",
        marginTop: 8,
    },
    wordText: {
        fontSize: 18,
        fontWeight: "bold",
        color: colors.accent,
    },
    sentenceContainer: {
        backgroundColor: "#334155",
        borderRadius: 12,
        padding: 16,
        marginBottom: 20,
    },
    sentenceText: {
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
        alignItems: "flex-start",
        borderWidth: 1,
        borderColor: colors.border,
    },
    optionText: {
        color: colors.text,
        fontSize: 16,
    },
    actionsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
    },
    skipButton: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },
    skipButtonText: {
        color: colors.textSecondary,
        fontSize: 14,
    },
    hintButton: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },
    hintButtonText: {
        color: colors.textSecondary,
        fontSize: 14,
    },
});

export default QuizQuestion;
