import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Modal, 
  Pressable, 
  ScrollView, 
  TextInput,
  Platform
} from 'react-native';
import { COLORS } from '@/constants/colors';
import { GoalType } from '@/types/motivation';
import { DEFAULT_REMINDER_TIMES, GOAL_TYPES } from '@/constants/motivationConstants';
import { formatTimeString } from '@/utils/motivationUtils';
import { 
  X, 
  BookOpen, 
  Clock, 
  CheckCircle, 
  FileText, 
  Target,
  Bell,
  BellOff
} from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface GoalCreationModalProps {
  visible: boolean;
  onClose: () => void;
  onCreateGoal: (
    type: GoalType,
    target: number,
    reminderTime: string | null,
    customTitle?: string,
    customDescription?: string
  ) => void;
  defaultReminderTime: string | null;
  remindersEnabled: boolean;
}

export const GoalCreationModal: React.FC<GoalCreationModalProps> = ({
  visible,
  onClose,
  onCreateGoal,
  defaultReminderTime,
  remindersEnabled,
}) => {
  const [selectedType, setSelectedType] = useState<GoalType>(GoalType.WORDS_TO_LEARN);
  const [target, setTarget] = useState<string>('10');
  const [customTitle, setCustomTitle] = useState<string>('');
  const [customDescription, setCustomDescription] = useState<string>('');
  const [reminderTime, setReminderTime] = useState<string | null>(defaultReminderTime);
  
  // Reset form when modal is opened
  React.useEffect(() => {
    if (visible) {
      const defaultTarget = GOAL_TYPES[selectedType].defaultTarget.toString();
      setTarget(defaultTarget);
      setCustomTitle('');
      setCustomDescription('');
      setReminderTime(defaultReminderTime);
    }
  }, [visible, selectedType, defaultReminderTime]);
  
  // Handle goal type selection
  const handleSelectType = (type: GoalType) => {
    setSelectedType(type);
    const defaultTarget = GOAL_TYPES[type].defaultTarget.toString();
    setTarget(defaultTarget);
  };
  
  // Handle target change
  const handleTargetChange = (value: string) => {
    // Allow only numbers
    if (/^\d*$/.test(value)) {
      setTarget(value);
    }
  };
  
  // Handle reminder time selection
  const handleSelectReminderTime = (time: string | null) => {
    setReminderTime(time);
  };
  
  // Handle create goal
  const handleCreateGoal = () => {
    const targetNumber = parseInt(target, 10) || GOAL_TYPES[selectedType].defaultTarget;
    
    onCreateGoal(
      selectedType,
      targetNumber,
      reminderTime,
      customTitle.trim() || undefined,
      customDescription.trim() || undefined
    );
    
    onClose();
  };
  
  // Render goal type icon
  const renderGoalTypeIcon = (type: GoalType) => {
    const iconSize = 24;
    const iconColor = GOAL_TYPES[type].color;
    
    switch (type) {
      case GoalType.WORDS_TO_LEARN:
        return <BookOpen size={iconSize} color={iconColor} />;
      case GoalType.MINUTES_TO_STUDY:
        return <Clock size={iconSize} color={iconColor} />;
      case GoalType.QUIZZES_TO_COMPLETE:
        return <CheckCircle size={iconSize} color={iconColor} />;
      case GoalType.ARTICLES_TO_READ:
        return <FileText size={iconSize} color={iconColor} />;
      case GoalType.CUSTOM:
      default:
        return <Target size={iconSize} color={iconColor} />;
    }
  };
  
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.title}>Create New Goal</Text>
            <Pressable style={styles.closeButton} onPress={onClose}>
              <X size={24} color={COLORS.textSecondary} />
            </Pressable>
          </View>
          
          <ScrollView style={styles.scrollContent}>
            <Text style={styles.sectionTitle}>Goal Type</Text>
            <View style={styles.goalTypesContainer}>
              {Object.values(GoalType).map((type) => (
                <Pressable
                  key={type}
                  style={[
                    styles.goalTypeButton,
                    selectedType === type && styles.selectedGoalTypeButton,
                    { borderColor: GOAL_TYPES[type].color }
                  ]}
                  onPress={() => handleSelectType(type)}
                >
                  <View style={styles.goalTypeIconContainer}>
                    {renderGoalTypeIcon(type)}
                  </View>
                  <Text 
                    style={[
                      styles.goalTypeLabel,
                      selectedType === type && styles.selectedGoalTypeLabel
                    ]}
                  >
                    {GOAL_TYPES[type].label}
                  </Text>
                  <Text style={styles.goalTypeDescription}>
                    {GOAL_TYPES[type].description}
                  </Text>
                </Pressable>
              ))}
            </View>
            
            <Text style={styles.sectionTitle}>Target</Text>
            <View style={styles.targetContainer}>
              <TextInput
                style={styles.targetInput}
                value={target}
                onChangeText={handleTargetChange}
                keyboardType="numeric"
                placeholder="Enter target"
                placeholderTextColor={COLORS.textSecondary}
              />
              <Text style={styles.targetUnit}>
                {GOAL_TYPES[selectedType].unit}
              </Text>
            </View>
            
            {selectedType === GoalType.CUSTOM && (
              <>
                <Text style={styles.sectionTitle}>Custom Goal Details</Text>
                <TextInput
                  style={styles.textInput}
                  value={customTitle}
                  onChangeText={setCustomTitle}
                  placeholder="Goal title (optional)"
                  placeholderTextColor={COLORS.textSecondary}
                />
                <TextInput
                  style={[styles.textInput, styles.textAreaInput]}
                  value={customDescription}
                  onChangeText={setCustomDescription}
                  placeholder="Goal description (optional)"
                  placeholderTextColor={COLORS.textSecondary}
                  multiline
                  numberOfLines={3}
                />
              </>
            )}
            
            {remindersEnabled && (
              <>
                <Text style={styles.sectionTitle}>Reminder</Text>
                <View style={styles.reminderContainer}>
                  <Pressable
                    style={[
                      styles.reminderButton,
                      !reminderTime && styles.selectedReminderButton
                    ]}
                    onPress={() => handleSelectReminderTime(null)}
                  >
                    <BellOff size={18} color={!reminderTime ? COLORS.primary : COLORS.textSecondary} />
                    <Text 
                      style={[
                        styles.reminderButtonText,
                        !reminderTime && styles.selectedReminderButtonText
                      ]}
                    >
                      No Reminder
                    </Text>
                  </Pressable>
                  
                  {DEFAULT_REMINDER_TIMES.map((time) => (
                    <Pressable
                      key={time}
                      style={[
                        styles.reminderButton,
                        reminderTime === time && styles.selectedReminderButton
                      ]}
                      onPress={() => handleSelectReminderTime(time)}
                    >
                      <Bell size={18} color={reminderTime === time ? COLORS.primary : COLORS.textSecondary} />
                      <Text 
                        style={[
                          styles.reminderButtonText,
                          reminderTime === time && styles.selectedReminderButtonText
                        ]}
                      >
                        {formatTimeString(time)}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </>
            )}
          </ScrollView>
          
          <View style={styles.footer}>
            <Pressable 
              style={styles.cancelButton}
              onPress={onClose}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </Pressable>
            
            <Pressable 
              style={styles.createButton}
              onPress={handleCreateGoal}
            >
              <Text style={styles.createButtonText}>Create Goal</Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: COLORS.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 16,
    paddingHorizontal: 16,
    maxHeight: '90%',
    ...(Platform.OS === 'web' ? {
      width: '100%',
      maxWidth: 500,
      alignSelf: 'center',
      borderRadius: 20,
      marginBottom: 40,
    } : {})
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
  scrollContent: {
    maxHeight: 500,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginTop: 16,
    marginBottom: 12,
  },
  goalTypesContainer: {
    marginBottom: 8,
  },
  goalTypeButton: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedGoalTypeButton: {
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
  },
  goalTypeIconContainer: {
    marginBottom: 8,
  },
  goalTypeLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 4,
  },
  selectedGoalTypeLabel: {
    color: COLORS.primary,
  },
  goalTypeDescription: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  targetContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  targetInput: {
    flex: 1,
    height: 48,
    color: COLORS.text,
    fontSize: 16,
  },
  targetUnit: {
    color: COLORS.textSecondary,
    fontSize: 14,
    marginLeft: 8,
  },
  textInput: {
    backgroundColor: COLORS.surface,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    color: COLORS.text,
    fontSize: 16,
    marginBottom: 12,
  },
  textAreaInput: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  reminderContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  reminderButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  selectedReminderButton: {
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
  },
  reminderButtonText: {
    color: COLORS.textSecondary,
    fontSize: 14,
    marginLeft: 6,
  },
  selectedReminderButtonText: {
    color: COLORS.primary,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  cancelButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 12,
  },
  cancelButtonText: {
    color: COLORS.textSecondary,
    fontSize: 16,
  },
  createButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  createButtonText: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '600',
  },
});