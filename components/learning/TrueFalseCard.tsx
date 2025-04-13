import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Check, X } from "lucide-react-native";
import { Question } from "@/types/learning";
import { colors } from "@/constants/colors";

interface TrueFalseCardProps {
    question: Question;
    onSelectAnswer: (answerId: string) => void;
}

const TrueFalseCard = ({ question, onSelectAnswer }: TrueFalseCardProps) => {
    return (
        <View style={styles.card}>
            <Text style={styles.questionText}>{question.text}</Text>

            <View style={styles.statementContainer}>
                <Text style={styles.statementText}>{question.statement}</Text>
            </View>

            <View style={styles.optionsContainer}>
                <TouchableOpacity
                    style={[styles.optionButton, styles.trueButton]}
                    onPress={() => onSelectAnswer("true")}
                    activeOpacity={0.7}
                >
                    <Check size={24} color={colors.text} />
                    <Text style={styles.optionText}>True</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.optionButton, styles.falseButton]}
                    onPress={() => onSelectAnswer("false")}
                    activeOpacity={0.7}
                >
                    <X size={24} color={colors.text} />
                    <Text style={styles.optionText}>False</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.cardBackground,
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    questionText: {
        fontSize: 20,
        fontWeight: "bold",
        color: colors.text,
        marginBottom: 20,
        textAlign: "center",
    },
    statementContainer: {
        backgroundColor: "#334155",
        borderRadius: 12,
        padding: 16,
        marginBottom: 24,
    },
    statementText: {
        fontSize: 18,
        color: colors.text,
        textAlign: "center",
        lineHeight: 26,
    },
    optionsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 12,
    },
    optionButton: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: "#334155",
        borderRadius: 12,
        padding: 16,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        gap: 8,
    },
    trueButton: {
        borderColor: colors.success,
    },
    falseButton: {
        borderColor: colors.error,
    },
    optionText: {
        color: colors.text,
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default TrueFalseCard;
