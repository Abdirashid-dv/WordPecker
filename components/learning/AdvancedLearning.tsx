import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import { useLearningMode } from "@/hooks/useLearningMode";
import ProgressBar from "./ProgressBar";
import QuestionCard from "./QuestionCard";
import TrueFalseCard from "./TrueFalseCard";
import FillInBlankCard from "./FillInBlankCard";
import MatchingCard from "./MatchingCard";
import FeedbackOverlay from "./FeedbackOverlay";
import StreakIndicator from "./StreakIndicator";
import SessionSummary from "./SessionSummary";
import ExerciseTypeSelector from "./ExerciseTypeSelector";
import HistoryButton from "./HistoryButton";
import { colors } from "@/constants/colors";
import { QuestionType } from "@/types/learning";

const AdvancedLearning = () => {
    const {
        currentQuestion,
        progress,
        streak,
        isSessionComplete,
        feedback,
        isLoading,
        settings,
        handleSelectAnswer,
        handleNextQuestion,
        handleRestartSession,
    } = useLearningMode();

    const [showHistory, setShowHistory] = useState(false);

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>Loading questions...</Text>
            </View>
        );
    }

    if (showHistory) {
        return <SessionHistory onClose={() => setShowHistory(false)} />;
    }

    if (isSessionComplete) {
        return (
            <SessionSummary
                onRestart={handleRestartSession}
                onViewHistory={() => setShowHistory(true)}
            />
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.topBar}>
                    <HistoryButton onPress={() => setShowHistory(true)} />
                    <Text style={styles.exerciseTypeText}>
                        {getExerciseTypeLabel(currentQuestion?.type)}
                    </Text>
                </View>

                <ProgressBar
                    current={progress.current}
                    total={progress.total}
                />

                <Text style={styles.progressText}>
                    Question {progress.current} of {progress.total}
                </Text>

                <StreakIndicator streak={streak.current} />
            </View>

            <ScrollView
                style={styles.content}
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
            >
                {currentQuestion &&
                    renderQuestionByType(currentQuestion, handleSelectAnswer)}
            </ScrollView>

            {feedback.visible && (
                <FeedbackOverlay
                    isCorrect={feedback.isCorrect}
                    message={feedback.message}
                    correctAnswer={feedback.correctAnswer}
                    explanation={feedback.explanation}
                    onContinue={handleNextQuestion}
                    showExplanation={settings.showExplanations}
                />
            )}
        </View>
    );
};

// Helper function to render the appropriate question card based on type
const renderQuestionByType = (question, onSelectAnswer) => {
    switch (question.type) {
        case QuestionType.MULTIPLE_CHOICE:
            return (
                <QuestionCard
                    question={question}
                    onSelectAnswer={onSelectAnswer}
                />
            );
        case QuestionType.TRUE_FALSE:
            return (
                <TrueFalseCard
                    question={question}
                    onSelectAnswer={onSelectAnswer}
                />
            );
        case QuestionType.FILL_IN_BLANK:
            return (
                <FillInBlankCard
                    question={question}
                    onSelectAnswer={onSelectAnswer}
                />
            );
        case QuestionType.MATCHING:
            return (
                <MatchingCard
                    question={question}
                    onSelectAnswer={onSelectAnswer}
                />
            );
        default:
            return (
                <QuestionCard
                    question={question}
                    onSelectAnswer={onSelectAnswer}
                />
            );
    }
};

// Helper function to get a readable label for the exercise type
const getExerciseTypeLabel = (type?: QuestionType): string => {
    switch (type) {
        case QuestionType.MULTIPLE_CHOICE:
            return "Multiple Choice";
        case QuestionType.TRUE_FALSE:
            return "True or False";
        case QuestionType.FILL_IN_BLANK:
            return "Fill in the Blank";
        case QuestionType.MATCHING:
            return "Matching";
        default:
            return "Question";
    }
};

// Placeholder for SessionHistory component
const SessionHistory = ({ onClose }) => (
    <View style={styles.historyContainer}>
        <View style={styles.historyHeader}>
            <Text style={styles.historyTitle}>Learning History</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
        </View>
        <Text style={styles.historyText}>
            Your learning history will be displayed here.
        </Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    header: {
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
    topBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 12,
    },
    exerciseTypeText: {
        color: colors.accent,
        fontSize: 16,
        fontWeight: "bold",
    },
    progressText: {
        color: colors.textSecondary,
        fontSize: 14,
        textAlign: "center",
        marginTop: 8,
        marginBottom: 8,
    },
    content: {
        flex: 1,
    },
    contentContainer: {
        paddingHorizontal: 16,
        paddingBottom: 24,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    loadingText: {
        color: colors.text,
        fontSize: 16,
    },
    historyContainer: {
        flex: 1,
        padding: 16,
        backgroundColor: colors.background,
    },
    historyHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },
    historyTitle: {
        fontSize: 24,
        fontWeight: "bold",
        color: colors.text,
    },
    closeButton: {
        backgroundColor: colors.border,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
    },
    closeButtonText: {
        color: colors.text,
        fontWeight: "bold",
    },
    historyText: {
        color: colors.text,
        fontSize: 16,
        textAlign: "center",
        marginTop: 20,
    },
});

export default AdvancedLearning;
