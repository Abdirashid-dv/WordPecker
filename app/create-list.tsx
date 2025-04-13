import React from "react";
import {
    StyleSheet,
    View,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useRouter } from "expo-router";
import { colors } from "@/constants/colors";
import { CreateListForm } from "@/components/library/CreateListForm";

export default function CreateListScreen() {
    const router = useRouter();

    const handleClose = () => {
        router.back();
    };

    return (
        <SafeAreaView style={styles.container} edges={["bottom"]}>
            <Stack.Screen
                options={{
                    headerBackTitle: "Back",
                    title: "Create New List",
                    headerStyle: styles.header,
                    headerTitleStyle: styles.headerTitle,
                    headerShadowVisible: false,
                }}
            />
            <KeyboardAvoidingView
                style={styles.keyboardAvoid}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 20}
            >
                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    <CreateListForm onClose={handleClose} />
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    keyboardAvoid: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        padding: 16,
        paddingBottom: 40,
    },
    header: {
        backgroundColor: colors.background,
    },
    headerTitle: {
        color: colors.text,
        fontSize: 20,
        fontWeight: "600",
    },
});
