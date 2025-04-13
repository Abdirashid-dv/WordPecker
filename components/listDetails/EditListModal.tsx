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
import { WordList, Language } from "@/types/wordList";
import {
    validateListName,
    validateDescription,
    validateTags,
} from "@/utils/validationUtils";
import { LanguageSelector } from "@/components/library/LanguageSelector";

interface EditListModalProps {
    list: WordList;
    onSubmit: (updates: Partial<WordList>) => void;
    onClose: () => void;
}

export const EditListModal: React.FC<EditListModalProps> = ({
    list,
    onSubmit,
    onClose,
}) => {
    const [name, setName] = useState(list.name);
    const [description, setDescription] = useState(list.description);
    const [language, setLanguage] = useState<Language>(list.language);
    const [tags, setTags] = useState(list.tags.join(", "));
    const [errors, setErrors] = useState<{
        name?: string;
        description?: string;
        tags?: string;
    }>({});
    const [showLanguageSelector, setShowLanguageSelector] = useState(false);

    const handleLanguageSelect = (selectedLanguage: Language) => {
        setLanguage(selectedLanguage);
        setShowLanguageSelector(false);
    };

    const validateForm = () => {
        const newErrors: {
            name?: string;
            description?: string;
            tags?: string;
        } = {};

        const nameError = validateListName(name);
        if (nameError) newErrors.name = nameError;

        const descriptionError = validateDescription(description);
        if (descriptionError) newErrors.description = descriptionError;

        const tagsError = validateTags(tags);
        if (tagsError) newErrors.tags = tagsError;

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (!validateForm()) return;

        // Process tags
        const tagsList = tags
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag.length > 0);

        onSubmit({
            name,
            description,
            language,
            tags: tagsList,
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
                            <Text style={styles.title}>Edit List</Text>
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
                                <Text style={styles.label}>List Name*</Text>
                                <TextInput
                                    style={[
                                        styles.input,
                                        errors.name && styles.inputError,
                                    ]}
                                    placeholder="Enter list name"
                                    placeholderTextColor={colors.textSecondary}
                                    value={name}
                                    onChangeText={setName}
                                />
                                {errors.name && (
                                    <Text style={styles.errorText}>
                                        {errors.name}
                                    </Text>
                                )}
                            </View>

                            <View style={styles.formGroup}>
                                <Text style={styles.label}>Description</Text>
                                <TextInput
                                    style={[
                                        styles.input,
                                        errors.description && styles.inputError,
                                    ]}
                                    placeholder="What is this list for? (optional)"
                                    placeholderTextColor={colors.textSecondary}
                                    value={description}
                                    onChangeText={setDescription}
                                    multiline
                                    numberOfLines={3}
                                    textAlignVertical="top"
                                />
                                {errors.description && (
                                    <Text style={styles.errorText}>
                                        {errors.description}
                                    </Text>
                                )}
                            </View>

                            <View style={styles.formGroup}>
                                <Text style={styles.label}>Language*</Text>
                                <TouchableOpacity
                                    style={styles.selector}
                                    onPress={() =>
                                        setShowLanguageSelector(true)
                                    }
                                >
                                    <Text style={styles.selectorText}>
                                        {language}
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.formGroup}>
                                <Text style={styles.label}>Tags</Text>
                                <TextInput
                                    style={[
                                        styles.input,
                                        errors.tags && styles.inputError,
                                    ]}
                                    placeholder="Enter tags separated by commas (optional)"
                                    placeholderTextColor={colors.textSecondary}
                                    value={tags}
                                    onChangeText={setTags}
                                />
                                {errors.tags && (
                                    <Text style={styles.errorText}>
                                        {errors.tags}
                                    </Text>
                                )}
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

            {showLanguageSelector && (
                <LanguageSelector
                    selectedLanguage={language}
                    onSelect={handleLanguageSelect}
                    onClose={() => setShowLanguageSelector(false)}
                />
            )}
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
    selector: {
        backgroundColor: colors.background,
        borderRadius: 8,
        padding: 12,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 1,
        borderColor: colors.border,
    },
    selectorText: {
        color: colors.text,
        fontSize: 16,
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
