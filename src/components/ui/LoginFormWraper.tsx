'use client';

import LoginForm from "@/components/ui/LoginForm";
import { SessionProvider } from "next-auth/react";
export default function Home() {

  return (
    <SessionProvider>
      <LoginForm />
    </SessionProvider>
  );
}