'use client';
import SignUpForm from "./SignUpForm";
import { SessionProvider } from "next-auth/react";
export default function Home() {

  return (
    <SessionProvider>
      <SignUpForm />
    </SessionProvider>
  );
}