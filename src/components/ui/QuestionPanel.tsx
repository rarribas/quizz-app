
'use client'

import { useState, useEffect } from "react"
import Panel from "./panel"
import { Badge } from "./badge"
import he from "he";
import { Button } from "./button";

interface QuestionI {
  type: string,
  difficulty: string,
  category: string,
  question: string,
  correct_answer: string,
  incorrect_answers: string[],
}

export default function QuestionPanel({questions}:{ questions: QuestionI[]}){
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<string[]>([])
  const [itemSelected, setItemSelected] = useState<string>('')

  const suffleArray = <T,>(array: T[]): T[] => {
    return array
      .map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  };

  useEffect(() => {
      const shuffledAnswers = suffleArray([
        questions[questionIndex].correct_answer,
        ...questions[questionIndex].incorrect_answers,
      ]);
      setAnswers(shuffledAnswers);
  }, [questionIndex, questions]);

  const setAsSelectedIfNotSelected = (answer:string) =>{
    if(itemSelected !== '' ) return;
    setItemSelected(answer);
  }

  return (
    <div className="flex flex-col w-3/5 mx-auto my-0">
       <Panel className="w-full">
        <header className="mb-4">
          <Badge>{questions[questionIndex].category}</Badge>
          <Badge variant="secondary">{questions[questionIndex].difficulty}</Badge>
        </header>
        
        <h2 className="text-xl font-bold">{he.decode(questions[questionIndex].question)}</h2>
        {answers.map((answer) => {
          let answerClasses = "p-2 text-center border my-4 rounded";
          const isCorrect = questions[questionIndex].correct_answer === answer;
          const isSelected = answer === itemSelected;

          console.log(itemSelected, itemSelected === '', "HELLO")

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
      <div className="flex m-4 justify-between">
        <Button 
          size="sm"
          disabled={questionIndex === 0}
        >
          Previous
        </Button>
        {itemSelected === '' ? 
          <Button size="sm" disabled={true}>Select an answer to continue</Button> : 
          <Button size="sm">Next</Button>
        }
        
      </div>
    </div>
  )
}

export type {QuestionI};