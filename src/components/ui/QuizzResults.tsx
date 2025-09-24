'use client'

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuizzStateStore } from "@/store/useQuizzStateStore";
import {getNumberOfQuestionsWithCorrectAnswer} from "@/lib/quizz"
export default function QuizzResults(){
  const router = useRouter();
  const {completed, time, questions} = useQuizzStateStore();
  
  useEffect(() => {
    if(!completed){
      router.replace("/quizz/start")
    }
  },[completed, router])

  console.log(
    questions.map((q, i) => ({
      index: i,
      hasCorrect: q.answers.some((a) => a.correct),
      answers: q.answers,
    }))
  );
  return(<div>
    <h1>Quizz Completed!</h1>
    <p>Time left: {time}</p>
    <p>Number of correct answers: {getNumberOfQuestionsWithCorrectAnswer(questions)}</p>
  </div>)
}