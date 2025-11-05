import mongoose from "mongoose";

const quizzResultSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  time: {
    type:Number,
    required: true
  },
  score: {
    type:Number,
    required: true
  }, 
  numberOfCorrectAnswers: {
    type: Number,
    required: true,
  }
})

const QuizzResult = mongoose.models.QuizzResult || mongoose.model("QuizzResult", quizzResultSchema)
export default QuizzResult;