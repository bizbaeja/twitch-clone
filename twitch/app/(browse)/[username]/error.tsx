"use client";

import { Button } from "@/components/ui/button"
import Link  from "next/link"

const ErrorPage = () => {
    return(
        <div className="h-full flex flex-col space-y-4 items-center justify-center text-muted-foreground">
            
            <p>
                에러가 발생했습니다. 
            </p>
            <Button variant="secondary" asChild>
                <Link  href="/">
                    홈으로 돌아가기
                </Link>
            </Button>
        </div>
    )
}
export default ErrorPage;