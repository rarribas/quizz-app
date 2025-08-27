import {create} from 'zustand';

interface QuizzStoreConfigI {
  configuration: {
    category: string;
    difficulty: string;
    done: boolean;
  };
  setConfiguration: (config: Partial<QuizzStoreConfigI["configuration"]>) => void;
}

export const useQuizzConfigStore = create<QuizzStoreConfigI>((set) => ({
  configuration: {
    category: '',
    difficulty: '',
    done: false,
  },

  setConfiguration: (config) =>
    set((state) => ({
      configuration: { ...state.configuration, ...config },
    })),

}))