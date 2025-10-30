import connectToDatabase from "./mongoose";
import { Types } from "mongoose";
import QuizzResult from "@/models/QuizzResult";

type QuizzResponse = 
  | { success: true }
  | { success: false; error: string };

export interface QuizzResultI {
  userId: Types.ObjectId;
  time: number;
  score: number;
  numberOfCorrectAnswers: number
  createdAt?: Date;
  updatedAt?: Date;
}

export async function createQuizzResult(
  quizzResult:QuizzResultI
):Promise<QuizzResponse>{

  try {
    await connectToDatabase();

    const newQuizzResult = new QuizzResult(quizzResult);
    await newQuizzResult.save();

    return { success: true };
  } catch(err){
    console.error('Error creating quizz result:', err);
    throw err;
    return { success: false, error: 'Failed to create quizz result' };
  }
}