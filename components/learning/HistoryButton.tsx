import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { History } from "lucide-react-native";
import { colors } from "@/constants/colors";

interface HistoryButtonProps {
    onPress: () => void;
}

const HistoryButton = ({ onPress }: HistoryButtonProps) => {
    return (
        <TouchableOpacity
            style={styles.button}
            onPress={onPress}
            activeOpacity={0.7}
        >
            <History size={20} color={colors.text} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.cardBackground,
        borderRadius: 8,
        padding: 8,
        alignItems: "center",
        justifyContent: "center",
    },
});

export default HistoryButton;
