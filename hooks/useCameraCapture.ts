import { useState, useCallback } from "react";
import { Alert } from "react-native";
import { ExtractedWord } from "@/types/dictionary";
import { extractTextFromImage } from "@/services/ocrService";
import { fetchWordDefinition } from "@/services/dictionaryService";
import { useWordListStore } from "@/stores/wordListStore";

export const useCameraCapture = (listId: string) => {
    const [isProcessing, setIsProcessing] = useState(false);
    const [extractedWords, setExtractedWords] = useState<ExtractedWord[]>([]);
    const { getWordList } = useWordListStore();

    // Get the language of the list
    const list = getWordList(listId);
    const language = list?.language || "English";

    // Process image for OCR
    const processImage = useCallback(
        async (imageUri: string) => {
            setIsProcessing(true);

            try {
                // Extract text from image
                const extractedText = await extractTextFromImage(imageUri);

                // Process extracted text into words
                const words: ExtractedWord[] = [];

                for (const textBlock of extractedText.blocks) {
                    // Skip blocks with low confidence
                    if (textBlock.confidence < 0.5) continue;

                    // Extract individual words from the text block
                    const extractedTerms = textBlock.text
                        .split(/[\s,.;:!?]+/)
                        .filter((term) => term.length > 1)
                        .map((term) => term.trim().toLowerCase());

                    // Fetch definitions for each term
                    for (const term of extractedTerms) {
                        try {
                            // Check if the word already exists in the extracted words
                            if (
                                words.some(
                                    (w) =>
                                        w.term.toLowerCase() ===
                                        term.toLowerCase()
                                )
                            ) {
                                continue;
                            }

                            const definition = await fetchWordDefinition(
                                term,
                                language
                            );

                            words.push({
                                term,
                                definition,
                                confidence: textBlock.confidence,
                            });
                        } catch (error) {
                            console.error(
                                `Error fetching definition for ${term}:`,
                                error
                            );
                        }
                    }
                }

                setExtractedWords(words);
            } catch (error) {
                console.error("Error processing image:", error);
                Alert.alert(
                    "OCR Error",
                    "Failed to extract text from the image. Please try again with a clearer image."
                );
            } finally {
                setIsProcessing(false);
            }
        },
        [language]
    );

    // Update an extracted word
    const updateExtractedWord = useCallback(
        (index: number, updates: Partial<ExtractedWord>) => {
            setExtractedWords((prev) => {
                const updated = [...prev];
                updated[index] = { ...updated[index], ...updates };
                return updated;
            });
        },
        []
    );

    // Remove an extracted word
    const removeExtractedWord = useCallback((index: number) => {
        setExtractedWords((prev) => prev.filter((_, i) => i !== index));
    }, []);

    // Clear extracted words
    const clearExtractedWords = useCallback(() => {
        setExtractedWords([]);
    }, []);

    // Save extracted words to the list
    const saveExtractedWords = useCallback(() => {
        const wordsToSave = extractedWords.map((word) => ({
            term: word.term,
            definition: word.definition,
        }));

        return wordsToSave;
    }, [extractedWords]);

    return {
        isProcessing,
        extractedWords,
        processImage,
        updateExtractedWord,
        removeExtractedWord,
        clearExtractedWords,
        saveExtractedWords,
    };
};
