import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { ArrowRight } from "lucide-react-native";
import { Question } from "@/types/learning";
import { colors } from "@/constants/colors";

interface MatchingCardProps {
    question: Question;
    onSelectAnswer: (answerId: string) => void;
}

const MatchingCard = ({ question, onSelectAnswer }: MatchingCardProps) => {
    const [selectedPairs, setSelectedPairs] = useState<string[]>([]);

    const togglePair = (pairId: string) => {
        if (selectedPairs.includes(pairId)) {
            setSelectedPairs(selectedPairs.filter((id) => id !== pairId));
        } else {
            setSelectedPairs([...selectedPairs, pairId]);
        }
    };

    const handleSubmit = () => {
        if (selectedPairs.length > 0) {
            onSelectAnswer(selectedPairs.sort().join(","));
        }
    };

    return (
        <View style={styles.card}>
            <Text style={styles.questionText}>{question.text}</Text>

            <ScrollView style={styles.pairsContainer}>
                {question.options.map((option) => (
                    <TouchableOpacity
                        key={option.id}
                        style={[
                            styles.pairButton,
                            selectedPairs.includes(option.id) &&
                                styles.selectedPair,
                        ]}
                        onPress={() => togglePair(option.id)}
                        activeOpacity={0.7}
                    >
                        <Text style={styles.pairText}>{option.text}</Text>
                        {selectedPairs.includes(option.id) && (
                            <View style={styles.checkmark} />
                        )}
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <TouchableOpacity
                style={[
                    styles.submitButton,
                    selectedPairs.length === 0 && styles.disabledButton,
                ]}
                onPress={handleSubmit}
                disabled={selectedPairs.length === 0}
                activeOpacity={0.7}
            >
                <Text style={styles.submitButtonText}>Submit Matches</Text>
            </TouchableOpacity>
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
    pairsContainer: {
        maxHeight: 300,
        marginBottom: 20,
    },
    pairButton: {
        backgroundColor: "#334155",
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 1,
        borderColor: colors.border,
    },
    selectedPair: {
        borderColor: colors.accent,
        backgroundColor: "rgba(33, 150, 243, 0.1)",
    },
    pairText: {
        color: colors.text,
        fontSize: 16,
        flex: 1,
    },
    checkmark: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: colors.accent,
    },
    submitButton: {
        backgroundColor: colors.accent,
        borderRadius: 12,
        padding: 16,
        alignItems: "center",
        justifyContent: "center",
    },
    disabledButton: {
        backgroundColor: "#334155",
        opacity: 0.7,
    },
    submitButtonText: {
        color: colors.text,
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default MatchingCard;
