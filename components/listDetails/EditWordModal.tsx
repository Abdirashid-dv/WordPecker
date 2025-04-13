import React, { useState } from "react";
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Modal,
    Platform,
    KeyboardAvoidingView,
    ScrollView,
} from "react-native";
import { X, Check } from "lucide-react-native";
import { colors } from "@/constants/colors";
import { Word, WordStatus } from "@/types/wordList";
import {
    validateWordTerm,
    validateWordDefinition,
} from "@/utils/validationUtils";

interface EditWordModalProps {
    word: Word;
    onSubmit: (updates: Partial<Word>) => void;
    onClose: () => void;
}

export const EditWordModal: React.FC<EditWordModalProps> = ({
    word,
    onSubmit,
    onClose,
}) => {
    const [term, setTerm] = useState(word.term);
    const [definition, setDefinition] = useState(word.definition);
    const [example, setExample] = useState(word.example || "");
    const [status, setStatus] = useState<WordStatus>(word.status);
    const [errors, setErrors] = useState<{
        term?: string;
        definition?: string;
    }>({});

    const validateForm = () => {
        const newErrors: {
            term?: string;
            definition?: string;
        } = {};

        const termError = validateWordTerm(term);
        if (termError) newErrors.term = termError;

        const definitionError = validateWordDefinition(definition);
        if (definitionError) newErrors.definition = definitionError;

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (!validateForm()) return;

        onSubmit({
            term,
            definition,
            example: example.trim() || undefined,
            status,
        });
    };

    return (
        <Modal
            visible={true}
            transparent={true}
            animationType="slide"
            onRequestClose={onClose}
        >
            <KeyboardAvoidingView
                style={styles.keyboardAvoid}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <View style={styles.header}>
                            <Text style={styles.title}>Edit Word</Text>
                            <TouchableOpacity
                                style={styles.closeButton}
                                onPress={onClose}
                            >
                                <X size={24} color={colors.text} />
                            </TouchableOpacity>
                        </View>

                        <ScrollView
                            style={styles.scrollView}
                            contentContainerStyle={styles.scrollContent}
                            showsVerticalScrollIndicator={false}
                        >
                            <View style={styles.formGroup}>
                                <Text style={styles.label}>Term*</Text>
                                <TextInput
                                    style={[
                                        styles.input,
                                        errors.term && styles.inputError,
                                    ]}
                                    placeholder="Enter word or phrase"
                                    placeholderTextColor={colors.textSecondary}
                                    value={term}
                                    onChangeText={setTerm}
                                />
                                {errors.term && (
                                    <Text style={styles.errorText}>
                                        {errors.term}
                                    </Text>
                                )}
                            </View>

                            <View style={styles.formGroup}>
                                <Text style={styles.label}>Definition*</Text>
                                <TextInput
                                    style={[
                                        styles.input,
                                        errors.definition && styles.inputError,
                                    ]}
                                    placeholder="Enter definition"
                                    placeholderTextColor={colors.textSecondary}
                                    value={definition}
                                    onChangeText={setDefinition}
                                    multiline
                                    numberOfLines={3}
                                    textAlignVertical="top"
                                />
                                {errors.definition && (
                                    <Text style={styles.errorText}>
                                        {errors.definition}
                                    </Text>
                                )}
                            </View>

                            <View style={styles.formGroup}>
                                <Text style={styles.label}>
                                    Example (optional)
                                </Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter example usage"
                                    placeholderTextColor={colors.textSecondary}
                                    value={example}
                                    onChangeText={setExample}
                                    multiline
                                    numberOfLines={2}
                                    textAlignVertical="top"
                                />
                            </View>

                            <View style={styles.formGroup}>
                                <Text style={styles.label}>Status</Text>
                                <View style={styles.statusOptions}>
                                    <TouchableOpacity
                                        style={[
                                            styles.statusOption,
                                            status === "new" &&
                                                styles.statusOptionSelected,
                                            styles.newStatus,
                                        ]}
                                        onPress={() => setStatus("new")}
                                    >
                                        <Text
                                            style={[
                                                styles.statusText,
                                                status === "new" &&
                                                    styles.statusTextSelected,
                                            ]}
                                        >
                                            New
                                        </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={[
                                            styles.statusOption,
                                            status === "learning" &&
                                                styles.statusOptionSelected,
                                            styles.learningStatus,
                                        ]}
                                        onPress={() => setStatus("learning")}
                                    >
                                        <Text
                                            style={[
                                                styles.statusText,
                                                status === "learning" &&
                                                    styles.statusTextSelected,
                                            ]}
                                        >
                                            Learning
                                        </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={[
                                            styles.statusOption,
                                            status === "mastered" &&
                                                styles.statusOptionSelected,
                                            styles.masteredStatus,
                                        ]}
                                        onPress={() => setStatus("mastered")}
                                    >
                                        <Text
                                            style={[
                                                styles.statusText,
                                                status === "mastered" &&
                                                    styles.statusTextSelected,
                                            ]}
                                        >
                                            Mastered
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <TouchableOpacity
                                style={styles.submitButton}
                                onPress={handleSubmit}
                            >
                                <Check size={20} color={colors.text} />
                                <Text style={styles.submitButtonText}>
                                    Save Changes
                                </Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    keyboardAvoid: {
        flex: 1,
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        paddingTop: 50,
    },
    modalContent: {
        backgroundColor: colors.cardBackground,
        borderRadius: 16,
        maxHeight: "100%",
        flex: 1,
        display: "flex",
        flexDirection: "column",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    title: {
        fontSize: 20,
        fontWeight: "600",
        color: colors.text,
    },
    closeButton: {
        padding: 4,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        padding: 16,
    },
    formGroup: {
        marginBottom: 16,
    },
    label: {
        fontSize: 16,
        fontWeight: "500",
        color: colors.text,
        marginBottom: 8,
    },
    input: {
        backgroundColor: colors.background,
        borderRadius: 8,
        padding: 12,
        color: colors.text,
        fontSize: 16,
        borderWidth: 1,
        borderColor: colors.border,
    },
    inputError: {
        borderColor: colors.error,
    },
    errorText: {
        color: colors.error,
        fontSize: 14,
        marginTop: 4,
    },
    statusOptions: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    statusOption: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 8,
        marginHorizontal: 4,
        alignItems: "center",
    },
    statusOptionSelected: {
        borderWidth: 2,
    },
    newStatus: {
        backgroundColor: `${colors.accent}30`,
        borderColor: colors.accent,
    },
    learningStatus: {
        backgroundColor: `${colors.highlight}30`,
        borderColor: colors.highlight,
    },
    masteredStatus: {
        backgroundColor: `${colors.primary}30`,
        borderColor: colors.primary,
    },
    statusText: {
        fontSize: 14,
        fontWeight: "500",
    },
    statusTextSelected: {
        fontWeight: "700",
    },
    submitButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.primary,
        borderRadius: 8,
        padding: 12,
        marginTop: 8,
    },
    submitButtonText: {
        color: colors.text,
        fontSize: 16,
        fontWeight: "500",
        marginLeft: 8,
    },
});
