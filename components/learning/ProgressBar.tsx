import React from "react";
import { StyleSheet, View, Animated } from "react-native";
import { colors } from "@/constants/colors";

interface ProgressBarProps {
    current: number;
    total: number;
}

const ProgressBar = ({ current, total }: ProgressBarProps) => {
    const progress = current / total;

    return (
        <View style={styles.container}>
            <View style={styles.background}>
                <View style={[styles.fill, { width: `${progress * 100}%` }]} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 8,
    },
    background: {
        height: 8,
        backgroundColor: colors.progressBackground,
        borderRadius: 4,
        overflow: "hidden",
    },
    fill: {
        height: "100%",
        backgroundColor: colors.accent,
        borderRadius: 4,
    },
});

export default ProgressBar;
