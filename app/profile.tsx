import { View, Image, StyleSheet, Text, ScrollView } from "react-native";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { Button } from "@/components/Button";
import React from "react";
import { colors } from "@/constants/colors";
import { useLearningStore } from "@/stores/learningStore";
import { FontAwesome5 } from "@expo/vector-icons";

export default function Profile() {
    const { signOut } = useAuth();
    const { user } = useUser();
    const { sessionHistory, totalCorrect, totalQuestions } = useLearningStore();
    const router = useRouter();

    // Fake learning data
    const learningData = {
        level: "Intermediate B1",
        levelProgress: 78,
        daysLearned: 42,
        currentStreak: 8,
        longestStreak: 14,
        wordsLearned: 648,
        vocabCategories: [
            { name: "Business", progress: 75 },
            { name: "Travel", progress: 92 },
            { name: "Academic", progress: 58 },
            { name: "Daily Life", progress: 83 },
        ],
        weeklyActivity: [4, 5, 3, 0, 2, 6, 4], // Minutes spent learning per day of the week
    };

    // Today's progress
    const dailyGoalMinutes = 10;
    const todayMinutes = 6;
    const dailyGoalPercent = Math.min(
        100,
        (todayMinutes / dailyGoalMinutes) * 100
    );

    const handleSignOut = async () => {
        await signOut();
        router.replace("/auth");
    };

    const accuracy =
        totalQuestions > 0
            ? Math.round((totalCorrect / totalQuestions) * 100)
            : 0;

    // Enhanced session history with fake data
    const enhancedSessionHistory = [
        {
            date: new Date(2025, 3, 13),
            correct: 23,
            total: 25,
            streakHighest: 14,
            topics: ["Phrasal Verbs", "Past Perfect"],
        },
        {
            date: new Date(2025, 3, 12),
            correct: 19,
            total: 24,
            streakHighest: 9,
            topics: ["Conditionals", "Business Vocab"],
        },
        {
            date: new Date(2025, 3, 10),
            correct: 21,
            total: 21,
            streakHighest: 21,
            topics: ["Travel Phrases", "Prepositions"],
        },
        {
            date: new Date(2025, 3, 8),
            correct: 15,
            total: 20,
            streakHighest: 6,
            topics: ["Modal Verbs", "Academic Writing"],
        },
        ...sessionHistory,
    ];

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={{ uri: user?.imageUrl }}
                    style={styles.profileImage}
                />
                <View style={styles.userInfo}>
                    <Text style={styles.userName}>{user?.fullName}</Text>
                    <Text style={styles.userEmail}>
                        {user?.emailAddresses[0].emailAddress}
                    </Text>
                    <View style={styles.levelBadge}>
                        <Text style={styles.levelText}>
                            {learningData.level}
                        </Text>
                    </View>
                </View>
            </View>

            <View style={styles.dailyProgressCard}>
                <View style={styles.dailyProgressHeader}>
                    <Text style={styles.dailyProgressTitle}>
                        Today's Progress
                    </Text>
                    <Text style={styles.dailyProgressSubtitle}>
                        {todayMinutes} of {dailyGoalMinutes} minutes
                    </Text>
                </View>
                <View style={styles.progressBarContainer}>
                    <View
                        style={[
                            styles.progressBar,
                            { width: `${dailyGoalPercent}%` },
                        ]}
                    />
                </View>
                <Text style={styles.dailyProgressMessage}>
                    {dailyGoalPercent >= 100
                        ? "Daily goal completed! 🎉"
                        : `${Math.round(dailyGoalPercent)}% to your daily goal`}
                </Text>
            </View>

            <View style={styles.statsGridContainer}>
                <View style={styles.statsCard}>
                    <FontAwesome5
                        name="fire"
                        size={24}
                        color={colors.highlight}
                    />
                    <Text style={styles.statValue}>
                        {learningData.currentStreak}
                    </Text>
                    <Text style={styles.statLabel}>Day Streak</Text>
                </View>

                <View style={styles.statsCard}>
                    <FontAwesome5
                        name="calendar-check"
                        size={24}
                        color={colors.primary}
                    />
                    <Text style={styles.statValue}>
                        {learningData.daysLearned}
                    </Text>
                    <Text style={styles.statLabel}>Days Learned</Text>
                </View>

                <View style={styles.statsCard}>
                    <FontAwesome5 name="book" size={24} color={colors.accent} />
                    <Text style={styles.statValue}>
                        {learningData.wordsLearned}
                    </Text>
                    <Text style={styles.statLabel}>Words Learned</Text>
                </View>

                <View style={styles.statsCard}>
                    <FontAwesome5
                        name="chart-line"
                        size={24}
                        color={colors.success}
                    />
                    <Text style={styles.statValue}>{accuracy}%</Text>
                    <Text style={styles.statLabel}>Accuracy</Text>
                </View>
            </View>

            <View style={styles.mainStatsCard}>
                <Text style={styles.cardTitle}>Level Progress</Text>
                <View style={styles.levelProgressContainer}>
                    <View style={styles.progressBarContainer}>
                        <View
                            style={[
                                styles.progressBar,
                                { width: `${learningData.levelProgress}%` },
                            ]}
                        />
                    </View>
                    <Text style={styles.levelProgressText}>
                        {learningData.levelProgress}%
                    </Text>
                </View>

                <Text style={styles.sectionTitle}>Vocabulary Categories</Text>
                {learningData.vocabCategories.map((category, index) => (
                    <View key={index} style={styles.categoryItem}>
                        <View style={styles.categoryHeader}>
                            <Text style={styles.categoryName}>
                                {category.name}
                            </Text>
                            <Text style={styles.categoryPercent}>
                                {category.progress}%
                            </Text>
                        </View>
                        <View style={styles.progressBarContainer}>
                            <View
                                style={[
                                    styles.progressBar,
                                    { width: `${category.progress}%` },
                                ]}
                            />
                        </View>
                    </View>
                ))}
            </View>

            <View style={styles.historyCard}>
                <Text style={styles.cardTitle}>Recent Sessions</Text>
                {enhancedSessionHistory.length > 0 ? (
                    enhancedSessionHistory.slice(0, 4).map((session, index) => (
                        <View key={index} style={styles.sessionItem}>
                            <View style={styles.sessionHeader}>
                                <Text style={styles.sessionDate}>
                                    {new Date(
                                        session.date
                                    ).toLocaleDateString()}
                                </Text>
                                <View style={styles.resultBadge}>
                                    <Text style={styles.resultText}>
                                        {Math.round(
                                            (session.correct / session.total) *
                                                100
                                        )}
                                        %
                                    </Text>
                                </View>
                            </View>
                            <Text style={styles.sessionStats}>
                                {session.correct}/{session.total} correct •{" "}
                                {session.streakHighest} highest streak
                            </Text>
                            <View style={styles.topicsContainer}>
                                {session.topics &&
                                    session.topics.map((topic, idx) => (
                                        <View
                                            key={idx}
                                            style={styles.topicBadge}
                                        >
                                            <Text style={styles.topicText}>
                                                {topic}
                                            </Text>
                                        </View>
                                    ))}
                            </View>
                        </View>
                    ))
                ) : (
                    <Text style={styles.emptyText}>
                        No learning sessions yet. Start practicing to see your
                        history!
                    </Text>
                )}
            </View>

            <View
                style={{
                    paddingHorizontal: 16,
                    paddingBottom: 16,
                }}
            >
                <Button style={styles.signOutButton} onPress={handleSignOut}>
                    Sign Out
                </Button>
            </View>

            <View style={{ height: 80 }} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    header: {
        flexDirection: "row",
        padding: 20,
        alignItems: "center",
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 3,
        borderColor: colors.primary,
    },
    userInfo: {
        marginLeft: 16,
        flex: 1,
    },
    userName: {
        fontSize: 22,
        fontWeight: "bold",
        color: colors.text,
        marginBottom: 4,
    },
    userEmail: {
        fontSize: 14,
        color: colors.textSecondary,
        marginBottom: 8,
    },
    levelBadge: {
        backgroundColor: colors.accent,
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 20,
        alignSelf: "flex-start",
    },
    levelText: {
        color: colors.text,
        fontWeight: "bold",
        fontSize: 12,
    },
    dailyProgressCard: {
        backgroundColor: colors.cardBackground,
        borderRadius: 16,
        padding: 20,
        margin: 16,
        marginTop: 0,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 5,
    },
    dailyProgressHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 12,
    },
    dailyProgressTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: colors.text,
    },
    dailyProgressSubtitle: {
        fontSize: 14,
        color: colors.textSecondary,
    },
    progressBarContainer: {
        height: 10,
        backgroundColor: colors.progressBackground,
        borderRadius: 5,
        overflow: "hidden",
        marginBottom: 8,
    },
    progressBar: {
        height: "100%",
        backgroundColor: colors.primary,
    },
    dailyProgressMessage: {
        fontSize: 14,
        color: colors.textSecondary,
        textAlign: "center",
        marginTop: 4,
    },
    statsGridContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        padding: 16,
        paddingTop: 0,
    },
    statsCard: {
        backgroundColor: colors.cardBackground,
        borderRadius: 16,
        padding: 16,
        width: "48%",
        marginBottom: 16,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    statValue: {
        fontSize: 24,
        fontWeight: "bold",
        color: colors.text,
        marginTop: 8,
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 14,
        color: colors.textSecondary,
        textAlign: "center",
    },
    mainStatsCard: {
        backgroundColor: colors.cardBackground,
        borderRadius: 16,
        padding: 20,
        margin: 16,
        marginTop: 0,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: colors.text,
        marginBottom: 16,
    },
    levelProgressContainer: {
        marginBottom: 24,
    },
    levelProgressText: {
        color: colors.textSecondary,
        fontSize: 14,
        textAlign: "right",
        marginTop: 4,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: colors.text,
        marginBottom: 12,
    },
    categoryItem: {
        marginBottom: 16,
    },
    categoryHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 8,
    },
    categoryName: {
        fontSize: 16,
        color: colors.text,
    },
    categoryPercent: {
        fontSize: 16,
        color: colors.accent,
        fontWeight: "bold",
    },
    historyCard: {
        backgroundColor: colors.cardBackground,
        borderRadius: 16,
        padding: 20,
        margin: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    sessionItem: {
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    sessionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 8,
    },
    sessionDate: {
        fontSize: 16,
        fontWeight: "bold",
        color: colors.text,
    },
    resultBadge: {
        backgroundColor: colors.success,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },
    resultText: {
        color: colors.text,
        fontWeight: "bold",
        fontSize: 12,
    },
    sessionStats: {
        fontSize: 14,
        color: colors.textSecondary,
        marginBottom: 10,
    },
    topicsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    topicBadge: {
        backgroundColor: colors.cardBackground,
        borderWidth: 1,
        borderColor: colors.accent,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
        marginRight: 8,
        marginTop: 4,
    },
    topicText: {
        color: colors.accent,
        fontSize: 12,
    },
    emptyText: {
        fontSize: 16,
        color: colors.textSecondary,
        fontStyle: "italic",
        textAlign: "center",
        marginVertical: 20,
    },
    signOutButton: {
        backgroundColor: colors.primary,

        marginTop: 8,
    },
});
