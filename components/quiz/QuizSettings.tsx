import React from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    Switch,
} from "react-native";
import { Clock, Award, BookOpen, Save } from "lucide-react-native";
import {
    QuizSettings as QuizSettingsType,
    QuizDifficulty,
    QuizCategory,
} from "@/types/quiz";
import {
    QUIZ_DIFFICULTY_LABELS,
    QUIZ_CATEGORY_LABELS,
    TIME_LIMITS,
} from "@/constants/quiz";
import { colors } from "@/constants/colors";

interface QuizSettingsProps {
    settings: QuizSettingsType;
    onUpdateSettings: (settings: Partial<QuizSettingsType>) => void;
    onSave: () => void;
}

const QuizSettings = ({
    settings,
    onUpdateSettings,
    onSave,
}: QuizSettingsProps) => {
    const handleSelectDifficulty = (difficulty: QuizDifficulty) => {
        onUpdateSettings({ difficulty });
    };

    const handleSelectCategory = (category: QuizCategory) => {
        const currentCategories = [...settings.categories];
        const index = currentCategories.indexOf(category);

        if (index >= 0) {
            // Remove if already selected
            currentCategories.splice(index, 1);
        } else {
            // Add if not selected
            currentCategories.push(category);
        }

        onUpdateSettings({ categories: currentCategories });
    };

    const handleSelectTimeLimit = (timeLimit: number | null) => {
        onUpdateSettings({ timeLimit });
    };

    const handleToggleExplanations = () => {
        onUpdateSettings({ showExplanations: !settings.showExplanations });
    };

    const handleToggleAutoAdvance = () => {
        onUpdateSettings({ autoAdvance: !settings.autoAdvance });
    };

    const handleChangeQuestionsCount = (increment: number) => {
        const newCount = Math.max(
            5,
            Math.min(20, settings.questionsPerQuiz + increment)
        );
        onUpdateSettings({ questionsPerQuiz: newCount });
    };

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
        >
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Difficulty</Text>
                <View style={styles.difficultyOptions}>
                    {Object.values(QuizDifficulty).map((difficulty) => (
                        <TouchableOpacity
                            key={difficulty}
                            style={[
                                styles.difficultyOption,
                                settings.difficulty === difficulty &&
                                    styles.selectedDifficultyOption,
                            ]}
                            onPress={() => handleSelectDifficulty(difficulty)}
                            activeOpacity={0.7}
                        >
                            <Text
                                style={[
                                    styles.difficultyText,
                                    settings.difficulty === difficulty &&
                                        styles.selectedDifficultyText,
                                ]}
                            >
                                {QUIZ_DIFFICULTY_LABELS[difficulty]}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Categories</Text>
                <View style={styles.categoriesContainer}>
                    {Object.values(QuizCategory).map((category) => (
                        <TouchableOpacity
                            key={category}
                            style={[
                                styles.categoryOption,
                                settings.categories.includes(category) &&
                                    styles.selectedCategoryOption,
                            ]}
                            onPress={() => handleSelectCategory(category)}
                            activeOpacity={0.7}
                        >
                            <Text
                                style={[
                                    styles.categoryText,
                                    settings.categories.includes(category) &&
                                        styles.selectedCategoryText,
                                ]}
                            >
                                {QUIZ_CATEGORY_LABELS[category]}
                            </Text>
                            {settings.categories.includes(category) && (
                                <View style={styles.checkmark} />
                            )}
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Time Limit</Text>
                <View style={styles.timeLimitOptions}>
                    <TouchableOpacity
                        style={[
                            styles.timeLimitOption,
                            settings.timeLimit === TIME_LIMITS.SHORT &&
                                styles.selectedTimeLimitOption,
                        ]}
                        onPress={() => handleSelectTimeLimit(TIME_LIMITS.SHORT)}
                        activeOpacity={0.7}
                    >
                        <Clock
                            size={16}
                            color={
                                settings.timeLimit === TIME_LIMITS.SHORT
                                    ? colors.text
                                    : colors.textSecondary
                            }
                        />
                        <Text
                            style={[
                                styles.timeLimitText,
                                settings.timeLimit === TIME_LIMITS.SHORT &&
                                    styles.selectedTimeLimitText,
                            ]}
                        >
                            15s
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles.timeLimitOption,
                            settings.timeLimit === TIME_LIMITS.MEDIUM &&
                                styles.selectedTimeLimitOption,
                        ]}
                        onPress={() =>
                            handleSelectTimeLimit(TIME_LIMITS.MEDIUM)
                        }
                        activeOpacity={0.7}
                    >
                        <Clock
                            size={16}
                            color={
                                settings.timeLimit === TIME_LIMITS.MEDIUM
                                    ? colors.text
                                    : colors.textSecondary
                            }
                        />
                        <Text
                            style={[
                                styles.timeLimitText,
                                settings.timeLimit === TIME_LIMITS.MEDIUM &&
                                    styles.selectedTimeLimitText,
                            ]}
                        >
                            30s
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles.timeLimitOption,
                            settings.timeLimit === TIME_LIMITS.LONG &&
                                styles.selectedTimeLimitOption,
                        ]}
                        onPress={() => handleSelectTimeLimit(TIME_LIMITS.LONG)}
                        activeOpacity={0.7}
                    >
                        <Clock
                            size={16}
                            color={
                                settings.timeLimit === TIME_LIMITS.LONG
                                    ? colors.text
                                    : colors.textSecondary
                            }
                        />
                        <Text
                            style={[
                                styles.timeLimitText,
                                settings.timeLimit === TIME_LIMITS.LONG &&
                                    styles.selectedTimeLimitText,
                            ]}
                        >
                            60s
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles.timeLimitOption,
                            settings.timeLimit === TIME_LIMITS.NONE &&
                                styles.selectedTimeLimitOption,
                        ]}
                        onPress={() => handleSelectTimeLimit(TIME_LIMITS.NONE)}
                        activeOpacity={0.7}
                    >
                        <Text
                            style={[
                                styles.timeLimitText,
                                settings.timeLimit === TIME_LIMITS.NONE &&
                                    styles.selectedTimeLimitText,
                            ]}
                        >
                            None
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Questions</Text>
                <View style={styles.questionsCountContainer}>
                    <TouchableOpacity
                        style={styles.countButton}
                        onPress={() => handleChangeQuestionsCount(-5)}
                        activeOpacity={0.7}
                        disabled={settings.questionsPerQuiz <= 5}
                    >
                        <Text style={styles.countButtonText}>-5</Text>
                    </TouchableOpacity>

                    <View style={styles.countDisplay}>
                        <BookOpen size={16} color={colors.accent} />
                        <Text style={styles.countText}>
                            {settings.questionsPerQuiz}
                        </Text>
                    </View>

                    <TouchableOpacity
                        style={styles.countButton}
                        onPress={() => handleChangeQuestionsCount(5)}
                        activeOpacity={0.7}
                        disabled={settings.questionsPerQuiz >= 20}
                    >
                        <Text style={styles.countButtonText}>+5</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Options</Text>

                <View style={styles.optionRow}>
                    <Text style={styles.optionText}>Show explanations</Text>
                    <Switch
                        value={settings.showExplanations}
                        onValueChange={handleToggleExplanations}
                        trackColor={{ false: "#334155", true: colors.primary }}
                        thumbColor={
                            settings.showExplanations ? "#fff" : "#f4f3f4"
                        }
                    />
                </View>

                <View style={styles.optionRow}>
                    <Text style={styles.optionText}>
                        Auto-advance after answer
                    </Text>
                    <Switch
                        value={settings.autoAdvance}
                        onValueChange={handleToggleAutoAdvance}
                        trackColor={{ false: "#334155", true: colors.primary }}
                        thumbColor={settings.autoAdvance ? "#fff" : "#f4f3f4"}
                    />
                </View>
            </View>

            <TouchableOpacity
                style={styles.saveButton}
                onPress={onSave}
                activeOpacity={0.8}
            >
                <Save size={20} color={colors.text} />
                <Text style={styles.saveButtonText}>Save & Start Quiz</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    contentContainer: {
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: colors.text,
        marginBottom: 24,
        textAlign: "center",
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: colors.text,
        marginBottom: 12,
    },
    difficultyOptions: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    difficultyOption: {
        flex: 1,
        backgroundColor: colors.cardBackground,
        paddingVertical: 10,
        paddingHorizontal: 8,
        borderRadius: 8,
        alignItems: "center",
        marginHorizontal: 4,
        borderWidth: 1,
        borderColor: colors.border,
    },
    selectedDifficultyOption: {
        backgroundColor: "rgba(76, 175, 80, 0.2)",
        borderColor: colors.primary,
    },
    difficultyText: {
        color: colors.textSecondary,
        fontSize: 14,
    },
    selectedDifficultyText: {
        color: colors.text,
        fontWeight: "bold",
    },
    categoriesContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
    },
    categoryOption: {
        backgroundColor: colors.cardBackground,
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.border,
        minWidth: "48%",
        position: "relative",
    },
    selectedCategoryOption: {
        backgroundColor: "rgba(33, 150, 243, 0.2)",
        borderColor: colors.accent,
    },
    categoryText: {
        color: colors.textSecondary,
        fontSize: 14,
    },
    selectedCategoryText: {
        color: colors.text,
        fontWeight: "bold",
    },
    checkmark: {
        position: "absolute",
        top: 8,
        right: 8,
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: colors.accent,
    },
    timeLimitOptions: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    timeLimitOption: {
        flex: 1,
        backgroundColor: colors.cardBackground,
        paddingVertical: 10,
        paddingHorizontal: 8,
        borderRadius: 8,
        alignItems: "center",
        marginHorizontal: 4,
        borderWidth: 1,
        borderColor: colors.border,
        flexDirection: "row",
        justifyContent: "center",
        gap: 6,
    },
    selectedTimeLimitOption: {
        backgroundColor: "rgba(33, 150, 243, 0.2)",
        borderColor: colors.accent,
    },
    timeLimitText: {
        color: colors.textSecondary,
        fontSize: 14,
    },
    selectedTimeLimitText: {
        color: colors.text,
        fontWeight: "bold",
    },
    questionsCountContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    countButton: {
        backgroundColor: colors.cardBackground,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.border,
    },
    countButtonText: {
        color: colors.text,
        fontSize: 16,
        fontWeight: "bold",
    },
    countDisplay: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 24,
        gap: 8,
    },
    countText: {
        color: colors.text,
        fontSize: 20,
        fontWeight: "bold",
    },
    optionRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    optionText: {
        color: colors.text,
        fontSize: 16,
    },
    saveButton: {
        backgroundColor: colors.primary,
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 8,
        flexDirection: "row",
        justifyContent: "center",
        gap: 8,
    },
    saveButtonText: {
        color: colors.text,
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default QuizSettings;
