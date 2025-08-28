// TODO: This is just temporary until I move this to a different component
'use client'
import { useQuizzConfigStore } from "@/store/useQuizzConfigStore"
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function QuizzStart(){
  const {configuration} = useQuizzConfigStore();
  const router = useRouter();

  useEffect(() =>{
    if(!configuration || !configuration.done){
      router.replace("/quizz");
    }

  },[configuration, router])

  if(!configuration || !configuration.done) return null;

  return (
    <div className="m-4">
      <h1>Start Quizz</h1>
      <p>Difficulty: {configuration.difficulty}</p>
      <p>Category: {configuration.category}</p>
    </div>
  )
}