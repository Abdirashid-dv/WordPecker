import { fetchWordDefinition } from "@/services/dictionaryService";

interface BulkParseOptions {
    format: "term-definition" | "term-only";
    separator: "line" | "comma" | "tab";
    definitionSeparator?: "colon" | "dash" | "tab";
    language: string;
}

export const parseBulkWords = (
    text: string,
    options: BulkParseOptions
): Array<{ term: string; definition: string; example?: string }> => {
    if (!text.trim()) return [];

    const { format, separator, definitionSeparator, language } = options;
    const words: Array<{ term: string; definition: string; example?: string }> =
        [];

    // Split text based on separator
    let items: string[] = [];
    if (separator === "line") {
        items = text.split(/\r?\n/).filter((line) => line.trim());
    } else if (separator === "comma") {
        items = text
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean);
    } else if (separator === "tab") {
        items = text.split(/\t/).filter((item) => item.trim());
    }

    // Process each item
    for (const item of items) {
        if (format === "term-definition") {
            let term = "";
            let definition = "";

            if (definitionSeparator === "colon") {
                const parts = item.split(":");
                if (parts.length >= 2) {
                    term = parts[0].trim();
                    definition = parts.slice(1).join(":").trim();
                }
            } else if (definitionSeparator === "dash") {
                const parts = item.split("-");
                if (parts.length >= 2) {
                    term = parts[0].trim();
                    definition = parts.slice(1).join("-").trim();
                }
            } else if (definitionSeparator === "tab") {
                const parts = item.split(/\t/);
                if (parts.length >= 2) {
                    term = parts[0].trim();
                    definition = parts.slice(1).join(" ").trim();
                }
            }

            if (term && definition) {
                words.push({ term, definition });
            }
        } else {
            // Term only format - we'll fetch definitions later
            const term = item.trim();
            if (term) {
                words.push({
                    term,
                    definition: `Definition for "${term}" in ${language}. This is a placeholder.`,
                });
            }
        }
    }

    return words;
};

// This function would be used in a real app to fetch definitions for terms
// that were added without definitions (e.g., in term-only bulk add)
export const fetchDefinitionsForTerms = async (
    terms: string[],
    language: string
): Promise<Record<string, string>> => {
    const definitions: Record<string, string> = {};

    // In a real app, we might use Promise.all with rate limiting
    // For now, we'll just simulate sequential fetching
    for (const term of terms) {
        try {
            const definition = await fetchWordDefinition(term, language);
            definitions[term] = definition;
        } catch (error) {
            console.error(`Error fetching definition for ${term}:`, error);
            definitions[
                term
            ] = `Definition for "${term}" could not be fetched.`;
        }
    }

    return definitions;
};
