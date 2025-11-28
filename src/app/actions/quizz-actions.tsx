'use server'

import { 
  createQuizzResult, 
  getHighestScores, 
  getRankingForScore,
  type QuizzResultI, 
  type QuizzResultToSave 
} from "@/lib/quizz_result";

import { type QuizzCategoriesI } from "@/store/useQuizzCategoriesStore";

const CAT_URL:string = "https://opentdb.com/api_category.php";

export async function fetchCategories(): Promise<QuizzCategoriesI[]> {
  try {
    const res = await fetch(CAT_URL, {
      next: { revalidate: 3600 },
    });

    const data = await res.json();
    return data.trivia_categories ?? [];
  } catch (error) {
    console.error("fetchCategories error:", error);
    throw new Error("Error while fetching categories. Please try again later")
    // return [];
  }
}


export async function saveQuizzResult(quizzData: QuizzResultToSave) {
  const result = await createQuizzResult(quizzData);
  return result;
}

export async function getHighestScoresAction(): Promise<QuizzResultI[]> {
  const result = await getHighestScores();

  if (!result.success || !result.data) {
    return [];
  }

  return result.data;
}

export async function getRanking(userScore: string): Promise<number | null> {
  const result = await getRankingForScore(userScore);

  if (!result.success || !result.rank) {
    return null;
  }

  return result.rank;
}