import React from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { WordLists } from "@/components/library/WordLists";
import { colors } from "@/constants/colors";

export default function LibraryScreen() {
    return (
        <SafeAreaView style={styles.container} edges={["left", "right"]}>
            <Stack.Screen
                options={{
                    title: "My Word Lists",
                    headerStyle: styles.header,
                    headerTitleStyle: styles.headerTitle,
                    headerShadowVisible: false,
                }}
            />
            <View style={styles.content}>
                <WordLists />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    content: {
        flex: 1,
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
