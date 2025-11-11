import Panel from "./panel"

interface ScorePanelI {
  score: number;
  numberCorrectAnswers: number;
  timeBonus: number;
  user: string;
}

export default function ScorePanel({
  score,
  numberCorrectAnswers,
  timeBonus,
  user,
}:ScorePanelI){
  return(
    <Panel className="flex items-center justify-between bg-gray-100 border-1 border-gray-300 w-full mb-4">
      <div>
        <p>{user}</p>
        <p>{numberCorrectAnswers}/10 correct - {timeBonus}s bonus</p>
      </div>
      <div>
        <p className="text-3xl font-bold">{score}</p>
        <p> Points</p>
      </div>
    </Panel>
  )
}