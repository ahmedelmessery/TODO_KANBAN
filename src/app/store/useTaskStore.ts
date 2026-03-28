import { create } from 'zustand';

interface TaskStore {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const useTaskStore = create<TaskStore>((set) => ({
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
}));
