'use client'

import Panel from "./panel";
import Header from "./header";
import QuizzDetails from "./QuizzDetails";
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
import { ChevronRight } from "lucide-react";
import { useQuizzCategoriesStore, DifficultyKey } from "@/store/useQuizzCategoriesStore";
import { useEffect, useState } from "react";

type ErrorField = 'category' | 'difficulty';

export default function QuizzConfigForm(){
  const {categories, difficulty, loading, fetchCategories} = useQuizzCategoriesStore();
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyKey | "">("");
  const [errors, setErrors] = useState<ErrorField[]>([]);

  useEffect(() => {
    fetchCategories()
  },[fetchCategories]);

  if(loading) return <Loading/>

  const onFormSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const newErrors: ErrorField[] = [];

    if (!selectedCategory) newErrors.push('category');
    if (!selectedDifficulty) newErrors.push('difficulty');

    setErrors(newErrors);
    return;
    // TODO - Implement this
  }

  const selectedCategoryObj = categories.find(cat => cat.id === selectedCategory);

  return(
    <div className="pt-6">
      <Header 
        title="Quizz Setup" 
        desc="Configure your quizz preferences"
      />
      <Panel className="w-[50%]">
        <header className="mb-6">
          <h5 className="pb-2 font-semibold ">
            <ChevronRight className="inline middle"/>
            Quizz Configuration:
          </h5>
          <p>Select you preferred category and difficulty. You&apos;ll have 2 minutes to complete 10 multiple choice questions.</p>
        </header>
        <form onSubmit={onFormSubmit}>
          <div>
            <Label 
              className="mb-3 font-semibold" 
              htmlFor="category">
                Category:
            </Label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full mb-3">
                <SelectValue placeholder="Insert Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={String(category.id)}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.includes('category') && <p className="mb-3 text-red-400">Please introduce a category</p>}
          </div>
          <div>
            <Label 
              className="mb-3 font-semibold" 
              htmlFor="difficulty">
                Difficulty:
            </Label>
            <Select 
              value={selectedDifficulty}
              onValueChange={(value) => setSelectedDifficulty(value as DifficultyKey)}
            >
              <SelectTrigger className="w-[100%] mb-3">
                <SelectValue id="difficulty" placeholder="Select Difficulty"/>
              </SelectTrigger>
              <SelectContent>
                {Object.entries(difficulty).map(([key, label]) => {
                  return <SelectItem key={label} value={key}>{label}</SelectItem>
                })}
              </SelectContent>
            </Select>
            {errors.includes('difficulty') && <p className="mb-3 text-red-400">Please introduce a difficulty</p>}
          </div>
          <QuizzDetails/>
          <div>
            <Button 
              type='submit'
              className="bg-purple-600">
                Start Quizz
            </Button>
          </div>
        </form>
      </Panel>
    </div>
  )
}
