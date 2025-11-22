'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuizzStateStore } from "@/store/useQuizzStateStore";
import { ComponentType } from "react";

export function WithCompletitionRedirect<P extends object>(Component: ComponentType<P>, redirectTo: string) {
  return function WithRedirect(props: P) {
    const router = useRouter();
    const { completed } = useQuizzStateStore();
    
    useEffect(() => {
      if (!completed) {
        router.replace(redirectTo);
      }
    }, [completed, router]);

    return (
      <Component {...props} />
    );
  };
}