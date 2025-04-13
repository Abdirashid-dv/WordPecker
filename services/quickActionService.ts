import { QuickAction } from '@/types/quickAction';
import { mockQuickActions } from '@/mockData/quickActionData';

// This is a placeholder service for future API integration
// Currently using mock data

export const quickActionService = {
  // Fetch user quick actions
  fetchQuickActions: async (): Promise<QuickAction[]> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockQuickActions);
      }, 500);
    });
  },
  
  // Update user quick actions
  updateQuickActions: async (actions: QuickAction[]): Promise<QuickAction[]> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Updated quick actions:', actions);
        resolve(actions);
      }, 500);
    });
  },
  
  // Reset quick actions to default
  resetQuickActions: async (): Promise<QuickAction[]> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Reset quick actions to default');
        resolve(mockQuickActions);
      }, 500);
    });
  },
};