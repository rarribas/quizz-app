import { render } from "@testing-library/react";
import QuizzResults from "./QuizzResults";
import { useQuizzStateStore } from "@/store/useQuizzStateStore";
import { useQuizzCategoriesStore } from "@/store/useQuizzCategoriesStore";
import { useQuizzConfigStore } from "@/store/useQuizzConfigStore";
import { mockedFinalQuestionsAllRight } from "@/data/questions";

jest.mock("@/store/useQuizzStateStore");
jest.mock("@/store/useQuizzCategoriesStore");
jest.mock("@/store/useQuizzConfigStore");

jest.mock('uuid', () => ({
  v4: jest.fn(() => 'mock-uuid'),
}));


jest.mock('@/hooks/useFetchQuestions', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    loading: false,
    error: null,
  })),
}));

const mockReplace = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: mockReplace,
    back: jest.fn(),
  }),
}));

describe("Quizz Results", () => {
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

  it("renders with the right results", () => {
    ((useQuizzStateStore as unknown) as jest.Mock).mockReturnValue({
      questions: mockedFinalQuestionsAllRight,
      completed: false,
      time: 30,
    });

    const {getByText} = render(<QuizzResults/>);
    getByText('Congratulations! You have completed the quizz with 5 correct answers out of 10');
  });

  it("renders all the questions", () => {
    ((useQuizzStateStore as unknown) as jest.Mock).mockReturnValue({
      questions: mockedFinalQuestionsAllRight,
      completed: false,
      time: 30,
    });
    const { getByText } = render(<QuizzResults />);

    getByText('March 10th is also known as Mar10 Day.');
    getByText('What type of animal was Harambe, who was shot after a child fell into its enclosure at the Cincinnati Zoo?');
    getByText('In which fast food chain can you order a Jamocha Shake?');
    getByText('What zodiac sign is represented by a pair of scales?');
    getByText('The Great Wall of China is visible from the moon.');
  });

   it('redirects to /quizz/start if configuration not done', () => {
      const setQuestions = jest.fn();
      ((useQuizzStateStore as unknown) as jest.Mock).mockReturnValue({
        questions: mockedFinalQuestionsAllRight,
        setQuestions,
        completed: false,
      });
  
      render(<QuizzResults />);
  
      expect(mockReplace).toHaveBeenCalledWith('/quizz/start')
    });
});