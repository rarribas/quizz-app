'use client'

import Header from "./header";
import Panel from "./panel";
import MyScorePanel from "./MyScorePanel";
import { Button } from "./button";
import { TrophyIcon, RotateCcw } from "lucide-react";

export default function LeaderBoard(){
  return(
    <div className="flex flex-col w-3/5 mx-auto my-0">
      <div className="w-full mt-5">
        <Header 
          title="Top Scores" 
          desc="Hall of Fame - Top Quizz Performance"
          icon={<TrophyIcon size={48} />}
        />
      </div>
      <MyScorePanel/>

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