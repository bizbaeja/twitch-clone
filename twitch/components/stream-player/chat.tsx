"use client";

import { ChatVariant, useChatSidebar } from "@/store/use-chat-sidebar";
import {  useChat,useConnectionState, useRemoteParticipant } from "@livekit/components-react";
import { useMediaQuery } from "usehooks-ts";
import { ConnectionState }from "livekit-client"
import { useEffect, useMemo, useState } from "react";
import { ChatHeader, ChatHeaderSkeleton } from "./chat-header";
import { ChatForm, ChatFormSkeleton } from "./chat-form";
import { ChatList, ChatListSkeleton } from "./chat-list";
import { ChatCommunity } from "./chat-community";
interface ChatProps {
    hostName: string;
    hostIdentity: string;
    viewerName: string;
    isFollowing: boolean;
    isChatEnabled: boolean;
    isChatDelayed: boolean;
    isChatFollowersOnly: boolean;
}

export const Chat = ({
    hostName,
    hostIdentity,
    viewerName,
    isFollowing,
    isChatEnabled,
    isChatDelayed,
    isChatFollowersOnly,
}: ChatProps) => {
    const matches = useMediaQuery("(max-width: 1024px)");
    const { variant, onExpand } = useChatSidebar((state) => state);
    const connectionState = useConnectionState();
    const participant = useRemoteParticipant(hostIdentity);

    // ConnectionState.Connected 는 아래를 반환한다.
    // "connected" | "connecting" | "disconnected" | "reconnecting" 

    const isOnline = participant && connectionState === ConnectionState.Connected
   
    const isHidden = !isChatEnabled || !isOnline;

    const [value, setValue] = useState("");
    const { chatMessages: messages , send } = useChat();

    useEffect(()=>{
        if(matches ){
            onExpand();
        }
    },[matches, onExpand]);

    // useMemo 는 메모이제이션된 값을 반환되는 데 사용되며, 성능 최적화를 위해 이전에 계산된 값을 재사용한다.
    // useMemo 는 두 개의 인수를 받는다. 첫 번째 인수는 계산된 값을 반환하는 함수이고, 두 번째 인수는 의존성 배열이다.
    // 의존성 배열에 있는 값이 변경되면, 이전에 계산된 값을 재계산한다.
    // tip: useMemo 는 렌더링 중에 실행되므로, 렌더링 중에 실행되면 안 되는 것은 useMemo 안에 넣으면 안 된다.
    // b.timestamp -a.timestamp 는 시간기준으로 내림차순 정렬을 의미한다.
    const reversedMessages = useMemo(()=>{
        return messages.sort((a, b) =>b.timestamp -a.timestamp);
    },[messages])

    const onSubmit = () => {
        if(!send) return;

        send(value);
        setValue("");
    }

    const onChange = (value: string) => {
        setValue(value);
    }   
    return(
        <div className="flex flex-col bg-background border-l border-b pt-0 h-[calc(100vh-80px)]">
            <ChatHeader />
            {variant === ChatVariant.CHAT && (
                <>
                <ChatList
                 messages={reversedMessages}
                 isHidden={isHidden}
            
                />
                <ChatForm
                 onSubmit={onSubmit}
                 value={value}
                 onChange={onChange}
                 isHidden={isHidden}
                 isFollowersOnly={isChatFollowersOnly}
                 isDelayed={isChatDelayed}
                 isFollowing={isFollowing}
                />
                </>
            )}
             {variant === ChatVariant.COMMUNITY && (
                <>
                <ChatCommunity
                viewerName={viewerName}
                hostName={hostName}
                isHidden={isHidden}
                 />
                </>
            )}
            </div>
    )
}

export const ChatSkeleton = () => {

return (
    <div className="flex flex-col border-l border-b pt-0 h-[calc(100vh-80px)] border-2">
        <ChatHeaderSkeleton />
        <ChatListSkeleton />
        <ChatFormSkeleton />
    </div>
)
};