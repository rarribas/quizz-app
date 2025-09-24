import {create } from 'zustand';
import { ModifiedQuestionI } from '@/types/question';

interface QuizzStateI {
  questions: ModifiedQuestionI[];
  time: number;
  completed: boolean,
  setTime: (time:number) => void;
  setCompleted: (value:boolean) => void;
  setQuestions: (questions:ModifiedQuestionI[]) => void;
}

export const useQuizzStateStore = create<QuizzStateI>((set) => ({
  questions:[],
  time: 120,
  completed: false,
  setTime: (time) => set(() => ({ time })),
  setCompleted: (value) => set(() => ({ completed: value })),
  setQuestions: (questions) => set(() => ({ questions })),
}))
