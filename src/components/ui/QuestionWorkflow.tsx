'use client'

import { useQuizzConfigStore } from "@/store/useQuizzConfigStore"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loading from "./Loading";
import QuestionPanel, {QuestionI} from "./QuestionPanel";

export default function QuestionWorkflow(){
  const {configuration} = useQuizzConfigStore();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [questions, setQuestions] = useState<QuestionI[]>([]);

  useEffect(() => {
    const fetchQuestions = async() =>{
        try {
        const res = await fetch(`https://opentdb.com/api.php?amount=10&category=${configuration.category}&difficulty=${configuration.difficulty}`);
        const data = await res.json();
        setQuestions(data.results);
        setLoading(false)
      } catch (error) {
        console.error(error);
        setLoading(false)
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
  if(questions.length === 0){
    return <p>TODO: Something went wrong</p>
  }
  
  return (
    <QuestionPanel questions={questions}/>
  )
}