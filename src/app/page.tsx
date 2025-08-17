import LoginForm from "@/components/ui/LoginForm";
import WithAuth from "@/components/ui/WithAuth";

export default function Home() {
  return (
    <WithAuth>
      <LoginForm />
    </WithAuth>
  );
}
