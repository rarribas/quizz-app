'use client'

// import { useEffect, useState } from "react"
import Panel from "./panel"
import { Badge } from "./badge"
import { useQuizzStateStore} from "@/store/useQuizzStateStore";
import {type ModifiedQuestionI, AnswerI} from "@/types/question";

interface QuestionPanelProps {
  question: ModifiedQuestionI
}

export default function QuestionPanel({question}:QuestionPanelProps ) {

  const {questions, setQuestions} =  useQuizzStateStore();

  const setAsSelectedIfNotSelected = (answer:AnswerI) =>{
    const updatedAnswers = question.answers.map((a) => {
      // If this was the previously selected one → deselect it
      if (a.selected) {
        return { ...a, selected: false };
      }

      // If this is the clicked one → select it
      if (a.id === answer.id) {
        return { ...a, selected: true };
      }

      // Everything else stays the same
      return a;
    });

    const modifiedQ:ModifiedQuestionI = {
      ...question,
      answers: updatedAnswers
    }

    const updatedQuestions = questions.map((q) =>
      q.title === question.title ? modifiedQ : q
    );

    setQuestions(updatedQuestions);
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