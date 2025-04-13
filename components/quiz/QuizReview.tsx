import React from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { ArrowLeft, Info, XCircle } from "lucide-react-native";
import { QuizReview as QuizReviewType } from "@/types/quiz";
import { colors } from "@/constants/colors";

interface QuizReviewProps {
    reviewItems: QuizReviewType[];
    onExit: () => void;
}

const QuizReview = ({ reviewItems, onExit }: QuizReviewProps) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={onExit}
                    activeOpacity={0.7}
                >
                    <ArrowLeft size={24} color={colors.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Review Incorrect Answers</Text>
            </View>

            <ScrollView style={styles.content}>
                {reviewItems.map((item, index) => (
                    <View key={index} style={styles.reviewCard}>
                        <View style={styles.questionHeader}>
                            <XCircle size={20} color={colors.error} />
                            <Text style={styles.questionNumber}>
                                Question {index + 1}
                            </Text>
                        </View>

                        <Text style={styles.questionText}>{item.question}</Text>

                        <View style={styles.answerContainer}>
                            <View style={styles.answerRow}>
                                <Text style={styles.answerLabel}>
                                    Your answer:
                                </Text>
                                <Text style={styles.incorrectAnswer}>
                                    {item.userAnswer}
                                </Text>
                            </View>

                            <View style={styles.answerRow}>
                                <Text style={styles.answerLabel}>
                                    Correct answer:
                                </Text>
                                <Text style={styles.correctAnswer}>
                                    {item.correctAnswer}
                                </Text>
                            </View>
                        </View>

                        {item.explanation && (
                            <View style={styles.explanationContainer}>
                                <View style={styles.explanationHeader}>
                                    <Info size={16} color={colors.highlight} />
                                    <Text style={styles.explanationTitle}>
                                        Explanation
                                    </Text>
                                </View>
                                <Text style={styles.explanationText}>
                                    {item.explanation}
                                </Text>
                            </View>
                        )}

                        {item.timeSpent && (
                            <Text style={styles.timeSpent}>
                                Time spent: {item.timeSpent} seconds
                            </Text>
                        )}
                    </View>
                ))}
            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity
                    style={styles.doneButton}
                    onPress={onExit}
                    activeOpacity={0.8}
                >
                    <Text style={styles.doneButtonText}>Done</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    backButton: {
        marginRight: 16,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: colors.text,
    },
    content: {
        flex: 1,
        padding: 16,
    },
    reviewCard: {
        backgroundColor: colors.cardBackground,
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
    },
    questionHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
        gap: 8,
    },
    questionNumber: {
        fontSize: 16,
        fontWeight: "bold",
        color: colors.text,
    },
    questionText: {
        fontSize: 16,
        color: colors.text,
        marginBottom: 16,
        lineHeight: 22,
    },
    answerContainer: {
        backgroundColor: "#334155",
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
    },
    answerRow: {
        flexDirection: "row",
        marginBottom: 8,
        alignItems: "flex-start",
    },
    answerLabel: {
        fontSize: 14,
        color: colors.textSecondary,
        width: 100,
    },
    incorrectAnswer: {
        fontSize: 14,
        color: colors.error,
        flex: 1,
    },
    correctAnswer: {
        fontSize: 14,
        color: colors.success,
        fontWeight: "bold",
        flex: 1,
    },
    explanationContainer: {
        backgroundColor: "rgba(255, 193, 7, 0.1)",
        borderRadius: 8,
        padding: 12,
        marginBottom: 12,
    },
    explanationHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
        gap: 6,
    },
    explanationTitle: {
        fontSize: 14,
        fontWeight: "bold",
        color: colors.highlight,
    },
    explanationText: {
        fontSize: 14,
        color: colors.text,
        lineHeight: 20,
    },
    timeSpent: {
        fontSize: 12,
        color: colors.textSecondary,
        textAlign: "right",
    },
    footer: {
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: colors.border,
    },
    doneButton: {
        backgroundColor: colors.accent,
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: "center",
    },
    doneButtonText: {
        color: colors.text,
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default QuizReview;
