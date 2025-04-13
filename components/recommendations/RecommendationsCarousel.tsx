import React from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { COLORS } from "@/constants/colors";
import { RecommendationItem } from "@/types/recommendation";
import { RecommendationCard } from "./RecommendationCard";
import { ChevronRight } from "lucide-react-native";

interface RecommendationsCarouselProps {
    title: string;
    items: RecommendationItem[];
    onItemPress?: (item: RecommendationItem) => void;
    onSeeAllPress?: () => void;
    style?: any;
    cardSize?: "small" | "medium" | "large";
    showSeeAll?: boolean;
}

export const RecommendationsCarousel: React.FC<
    RecommendationsCarouselProps
> = ({
    title,
    items,
    onItemPress,
    onSeeAllPress,
    style,
    cardSize = "medium",
    showSeeAll = true,
}) => {
    if (items.length === 0) {
        return null;
    }

    return (
        <View style={[styles.container, style]}>
            <View style={styles.header}>
                <Text style={styles.title}>{title}</Text>

                {showSeeAll && onSeeAllPress && (
                    <Pressable
                        style={styles.seeAllButton}
                        onPress={onSeeAllPress}
                        hitSlop={10}
                    >
                        <Text style={styles.seeAllText}>See All</Text>
                        <ChevronRight size={16} color={COLORS.accent} />
                    </Pressable>
                )}
            </View>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.carouselContent}
            >
                {items.map((item) => (
                    <RecommendationCard
                        key={item.id}
                        item={item}
                        onPress={() => onItemPress && onItemPress(item)}
                        style={styles.card}
                        size={cardSize}
                    />
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 24,
        paddingHorizontal: 8,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: COLORS.text,
    },
    seeAllButton: {
        flexDirection: "row",
        alignItems: "center",
    },
    seeAllText: {
        color: COLORS.accent,
        fontSize: 14,
        fontWeight: "500",
    },
    carouselContent: {
        paddingRight: 16,
    },
    card: {
        marginRight: 16,
    },
});
