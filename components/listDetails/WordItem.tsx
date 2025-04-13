import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Alert } from "react-native";
import {
    Edit,
    Trash2,
    CheckCircle,
    Circle,
    HelpCircle,
} from "lucide-react-native";
import { colors } from "@/constants/colors";
import { Word } from "@/types/wordList";
import { EditWordModal } from "./EditWordModal";

interface WordItemProps {
    word: Word;
    onEdit: (wordId: string, updates: Partial<Word>) => void;
    onDelete: (wordId: string) => void;
    onToggleStatus: (wordId: string) => void;
}

export const WordItem: React.FC<WordItemProps> = ({
    word,
    onEdit,
    onDelete,
    onToggleStatus,
}) => {
    const [showEditModal, setShowEditModal] = useState(false);

    const handleEditPress = () => {
        setShowEditModal(true);
    };

    const handleEditSubmit = (updates: Partial<Word>) => {
        onEdit(word.id, updates);
        setShowEditModal(false);
    };

    const handleDeletePress = () => {
        Alert.alert(
            "Delete Word",
            `Are you sure you want to delete "${word.term}"?`,
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: () => onDelete(word.id),
                },
            ]
        );
    };

    const handleToggleStatus = () => {
        onToggleStatus(word.id);
    };

    const getStatusIcon = () => {
        switch (word.status) {
            case "mastered":
                return (
                    <CheckCircle
                        size={24}
                        color={colors.primary}
                        fill={colors.primary}
                    />
                );
            case "learning":
                return <HelpCircle size={24} color={colors.highlight} />;
            case "new":
            default:
                return <Circle size={24} color={colors.textSecondary} />;
        }
    };

    const getStatusText = () => {
        switch (word.status) {
            case "mastered":
                return "Mastered";
            case "learning":
                return "Learning";
            case "new":
            default:
                return "New";
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.statusButton}
                onPress={handleToggleStatus}
            >
                {getStatusIcon()}
            </TouchableOpacity>

            <View style={styles.content}>
                <Text style={styles.term}>{word.term}</Text>
                <Text style={styles.definition}>{word.definition}</Text>

                {word.example ? (
                    <Text style={styles.example}>"{word.example}"</Text>
                ) : null}

                <View style={styles.statusContainer}>
                    <Text
                        style={[
                            styles.statusText,
                            word.status === "mastered" && styles.masteredText,
                            word.status === "learning" && styles.learningText,
                            word.status === "new" && styles.newText,
                        ]}
                    >
                        {getStatusText()}
                    </Text>

                    {word.lastReviewed && (
                        // <Text style={styles.reviewedText}>
                        //   Last reviewed: {word.lastReviewed.toLocaleDateString()}
                        // </Text>
                        <Text style={styles.reviewedText}>
                            Last reviewed: {new Date().toLocaleDateString()}
                        </Text>
                    )}
                </View>
            </View>

            <View style={styles.actions}>
                <TouchableOpacity
                    style={styles.actionButton}
                    onPress={handleEditPress}
                >
                    <Edit size={20} color={colors.accent} />
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.actionButton}
                    onPress={handleDeletePress}
                >
                    <Trash2 size={20} color={colors.error} />
                </TouchableOpacity>
            </View>

            {showEditModal && (
                <EditWordModal
                    word={word}
                    onSubmit={handleEditSubmit}
                    onClose={() => setShowEditModal(false)}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
        alignItems: "center",
    },
    statusButton: {
        marginRight: 12,
    },
    content: {
        flex: 1,
    },
    term: {
        fontSize: 18,
        fontWeight: "600",
        color: colors.text,
        marginBottom: 4,
    },
    definition: {
        fontSize: 16,
        color: colors.textSecondary,
        marginBottom: 4,
    },
    example: {
        fontSize: 14,
        color: colors.textSecondary,
        fontStyle: "italic",
        marginBottom: 4,
    },
    statusContainer: {
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap",
    },
    statusText: {
        fontSize: 12,
        fontWeight: "500",
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 10,
        overflow: "hidden",
        marginRight: 8,
    },
    masteredText: {
        backgroundColor: `${colors.primary}30`,
        color: colors.primary,
    },
    learningText: {
        backgroundColor: `${colors.highlight}30`,
        color: colors.highlight,
    },
    newText: {
        backgroundColor: `${colors.accent}30`,
        color: colors.accent,
    },
    reviewedText: {
        fontSize: 12,
        color: colors.textSecondary,
    },
    actions: {
        flexDirection: "column",
        justifyContent: "space-between",
        height: 64,
    },
    actionButton: {
        padding: 6,
    },
});
