import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "@/constants/colors";
import { useAchievements } from "@/hooks/useAchievements";
import { AchievementBadge } from "@/components/achievements/AchievementBadge";
import { StreakCounter } from "@/components/achievements/StreakCounter";
import { useProgress } from "@/hooks/useProgress";
import { isStreakActive } from "@/utils/streakUtils";
import { Achievement, AchievementCategory } from "@/types/achievement";
import { ACHIEVEMENT_LEVEL_COLORS } from "@/constants/achievementConstants";
import { Stack } from "expo-router";

export default function AchievementsScreen() {
    const { achievements, achievementSummary, highestLevel } =
        useAchievements();
    const { progressData } = useProgress();
    const [selectedCategory, setSelectedCategory] = useState<string>("all");

    const streakActive = isStreakActive(progressData.streak.lastActive);

    // Filter achievements by category
    const filteredAchievements =
        selectedCategory === "all"
            ? achievements
            : achievements.filter((a) => a.category === selectedCategory);

    // Group achievements by whether they're unlocked
    const unlockedAchievements = filteredAchievements.filter(
        (a) => a.unlockedAt !== null
    );
    const lockedAchievements = filteredAchievements.filter(
        (a) => a.unlockedAt === null
    );

    // Calculate progress percentage
    const progressPercentage = Math.round(
        (unlockedAchievements.length / filteredAchievements.length) * 100
    );

    const renderCategoryButton = (category: string, label: string) => (
        <Pressable
            style={[
                styles.categoryButton,
                selectedCategory === category && styles.categoryButtonActive,
            ]}
            onPress={() => setSelectedCategory(category)}
        >
            <Text
                style={[
                    styles.categoryButtonText,
                    selectedCategory === category &&
                        styles.categoryButtonTextActive,
                ]}
            >
                {label}
            </Text>
        </Pressable>
    );

    return (
        <SafeAreaView style={styles.container} edges={["right", "left"]}>
            <Stack.Screen
                options={{
                    headerBackTitle: "Back",
                    headerBackTitleStyle: styles.backTitle,
                    headerStyle: {
                        backgroundColor: COLORS.background,
                    },
                    title: "Achievements",
                    headerTitleStyle: styles.headerTitle,
                    headerShadowVisible: false,
                }}
            />
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.header}>
                    <Text style={styles.title}>Achievements</Text>
                    <StreakCounter
                        streak={progressData.streak.current}
                        isActive={streakActive}
                    />
                </View>

                <View style={styles.summaryCard}>
                    <Text style={styles.summaryTitle}>{highestLevel}</Text>
                    <Text style={styles.summaryText}>
                        You've unlocked{" "}
                        {achievementSummary.unlockedAchievements} of{" "}
                        {achievementSummary.totalAchievements} achievements
                    </Text>
                    <View style={styles.progressBarContainer}>
                        <View style={styles.progressBar}>
                            <View
                                style={[
                                    styles.progressFill,
                                    { width: `${progressPercentage}%` },
                                ]}
                            />
                        </View>
                        <Text style={styles.progressText}>
                            {progressPercentage}%
                        </Text>
                    </View>
                </View>

                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.categoriesContainer}
                >
                    {renderCategoryButton("all", "All")}
                    {renderCategoryButton(
                        AchievementCategory.STREAK,
                        "Streaks"
                    )}
                    {renderCategoryButton(AchievementCategory.WORDS, "Words")}
                    {renderCategoryButton(
                        AchievementCategory.QUIZZES,
                        "Quizzes"
                    )}
                    {renderCategoryButton(
                        AchievementCategory.MASTERY,
                        "Mastery"
                    )}
                    {renderCategoryButton(
                        AchievementCategory.SPECIAL,
                        "Special"
                    )}
                </ScrollView>

                {unlockedAchievements.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Unlocked</Text>
                        <View style={styles.achievementsGrid}>
                            {unlockedAchievements.map((achievement) => (
                                <AchievementBadge
                                    key={achievement.id}
                                    achievement={achievement}
                                    size="medium"
                                    style={styles.achievementBadge}
                                />
                            ))}
                        </View>
                    </View>
                )}

                {lockedAchievements.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Locked</Text>
                        <View style={styles.achievementsGrid}>
                            {lockedAchievements.map((achievement) => (
                                <AchievementBadge
                                    key={achievement.id}
                                    achievement={achievement}
                                    size="medium"
                                    style={styles.achievementBadge}
                                />
                            ))}
                        </View>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    scrollView: {
        flex: 1,
    },
    contentContainer: {
        padding: 16,
        paddingBottom: 32,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: COLORS.text,
    },
    summaryCard: {
        backgroundColor: COLORS.surface,
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
    },
    summaryTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: COLORS.highlight,
        marginBottom: 8,
    },
    summaryText: {
        fontSize: 14,
        color: COLORS.textSecondary,
        marginBottom: 12,
    },
    progressBarContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    progressBar: {
        flex: 1,
        height: 8,
        backgroundColor: COLORS.progressBackground,
        borderRadius: 4,
        overflow: "hidden",
    },
    progressFill: {
        height: "100%",
        backgroundColor: COLORS.primary,
        borderRadius: 4,
    },
    progressText: {
        marginLeft: 8,
        fontSize: 14,
        color: COLORS.textSecondary,
    },
    categoriesContainer: {
        paddingBottom: 8,
    },
    categoryButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        marginRight: 8,
        backgroundColor: COLORS.surface,
    },
    categoryButtonActive: {
        backgroundColor: COLORS.primary,
    },
    categoryButtonText: {
        color: COLORS.textSecondary,
        fontWeight: "500",
    },
    categoryButtonTextActive: {
        color: COLORS.text,
    },
    section: {
        marginTop: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: COLORS.text,
        marginBottom: 12,
    },
    achievementsGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    achievementBadge: {
        width: "48%",
        marginBottom: 12,
    },
    backTitle: {
        color: COLORS.text,
        fontSize: 18,
        fontWeight: "600",
    },
    headerTitle: {
        color: COLORS.text,
        fontSize: 14,
        fontWeight: "600",
    },
});
