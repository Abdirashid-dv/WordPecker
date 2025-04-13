import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { QuickAction, QuickActionsState } from '@/types/quickAction';
import { mockQuickActions } from '@/mockData/quickActionData';
import { DEFAULT_QUICK_ACTIONS } from '@/constants/quickActionConstants';
import { 
  moveActionUp, 
  moveActionDown, 
  toggleActionEnabled, 
  getVisibleActions,
  resetActionsToDefault
} from '@/utils/quickActionUtils';

interface QuickActionsStore extends QuickActionsState {
  // Actions
  setActions: (actions: QuickAction[]) => void;
  moveUp: (actionId: string) => void;
  moveDown: (actionId: string) => void;
  toggleEnabled: (actionId: string) => void;
  setEditMode: (isEditMode: boolean) => void;
  resetToDefault: () => void;
  setHasSeenTutorial: (hasSeenTutorial: boolean) => void;
}

export const useQuickActionsStore = create<QuickActionsStore>()(
  persist(
    (set, get) => ({
      actions: mockQuickActions,
      isEditMode: false,
      hasSeenTutorial: false,
      
      setActions: (actions) => set({ actions }),
      
      moveUp: (actionId) => {
        const { actions } = get();
        const updatedActions = moveActionUp(actions, actionId);
        set({ actions: updatedActions });
      },
      
      moveDown: (actionId) => {
        const { actions } = get();
        const updatedActions = moveActionDown(actions, actionId);
        set({ actions: updatedActions });
      },
      
      toggleEnabled: (actionId) => {
        const { actions } = get();
        const updatedActions = toggleActionEnabled(actions, actionId);
        set({ actions: updatedActions });
      },
      
      setEditMode: (isEditMode) => set({ isEditMode }),
      
      resetToDefault: () => {
        const resetActions = resetActionsToDefault(DEFAULT_QUICK_ACTIONS);
        set({ actions: resetActions });
      },
      
      setHasSeenTutorial: (hasSeenTutorial) => set({ hasSeenTutorial }),
    }),
    {
      name: 'wordpecker-quick-actions',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);