"use client";

import { useViewerToken } from "@/hooks/use-viewer-token";
import { Stream, User} from "@prisma/client";

interface StreamPlayerProps {
    user: User & { stream: Stream | null };
    stream: Stream;
    isFollowing: boolean;
}
;
export const StreamPlayer = ({
    user,
    stream,
    isFollowing,
}:StreamPlayerProps) => {
  const {
    token,
    name,
    identity,
  } = useViewerToken(user.id);
    
  if(!token || !name || !identity){
    return(<div>
        <h1>스트림을 볼 수 없습니다.</h1>
    </div>)
  }

    return(<div>
        <h1>스트림을 볼 수 있습니다.</h1>
    </div>)
}