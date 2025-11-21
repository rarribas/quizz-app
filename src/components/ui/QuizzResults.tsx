'use client'

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuizzStateStore } from "@/store/useQuizzStateStore";
import { getFinalScore } from "@/lib/quizz"
import Header from "./header";
import QuestionPanel from "./QuestionPanel";
import MyScorePanel from "./MyScorePanel";
import {TrophyIcon} from "lucide-react";
import StyledLink from "./StyledLink";
export default function QuizzResults(){
  const router = useRouter();
  const {completed, time, questions} = useQuizzStateStore();
  const {correctQuestions, points} = getFinalScore(questions, time);

  useEffect(() => {
    if(!completed){
      router.replace("/quizz/start")
    }

  },[completed, router])


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