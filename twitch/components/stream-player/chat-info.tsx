import { useMemo } from "react";
import { Info } from "lucide-react";

import { Hint } from "@/components/hint";

interface ChatInfoProps {
  isDelayed: boolean;
  isFollowersOnly: boolean;
};

export const ChatInfo = ({
    isDelayed,
    isFollowersOnly,
}:ChatInfoProps
) => {
const label = useMemo(() => {
    if(isFollowersOnly){
        return "팔로워만 채팅을 보낼 수 있습니다.";
    }
    if(isDelayed && !isFollowersOnly){
        return "채팅이 지연될 수 있습니다.";
    }
    if(isDelayed && isFollowersOnly){
        return "팔로워만 채팅을 보낼 수 있고, 채팅이 지연될 수 있습니다.";
    }
    return "";
}, [isDelayed, isFollowersOnly]);
if(!isDelayed && !isFollowersOnly) return null;
    return(
        <div className="p-2 text-muted-foreground bg-white/5 border
        border-white/10 w-full rounded-t-md flex items-center gap-x-2">

            <Hint label={label} asChild>
                <Info className="h-4 w-4" />
            </Hint>
           <p className="text-xs font-semibold">
                {label}
           </p>
        </div>
    )
}

