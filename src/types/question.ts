export interface AnswerI {
  id?: string,
  title: string,
  selected: boolean,
  correct: boolean,
}

export interface QuestionI {
  type: string,
  difficulty: string,
  category: string,
  question: string,
  correct_answer: string,
  incorrect_answers: string[],
}

export interface ModifiedQuestionI {
  difficulty: string,
  category: string,
  title: string,
  answers: AnswerI[],
}