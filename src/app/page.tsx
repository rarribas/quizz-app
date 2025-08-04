'use client'
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Panel from "@/components/ui/panel";
import Header from "@/components/ui/header";
import { useActionState } from "react";
import { signup } from "./actions/auth-actions";

export default function Home() {
  const [formState, formAction] = useActionState(signup, {})

  return (
    <Panel className="fixed w-[30%] top-[50%] translate-y-[-50%]">
      <Header title="Welcome Back!" desc="Sign in to continue your quizz journey"/>
      <form action={formAction}>
        <div>
          <Label className="mb-3">Email:</Label>
          <Input 
            type='email' 
            name='email'
            id='email'
            placeholder="Insert Your email"
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
            className="mb-3"
          />
        </div>
        {formState.errors && (<ul>
          {Object.keys(formState.errors).map((error) => (
            <li key={error}>{formState.errors?.[error as keyof typeof formState.errors]}</li>
          ))}
        </ul>)}
        <div>
          <Button type='submit'>Submit</Button>
        </div>
      </form>
    </Panel>
  );
}
