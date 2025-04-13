import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { COLORS } from '@/constants/colors';
import { QuickAction } from '@/types/quickAction';
import { 
  Brain, 
  BookOpen, 
  BarChart2, 
  ListPlus, 
  Calendar, 
  Mic, 
  BookMarked, 
  FileText,
  ChevronUp,
  ChevronDown,
  ToggleLeft,
  ToggleRight
} from 'lucide-react-native';

interface ActionButtonProps {
  action: QuickAction;
  isEditMode: boolean;
  onPress: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  onToggle?: () => void;
  style?: any;
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  action,
  isEditMode,
  onPress,
  onMoveUp,
  onMoveDown,
  onToggle,
  style,
}) => {
  // Render icon based on action.icon
  const renderIcon = () => {
    const iconSize = 24;
    const iconColor = COLORS.text;
    
    switch (action.icon) {
      case 'Brain':
        return <Brain size={iconSize} color={iconColor} />;
      case 'BookOpen':
        return <BookOpen size={iconSize} color={iconColor} />;
      case 'BarChart2':
        return <BarChart2 size={iconSize} color={iconColor} />;
      case 'ListPlus':
        return <ListPlus size={iconSize} color={iconColor} />;
      case 'Calendar':
        return <Calendar size={iconSize} color={iconColor} />;
      case 'Mic':
        return <Mic size={iconSize} color={iconColor} />;
      case 'BookMarked':
        return <BookMarked size={iconSize} color={iconColor} />;
      case 'FileText':
        return <FileText size={iconSize} color={iconColor} />;
      default:
        return <BookOpen size={iconSize} color={iconColor} />;
    }
  };
  
  return (
    <View style={[styles.container, style]}>
      <Pressable
        style={[
          styles.button,
          { backgroundColor: action.color },
          isEditMode && styles.editModeButton
        ]}
        onPress={onPress}
        android_ripple={{ color: 'rgba(255, 255, 255, 0.2)' }}
      >
        <View style={styles.iconContainer}>
          {renderIcon()}
        </View>
        <Text style={styles.title}>{action.title}</Text>
        <Text style={styles.description} numberOfLines={1}>
          {action.description}
        </Text>
      </Pressable>
      
      {isEditMode && (
        <View style={styles.editControls}>
          <Pressable
            style={styles.editButton}
            onPress={onMoveUp}
            hitSlop={10}
          >
            <ChevronUp size={20} color={COLORS.textSecondary} />
          </Pressable>
          
          <Pressable
            style={styles.editButton}
            onPress={onMoveDown}
            hitSlop={10}
          >
            <ChevronDown size={20} color={COLORS.textSecondary} />
          </Pressable>
          
          <Pressable
            style={styles.editButton}
            onPress={onToggle}
            hitSlop={10}
          >
            {action.isEnabled ? (
              <ToggleRight size={20} color={COLORS.primary} />
            ) : (
              <ToggleLeft size={20} color={COLORS.textSecondary} />
            )}
          </Pressable>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  button: {
    borderRadius: 12,
    padding: 16,
    minHeight: 100,
    justifyContent: 'center',
  },
  editModeButton: {
    opacity: 0.8,
  },
  iconContainer: {
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  editControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingHorizontal: 8,
  },
  editButton: {
    padding: 4,
  },
});