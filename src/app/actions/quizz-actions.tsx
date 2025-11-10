'use server'

import { createQuizzResult, getHighestScores, type QuizzResultI } from "@/lib/quizz_result";

export async function saveQuizzResult(quizzData: QuizzResultI) {
  const result = await createQuizzResult(quizzData);
  return result;
}

export async function getHighestScoresAction(): Promise<QuizzResultI[]> {
  const result = await getHighestScores();
  console.log(result, "INSIDE ACTION")

  if (!result.success || !result.data) {
    return []; // or throw new Error(result.error)
  }

  return result.data;
}
