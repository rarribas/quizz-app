'use client'
import Panel from "@/components/ui/panel";
import Header from "@/components/ui/header";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

export default function SignOutPage() {
  return (
    <div className=" w-screen h-screen bg-red-50">
      <Panel className="fixed w-[30%] top-[50%] translate-y-[-50%]">
        <Header title="Good Bye!" desc="Click to sign out from the quizz. See you Soon!" />
        <div className="mt-4 flex justify-center">
          <Button
            variant="destructive"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            Sign Out
          </Button>
        </div>
      </Panel>
    </div>
  );
}
