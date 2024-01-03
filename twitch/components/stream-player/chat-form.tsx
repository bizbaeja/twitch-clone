"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ChatInfo } from "./chat-info";

interface ChatFormProps {
    onSubmit: ()=> void;
    value: string;
    onChange: (value: string) => void;
    isHidden: boolean;
    isFollowersOnly: boolean;
    isDelayed: boolean;
    isFollowing: boolean;
}

export const ChatForm = ({
isHidden,
isFollowersOnly,
isDelayed,
isFollowing,
value,
onChange,
onSubmit,
}:ChatFormProps) => {
    const [isDelayBlocked, setIsDelayBlocked] = useState(false);

    const isFollowersOnlyAndNotFollowing = isFollowersOnly && !isFollowing;
    const isDisabled = isHidden || isDelayBlocked || isFollowersOnlyAndNotFollowing;

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // 이벤트 버블링을 막는다.(이 폼이 다른 부모 요소를 갖고 있을 떄, 제풀 이벤트가 부모로 전파되지 않는다.)
        // 폼이 제출되면, 보통 페이지가 다시 로드되기 때문이다. 
        e.stopPropagation();
        
        if(!value || isDisabled) return;
        
        if(isDelayed && !isDelayBlocked  ) {
            setIsDelayBlocked(true);
            setTimeout(()=>{
                setIsDelayBlocked(false);
                onSubmit();
            }, 3000);
        } else {
            onSubmit();
        
        }
    }
    if(isHidden) return null;

    return(
        <form 
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-y-4 p-3">
            <div className="w-full">
            <ChatInfo 
            isDelayed={isDelayed}
            isFollowersOnly={isFollowersOnly}
            />
            <Input 
             onChange={(e)=>onChange(e.target.value)}
             value={value}
             disabled={isDisabled}
             placeholder="메시지를 입력하세요"
             className={cn("border-white/10", isFollowersOnly || isDelayed &&"rounded-t-none border-t-0")}
            />
            </div>
            <div className="ml-auto">
                <Button
                type="submit"
                variant="primary"
                size="sm"
                disabled={false}
                >
                   보내기
                </Button>
            </div>
        </form>
    )
}

export const ChatFormSkeleton = () => {
    return(
        <div className="flex flex-col items-center gap-y-4 p-3">
      <Skeleton className="w-full h-10" />
      <div className="flex items-center gap-x-2 ml-auto">
        <Skeleton className="h-7 w-7" />
        <Skeleton className="h-7 w-12" />
      </div>
    </div>
    )
}