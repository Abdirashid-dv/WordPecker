import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "@/constants/colors";
import { Flame } from "lucide-react-native";
import { formatStreak } from "@/utils/streakUtils";

interface StreakCounterProps {
    streak: number;
    isActive?: boolean;
    size?: "small" | "medium" | "large";
    style?: any;
}

export const StreakCounter: React.FC<StreakCounterProps> = ({
    streak,
    isActive = true,
    size = "medium",
    style,
}) => {
    // Determine sizes based on the size prop
    const getSize = () => {
        switch (size) {
            case "small":
                return {
                    container: styles.containerSmall,
                    flame: 16,
                    text: styles.textSmall,
                };
            case "large":
                return {
                    container: styles.containerLarge,
                    flame: 28,
                    text: styles.textLarge,
                };
            default:
                return {
                    container: styles.containerMedium,
                    flame: 22,
                    text: styles.textMedium,
                };
        }
    };

    const sizeStyles = getSize();

    return (
        <View
            style={[
                styles.container,
                sizeStyles.container,
                isActive ? styles.active : styles.inactive,
                style,
            ]}
        >
            <Flame
                size={sizeStyles.flame}
                color={isActive ? COLORS.highlight : COLORS.disabled}
            />
            <Text
                style={[
                    styles.text,
                    sizeStyles.text,
                    { color: isActive ? COLORS.text : COLORS.textSecondary },
                ]}
            >
                {formatStreak(streak)}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 20,
    },
    containerSmall: {
        paddingHorizontal: 10,
        paddingVertical: 4,
    },
    containerMedium: {
        paddingHorizontal: 14,
        paddingVertical: 6,
    },
    containerLarge: {
        paddingHorizontal: 18,
        paddingVertical: 8,
    },
    active: {
        backgroundColor: "rgba(255, 193, 7, 0.15)",
    },
    inactive: {
        backgroundColor: COLORS.surface,
    },
    text: {
        fontWeight: "bold",
        marginLeft: 6,
    },
    textSmall: {
        fontSize: 12,
    },
    textMedium: {
        fontSize: 16,
    },
    textLarge: {
        fontSize: 20,
    },
});
