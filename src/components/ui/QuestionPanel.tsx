
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

  console.log(questions);

  return (
    <div className="flex flex-col w-3/5 mx-auto my-0">
       <Panel className="w-full">
        <header className="mb-4">
          <Badge>{questions[questionIndex].category}</Badge>
          <Badge variant="secondary">{questions[questionIndex].difficulty}</Badge>
        </header>
        
        <h2 className="text-xl font-bold">{he.decode(questions[questionIndex].question)}</h2>
        {answers.map((answer) => {
          return <div className="p-2 text-center border my-4 rounded" key={answer}>
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
        <Button size="sm">Select an answer to continue</Button>
      </div>
    </div>
  )
}

export type {QuestionI};