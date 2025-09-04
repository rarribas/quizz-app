'use client'
import React, {useActionState, useEffect, useMemo} from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Loading from "./Loading";
import Panel from "@/components/ui/panel";
import Header from "@/components/ui/header";
import { signup } from "@/app/actions/auth-actions";
import { signIn, useSession } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import {MailIcon, LockIcon} from "lucide-react";
import { WithAuth } from "@/components/WithAuth";

const SignUpForm = () => {
  const [formState, formAction, isPending] = useActionState(signup, {errors:{}})
  const searchParams = useSearchParams();
  const logInError = searchParams.get("error");
  const { status } = useSession();
  const router = useRouter();
  const mergedErrors = useMemo(() => {
    if (logInError === "CredentialsSignin") {
      return { ...formState.errors, email: "Invalid email or password" };
    }
    return formState.errors;
  }, [formState.errors, logInError]);

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/quizz");
    }

    if (formState?.success) {
      signIn("credentials", {
        email: formState.credentials?.email,
        password: formState.credentials?.password,
        redirect: true,
        callbackUrl: "/quizz",
      })
    }

  }, [formState, router, status]);


  if (status === "loading") return <Loading/>;
  if (status === "authenticated") return null;

  return (
    <Panel className="fixed w-[30%] top-[50%] translate-y-[-50%]">
      <Header title="Welcome!" desc="Please create your account."/>
      <form
        data-testid="submit-form"
        action={formAction}
      >
        <div>
          <Label 
            className="mb-3 font-semibold" 
            htmlFor="email">
              <MailIcon size={14} className="inline" />
              Email:
          </Label>
          <Input 
            type='email' 
            name='email'
            id='email'
            placeholder="Insert your email"
            disabled={isPending}
            className="mb-3"
          />
        </div>
        <div>
          <Label 
            className="mb-3 font-semibold" 
            htmlFor="password">
              <LockIcon size={14} className="inline" />
              Password:
          </Label>
          <Input 
            type='password'
            name='password'
            id='password' 
            placeholder="Insert your password"
            disabled={isPending}
            className="mb-3"
          />
        </div>
        {mergedErrors && Object.keys(mergedErrors).length > 0 && (
          <ul data-testid="error-list" className="text-red-500 mb-3">
            {Object.entries(mergedErrors).map(([field, message]) => (
              <li key={field}>{message}</li>
            ))}
          </ul>
        )}
        <div>
          <Button 
            data-testid="button-signup" 
            disabled={isPending}
            type='submit'>
              {isPending ? "Processing ..." : "Submit"}
          </Button>
        </div>
      </form>
    </Panel>
  )
}

export const RawSignUpForm = SignUpForm; //For testing
export default WithAuth(SignUpForm);