import { useEffect } from "react";
import { useQuizzStateStore } from "@/store/useQuizzStateStore";
import { Clock8 } from "lucide-react";
export default function CountDown(){
  const {completed, setCompleted,  time, setTime} =useQuizzStateStore();

  useEffect(() => {
    if (time <= 0){
      setCompleted(true)
      return;
    };
    // If quizz completed stop the counter
    if (completed) return;

    const interval = setInterval(() => {
      setTime(time - 1);
    }, 1000);

    return () => clearInterval(interval);

  }, [time, setTime, completed, setCompleted]);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  
  return <div className="flex items-center">
    <Clock8 className="text-red-300"/>
    <p className="px-1 text-2xl font-bold text-red-300">{minutes}:{seconds.toString().padStart(2, "0")}</p>
  </div>
}