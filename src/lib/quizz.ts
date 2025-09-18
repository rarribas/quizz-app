import { QuestionI } from "@/types/question";

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

export const suffleAnwers = (question:QuestionI) => {
  return suffleArray([
    question.correct_answer,
    ...question.incorrect_answers,
  ]);
}