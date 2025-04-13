import React, { useState } from "react";
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  Image,
  Alert
} from "react-native";
import { X, Upload, Image as ImageIcon } from "lucide-react-native";
import * as ImagePicker from "expo-image-picker";
import { colors } from "@/constants/colors";

interface WebCameraFallbackProps {
  onClose: () => void;
  onImageSelected: (imageUri: string) => void;
}

export const WebCameraFallback: React.FC<WebCameraFallbackProps> = ({
  onClose,
  onImageSelected
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  const handlePickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.8,
      });
      
      if (!result.canceled && result.assets && result.assets.length > 0) {
        setSelectedImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error picking image:", error);
      Alert.alert("Error", "Failed to select image. Please try again.");
    }
  };
  
  const handleContinue = () => {
    if (selectedImage) {
      onImageSelected(selectedImage);
    } else {
      Alert.alert("Error", "Please select an image first.");
    }
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Upload Image</Text>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <X size={24} color={colors.text} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.content}>
        <View style={styles.imageContainer}>
          {selectedImage ? (
            <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
          ) : (
            <View style={styles.placeholderContainer}>
              <ImageIcon size={64} color={colors.textSecondary} />
              <Text style={styles.placeholderText}>
                Select an image containing text
              </Text>
            </View>
          )}
        </View>
        
        <Text style={styles.infoText}>
          Camera capture is not available on web. Please upload an image from your device.
        </Text>
        
        <View style={styles.actions}>
          <TouchableOpacity 
            style={[styles.actionButton, styles.uploadButton]} 
            onPress={handlePickImage}
          >
            <Upload size={24} color={colors.text} />
            <Text style={styles.actionButtonText}>
              {selectedImage ? "Change Image" : "Select Image"}
            </Text>
          </TouchableOpacity>
          
          {selectedImage && (
            <TouchableOpacity 
              style={[styles.actionButton, styles.continueButton]} 
              onPress={handleContinue}
            >
              <Text style={styles.actionButtonText}>Continue</Text>
            </TouchableOpacity>
          )}
        </View>
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
  closeButton: {
    padding: 4,
  },
  content: {
    flex: 1,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    width: "100%",
    height: 300,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: colors.cardBackground,
    marginBottom: 24,
  },
  selectedImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  placeholderText: {
    color: colors.textSecondary,
    fontSize: 16,
    textAlign: "center",
    marginTop: 16,
  },
  infoText: {
    color: colors.textSecondary,
    fontSize: 14,
    textAlign: "center",
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  actions: {
    width: "100%",
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 12,
  },
  uploadButton: {
    backgroundColor: colors.border,
  },
  continueButton: {
    backgroundColor: colors.primary,
  },
  actionButtonText: {
    color: colors.text,
    fontWeight: "500",
    fontSize: 16,
    marginLeft: 8,
  },
});