import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { WordList, SortOption, FilterOption } from "@/types/wordList";
import { mockWordLists } from "@/mockData/wordLists";
import { sortWordLists, filterWordLists } from "@/utils/wordListUtils";

interface WordListState {
  wordLists: WordList[];
  sortOption: SortOption;
  filterOptions: FilterOption;
  isLoading: boolean;
  
  // Actions
  setWordLists: (lists: WordList[]) => void;
  addWordList: (list: WordList) => void;
  updateWordList: (id: string, updates: Partial<WordList>) => void;
  deleteWordList: (id: string) => void;
  toggleFavorite: (id: string) => void;
  setSortOption: (option: SortOption) => void;
  setFilterOptions: (options: FilterOption) => void;
  resetFilters: () => void;
  
  // Computed
  getSortedAndFilteredLists: () => WordList[];
  getWordList: (id: string) => WordList | undefined;
}

export const useWordListStore = create<WordListState>()(
  persist(
    (set, get) => ({
      wordLists: mockWordLists,
      sortOption: "date-desc",
      filterOptions: {},
      isLoading: false,
      
      setWordLists: (lists) => set({ wordLists: lists }),
      
      addWordList: (list) => set((state) => ({
        wordLists: [...state.wordLists, list],
      })),
      
      updateWordList: (id, updates) => set((state) => ({
        wordLists: state.wordLists.map((list) =>
          list.id === id ? { ...list, ...updates, updatedAt: new Date() } : list
        ),
      })),
      
      deleteWordList: (id) => set((state) => ({
        wordLists: state.wordLists.filter((list) => list.id !== id),
      })),
      
      toggleFavorite: (id) => set((state) => ({
        wordLists: state.wordLists.map((list) =>
          list.id === id ? { ...list, isFavorite: !list.isFavorite } : list
        ),
      })),
      
      setSortOption: (option) => set({ sortOption: option }),
      
      setFilterOptions: (options) => set((state) => ({
        filterOptions: { ...state.filterOptions, ...options },
      })),
      
      resetFilters: () => set({ filterOptions: {} }),
      
      getSortedAndFilteredLists: () => {
        const { wordLists, sortOption, filterOptions } = get();
        const filteredLists = filterWordLists(wordLists, filterOptions);
        return sortWordLists(filteredLists, sortOption);
      },
      
      getWordList: (id) => {
        return get().wordLists.find((list) => list.id === id);
      },
    }),
    {
      name: "wordpecker-lists",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        wordLists: state.wordLists,
        sortOption: state.sortOption,
      }),
    }
  )
);