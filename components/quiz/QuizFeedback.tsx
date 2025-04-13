import React, { useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { CheckCircle, XCircle, Info } from "lucide-react-native";
import { colors } from "@/constants/colors";

interface QuizFeedbackProps {
    isCorrect: boolean;
    message: string;
    correctAnswer?: string;
    explanation?: string;
    onContinue: () => void;
    showExplanation?: boolean;
}

const QuizFeedback = ({
    isCorrect,
    message,
    correctAnswer,
    explanation,
    onContinue,
    showExplanation = true,
}: QuizFeedbackProps) => {
    return (
        <View style={styles.overlay}>
            <View
                style={[
                    styles.feedbackCard,
                    isCorrect ? styles.correctCard : styles.incorrectCard,
                ]}
            >
                <View style={styles.iconContainer}>
                    {isCorrect ? (
                        <CheckCircle size={48} color={colors.success} />
                    ) : (
                        <XCircle size={48} color={colors.error} />
                    )}
                </View>

                <Text style={styles.feedbackMessage}>{message}</Text>

                {!isCorrect && correctAnswer && (
                    <Text style={styles.correctAnswerText}>
                        Correct answer: {correctAnswer}
                    </Text>
                )}

                {showExplanation && explanation && (
                    <ScrollView style={styles.explanationScrollView}>
                        <View style={styles.explanationContainer}>
                            <View style={styles.explanationHeader}>
                                <Info size={20} color={colors.highlight} />
                                <Text style={styles.explanationTitle}>
                                    Explanation
                                </Text>
                            </View>
                            <Text style={styles.explanationText}>
                                {explanation}
                            </Text>
                        </View>
                    </ScrollView>
                )}

                <TouchableOpacity
                    style={[
                        styles.continueButton,
                        isCorrect
                            ? styles.correctButton
                            : styles.incorrectButton,
                    ]}
                    onPress={onContinue}
                    activeOpacity={0.8}
                >
                    <Text style={styles.continueButtonText}>Continue</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    overlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    feedbackCard: {
        width: "100%",
        maxWidth: 340,
        maxHeight: "80%",
        borderRadius: 16,
        padding: 24,
        alignItems: "center",
    },
    correctCard: {
        backgroundColor: "rgba(76, 175, 80, 0.15)",
        borderWidth: 1,
        borderColor: colors.success,
    },
    incorrectCard: {
        backgroundColor: "rgba(255, 0, 0, 0.15)",
        borderWidth: 1,
        borderColor: colors.error,
    },
    iconContainer: {
        marginBottom: 16,
    },
    feedbackMessage: {
        fontSize: 20,
        fontWeight: "bold",
        color: colors.text,
        textAlign: "center",
        marginBottom: 16,
    },
    correctAnswerText: {
        fontSize: 16,
        color: colors.text,
        textAlign: "center",
        marginBottom: 16,
    },
    explanationScrollView: {
        maxHeight: 200,
        width: "100%",
        marginBottom: 16,
    },
    explanationContainer: {
        backgroundColor: "rgba(255, 193, 7, 0.1)",
        borderRadius: 8,
        padding: 12,
        width: "100%",
    },
    explanationHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
        gap: 8,
    },
    explanationTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: colors.highlight,
    },
    explanationText: {
        fontSize: 14,
        color: colors.text,
        lineHeight: 20,
    },
    continueButton: {
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        marginTop: 8,
        width: "100%",
        alignItems: "center",
    },
    correctButton: {
        backgroundColor: colors.success,
    },
    incorrectButton: {
        backgroundColor: colors.error,
    },
    continueButtonText: {
        color: colors.text,
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default QuizFeedback;
