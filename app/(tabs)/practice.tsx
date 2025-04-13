import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import AdvancedLearning from "@/components/learning/AdvancedLearning";
import LearningHistory from "@/components/learning/LearningHistory";
import { colors } from "@/constants/colors";

export default function PracticeScreen() {
    const [showHistory, setShowHistory] = useState(false);

    return (
        <SafeAreaView style={styles.container} edges={["left", "right"]}>
            <Stack.Screen
                options={{
                    title: showHistory ? "Learning History" : "Learning Mode",
                    headerStyle: styles.header,
                    headerTintColor: colors.text,
                }}
            />
            <View style={styles.content}>
                {showHistory ? (
                    <LearningHistory onClose={() => setShowHistory(false)} />
                ) : (
                    <AdvancedLearning />
                )}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    header: {
        backgroundColor: colors.background,
    },
    content: {
        flex: 1,
    },
});
