import { useEffect } from 'react';
import { useQuickActionsStore } from '@/stores/quickActionsStore';
import { QuickAction } from '@/types/quickAction';
import { getVisibleActions } from '@/utils/quickActionUtils';
import { useRouter } from 'expo-router';

export const useQuickActions = () => {
  const { 
    actions, 
    isEditMode, 
    hasSeenTutorial,
    setActions,
    moveUp,
    moveDown,
    toggleEnabled,
    setEditMode,
    resetToDefault,
    setHasSeenTutorial
  } = useQuickActionsStore();
  
  const router = useRouter();
  
  // Get visible actions (enabled and sorted by order)
  const visibleActions = getVisibleActions(actions);
  
  // Handle action press
  const handleActionPress = (action: QuickAction) => {
    if (isEditMode) {
      // In edit mode, do nothing on press
      return;
    }
    
    // Navigate to the action's route
    router.push(action.route);
  };
  
  // Toggle edit mode
  const toggleEditMode = () => {
    setEditMode(!isEditMode);
  };
  
  // Mark tutorial as seen
  const markTutorialAsSeen = () => {
    setHasSeenTutorial(true);
  };
  
  return {
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
  };
};