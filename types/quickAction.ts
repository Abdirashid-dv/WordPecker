// Types for quick actions

export interface QuickAction {
    id: string;
    title: string;
    description: string;
    icon: string; // Icon name from lucide-react-native
    route: string; // Route to navigate to
    color: string; // Color for the action button
    isEnabled: boolean; // Whether the action is enabled/visible
    order: number; // Order in the grid
  }
  
  export interface QuickActionsState {
    actions: QuickAction[];
    isEditMode: boolean;
    hasSeenTutorial: boolean;
  }
  
  export interface QuickActionCategory {
    id: string;
    title: string;
    actions: QuickAction[];
  }