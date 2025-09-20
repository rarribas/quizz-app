export interface QuestionI {
  type: string,
  difficulty: string,
  category: string,
  question: string,
  correct_answer: string,
  incorrect_answers: string[],
}

export interface AnswerI {
  text: string,
  selected: boolean,
  correct: boolean,
}