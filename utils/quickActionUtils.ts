import { QuickAction } from '@/types/quickAction';

/**
 * Move an action up in the order
 */
export const moveActionUp = (actions: QuickAction[], actionId: string): QuickAction[] => {
  const updatedActions = [...actions];
  const index = updatedActions.findIndex(action => action.id === actionId);
  
  if (index <= 0) return updatedActions; // Already at the top
  
  // Swap with the previous item
  const temp = { ...updatedActions[index], order: updatedActions[index].order - 1 };
  updatedActions[index] = { ...updatedActions[index - 1], order: updatedActions[index - 1].order + 1 };
  updatedActions[index - 1] = temp;
  
  // Sort by order
  return updatedActions.sort((a, b) => a.order - b.order);
};

/**
 * Move an action down in the order
 */
export const moveActionDown = (actions: QuickAction[], actionId: string): QuickAction[] => {
  const updatedActions = [...actions];
  const index = updatedActions.findIndex(action => action.id === actionId);
  
  if (index < 0 || index >= updatedActions.length - 1) return updatedActions; // Already at the bottom
  
  // Swap with the next item
  const temp = { ...updatedActions[index], order: updatedActions[index].order + 1 };
  updatedActions[index] = { ...updatedActions[index + 1], order: updatedActions[index + 1].order - 1 };
  updatedActions[index + 1] = temp;
  
  // Sort by order
  return updatedActions.sort((a, b) => a.order - b.order);
};

/**
 * Toggle an action's enabled state
 */
export const toggleActionEnabled = (actions: QuickAction[], actionId: string): QuickAction[] => {
  return actions.map(action => {
    if (action.id === actionId) {
      return { ...action, isEnabled: !action.isEnabled };
    }
    return action;
  });
};

/**
 * Get visible actions (enabled and sorted by order)
 */
export const getVisibleActions = (actions: QuickAction[]): QuickAction[] => {
  return actions
    .filter(action => action.isEnabled)
    .sort((a, b) => a.order - b.order);
};

/**
 * Reset actions to default order and enabled state
 */
export const resetActionsToDefault = (defaultActions: QuickAction[]): QuickAction[] => {
  return [...defaultActions];
};

/**
 * Get actions by category
 */
export const getActionsByCategory = (
  actions: QuickAction[],
  categoryActions: string[]
): QuickAction[] => {
  return actions.filter(action => categoryActions.includes(action.id));
};