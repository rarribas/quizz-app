import connectToDatabase from "./mongoose";
import QuizzResult from "@/models/QuizzResult";
import { auth } from "@/lib/auth-helper";

type QuizzResponse = 
  | { success: true }
  | { success: false; error: string };

export interface QuizzResultI {
  time: number;
  score: number;
  numberOfCorrectAnswers: number
}

export async function createQuizzResult(
  quizzResult:QuizzResultI
):Promise<QuizzResponse>{

  try {
    const session = await auth();

    if (!session?.user?.id) {
      return { success: false, error: "User not authenticated" };
    }

    await connectToDatabase();

    const newQuizzResult = new QuizzResult({
      ...quizzResult,
      userId: session.user.id,
    });
    await newQuizzResult.save();

    return { success: true };
  } catch(err){
    console.error('Error creating quizz result:', err);
    throw err;
    return { success: false, error: 'Failed to create quizz result' };
  }
}