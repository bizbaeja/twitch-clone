"use client"

import { useTransition } from "react";
import { Button } from "@/components/ui/button"
// onFollow 는 follow-service.ts 에서 정의되어있다. 
// 고로, data 는 follow-service.ts 에서 정의된다.
import { onFollow, onUnfollow } from "@/actions/follow";
import { toast } from "sonner"
interface ActionsProps {
    isFollowing: boolean;
    userId : string;

}
export const Actions = ({
    isFollowing,
    userId
    ,
}: ActionsProps) => {
    const [isPending, startTransition] = useTransition();

    const handleFollow = () => {
        startTransition(() => {
          onFollow(userId)
            .then((data) => toast.success(`${data.following.username}님을 팔로우 했습니다 🤝`))
            .catch(() => toast.error("Something went wrong"));
        });
      };
    
      const handleUnfollow = () => {
        startTransition(() => {
          onUnfollow(userId)
            .then((data) => toast.success(`${data.following.username}님 팔로우를 취소했습니다 💔`))
            .catch(() => toast.error("Something went wrong"));
        });
      };
    

      const onClick = () => {
        if (isFollowing) {
          handleUnfollow();
        } else {
          handleFollow();
        }
      }
    return (
        // Follow 버튼이 클릭되었을 때, onFollow 함수가 지연되어서, 사용자가 버튼을 클릭해도 버튼이 활성화되지 않는다.
        // 리액트 애플리케이션이 더 많은 우선순위가 높은 작업에 중단되지 않고 계속 진행될 수 있도록 하는 모드이다.
        <Button 
        disabled={isPending} 
        onClick={onClick} 
        variant="primary">
           {isFollowing ? "Unfollow" : "Follow"}
        </Button>
    );
};