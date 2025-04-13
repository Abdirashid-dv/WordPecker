import React, { useState, useRef, useEffect } from "react";
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  Platform, 
  Image,
  ActivityIndicator,
  Alert
} from "react-native";
import { Camera } from "expo-camera";
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";
import { useRouter } from "expo-router";
import { Camera as CameraIcon, X, Image as ImageIcon, Scan, Check } from "lucide-react-native";
import * as ImagePicker from "expo-image-picker";
import { colors } from "@/constants/colors";
import { useCameraCapture } from "@/hooks/useCameraCapture";
import { WebCameraFallback } from "./WebCameraFallback";
import { ExtractedWordsList } from "./ExtractedWordsList";

interface CameraCaptureProps {
  listId: string;
  onClose: () => void;
  onSaveWords: (words: Array<{term: string, definition: string, example?: string}>) => void;
}

export const CameraCapture: React.FC<CameraCaptureProps> = ({
  listId,
  onClose,
  onSaveWords
}) => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [showExtractedWords, setShowExtractedWords] = useState(false);
  const cameraRef = useRef<Camera>(null);
  const router = useRouter();
  
  const {
    isProcessing,
    extractedWords,
    processImage,
    clearExtractedWords,
    updateExtractedWord,
    removeExtractedWord,
    saveExtractedWords
  } = useCameraCapture(listId);
  
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === 'granted');
        
        if (status !== 'granted') {
          Alert.alert(
            "Camera Permission Required",
            "Please grant camera permission to use this feature.",
            [{ text: "OK", onPress: onClose }]
          );
        }
      }
    })();
  }, [onClose]);
  
  const handleCapture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        
        // Optimize image for OCR
        const optimizedImage = await manipulateAsync(
          photo.uri,
          [{ resize: { width: 1000 } }],
          { compress: 0.8, format: SaveFormat.JPEG }
        );
        
        setCapturedImage(optimizedImage.uri);
        
        // Process image for OCR
        await processImage(optimizedImage.uri);
        setShowExtractedWords(true);
      } catch (error) {
        console.error("Error capturing image:", error);
        Alert.alert("Error", "Failed to capture image. Please try again.");
      }
    }
  };
  
  const handlePickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.8,
      });
      
      if (!result.canceled && result.assets && result.assets.length > 0) {
        setCapturedImage(result.assets[0].uri);
        
        // Process image for OCR
        await processImage(result.assets[0].uri);
        setShowExtractedWords(true);
      }
    } catch (error) {
      console.error("Error picking image:", error);
      Alert.alert("Error", "Failed to select image. Please try again.");
    }
  };
  
  const handleRetake = () => {
    setCapturedImage(null);
    clearExtractedWords();
    setShowExtractedWords(false);
  };
  
  const handleSaveWords = () => {
    const words = saveExtractedWords();
    onSaveWords(words);
  };
  
  // Web fallback
  if (Platform.OS === 'web') {
    return (
      <WebCameraFallback 
        onClose={onClose}
        onImageSelected={async (imageUri) => {
          setCapturedImage(imageUri);
          await processImage(imageUri);
          setShowExtractedWords(true);
        }}
      />
    );
  }
  
  // Permission not granted yet
  if (hasPermission === null) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Requesting camera permission...</Text>
      </View>
    );
  }
  
  // Permission denied
  if (hasPermission === false) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>
          Camera access is required for this feature.
        </Text>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
  // Show extracted words list
  if (showExtractedWords) {
    return (
      <ExtractedWordsList
        words={extractedWords}
        isProcessing={isProcessing}
        capturedImage={capturedImage}
        onUpdateWord={updateExtractedWord}
        onRemoveWord={removeExtractedWord}
        onSave={handleSaveWords}
        onRetake={handleRetake}
        onClose={onClose}
      />
    );
  }
  
  // Camera view
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Capture Words</Text>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <X size={24} color={colors.text} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.cameraContainer}>
        {capturedImage ? (
          <Image source={{ uri: capturedImage }} style={styles.camera} />
        ) : (
          <Camera
            ref={cameraRef}
            style={styles.camera}
            type={Camera.Constants.Type.back}
            ratio="4:3"
            autoFocus={Camera.Constants.AutoFocus.on}
          >
            <View style={styles.captureGuide}>
              <View style={styles.captureGuideBox} />
              <Text style={styles.captureGuideText}>
                Position text within the box
              </Text>
            </View>
          </Camera>
        )}
      </View>
      
      <View style={styles.footer}>
        {capturedImage ? (
          <View style={styles.capturedActions}>
            <TouchableOpacity 
              style={[styles.actionButton, styles.retakeButton]} 
              onPress={handleRetake}
            >
              <CameraIcon size={24} color={colors.text} />
              <Text style={styles.actionButtonText}>Retake</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.actionButton, styles.extractButton]} 
              onPress={() => setShowExtractedWords(true)}
            >
              <Scan size={24} color={colors.text} />
              <Text style={styles.actionButtonText}>Extract Words</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.captureActions}>
            <TouchableOpacity 
              style={[styles.actionButton, styles.galleryButton]} 
              onPress={handlePickImage}
            >
              <ImageIcon size={24} color={colors.text} />
              <Text style={styles.actionButtonText}>Gallery</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.actionButton, styles.captureButton]} 
              onPress={handleCapture}
            >
              <View style={styles.captureButtonInner}>
                <CameraIcon size={24} color={colors.text} />
              </View>
            </TouchableOpacity>
            
            <View style={styles.spacer} />
          </View>
        )}
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
  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
    padding: 20,
  },
  permissionText: {
    fontSize: 16,
    color: colors.text,
    textAlign: "center",
    marginBottom: 20,
  },
  closeButtonText: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: "600",
  },
  cameraContainer: {
    flex: 1,
    overflow: "hidden",
    borderRadius: 12,
    margin: 16,
  },
  camera: {
    flex: 1,
  },
  captureGuide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  captureGuideBox: {
    width: "80%",
    height: "40%",
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 8,
    opacity: 0.7,
  },
  captureGuideText: {
    color: colors.text,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 8,
    borderRadius: 4,
    marginTop: 16,
    fontSize: 14,
  },
  footer: {
    padding: 16,
    backgroundColor: colors.cardBackground,
  },
  captureActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  capturedActions: {
    flexDirection: "row",
    justifyContent: "space-between",
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
  galleryButton: {
    backgroundColor: colors.border,
  },
  captureButton: {
    backgroundColor: colors.primary,
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    padding: 0,
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: `${colors.primary}80`,
    justifyContent: "center",
    alignItems: "center",
  },
  retakeButton: {
    backgroundColor: colors.border,
  },
  extractButton: {
    backgroundColor: colors.accent,
  },
  actionButtonText: {
    color: colors.text,
    fontWeight: "500",
    fontSize: 16,
    marginLeft: 8,
  },
  spacer: {
    flex: 1,
  },
});