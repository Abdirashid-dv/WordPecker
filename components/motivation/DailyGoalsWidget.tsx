import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { COLORS } from "@/constants/colors";
import { DailyGoal, GoalType } from "@/types/motivation";
import { DailyGoalItem } from "./DailyGoalItem";
import { GoalCreationModal } from "./GoalCreationModal";
import { SECTION_TITLES } from "@/constants/motivationConstants";
import { Plus, Target } from "lucide-react-native";

interface DailyGoalsWidgetProps {
    goals: DailyGoal[];
    suggestions: DailyGoal[];
    onUpdateProgress: (goalId: string, progress: number) => void;
    onToggleReminder: (goalId: string, enabled: boolean) => void;
    onDeleteGoal: (goalId: string) => void;
    onCreateGoal: (
        type: GoalType,
        target: number,
        reminderTime: string | null,
        customTitle?: string,
        customDescription?: string
    ) => void;
    onAddSuggestion: (index: number) => void;
    defaultReminderTime: string | null;
    remindersEnabled: boolean;
    style?: any;
}

export const DailyGoalsWidget: React.FC<DailyGoalsWidgetProps> = ({
    goals,
    suggestions,
    onUpdateProgress,
    onToggleReminder,
    onDeleteGoal,
    onCreateGoal,
    onAddSuggestion,
    defaultReminderTime,
    remindersEnabled,
    style,
}) => {
    const [showModal, setShowModal] = useState(false);

    // Open goal creation modal
    const openModal = () => {
        setShowModal(true);
    };

    // Close goal creation modal
    const closeModal = () => {
        setShowModal(false);
    };

    // Handle goal creation
    const handleCreateGoal = (
        type: GoalType,
        target: number,
        reminderTime: string | null,
        customTitle?: string,
        customDescription?: string
    ) => {
        onCreateGoal(
            type,
            target,
            reminderTime,
            customTitle,
            customDescription
        );
    };

    // Render empty state
    const renderEmptyState = () => (
        <View style={styles.emptyContainer}>
            <Target size={32} color={COLORS.textSecondary} />
            <Text style={styles.emptyText}>No goals for today</Text>
            <Text style={styles.emptySubtext}>
                Create a goal to track your progress
            </Text>
            <Pressable style={styles.createButton} onPress={openModal}>
                <Plus size={18} color={COLORS.text} />
                <Text style={styles.createButtonText}>Create Goal</Text>
            </Pressable>
        </View>
    );

    return (
        <View style={[styles.container, style]}>
            <View style={styles.header}>
                <Text style={styles.title}>{SECTION_TITLES.DAILY_GOALS}</Text>
                <Pressable style={styles.addButton} onPress={openModal}>
                    <Plus size={20} color={COLORS.primary} />
                </Pressable>
            </View>

            {goals.length === 0 ? (
                renderEmptyState()
            ) : (
                <ScrollView
                    style={styles.goalsList}
                    showsVerticalScrollIndicator={false}
                >
                    {goals.map((goal) => (
                        <DailyGoalItem
                            key={goal.id}
                            goal={goal}
                            onUpdateProgress={(progress) =>
                                onUpdateProgress(goal.id, progress)
                            }
                            onToggleReminder={(enabled) =>
                                onToggleReminder(goal.id, enabled)
                            }
                            onDelete={() => onDeleteGoal(goal.id)}
                        />
                    ))}
                </ScrollView>
            )}

            {suggestions.length > 0 && (
                <View style={styles.suggestionsContainer}>
                    <Text style={styles.suggestionsTitle}>
                        {SECTION_TITLES.GOAL_SUGGESTIONS}
                    </Text>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.suggestionsContent}
                    >
                        {suggestions.map((suggestion, index) => (
                            <Pressable
                                key={suggestion.id}
                                style={styles.suggestionCard}
                                onPress={() => onAddSuggestion(index)}
                            >
                                <Text style={styles.suggestionTitle}>
                                    {suggestion.title}
                                </Text>
                                <Text
                                    style={styles.suggestionDescription}
                                    numberOfLines={2}
                                >
                                    {suggestion.description}
                                </Text>
                                <View style={styles.addSuggestionButton}>
                                    <Plus size={16} color={COLORS.text} />
                                    <Text style={styles.addSuggestionText}>
                                        Add
                                    </Text>
                                </View>
                            </Pressable>
                        ))}
                    </ScrollView>
                </View>
            )}

            <GoalCreationModal
                visible={showModal}
                onClose={closeModal}
                onCreateGoal={handleCreateGoal}
                defaultReminderTime={defaultReminderTime}
                remindersEnabled={remindersEnabled}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.surface,
        borderRadius: 12,
        padding: 16,
        marginHorizontal: 16,
        marginBottom: 16,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: COLORS.text,
    },
    addButton: {
        padding: 4,
    },
    goalsList: {
        maxHeight: 400,
    },
    emptyContainer: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 32,
    },
    emptyText: {
        fontSize: 16,
        fontWeight: "600",
        color: COLORS.text,
        marginTop: 12,
        marginBottom: 4,
    },
    emptySubtext: {
        fontSize: 14,
        color: COLORS.textSecondary,
        marginBottom: 16,
    },
    createButton: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: COLORS.primary,
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 8,
    },
    createButtonText: {
        color: COLORS.text,
        fontSize: 16,
        fontWeight: "600",
        marginLeft: 8,
    },
    suggestionsContainer: {
        marginTop: 16,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
        paddingTop: 16,
    },
    suggestionsTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: COLORS.text,
        marginBottom: 12,
    },
    suggestionsContent: {
        paddingRight: 16,
    },
    suggestionCard: {
        backgroundColor: COLORS.background,
        borderRadius: 8,
        padding: 12,
        marginRight: 12,
        width: 180,
    },
    suggestionTitle: {
        fontSize: 14,
        fontWeight: "600",
        color: COLORS.text,
        marginBottom: 4,
    },
    suggestionDescription: {
        fontSize: 12,
        color: COLORS.textSecondary,
        marginBottom: 12,
    },
    addSuggestionButton: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: COLORS.highlight,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 4,
        alignSelf: "flex-start",
    },
    addSuggestionText: {
        color: COLORS.background,
        fontSize: 12,
        fontWeight: "600",
        marginLeft: 4,
    },
});
