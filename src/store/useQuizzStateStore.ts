import {create } from 'zustand';
import { QuestionI } from '@/types/question';

interface QuizzStateI {
  answers: string[];
  answerSelected: string;
  score: number;
  time: number;
  completed: boolean,
  setTime: (time:number) => void;
  setAnswerSelected: (answer:string) => void;
  incrementScore: () => void;
  setCompleted: (value:boolean) => void;
}

export const useQuizzStateStore = create<QuizzStateI>((set) => ({
  score: 0,
  answers: [],
  answerSelected: '',
  time: 120,
  completed: false,
  incrementScore: () => set((state) => ({ score: state.score + 1 })),
  setAnswerSelected: (answer) => set(() => ({ answerSelected: answer })),
  setTime: (time) => set(() => ({ time })),
  setCompleted: (value) => set(() => ({ completed: value })),
}))

export type {QuestionI};