import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { COLORS } from '@/constants/colors';
import { DailyGoal, GoalType } from '@/types/motivation';
import { GOAL_TYPES } from '@/constants/motivationConstants';
import { calculateGoalProgress, formatTimeString } from '@/utils/motivationUtils';
import { 
  BookOpen, 
  Clock, 
  CheckCircle, 
  FileText, 
  Target,
  Bell,
  BellOff,
  Check,
  Trash2,
  Plus,
  Minus
} from 'lucide-react-native';

interface DailyGoalItemProps {
  goal: DailyGoal;
  onUpdateProgress: (progress: number) => void;
  onToggleReminder: (enabled: boolean) => void;
  onDelete: () => void;
  style?: any;
}

export const DailyGoalItem: React.FC<DailyGoalItemProps> = ({
  goal,
  onUpdateProgress,
  onToggleReminder,
  onDelete,
  style,
}) => {
  const [showActions, setShowActions] = useState(false);
  
  // Get goal type info
  const goalTypeInfo = GOAL_TYPES[goal.type] || {
    label: 'Custom Goal',
    icon: 'Target',
    color: COLORS.highlight,
    unit: 'items'
  };
  
  // Calculate progress percentage
  const progressPercentage = calculateGoalProgress(goal.progress, goal.target);
  
  // Render goal icon
  const renderGoalIcon = () => {
    const iconSize = 20;
    const iconColor = goalTypeInfo.color;
    
    switch (goal.type) {
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
  
  // Handle increment progress
  const handleIncrement = () => {
    onUpdateProgress(goal.progress + 1);
  };
  
  // Handle decrement progress
  const handleDecrement = () => {
    if (goal.progress > 0) {
      onUpdateProgress(goal.progress - 1);
    }
  };
  
  // Handle complete goal
  const handleComplete = () => {
    onUpdateProgress(goal.target);
  };
  
  // Handle toggle reminder
  const handleToggleReminder = () => {
    onToggleReminder(!goal.reminderTime);
  };
  
  // Toggle actions visibility
  const toggleActions = () => {
    setShowActions(!showActions);
  };
  
  return (
    <Pressable 
      style={[styles.container, style]}
      onPress={toggleActions}
    >
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          {renderGoalIcon()}
          <Text style={styles.title}>{goal.title}</Text>
        </View>
        
        <View style={styles.progressTextContainer}>
          <Text style={styles.progressText}>
            {goal.progress}/{goal.target} {goalTypeInfo.unit}
          </Text>
        </View>
      </View>
      
      <Text style={styles.description}>{goal.description}</Text>
      
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill,
              { width: `${progressPercentage}%`, backgroundColor: goalTypeInfo.color }
            ]}
          />
        </View>
        <Text style={styles.progressPercentage}>{progressPercentage}%</Text>
      </View>
      
      {goal.reminderTime && (
        <View style={styles.reminderContainer}>
          <Bell size={14} color={COLORS.textSecondary} />
          <Text style={styles.reminderText}>
            Reminder at {formatTimeString(goal.reminderTime)}
          </Text>
        </View>
      )}
      
      {showActions && (
        <View style={styles.actionsContainer}>
          <View style={styles.progressActions}>
            <Pressable 
              style={styles.actionButton}
              onPress={handleDecrement}
              disabled={goal.progress <= 0 || goal.isCompleted}
            >
              <Minus 
                size={18} 
                color={goal.progress <= 0 || goal.isCompleted ? COLORS.disabled : COLORS.textSecondary} 
              />
            </Pressable>
            
            <Pressable 
              style={styles.actionButton}
              onPress={handleIncrement}
              disabled={goal.isCompleted}
            >
              <Plus 
                size={18} 
                color={goal.isCompleted ? COLORS.disabled : COLORS.textSecondary} 
              />
            </Pressable>
            
            <Pressable 
              style={[styles.actionButton, styles.completeButton]}
              onPress={handleComplete}
              disabled={goal.isCompleted}
            >
              <Check 
                size={18} 
                color={goal.isCompleted ? COLORS.disabled : COLORS.primary} 
              />
              <Text 
                style={[
                  styles.completeButtonText,
                  goal.isCompleted && styles.disabledText
                ]}
              >
                {goal.isCompleted ? 'Completed' : 'Complete'}
              </Text>
            </Pressable>
          </View>
          
          <View style={styles.managementActions}>
            <Pressable 
              style={styles.actionButton}
              onPress={handleToggleReminder}
            >
              {goal.reminderTime ? (
                <BellOff size={18} color={COLORS.textSecondary} />
              ) : (
                <Bell size={18} color={COLORS.textSecondary} />
              )}
            </Pressable>
            
            <Pressable 
              style={styles.actionButton}
              onPress={onDelete}
            >
              <Trash2 size={18} color={COLORS.error} />
            </Pressable>
          </View>
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginLeft: 8,
  },
  progressTextContainer: {
    marginLeft: 8,
  },
  progressText: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  description: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 12,
  },
  progressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: COLORS.progressBackground,
    borderRadius: 4,
    overflow: 'hidden',
    marginRight: 8,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressPercentage: {
    fontSize: 12,
    color: COLORS.textSecondary,
    width: 40,
    textAlign: 'right',
  },
  reminderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  reminderText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginLeft: 4,
  },
  actionsContainer: {
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: 12,
  },
  progressActions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionButton: {
    padding: 8,
    marginRight: 8,
  },
  completeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  completeButtonText: {
    fontSize: 14,
    color: COLORS.primary,
    marginLeft: 4,
  },
  disabledText: {
    color: COLORS.disabled,
  },
  managementActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});