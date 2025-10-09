'use client'

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuizzStateStore } from "@/store/useQuizzStateStore";
import {getNumberOfQuestionsWithCorrectAnswer, getTotalPoints} from "@/lib/quizz"
import Panel from "./panel";
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
    <Panel className="w-full mb-5">
      <header>
        <h1>Quizz Completed!</h1>
      </header>
      <div>
        <p>Time left: {time}</p>
        <p>Number of correct answers: {getNumberOfQuestionsWithCorrectAnswer(questions)}</p>
        <p>Total Points: {getTotalPoints(questions, time)} </p>
      </div>
    </Panel>
    {questions.map((question) => {
      return <QuestionPanel key={question.title} question={question} showCorrectAnswers={true} className="mb-5"/>
    })}
  </div>)
}