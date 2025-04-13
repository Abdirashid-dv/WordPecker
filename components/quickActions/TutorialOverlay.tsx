import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, Pressable } from 'react-native';
import { COLORS } from '@/constants/colors';
import { TUTORIAL_STEPS } from '@/constants/quickActionConstants';
import { ChevronLeft, ChevronRight, X } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface TutorialOverlayProps {
  visible: boolean;
  onClose: () => void;
}

export const TutorialOverlay: React.FC<TutorialOverlayProps> = ({
  visible,
  onClose,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  
  const handleNext = () => {
    if (currentStep < TUTORIAL_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Last step, close tutorial
      handleClose();
    }
  };
  
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const handleClose = () => {
    setCurrentStep(0); // Reset to first step
    onClose();
  };
  
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={handleClose}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.overlay}>
          <View style={styles.tutorialCard}>
            <View style={styles.header}>
              <Text style={styles.title}>{TUTORIAL_STEPS[currentStep].title}</Text>
              <Pressable style={styles.closeButton} onPress={handleClose}>
                <X size={24} color={COLORS.textSecondary} />
              </Pressable>
            </View>
            
            <Text style={styles.description}>
              {TUTORIAL_STEPS[currentStep].description}
            </Text>
            
            <View style={styles.stepsIndicator}>
              {TUTORIAL_STEPS.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.stepDot,
                    index === currentStep && styles.activeStepDot
                  ]}
                />
              ))}
            </View>
            
            <View style={styles.buttonContainer}>
              {currentStep > 0 ? (
                <Pressable style={styles.navButton} onPress={handlePrevious}>
                  <ChevronLeft size={20} color={COLORS.text} />
                  <Text style={styles.navButtonText}>Previous</Text>
                </Pressable>
              ) : (
                <View style={{ width: 100 }} />
              )}
              
              <Pressable style={styles.navButton} onPress={handleNext}>
                <Text style={styles.navButtonText}>
                  {currentStep < TUTORIAL_STEPS.length - 1 ? 'Next' : 'Finish'}
                </Text>
                {currentStep < TUTORIAL_STEPS.length - 1 && (
                  <ChevronRight size={20} color={COLORS.text} />
                )}
              </Pressable>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  tutorialCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 20,
    width: '100%',
    maxWidth: 400,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  closeButton: {
    padding: 4,
  },
  description: {
    fontSize: 16,
    color: COLORS.textSecondary,
    lineHeight: 24,
    marginBottom: 24,
  },
  stepsIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
  },
  stepDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.border,
    marginHorizontal: 4,
  },
  activeStepDot: {
    backgroundColor: COLORS.primary,
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  navButtonText: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '500',
    marginHorizontal: 4,
  },
});