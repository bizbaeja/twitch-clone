"use client";

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

    
    return(<div>
        <h1>Stream Player</h1>
    </div>)
}