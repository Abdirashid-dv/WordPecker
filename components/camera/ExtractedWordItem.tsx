import React, { useState } from "react";
import { 
  StyleSheet, 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity 
} from "react-native";
import { Edit, Check, X, Trash2 } from "lucide-react-native";
import { colors } from "@/constants/colors";
import { ExtractedWord } from "@/types/dictionary";

interface ExtractedWordItemProps {
  word: ExtractedWord;
  onUpdate: (updates: Partial<ExtractedWord>) => void;
  onRemove: () => void;
}

export const ExtractedWordItem: React.FC<ExtractedWordItemProps> = ({
  word,
  onUpdate,
  onRemove
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTerm, setEditedTerm] = useState(word.term);
  const [editedDefinition, setEditedDefinition] = useState(word.definition);
  
  const handleSaveEdit = () => {
    onUpdate({
      term: editedTerm,
      definition: editedDefinition
    });
    setIsEditing(false);
  };
  
  const handleCancelEdit = () => {
    setEditedTerm(word.term);
    setEditedDefinition(word.definition);
    setIsEditing(false);
  };
  
  return (
    <View style={styles.container}>
      {isEditing ? (
        <View style={styles.editContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Term:</Text>
            <TextInput
              style={styles.input}
              value={editedTerm}
              onChangeText={setEditedTerm}
              placeholder="Enter term"
              placeholderTextColor={colors.textSecondary}
            />
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Definition:</Text>
            <TextInput
              style={[styles.input, styles.definitionInput]}
              value={editedDefinition}
              onChangeText={setEditedDefinition}
              placeholder="Enter definition"
              placeholderTextColor={colors.textSecondary}
              multiline
            />
          </View>
          
          <View style={styles.editActions}>
            <TouchableOpacity 
              style={[styles.editButton, styles.cancelEditButton]} 
              onPress={handleCancelEdit}
            >
              <X size={16} color={colors.text} />
              <Text style={styles.editButtonText}>Cancel</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.editButton, styles.saveEditButton]} 
              onPress={handleSaveEdit}
            >
              <Check size={16} color={colors.text} />
              <Text style={styles.editButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.wordContainer}>
          <View style={styles.wordInfo}>
            <Text style={styles.term}>{word.term}</Text>
            <Text style={styles.definition}>{word.definition}</Text>
            {word.confidence && (
              <Text style={styles.confidence}>
                Confidence: {Math.round(word.confidence * 100)}%
              </Text>
            )}
          </View>
          
          <View style={styles.actions}>
            <TouchableOpacity 
              style={styles.actionButton} 
              onPress={() => setIsEditing(true)}
            >
              <Edit size={18} color={colors.accent} />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.actionButton} 
              onPress={onRemove}
            >
              <Trash2 size={18} color={colors.error} />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.cardBackground,
    borderRadius: 8,
    marginBottom: 12,
    overflow: "hidden",
  },
  wordContainer: {
    flexDirection: "row",
    padding: 12,
  },
  wordInfo: {
    flex: 1,
  },
  term: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 4,
  },
  definition: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  confidence: {
    fontSize: 12,
    color: colors.accent,
  },
  actions: {
    justifyContent: "center",
  },
  actionButton: {
    padding: 6,
  },
  editContainer: {
    padding: 12,
  },
  inputGroup: {
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  input: {
    backgroundColor: colors.background,
    borderRadius: 4,
    padding: 8,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.border,
  },
  definitionInput: {
    minHeight: 60,
    textAlignVertical: "top",
  },
  editActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginLeft: 8,
  },
  cancelEditButton: {
    backgroundColor: colors.border,
  },
  saveEditButton: {
    backgroundColor: colors.accent,
  },
  editButtonText: {
    color: colors.text,
    fontSize: 14,
    marginLeft: 4,
  },
});