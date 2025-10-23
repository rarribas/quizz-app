'use client'

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuizzStateStore } from "@/store/useQuizzStateStore";
import {getNumberOfQuestionsWithCorrectAnswer, getTotalPoints} from "@/lib/quizz"
import Header from "./header";
import QuestionPanel from "./QuestionPanel";
import {TrophyIcon} from "lucide-react";
import Panel from "./panel";
export default function QuizzResults(){
  const router = useRouter();
  const {completed, time, questions} = useQuizzStateStore();
  
  useEffect(() => {
    if(!completed){
      router.replace("/quizz/start")
    }
  },[completed, router])

  return(<div className="flex flex-col w-3/5 mx-auto my-0">
    <div className="w-full mt-5">
      <Header 
        title="Quizz Completed!" 
        desc={"Check out your test results!"}
        icon={<TrophyIcon size={48} />}
      />
    </div>
    <Panel className="w-full mb-5">
      <h3 className="mb-4">Your Latest Score</h3>
      <div className="flex items-center">
        <p className="text-3xl font-bold text-green-600">{getTotalPoints(questions, time)} </p>
        <div className="mx-3">
          <p className="text-sm">{getNumberOfQuestionsWithCorrectAnswer(questions)}/10 correct</p>
          <p className="text-sm">{time} seconds bonus</p>
        </div>
      </div>
    </Panel>
    {questions.map((question) => {
      return <QuestionPanel key={question.title} question={question} className="mb-5"/>
    })}
  </div>)
}