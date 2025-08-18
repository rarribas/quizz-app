import LoginForm from "@/components/ui/LoginForm";
import WithAuth from "@/components/WithAuth";

export default function Home() {
  return (
    <div className=" w-screen h-screen bg-[#e0e7ff]">
      <WithAuth>
        <LoginForm />
      </WithAuth>
    </div>
  );
}
