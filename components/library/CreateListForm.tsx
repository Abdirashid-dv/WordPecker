import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert, Platform } from "react-native";
import { useRouter } from "expo-router";
import { Check, ChevronDown, X, Plus, Info } from "lucide-react-native";
import { colors } from "@/constants/colors";
import { useCreateList } from "@/hooks/useCreateList";
import { Language } from "@/types/wordList";
import { LANGUAGES } from "@/constants/libraryOptions";
import { TEMPLATES } from "@/constants/templates";
import { LanguageSelector } from "./LanguageSelector";
import { TemplateSelector } from "./TemplateSelector";

interface CreateListFormProps {
  onClose: () => void;
}

export const CreateListForm: React.FC<CreateListFormProps> = ({ onClose }) => {
  const router = useRouter();
  const {
    formData,
    errors,
    isSubmitting,
    setFormField,
    validateField,
    handleSubmit,
    resetForm,
  } = useCreateList();
  
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);
  const [showTemplateSelector, setShowTemplateSelector] = useState(false);
  
  const handleLanguageSelect = (language: Language) => {
    setFormField("language", language);
    setShowLanguageSelector(false);
  };
  
  const handleTemplateSelect = (templateId: string | null) => {
    setFormField("templateId", templateId);
    setShowTemplateSelector(false);
  };
  
  const handleCreateList = async () => {
    const success = await handleSubmit();
    if (success) {
      if (formData.addWordsAfterCreation) {
        // Navigate to add words screen
        Alert.alert("Success", "List created! You can now add words.");
        // router.push(`/add-words/${success.id}`);
      } else {
        Alert.alert("Success", "List created successfully!");
        resetForm();
        onClose();
      }
    }
  };
  
  const selectedTemplate = formData.templateId 
    ? TEMPLATES.find(t => t.id === formData.templateId) 
    : null;
  
  return (
    <View style={styles.container}>
      <View style={styles.formGroup}>
        <Text style={styles.label}>List Name*</Text>
        <TextInput
          style={[styles.input, errors.name && styles.inputError]}
          placeholder="Enter list name"
          placeholderTextColor={colors.textSecondary}
          value={formData.name}
          onChangeText={(text) => setFormField("name", text)}
          onBlur={() => validateField("name")}
        />
        {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
      </View>
      
      <View style={styles.formGroup}>
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={styles.input}
          placeholder="What is this list for? (optional)"
          placeholderTextColor={colors.textSecondary}
          value={formData.description}
          onChangeText={(text) => setFormField("description", text)}
          multiline
          numberOfLines={3}
          textAlignVertical="top"
        />
      </View>
      
      <View style={styles.formGroup}>
        <Text style={styles.label}>Language*</Text>
        <TouchableOpacity 
          style={[styles.selector, errors.language && styles.inputError]} 
          onPress={() => setShowLanguageSelector(true)}
        >
          <Text style={[
            styles.selectorText, 
            !formData.language && styles.placeholderText
          ]}>
            {formData.language || "Select a language"}
          </Text>
          <ChevronDown size={20} color={colors.textSecondary} />
        </TouchableOpacity>
        {errors.language && <Text style={styles.errorText}>{errors.language}</Text>}
      </View>
      
      <View style={styles.formGroup}>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Template</Text>
          <TouchableOpacity 
            style={styles.infoButton}
            onPress={() => Alert.alert(
              "Templates",
              "Templates provide pre-defined sets of words to help you get started quickly."
            )}
          >
            <Info size={16} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity 
          style={styles.selector} 
          onPress={() => setShowTemplateSelector(true)}
        >
          <Text style={[
            styles.selectorText, 
            !formData.templateId && styles.placeholderText
          ]}>
            {selectedTemplate?.name || "No template (empty list)"}
          </Text>
          <ChevronDown size={20} color={colors.textSecondary} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.formGroup}>
        <Text style={styles.label}>Tags</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter tags separated by commas (optional)"
          placeholderTextColor={colors.textSecondary}
          value={formData.tags}
          onChangeText={(text) => setFormField("tags", text)}
        />
      </View>
      
      <View style={styles.checkboxContainer}>
        <TouchableOpacity
          style={styles.checkbox}
          onPress={() => setFormField("addWordsAfterCreation", !formData.addWordsAfterCreation)}
        >
          <View style={[
            styles.checkboxInner, 
            formData.addWordsAfterCreation && styles.checkboxChecked
          ]}>
            {formData.addWordsAfterCreation && <Check size={16} color={colors.text} />}
          </View>
        </TouchableOpacity>
        <Text style={styles.checkboxLabel}>Add words after creation</Text>
      </View>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.cancelButton} 
          onPress={onClose}
        >
          <X size={20} color={colors.text} />
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.createButton, isSubmitting && styles.createButtonDisabled]} 
          onPress={handleCreateList}
          disabled={isSubmitting}
        >
          <Plus size={20} color={colors.text} />
          <Text style={styles.createButtonText}>Create List</Text>
        </TouchableOpacity>
      </View>
      
      {showLanguageSelector && (
        <LanguageSelector
          selectedLanguage={formData.language}
          onSelect={handleLanguageSelect}
          onClose={() => setShowLanguageSelector(false)}
        />
      )}
      
      {showTemplateSelector && (
        <TemplateSelector
          selectedTemplateId={formData.templateId}
          onSelect={handleTemplateSelect}
          onClose={() => setShowTemplateSelector(false)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    padding: 20,
  },
  formGroup: {
    marginBottom: 20,
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.text,
    marginBottom: 8,
  },
  infoButton: {
    marginLeft: 8,
    padding: 2,
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
  placeholderText: {
    color: colors.textSecondary,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  checkboxInner: {
    width: 16,
    height: 16,
    borderRadius: 2,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxChecked: {
    backgroundColor: colors.primary,
  },
  checkboxLabel: {
    color: colors.text,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cancelButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.border,
    borderRadius: 8,
    padding: 12,
    flex: 1,
    marginRight: 12,
  },
  cancelButtonText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 8,
  },
  createButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    borderRadius: 8,
    padding: 12,
    flex: 1,
  },
  createButtonDisabled: {
    opacity: 0.7,
  },
  createButtonText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 8,
  },
});