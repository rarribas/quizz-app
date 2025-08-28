import { render, fireEvent } from "@testing-library/react";
import QuizzConfigForm from "./QuizzConfigForm";
import { useQuizzCategoriesStore } from "@/store/useQuizzCategoriesStore";
import { useQuizzConfigStore } from "@/store/useQuizzConfigStore";
import { useRouter } from "next/navigation";

// Mock the zustand stores
jest.mock("@/store/useQuizzCategoriesStore");
jest.mock("@/store/useQuizzConfigStore");

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(), // you can check calls in tests
    back: jest.fn(),
  }),
}));

describe("Quizz Configuration Form", () => {
  
  beforeEach(() => {
    ((useQuizzCategoriesStore as unknown) as jest.Mock).mockReturnValue({
      categories: [{ id: "1", name: "General Knowledge" }],
      difficulty: { easy: "Easy", medium: "Medium", hard: "Hard" },
      loading: false,
      fetchCategories: jest.fn(),
    });

    ((useQuizzConfigStore as unknown) as jest.Mock).mockReturnValue({
      configuration: null,
      setConfiguration: jest.fn(),
    });
  });


  it("shows errors if missing values", () => {
    const { getByText } = render(<QuizzConfigForm />);
    
    const submitButton  = getByText("Start Quizz");
    fireEvent.click(submitButton);

    expect(getByText("Please introduce a category")).toBeInTheDocument();
    expect(getByText("Please introduce a difficulty")).toBeInTheDocument();
  })
});