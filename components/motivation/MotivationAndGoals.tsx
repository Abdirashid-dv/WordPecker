import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { COLORS } from "@/constants/colors";
import { useMotivation } from "@/hooks/useMotivation";
import { DailyTip } from "./DailyTip";
import { MotivationalQuote } from "./MotivationalQuote";
import { DailyGoalsWidget } from "./DailyGoalsWidget";
import { SECTION_TITLES } from "@/constants/motivationConstants";

interface MotivationAndGoalsProps {
    style?: any;
}

export const MotivationAndGoals: React.FC<MotivationAndGoalsProps> = ({
    style,
}) => {
    const {
        currentTip,
        currentQuote,
        dailyGoals,
        goalSuggestions,
        goalPreferences,
        refreshTip,
        refreshQuote,
        createGoal,
        removeGoal,
        updateGoal,
        updateProgress,
        completeGoal,
        addSuggestedGoal,
        toggleGoalReminder,
    } = useMotivation();

    return (
        <View style={[styles.container, style]}>
            <Text style={styles.sectionTitle}>Daily Motivation</Text>

            <DailyTip
                tip={currentTip}
                onRefresh={refreshTip}
                style={styles.tipCard}
            />

            <MotivationalQuote
                quote={currentQuote}
                onRefresh={refreshQuote}
                style={styles.quoteCard}
            />

            <DailyGoalsWidget
                goals={dailyGoals}
                suggestions={goalSuggestions}
                onUpdateProgress={updateProgress}
                onToggleReminder={toggleGoalReminder}
                onDeleteGoal={removeGoal}
                onCreateGoal={createGoal}
                onAddSuggestion={addSuggestedGoal}
                defaultReminderTime={goalPreferences.defaultReminderTime}
                remindersEnabled={goalPreferences.reminderEnabled}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 16,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: "bold",
        color: COLORS.text,
        marginBottom: 16,
        paddingHorizontal: 16,
    },
    tipCard: {
        marginHorizontal: 16,
    },
    quoteCard: {
        marginHorizontal: 16,
    },
    goalsWidget: {
        marginHorizontal: 16,
    },
});
