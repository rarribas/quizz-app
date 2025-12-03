import { render } from "@testing-library/react";
import { mockedFinalQuestionsAllRight } from "@/data/questions";
import LeaderBoard from "./LeaderBoard";

import { 
  mockUseQuizzConfigStore, 
  mockUseQuizzStateStore 
} from "@/app/quizz/tests/mocks";

jest.mock("@/store/useQuizzStateStore");
jest.mock("@/store/useQuizzCategoriesStore");
jest.mock("@/store/useQuizzConfigStore");

jest.mock("@/app/actions/quizz-actions", () => ({
  getHighestScoresAction: jest.fn(),
  getRanking: jest.fn(),
}));

jest.mock('uuid', () => ({
  v4: jest.fn(() => 'mock-uuid'),
}));

const mockReplace = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: mockReplace,
    back: jest.fn(),
  }),
}));

jest.mock("react", () => {
  const actualReact = jest.requireActual("react");
  return {
    ...actualReact,
    useTransition: (): [boolean, (callback: () => void) => void] => [
      false, // isPending
      (callback) => callback(), // startTransition runs callback immediately
    ],
  };
});

describe('Leaderboard', () => {
  const mockSetConfiguration = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    mockUseQuizzConfigStore.mockReturnValue({
      configuration: null,
      setConfiguration: mockSetConfiguration,
    });

    mockUseQuizzStateStore.mockReturnValue({
      questions: mockedFinalQuestionsAllRight,
      completed: true,
      time: 30,
    });
  });

  it('renders my score panel', () => {
    const {getByText} = render(<LeaderBoard/>)
    
    expect(getByText('Your Latest Score')).toBeInTheDocument();
    expect(getByText('5/10 correct')).toBeInTheDocument();
    expect(getByText('30 seconds bonus')).toBeInTheDocument();
    expect(getByText('35')).toBeInTheDocument();
  });
  it('renders all the score panels', () => {});
  it('redirects to /quizz when play again is clicked', () => {});
});