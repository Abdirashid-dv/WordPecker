import React, { useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Dimensions,
} from "react-native";
import { useLearningMode } from "@/hooks/useLearningMode";
import ProgressBar from "./ProgressBar";
import QuestionCard from "./QuestionCard";
import FeedbackOverlay from "./FeedbackOverlay";
import StreakIndicator from "./StreakIndicator";
import SessionSummary from "./SessionSummary";
import { colors } from "@/constants/colors";

const LearningMode = () => {
    const {
        currentQuestion,
        progress,
        streak,
        isSessionComplete,
        feedback,
        handleSelectAnswer,
        handleNextQuestion,
        handleRestartSession,
        isLoading,
    } = useLearningMode();

    useEffect(() => {
        // This effect can be used for any initialization logic
    }, []);

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>Loading questions...</Text>
            </View>
        );
    }

    const handleViewHistory = () => {
        // Logic to view history
        console.log("View history");
    };

    if (isSessionComplete) {
        return (
            <SessionSummary
                onRestart={handleRestartSession}
                onViewHistory={handleViewHistory}
            />
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
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
                {currentQuestion && (
                    <QuestionCard
                        question={currentQuestion}
                        onSelectAnswer={handleSelectAnswer}
                    />
                )}
            </ScrollView>

            {feedback.visible && (
                <FeedbackOverlay
                    isCorrect={feedback.isCorrect}
                    message={feedback.message}
                    correctAnswer={feedback.correctAnswer}
                    onContinue={handleNextQuestion}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    header: {
        paddingHorizontal: 16,
        paddingBottom: 16,
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
});

export default LearningMode;
