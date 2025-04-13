import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Modal, FlatList, Platform } from "react-native";
import { X, Check, FileText } from "lucide-react-native";
import { colors } from "@/constants/colors";
import { TEMPLATES } from "@/constants/templates";

interface TemplateSelectorProps {
  selectedTemplateId: string | null;
  onSelect: (templateId: string | null) => void;
  onClose: () => void;
}

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  selectedTemplateId,
  onSelect,
  onClose,
}) => {
  const renderTemplateItem = ({ item }) => {
    const isSelected = selectedTemplateId === item.id;
    
    return (
      <TouchableOpacity
        style={[styles.templateItem, isSelected && styles.selectedTemplateItem]}
        onPress={() => onSelect(item.id)}
      >
        <View style={styles.templateInfo}>
          <Text style={[styles.templateName, isSelected && styles.selectedTemplateName]}>
            {item.name}
          </Text>
          <Text style={styles.templateDescription}>
            {item.description} • {item.wordCount} words
          </Text>
        </View>
        {isSelected && <Check size={20} color={colors.primary} />}
      </TouchableOpacity>
    );
  };
  
  return (
    <Modal
      visible={true}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.title}>Select Template</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <X size={24} color={colors.text} />
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity
            style={[
              styles.noTemplateItem, 
              selectedTemplateId === null && styles.selectedTemplateItem
            ]}
            onPress={() => onSelect(null)}
          >
            <View style={styles.templateInfo}>
              <Text style={[
                styles.templateName, 
                selectedTemplateId === null && styles.selectedTemplateName
              ]}>
                No Template
              </Text>
              <Text style={styles.templateDescription}>
                Create an empty list with no pre-filled words
              </Text>
            </View>
            {selectedTemplateId === null && <Check size={20} color={colors.primary} />}
          </TouchableOpacity>
          
          <FlatList
            data={TEMPLATES}
            renderItem={renderTemplateItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.templateList}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: colors.cardBackground,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingBottom: Platform.OS === "ios" ? 40 : 20,
    maxHeight: "70%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: colors.text,
  },
  closeButton: {
    padding: 4,
  },
  templateList: {
    paddingHorizontal: 20,
  },
  noTemplateItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    marginBottom: 8,
  },
  templateItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  selectedTemplateItem: {
    borderBottomColor: colors.primary,
  },
  templateInfo: {
    flex: 1,
    marginRight: 12,
  },
  templateName: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.text,
    marginBottom: 4,
  },
  selectedTemplateName: {
    color: colors.primary,
    fontWeight: "600",
  },
  templateDescription: {
    fontSize: 14,
    color: colors.textSecondary,
  },
});