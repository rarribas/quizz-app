import {create } from 'zustand';
import { QuestionI } from '@/types/question';

interface QuizzStateI {
  answers: string[];
  answerSelected: string;
  score: number;
  setAnswerSelected: (answer:string) => void;
  incrementScore: () => void;
}

export const useQuizzStateStore = create<QuizzStateI>((set) => ({
  score: 0,
  answers: [],
  answerSelected: '',
  incrementScore: () => set((state) => ({ score: state.score + 1 })),
  setAnswerSelected: (answer) => set(() => ({ answerSelected: answer })),  
}))

export type {QuestionI};