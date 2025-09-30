'use client'

import { useQuizzConfigStore } from "@/store/useQuizzConfigStore"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loading from "./Loading";
import Error from "./Error";
import QuestionPanel from "./QuestionPanel";
import QuizzNavigation from "./QuizzNavigation";
import useFetchQuestions from "@/hooks/useFetchQuestions";
import {Progress} from "./progress";
import { useQuizzStateStore } from "@/store/useQuizzStateStore";
import CountDown from "./Countdown";
import { hasAnswerSelected } from "@/lib/quizz";
export default function QuestionWorkflow(){
  const {configuration} = useQuizzConfigStore();
  const router = useRouter();
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const {questions, completed, setCompleted} = useQuizzStateStore();
  const {loading, error} = useFetchQuestions();


  useEffect(() =>{
    if(!configuration || !configuration.done){
      router.replace("/quizz");
    }

    if(completed){
      router.replace("/quizz/completed")
    }

  },[configuration, completed, router])

  if(!configuration || !configuration.done) return null;
  if(loading) return <Loading/>
  if(error) return <Error errorMessage={error}/>
  if(!questions)return <Error errorMessage={"Something wrong loading the questions"}/>

  const onNextButtonClick = (ev: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    ev.preventDefault();
    if(questionIndex + 1 >= 9) {
      setCompleted(true)
      return;
    }
    setQuestionIndex(prevIndex => prevIndex + 1);
  }

  const onPrevButtonClick = (ev: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    ev.preventDefault();

    setQuestionIndex(prevIndex => prevIndex - 1);
  }
  
  const progress = ((questionIndex + 1) / questions.length) * 100;
  
  return (
    <div className="flex flex-col w-3/5 mx-auto my-0">
      <div className="flex justify-between mb-2">
        <CountDown/>
        <div>Question {questionIndex + 1} of 10</div>
      </div>
      <Progress className="mb-6" value={progress} />
      <QuestionPanel 
        question={questions[questionIndex]} 
      />
      <QuizzNavigation
        questionIndex={questionIndex}
        onNextButtonClicked={onNextButtonClick}
        onPrevButtonCliked={onPrevButtonClick}
        canShowNext={hasAnswerSelected(questions[questionIndex])}
      />
    </div>
  )
}