'use client'

import { useEffect, useState } from "react"
import Panel from "./panel"
import { Badge } from "./badge"
import { useQuizzStateStore} from "@/store/useQuizzStateStore";
import {type ModifiedQuestionI, AnswerI} from "@/types/question";
import { findAnswerById } from "@/lib/quizz";

interface QuestionPanelProps {
  question: ModifiedQuestionI
}

export default function QuestionPanel({question}:QuestionPanelProps ) {
  const {incrementScore, answerSelected, setAnswerSelected} = useQuizzStateStore();

  const setAsSelectedIfNotSelected = (answer:AnswerI) =>{
    const foundAnswer = findAnswerById(question, answer.id);

    if (foundAnswer) {
      const selectedAnswer = { ...foundAnswer, selected: true };
    }
    // if(answerSelected !== '' ) return;
    // setAnswerSelected(answer);
    // if (answer === question.correct_answer) {
    //   incrementScore();
    // }
  }

  return (
     <Panel className="w-full">
        <header className="mb-4">
          <Badge>{question.category}</Badge>
          <Badge variant="secondary">{question.difficulty}</Badge>
        </header>
        
        <h2 className="text-xl font-bold">{question.title}</h2>
        {question.answers.map((answer) => {
          let answerClasses = "p-2 text-center border my-4 rounded cursor-pointer";
 

          if(answer.selected){
            answerClasses += " bg-gray-300";
          }

          return <div 
            className={answerClasses} 
            key={answer.id}
            onClick={() => setAsSelectedIfNotSelected(answer)}
            >
            <p>{answer.title}</p>
          </div>
        })}
      </Panel>
  )
}