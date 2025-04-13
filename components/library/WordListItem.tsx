import React, { useCallback } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { BookOpen, Brain, Info, Star, StarOff } from "lucide-react-native";
import { WordList } from "@/types/wordList";
import {
    calculateProgress,
    formatDate,
    getListStatusLabel,
} from "@/utils/wordListUtils";
import { colors } from "@/constants/colors";
import { ProgressBar } from "./ProgressBar";

interface WordListItemProps {
    list: WordList;
    onToggleFavorite: (id: string) => void;
}

export const WordListItem: React.FC<WordListItemProps> = ({
    list,
    onToggleFavorite,
}) => {
    const router = useRouter();
    const progress = calculateProgress(list);
    const statusLabel = getListStatusLabel(list);

    const handleLearnPress = useCallback(() => {
        // Navigate to learn screen with list ID
        console.log("Learn pressed for list:", list.id);
        // router.push(`/learn/${list.id}`);
    }, [list.id]);

    const handleQuizPress = useCallback(() => {
        // Navigate to quiz screen with list ID
        console.log("Quiz pressed for list:", list.id);
        // router.push(`/quiz/${list.id}`);
    }, [list.id]);

    const handleDetailsPress = useCallback(() => {
        // Navigate to details screen with list ID
        router.push(`/list/${list.id}`);
    }, [list.id, router]);

    const handleFavoritePress = useCallback(() => {
        onToggleFavorite(list.id);
    }, [list.id, onToggleFavorite]);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{list.name}</Text>
                    <TouchableOpacity
                        style={styles.favoriteButton}
                        onPress={handleFavoritePress}
                    >
                        {list.isFavorite ? (
                            <Star
                                size={20}
                                color={colors.highlight}
                                fill={colors.highlight}
                            />
                        ) : (
                            <StarOff size={20} color={colors.textSecondary} />
                        )}
                    </TouchableOpacity>
                </View>
                <Text style={styles.language}>{list.language}</Text>
            </View>

            <Text style={styles.description} numberOfLines={2}>
                {list.description}
            </Text>

            <View style={styles.statsContainer}>
                <View style={styles.stat}>
                    <Text style={styles.statValue}>{progress.total}</Text>
                    <Text style={styles.statLabel}>Words</Text>
                </View>
                <View style={styles.stat}>
                    <Text style={styles.statValue}>{progress.mastered}</Text>
                    <Text style={styles.statLabel}>Mastered</Text>
                </View>
                <View style={styles.stat}>
                    <Text style={styles.statValue}>{progress.learning}</Text>
                    <Text style={styles.statLabel}>Learning</Text>
                </View>
                <View style={styles.stat}>
                    <Text style={styles.statValue}>{progress.new}</Text>
                    <Text style={styles.statLabel}>New</Text>
                </View>
            </View>

            <View style={styles.progressContainer}>
                <ProgressBar progress={progress.percentage} />
                <View style={styles.progressInfo}>
                    <Text style={styles.progressText}>
                        {progress.percentage}% Complete
                    </Text>
                    <View
                        style={[
                            styles.statusBadge,
                            styles[`status${statusLabel}`],
                        ]}
                    >
                        <Text style={styles.statusText}>
                            {statusLabel === "in-progress"
                                ? "In Progress"
                                : statusLabel.charAt(0).toUpperCase() +
                                  statusLabel.slice(1)}
                        </Text>
                    </View>
                </View>
            </View>

            <View style={styles.dateContainer}>
                <Text style={styles.dateText}>
                    Updated: {formatDate(new Date())}
                </Text>
                {/* <Text style={styles.dateText}>Updated: {formatDate(list.updatedAt)}</Text> */}
            </View>

            <View style={styles.actionsContainer}>
                <TouchableOpacity
                    style={[styles.actionButton, styles.learnButton]}
                    onPress={handleLearnPress}
                >
                    <BookOpen size={18} color={colors.text} />
                    <Text style={styles.actionText}>Learn</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.actionButton, styles.quizButton]}
                    onPress={handleQuizPress}
                >
                    <Brain size={18} color={colors.text} />
                    <Text style={styles.actionText}>Quiz</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.actionButton, styles.detailsButton]}
                    onPress={handleDetailsPress}
                >
                    <Info size={18} color={colors.text} />
                    <Text style={styles.actionText}>Details</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.cardBackground,
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    header: {
        marginBottom: 8,
    },
    titleContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 4,
    },
    title: {
        fontSize: 18,
        fontWeight: "600",
        color: colors.text,
        flex: 1,
    },
    favoriteButton: {
        padding: 4,
    },
    language: {
        fontSize: 14,
        color: colors.accent,
        fontWeight: "500",
    },
    description: {
        fontSize: 14,
        color: colors.textSecondary,
        marginBottom: 12,
    },
    statsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 12,
        paddingVertical: 8,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: colors.border,
    },
    stat: {
        alignItems: "center",
    },
    statValue: {
        fontSize: 16,
        fontWeight: "600",
        color: colors.text,
    },
    statLabel: {
        fontSize: 12,
        color: colors.textSecondary,
        marginTop: 2,
    },
    progressContainer: {
        marginBottom: 12,
    },
    progressInfo: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 6,
    },
    progressText: {
        fontSize: 14,
        color: colors.textSecondary,
    },
    statusBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    statusnew: {
        backgroundColor: "rgba(33, 150, 243, 0.2)",
    },
    "statusin-progress": {
        backgroundColor: "rgba(255, 193, 7, 0.2)",
    },
    statuscompleted: {
        backgroundColor: "rgba(76, 175, 80, 0.2)",
    },
    statusText: {
        fontSize: 12,
        fontWeight: "500",
        color: colors.text,
    },
    dateContainer: {
        marginBottom: 12,
    },
    dateText: {
        fontSize: 12,
        color: colors.textSecondary,
    },
    actionsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    actionButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
        flex: 1,
        marginHorizontal: 4,
    },
    learnButton: {
        backgroundColor: colors.primary,
    },
    quizButton: {
        backgroundColor: colors.accent,
    },
    detailsButton: {
        backgroundColor: colors.border,
    },
    actionText: {
        color: colors.text,
        fontWeight: "500",
        fontSize: 14,
        marginLeft: 6,
    },
});
