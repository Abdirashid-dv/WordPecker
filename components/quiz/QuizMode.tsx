import React, { useEffect } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { useQuizMode } from "@/hooks/useQuizMode";
import QuizQuestion from "./QuizQuestion";
import QuizTimer from "./QuizTimer";
import QuizFeedback from "./QuizFeedback";
import QuizProgress from "./QuizProgress";
import QuizSummary from "./QuizSummary";
import QuizReview from "./QuizReview";
import { colors } from "@/constants/colors";

const QuizMode = () => {
    const {
        currentQuestion,
        progress,
        score,
        reviewItems,
        timer,
        isQuizComplete,
        isReviewMode,
        feedback,
        isLoading,
        settings,
        handleSelectAnswer,
        handleSkipQuestion,
        handleNextQuestion,
        handleRestartQuiz,
        handleViewReview,
        handleExitReview,
    } = useQuizMode();

    useEffect(() => {
        // This effect can be used for any initialization logic
    }, []);

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>
                    Loading quiz questions...
                </Text>
            </View>
        );
    }

    if (isReviewMode) {
        return (
            <QuizReview reviewItems={reviewItems} onExit={handleExitReview} />
        );
    }

    if (isQuizComplete) {
        return (
            <QuizSummary
                score={score}
                reviewItems={reviewItems}
                settings={settings}
                onRestart={handleRestartQuiz}
                onReview={handleViewReview}
            />
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <QuizProgress
                    current={progress.current}
                    total={progress.total}
                    score={score}
                />

                {settings.timeLimit && (
                    <QuizTimer
                        timeRemaining={timer.timeRemaining}
                        totalTime={timer.totalTime}
                    />
                )}
            </View>

            <ScrollView
                style={styles.content}
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
            >
                {currentQuestion && (
                    <QuizQuestion
                        question={currentQuestion}
                        onSelectAnswer={handleSelectAnswer}
                        onSkip={handleSkipQuestion}
                    />
                )}
            </ScrollView>

            {feedback.visible && (
                <QuizFeedback
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    header: {
        paddingHorizontal: 16,
        paddingVertical: 12,
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

export default QuizMode;
