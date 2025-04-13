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
    Alert,
} from "react-native";
import { X, Check, HelpCircle, FileText } from "lucide-react-native";
import { colors } from "@/constants/colors";
import { parseBulkWords } from "@/utils/wordUtils";

interface BulkAddModalProps {
    language: string;
    onSubmit: (
        words: Array<{ term: string; definition: string; example?: string }>
    ) => void;
    onClose: () => void;
}

export const BulkAddModal: React.FC<BulkAddModalProps> = ({
    language,
    onSubmit,
    onClose,
}) => {
    const [bulkText, setBulkText] = useState("");
    const [format, setFormat] = useState<"term-definition" | "term-only">(
        "term-definition"
    );
    const [separator, setSeparator] = useState<"line" | "comma" | "tab">(
        "line"
    );
    const [definitionSeparator, setDefinitionSeparator] = useState<
        "colon" | "dash" | "tab"
    >("colon");
    const [showHelp, setShowHelp] = useState(false);

    const handleSubmit = () => {
        if (!bulkText.trim()) {
            Alert.alert("Error", "Please enter some text to add words.");
            return;
        }

        try {
            const words = parseBulkWords(bulkText, {
                format,
                separator,
                definitionSeparator,
                language,
            });

            if (words.length === 0) {
                Alert.alert(
                    "Error",
                    "No valid words found. Please check your format and try again."
                );
                return;
            }

            onSubmit(words);
        } catch (error) {
            Alert.alert(
                "Error",
                "Failed to parse words. Please check your format and try again."
            );
        }
    };

    const getFormatExample = () => {
        if (format === "term-definition") {
            if (separator === "line") {
                if (definitionSeparator === "colon") {
                    return "apple: a round fruit with red, yellow, or green skin\nbanana: a long curved fruit with a yellow skin";
                } else if (definitionSeparator === "dash") {
                    return "apple - a round fruit with red, yellow, or green skin\nbanana - a long curved fruit with a yellow skin";
                } else {
                    return "apple\ta round fruit with red, yellow, or green skin\nbanana\ta long curved fruit with a yellow skin";
                }
            } else if (separator === "comma") {
                if (definitionSeparator === "colon") {
                    return "apple: a round fruit with red skin, banana: a long curved fruit with a yellow skin";
                } else if (definitionSeparator === "dash") {
                    return "apple - a round fruit with red skin, banana - a long curved fruit with a yellow skin";
                } else {
                    return "apple\ta round fruit with red skin, banana\ta long curved fruit with a yellow skin";
                }
            } else {
                if (definitionSeparator === "colon") {
                    return "apple: a round fruit with red skin\tbanana: a long curved fruit with a yellow skin";
                } else if (definitionSeparator === "dash") {
                    return "apple - a round fruit with red skin\tbanana - a long curved fruit with a yellow skin";
                } else {
                    return "apple\ta round fruit with red skin\tbanana\ta long curved fruit with a yellow skin";
                }
            }
        } else {
            if (separator === "line") {
                return "apple\nbanana\norange";
            } else if (separator === "comma") {
                return "apple, banana, orange";
            } else {
                return "apple\tbanana\torange";
            }
        }
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
                            <Text style={styles.title}>Bulk Add Words</Text>
                            <View style={styles.headerActions}>
                                <TouchableOpacity
                                    style={styles.helpButton}
                                    onPress={() => setShowHelp(!showHelp)}
                                >
                                    <HelpCircle size={20} color={colors.text} />
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
                        >
                            {showHelp && (
                                <View style={styles.helpContainer}>
                                    <Text style={styles.helpTitle}>
                                        How to use bulk add:
                                    </Text>
                                    <Text style={styles.helpText}>
                                        1. Choose your preferred format and
                                        separators{"\n"}
                                        2. Paste or type your words in the text
                                        area{"\n"}
                                        3. Click "Add Words" to add them to your
                                        list
                                    </Text>
                                    <Text style={styles.helpTitle}>
                                        Example:
                                    </Text>
                                    <View style={styles.exampleContainer}>
                                        <Text style={styles.exampleText}>
                                            {getFormatExample()}
                                        </Text>
                                    </View>
                                </View>
                            )}

                            <View style={styles.formGroup}>
                                <Text style={styles.label}>Format</Text>
                                <View style={styles.optionsContainer}>
                                    <TouchableOpacity
                                        style={[
                                            styles.optionButton,
                                            format === "term-definition" &&
                                                styles.selectedOption,
                                        ]}
                                        onPress={() =>
                                            setFormat("term-definition")
                                        }
                                    >
                                        <Text
                                            style={[
                                                styles.optionText,
                                                format === "term-definition" &&
                                                    styles.selectedOptionText,
                                            ]}
                                        >
                                            Term + Definition
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[
                                            styles.optionButton,
                                            format === "term-only" &&
                                                styles.selectedOption,
                                        ]}
                                        onPress={() => setFormat("term-only")}
                                    >
                                        <Text
                                            style={[
                                                styles.optionText,
                                                format === "term-only" &&
                                                    styles.selectedOptionText,
                                            ]}
                                        >
                                            Term Only
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={styles.formGroup}>
                                <Text style={styles.label}>Word Separator</Text>
                                <View style={styles.optionsContainer}>
                                    <TouchableOpacity
                                        style={[
                                            styles.optionButton,
                                            separator === "line" &&
                                                styles.selectedOption,
                                        ]}
                                        onPress={() => setSeparator("line")}
                                    >
                                        <Text
                                            style={[
                                                styles.optionText,
                                                separator === "line" &&
                                                    styles.selectedOptionText,
                                            ]}
                                        >
                                            New Line
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[
                                            styles.optionButton,
                                            separator === "comma" &&
                                                styles.selectedOption,
                                        ]}
                                        onPress={() => setSeparator("comma")}
                                    >
                                        <Text
                                            style={[
                                                styles.optionText,
                                                separator === "comma" &&
                                                    styles.selectedOptionText,
                                            ]}
                                        >
                                            Comma
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[
                                            styles.optionButton,
                                            separator === "tab" &&
                                                styles.selectedOption,
                                        ]}
                                        onPress={() => setSeparator("tab")}
                                    >
                                        <Text
                                            style={[
                                                styles.optionText,
                                                separator === "tab" &&
                                                    styles.selectedOptionText,
                                            ]}
                                        >
                                            Tab
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            {format === "term-definition" && (
                                <View style={styles.formGroup}>
                                    <Text style={styles.label}>
                                        Definition Separator
                                    </Text>
                                    <View style={styles.optionsContainer}>
                                        <TouchableOpacity
                                            style={[
                                                styles.optionButton,
                                                definitionSeparator ===
                                                    "colon" &&
                                                    styles.selectedOption,
                                            ]}
                                            onPress={() =>
                                                setDefinitionSeparator("colon")
                                            }
                                        >
                                            <Text
                                                style={[
                                                    styles.optionText,
                                                    definitionSeparator ===
                                                        "colon" &&
                                                        styles.selectedOptionText,
                                                ]}
                                            >
                                                Colon (:)
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={[
                                                styles.optionButton,
                                                definitionSeparator ===
                                                    "dash" &&
                                                    styles.selectedOption,
                                            ]}
                                            onPress={() =>
                                                setDefinitionSeparator("dash")
                                            }
                                        >
                                            <Text
                                                style={[
                                                    styles.optionText,
                                                    definitionSeparator ===
                                                        "dash" &&
                                                        styles.selectedOptionText,
                                                ]}
                                            >
                                                Dash (-)
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={[
                                                styles.optionButton,
                                                definitionSeparator === "tab" &&
                                                    styles.selectedOption,
                                            ]}
                                            onPress={() =>
                                                setDefinitionSeparator("tab")
                                            }
                                        >
                                            <Text
                                                style={[
                                                    styles.optionText,
                                                    definitionSeparator ===
                                                        "tab" &&
                                                        styles.selectedOptionText,
                                                ]}
                                            >
                                                Tab
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )}

                            <View style={styles.formGroup}>
                                <View style={styles.textAreaHeader}>
                                    <Text style={styles.label}>
                                        Paste or type your words
                                    </Text>
                                    <TouchableOpacity
                                        style={styles.pasteButton}
                                        onPress={async () => {
                                            try {
                                                const clipboardContent =
                                                    await navigator.clipboard.readText();
                                                setBulkText(clipboardContent);
                                            } catch (error) {
                                                Alert.alert(
                                                    "Error",
                                                    "Failed to paste from clipboard. Please try again."
                                                );
                                            }
                                        }}
                                    >
                                        <FileText
                                            size={16}
                                            color={colors.accent}
                                        />
                                        <Text style={styles.pasteText}>
                                            Paste
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                <TextInput
                                    style={styles.textArea}
                                    placeholder={`Enter words in the format:\n${getFormatExample()}`}
                                    placeholderTextColor={colors.textSecondary}
                                    value={bulkText}
                                    onChangeText={setBulkText}
                                    multiline
                                    numberOfLines={10}
                                    textAlignVertical="top"
                                />
                            </View>

                            <TouchableOpacity
                                style={styles.submitButton}
                                onPress={handleSubmit}
                            >
                                <Check size={20} color={colors.text} />
                                <Text style={styles.submitButtonText}>
                                    Add Words
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
    helpButton: {
        padding: 4,
        marginRight: 12,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        padding: 16,
    },
    helpContainer: {
        backgroundColor: colors.background,
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
    },
    helpTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: colors.text,
        marginBottom: 8,
    },
    helpText: {
        fontSize: 14,
        color: colors.textSecondary,
        marginBottom: 12,
        lineHeight: 20,
    },
    exampleContainer: {
        backgroundColor: `${colors.accent}10`,
        borderRadius: 8,
        padding: 12,
        borderLeftWidth: 3,
        borderLeftColor: colors.accent,
    },
    exampleText: {
        fontSize: 14,
        color: colors.text,
        fontFamily: Platform.OS === "ios" ? "Menlo" : "monospace",
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
    optionsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    optionButton: {
        backgroundColor: colors.background,
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
        marginRight: 8,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: colors.border,
    },
    selectedOption: {
        backgroundColor: `${colors.highlight}20`,
        borderColor: colors.highlight,
    },
    optionText: {
        color: colors.text,
        fontSize: 14,
    },
    selectedOptionText: {
        color: colors.highlight,
        fontWeight: "600",
    },
    textAreaHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 8,
    },
    pasteButton: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: `${colors.accent}20`,
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 8,
    },
    pasteText: {
        color: colors.accent,
        fontSize: 14,
        fontWeight: "500",
        marginLeft: 4,
    },
    textArea: {
        backgroundColor: colors.background,
        borderRadius: 8,
        padding: 12,
        color: colors.text,
        fontSize: 16,
        borderWidth: 1,
        borderColor: colors.border,
        minHeight: 150,
        textAlignVertical: "top",
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
