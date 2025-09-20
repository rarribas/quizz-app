import { useEffect, useState, useRef } from "react"
import type { QuestionI } from "@/store/useQuizzStateStore";
import { useQuizzConfigStore } from "@/store/useQuizzConfigStore"
import { getToken } from "@/lib/quizz";

export default function useFetchQuestions() {
  const {configuration} = useQuizzConfigStore();
  const [loading, setLoading] = useState<boolean>(true);
  const [questions, setQuestions] = useState<QuestionI[]>([]);
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

  return {questions, loading}  
}