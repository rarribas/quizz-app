import {create} from 'zustand';

interface QuizzCategoriesI {
  id: string;
  name: string;
}

interface QuizzCategoryState {
  categories: QuizzCategoriesI[],
  loading: boolean,
  fetchCategories: () => Promise<void>
}

const CAT_URL:string = "https://opentdb.com/api_category.php";

export const useQuizzCategoriesStore = create<QuizzCategoryState>((set) => ({
  categories: [],
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