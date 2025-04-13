import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { COLORS } from "@/constants/colors";
import { Achievement } from "@/types/achievement";
import { ACHIEVEMENT_LEVEL_COLORS } from "@/constants/achievementConstants";
import { Award, Star, Book, CheckCircle, Flame } from "lucide-react-native";

interface AchievementBadgeProps {
    achievement: Achievement;
    size?: "small" | "medium" | "large";
    onPress?: () => void;
    style?: any;
}

export const AchievementBadge: React.FC<AchievementBadgeProps> = ({
    achievement,
    size = "medium",
    onPress,
    style,
}) => {
    const isUnlocked = achievement.unlockedAt !== null;
    const levelColor = ACHIEVEMENT_LEVEL_COLORS[achievement.level];

    // Determine icon based on category
    const renderIcon = () => {
        const iconSize = size === "small" ? 16 : size === "medium" ? 24 : 32;
        const iconColor = isUnlocked ? levelColor : COLORS.disabled;

        switch (achievement.category) {
            case "streak":
                return <Flame size={iconSize} color={iconColor} />;
            case "words":
                return <Book size={iconSize} color={iconColor} />;
            case "quizzes":
                return <CheckCircle size={iconSize} color={iconColor} />;
            case "mastery":
                return <Award size={iconSize} color={iconColor} />;
            case "special":
                return <Star size={iconSize} color={iconColor} />;
            default:
                return <Award size={iconSize} color={iconColor} />;
        }
    };

    return (
        <Pressable
            style={[
                styles.container,
                {
                    small: styles.containerSmall,
                    medium: styles.containerMedium,
                    large: styles.containerLarge,
                }[size],
                isUnlocked ? styles.unlocked : styles.locked,
                style,
            ]}
            onPress={onPress}
        >
            <View
                style={[
                    styles.iconContainer,
                    { borderColor: isUnlocked ? levelColor : COLORS.disabled },
                ]}
            >
                {renderIcon()}
            </View>

            {size !== "small" && (
                <View style={styles.textContainer}>
                    <Text
                        style={[
                            styles.title,
                            {
                                color: isUnlocked
                                    ? COLORS.text
                                    : COLORS.textSecondary,
                            },
                        ]}
                        numberOfLines={1}
                    >
                        {achievement.title}
                    </Text>

                    {size === "large" && (
                        <Text style={styles.description} numberOfLines={2}>
                            {achievement.description}
                        </Text>
                    )}

                    {!isUnlocked && (
                        <View style={styles.progressContainer}>
                            <View style={styles.progressBackground}>
                                <View
                                    style={[
                                        styles.progressFill,
                                        { width: `${achievement.progress}%` },
                                    ]}
                                />
                            </View>
                            <Text style={styles.progressText}>
                                {achievement.progress}%
                            </Text>
                        </View>
                    )}
                </View>
            )}
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: COLORS.surface,
        borderRadius: 12,
        overflow: "hidden",
    },
    containerSmall: {
        padding: 8,
    },
    containerMedium: {
        padding: 12,
    },
    containerLarge: {
        padding: 16,
    },
    unlocked: {
        opacity: 1,
    },
    locked: {
        opacity: 0.7,
    },
    iconContainer: {
        borderRadius: 50,
        borderWidth: 2,
        padding: 8,
        backgroundColor: COLORS.background,
        justifyContent: "center",
        alignItems: "center",
    },
    textContainer: {
        marginLeft: 12,
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 4,
    },
    description: {
        fontSize: 12,
        color: COLORS.textSecondary,
        marginBottom: 6,
    },
    progressContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    progressBackground: {
        height: 4,
        backgroundColor: COLORS.progressBackground,
        borderRadius: 2,
        flex: 1,
        overflow: "hidden",
    },
    progressFill: {
        height: "100%",
        backgroundColor: COLORS.primary,
        borderRadius: 2,
    },
    progressText: {
        fontSize: 10,
        color: COLORS.textSecondary,
        marginLeft: 6,
    },
});
