'use client'

import { useState, useEffect } from "react"
import Panel from "./panel"
import { Badge } from "./badge"
import he from "he";

interface QuestionI {
  type: string,
  difficulty: string,
  category: string,
  question: string,
  correct_answer: string,
  incorrect_answers: string[],
}

interface QuestionPanelProps {
  question: QuestionI
  afterItemSelected: (hasCorrectAnswer:boolean) => void
}

export default function QuestionPanel({question, afterItemSelected}:QuestionPanelProps ) {
  const [answers, setAnswers] = useState<string[]>([]);
  const [itemSelected, setItemSelected] = useState<string>('')

  const suffleArray = <T,>(array: T[]): T[] => {
    return array
      .map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  };

  useEffect(() => {
      const shuffledAnswers = suffleArray([
        question.correct_answer,
        ...question.incorrect_answers,
      ]);
      setAnswers(shuffledAnswers);
      // Reset selection for new question
      setItemSelected('');
  }, [question]);

  const setAsSelectedIfNotSelected = (answer:string) =>{
    if(itemSelected !== '' ) return;
    setItemSelected(answer);
    afterItemSelected(answer === question.correct_answer);
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
          const isSelected = answer === itemSelected;

          if(itemSelected === ''){
            answerClasses += " cursor-pointer";
          }

          if(itemSelected && isCorrect){
            answerClasses += " bg-green-300 text-white";
          }else if(isSelected && !isCorrect){
            answerClasses += " bg-red-300 text-white";
          }

          return <div 
            className={answerClasses} 
            key={answer}
            onClick={() => setAsSelectedIfNotSelected(answer)}>
            <p>{he.decode(answer)}</p>
          </div>
        })}
      </Panel>
  )
}

export type {QuestionI};