import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Flame } from "lucide-react-native";
import { colors } from "@/constants/colors";

interface StreakIndicatorProps {
    streak: number;
}

const StreakIndicator = ({ streak }: StreakIndicatorProps) => {
    if (streak <= 0) return null;

    return (
        <View style={styles.container}>
            <Flame size={20} color={colors.highlight} />
            <Text style={styles.streakText}>{streak} correct in a row!</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 8,
        gap: 8,
    },
    streakText: {
        color: colors.highlight,
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default StreakIndicator;
