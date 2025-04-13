import React from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    Share,
} from "react-native";
import {
    Trophy,
    BarChart2,
    Clock,
    Share2,
    RefreshCw,
    List,
} from "lucide-react-native";
import { QuizScore, QuizReview, QuizSettings } from "@/types/quiz";
import {
    formatTime,
    generateScoreFeedback,
    generateSuggestions,
    generateShareMessage,
} from "@/utils/quizUtils";
import { colors } from "@/constants/colors";

interface QuizSummaryProps {
    score: QuizScore;
    reviewItems: QuizReview[];
    settings: QuizSettings;
    onRestart: () => void;
    onReview: () => void;
}

const QuizSummary = ({
    score,
    reviewItems,
    settings,
    onRestart,
    onReview,
}: QuizSummaryProps) => {
    const feedback = generateScoreFeedback(score.percentage);
    const suggestions = generateSuggestions(
        score,
        reviewItems,
        settings.categories
    );

    const handleShare = async () => {
        try {
            const shareMessage = generateShareMessage(
                score,
                settings.difficulty,
                settings.categories
            );

            await Share.share({
                message: shareMessage,
            });
        } catch (error) {
            console.error("Error sharing quiz results:", error);
        }
    };

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
        >
            <View style={styles.card}>
                <View style={styles.trophyContainer}>
                    <Trophy size={64} color={colors.highlight} />
                </View>

                <Text style={styles.title}>Quiz Complete!</Text>
                <Text style={styles.feedback}>{feedback}</Text>

                <View style={styles.statsContainer}>
                    <View style={styles.statItem}>
                        <Text style={styles.statValue}>{score.correct}</Text>
                        <Text style={styles.statLabel}>Correct</Text>
                    </View>

                    <View style={styles.statItem}>
                        <Text style={styles.statValue}>{score.incorrect}</Text>
                        <Text style={styles.statLabel}>Incorrect</Text>
                    </View>

                    <View style={styles.statItem}>
                        <Text style={styles.statValue}>
                            {score.percentage}%
                        </Text>
                        <Text style={styles.statLabel}>Score</Text>
                    </View>
                </View>

                <View style={styles.timeContainer}>
                    <Clock size={20} color={colors.textSecondary} />
                    <Text style={styles.timeText}>
                        Total time: {formatTime(score.timeSpent)}
                    </Text>
                </View>

                {reviewItems.length > 0 && (
                    <View style={styles.reviewSummary}>
                        <Text style={styles.reviewTitle}>
                            {reviewItems.length}{" "}
                            {reviewItems.length === 1
                                ? "question"
                                : "questions"}{" "}
                            to review
                        </Text>
                    </View>
                )}

                {suggestions.length > 0 && (
                    <View style={styles.suggestionsContainer}>
                        <Text style={styles.suggestionsTitle}>
                            Suggestions for Improvement
                        </Text>
                        {suggestions.map((suggestion, index) => (
                            <View key={index} style={styles.suggestionItem}>
                                <Text style={styles.suggestionText}>
                                    • {suggestion}
                                </Text>
                            </View>
                        ))}
                    </View>
                )}

                <View style={styles.actionsContainer}>
                    {reviewItems.length > 0 && (
                        <TouchableOpacity
                            style={styles.reviewButton}
                            onPress={onReview}
                            activeOpacity={0.8}
                        >
                            <List size={20} color={colors.text} />
                            <Text style={styles.reviewButtonText}>
                                Review Incorrect
                            </Text>
                        </TouchableOpacity>
                    )}

                    <TouchableOpacity
                        style={styles.restartButton}
                        onPress={onRestart}
                        activeOpacity={0.8}
                    >
                        <RefreshCw size={20} color={colors.text} />
                        <Text style={styles.restartButtonText}>New Quiz</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.shareButton}
                        onPress={handleShare}
                        activeOpacity={0.8}
                    >
                        <Share2 size={20} color={colors.text} />
                        <Text style={styles.shareButtonText}>
                            Share Results
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    contentContainer: {
        padding: 20,
        alignItems: "center",
    },
    card: {
        backgroundColor: colors.cardBackground,
        borderRadius: 16,
        padding: 24,
        width: "100%",
        maxWidth: 400,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5,
    },
    trophyContainer: {
        marginBottom: 24,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: colors.text,
        marginBottom: 8,
        textAlign: "center",
    },
    feedback: {
        fontSize: 16,
        color: colors.highlight,
        marginBottom: 24,
        textAlign: "center",
    },
    statsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        marginBottom: 24,
    },
    statItem: {
        alignItems: "center",
        flex: 1,
    },
    statValue: {
        fontSize: 28,
        fontWeight: "bold",
        color: colors.accent,
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 14,
        color: colors.textSecondary,
    },
    timeContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 24,
        backgroundColor: "rgba(33, 150, 243, 0.1)",
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
        gap: 8,
    },
    timeText: {
        color: colors.text,
        fontSize: 14,
    },
    reviewSummary: {
        backgroundColor: "rgba(255, 193, 7, 0.1)",
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
        marginBottom: 24,
    },
    reviewTitle: {
        color: colors.highlight,
        fontSize: 14,
        fontWeight: "bold",
        textAlign: "center",
    },
    suggestionsContainer: {
        width: "100%",
        backgroundColor: "rgba(76, 175, 80, 0.1)",
        borderRadius: 12,
        padding: 16,
        marginBottom: 24,
    },
    suggestionsTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: colors.primary,
        marginBottom: 12,
    },
    suggestionItem: {
        marginBottom: 8,
    },
    suggestionText: {
        color: colors.text,
        fontSize: 14,
        lineHeight: 20,
    },
    actionsContainer: {
        width: "100%",
        gap: 12,
    },
    reviewButton: {
        backgroundColor: colors.accent,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        gap: 8,
    },
    reviewButtonText: {
        color: colors.text,
        fontSize: 16,
        fontWeight: "bold",
    },
    restartButton: {
        backgroundColor: colors.primary,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        gap: 8,
    },
    restartButtonText: {
        color: colors.text,
        fontSize: 16,
        fontWeight: "bold",
    },
    shareButton: {
        backgroundColor: "#334155",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        gap: 8,
    },
    shareButtonText: {
        color: colors.text,
        fontSize: 16,
    },
});

export default QuizSummary;
