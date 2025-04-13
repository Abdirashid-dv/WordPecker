import { useState, useCallback } from "react";
import {
    validateWordTerm,
    validateWordDefinition,
} from "@/utils/validationUtils";
import { fetchWordDefinition } from "@/services/dictionaryService";
import { getSuggestions } from "@/services/autocompleteService";
import { AutocompleteSuggestion } from "@/types/dictionary";

export const useAddWord = (language: string) => {
    const [term, setTerm] = useState("");
    const [definition, setDefinition] = useState("");
    const [example, setExample] = useState("");
    const [image, setImage] = useState<string | null>(null);
    const [pronunciation, setPronunciation] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [suggestions, setSuggestions] = useState<AutocompleteSuggestion[]>(
        []
    );
    const [errors, setErrors] = useState<{
        term?: string;
        definition?: string;
    }>({});

    // Fetch definition from dictionary API
    const fetchDefinition = useCallback(
        async (word: string) => {
            if (!word.trim()) return;

            setIsLoading(true);
            try {
                const result = await fetchWordDefinition(word, language);
                if (result) {
                    setDefinition(result);
                }
            } catch (error) {
                console.error("Error fetching definition:", error);
            } finally {
                setIsLoading(false);
            }
        },
        [language]
    );

    // Search for autocomplete suggestions
    const searchSuggestions = useCallback(
        async (query: string) => {
            if (!query.trim() || query.length < 2) {
                setSuggestions([]);
                return;
            }

            try {
                const results = await getSuggestions(query, language);
                setSuggestions(results);
            } catch (error) {
                console.error("Error fetching suggestions:", error);
                setSuggestions([]);
            }
        },
        [language]
    );

    // Clear suggestions
    const clearSuggestions = useCallback(() => {
        setSuggestions([]);
    }, []);

    // Validate field
    const validateField = useCallback(
        (field: "term" | "definition") => {
            let isValid = true;
            const newErrors = { ...errors };

            if (field === "term") {
                const termError = validateWordTerm(term);
                if (termError) {
                    newErrors.term = termError;
                    isValid = false;
                } else {
                    delete newErrors.term;
                }
            }

            if (field === "definition") {
                const definitionError = validateWordDefinition(definition);
                if (definitionError) {
                    newErrors.definition = definitionError;
                    isValid = false;
                } else {
                    delete newErrors.definition;
                }
            }

            setErrors(newErrors);
            return isValid;
        },
        [term, definition, errors]
    );

    // Reset form
    const resetForm = useCallback(() => {
        setTerm("");
        setDefinition("");
        setExample("");
        setImage(null);
        setPronunciation(null);
        setErrors({});
        clearSuggestions();
    }, [clearSuggestions]);

    return {
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
        searchSuggestions,
        clearSuggestions,
        validateField,
        resetForm,
    };
};
