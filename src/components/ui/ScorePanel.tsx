import Panel from "./panel"

interface ScorePanelI {
  score: number;
  numberCorrectAnswers: number;
  timeBonus: number;
  user: string;
  isCurrentUser?: boolean;
  dataTestId?: string;
}

export default function ScorePanel({
  score,
  numberCorrectAnswers,
  timeBonus,
  user,
  isCurrentUser,
  dataTestId,
}:ScorePanelI){
  let classList ='flex items-center justify-between border-1 w-full mb-4';

  if(isCurrentUser){
    classList += ' bg-blue-100 border-blue-300';
  }else{
    classList += ' bg-gray-100 border-gray-300';
  }

  return(
    <Panel className={classList} dataTestId={dataTestId}>
      <div>
        <p data-testid="score-panel-user" className="font-bold">{isCurrentUser ? 'You' : user}</p>
        <p>{numberCorrectAnswers}/10 correct - {timeBonus}s bonus</p>
      </div>
      <div>
        <p className="text-3xl font-bold">{score}</p>
        <p> Points</p>
      </div>
    </Panel>
  )
}