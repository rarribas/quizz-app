'use client'
import Panel from "./panel";
import Header from "./header";
import QuizzDetails from "./QuizzDetails";
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
import { useQuizzCategoriesStore, DifficultyKey, type QuizzCategoriesI } from "@/store/useQuizzCategoriesStore";
import { useQuizzConfigStore } from "@/store/useQuizzConfigStore";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
type ErrorField = 'category' | 'difficulty';
type QuizzConfigFormProps = {
  categories: QuizzCategoriesI[];
};
export default function QuizzConfigForm({categories}:QuizzConfigFormProps){
  const {difficulty, setCategories} = useQuizzCategoriesStore();
  const {configuration, setConfiguration} = useQuizzConfigStore();
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyKey | "">("");
  const [errors, setErrors] = useState<Record<ErrorField,string>>({
    category: '',
    difficulty: ''
  });
  const router = useRouter();

  useEffect(() => {
    if(configuration?.done){
       return router.replace("/quizz/start");
    }

    setCategories(categories);
  },[categories, setCategories, configuration, router]);

  if(configuration?.done) return null; 

  const onFormSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const newErrors: Record<ErrorField,string> = {
      category: '',
      difficulty: '',  
    };

    if (!selectedCategory){
      newErrors.category = "Please select a category";
    }

    if (!selectedDifficulty){
      newErrors.difficulty = "Please select difficulty";
    }

    if(newErrors.category || newErrors.difficulty){
      return setErrors(newErrors);
    }
    
    setConfiguration({
      category: selectedCategory, 
      difficulty: selectedDifficulty, 
      done: true
    })
  }

  const onChangeDifficulty = (value:DifficultyKey) =>{
    if(errors.difficulty){
      setErrors({...errors, difficulty: ''})
    }

    setSelectedDifficulty(value)
  }

  const onChangeCategory = (value:string) =>{
    if(errors.category){
      setErrors({...errors, category: ''})
    }

    setSelectedCategory(value)
  }

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
        <form 
          onSubmit={onFormSubmit}
          data-testid="quizz-config-form"
        >
          <div>
            <Label 
              className="mb-3 font-semibold" 
              htmlFor="category">
                Category:
            </Label>
            <Select 
              value={selectedCategory} 
              onValueChange={onChangeCategory}
            >
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
            {errors.category && <p className="mb-3 text-red-400">{errors.category}</p>}
          </div>
          <div>
            <Label 
              className="mb-3 font-semibold" 
              htmlFor="difficulty">
                Difficulty:
            </Label>
            <Select 
              value={selectedDifficulty}
              onValueChange={onChangeDifficulty}
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
            {errors.difficulty && <p className="mb-3 text-red-400">{errors.difficulty}</p>}
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
