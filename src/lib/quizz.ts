import { QuestionI, ModifiedQuestionI, AnswerI } from "@/types/question";
import he from "he";
import { v4 as uuidv4 } from 'uuid';

export const getToken = async (): Promise<string | null> => {
  try {
    const res = await fetch("https://opentdb.com/api_token.php?command=request");
    const data = await res.json();
    if (data.response_code === 0) {
      return data.token;
    }
    console.error("Failed to get token", data);
    return null;
  } catch (err) {
    console.error(err);
    return null;
  }
};

const suffleArray = <T,>(array: T[]): T[] => {
    return array
      .map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  };

export const suffleAnwers = (question:QuestionI):ModifiedQuestionI => {
  const answers =  suffleArray([
    {
      id: uuidv4(),
      title: question.correct_answer && he.decode(question.correct_answer),
      correct: true,
      selected: false,
    },
    ...question.incorrect_answers.map((q) =>{
      return {
        id: uuidv4(),
        title: q && he.decode(q),
        correct: false,
        selected: false,
      }
    })
  ]);

  return {
    title: he.decode(question.question),
    category: question.category,
    difficulty: question.difficulty,
    answers
  };
}

export const hasAnswerSelected = (question: ModifiedQuestionI): boolean => {
  const selectedAnswer =  question.answers.find((answer) => answer.selected);
  return !!selectedAnswer;
}

export const findAnswerById = (question: ModifiedQuestionI, answerID: string | undefined)  => {
  if(!answerID) return null
  return question.answers.find((answer) => answer.id === answerID);
}
export const findSelectedAnswer = (question: ModifiedQuestionI)  => {
  return question.answers.find((answer) => answer.selected);
}