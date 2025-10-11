import { mockedQuestions, mockedFinalQuestions, mockedFinalQuestionsAllRight } from "@/data/questions";
import {shuffleAnswers, findSelectedAnswer, getTotalPoints} from "./quizz";

jest.mock('uuid', () => ({
  v4: jest.fn(() => 'mock-uuid'),
}));

describe("Quizz Helpers", () => {
  it('should shuffle answers and return ModifiedQuestionI', () => {
    jest.spyOn(Math, 'random')
      .mockReturnValueOnce(0.3)
      .mockReturnValueOnce(0.1)
      .mockReturnValueOnce(0.4)
      .mockReturnValueOnce(0.2);

      const result = shuffleAnswers(mockedQuestions[1]);
      const titles = result.answers.map(answer => answer.title);
      expect(titles).toEqual(['Chimpanzee', 'Baboon', 'Gorilla', 'Orangutan']);
  });

  it('should find selected answer', () => {
    const answers = mockedFinalQuestions[0].answers;
    const result = findSelectedAnswer(mockedFinalQuestions[0])
    expect(result).toEqual(answers[0]);
  });

  it('should get a number of points equals to right answers when right answers are less than 5', () => {
    const time = 30; // 30 seconds remaining
    const points = getTotalPoints(mockedFinalQuestions, time);
    expect(points).toBe(3);
  });

  it('should get a number of points with bonus when right answers are more or equal to 5', () => {
    const time = 30; // 30 seconds remaining
    const points = getTotalPoints(mockedFinalQuestionsAllRight, time);
    expect(points).toBe(35);
  });
});