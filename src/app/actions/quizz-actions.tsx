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

interface IFetchedCategories {
  categories: QuizzCategoriesI[],
  error: string,
}
export async function fetchCategories(): Promise<IFetchedCategories> {
  const categoriesResponse = {
    categories: [],
    error:'',
  } as IFetchedCategories;

  const res = await fetch(CAT_URL, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    categoriesResponse.error = 'Error fetching categories, please try again later';
    return categoriesResponse;
  }

  const data = await res.json();
  
  if(!data.trivia_categories){
    categoriesResponse.error = 'No categories in the response';
    return categoriesResponse;
  }

  categoriesResponse.categories = data.trivia_categories;
  return categoriesResponse;
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