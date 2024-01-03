import { Button } from "@/components/ui/button"
import Link  from "next/link"

const NotFoundPage = () => {
    return(
        <div className="h-full flex flex-col space-y-4 items-center justify-center text-muted-foreground">
            <h1 className="text-4xl">404</h1>
            <p>
                유저를 찾을 수 없습니다.
            </p>
            <Button variant="secondary" asChild>
                <Link  href="/">
                    홈으로 돌아가기
                </Link>
            </Button>
        </div>
    )
}

export  default NotFoundPage;