'use client'
import React, {useActionState, useEffect, useState} from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Panel from "@/components/ui/panel";
import Header from "@/components/ui/header";
import { signup } from "@/app/actions/auth-actions";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

export default function SignUpForm() {
  const [formState, formAction] = useActionState(signup, {errors:{}})
  const [processing, setProcessing] = useState(false);

  const searchParams = useSearchParams();
  const logInError = searchParams.get("error");
  const errors = formState.errors;

  if (logInError && logInError === "CredentialsSignin") {
    formState.errors = { email: "Invalid email or password" };
  }

  useEffect(() => {
    if (formState?.success) {
      signIn("credentials", {
        email: formState.credentials?.email,
        password: formState.credentials?.password,
        redirect: true,
        callbackUrl: "/quizz",
      })
    }

    if(formState?.errors){
      setProcessing(false);
    }
  }, [formState]);

  return (
    <Panel className="fixed w-[30%] top-[50%] translate-y-[-50%]">
      <Header title="Welcome!" desc="Please create your account."/>
      <form action={(formData) => {
        setProcessing(true);
        formAction(formData);
      }}>
        <div>
          <Label className="mb-3">Email:</Label>
          <Input 
            type='email' 
            name='email'
            id='email'
            placeholder="Insert your email"
            disabled={processing}
            className="mb-3"
          />
        </div>
        <div>
          <Label className="mb-3">Password:</Label>
          <Input 
            type='password'
            name='password'
            id='password' 
            placeholder="Insert your password"
            disabled={processing}
            className="mb-3"
          />
        </div>
        {errors && Object.keys(errors).length > 0 && (<ul>
          {Object.keys(errors).map((error) => (
            <li key={error}>{formState.errors?.[error as keyof typeof formState.errors]}</li>
          ))}
        </ul>)}
        <div>
          <Button 
            disabled={processing}
            type='submit'>
              {processing ? "Processing ..." : "Submit"}
          </Button>
        </div>
      </form>
    </Panel>
  )
}