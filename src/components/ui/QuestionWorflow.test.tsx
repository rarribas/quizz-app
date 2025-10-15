import { render } from '@testing-library/react';
import { useQuizzStateStore } from '@/store/useQuizzStateStore';
import { mockedFinalQuestionsNoneSelected } from '@/data/questions';
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

  it('navigates to completed screen after last question', () => {
    // To be implemented
  });

  it('redirects to /quizz if configuration not done', () => {
    // To be implemented
  });

  it('redirects to /quizz/complete if quizz completed', () => {
    // To be implemented
  });

  it('navigates to next question when next button clicked', () => {
    // To be implemented
  });
  
  it('navigates to previous question when prev button clicked', () => {
    // To be implemented
  });

  it('Sets quizz to completed when last question done', () => {
    // To be implemented
  });
});