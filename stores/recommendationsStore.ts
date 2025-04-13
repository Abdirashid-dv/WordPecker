import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    ContentGenre,
    ContentLength,
    ContentType,
    LanguageLevel,
    RecommendationFilters,
    RecommendationItem,
    UserPreferences,
} from "@/types/recommendation";
import {
    mockRecommendations,
    mockUserPreferences,
} from "@/mockData/recommendationData";
import { DEFAULT_FILTERS } from "@/constants/recommendationConstants";
import {
    filterRecommendations,
    getFeaturedRecommendations,
    getNewRecommendations,
    getPersonalizedRecommendations,
} from "@/utils/recommendationUtils";

interface RecommendationsState {
    recommendations: RecommendationItem[];
    filteredRecommendations: RecommendationItem[];
    featuredRecommendations: RecommendationItem[];
    newRecommendations: RecommendationItem[];
    personalizedRecommendations: RecommendationItem[];
    userPreferences: UserPreferences;
    filters: RecommendationFilters;
    isLoading: boolean;
    error: string | null;

    // Actions
    setRecommendations: (recommendations: RecommendationItem[]) => void;
    setUserPreferences: (preferences: Partial<UserPreferences>) => void;
    setFilters: (filters: Partial<RecommendationFilters>) => void;
    resetFilters: () => void;
    saveItem: (itemId: string) => void;
    unsaveItem: (itemId: string) => void;
    fetchRecommendations: () => Promise<void>;
}

export const useRecommendationsStore = create<RecommendationsState>()(
    persist(
        (set, get) => ({
            recommendations: mockRecommendations,
            filteredRecommendations: mockRecommendations,
            featuredRecommendations:
                getFeaturedRecommendations(mockRecommendations),
            newRecommendations: getNewRecommendations(mockRecommendations),
            personalizedRecommendations: getPersonalizedRecommendations(
                mockRecommendations,
                mockUserPreferences
            ),
            userPreferences: mockUserPreferences,
            filters: DEFAULT_FILTERS,
            isLoading: false,
            error: null,

            setRecommendations: (recommendations) => {
                const { userPreferences, filters } = get();

                set({
                    recommendations,
                    filteredRecommendations: filterRecommendations(
                        recommendations,
                        filters
                    ),
                    featuredRecommendations:
                        getFeaturedRecommendations(recommendations),
                    newRecommendations: getNewRecommendations(recommendations),
                    personalizedRecommendations: getPersonalizedRecommendations(
                        recommendations,
                        userPreferences
                    ),
                });
            },

            setUserPreferences: (preferences) => {
                const { recommendations } = get();
                const updatedPreferences = {
                    ...get().userPreferences,
                    ...preferences,
                };

                set({
                    userPreferences: updatedPreferences,
                    personalizedRecommendations: getPersonalizedRecommendations(
                        recommendations,
                        updatedPreferences
                    ),
                });
            },

            setFilters: (filters) => {
                const { recommendations } = get();
                const updatedFilters = { ...get().filters, ...filters };

                set({
                    filters: updatedFilters,
                    filteredRecommendations: filterRecommendations(
                        recommendations,
                        updatedFilters
                    ),
                });
            },

            resetFilters: () => {
                const { recommendations } = get();

                set({
                    filters: DEFAULT_FILTERS,
                    filteredRecommendations: filterRecommendations(
                        recommendations,
                        DEFAULT_FILTERS
                    ),
                });
            },

            saveItem: (itemId) => {
                const { userPreferences } = get();

                // Check if item is already saved
                if (userPreferences.savedItems.includes(itemId)) {
                    return;
                }

                // Add item to saved items
                const updatedSavedItems = [
                    ...userPreferences.savedItems,
                    itemId,
                ];

                set({
                    userPreferences: {
                        ...userPreferences,
                        savedItems: updatedSavedItems,
                    },
                });
            },

            unsaveItem: (itemId) => {
                const { userPreferences } = get();

                // Remove item from saved items
                const updatedSavedItems = userPreferences.savedItems.filter(
                    (id) => id !== itemId
                );

                set({
                    userPreferences: {
                        ...userPreferences,
                        savedItems: updatedSavedItems,
                    },
                });
            },

            fetchRecommendations: async () => {
                const { userPreferences, filters } = get();

                set({ isLoading: true, error: null });

                try {
                    // In a real app, this would be an API call
                    // For now, we'll just use the mock data with a timeout
                    // await new Promise((resolve) => setTimeout(resolve, 500));

                    set({
                        recommendations: mockRecommendations,
                        filteredRecommendations: filterRecommendations(
                            mockRecommendations,
                            filters
                        ),
                        featuredRecommendations:
                            getFeaturedRecommendations(mockRecommendations),
                        newRecommendations:
                            getNewRecommendations(mockRecommendations),
                        personalizedRecommendations:
                            getPersonalizedRecommendations(
                                mockRecommendations,
                                userPreferences
                            ),
                        isLoading: false,
                    });
                } catch (error) {
                    set({
                        error: "Failed to fetch recommendations",
                        isLoading: false,
                    });
                }
            },
        }),
        {
            name: "wordpecker-recommendations",
            storage: createJSONStorage(() => AsyncStorage),
            partialize: (state) => ({
                userPreferences: state.userPreferences,
                filters: state.filters,
            }),
        }
    )
);
