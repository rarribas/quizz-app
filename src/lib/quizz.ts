import { QuestionI, ModifiedQuestionI } from "@/types/question";
import he from "he";
import { v4 as uuidv4 } from 'uuid';

interface FinalScoreI {
  correctQuestions: number;
  points: number;
  bonus: number
}

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

const shuffleArray = <T,>(array: T[]): T[] => {
    return array
      .map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  };

export const shuffleAnswers = (question:QuestionI):ModifiedQuestionI => {
  const answers =  shuffleArray([
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
export const filterByCorrectAnswerSelected = (questions: ModifiedQuestionI[]):ModifiedQuestionI[]  => {
  return questions.filter((question) => {
    return question.answers.some((answer) => {
      return answer.correct && answer.selected;
    });
  });
}

export const getNumberOfQuestionsWithCorrectAnswer = (questions: ModifiedQuestionI[]):number => {
  const rigthQuestions = filterByCorrectAnswerSelected(questions);
  return rigthQuestions.length;
}

export const getFinalScore = (questions: ModifiedQuestionI[], remainingTime:number):FinalScoreI => {
  const correctQuestions = getNumberOfQuestionsWithCorrectAnswer(questions);
  let points = correctQuestions;

  if(points >= 5){
    points += remainingTime;
  }

  return {
    correctQuestions,
    points,
    bonus: points >= 5 ? remainingTime : 0,
  };
}