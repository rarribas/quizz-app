import { type QuizzResultI } from "@/lib/quizz_result";

export const mockResults:QuizzResultI[] = [
  {
    _id: "1",
    score: 120,
    numberOfCorrectAnswers: 10,
    time: 14,
    userName: "Raul",
    isCurrentUser: true,
  },
  {
    _id: "2",
    score: 95,
    numberOfCorrectAnswers: 7,
    time: 18,
    userName: "Lucía",
    isCurrentUser: false,
  },
  {
    _id: "3",
    score: 80,
    numberOfCorrectAnswers: 5,
    time: 20,
    userName: "Marco",
    isCurrentUser: false,
  },
  {
    _id: "4",
    score: 60,
    numberOfCorrectAnswers: 3,
    time: 12,
    userName: "Sara",
    isCurrentUser: false,
  },
  {
    _id: "5",
    score: 45,
    numberOfCorrectAnswers: 1,
    time: 25,
    userName: "Tomás",
    isCurrentUser: false,
  },
];
