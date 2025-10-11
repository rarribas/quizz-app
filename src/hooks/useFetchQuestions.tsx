import { useEffect, useState, useRef } from "react"
import { QuestionI } from '@/types/question';
import { useQuizzConfigStore } from "@/store/useQuizzConfigStore"
import { getToken, shuffleAnswers } from "@/lib/quizz";
import { useQuizzStateStore } from "@/store/useQuizzStateStore";

export default function useFetchQuestions() {
  const {configuration} = useQuizzConfigStore();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const fetchedRef = useRef(false);
  const {setQuestions} = useQuizzStateStore();

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
        console.log(data.results, "RESULTS??");
        const modifiedQ = data.results.map((question:QuestionI) => {
          return shuffleAnswers(question)
        })
        setQuestions(modifiedQ);
        setLoading(false)
      } catch (error) {
        console.error(error);
        setError(error instanceof Error ? error.message : String(error));
        setLoading(false);
      }
    }

    fetchQuestions();    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  return {loading, error}  
}