import Panel from "./panel";
import { ReactNode, useState, useEffect } from "react";
import { getRanking } from "@/app/actions/quizz-actions";

interface MyScorePanelI {
  score: number;
  numberCorrectAnswers: number;
  timeBonus: number;
  action?: ReactNode;
}

export default function MyScorePanel({
  score,
  numberCorrectAnswers,
  timeBonus,
  action,
}:MyScorePanelI){

  const [ranking, setRanking] = useState<number | null>(null);
  
  useEffect(() => {
    async function fetchRanking(){
      const userRank =  await getRanking(score.toString());
      setRanking(userRank);
    }
    fetchRanking();
  },[score]);

  return (
    <Panel className="bg-gradient-to-r from-blue-500 to-purple-500  w-full mb-5">
      <div>
        <header className="flex justify-between">
          <h3 className="mb-4 text-white font-bold">Your Latest Score</h3>
          {ranking && <p className="text-white font-bold">Ranking #{ranking}</p>}
        </header>
        
        <div className="flex justify-between">
          <div className="flex items-center">
            <p className="text-3xl font-bold text-white"> {score} </p>
            <div className="mx-3">
              <p className="text-sm text-white font-bold">{numberCorrectAnswers}/10 correct</p>
              <p className="text-sm text-white font-bold">{timeBonus} seconds bonus</p>
            </div>
          </div>
          {action && <div>{action}</div>}
        </div>
        
      </div>
    </Panel>
  )
}