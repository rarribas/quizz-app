import { render, fireEvent } from '@testing-library/react';
import QuestionPanel from './QuestionPanel';
import { mockedFinalQuestions } from '@/data/questions';
import { ModifiedQuestionI } from "@/types/question";
import { mockUseQuizzStateStore, mockUseQuizzCategoriesStore } from '@/app/quizz/tests/mocks';

jest.mock('@/store/useQuizzStateStore');
jest.mock('@/store/useQuizzCategoriesStore');

describe('QuestionPanel', () => {
  it('selects and unselects previous answer and select new one', () => {
    const setQuestions = jest.fn();
    mockUseQuizzStateStore.mockReturnValue({
      questions: mockedFinalQuestions,
      setQuestions,
      completed: false,
    });

    mockUseQuizzCategoriesStore.mockReturnValue({
      difficulty: { easy: 'Easy', medium: 'Medium', hard: 'Hard' },
    });

    const {getByTestId} = render(<QuestionPanel question={mockedFinalQuestions[0]} />);
    
    const firstAnswer = getByTestId('answer-block-1');
    fireEvent.click(firstAnswer);

    const secondAnswer = getByTestId('answer-block-2');
    fireEvent.click(secondAnswer);

    const updatedQuestions = setQuestions.mock.calls[1][0];
    const updatedQuestion = updatedQuestions.find(
      (q:ModifiedQuestionI) => q.title === mockedFinalQuestions[0].title
    );

    expect(updatedQuestion.answers[0].selected).toBe(false);
    expect(updatedQuestion.answers[1].selected).toBe(true);
  })

  it('does not show correct answer if quizz not completed', () => {
    const setQuestions = jest.fn();
    mockUseQuizzStateStore.mockReturnValue({
      questions: mockedFinalQuestions,
      setQuestions,
      completed: false,
    });

    mockUseQuizzCategoriesStore.mockReturnValue({
      difficulty: { easy: 'Easy', medium: 'Medium', hard: 'Hard' },
    });

    const {getByTestId} = render(<QuestionPanel question={mockedFinalQuestions[0]} />);
    
    const firstAnswer = getByTestId('answer-block-1');
    expect(firstAnswer).not.toHaveClass('bg-green-300');
  });

  it('does not allow selecting answers if quizz is completed', () => {
    const setQuestions = jest.fn();
    mockUseQuizzStateStore.mockReturnValue({
      questions: mockedFinalQuestions,
      setQuestions,
      completed: true,
    });

    mockUseQuizzCategoriesStore.mockReturnValue({
      difficulty: { easy: 'Easy', medium: 'Medium', hard: 'Hard' },
    });

    const {getByTestId} = render(<QuestionPanel question={mockedFinalQuestions[0]} />);
    
    const secondAnswer = getByTestId('answer-block-2');
    fireEvent.click(secondAnswer);

    expect(setQuestions).not.toHaveBeenCalled();
  });

  it('shows correct answer when quizz is completed', () => {
    mockUseQuizzStateStore.mockReturnValue({
      questions: mockedFinalQuestions,
      setQuestions: jest.fn(),
      completed: true,
    });

    mockUseQuizzCategoriesStore.mockReturnValue({
      difficulty: { easy: 'Easy', medium: 'Medium', hard: 'Hard' },
    });

    const {getByTestId} = render(<QuestionPanel question={mockedFinalQuestions[0]} />);
    const firstAnswer = getByTestId('answer-block-1');

    expect(firstAnswer).toHaveClass('bg-green-300');
  });

  it('shows in red wrong answer when quizz is completed', () => {
    mockUseQuizzStateStore.mockReturnValue({
      questions: mockedFinalQuestions,
      setQuestions: jest.fn(),
      completed: true,
    });

    mockUseQuizzCategoriesStore.mockReturnValue({
      difficulty: { easy: 'Easy', medium: 'Medium', hard: 'Hard' },
    });

    const {getByTestId} = render(<QuestionPanel question={mockedFinalQuestions[3]} />);
    const answer = getByTestId('answer-block-12');

    expect(answer).toHaveClass('bg-red-300');
  })
});
