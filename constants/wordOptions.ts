export type SortOption = 
  | "alphabetical-asc" 
  | "alphabetical-desc" 
  | "status" 
  | "recently-reviewed";

export const SORT_OPTIONS = [
  { value: "alphabetical-asc" as SortOption, label: "A-Z" },
  { value: "alphabetical-desc" as SortOption, label: "Z-A" },
  { value: "status" as SortOption, label: "Status" },
  { value: "recently-reviewed" as SortOption, label: "Recently Reviewed" },
];

export const STATUS_FILTERS = [
  { value: "new", label: "New" },
  { value: "learning", label: "Learning" },
  { value: "mastered", label: "Mastered" },
];

export const WORD_ACTIONS = {
  edit: {
    label: "Edit",
    icon: "Edit",
  },
  delete: {
    label: "Delete",
    icon: "Trash2",
  },
  toggleStatus: {
    label: "Change Status",
    icon: "RefreshCw",
  },
};