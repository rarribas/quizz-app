import QuizzConfigForm from "@/components/ui/QuizzConfigForm"
import { fetchCategories } from "@/app/actions/quizz-actions";
import Error from "./ui/Error";

export default async function ConfigurationLoader(){
  try{
    const categories = await fetchCategories();

    return (
      <div className="w-screen h-screen bg-purple-100">
        <QuizzConfigForm categories={categories}/>
      </div>
    )

  }catch(error:unknown){
    let errorMessage:string = '';
    if (error && typeof error === "object" && "message" in error) {
      errorMessage = error.message as string;
    }else{
      errorMessage = "Unknown error occurred"
    }
    return <Error errorMessage={errorMessage}/>
  }
}