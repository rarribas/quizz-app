import { Button } from "./button";

interface QuizzNavigationProps{
  questionIndex: number,
  canShowNext: boolean,
  onNextButtonClicked: (ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
  onPrevButtonCliked: (ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
}
export default function QuizzNavigation({questionIndex, canShowNext, onNextButtonClicked, onPrevButtonCliked}: QuizzNavigationProps){
  return(
    <div className="flex m-4 justify-between">
      <Button 
        size="sm"
        disabled={questionIndex === 0}
        onClick={onPrevButtonCliked}
      >
        Previous Question
      </Button>
      {canShowNext ?  
        <Button size="sm" disabled={questionIndex >= 9} onClick={onNextButtonClicked}>Next Question</Button> 
        : <Button size="sm" disabled={true}>Select an answer to continue</Button>}
      
    </div>
  )
}