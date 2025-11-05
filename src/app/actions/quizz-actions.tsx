'use server'

import { createQuizzResult, QuizzResultI } from "@/lib/quizz_result";

export async function saveQuizzResult(quizzData: QuizzResultI) {
  const result = await createQuizzResult(quizzData);
  return result;
}
