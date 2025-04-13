import { WordList, SortOption, FilterOption, ListProgress } from "@/types/wordList";

export const calculateProgress = (wordList: WordList): ListProgress => {
  const total = wordList.words.length;
  if (total === 0) {
    return { total: 0, new: 0, learning: 0, mastered: 0, percentage: 0 };
  }
  
  const newCount = wordList.words.filter(word => word.status === "new").length;
  const learningCount = wordList.words.filter(word => word.status === "learning").length;
  const masteredCount = wordList.words.filter(word => word.status === "mastered").length;
  const percentage = Math.round((masteredCount / total) * 100);
  
  return {
    total,
    new: newCount,
    learning: learningCount,
    mastered: masteredCount,
    percentage,
  };
};

export const sortWordLists = (lists: WordList[], sortOption: SortOption): WordList[] => {
  const sortedLists = [...lists];
  
  switch (sortOption) {
    case "name-asc":
      return sortedLists.sort((a, b) => a.name.localeCompare(b.name));
    case "name-desc":
      return sortedLists.sort((a, b) => b.name.localeCompare(a.name));
    case "date-asc":
      return sortedLists.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
    case "date-desc":
      return sortedLists.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    case "progress-asc":
      return sortedLists.sort((a, b) => {
        const progressA = calculateProgress(a).percentage;
        const progressB = calculateProgress(b).percentage;
        return progressA - progressB;
      });
    case "progress-desc":
      return sortedLists.sort((a, b) => {
        const progressA = calculateProgress(a).percentage;
        const progressB = calculateProgress(b).percentage;
        return progressB - progressA;
      });
    default:
      return sortedLists;
  }
};

export const filterWordLists = (lists: WordList[], filters: FilterOption): WordList[] => {
  return lists.filter(list => {
    // Filter by language
    if (filters.language && filters.language.length > 0) {
      if (!filters.language.includes(list.language)) {
        return false;
      }
    }
    
    // Filter by status
    if (filters.status && filters.status.length > 0) {
      const progress = calculateProgress(list);
      
      if (filters.status.includes("new") && progress.percentage === 0) {
        return true;
      }
      
      if (filters.status.includes("in-progress") && progress.percentage > 0 && progress.percentage < 100) {
        return true;
      }
      
      if (filters.status.includes("completed") && progress.percentage === 100) {
        return true;
      }
      
      return false;
    }
    
    // Filter by favorite
    if (filters.favorite !== undefined) {
      if (list.isFavorite !== filters.favorite) {
        return false;
      }
    }
    
    // Filter by tags
    if (filters.tags && filters.tags.length > 0) {
      const hasMatchingTag = list.tags.some(tag => filters.tags!.includes(tag));
      if (!hasMatchingTag) {
        return false;
      }
    }
    
    return true;
  });
};

export const getListStatusLabel = (list: WordList): "new" | "in-progress" | "completed" => {
  const progress = calculateProgress(list);
  
  if (progress.percentage === 0) {
    return "new";
  } else if (progress.percentage === 100) {
    return "completed";
  } else {
    return "in-progress";
  }
};

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};