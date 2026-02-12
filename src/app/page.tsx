import { Suspense } from "react";
import LoginForm from "@/components/ui/LoginForm";
import Loading from "@/components/ui/Loading";

export default function Home() {
  return (
    <div className=" w-screen h-screen bg-[#e0e7ff]">
      <Suspense fallback={<Loading/>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
