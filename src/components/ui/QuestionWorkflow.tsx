'use client'

import { useQuizzConfigStore } from "@/store/useQuizzConfigStore"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loading from "./Loading";

interface QuestionI {
  type: string,
  difficulty: string,
  category: string,
  question: string,
  correct_answer: string,
  incorrect_answer: string[],
}

export default function QuestionWorkflow(){
  const {configuration} = useQuizzConfigStore();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [questions, setQuestions] = useState<QuestionI[]>([])

  useEffect(() => {
    const fetchQuestions = async() =>{
        try {
        const res = await fetch(`https://opentdb.com/api.php?amount=5&category=${configuration.category}&difficulty=${configuration.difficulty}`);
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

  console.log(questions, "QUESTIONS HERE");
  
  return (
    <div className="m-4">
      <h1>Start Quizz</h1>
      <p>Difficulty: {configuration.difficulty}</p>
      <p>Category: {configuration.category}</p>
    </div>
  )
}