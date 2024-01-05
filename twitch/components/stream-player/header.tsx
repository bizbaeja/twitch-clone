"use client";
import {useLiveHostIdentityInfo} from "@/store/use-live-hostidentity";
import React, { useEffect, useState} from 'react';
import { UserIcon } from "lucide-react";
import { UserAvatar, UserAvatarSkeleton } from "../user-avatar";
import { VerifiedMark } from "../verified-mark";
import { useParticipants, useRemoteParticipant } from "@livekit/components-react";
import { Actions, ActionsSkeleton } from "./actions";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "../ui/button";

interface HeaderProps {
    imageUrl: string;
    hostName: string;
    hostIdentity: string;
    viewerIdentity: string;
    isFollowing: boolean;
    name: string;
}

export const Header = ({
    imageUrl,
    hostIdentity,
    hostName,
    viewerIdentity,
    isFollowing,
    name,
}:HeaderProps) => {
const participants = useParticipants();
const participant = useRemoteParticipant(hostIdentity);

const isLive = !!participant;
const participantCount = participants.length - 1;

const hostAsViewer = `host-${hostIdentity}`;
const isHost = viewerIdentity === hostAsViewer;
// hostIdentity 정보와 isLive 정보를 useLiveHostIdentity 훅으로 가져온다.

const { liveHostIdentityInfo, setLiveHostIdentityInfo } = useLiveHostIdentityInfo();
useEffect(() => {
if(!isLive){
    setLiveHostIdentityInfo({ hostIdentity: liveHostIdentityInfo.hostIdentity, isLive : false });
}else{
    setLiveHostIdentityInfo({ hostIdentity: liveHostIdentityInfo.hostIdentity, isLive: true });
    
}
},[setLiveHostIdentityInfo]);
const onClick = (e:any) => {
    e.preventDefault();
    
   alert(console.dir(setLiveHostIdentityInfo(liveHostIdentityInfo)))
}
  return(
    <div className="flex flex-col lg:flex-row gap-y-4 lg:gap-y-0 items-start justify-between px-4">
        <div className="flex items-center gap-x-3">
            <UserAvatar 
                imageUrl={imageUrl}
                username={hostName}
                size="lg"
                isLive={true}
                {...(isLive&&{showBadge:true, ringColor:"rose-500"})}
             
            />
            
            <Button  type="button" onClick={onClick}>눌러</Button>
            <div className="space-y-1">
                <div className="flex items-center gap-x-2">
                    <h2 className="text-lg font-semibold"> 
                        {hostName}
                    </h2>
                    {isLive&&<VerifiedMark />}
                </div>
                <p className="text-sm font-semibold">
                    {name}
                </p>
                {isLive  ? (
                    <div className="font-semibold flex gap-x-1 items-center text-xs text-rose-500">
                        <UserIcon className="h-4 w-4 " />
                        <p>
                            {participantCount}{participantCount === 1 ? "viewer" : "viewers"}
                        </p>
                    </div>
                ) : (
                    <p className="font-semibold text-xs text-muted-foreground">
                        Offline
                    </p>
                )}
            </div>
        </div>
        <Actions
         isFollowing={isFollowing}
         hostIdentity={hostIdentity}
         isHost={isHost}
        />
    </div>
  )  
};

export const HeaderSkeleton = () => {
    return(
        <div className="flex flex-col lg:flex-row gap-y-4 lg:gap-y-0 items-start justify-between px-4">
             <div className="flex items-center gap-x-2">
                <UserAvatarSkeleton  size="lg"/>
                <div className="space-y-2">
                    <Skeleton className="w-32 h-6" />
                    <Skeleton className="w-32 h-6" />
                </div>
             </div>
             <ActionsSkeleton />
        </div>
       
    );
};