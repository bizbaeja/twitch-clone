import { Suspense } from "react";
import { Results, ResultsSkeleton } from "./_components/results";

export default function Page() {
  return (
    <div className="h-full p-8 max-2-screen-2xl mx-auto">
      <Suspense fallback={<ResultsSkeleton/>}>
      <Results />
      </Suspense>
    
    </div>
 
  )
}
