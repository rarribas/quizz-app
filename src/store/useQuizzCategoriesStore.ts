import {create} from 'zustand';

interface QuizzCategoriesI {
  id: string;
  name: string;
}

type DifficultyKey = 'easy' | 'medium' | 'hard';
type DifficultyValue = 'Easy' | 'Medium' | 'Hard';

interface QuizzCategoryState {
  categories: QuizzCategoriesI[],
  difficulty: Record<DifficultyKey, DifficultyValue>,
  loading: boolean,
  fetchCategories: () => Promise<void>
}

const CAT_URL:string = "https://opentdb.com/api_category.php";

export const useQuizzCategoriesStore = create<QuizzCategoryState>((set) => ({
  categories: [],
  difficulty: {
    easy: 'Easy',
    medium: 'Medium',
    hard: 'Hard',
  },
  loading: false,
  fetchCategories: async () => {
    set({ loading: true });
    try {
      const res = await fetch(CAT_URL);
      const data = await res.json();
      set({ categories: data.trivia_categories, loading: false });
    } catch (error) {
      console.error(error);
      set({ loading: false });
    }
  },
}));

export type {DifficultyKey};