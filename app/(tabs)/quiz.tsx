import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import QuizMode from "@/components/quiz/QuizMode";
import QuizSettings from "@/components/quiz/QuizSettings";
import { useQuizStore } from "@/stores/quizStore";
import { colors } from "@/constants/colors";

export default function QuizScreen() {
    const { settings, updateSettings } = useQuizStore();
    const [showSettings, setShowSettings] = useState(true);

    const handleSaveSettings = () => {
        setShowSettings(false);
    };

    return (
        <SafeAreaView style={styles.container} edges={["left", "right"]}>
            <Stack.Screen
                options={{
                    title: showSettings ? "Quiz Settings" : "Quiz Mode",
                    headerStyle: styles.header,
                    headerTintColor: colors.text,
                }}
            />
            <View style={styles.content}>
                {showSettings ? (
                    <QuizSettings
                        settings={settings}
                        onUpdateSettings={updateSettings}
                        onSave={handleSaveSettings}
                    />
                ) : (
                    <QuizMode />
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
