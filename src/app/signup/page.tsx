import WithAuth from "@/components/WithAuth";
import SignUpForm from "@/components/ui/SignUpForm";

export default function SignUpPage() {
  return (
    <div className=" w-screen h-screen bg-[#f0fdf4]">
      <WithAuth>
        <SignUpForm />
      </WithAuth>
    </div>
  );
}
