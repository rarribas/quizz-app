import {render, fireEvent } from '@testing-library/react';
import QuizzNavigation from './QuizzNavigation';

describe('Quizz Navigation', () => {
  it('disables prev button when index is 0', () => {
    const nextClicked = jest.fn();
    const prevClicked = jest.fn();
    const {getByTestId} = render(<QuizzNavigation 
      questionIndex={0}
      canShowNext={false}
      onNextButtonClicked={nextClicked}
      onPrevButtonCliked={prevClicked}
    />)

    const prevBtn = getByTestId("test-prev-button");
    expect(prevBtn).toBeDisabled();
  });

  it('disables prev button when index is 0', () => {
    const nextClicked = jest.fn();
    const prevClicked = jest.fn();
    const {getByTestId} = render(<QuizzNavigation 
      questionIndex={0}
      canShowNext={false}
      onNextButtonClicked={nextClicked}
      onPrevButtonCliked={prevClicked}
    />)

    const prevBtn = getByTestId("test-prev-button");
    expect(prevBtn).toBeDisabled();
  });

  it('disables next button when canShowNext is false', () => {
    const nextClicked = jest.fn();
    const prevClicked = jest.fn();
    const {getByTestId} = render(<QuizzNavigation 
      questionIndex={0}
      canShowNext={false}
      onNextButtonClicked={nextClicked}
      onPrevButtonCliked={prevClicked}
    />)

    const nextBtn = getByTestId("test-next-button");
    expect(nextBtn).toBeDisabled();
    expect(nextBtn).toHaveTextContent("Select an answer to continue");
  });

  it('disables next button when canShowNext is true but last question index', () => {
    const nextClicked = jest.fn();
    const prevClicked = jest.fn();
    const {getByTestId} = render(<QuizzNavigation 
      questionIndex={10}
      canShowNext={true}
      onNextButtonClicked={nextClicked}
      onPrevButtonCliked={prevClicked}
    />)

    const nextBtn = getByTestId("test-next-button");
    expect(nextBtn).toBeDisabled();
  });

  it('enables next button when canShowIndex true and calls click function ', () => {
    const nextClicked = jest.fn();
    const prevClicked = jest.fn();
    const {getByTestId} = render(<QuizzNavigation 
      questionIndex={1}
      canShowNext={true}
      onNextButtonClicked={nextClicked}
      onPrevButtonCliked={prevClicked}
    />)

    const nextBtn = getByTestId("test-next-button");
    expect(nextBtn).toBeEnabled();

    fireEvent.click(nextBtn);
    expect(nextClicked).toHaveBeenCalled();
  });

  it('enables prev button when index greater than 1 and calls click function ', () => {
    const nextClicked = jest.fn();
    const prevClicked = jest.fn();
    const {getByTestId} = render(<QuizzNavigation 
      questionIndex={1}
      canShowNext={false}
      onNextButtonClicked={nextClicked}
      onPrevButtonCliked={prevClicked}
    />)

    const prevBtn = getByTestId("test-prev-button");
    expect(prevBtn).toBeEnabled();

    fireEvent.click(prevBtn);
    expect(prevClicked).toHaveBeenCalled();
  });

  it('shows different text in next button when final question', () => {
    const nextClicked = jest.fn();
    const prevClicked = jest.fn();
    const {getByTestId} = render(<QuizzNavigation 
      questionIndex={9}
      canShowNext={true}
      onNextButtonClicked={nextClicked}
      onPrevButtonCliked={prevClicked}
    />)

    const nextBtn = getByTestId("test-next-button");
    expect(nextBtn).toBeEnabled();

    fireEvent.click(nextBtn);
    expect(nextClicked).toHaveBeenCalled();
    expect(nextBtn).toHaveTextContent("Finish Quizz");
  });
});