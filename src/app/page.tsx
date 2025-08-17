import LoginForm from "@/components/ui/LoginForm";
import WithAuth from "@/components/WithAuth";

export default function Home() {
  return (
    <WithAuth>
      <LoginForm />
    </WithAuth>
  );
}
