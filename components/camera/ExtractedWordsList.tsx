import React from "react";
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  Image,
  ActivityIndicator
} from "react-native";
import { X, Check, ArrowLeft, Trash2 } from "lucide-react-native";
import { colors } from "@/constants/colors";
import { ExtractedWord } from "@/types/dictionary";
import { ExtractedWordItem } from "./ExtractedWordItem";

interface ExtractedWordsListProps {
  words: ExtractedWord[];
  isProcessing: boolean;
  capturedImage: string | null;
  onUpdateWord: (index: number, updates: Partial<ExtractedWord>) => void;
  onRemoveWord: (index: number) => void;
  onSave: () => void;
  onRetake: () => void;
  onClose: () => void;
}

export const ExtractedWordsList: React.FC<ExtractedWordsListProps> = ({
  words,
  isProcessing,
  capturedImage,
  onUpdateWord,
  onRemoveWord,
  onSave,
  onRetake,
  onClose
}) => {
  if (isProcessing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Extracting words from image...</Text>
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onRetake}>
          <ArrowLeft size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Review Words</Text>
        <TouchableOpacity onPress={onClose}>
          <X size={24} color={colors.text} />
        </TouchableOpacity>
      </View>
      
      {capturedImage && (
        <View style={styles.imagePreviewContainer}>
          <Image source={{ uri: capturedImage }} style={styles.imagePreview} />
        </View>
      )}
      
      <View style={styles.wordsContainer}>
        <Text style={styles.sectionTitle}>
          Extracted Words ({words.length})
        </Text>
        
        {words.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              No words were extracted from the image. Try capturing a clearer image or manually add words.
            </Text>
          </View>
        ) : (
          <ScrollView style={styles.wordsList}>
            {words.map((word, index) => (
              <ExtractedWordItem
                key={index}
                word={word}
                onUpdate={(updates) => onUpdateWord(index, updates)}
                onRemove={() => onRemoveWord(index)}
              />
            ))}
          </ScrollView>
        )}
      </View>
      
      <View style={styles.footer}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.cancelButton]} 
          onPress={onRetake}
        >
          <Trash2 size={20} color={colors.text} />
          <Text style={styles.actionButtonText}>Discard</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.actionButton, 
            styles.saveButton,
            words.length === 0 && styles.disabledButton
          ]} 
          onPress={onSave}
          disabled={words.length === 0}
        >
          <Check size={20} color={colors.text} />
          <Text style={styles.actionButtonText}>Save Words</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: colors.cardBackground,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: colors.text,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: colors.text,
  },
  imagePreviewContainer: {
    height: 150,
    margin: 16,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: colors.cardBackground,
  },
  imagePreview: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  wordsContainer: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 12,
  },
  wordsList: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    color: colors.textSecondary,
    fontSize: 16,
    textAlign: "center",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: colors.cardBackground,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 8,
  },
  cancelButton: {
    backgroundColor: colors.border,
  },
  saveButton: {
    backgroundColor: colors.primary,
  },
  disabledButton: {
    opacity: 0.5,
  },
  actionButtonText: {
    color: colors.text,
    fontWeight: "500",
    fontSize: 16,
    marginLeft: 8,
  },
});