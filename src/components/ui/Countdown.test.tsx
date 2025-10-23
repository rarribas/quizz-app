import { render } from '@testing-library/react';
import CountDown from './Countdown';
import { mockedFinalQuestions } from '@/data/questions';
import { mockUseQuizzStateStore } from '@/app/quizz/tests/mocks';

jest.mock('@/store/useQuizzStateStore');

describe('Countdown', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('shows the right time', () => {
    const setCompleted = jest.fn();
    const setTime = jest.fn();
    mockUseQuizzStateStore.mockReturnValue({
      questions: mockedFinalQuestions,
      completed: false,
      time: 125,
      setTime,
      setCompleted,
    });

    const {getByText} =render(<CountDown/>);
    expect(getByText("2:05")).toBeInTheDocument();
  });

  it('decrements time every second', () => {
    const setCompleted = jest.fn();
    const setTime = jest.fn();
    mockUseQuizzStateStore.mockReturnValue({
      questions: mockedFinalQuestions,
      completed: false,
      time: 125,
      setTime,
      setCompleted,
    });

    render(<CountDown/>);
    jest.advanceTimersByTime(1000);
    expect(setTime).toHaveBeenCalledWith(124);    
  });

  it('Sets quizz to completed when count down finishes', () => {
    const setCompleted = jest.fn();
    const setTime = jest.fn();
    mockUseQuizzStateStore.mockReturnValue({
      questions: mockedFinalQuestions,
      completed: false,
      time: 0,
      setTime,
      setCompleted,
    });

    render(<CountDown/>);
    expect(setCompleted).toHaveBeenCalledWith(true);
  })
});