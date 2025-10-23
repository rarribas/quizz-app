import { useQuizzCategoriesStore } from "@/store/useQuizzCategoriesStore";
import { useQuizzConfigStore } from "@/store/useQuizzConfigStore";
import { useQuizzStateStore } from "@/store/useQuizzStateStore";

export const mockUseQuizzStateStore = useQuizzStateStore as jest.MockedFunction<typeof useQuizzStateStore>;
export const mockUseQuizzConfigStore = useQuizzConfigStore as jest.MockedFunction<typeof useQuizzConfigStore>;
export const mockUseQuizzCategoriesStore = useQuizzCategoriesStore as jest.MockedFunction<typeof useQuizzCategoriesStore>;
