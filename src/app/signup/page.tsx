import WithAuth from "@/components/ui/WithAuth";
import SignUpForm from "@/components/ui/SignUpForm";

export default function SignUpPage() {
  return (
    <WithAuth>
      <SignUpForm />
    </WithAuth>
  );
}
