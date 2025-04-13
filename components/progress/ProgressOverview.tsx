import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "@/constants/colors";
import { useProgress } from "@/hooks/useProgress";
import { ProgressBar } from "./ProgressBar";
import { StatCard } from "./StatCard";
import { StreakIndicator } from "./StreakIndicator";
import { ActivityChart } from "./ActivityChart";
import { formatMinutes } from "@/utils/progressUtils";
import { Book, CheckCircle, Clock, Award } from "lucide-react-native";
import { StreaksAndAchievements } from "@/components/achievements/StreaksAndAchievements";

export const ProgressOverview: React.FC = () => {
    const { progressData, progressSummary } = useProgress();

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.header}>
                <Text style={styles.title}>Your Progress</Text>
                <StreakIndicator streak={progressSummary.currentStreak} />
            </View>

            <View style={styles.overallProgressContainer}>
                <View style={styles.progressLabelContainer}>
                    <Text style={styles.progressLabel}>Overall Progress</Text>
                    <Text style={styles.progressValue}>
                        {progressData.words.learned}/{progressData.words.total}{" "}
                        words
                    </Text>
                </View>

                <ProgressBar
                    progress={progressSummary.totalProgress}
                    showPercentage
                    height={10}
                />
            </View>

            <View style={styles.statsContainer}>
                <StatCard
                    title="Words Learned"
                    value={progressSummary.wordsLearned}
                    icon={<Book size={18} color={COLORS.accent} />}
                    color={COLORS.accent}
                    style={styles.statCard}
                />

                <StatCard
                    title="Quizzes"
                    value={progressSummary.quizzesCompleted}
                    icon={<CheckCircle size={18} color={COLORS.primary} />}
                    color={COLORS.primary}
                    style={styles.statCard}
                />

                <StatCard
                    title="Today's Study"
                    value={formatMinutes(progressSummary.todayMinutes)}
                    icon={<Clock size={18} color={COLORS.highlight} />}
                    color={COLORS.highlight}
                    style={styles.statCard}
                />

                <StatCard
                    title="Mastery Level"
                    value={`${Math.round(
                        (progressData.words.mastered /
                            progressData.words.total) *
                            100
                    )}%`}
                    icon={<Award size={18} color="#9333EA" />}
                    color="#9333EA"
                    subtitle={`${progressData.words.mastered} words mastered`}
                    style={styles.statCard}
                />
            </View>

            {/* Streaks and Achievements Section */}
            <StreaksAndAchievements />

            <View style={styles.weeklyContainer}>
                <View style={styles.weeklyHeader}>
                    <Text style={styles.weeklyTitle}>Weekly Goal</Text>
                    <Text style={styles.weeklyProgress}>
                        {progressData.weeklyProgress}/{progressData.weeklyGoal}{" "}
                        words
                    </Text>
                </View>

                <ProgressBar
                    progress={
                        (progressData.weeklyProgress /
                            progressData.weeklyGoal) *
                        100
                    }
                    color={COLORS.highlight}
                />
            </View>

            <ActivityChart
                data={progressData.dailyActivity}
                style={styles.activityChart}
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    contentContainer: {
        padding: 16,
        paddingBottom: 32,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 24,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: COLORS.text,
    },
    overallProgressContainer: {
        backgroundColor: COLORS.surface,
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
    },
    progressLabelContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 8,
    },
    progressLabel: {
        fontSize: 16,
        fontWeight: "600",
        color: COLORS.text,
    },
    progressValue: {
        fontSize: 14,
        color: COLORS.textSecondary,
    },
    statsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        marginBottom: 16,
    },
    statCard: {
        width: "48%",
        marginBottom: 12,
    },
    weeklyContainer: {
        backgroundColor: COLORS.surface,
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
    },
    weeklyHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 8,
    },
    weeklyTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: COLORS.text,
    },
    weeklyProgress: {
        fontSize: 14,
        color: COLORS.textSecondary,
    },
    activityChart: {
        marginTop: 8,
    },
});
