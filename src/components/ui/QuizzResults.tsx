'use client'

import { useEffect, useState, useTransition, useRef } from "react";
import { useRouter } from "next/navigation";
import { useQuizzStateStore } from "@/store/useQuizzStateStore";
import { getFinalScore } from "@/lib/quizz"
import Header from "./header";
import QuestionPanel from "./QuestionPanel";
import MyScorePanel from "./MyScorePanel";
import {TrophyIcon} from "lucide-react";
import { saveQuizzResult } from "@/app/actions/quizz-actions";
import Error from "./Error";
import Loading from "./Loading";
import StyledLink from "./StyledLink";
export default function QuizzResults(){
  const router = useRouter();
  const {completed, time, questions} = useQuizzStateStore();
  const {correctQuestions, points} = getFinalScore(questions, time);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string>('');
  // To prevent multiple saves, it'll persist in between renders
  const hasSaved = useRef(false); 

  useEffect(() => {
    if(!completed){
      router.replace("/quizz/start")
    }

    if (hasSaved.current) return;
    hasSaved.current = true;

    // Move this logic to the QuestionWorkflow
    startTransition(async () => {
      try{
        await saveQuizzResult({
          time,
          score: points,
          numberOfCorrectAnswers: correctQuestions,
        });
      }catch(e){
        console.error(e);
        setError("Couldn't save your results, try again later")
      }
    })
  },[completed, router, time, points, correctQuestions])

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

    <MyScorePanel 
      score={points} 
      numberCorrectAnswers={correctQuestions}
      timeBonus={time}
      action={<StyledLink href="/quizz/leaderboard">View Leaderboard</StyledLink>}
    />

    {questions.map((question) => {
      return <QuestionPanel key={question.title} question={question} className="mb-5"/>
    })}
  </div>)
}