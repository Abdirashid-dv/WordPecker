import React from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { Trophy, BarChart2, Clock, Calendar } from "lucide-react-native";
import { useLearningStore } from "@/stores/learningStore";
import { formatTime } from "@/utils/timeUtils";
import { EXERCISE_TYPE_LABELS } from "@/constants/learning";
import { colors } from "@/constants/colors";

interface SessionSummaryProps {
    onRestart: () => void;
    onViewHistory: () => void;
}

const SessionSummary = ({ onRestart, onViewHistory }: SessionSummaryProps) => {
    const { currentSession, streak } = useLearningStore();

    const correctPercentage = Math.round(
        (currentSession.correct / currentSession.total) * 100
    );

    const exerciseTypes = currentSession.exerciseTypes
        .map((type) => EXERCISE_TYPE_LABELS[type])
        .join(", ");

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
        >
            <View style={styles.card}>
                <View style={styles.trophyContainer}>
                    <Trophy size={64} color={colors.highlight} />
                </View>

                <Text style={styles.title}>Session Complete!</Text>

                <View style={styles.statsContainer}>
                    <View style={styles.statItem}>
                        <Text style={styles.statValue}>
                            {currentSession.correct}
                        </Text>
                        <Text style={styles.statLabel}>Correct</Text>
                    </View>

                    <View style={styles.statItem}>
                        <Text style={styles.statValue}>
                            {currentSession.total}
                        </Text>
                        <Text style={styles.statLabel}>Total</Text>
                    </View>

                    <View style={styles.statItem}>
                        <Text style={styles.statValue}>
                            {correctPercentage}%
                        </Text>
                        <Text style={styles.statLabel}>Accuracy</Text>
                    </View>
                </View>

                <View style={styles.infoContainer}>
                    <View style={styles.infoRow}>
                        <Clock size={20} color={colors.textSecondary} />
                        <Text style={styles.infoText}>
                            Time: {formatTime(currentSession.timeSpent)}
                        </Text>
                    </View>

                    <View style={styles.infoRow}>
                        <Calendar size={20} color={colors.textSecondary} />
                        <Text style={styles.infoText}>
                            Date:{" "}
                            {new Date(currentSession.date).toLocaleDateString()}
                        </Text>
                    </View>

                    <Text style={styles.exerciseTypesText}>
                        Exercise types: {exerciseTypes}
                    </Text>
                </View>

                <View style={styles.streakContainer}>
                    <Flame size={24} color={colors.highlight} />
                    <Text style={styles.streakText}>
                        Highest streak: {streak.highest} correct in a row
                    </Text>
                </View>

                <TouchableOpacity
                    style={styles.restartButton}
                    onPress={onRestart}
                    activeOpacity={0.8}
                >
                    <Text style={styles.restartButtonText}>
                        Start New Session
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.statsButton}
                    onPress={onViewHistory}
                    activeOpacity={0.8}
                >
                    <BarChart2 size={20} color={colors.text} />
                    <Text style={styles.statsButtonText}>
                        View Learning History
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

// Add the missing Flame component
const Flame = ({ size, color }) => {
    return <Trophy size={size} color={color} />;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    contentContainer: {
        padding: 20,
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100%",
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
    infoContainer: {
        width: "100%",
        backgroundColor: "rgba(33, 150, 243, 0.1)",
        borderRadius: 12,
        padding: 16,
        marginBottom: 24,
    },
    infoRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
        gap: 8,
    },
    infoText: {
        color: colors.text,
        fontSize: 14,
    },
    exerciseTypesText: {
        color: colors.text,
        fontSize: 14,
        marginTop: 4,
    },
    streakContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 32,
        backgroundColor: "rgba(255, 193, 7, 0.1)",
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        gap: 8,
    },
    streakText: {
        color: colors.highlight,
        fontSize: 16,
        fontWeight: "bold",
    },
    restartButton: {
        backgroundColor: colors.primary,
        paddingVertical: 14,
        paddingHorizontal: 24,
        borderRadius: 8,
        width: "100%",
        alignItems: "center",
        marginBottom: 16,
    },
    restartButtonText: {
        color: colors.text,
        fontSize: 16,
        fontWeight: "bold",
    },
    statsButton: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    statsButtonText: {
        color: colors.text,
        fontSize: 16,
    },
});

export default SessionSummary;
