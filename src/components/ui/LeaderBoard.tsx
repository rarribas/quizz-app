'use client'

import Header from "./header";
import Panel from "./panel";
import { Button } from "./button";
import { TrophyIcon } from "lucide-react";

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
      <Panel className="bg-gradient-to-r from-blue-500 to-purple-500  w-full mb-5">
        <div>
          <header className="flex justify-between">
            <h3 className="mb-4 text-white font-bold">Your Latest Score</h3>
            <p className="text-white font-bold">Rank #3</p>
          </header>
          
          <div className="flex justify-between">
            <div className="flex items-center">
              <p className="text-3xl font-bold text-white"> 30 </p>
              <div className="mx-3">
                <p className="text-sm text-white font-bold">5/10 correct</p>
                <p className="text-sm text-white font-bold">30 seconds bonus</p>
              </div>
            </div>
            <div>
              <Button>Play Again</Button>
            </div>
          </div>
          
        </div>
      </Panel>
    </div>
  )
}