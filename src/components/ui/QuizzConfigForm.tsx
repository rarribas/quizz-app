'use client'

import Panel from "./panel";
import Header from "./header";
import Loading from "./Loading";
import { Button } from "./button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useQuizzCategoriesStore } from "@/store/useQuizzCategoriesStore";
import { useEffect } from "react";
export default function QuizzConfigForm(){
  const {categories, difficulty, loading, fetchCategories} = useQuizzCategoriesStore();
  
  useEffect(() => {
    fetchCategories()
  },[fetchCategories]);

  if(loading) return <Loading/>

  const onFormSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    // TODO - Implement this
  }

  return(
    <div className="mt-6">
      <Header title="Quizz Setup" desc="Configure your quizz preferences"/>
      <Panel className="w-[50%]">
        <header className="mb-6">
          <h5 className="font-semibold">Quizz Configuration:</h5>
          <p>Select you preferred category and difficulty. You&apos;ll have 2 minutes to complete 10 multiple choice questions.</p>
        </header>
        <form onSubmit={onFormSubmit}>
          <div>
            <Label 
              className="mb-3 font-semibold" 
              htmlFor="category">
                Category:
            </Label>
            <Select>
              <SelectTrigger className="w-[100%] mb-3">
                <SelectValue id="category" placeholder="Insert Category"></SelectValue>
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => {
                  return <SelectItem key={category.name} value={category.id}>{category.name}</SelectItem>
                })}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label 
              className="mb-3 font-semibold" 
              htmlFor="difficulty">
                Difficulty:
            </Label>
            <Select>
              <SelectTrigger className="w-[100%] mb-3">
                <SelectValue id="difficulty" placeholder="Select Difficulty"></SelectValue>
              </SelectTrigger>
              <SelectContent>
                {difficulty.map((diffItem) => {
                  return <SelectItem key={diffItem} value={diffItem}>{diffItem}</SelectItem>
                })}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Button 
              type='submit'>
                Start Quizz
            </Button>
          </div>
        </form>
      </Panel>
    </div>
  )
}
