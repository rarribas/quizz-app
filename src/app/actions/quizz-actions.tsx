'use server'

import { 
  createQuizzResult, 
  getHighestScores, 
  getRankingForScore,
  type QuizzResultI, 
  type QuizzResultToSave 
} from "@/lib/quizz_result";

export async function saveQuizzResult(quizzData: QuizzResultToSave) {
  const result = await createQuizzResult(quizzData);
  return result;
}

export async function getHighestScoresAction(): Promise<QuizzResultI[]> {
  const result = await getHighestScores();

  if (!result.success || !result.data) {
    return []; // or throw new Error(result.error)
  }

  return result.data;
}

export async function getRanking(userScore: string): Promise<number | null> {
  const result = await getRankingForScore(userScore);

  if (!result.success || !result.rank) {
    return null; // or throw new Error(result.error)
  }

  return result.rank;
}