'use client'

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuizzStateStore } from "@/store/useQuizzStateStore";
import {getNumberOfQuestionsWithCorrectAnswer, getTotalPoints} from "@/lib/quizz"
export default function QuizzResults(){
  const router = useRouter();
  const {completed, time, questions} = useQuizzStateStore();
  
  useEffect(() => {
    if(!completed){
      router.replace("/quizz/start")
    }
  },[completed, router])

  return(<div>
    <h1>Quizz Completed!</h1>
    <p>Time left: {time}</p>
    <p>Number of correct answers: {getNumberOfQuestionsWithCorrectAnswer(questions)}</p>
    <p>Total Points: {getTotalPoints(questions, time)} </p>
  </div>)
}