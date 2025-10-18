import { render, fireEvent, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import QuizzConfigForm from "./QuizzConfigForm";
import { useQuizzCategoriesStore } from "@/store/useQuizzCategoriesStore";
import { useQuizzConfigStore } from "@/store/useQuizzConfigStore";

// Mock the zustand stores
jest.mock("@/store/useQuizzCategoriesStore");
jest.mock("@/store/useQuizzConfigStore");


const mockReplace = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: mockReplace,
    back: jest.fn(),
  }),
}));

describe("Quizz Configuration Form", () => {

  // mock stores
  const mockFetchCategories = jest.fn();
  const mockSetConfiguration = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
    ((useQuizzCategoriesStore as unknown) as jest.Mock).mockReturnValue({
      categories: [{ id: "1", name: "General Knowledge" }],
      difficulty: { easy: "Easy", medium: "Medium", hard: "Hard" },
      loading: false,
      fetchCategories: mockFetchCategories,
    });

    ((useQuizzConfigStore as unknown) as jest.Mock).mockReturnValue({
      configuration: null,
      setConfiguration: mockSetConfiguration,
    });
  });

  afterEach(() => {
    jest.resetAllMocks(); // resets mocks to their original implementation
  });

  it("shows errors if missing values", () => {
    const { getByText } = render(<QuizzConfigForm />);
    
    const submitButton  = getByText("Start Quizz");
    fireEvent.click(submitButton);

    expect(getByText("Please select a category")).toBeInTheDocument();
    expect(getByText("Please select difficulty")).toBeInTheDocument();
  });

  it("saves the correct values in configuration", async () => {
    const user = userEvent.setup();
    const {getByText, getByRole} = render(<QuizzConfigForm />);

    // Open category dropdown and select
    const categoryTrigger = getByText("Insert Category").closest('button');
    fireEvent.click(categoryTrigger!);
    const categoryOption = getByRole('option', { name: "General Knowledge" });
    fireEvent.click(categoryOption);
   

    const difficultyTrigger = getByText("Select Difficulty").closest('button');
    fireEvent.click(difficultyTrigger!);
    const difficultyOption = getByRole('option', { name: "Easy" });
    fireEvent.click(difficultyOption);

    // Click the submit button
    await user.click(getByRole("button", { name: /Start Quizz/i }));

    // Assert the store was updated
    await waitFor(() => {
      expect(mockSetConfiguration).toHaveBeenCalledWith({
        category: "1",
        difficulty: "easy",
        done: true,
      });
    });
  });

  it("redirects to quizz/start when configuration is done", () => {
    ((useQuizzConfigStore as unknown) as jest.Mock).mockReturnValue({
      configuration:  { done: true, category: "1", difficulty: "easy" },
      setConfiguration: mockSetConfiguration,
    });

    render(<QuizzConfigForm />);

    // The useEffect should call router.replace immediately
    expect(mockReplace).toHaveBeenCalledWith("/quizz/start");
  });

});