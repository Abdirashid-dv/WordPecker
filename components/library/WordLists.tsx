import React, { useCallback } from "react";
import {
    StyleSheet,
    FlatList,
    View,
    RefreshControl,
    Platform,
    TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import Animated, {
    useAnimatedScrollHandler,
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    interpolate,
    Extrapolate,
} from "react-native-reanimated";
import { Plus } from "lucide-react-native";
import { useWordLists } from "@/hooks/useWordLists";
import { WordListItem } from "./WordListItem";
import { FilterBar } from "./FilterBar";
import { EmptyState } from "./EmptyState";
import { colors } from "@/constants/colors";
import { WordList } from "@/types/wordList";

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export const WordLists: React.FC = () => {
    const router = useRouter();
    const {
        lists,
        refreshing,
        sortOption,
        filterOptions,
        availableLanguages,
        activeFiltersCount,
        handleRefresh,
        handleSortChange,
        handleLanguageFilterChange,
        handleStatusFilterChange,
        handleFavoriteFilterToggle,
        handleToggleFavorite,
        handleResetFilters,
    } = useWordLists();

    const scrollY = useSharedValue(0);

    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            scrollY.value = event.contentOffset.y;
        },
    });

    const headerAnimatedStyle = useAnimatedStyle(() => {
        const opacity = interpolate(
            scrollY.value,
            [0, 50],
            [1, 0.9],
            Extrapolate.CLAMP
        );

        const translateY = interpolate(
            scrollY.value,
            [-50, 0, 50],
            [10, 0, -5],
            Extrapolate.CLAMP
        );

        return {
            opacity,
            transform: [{ translateY }],
        };
    });

    const handleCreateList = useCallback(() => {
        router.push("/create-list");
    }, [router]);

    const renderItem = useCallback(
        ({ item }: { item: WordList }) => {
            return (
                <WordListItem
                    list={item}
                    onToggleFavorite={handleToggleFavorite}
                />
            );
        },
        [handleToggleFavorite]
    );

    const keyExtractor = useCallback((item: WordList) => item.id, []);

    const ListHeaderComponent = useCallback(() => {
        return (
            <Animated.View
                style={[styles.headerContainer, headerAnimatedStyle]}
            >
                <FilterBar
                    sortOption={sortOption}
                    onSortChange={handleSortChange}
                    availableLanguages={availableLanguages}
                    onLanguageFilterChange={handleLanguageFilterChange}
                    onStatusFilterChange={handleStatusFilterChange}
                    onFavoriteFilterToggle={handleFavoriteFilterToggle}
                    onResetFilters={handleResetFilters}
                    activeFiltersCount={activeFiltersCount}
                    filterOptions={filterOptions}
                />
            </Animated.View>
        );
    }, [
        sortOption,
        availableLanguages,
        activeFiltersCount,
        filterOptions,
        handleSortChange,
        handleLanguageFilterChange,
        handleStatusFilterChange,
        handleFavoriteFilterToggle,
        handleResetFilters,
    ]);

    if (lists.length === 0) {
        return <EmptyState onCreateList={handleCreateList} />;
    }

    return (
        <View style={styles.container}>
            <AnimatedFlatList
                data={lists}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={ListHeaderComponent}
                onScroll={scrollHandler}
                scrollEventThrottle={16}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={handleRefresh}
                        tintColor={colors.primary}
                        colors={[colors.primary, colors.accent]}
                        progressBackgroundColor={colors.cardBackground}
                    />
                }
            />

            <TouchableOpacity style={styles.fab} onPress={handleCreateList}>
                <Plus size={24} color={colors.text} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    listContent: {
        padding: 16,
        paddingBottom: Platform.OS === "ios" ? 32 : 16,
    },
    headerContainer: {
        marginBottom: 8,
    },
    fab: {
        position: "absolute",
        bottom: 20,
        right: 20,
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: colors.primary,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
});
