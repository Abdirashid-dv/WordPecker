import React, { useState, useEffect, useRef } from "react";
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
    ActivityIndicator,
    Alert,
    FlatList,
} from "react-native";
import {
    X,
    Plus,
    Image as ImageIcon,
    Volume2,
    Clipboard,
    Check,
    ArrowRight,
} from "lucide-react-native";
import * as ImagePicker from "expo-image-picker";
import { Image } from "expo-image";
import { colors } from "@/constants/colors";
import { Word } from "@/types/wordList";
import {
    validateWordTerm,
    validateWordDefinition,
} from "@/utils/validationUtils";
import { useAddWord } from "@/hooks/useAddWord";
import { AutocompleteSuggestion } from "@/types/dictionary";
import { BulkAddModal } from "./BulkAddModal";

interface AddWordModalProps {
    listId: string;
    onSubmit: (word: Omit<Word, "id" | "status" | "lastReviewed">) => void;
    onClose: () => void;
    language: string;
}

export const AddWordModal: React.FC<AddWordModalProps> = ({
    listId,
    onSubmit,
    onClose,
    language,
}) => {
    const {
        term,
        setTerm,
        definition,
        setDefinition,
        example,
        setExample,
        image,
        setImage,
        pronunciation,
        setPronunciation,
        isLoading,
        suggestions,
        errors,
        fetchDefinition,
        clearSuggestions,
        searchSuggestions,
        validateField,
        resetForm,
    } = useAddWord(language);

    const [showBulkAdd, setShowBulkAdd] = useState(false);
    const termInputRef = useRef<TextInput>(null);

    // Handle submit
    const handleSubmit = () => {
        if (!validateField("term") || !validateField("definition")) return;

        onSubmit({
            term,
            definition,
            example: example.trim() || undefined,
            image: image || undefined,
            pronunciation: pronunciation || undefined,
        });

        // Clear form for next entry
        resetForm();

        // Focus on term input for next word
        setTimeout(() => {
            termInputRef.current?.focus();
        }, 100);
    };

    // Handle image selection
    const handleSelectImage = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 0.8,
            });

            if (!result.canceled && result.assets && result.assets.length > 0) {
                setImage(result.assets[0].uri);
            }
        } catch (error) {
            console.error("Error selecting image:", error);
            Alert.alert("Error", "Failed to select image. Please try again.");
        }
    };

    // Handle removing image
    const handleRemoveImage = () => {
        setImage(null);
    };

    // Handle suggestion selection
    const handleSelectSuggestion = (suggestion: AutocompleteSuggestion) => {
        setTerm(suggestion.word);
        if (suggestion.definition) {
            setDefinition(suggestion.definition);
        } else {
            fetchDefinition(suggestion.word);
        }
        clearSuggestions();
    };

    // Handle bulk add
    const handleBulkAdd = () => {
        setShowBulkAdd(true);
    };

    // Handle bulk add submit
    const handleBulkAddSubmit = (
        words: Array<{ term: string; definition: string; example?: string }>
    ) => {
        setShowBulkAdd(false);

        // Submit each word
        words.forEach((word) => {
            onSubmit({
                term: word.term,
                definition: word.definition,
                example: word.example,
            });
        });

        Alert.alert("Success", `Added ${words.length} words to your list.`);
    };

    // Render suggestion item
    const renderSuggestionItem = ({
        item,
    }: {
        item: AutocompleteSuggestion;
    }) => (
        <TouchableOpacity
            style={styles.suggestionItem}
            onPress={() => handleSelectSuggestion(item)}
        >
            <Text style={styles.suggestionText}>{item.word}</Text>
            {item.definition && (
                <Text style={styles.suggestionDefinition} numberOfLines={1}>
                    {item.definition}
                </Text>
            )}
        </TouchableOpacity>
    );

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
                            <Text style={styles.title}>Add New Word</Text>
                            <View style={styles.headerActions}>
                                <TouchableOpacity
                                    style={styles.bulkAddButton}
                                    onPress={handleBulkAdd}
                                >
                                    <Clipboard size={20} color={colors.text} />
                                    <Text style={styles.bulkAddText}>
                                        Bulk Add
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.closeButton}
                                    onPress={onClose}
                                >
                                    <X size={24} color={colors.text} />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <ScrollView
                            style={styles.scrollView}
                            contentContainerStyle={styles.scrollContent}
                            showsVerticalScrollIndicator={false}
                            keyboardShouldPersistTaps="handled"
                        >
                            <View style={styles.formGroup}>
                                <Text style={styles.label}>Term*</Text>
                                <TextInput
                                    ref={termInputRef}
                                    style={[
                                        styles.input,
                                        errors.term && styles.inputError,
                                    ]}
                                    placeholder="Enter word or phrase"
                                    placeholderTextColor={colors.textSecondary}
                                    value={term}
                                    onChangeText={(text) => {
                                        setTerm(text);
                                        if (text.length > 2) {
                                            searchSuggestions(text);
                                        } else {
                                            clearSuggestions();
                                        }
                                    }}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                />
                                {errors.term && (
                                    <Text style={styles.errorText}>
                                        {errors.term}
                                    </Text>
                                )}

                                {suggestions.length > 0 && (
                                    <View style={styles.suggestionsContainer}>
                                        <FlatList
                                            data={suggestions}
                                            renderItem={renderSuggestionItem}
                                            keyExtractor={(item) => item.word}
                                            style={styles.suggestionsList}
                                            keyboardShouldPersistTaps="handled"
                                            nestedScrollEnabled
                                        />
                                    </View>
                                )}
                            </View>

                            <View style={styles.formGroup}>
                                <View style={styles.definitionHeader}>
                                    <Text style={styles.label}>
                                        Definition*
                                    </Text>
                                    {term.length > 0 && (
                                        <TouchableOpacity
                                            style={styles.fetchButton}
                                            onPress={() =>
                                                fetchDefinition(term)
                                            }
                                            disabled={isLoading}
                                        >
                                            {isLoading ? (
                                                <ActivityIndicator
                                                    size="small"
                                                    color={colors.accent}
                                                />
                                            ) : (
                                                <>
                                                    <ArrowRight
                                                        size={16}
                                                        color={colors.accent}
                                                    />
                                                    <Text
                                                        style={styles.fetchText}
                                                    >
                                                        Fetch
                                                    </Text>
                                                </>
                                            )}
                                        </TouchableOpacity>
                                    )}
                                </View>
                                <TextInput
                                    style={[
                                        styles.input,
                                        styles.definitionInput,
                                        errors.definition && styles.inputError,
                                    ]}
                                    placeholder="Enter definition"
                                    placeholderTextColor={colors.textSecondary}
                                    value={definition}
                                    onChangeText={setDefinition}
                                    multiline
                                    numberOfLines={4}
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
                                    style={[styles.input, styles.exampleInput]}
                                    placeholder="Enter example usage"
                                    placeholderTextColor={colors.textSecondary}
                                    value={example}
                                    onChangeText={setExample}
                                    multiline
                                    numberOfLines={3}
                                    textAlignVertical="top"
                                />
                            </View>

                            <View style={styles.formGroup}>
                                <Text style={styles.label}>
                                    Image (optional)
                                </Text>
                                {image ? (
                                    <View style={styles.imageContainer}>
                                        <Image
                                            source={{ uri: image }}
                                            style={styles.selectedImage}
                                            contentFit="cover"
                                        />
                                        <TouchableOpacity
                                            style={styles.removeImageButton}
                                            onPress={handleRemoveImage}
                                        >
                                            <X size={20} color={colors.text} />
                                        </TouchableOpacity>
                                    </View>
                                ) : (
                                    <TouchableOpacity
                                        style={styles.imageButton}
                                        onPress={handleSelectImage}
                                    >
                                        <ImageIcon
                                            size={24}
                                            color={colors.textSecondary}
                                        />
                                        <Text style={styles.imageButtonText}>
                                            Select Image
                                        </Text>
                                    </TouchableOpacity>
                                )}
                            </View>

                            <View style={styles.formGroup}>
                                <Text style={styles.label}>
                                    Pronunciation (optional)
                                </Text>
                                <TouchableOpacity
                                    style={styles.pronunciationButton}
                                    onPress={() =>
                                        Alert.alert(
                                            "Coming Soon",
                                            "Pronunciation recording will be available in a future update."
                                        )
                                    }
                                >
                                    <Volume2
                                        size={24}
                                        color={colors.textSecondary}
                                    />
                                    <Text
                                        style={styles.pronunciationButtonText}
                                    >
                                        {pronunciation
                                            ? "Change Recording"
                                            : "Record Pronunciation"}
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity
                                style={styles.submitButton}
                                onPress={handleSubmit}
                            >
                                <Plus size={20} color={colors.text} />
                                <Text style={styles.submitButtonText}>
                                    Add Word
                                </Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                </View>
            </KeyboardAvoidingView>

            {showBulkAdd && (
                <BulkAddModal
                    language={language}
                    onSubmit={handleBulkAddSubmit}
                    onClose={() => setShowBulkAdd(false)}
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
        display: "flex", // Explicitly set display
        flexDirection: "column", // Ensure column layout
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    headerActions: {
        flexDirection: "row",
        alignItems: "center",
    },
    title: {
        fontSize: 20,
        fontWeight: "600",
        color: colors.text,
    },
    closeButton: {
        padding: 4,
    },
    bulkAddButton: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.border,
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 8,
        marginRight: 12,
    },
    bulkAddText: {
        color: colors.text,
        fontSize: 14,
        fontWeight: "500",
        marginLeft: 6,
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
    definitionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 8,
    },
    fetchButton: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: `${colors.accent}20`,
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 8,
    },
    fetchText: {
        color: colors.accent,
        fontSize: 14,
        fontWeight: "500",
        marginLeft: 4,
    },
    definitionInput: {
        minHeight: 100,
    },
    exampleInput: {
        minHeight: 80,
    },
    inputError: {
        borderColor: colors.error,
    },
    errorText: {
        color: colors.error,
        fontSize: 14,
        marginTop: 4,
    },
    suggestionsContainer: {
        marginTop: 4,
        maxHeight: 150,
        borderRadius: 8,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: colors.border,
    },
    suggestionsList: {
        backgroundColor: colors.background,
    },
    suggestionItem: {
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    suggestionText: {
        color: colors.accent,
        fontSize: 16,
        fontWeight: "500",
    },
    suggestionDefinition: {
        color: colors.textSecondary,
        fontSize: 14,
        marginTop: 2,
    },
    imageContainer: {
        position: "relative",
        width: "100%",
        height: 150,
        borderRadius: 8,
        overflow: "hidden",
        marginBottom: 8,
    },
    selectedImage: {
        width: "100%",
        height: "100%",
    },
    removeImageButton: {
        position: "absolute",
        top: 8,
        right: 8,
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
    },
    imageButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.background,
        borderRadius: 8,
        padding: 12,
        borderWidth: 1,
        borderColor: colors.border,
        borderStyle: "dashed",
    },
    imageButtonText: {
        color: colors.textSecondary,
        fontSize: 16,
        marginLeft: 8,
    },
    pronunciationButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.background,
        borderRadius: 8,
        padding: 12,
        borderWidth: 1,
        borderColor: colors.border,
        borderStyle: "dashed",
    },
    pronunciationButtonText: {
        color: colors.textSecondary,
        fontSize: 16,
        marginLeft: 8,
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
