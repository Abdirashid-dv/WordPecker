import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Pressable,
    Modal,
    Platform,
} from "react-native";
import { COLORS } from "@/constants/colors";
import { useRecommendations } from "@/hooks/useRecommendations";
import { RecommendationsCarousel } from "./RecommendationsCarousel";
import { RecommendationFilters } from "./RecommendationFilters";
import { RecommendationItem } from "@/types/recommendation";
import {
    FEATURED_SECTION_TITLE,
    NEW_CONTENT_SECTION_TITLE,
    RECOMMENDED_SECTION_TITLE,
} from "@/constants/recommendationConstants";
import { useRouter } from "expo-router";
import { X, ExternalLink } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export const RecommendationsSection: React.FC = () => {
    const router = useRouter();
    const {
        featuredRecommendations,
        newRecommendations,
        personalizedRecommendations,
        isLoading,
        error,
    } = useRecommendations();

    const [selectedItem, setSelectedItem] = useState<RecommendationItem | null>(
        null
    );
    const [showModal, setShowModal] = useState(false);

    // Handle item press
    const handleItemPress = (item: RecommendationItem) => {
        setSelectedItem(item);
        setShowModal(true);
    };

    // Handle see all press
    const handleSeeAllPress = (section: string) => {
        // Navigate to recommendations screen with filter
        // router.push(`/recommendations?section=${section}`);
        router.push(`/recommendations`);
        console.log(`Navigate to all ${section}`);
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

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>
                    Loading recommendations...
                </Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>
                    Failed to load recommendations
                </Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.sectionTitle}>Recommended Content</Text>

            <RecommendationFilters style={styles.filters} />

            {featuredRecommendations.length > 0 && (
                <RecommendationsCarousel
                    title={FEATURED_SECTION_TITLE}
                    items={featuredRecommendations.slice(0, 5)}
                    onItemPress={handleItemPress}
                    onSeeAllPress={() => handleSeeAllPress("featured")}
                    cardSize="medium"
                />
            )}

            {newRecommendations.length > 0 && (
                <RecommendationsCarousel
                    title={NEW_CONTENT_SECTION_TITLE}
                    items={newRecommendations.slice(0, 5)}
                    onItemPress={handleItemPress}
                    onSeeAllPress={() => handleSeeAllPress("new")}
                    cardSize="medium"
                />
            )}

            {personalizedRecommendations.length > 0 && (
                <RecommendationsCarousel
                    title={RECOMMENDED_SECTION_TITLE}
                    items={personalizedRecommendations.slice(0, 5)}
                    onItemPress={handleItemPress}
                    onSeeAllPress={() => handleSeeAllPress("recommended")}
                    cardSize="medium"
                />
            )}

            {/* Item Detail Modal */}
            {Platform.OS !== "web" ? (
                <Modal
                    visible={showModal}
                    animationType="slide"
                    transparent={true}
                    onRequestClose={closeModal}
                >
                    <SafeAreaView style={styles.modalContainer}>
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
                    </SafeAreaView>
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
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 16,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: "bold",
        color: COLORS.text,
        marginBottom: 16,
        paddingHorizontal: 8,
    },
    filters: {
        marginHorizontal: 8,
    },
    loadingContainer: {
        padding: 16,
        alignItems: "center",
    },
    loadingText: {
        color: COLORS.textSecondary,
        fontSize: 16,
    },
    errorContainer: {
        padding: 16,
        alignItems: "center",
    },
    errorText: {
        color: COLORS.error,
        fontSize: 16,
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
});
