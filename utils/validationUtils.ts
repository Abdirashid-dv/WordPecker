import { Language } from "@/types/wordList";

export const validateListName = (name: string): string | undefined => {
  if (!name || name.trim() === "") {
    return "List name is required";
  }
  
  if (name.length < 3) {
    return "List name must be at least 3 characters";
  }
  
  if (name.length > 50) {
    return "List name must be less than 50 characters";
  }
  
  return undefined;
};

export const validateLanguage = (language: Language | null): string | undefined => {
  if (!language) {
    return "Language is required";
  }
  
  return undefined;
};

export const validateDescription = (description: string): string | undefined => {
  if (description && description.length > 200) {
    return "Description must be less than 200 characters";
  }
  
  return undefined;
};

export const validateTags = (tags: string): string | undefined => {
  if (tags && tags.length > 100) {
    return "Tags must be less than 100 characters total";
  }
  
  return undefined;
};

export const validateWordTerm = (term: string): string | undefined => {
  if (!term || term.trim() === "") {
    return "Term is required";
  }
  
  if (term.length > 50) {
    return "Term must be less than 50 characters";
  }
  
  return undefined;
};

export const validateWordDefinition = (definition: string): string | undefined => {
  if (!definition || definition.trim() === "") {
    return "Definition is required";
  }
  
  if (definition.length > 500) {
    return "Definition must be less than 500 characters";
  }
  
  return undefined;
};