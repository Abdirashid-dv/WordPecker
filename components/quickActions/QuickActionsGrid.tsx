import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { COLORS } from '@/constants/colors';
import { useQuickActions } from '@/hooks/useQuickActions';
import { ActionButton } from './ActionButton';
import { TutorialOverlay } from './TutorialOverlay';
import { Edit, Check, RefreshCw } from 'lucide-react-native';

interface QuickActionsGridProps {
  style?: any;
}

export const QuickActionsGrid: React.FC<QuickActionsGridProps> = ({
  style,
}) => {
  const {
    actions,
    visibleActions,
    isEditMode,
    hasSeenTutorial,
    handleActionPress,
    moveUp,
    moveDown,
    toggleEnabled,
    toggleEditMode,
    resetToDefault,
    markTutorialAsSeen
  } = useQuickActions();
  
  const [showTutorial, setShowTutorial] = useState(false);
  
  // Show tutorial if user hasn't seen it yet
  useEffect(() => {
    if (!hasSeenTutorial) {
      setShowTutorial(true);
    }
  }, [hasSeenTutorial]);
  
  // Handle tutorial close
  const handleTutorialClose = () => {
    setShowTutorial(false);
    markTutorialAsSeen();
  };
  
  return (
    <View style={[styles.container, style]}>
      <View style={styles.header}>
        <Text style={styles.title}>Quick Actions</Text>
        
        <View style={styles.headerButtons}>
          {isEditMode && (
            <Pressable
              style={[styles.headerButton, styles.resetButton]}
              onPress={resetToDefault}
            >
              <RefreshCw size={18} color={COLORS.textSecondary} />
              <Text style={styles.resetButtonText}>Reset</Text>
            </Pressable>
          )}
          
          <Pressable
            style={styles.headerButton}
            onPress={toggleEditMode}
          >
            {isEditMode ? (
              <Check size={20} color={COLORS.primary} />
            ) : (
              <Edit size={20} color={COLORS.textSecondary} />
            )}
          </Pressable>
        </View>
      </View>
      
      {isEditMode && (
        <Text style={styles.editModeText}>
          Customize your quick actions by reordering or toggling them on/off
        </Text>
      )}
      
      <View style={styles.grid}>
        {isEditMode ? (
          // Show all actions in edit mode
          actions.map((action) => (
            <ActionButton
              key={action.id}
              action={action}
              isEditMode={isEditMode}
              onPress={() => handleActionPress(action)}
              onMoveUp={() => moveUp(action.id)}
              onMoveDown={() => moveDown(action.id)}
              onToggle={() => toggleEnabled(action.id)}
              style={styles.gridItem}
            />
          ))
        ) : (
          // Show only visible actions in normal mode
          visibleActions.map((action) => (
            <ActionButton
              key={action.id}
              action={action}
              isEditMode={isEditMode}
              onPress={() => handleActionPress(action)}
              style={styles.gridItem}
            />
          ))
        )}
      </View>
      
      <TutorialOverlay
        visible={showTutorial}
        onClose={handleTutorialClose}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerButton: {
    padding: 8,
  },
  resetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
  },
  resetButtonText: {
    color: COLORS.textSecondary,
    fontSize: 14,
    marginLeft: 4,
  },
  editModeText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  gridItem: {
    width: '48%',
  },
});