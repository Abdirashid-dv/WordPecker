import { useState, useCallback } from "react";
import { useWordListStore } from "@/stores/wordListStore";
import { Language, WordList } from "@/types/wordList";
import { validateListName, validateLanguage } from "@/utils/validationUtils";
import { generateWordsFromTemplate } from "@/utils/templateUtils";

interface FormData {
  name: string;
  description: string;
  language: Language | null;
  templateId: string | null;
  tags: string;
  addWordsAfterCreation: boolean;
}

interface FormErrors {
  name?: string;
  language?: string;
}

export const useCreateList = () => {
  const { addWordList } = useWordListStore();
  
  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    language: null,
    templateId: null,
    tags: "",
    addWordsAfterCreation: false,
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const setFormField = useCallback((field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when field is updated
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  }, [errors]);
  
  const validateField = useCallback((field: keyof FormData) => {
    let isValid = true;
    const newErrors = { ...errors };
    
    if (field === "name") {
      const nameError = validateListName(formData.name);
      if (nameError) {
        newErrors.name = nameError;
        isValid = false;
      } else {
        delete newErrors.name;
      }
    }
    
    if (field === "language") {
      const languageError = validateLanguage(formData.language);
      if (languageError) {
        newErrors.language = languageError;
        isValid = false;
      } else {
        delete newErrors.language;
      }
    }
    
    setErrors(newErrors);
    return isValid;
  }, [formData, errors]);
  
  const validateForm = useCallback(() => {
    const newErrors: FormErrors = {};
    let isValid = true;
    
    // Validate name
    const nameError = validateListName(formData.name);
    if (nameError) {
      newErrors.name = nameError;
      isValid = false;
    }
    
    // Validate language
    const languageError = validateLanguage(formData.language);
    if (languageError) {
      newErrors.language = languageError;
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  }, [formData]);
  
  const handleSubmit = useCallback(async () => {
    if (!validateForm()) {
      return false;
    }
    
    setIsSubmitting(true);
    
    try {
      // Process tags
      const tagsList = formData.tags
        .split(",")
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);
      
      // Generate words from template if selected
      const words = formData.templateId
        ? generateWordsFromTemplate(formData.templateId, formData.language as Language)
        : [];
      
      // Create new list
      const newList: WordList = {
        id: `list-${Date.now()}`,
        name: formData.name,
        description: formData.description || "",
        language: formData.language as Language,
        createdAt: new Date(),
        updatedAt: new Date(),
        words,
        tags: tagsList,
        isFavorite: false,
      };
      
      // Add to store
      addWordList(newList);
      
      setIsSubmitting(false);
      return newList;
    } catch (error) {
      console.error("Error creating list:", error);
      setIsSubmitting(false);
      return false;
    }
  }, [formData, validateForm, addWordList]);
  
  const resetForm = useCallback(() => {
    setFormData({
      name: "",
      description: "",
      language: null,
      templateId: null,
      tags: "",
      addWordsAfterCreation: false,
    });
    setErrors({});
  }, []);
  
  return {
    formData,
    errors,
    isSubmitting,
    setFormField,
    validateField,
    handleSubmit,
    resetForm,
  };
};