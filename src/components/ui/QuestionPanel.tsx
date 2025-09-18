'use client'

import { useEffect, useState } from "react"
import Panel from "./panel"
import { Badge } from "./badge"
import he from "he";
import { useQuizzStateStore, type QuestionI } from "@/store/useQuizzStateStore";
import { suffleAnwers } from "@/lib/quizz";

interface QuestionPanelProps {
  question: QuestionI
}

export default function QuestionPanel({question}:QuestionPanelProps ) {
  const {incrementScore, answerSelected, setAnswerSelected} = useQuizzStateStore();
  const [answers, setAnswers] = useState<string[]>(suffleAnwers(question));

  useEffect(() => {
      setAnswers(suffleAnwers(question));
      // Reset selection for new question
      setAnswerSelected('');
  }, [question, setAnswerSelected, setAnswers]);

  const setAsSelectedIfNotSelected = (answer:string) =>{
    if(answerSelected !== '' ) return;
    setAnswerSelected(answer);
    if (answer === question.correct_answer) {
      incrementScore();
    }
  }

  return (
     <Panel className="w-full">
        <header className="mb-4">
          <Badge>{question.category}</Badge>
          <Badge variant="secondary">{question.difficulty}</Badge>
        </header>
        
        <h2 className="text-xl font-bold">{he.decode(question.question)}</h2>
        {answers.map((answer) => {
          let answerClasses = "p-2 text-center border my-4 rounded";
          const isCorrect = question.correct_answer === answer;
          const isSelected = answer === answerSelected;

          if(answerSelected === ''){
            answerClasses += " cursor-pointer";
          }

          if(answerSelected && isCorrect){
            answerClasses += " bg-green-300 text-white";
          }else if(isSelected && !isCorrect){
            answerClasses += " bg-red-300 text-white";
          }

          return <div 
            className={answerClasses} 
            key={answer}
            onClick={() => setAsSelectedIfNotSelected(answer)}
            >
            <p>{he.decode(answer)}</p>
          </div>
        })}
      </Panel>
  )
}