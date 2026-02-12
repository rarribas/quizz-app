import { Suspense } from "react";
import SignUpForm from "@/components/ui/SignUpForm";
import Loading from "@/components/ui/Loading";

export default function SignUpPage() {
  return (
    <div className=" w-screen h-screen bg-[#f0fdf4]">
      <Suspense fallback={<Loading/>}>
        <SignUpForm />
      </Suspense>
    </div>
  );
}
