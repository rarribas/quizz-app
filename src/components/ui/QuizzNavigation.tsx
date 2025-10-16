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
        data-testid="test-prev-button"
        onClick={onPrevButtonCliked}
      >
        Previous Question
      </Button>
      {canShowNext ?  
        <Button size="sm" disabled={questionIndex + 1 > 10} onClick={onNextButtonClicked} data-testid="test-next-button">{isLastQuestion ? "Finish Quiz" : "Next Question"}</Button> 
        : <Button size="sm" disabled={true} data-testid="test-next-button">Select an answer to continue</Button>}
      
    </div>
  )
}