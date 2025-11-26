import { Suspense } from "react";
import ConfigurationLoader from "@/components/ConfigurationLoader";
import Loading from "@/components/ui/Loading";

export default async function Page(){
  return (
    <Suspense fallback={<Loading/>}>
      <ConfigurationLoader/>
    </Suspense>
  )
}