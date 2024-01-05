"use client"

import { onUnBlock } from "@/actions/block";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { toast } from "sonner";

interface UnblockButtonProps {
    userId: string;
}

export const UnblockButton = ({userId}: UnblockButtonProps) => {
    const [isPending, startTransition] = useTransition();
    const onClick = () => {
        startTransition(()=>{
            onUnBlock(userId)
            .then((result)=>toast.success(`${result.blocked.username}님의 차단이 해제되었습니다.`))
            .catch(()=>toast.error("차단 해제 중 오류가 발생했습니다"))
        })
    }
    return(
        <Button className="text-blue-500 w-full"
        disabled={isPending}
        onClick={onClick}   
        variant="link"
        size="sm"
        >차단 해제</Button>
    )
}