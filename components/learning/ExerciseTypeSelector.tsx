import React from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import {
    Check,
    BookOpen,
    CheckSquare,
    AlignJustify,
    Rows3,
} from "lucide-react-native";
import { QuestionType } from "@/types/learning";
import { colors } from "@/constants/colors";

interface ExerciseTypeSelectorProps {
    selectedTypes: QuestionType[];
    onSelectType: (type: QuestionType) => void;
}

const ExerciseTypeSelector = ({
    selectedTypes,
    onSelectType,
}: ExerciseTypeSelectorProps) => {
    const isSelected = (type: QuestionType) => selectedTypes.includes(type);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Select Exercise Types</Text>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.typesContainer}
            >
                <ExerciseTypeButton
                    type={QuestionType.MULTIPLE_CHOICE}
                    label="Multiple Choice"
                    icon={
                        <BookOpen
                            size={24}
                            color={
                                isSelected(QuestionType.MULTIPLE_CHOICE)
                                    ? colors.text
                                    : colors.textSecondary
                            }
                        />
                    }
                    isSelected={isSelected(QuestionType.MULTIPLE_CHOICE)}
                    onPress={() => onSelectType(QuestionType.MULTIPLE_CHOICE)}
                />

                <ExerciseTypeButton
                    type={QuestionType.TRUE_FALSE}
                    label="True/False"
                    icon={
                        <CheckSquare
                            size={24}
                            color={
                                isSelected(QuestionType.TRUE_FALSE)
                                    ? colors.text
                                    : colors.textSecondary
                            }
                        />
                    }
                    isSelected={isSelected(QuestionType.TRUE_FALSE)}
                    onPress={() => onSelectType(QuestionType.TRUE_FALSE)}
                />

                <ExerciseTypeButton
                    type={QuestionType.FILL_IN_BLANK}
                    label="Fill in Blank"
                    icon={
                        <AlignJustify
                            size={24}
                            color={
                                isSelected(QuestionType.FILL_IN_BLANK)
                                    ? colors.text
                                    : colors.textSecondary
                            }
                        />
                    }
                    isSelected={isSelected(QuestionType.FILL_IN_BLANK)}
                    onPress={() => onSelectType(QuestionType.FILL_IN_BLANK)}
                />

                <ExerciseTypeButton
                    type={QuestionType.MATCHING}
                    label="Matching"
                    icon={
                        <Rows3
                            size={24}
                            color={
                                isSelected(QuestionType.MATCHING)
                                    ? colors.text
                                    : colors.textSecondary
                            }
                        />
                    }
                    isSelected={isSelected(QuestionType.MATCHING)}
                    onPress={() => onSelectType(QuestionType.MATCHING)}
                />
            </ScrollView>
        </View>
    );
};

interface ExerciseTypeButtonProps {
    type: QuestionType;
    label: string;
    icon: React.ReactNode;
    isSelected: boolean;
    onPress: () => void;
}

const ExerciseTypeButton = ({
    type,
    label,
    icon,
    isSelected,
    onPress,
}: ExerciseTypeButtonProps) => {
    return (
        <TouchableOpacity
            style={[styles.typeButton, isSelected && styles.selectedTypeButton]}
            onPress={onPress}
            activeOpacity={0.7}
        >
            {icon}
            <Text
                style={[
                    styles.typeLabel,
                    isSelected && styles.selectedTypeLabel,
                ]}
            >
                {label}
            </Text>
            {isSelected && (
                <View style={styles.checkContainer}>
                    <Check size={16} color={colors.primary} />
                </View>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: colors.text,
        marginBottom: 12,
    },
    typesContainer: {
        paddingVertical: 8,
        gap: 12,
    },
    typeButton: {
        backgroundColor: colors.cardBackground,
        borderRadius: 12,
        padding: 12,
        alignItems: "center",
        justifyContent: "center",
        minWidth: 100,
        borderWidth: 1,
        borderColor: colors.border,
    },
    selectedTypeButton: {
        borderColor: colors.primary,
        backgroundColor: "rgba(76, 175, 80, 0.1)",
    },
    typeLabel: {
        color: colors.textSecondary,
        fontSize: 14,
        marginTop: 8,
        textAlign: "center",
    },
    selectedTypeLabel: {
        color: colors.text,
        fontWeight: "bold",
    },
    checkContainer: {
        position: "absolute",
        top: 8,
        right: 8,
        backgroundColor: colors.text,
        borderRadius: 10,
        width: 20,
        height: 20,
        alignItems: "center",
        justifyContent: "center",
    },
});

export default ExerciseTypeSelector;
