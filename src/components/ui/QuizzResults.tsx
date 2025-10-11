'use client'

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuizzStateStore } from "@/store/useQuizzStateStore";
import {getNumberOfQuestionsWithCorrectAnswer, getTotalPoints} from "@/lib/quizz"
import Header from "./header";
import QuestionPanel from "./QuestionPanel";
export default function QuizzResults(){
  const router = useRouter();
  const {completed, time, questions} = useQuizzStateStore();
  
  useEffect(() => {
    if(!completed){
      router.replace("/quizz/start")
    }
  },[completed, router])

  return(<div className="flex flex-col w-3/5 mx-auto my-0">
    <div className="w-full m-5">
      <Header 
        title="Quizz Completed!" 
        desc={`Congratulations! You have completed the quizz with ${getNumberOfQuestionsWithCorrectAnswer(questions)} correct answers out of 10`}
      />
      <p className="px-1 text-2xl font-bold text-center text-green-600">Points: {getTotalPoints(questions, time)} </p>
    </div>
    {questions.map((question) => {
      return <QuestionPanel key={question.title} question={question} showCorrectAnswers={true} className="mb-5"/>
    })}
  </div>)
}