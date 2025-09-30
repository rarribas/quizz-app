'use client'
import Panel from "@/components/ui/panel";
import Header from "@/components/ui/header";
import { Button } from "@/components/ui/button";

type ErrorProps = {
  errorMessage: string;
};

export default function Error({ errorMessage }: ErrorProps) {
  return (
    <Panel className="fixed w-[30%] top-[50%] translate-y-[-50%]">
      <Header title="Error!" desc={errorMessage} />
      <div className="mt-4 flex justify-center">
        <Button
          variant="destructive"
          onClick={() => window.location.reload()}
        >
          Hard Refresh
        </Button>
      </div>
    </Panel>
  );
}