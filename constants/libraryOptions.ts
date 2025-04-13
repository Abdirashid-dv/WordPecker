import { SortOption } from "@/types/wordList";

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "name-asc", label: "Name (A-Z)" },
  { value: "name-desc", label: "Name (Z-A)" },
  { value: "date-asc", label: "Oldest First" },
  { value: "date-desc", label: "Newest First" },
  { value: "progress-asc", label: "Progress (Low to High)" },
  { value: "progress-desc", label: "Progress (High to Low)" },
];

export const LANGUAGES = [
  "English",
  "Spanish",
  "French",
  "German",
  "Italian",
  "Portuguese",
  "Russian",
  "Japanese",
  "Chinese",
  "Korean",
];

export const STATUS_FILTERS = [
  { value: "new", label: "New" },
  { value: "in-progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
];

export const QUICK_ACTIONS = {
  learn: {
    label: "Learn",
    icon: "BookOpen",
  },
  quiz: {
    label: "Quiz",
    icon: "Brain",
  },
  details: {
    label: "Details",
    icon: "Info",
  },
};