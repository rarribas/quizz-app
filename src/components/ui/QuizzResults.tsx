'use client'

import { useQuizzStateStore } from "@/store/useQuizzStateStore";
import { getFinalScore } from "@/lib/quizz"
import Header from "./header";
import QuestionPanel from "./QuestionPanel";
import MyScorePanel from "./MyScorePanel";
import {TrophyIcon} from "lucide-react";
import StyledLink from "./StyledLink";
import { WithCompletitionRedirect } from "../WithCompletitionRedirect";
const QuizzResults = () => {
  const {time, questions} = useQuizzStateStore();
  const {correctQuestions, points, bonus} = getFinalScore(questions, time);

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
      timeBonus={bonus}
      action={<StyledLink href="/quizz/leaderboard" data-testid="view-leaderboard-link">View Leaderboard</StyledLink>}
    />

    {questions.map((question) => {
      return <QuestionPanel key={question.title} question={question} className="mb-5"/>
    })}
  </div>)
}

export const RawQuizzResults = QuizzResults;
export default WithCompletitionRedirect(QuizzResults, '/quizz/start')