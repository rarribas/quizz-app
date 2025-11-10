'use client'

import { useEffect, useTransition } from "react";
import { useQuizzStateStore } from "@/store/useQuizzStateStore";
import Header from "./header";
import Panel from "./panel";
import MyScorePanel from "./MyScorePanel";
import { Button } from "./button";
import { TrophyIcon, RotateCcw } from "lucide-react";
import {getNumberOfQuestionsWithCorrectAnswer, getTotalPoints} from "@/lib/quizz"
import { getHighestScoresAction } from "@/app/actions/quizz-actions";
export default function LeaderBoard(){
  const {time, questions} = useQuizzStateStore();
  const correctQuestions = getNumberOfQuestionsWithCorrectAnswer(questions);
  const totalPoints = getTotalPoints(questions, time);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    // if(!completed){
    //   router.replace("/quizz/start")
    // }

    // if (hasSaved.current) return;
    // hasSaved.current = true;

    startTransition(async () => {
      try{
        const result = await getHighestScoresAction();
        console.log(result);
      }catch(e){
        console.error(e);
        // setError("Couldn't save your results, try again later")
      }
    })
  },[])
  
  return(
    <div className="flex flex-col w-3/5 mx-auto my-0">
      <div className="w-full mt-5">
        <Header 
          title="Top Scores" 
          desc="Hall of Fame - Top Quizz Performance"
          icon={<TrophyIcon size={48} />}
        />
      </div>
      {/* <MyScorePanel 
        score={totalPoints} 
        numberCorrectAnswers={correctQuestions}
        timeBonus={time}
        action={<Button>
          <RotateCcw/>
          Play Again
        </Button>}
      /> */}

      <Panel className="w-full">
        <h4 className="mb-4">Top 10 Leadeboard</h4>
        <Panel className="flex justify-between items-center bg-gray-100 border-1 border-gray-300 w-full mb-4">
          <div>
            <p className="font-bold">QuizzMaster</p>
            <p>9/10 correct - 32s bonus</p>
          </div>
          <div>
            <p className="text-3xl font-bold">91</p>
            <p> Points</p>
          </div>
        </Panel>

        <Panel className="bg-gray-100 border-1 border-gray-300 w-full mb-4">
          <div>
            <p>QuizzMaster</p>
            <p>9/10 correct - 32s bonus</p>
          </div>
        </Panel>

      </Panel>
    </div>
  )
}