import React from "react";
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import {
    ArrowLeft,
    Calendar,
    Clock,
    Award,
    BarChart2,
} from "lucide-react-native";
import { useLearningStore } from "@/stores/learningStore";
import { formatTime } from "@/utils/timeUtils";
import { EXERCISE_TYPE_LABELS } from "@/constants/learning";
import { colors } from "@/constants/colors";

interface LearningHistoryProps {
    onClose: () => void;
}

const LearningHistory = ({ onClose }: LearningHistoryProps) => {
    const { sessionHistory, totalCorrect, totalQuestions } = useLearningStore();

    const accuracy =
        totalQuestions > 0
            ? Math.round((totalCorrect / totalQuestions) * 100)
            : 0;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={onClose}
                    activeOpacity={0.7}
                >
                    <ArrowLeft size={24} color={colors.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Learning History</Text>
            </View>

            <View style={styles.summaryCard}>
                <Text style={styles.summaryTitle}>Overall Progress</Text>

                <View style={styles.statsContainer}>
                    <View style={styles.statItem}>
                        <Text style={styles.statValue}>{totalQuestions}</Text>
                        <Text style={styles.statLabel}>Questions</Text>
                    </View>

                    <View style={styles.statItem}>
                        <Text style={styles.statValue}>{totalCorrect}</Text>
                        <Text style={styles.statLabel}>Correct</Text>
                    </View>

                    <View style={styles.statItem}>
                        <Text style={styles.statValue}>{accuracy}%</Text>
                        <Text style={styles.statLabel}>Accuracy</Text>
                    </View>
                </View>
            </View>

            <Text style={styles.sectionTitle}>Recent Sessions</Text>

            <ScrollView style={styles.sessionsContainer}>
                {sessionHistory.length > 0 ? (
                    sessionHistory.map((session, index) => (
                        <View key={index} style={styles.sessionCard}>
                            <View style={styles.sessionHeader}>
                                <View style={styles.sessionDateContainer}>
                                    <Calendar
                                        size={16}
                                        color={colors.textSecondary}
                                    />
                                    <Text style={styles.sessionDate}>
                                        {new Date(
                                            session.date
                                        ).toLocaleDateString()}
                                    </Text>
                                </View>

                                <View style={styles.sessionScoreContainer}>
                                    <Award size={16} color={colors.highlight} />
                                    <Text style={styles.sessionScore}>
                                        {session.correct}/{session.total}{" "}
                                        correct
                                    </Text>
                                </View>
                            </View>

                            <View style={styles.sessionDetails}>
                                <View style={styles.detailRow}>
                                    <Clock
                                        size={16}
                                        color={colors.textSecondary}
                                    />
                                    <Text style={styles.detailText}>
                                        Time:{" "}
                                        {formatTime(session.timeSpent || 0)}
                                    </Text>
                                </View>

                                <View style={styles.detailRow}>
                                    <BarChart2
                                        size={16}
                                        color={colors.textSecondary}
                                    />
                                    <Text style={styles.detailText}>
                                        Highest streak: {session.streakHighest}
                                    </Text>
                                </View>

                                {session.exerciseTypes && (
                                    <Text style={styles.exerciseTypesText}>
                                        Exercise types:{" "}
                                        {session.exerciseTypes
                                            .map(
                                                (type) =>
                                                    EXERCISE_TYPE_LABELS[type]
                                            )
                                            .join(", ")}
                                    </Text>
                                )}
                            </View>
                        </View>
                    ))
                ) : (
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>
                            No learning sessions yet. Start practicing to see
                            your history!
                        </Text>
                    </View>
                )}
            </ScrollView>
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
        fontSize: 20,
        fontWeight: "bold",
        color: colors.text,
    },
    summaryCard: {
        backgroundColor: colors.cardBackground,
        borderRadius: 12,
        padding: 16,
        margin: 16,
    },
    summaryTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: colors.text,
        marginBottom: 16,
    },
    statsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    statItem: {
        alignItems: "center",
        flex: 1,
    },
    statValue: {
        fontSize: 24,
        fontWeight: "bold",
        color: colors.accent,
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 14,
        color: colors.textSecondary,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: colors.text,
        marginHorizontal: 16,
        marginTop: 8,
        marginBottom: 12,
    },
    sessionsContainer: {
        flex: 1,
        paddingHorizontal: 16,
    },
    sessionCard: {
        backgroundColor: colors.cardBackground,
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
    },
    sessionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 12,
    },
    sessionDateContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },
    sessionDate: {
        fontSize: 14,
        color: colors.text,
    },
    sessionScoreContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },
    sessionScore: {
        fontSize: 14,
        color: colors.highlight,
        fontWeight: "bold",
    },
    sessionDetails: {
        borderTopWidth: 1,
        borderTopColor: colors.border,
        paddingTop: 12,
    },
    detailRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
        gap: 6,
    },
    detailText: {
        fontSize: 14,
        color: colors.text,
    },
    exerciseTypesText: {
        fontSize: 14,
        color: colors.text,
        marginTop: 4,
    },
    emptyContainer: {
        padding: 24,
        alignItems: "center",
        justifyContent: "center",
    },
    emptyText: {
        fontSize: 16,
        color: colors.textSecondary,
        textAlign: "center",
    },
});

export default LearningHistory;
