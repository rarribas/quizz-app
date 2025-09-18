import {create } from 'zustand';

interface QuestionI {
  type: string,
  difficulty: string,
  category: string,
  question: string,
  correct_answer: string,
  incorrect_answers: string[],
}

interface QuizzStateI {
  answers: string[];
  answerSelected: string;
  score: number;
  setAnswers: (question:QuestionI) => void;
  setAnswerSelected: (answer:string) => void;
  incrementScore: () => void;
}

const suffleArray = <T,>(array: T[]): T[] => {
    return array
      .map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  };


export const useQuizzStateStore = create<QuizzStateI>((set) => ({
  score: 0,
  answers: [],
  answerSelected: '',
  incrementScore: () => set((state) => ({ score: state.score + 1 })),
  setAnswerSelected: (answer) => set(() => ({ answerSelected: answer })),  
  setAnswers: (question: QuestionI) => set(() => ({
    answers: suffleArray([
      question.correct_answer,
      ...question.incorrect_answers,
    ]),
  })),
}))

export type {QuestionI};