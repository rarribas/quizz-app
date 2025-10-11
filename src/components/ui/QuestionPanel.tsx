'use client'

// import { useEffect, useState } from "react"
import Panel from "./panel"
import { Badge } from "./badge"
import { useQuizzStateStore} from "@/store/useQuizzStateStore";
import { useQuizzCategoriesStore } from "@/store/useQuizzCategoriesStore";
import {type ModifiedQuestionI, AnswerI} from "@/types/question";
import { cn } from "@/lib/utils"

interface QuestionPanelProps {
  question: ModifiedQuestionI,
  className?: string,
  showCorrectAnswers?: boolean,
}

export default function QuestionPanel({question, className, showCorrectAnswers}:QuestionPanelProps ) {

  const {questions, setQuestions} =  useQuizzStateStore();
  const {difficulty} = useQuizzCategoriesStore();

  const setAsSelectedIfNotSelected = (answer:AnswerI) =>{
    if (showCorrectAnswers) return;

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
     <Panel className={cn("w-full", className)}>
        <header className="mb-4 flex gap-2">
          <Badge>{question.category}</Badge>
          <Badge variant="secondary">{difficulty[question.difficulty]}</Badge>
        </header>
        
        <h2 className="text-xl font-bold">{question.title}</h2>
        {question.answers.map((answer) => {
          const hasSelectedAnswer = question.answers.some(a => a.selected);
          const answerClasses = cn(
            "p-2 text-center border my-4 rounded transition-colors",
            {
              // During answering phase
              "cursor-pointer hover:bg-gray-100": !showCorrectAnswers,
              "bg-gray-300": !showCorrectAnswers && answer.selected,

              // No answer selected: show correct ones green, others gray
              "bg-green-200": showCorrectAnswers && !hasSelectedAnswer && answer.correct,
              "bg-gray-200": showCorrectAnswers && !hasSelectedAnswer && !answer.correct,
              
              // Answer selected: usual behavior
              "bg-green-300": showCorrectAnswers && hasSelectedAnswer && answer.correct,
              "bg-red-300": showCorrectAnswers && hasSelectedAnswer && answer.selected && !answer.correct,
              "bg-gray-100": showCorrectAnswers && hasSelectedAnswer && !answer.correct && !answer.selected,
            }
          )

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