'use client'

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useQuizzStateStore } from "@/store/useQuizzStateStore";
import {getNumberOfQuestionsWithCorrectAnswer, getTotalPoints} from "@/lib/quizz"
import Header from "./header";
import QuestionPanel from "./QuestionPanel";
import {TrophyIcon} from "lucide-react";
import Panel from "./panel";
import { saveQuizzResult } from "@/app/actions/quizz-actions";
import Error from "./Error";
import Loading from "./Loading";
export default function QuizzResults(){
  const router = useRouter();
  const {completed, time, questions} = useQuizzStateStore();
  const correctQuestions = getNumberOfQuestionsWithCorrectAnswer(questions);
  const totalPoints = getTotalPoints(questions, time)
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string>('')
  useEffect(() => {
    if(!completed){
      router.replace("/quizz/start")
    }

    startTransition(async () => {
      try{
        await saveQuizzResult({
          time,
          score: totalPoints,
          numberOfCorrectAnswers: correctQuestions,
        });
      }catch(e){
        console.error(e);
        setError("Couldn't save your results, try again later")
      }
    })
  },[completed, router, time, totalPoints, correctQuestions])

  if(isPending) return <Loading/>

  if(error) return <Error errorMessage={error}/>


  return(<div className="flex flex-col w-3/5 mx-auto my-0">
    <div className="w-full mt-5">
      <Header 
        title="Quizz Completed!" 
        desc={"Check out your quizz results!"}
        icon={<TrophyIcon size={48} />}
      />
    </div>
    <Panel className="w-full mb-5">
      <h3 className="mb-4">Your Latest Score</h3>
      <div className="flex items-center">
        <p className="text-3xl font-bold text-green-600">{totalPoints} </p>
        <div className="mx-3">
          <p className="text-sm">{correctQuestions}/10 correct</p>
          <p className="text-sm">{time} seconds bonus</p>
        </div>
      </div>
    </Panel>
    {questions.map((question) => {
      return <QuestionPanel key={question.title} question={question} className="mb-5"/>
    })}
  </div>)
}