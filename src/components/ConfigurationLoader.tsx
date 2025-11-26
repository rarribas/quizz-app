import QuizzConfigForm from "@/components/ui/QuizzConfigForm"
import { fetchCategories } from "@/app/actions/quizz-actions";
export default async function ConfigurationLoader(){
  const categories = await fetchCategories();

  return (
    <div className="w-screen h-screen bg-purple-100">
      <QuizzConfigForm categories={categories}/>
    </div>
  )
}