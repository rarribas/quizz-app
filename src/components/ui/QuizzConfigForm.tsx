'use client'

import Panel from "./panel";
import Header from "./header";
import Loading from "./Loading";

import { useQuizzCategoriesStore } from "@/store/useQuizzCategoriesStore";
import { useEffect } from "react";
export default function QuizzConfigForm(){
  const {categories, loading, fetchCategories} = useQuizzCategoriesStore();
  
  useEffect(() => {
    fetchCategories()
  },[fetchCategories]);

  if(loading) return <Loading/>


  return(
    <div>
      <Header title="Quizz Setup" desc="Configure your quizz preferences"/>
      <Panel className="w-[50%]">
        <header>
          <h5>Quizz Configuration</h5>
          <p>Select you preferred category and difficulty. You&apos;ll have 2 minutes to complete 10 multiple choice questions.</p>
        </header>
      </Panel>
    </div>
  )
}
