import { render, fireEvent, waitFor } from "@testing-library/react";
import { mockedFinalQuestionsAllRight } from "@/data/questions";
import LeaderBoard from "./LeaderBoard";
import { getHighestScoresAction } from "@/app/actions/quizz-actions";
import { mockResults } from "@/data/results";

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
      setCompleted: jest.fn(),
      setTime: jest.fn(),
    });
  });

  it('renders my score panel', () => {
    const {getByText} = render(<LeaderBoard/>)
    
    expect(getByText('Your Latest Score')).toBeInTheDocument();
    expect(getByText('5/10 correct')).toBeInTheDocument();
    expect(getByText('30 seconds bonus')).toBeInTheDocument();
    expect(getByText('35')).toBeInTheDocument();
  });

  it("renders all the score panels", async () => {
    (getHighestScoresAction as jest.Mock).mockResolvedValue(mockResults);

    // Destructure directly from render()
    const {findAllByTestId } = render(<LeaderBoard />);

    // Wait for the panels to appear
    const panels = await findAllByTestId("score-panel-user");

    expect(panels).toHaveLength(mockResults.length);
    expect(panels[0]).toHaveTextContent("You");
    expect(panels[1]).toHaveTextContent("Lucía");
    expect(panels[2]).toHaveTextContent("Marco");
    expect(panels[3]).toHaveTextContent("Sara");
    expect(panels[4]).toHaveTextContent("Tomás");
  });

  it('redirects to /quizz when play again is clicked', async() => {
    const {getByTestId} = render(<LeaderBoard/>);
    const button = getByTestId("play-again-test");
    fireEvent.click(button);

    waitFor(() => {
      expect(mockReplace).toHaveBeenCalledWith('/quizz')
    })    
  });
});