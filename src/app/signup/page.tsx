import WithAuth from "@/components/WithAuth";
import SignUpForm from "@/components/ui/SignUpForm";

export default function SignUpPage() {
  return (
    <WithAuth>
      <SignUpForm />
    </WithAuth>
  );
}
