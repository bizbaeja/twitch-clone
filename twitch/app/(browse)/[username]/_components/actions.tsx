"use client"

import { useTransition } from "react";
import { Button } from "@/components/ui/button"
import { onFollow } from "@/actions/follow";
import { toast } from "sonner"
interface ActionsProps {
    isFollowing: boolean;

}
export const Actions = ({
    isFollowing
    ,
}: ActionsProps) => {
    const [isPending, startTransition] = useTransition();

    const onClick = () => {
        startTransition(() => {
            onFollow("123")
            .then(()=>toast.success("유저를 팔로우했습니다."))
            .catch(()=>toast.error("유저를 팔로우하지 못했습니다."))
        })
    }

    return (
        // Follow 버튼이 클릭되었을 때, onFollow 함수가 지연되어서, 사용자가 버튼을 클릭해도 버튼이 활성화되지 않는다.
        // 이는 리액트가 동시 모드에서 렌더링할때 일부 작업을 지연시키는데 도움이 된다. 리액트 애플리케이션이 더 많은 우선순위가 높은 작업에 중단되지 않고 계속 진행될 수 있도록 하는 모드이다.
        <Button 
        disabled={isPending || isFollowing} 
        onClick={onClick} 
        variant="primary">
            Follow
        </Button>
    );
};