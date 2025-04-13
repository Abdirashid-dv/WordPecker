import React, { useEffect, useRef } from "react";
import { StyleSheet, Text, View, Animated } from "react-native";
import { Clock } from "lucide-react-native";
import { formatTime } from "@/utils/quizUtils";
import { TIMER_WARNINGS } from "@/constants/quiz";
import { colors } from "@/constants/colors";

interface QuizTimerProps {
    timeRemaining: number;
    totalTime: number;
}

const QuizTimer = ({ timeRemaining, totalTime }: QuizTimerProps) => {
    const progress = timeRemaining / totalTime;
    const isWarning = timeRemaining <= TIMER_WARNINGS.WARNING;
    const isCritical = timeRemaining <= TIMER_WARNINGS.CRITICAL;

    // Animation for pulsing effect when time is running low
    const pulseAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        if (isCritical) {
            // Create pulsing animation
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 1.2,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(pulseAnim, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]).start();
        }
    }, [timeRemaining, isCritical]);

    return (
        <View style={styles.container}>
            <View style={styles.timerHeader}>
                <Clock
                    size={16}
                    color={
                        isCritical
                            ? colors.error
                            : isWarning
                            ? colors.highlight
                            : colors.accent
                    }
                />
                <Text
                    style={[
                        styles.timerText,
                        isWarning && styles.warningText,
                        isCritical && styles.criticalText,
                    ]}
                >
                    {formatTime(timeRemaining)}
                </Text>
            </View>

            <View style={styles.progressContainer}>
                <Animated.View
                    style={[
                        styles.progressFill,
                        {
                            width: `${progress * 100}%`,
                            backgroundColor: isCritical
                                ? colors.error
                                : isWarning
                                ? colors.highlight
                                : colors.accent,
                            transform: [{ scale: isCritical ? pulseAnim : 1 }],
                        },
                    ]}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 8,
    },
    timerHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 4,
        gap: 6,
    },
    timerText: {
        color: colors.accent,
        fontSize: 16,
        fontWeight: "bold",
    },
    warningText: {
        color: colors.highlight,
    },
    criticalText: {
        color: colors.error,
    },
    progressContainer: {
        height: 6,
        backgroundColor: colors.progressBackground,
        borderRadius: 3,
        overflow: "hidden",
    },
    progressFill: {
        height: "100%",
        backgroundColor: colors.accent,
        borderRadius: 3,
    },
});

export default QuizTimer;
