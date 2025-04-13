import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Award } from "lucide-react-native";
import { QuizScore } from "@/types/quiz";
import { colors } from "@/constants/colors";

interface QuizProgressProps {
    current: number;
    total: number;
    score: QuizScore;
}

const QuizProgress = ({ current, total, score }: QuizProgressProps) => {
    const progress = current / total;

    return (
        <View style={styles.container}>
            <View style={styles.progressHeader}>
                <Text style={styles.progressText}>
                    Question {current} of {total}
                </Text>

                <View style={styles.scoreContainer}>
                    <Award size={16} color={colors.highlight} />
                    <Text style={styles.scoreText}>
                        {score.correct}/{score.total}
                    </Text>
                </View>
            </View>

            <View style={styles.progressBarContainer}>
                <View
                    style={[
                        styles.progressBarFill,
                        { width: `${progress * 100}%` },
                    ]}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 8,
    },
    progressHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 8,
    },
    progressText: {
        color: colors.text,
        fontSize: 14,
    },
    scoreContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },
    scoreText: {
        color: colors.highlight,
        fontSize: 14,
        fontWeight: "bold",
    },
    progressBarContainer: {
        height: 8,
        backgroundColor: colors.progressBackground,
        borderRadius: 4,
        overflow: "hidden",
    },
    progressBarFill: {
        height: "100%",
        backgroundColor: colors.accent,
        borderRadius: 4,
    },
});

export default QuizProgress;
