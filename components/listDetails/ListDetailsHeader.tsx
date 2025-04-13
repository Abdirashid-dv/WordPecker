import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Alert } from "react-native";
import { Star, StarOff, Edit, Trash2 } from "lucide-react-native";
import { colors } from "@/constants/colors";
import { WordList } from "@/types/wordList";
import { formatDate } from "@/utils/wordListUtils";
import { EditListModal } from "./EditListModal";

interface ListDetailsHeaderProps {
    list: WordList;
    onEdit: (updates: Partial<WordList>) => void;
    onDelete: () => void;
}

export const ListDetailsHeader: React.FC<ListDetailsHeaderProps> = ({
    list,
    onEdit,
    onDelete,
}) => {
    const [showEditModal, setShowEditModal] = useState(false);

    const handleToggleFavorite = () => {
        onEdit({ isFavorite: !list.isFavorite });
    };

    const handleEditPress = () => {
        setShowEditModal(true);
    };

    const handleEditSubmit = (updates: Partial<WordList>) => {
        onEdit(updates);
        setShowEditModal(false);
    };

    const handleDeletePress = () => {
        Alert.alert(
            "Delete List",
            `Are you sure you want to delete "${list.name}"? This action cannot be undone.`,
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: onDelete,
                },
            ]
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{list.name}</Text>
                    <TouchableOpacity
                        style={styles.favoriteButton}
                        onPress={handleToggleFavorite}
                    >
                        {list.isFavorite ? (
                            <Star
                                size={24}
                                color={colors.highlight}
                                fill={colors.highlight}
                            />
                        ) : (
                            <StarOff size={24} color={colors.textSecondary} />
                        )}
                    </TouchableOpacity>
                </View>

                <Text style={styles.language}>{list.language}</Text>
            </View>

            {list.description ? (
                <Text style={styles.description}>{list.description}</Text>
            ) : null}

            <View style={styles.metaContainer}>
                <View style={styles.tagsContainer}>
                    {list.tags.length > 0 ? (
                        list.tags.map((tag, index) => (
                            <View key={index} style={styles.tag}>
                                <Text style={styles.tagText}>{tag}</Text>
                            </View>
                        ))
                    ) : (
                        <Text style={styles.noTags}>No tags</Text>
                    )}
                </View>
                {/*         
        <Text style={styles.dateText}>
          Created: {formatDate(list.createdAt)}
        </Text>
        <Text style={styles.dateText}>
          Updated: {formatDate(list.updatedAt)}
        </Text> */}
                <Text style={styles.dateText}>
                    Created: {formatDate(new Date())}
                </Text>
                <Text style={styles.dateText}>
                    Updated: {formatDate(new Date())}
                </Text>
            </View>

            <View style={styles.actionsContainer}>
                <TouchableOpacity
                    style={[styles.actionButton, styles.editButton]}
                    onPress={handleEditPress}
                >
                    <Edit size={18} color={colors.text} />
                    <Text style={styles.actionText}>Edit List</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.actionButton, styles.deleteButton]}
                    onPress={handleDeletePress}
                >
                    <Trash2 size={18} color={colors.text} />
                    <Text style={styles.actionText}>Delete List</Text>
                </TouchableOpacity>
            </View>

            {showEditModal && (
                <EditListModal
                    list={list}
                    onSubmit={handleEditSubmit}
                    onClose={() => setShowEditModal(false)}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.cardBackground,
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
    },
    header: {
        marginBottom: 12,
    },
    titleContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 4,
    },
    title: {
        fontSize: 22,
        fontWeight: "700",
        color: colors.text,
        flex: 1,
    },
    favoriteButton: {
        padding: 4,
    },
    language: {
        fontSize: 16,
        color: colors.accent,
        fontWeight: "500",
    },
    description: {
        fontSize: 16,
        color: colors.textSecondary,
        marginBottom: 16,
        lineHeight: 22,
    },
    metaContainer: {
        marginBottom: 16,
    },
    tagsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginBottom: 12,
    },
    tag: {
        backgroundColor: `${colors.accent}30`,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
        marginRight: 8,
        marginBottom: 8,
    },
    tagText: {
        color: colors.accent,
        fontSize: 14,
        fontWeight: "500",
    },
    noTags: {
        color: colors.textSecondary,
        fontSize: 14,
        fontStyle: "italic",
    },
    dateText: {
        color: colors.textSecondary,
        fontSize: 14,
        marginBottom: 4,
    },
    actionsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    actionButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 8,
        flex: 1,
        marginHorizontal: 4,
    },
    editButton: {
        backgroundColor: colors.accent,
    },
    deleteButton: {
        backgroundColor: colors.error,
    },
    actionText: {
        color: colors.text,
        fontWeight: "500",
        fontSize: 14,
        marginLeft: 8,
    },
});
