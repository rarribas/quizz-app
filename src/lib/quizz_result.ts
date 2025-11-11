import connectToDatabase from "./mongoose";
import QuizzResult from "@/models/QuizzResult";
import { auth } from "@/lib/auth-helper";
import { Types } from "mongoose";

export interface QuizzResultI {
  _id?: string;
  time: number;
  score: number;
  numberOfCorrectAnswers: number;
  userEmail: string,
}

export type QuizzResultToSave = Omit<QuizzResultI, '_id' | 'userEmail'>;

type QuizzResponse = 
  | { success: true, data?: QuizzResultI[] }
  | { success: false; error: string };

export async function createQuizzResult(
  quizzResult:QuizzResultToSave
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

export async function getHighestScores(): Promise<QuizzResponse> {
  try {
    // Connect to the database
    await connectToDatabase();

    // Fetch top 10 scores, only return the score field
    const topScores = await QuizzResult.find()
      .sort({ score: -1 })
      .limit(10)
      .populate('userId', 'email') //find the user record in User and populates userid whith results
      .lean(); // returns plain JS objects instead of Mongoose documents

    const formattedScores: QuizzResultI[] = topScores.map(doc => ({
      _id: (doc._id as Types.ObjectId).toString(),
      time: doc.time,
      score: doc.score,
      numberOfCorrectAnswers: doc.numberOfCorrectAnswers,
      userEmail: doc.userId?.email || '',
    }));
    return { success: true, data: formattedScores };
  } catch (err) {
    console.error("Error fetching highest scores:", err);
    return { success: false, error: "Failed to fetch highest scores" };
  }
}