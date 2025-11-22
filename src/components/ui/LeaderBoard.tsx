'use client'

import { useEffect, useTransition, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuizzStateStore } from "@/store/useQuizzStateStore";
import { useQuizzConfigStore } from "@/store/useQuizzConfigStore";
import Header from "./header";
import Panel from "./panel";
import MyScorePanel from "./MyScorePanel";
import ScorePanel from "./ScorePanel";
import { Button } from "./button";
import { TrophyIcon, RotateCcw } from "lucide-react";
import { getFinalScore } from "@/lib/quizz"
import { getHighestScoresAction } from "@/app/actions/quizz-actions";
import { QuizzResultI } from "@/lib/quizz_result";
import Loading from "./Loading";
import Error from "./Error";
import { Medal } from "lucide-react";
import { WithCompletitionRedirect } from "../WithCompletitionRedirect";

const LeaderBoard = () => {
  const router = useRouter();
  const {setConfiguration} = useQuizzConfigStore();
  const {setCompleted, time, setTime, questions} = useQuizzStateStore();
  const {correctQuestions, points, bonus} = getFinalScore(questions, time);
  const [isPending, startTransition] = useTransition();
  const [quizzResults, setQuizzResults] = useState<QuizzResultI[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    startTransition(async () => {
      try{
        const result = await getHighestScoresAction();
        setQuizzResults(result);
      }catch(e){
        console.error(e);
        setError("Couldn't save your results, try again later")
      }
    })
  },[router])

  if(isPending) return <Loading/>
  
  if(error) return <Error errorMessage={error}/>

  const onButtonClick = () => {
    // Resets the quizz state and configuration to allow playing again
    setConfiguration({ done: false, category: '', difficulty: ''});
    setCompleted(false);
    setTime(120);
  }
  
  return(
    <div className="flex flex-col w-3/5 mx-auto my-0">
      <div className="w-full mt-5">
        <Header 
          title="Top Scores" 
          desc="Hall of Fame - Top Quizz Performance"
          icon={<TrophyIcon size={48} />}
        />
      </div>
      <MyScorePanel 
        score={points} 
        numberCorrectAnswers={correctQuestions}
        timeBonus={bonus}
        action={
          <Button
           onClick={onButtonClick}
          >
            <RotateCcw/>
            Play Again
          </Button>
        }
      />

      <Panel className="w-full">
        <header className="flex items-center mb-4 gap-2">
          <Medal size={14}/>
          <h4 className="font-bold">Top 10 Leadeboard</h4>
        </header>
      
        {quizzResults.map((result, index) => (
          <ScorePanel 
            key={result._id || index}
            score={result.score}
            numberCorrectAnswers={result.numberOfCorrectAnswers}
            timeBonus={result.numberOfCorrectAnswers >= 5 ? result.time : 0}
            user={result.userName}
            isCurrentUser={result.isCurrentUser}
          />
        ))}

      </Panel>
    </div>
  )
}

export const RawLeaderboard = LeaderBoard;
export default WithCompletitionRedirect(LeaderBoard, '/quizz')