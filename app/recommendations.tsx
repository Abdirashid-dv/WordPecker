import React, { useState } from "react";
import {
    StyleSheet,
    View,
    Text,
    FlatList,
    Pressable,
    Modal,
    Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "@/constants/colors";
import { useRecommendations } from "@/hooks/useRecommendations";
import { RecommendationCard } from "@/components/recommendations/RecommendationCard";
import { RecommendationFilters } from "@/components/recommendations/RecommendationFilters";
import { RecommendationItem } from "@/types/recommendation";
import { X, ExternalLink } from "lucide-react-native";
import { ScrollView } from "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Stack } from "expo-router";

export default function RecommendationsScreen() {
    const { filteredRecommendations, isLoading, error } = useRecommendations();

    const [selectedItem, setSelectedItem] = useState<RecommendationItem | null>(
        null
    );
    const [showModal, setShowModal] = useState(false);

    // Handle item press
    const handleItemPress = (item: RecommendationItem) => {
        setSelectedItem(item);
        setShowModal(true);
    };

    // Handle external link press
    const handleExternalLinkPress = () => {
        if (selectedItem) {
            // Open external link
            // Linking.openURL(selectedItem.url);
            console.log(`Open external link: ${selectedItem.url}`);
        }
        setShowModal(false);
    };

    // Close modal
    const closeModal = () => {
        setShowModal(false);
    };

    // Render item
    const renderItem = ({ item }: { item: RecommendationItem }) => (
        <RecommendationCard
            item={item}
            onPress={() => handleItemPress(item)}
            style={styles.card}
            size="large"
        />
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
                    title: "Recommendations",
                    headerTitleStyle: styles.headerTitle,
                    headerShadowVisible: false,
                }}
            />
            <View style={styles.content}>
                <RecommendationFilters style={styles.filters} />

                {isLoading ? (
                    <View style={styles.loadingContainer}>
                        <Text style={styles.loadingText}>
                            Loading recommendations...
                        </Text>
                    </View>
                ) : error ? (
                    <View style={styles.errorContainer}>
                        <Text style={styles.errorText}>
                            Failed to load recommendations
                        </Text>
                    </View>
                ) : filteredRecommendations.length === 0 ? (
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>
                            No recommendations found
                        </Text>
                        <Text style={styles.emptySubtext}>
                            Try adjusting your filters
                        </Text>
                    </View>
                ) : (
                    <FlatList
                        data={filteredRecommendations}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={styles.listContent}
                        showsVerticalScrollIndicator={false}
                    />
                )}
            </View>

            {/* Item Detail Modal */}
            {Platform.OS !== "web" ? (
                <Modal
                    visible={showModal}
                    animationType="slide"
                    transparent={true}
                    onRequestClose={closeModal}
                >
                    <GestureHandlerRootView style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <View style={styles.modalHeader}>
                                <Text style={styles.modalTitle}>
                                    {selectedItem?.title}
                                </Text>
                                <Pressable
                                    style={styles.closeButton}
                                    onPress={closeModal}
                                >
                                    <X size={24} color={COLORS.textSecondary} />
                                </Pressable>
                            </View>

                            {selectedItem && (
                                <ScrollView style={styles.modalBody}>
                                    <Text style={styles.modalDescription}>
                                        {selectedItem.description}
                                    </Text>

                                    <View style={styles.modalDetails}>
                                        <View style={styles.modalDetailItem}>
                                            <Text
                                                style={styles.modalDetailLabel}
                                            >
                                                Source:
                                            </Text>
                                            <Text
                                                style={styles.modalDetailValue}
                                            >
                                                {selectedItem.source}
                                            </Text>
                                        </View>

                                        <View style={styles.modalDetailItem}>
                                            <Text
                                                style={styles.modalDetailLabel}
                                            >
                                                Level:
                                            </Text>
                                            <Text
                                                style={styles.modalDetailValue}
                                            >
                                                {selectedItem.level}
                                            </Text>
                                        </View>

                                        <View style={styles.modalDetailItem}>
                                            <Text
                                                style={styles.modalDetailLabel}
                                            >
                                                Genre:
                                            </Text>
                                            <Text
                                                style={styles.modalDetailValue}
                                            >
                                                {selectedItem.genre}
                                            </Text>
                                        </View>
                                    </View>

                                    <Pressable
                                        style={styles.externalLinkButton}
                                        onPress={handleExternalLinkPress}
                                    >
                                        <Text style={styles.externalLinkText}>
                                            Open Content
                                        </Text>
                                        <ExternalLink
                                            size={16}
                                            color={COLORS.text}
                                        />
                                    </Pressable>
                                </ScrollView>
                            )}
                        </View>
                    </GestureHandlerRootView>
                </Modal>
            ) : (
                showModal &&
                selectedItem && (
                    <View style={styles.webModalOverlay}>
                        <View style={styles.webModalContent}>
                            <View style={styles.modalHeader}>
                                <Text style={styles.modalTitle}>
                                    {selectedItem.title}
                                </Text>
                                <Pressable
                                    style={styles.closeButton}
                                    onPress={closeModal}
                                >
                                    <X size={24} color={COLORS.textSecondary} />
                                </Pressable>
                            </View>

                            <ScrollView style={styles.modalBody}>
                                <Text style={styles.modalDescription}>
                                    {selectedItem.description}
                                </Text>

                                <View style={styles.modalDetails}>
                                    <View style={styles.modalDetailItem}>
                                        <Text style={styles.modalDetailLabel}>
                                            Source:
                                        </Text>
                                        <Text style={styles.modalDetailValue}>
                                            {selectedItem.source}
                                        </Text>
                                    </View>

                                    <View style={styles.modalDetailItem}>
                                        <Text style={styles.modalDetailLabel}>
                                            Level:
                                        </Text>
                                        <Text style={styles.modalDetailValue}>
                                            {selectedItem.level}
                                        </Text>
                                    </View>

                                    <View style={styles.modalDetailItem}>
                                        <Text style={styles.modalDetailLabel}>
                                            Genre:
                                        </Text>
                                        <Text style={styles.modalDetailValue}>
                                            {selectedItem.genre}
                                        </Text>
                                    </View>
                                </View>

                                <Pressable
                                    style={styles.externalLinkButton}
                                    onPress={handleExternalLinkPress}
                                >
                                    <Text style={styles.externalLinkText}>
                                        Open Content
                                    </Text>
                                    <ExternalLink
                                        size={16}
                                        color={COLORS.text}
                                    />
                                </Pressable>
                            </ScrollView>
                        </View>
                    </View>
                )
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    content: {
        flex: 1,
        padding: 16,
    },
    filters: {
        marginBottom: 16,
    },
    listContent: {
        paddingBottom: 16,
    },
    card: {
        marginBottom: 16,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    loadingText: {
        color: COLORS.textSecondary,
        fontSize: 16,
    },
    errorContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    errorText: {
        color: COLORS.error,
        fontSize: 16,
        marginBottom: 8,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    emptyText: {
        color: COLORS.text,
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 8,
    },
    emptySubtext: {
        color: COLORS.textSecondary,
        fontSize: 14,
    },
    modalContainer: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "flex-end",
    },
    modalContent: {
        backgroundColor: COLORS.background,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingTop: 16,
        paddingHorizontal: 16,
        maxHeight: "80%",
    },
    modalHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: COLORS.text,
        flex: 1,
        marginRight: 16,
    },
    closeButton: {
        padding: 4,
    },
    modalBody: {
        paddingBottom: 24,
    },
    modalDescription: {
        fontSize: 16,
        color: COLORS.text,
        lineHeight: 24,
        marginBottom: 16,
    },
    modalDetails: {
        backgroundColor: COLORS.surface,
        borderRadius: 12,
        padding: 16,
        marginBottom: 24,
    },
    modalDetailItem: {
        flexDirection: "row",
        marginBottom: 8,
    },
    modalDetailLabel: {
        fontSize: 14,
        fontWeight: "600",
        color: COLORS.text,
        width: 80,
    },
    modalDetailValue: {
        fontSize: 14,
        color: COLORS.textSecondary,
        flex: 1,
    },
    externalLinkButton: {
        backgroundColor: COLORS.primary,
        borderRadius: 12,
        paddingVertical: 14,
        paddingHorizontal: 20,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    externalLinkText: {
        color: COLORS.text,
        fontSize: 16,
        fontWeight: "600",
        marginRight: 8,
    },
    webModalOverlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
    },
    webModalContent: {
        backgroundColor: COLORS.background,
        borderRadius: 20,
        padding: 16,
        width: "80%",
        maxWidth: 500,
        maxHeight: "80%",
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
