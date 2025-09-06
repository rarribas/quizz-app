
'use client'

import { useState } from "react"
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

  const suffleArray = <T,>(array: T[]): T[] => {
    return array
      .map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  };

  const answers = suffleArray([
    questions[questionIndex].correct_answer,
    ...questions[questionIndex].incorrect_answers,
  ]);

  return (
    <div className="flex flex-col w-3/5 mx-auto my-0">
       <Panel className="w-full">
        <header>
          <Badge variant="secondary">{questions[questionIndex].category}</Badge>
          <Badge>{questions[questionIndex].difficulty}</Badge>
        </header>
        
        <h2>{he.decode(questions[questionIndex].question)}</h2>
        {answers.map((answer) => {
          return <p key={answer}>{he.decode(answer)}</p>
        })}
      </Panel>
      <div className="flex m-4 justify-between">
        <Button 
          size="sm"
          disabled={questionIndex === 0}
        >
          Previous
        </Button>
        <Button size="sm">Select an answer to continue</Button>
      </div>
    </div>
  )
}

export type {QuestionI};