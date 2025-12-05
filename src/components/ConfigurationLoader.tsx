import QuizzConfigForm from "@/components/ui/QuizzConfigForm"
import { fetchCategories } from "@/app/actions/quizz-actions";
import Error from "./ui/Error";

export default async function ConfigurationLoader(){
  const {categories, error} = await fetchCategories();

  if(error){
    return <Error errorMessage={error}/>
  }

  return (
    <div className="w-screen h-screen bg-purple-100">
      <QuizzConfigForm categories={categories}/>
    </div>
  )
}