import { render, fireEvent } from '@testing-library/react';
import { useQuizzStateStore } from '@/store/useQuizzStateStore';
import { mockedFinalQuestionsNoneSelected, mockedFinalQuestions } from '@/data/questions';
import QuestionWorkflow from './QuestionWorkflow';
import { useQuizzConfigStore } from "@/store/useQuizzConfigStore";

jest.mock('@/store/useQuizzStateStore');
jest.mock('@/store/useQuizzConfigStore');

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

describe('Question Workflow', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    ((useQuizzConfigStore as unknown) as jest.Mock).mockReturnValue({
      configuration: { category: 'any', difficulty: 'any', done: true },
      setConfiguration: jest.fn(),
    });
  });

  it('cannot navigate to next question if no answer selected', () => {
    const setQuestions = jest.fn();
    ((useQuizzStateStore as unknown) as jest.Mock).mockReturnValue({
      questions: mockedFinalQuestionsNoneSelected,
      setQuestions,
      completed: false,
    });
   
    const {getByText} = render(<QuestionWorkflow />);
    expect(getByText("Select an answer to continue")).toBeInTheDocument();
    expect(getByText("Select an answer to continue")).toBeDisabled();
  });

  it('navigates back and forth when answer is selected', () => {
    const setQuestions = jest.fn();
    ((useQuizzStateStore as unknown) as jest.Mock).mockReturnValue({
      questions: mockedFinalQuestions,
      setQuestions,
      completed: false,
    });
   
    const {getByTestId, getByText} = render(<QuestionWorkflow />);
    const nextBtn = getByTestId('test-next-button');
    const prevBtn = getByTestId('test-prev-button');
    expect(nextBtn).toBeEnabled();
    expect(prevBtn).toBeDisabled();
    expect(getByText("Question 1 of 10"))
    expect(getByText("March 10th is also known as Mar10 Day.")).toBeInTheDocument();

    fireEvent.click(nextBtn);
    expect(getByText("Question 2 of 10"))
    expect(getByText("What type of animal was Harambe, who was shot after a child fell into its enclosure at the Cincinnati Zoo?")).toBeInTheDocument();
    expect(prevBtn).toBeEnabled();
    fireEvent.click(prevBtn);

    expect(prevBtn).toBeDisabled();
    expect(getByText("Question 1 of 10"))
    expect(getByText("March 10th is also known as Mar10 Day.")).toBeInTheDocument();
  });

  it('navigates to completed screen when completed is true', () => {
    const setQuestions = jest.fn();
    ((useQuizzStateStore as unknown) as jest.Mock).mockReturnValue({
      questions: mockedFinalQuestions,
      setQuestions,
      completed: true,
    });

    render(<QuestionWorkflow />);

    expect(mockReplace).toHaveBeenCalledWith('/quizz/completed')
  });

  it('redirects to /quizz if configuration not done', () => {
    const setQuestions = jest.fn();
    ((useQuizzStateStore as unknown) as jest.Mock).mockReturnValue({
      questions: mockedFinalQuestions,
      setQuestions,
      completed: false,
    });

    ((useQuizzConfigStore as unknown) as jest.Mock).mockReturnValue({
      configuration: { category: 'any', difficulty: 'any', done: false },
      setConfiguration: jest.fn(),
    });

    render(<QuestionWorkflow />);

    expect(mockReplace).toHaveBeenCalledWith('/quizz')
  });
  
  it("Sets quizz to completed when last question done", () => {
    // I'm not 100% sure how to test this. Seems that I need
    // to mock some logic to force re-renders?
  });
});