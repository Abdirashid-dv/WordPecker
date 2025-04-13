import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { COLORS } from "@/constants/colors";
import { Quote, QuoteCategory } from "@/types/motivation";
import { QUOTE_CATEGORIES } from "@/constants/motivationConstants";
import { shareContent } from "@/utils/motivationUtils";
import {
    Quote as QuoteIcon,
    RefreshCw,
    Share2,
    Zap,
    BookOpen,
    Dumbbell,
    Award,
    Brain,
} from "lucide-react-native";

interface MotivationalQuoteProps {
    quote: Quote | null;
    onRefresh: () => void;
    style?: any;
}

export const MotivationalQuote: React.FC<MotivationalQuoteProps> = ({
    quote,
    onRefresh,
    style,
}) => {
    if (!quote) {
        return (
            <View style={[styles.container, styles.emptyContainer, style]}>
                <Text style={styles.emptyText}>No quote available</Text>
                <Pressable style={styles.refreshButton} onPress={onRefresh}>
                    <RefreshCw size={20} color={COLORS.textSecondary} />
                    <Text style={styles.refreshText}>Refresh</Text>
                </Pressable>
            </View>
        );
    }

    // Get category info
    const categoryKey = quote.category ? quote.category.toLowerCase() : "";
    const categoryInfo = QUOTE_CATEGORIES[
        categoryKey as keyof typeof QUOTE_CATEGORIES
    ] || {
        label: "Quote",
        color: COLORS.accent,
        icon: "Quote",
    };

    // Render category icon
    const renderCategoryIcon = () => {
        const iconSize = 20;
        const iconColor = categoryInfo.color;

        switch (quote.category) {
            case QuoteCategory.MOTIVATION:
                return <Zap size={iconSize} color={iconColor} />;
            case QuoteCategory.LEARNING:
                return <BookOpen size={iconSize} color={iconColor} />;
            case QuoteCategory.PERSEVERANCE:
                return <Dumbbell size={iconSize} color={iconColor} />;
            case QuoteCategory.SUCCESS:
                return <Award size={iconSize} color={iconColor} />;
            case QuoteCategory.WISDOM:
                return <Brain size={iconSize} color={iconColor} />;
            default:
                return <QuoteIcon size={iconSize} color={iconColor} />;
        }
    };

    // Handle share button press
    const handleShare = () => {
        shareContent(
            `"${quote.content}" - ${quote.author}`,
            "WordPecker Inspiration"
        );
    };

    return (
        <View style={[styles.container, style]}>
            <View style={styles.header}>
                <View style={styles.categoryContainer}>
                    {renderCategoryIcon()}
                    <Text
                        style={[
                            styles.categoryText,
                            { color: categoryInfo.color },
                        ]}
                    >
                        {categoryInfo.label}
                    </Text>
                </View>

                <View style={styles.actions}>
                    <Pressable
                        style={styles.actionButton}
                        onPress={handleShare}
                        hitSlop={10}
                    >
                        <Share2 size={18} color={COLORS.textSecondary} />
                    </Pressable>

                    <Pressable
                        style={styles.actionButton}
                        onPress={onRefresh}
                        hitSlop={10}
                    >
                        <RefreshCw size={18} color={COLORS.textSecondary} />
                    </Pressable>
                </View>
            </View>

            <View style={styles.quoteContainer}>
                <QuoteIcon
                    size={24}
                    color={COLORS.textSecondary}
                    style={styles.quoteIcon}
                />
                <Text style={styles.quoteText}>{quote.content}</Text>
            </View>

            <Text style={styles.author}>— {quote.author}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.surface,
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
    },
    emptyContainer: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 24,
    },
    emptyText: {
        color: COLORS.textSecondary,
        fontSize: 16,
        marginBottom: 12,
    },
    refreshButton: {
        flexDirection: "row",
        alignItems: "center",
        padding: 8,
    },
    refreshText: {
        color: COLORS.textSecondary,
        fontSize: 14,
        marginLeft: 8,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 12,
    },
    categoryContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    categoryText: {
        fontSize: 14,
        fontWeight: "600",
        marginLeft: 8,
    },
    actions: {
        flexDirection: "row",
        alignItems: "center",
    },
    actionButton: {
        padding: 4,
        marginLeft: 12,
    },
    quoteContainer: {
        flexDirection: "row",
        marginBottom: 12,
    },
    quoteIcon: {
        marginRight: 8,
        marginTop: 4,
    },
    quoteText: {
        fontSize: 16,
        color: COLORS.text,
        lineHeight: 24,
        fontStyle: "italic",
        flex: 1,
    },
    author: {
        fontSize: 14,
        color: COLORS.textSecondary,
        textAlign: "right",
        marginTop: 8,
    },
});
