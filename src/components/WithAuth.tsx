'use client';

import { SessionProvider } from "next-auth/react";
import { ComponentType } from "react";

export function WithAuth<P extends object>(Component: ComponentType<P>) {
  return function AuthenticatedComponent(props: P) {
    return (
      <SessionProvider>
        <Component {...props} />
      </SessionProvider>
    );
  };
}