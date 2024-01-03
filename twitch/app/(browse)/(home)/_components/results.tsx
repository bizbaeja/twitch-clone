import { getStreams } from "@/lib/feed-service";
import { ResultCard, ResultCardSkeleton } from "./result-card";
import { Skeleton } from "@/components/ui/skeleton";


export const  Results = async () => {
    const data = await getStreams();
    return (
        <div>
            <h2 className="text-lg font-semibold mb-4">
            추천 스트림
            </h2>
            {data.length === 0 && (
                <div className="text-muted-foreground text-sm">
                    추천 스트림이 없습니다.
                </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2lx:grid-cols-5 gap-4">
               {data.map((result)=>(
                <ResultCard
                 key={result.id}
                 data={result}
                />
               ))}
            </div>
        </div>
    )
}

export const ResultsSkeleton = () => {
 return(
    <div>
        <Skeleton className="h-8 w-[290px] mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2lx:grid-cols-5 gap-4">
           {[...Array(4).map((_, i)=>(
            <ResultCardSkeleton key={i}/>
           ))]}
        </div>
    </div>
 )
};