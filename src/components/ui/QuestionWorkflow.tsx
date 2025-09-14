'use client'

import { useQuizzConfigStore } from "@/store/useQuizzConfigStore"
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Loading from "./Loading";
import QuestionPanel, {QuestionI} from "./QuestionPanel";
import { getToken } from "@/lib/quizz";
import { Button } from "./button";
import {Progress} from "./progress";

export default function QuestionWorkflow(){
  const {configuration} = useQuizzConfigStore();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [questions, setQuestions] = useState<QuestionI[]>([]);
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [nextEnabled, setNextEnabled] = useState<boolean>(false);
  const [points, setPoints] = useState<number>(0);
  const fetchedRef = useRef(false);

  useEffect(() => {
    // To avoid fethcing again when strict mode is enabled
    // as we'll end up getting a too many request error in the API
    if (fetchedRef.current) return; 
    fetchedRef.current = true;
    
    // Get or reuse token
    const fetchQuestions = async() =>{
      let token = sessionStorage.getItem("quizzToken");
      if(!token){
        token = await getToken();
        if(token){
          sessionStorage.setItem("quizzToken", token);
        }
      }

      try {
        const res = await fetch(`https://opentdb.com/api.php?amount=10&category=${configuration.category}&difficulty=${configuration.difficulty}&token=${token}`);
        const data = await res.json();
        setQuestions(data.results);
        setLoading(false)
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }

    fetchQuestions();    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  useEffect(() =>{
    if(!configuration || !configuration.done){
      router.replace("/quizz");
    }

  },[configuration, router])

  if(!configuration || !configuration.done) return null;
  if(loading) return <Loading/>

  // TODO: Need to build error page.
  // When refetching the API many times in a row I get no questions in the response
  if(!questions){
    return <p>TODO: Something went wrong</p>
  }

  const afterItemSelected = (hasCorrectAnswer:boolean) =>{
    setNextEnabled(true);
    if(hasCorrectAnswer){
      setPoints((prev) => prev + 1);
    }
  }

  const onNextButtonClick = (ev: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    ev.preventDefault();

    setQuestionIndex(prevIndex => prevIndex + 1);
    setNextEnabled(false);
  }
  
  const progress = ((questionIndex + 1) / questions.length) * 100;

  console.log("POINTS", points);
  console.log("PROGRESS", progress);
  
  return (
    <div className="flex flex-col w-3/5 mx-auto my-0">
      <Progress className="mb-6" value={progress} />
      <QuestionPanel 
        question={questions[questionIndex]} 
        afterItemSelected={afterItemSelected} 
      />
      <div className="flex m-4 justify-between">
        <Button 
          size="sm"
          disabled={questionIndex === 0}
        >
          Previous
        </Button>
        {nextEnabled ?  
          <Button size="sm" disabled={questionIndex >= 9} onClick={onNextButtonClick}>Next</Button> 
          : <Button size="sm" disabled={true}>Select an answer to continue</Button>}
       
      </div>
    </div>
  )
}