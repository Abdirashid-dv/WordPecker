import { useState, useCallback, useEffect } from "react";
import { useRouter } from "expo-router";
import { useWordListStore } from "@/stores/wordListStore";
import { WordList, Word, ListProgress } from "@/types/wordList";
import { calculateProgress } from "@/utils/wordListUtils";

export const useListDetails = (listId: string | undefined) => {
  const router = useRouter();
  const { 
    getWordList, 
    updateWordList, 
    deleteWordList,
    toggleFavorite,
  } = useWordListStore();
  
  const [list, setList] = useState<WordList | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState<ListProgress>({
    total: 0,
    new: 0,
    learning: 0,
    mastered: 0,
    percentage: 0,
  });
  const [showAddWordModal, setShowAddWordModal] = useState(false);
  const [showCameraCapture, setShowCameraCapture] = useState(false);
  
  // Fetch list data
  useEffect(() => {
    if (!listId) {
      setIsLoading(false);
      return;
    }
    
    const fetchList = () => {
      const foundList = getWordList(listId);
      
      if (foundList) {
        setList(foundList);
        setProgress(calculateProgress(foundList));
      }
      
      setIsLoading(false);
    };
    
    fetchList();
  }, [listId, getWordList]);
  
  // Handle edit list
  const handleEditList = useCallback((updates: Partial<WordList>) => {
    if (!list) return;
    
    updateWordList(list.id, updates);
    
    // Update local state
    setList(prev => {
      if (!prev) return null;
      return { ...prev, ...updates };
    });
  }, [list, updateWordList]);
  
  // Handle delete list
  const handleDeleteList = useCallback(() => {
    if (!list) return;
    
    deleteWordList(list.id);
    router.back();
  }, [list, deleteWordList, router]);
  
  // Handle add word
  const handleAddWord = useCallback(() => {
    setShowAddWordModal(true);
  }, []);
  
  // Handle capture words
  const handleCaptureWords = useCallback(() => {
    setShowCameraCapture(true);
  }, []);
  
  // Handle add word submit
  const handleAddWordSubmit = useCallback((wordData: Omit<Word, "id" | "status" | "lastReviewed"> | Array<{term: string, definition: string, example?: string}>) => {
    if (!list) return;
    
    let updatedWords = [...list.words];
    
    // Handle array of words (from bulk add or camera capture)
    if (Array.isArray(wordData)) {
      const newWords = wordData.map(word => ({
        id: `word-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        status: "new" as const,
        term: word.term,
        definition: word.definition,
        example: word.example,
      }));
      
      updatedWords = [...updatedWords, ...newWords];
    } else {
      // Handle single word
      const newWord: Word = {
        id: `word-${Date.now()}`,
        status: "new",
        ...wordData,
      };
      
      updatedWords = [...updatedWords, newWord];
    }
    
    updateWordList(list.id, { words: updatedWords });
    
    // Update local state
    setList(prev => {
      if (!prev) return null;
      const updated = { ...prev, words: updatedWords };
      setProgress(calculateProgress(updated));
      return updated;
    });
    
    setShowAddWordModal(false);
    setShowCameraCapture(false);
  }, [list, updateWordList]);
  
  // Handle edit word
  const handleEditWord = useCallback((wordId: string, updates: Partial<Word>) => {
    if (!list) return;
    
    const updatedWords = list.words.map(word => 
      word.id === wordId ? { ...word, ...updates } : word
    );
    
    updateWordList(list.id, { words: updatedWords });
    
    // Update local state
    setList(prev => {
      if (!prev) return null;
      const updated = { ...prev, words: updatedWords };
      setProgress(calculateProgress(updated));
      return updated;
    });
  }, [list, updateWordList]);
  
  // Handle delete word
  const handleDeleteWord = useCallback((wordId: string) => {
    if (!list) return;
    
    const updatedWords = list.words.filter(word => word.id !== wordId);
    updateWordList(list.id, { words: updatedWords });
    
    // Update local state
    setList(prev => {
      if (!prev) return null;
      const updated = { ...prev, words: updatedWords };
      setProgress(calculateProgress(updated));
      return updated;
    });
  }, [list, updateWordList]);
  
  // Handle toggle word status
  const handleToggleWordStatus = useCallback((wordId: string) => {
    if (!list) return;
    
    const updatedWords = list.words.map(word => {
      if (word.id !== wordId) return word;
      
      // Cycle through statuses: new -> learning -> mastered -> new
      let newStatus = word.status;
      if (word.status === "new") {
        newStatus = "learning";
      } else if (word.status === "learning") {
        newStatus = "mastered";
      } else {
        newStatus = "new";
      }
      
      return { 
        ...word, 
        status: newStatus,
        lastReviewed: new Date(),
      };
    });
    
    updateWordList(list.id, { words: updatedWords });
    
    // Update local state
    setList(prev => {
      if (!prev) return null;
      const updated = { ...prev, words: updatedWords };
      setProgress(calculateProgress(updated));
      return updated;
    });
  }, [list, updateWordList]);
  
  // Handle start learning
  const handleStartLearning = useCallback(() => {
    if (!list) return;
    
    // Navigate to learning screen
    console.log("Start learning for list:", list.id);
    // router.push(`/learn/${list.id}`);
  }, [list]);
  
  // Handle start quiz
  const handleStartQuiz = useCallback(() => {
    if (!list) return;
    
    // Navigate to quiz screen
    console.log("Start quiz for list:", list.id);
    // router.push(`/quiz/${list.id}`);
  }, [list]);
  
  return {
    list,
    isLoading,
    progress,
    showAddWordModal,
    showCameraCapture,
    handleEditList,
    handleDeleteList,
    handleAddWord,
    handleAddWordSubmit,
    handleEditWord,
    handleDeleteWord,
    handleToggleWordStatus,
    handleStartLearning,
    handleStartQuiz,
    handleCaptureWords,
    setShowAddWordModal,
    setShowCameraCapture,
  };
};