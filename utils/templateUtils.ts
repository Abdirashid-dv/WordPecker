import { Word, Language, WordStatus } from "@/types/wordList";
import { TEMPLATES } from "@/constants/templates";

export const generateWordsFromTemplate = (templateId: string, language: Language): Word[] => {
  const template = TEMPLATES.find(t => t.id === templateId);
  
  if (!template) {
    return [];
  }
  
  // If the template has predefined words for the selected language, use those
  if (template.words && template.words[language]) {
    return template.words[language].map((word, index) => ({
      id: `word-${templateId}-${language.toLowerCase()}-${index}`,
      term: word.term,
      definition: word.definition,
      example: word.example,
      status: "new" as WordStatus,
    }));
  }
  
  // Otherwise, return an empty array
  return [];
};

export const getTemplateWordCount = (templateId: string, language: Language): number => {
  const template = TEMPLATES.find(t => t.id === templateId);
  
  if (!template) {
    return 0;
  }
  
  if (template.words && template.words[language]) {
    return template.words[language].length;
  }
  
  return 0;
};