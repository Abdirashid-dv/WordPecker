import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ProgressOverview } from "@/components/progress/ProgressOverview";
import { RecommendationsSection } from "@/components/recommendations/RecommendationsSection";
import { QuickActionsGrid } from "@/components/quickActions/QuickActionsGrid";
import { MotivationAndGoals } from "@/components/motivation/MotivationAndGoals";
import { COLORS } from "@/constants/colors";

export default function HomeScreen() {
    return (
        <SafeAreaView style={styles.container} edges={["right", "left"]}>
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
            >
                <QuickActionsGrid />
                <MotivationAndGoals />
                <ProgressOverview />
                <RecommendationsSection />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    scrollView: {
        flex: 1,
    },
    contentContainer: {
        paddingBottom: 32,
    },
});
