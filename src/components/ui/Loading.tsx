import { LoaderCircle } from "lucide-react"
export default function Loading(){
  return((<div className="flex fixed w-[100%] top-[50%] translate-y-[-50%] items-center justify-center gap-[1rem]">
    <LoaderCircle size={24} className="animate-spin" />
    <p className="text-2xl">Loading...</p>
  </div>))
}