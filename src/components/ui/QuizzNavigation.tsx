import { Button } from "./button";

interface QuizzNavigationProps{
  questionIndex: number,
  canShowNext: boolean,
  onNextButtonClicked: (ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
  onPrevButtonCliked: (ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
}
export default function QuizzNavigation({questionIndex, canShowNext, onNextButtonClicked, onPrevButtonCliked}: QuizzNavigationProps){
  const totalQuestions = 10;
  const isLastQuestion = questionIndex === totalQuestions - 1;
  return(
    <div className="flex my-4 justify-between">
      <Button 
        size="sm"
        disabled={questionIndex === 0}
        onClick={onPrevButtonCliked}
      >
        Previous Question
      </Button>
      {canShowNext ?  
        <Button size="sm" disabled={questionIndex + 1 > 10} onClick={onNextButtonClicked}>{isLastQuestion ? "Finish Quiz" : "Next Question"}</Button> 
        : <Button size="sm" disabled={true}>Select an answer to continue</Button>}
      
    </div>
  )
}