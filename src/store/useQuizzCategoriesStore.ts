import {create} from 'zustand';

export interface QuizzCategoriesI {
  id: string;
  name: string;
}

type DifficultyKey = 'easy' | 'medium' | 'hard';
type DifficultyValue = 'Easy' | 'Medium' | 'Hard';

interface QuizzCategoryState {
  categories: QuizzCategoriesI[],
  difficulty: Record<DifficultyKey, DifficultyValue>,
  setCategories: (categories: QuizzCategoriesI[]) => void;
}

export const useQuizzCategoriesStore = create<QuizzCategoryState>((set) => ({
  categories: [],
  difficulty: {
    easy: 'Easy',
    medium: 'Medium',
    hard: 'Hard',
  },
  
  setCategories: (categories) => set({ categories }),
}));

export type {DifficultyKey};