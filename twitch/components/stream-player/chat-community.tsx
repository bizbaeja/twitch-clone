"use client";

import { useParticipants } from "@livekit/components-react";

import { useState , useMemo} from "react";
import {  useDebounce } from "usehooks-ts";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CommunityItem } from "./community-item";
import { LocalParticipant, RemoteParticipant } from "livekit-client";

interface ChatCommunityProps {
    isHidden: boolean;
    viewerName: string;
    hostName: string;
}

export const ChatCommunity = ({
    isHidden,
    viewerName,
    hostName,
}:ChatCommunityProps) => {
    const [value, setValue] = useState("");
    const debouncedValue = useDebounce<string>(value, 500);

    const participants = useParticipants();

    const onChange= (newValue: string)=>{
        setValue(newValue);    
    };
    
    const filteredParticipants = useMemo(() => {
        const deduped = participants.reduce((acc, participant) => {
          const hostAsViewer = `host-${participant.identity}`;
          if (!acc.some((p) => p.identity === hostAsViewer)) {
            acc.push(participant);
          }
          return acc;
        }, [] as (RemoteParticipant | LocalParticipant)[]);
    
        return deduped.filter((participant) => {
          return participant.name?.toLowerCase().includes(debouncedValue.toLowerCase())
        });
      }, [participants, debouncedValue]);
    if(isHidden){
        return(
            <div className="flex flex-1 items-center justify-center">
                <p>
                    커뮤니티가 비활성화 되었습니다
                </p>
            </div>
        )
    }
    return(
        <div className="p-4">
        <Input
          onChange={(e) => onChange(e.target.value)}
          placeholder="커뮤니티를 검색하세요"
          className="border-white/10"
        />
        <ScrollArea className="gap-y-2 mt-4">
          <p className="text-center text-sm text-muted-foreground hidden last:block p-2">
            No results
          </p>
          {filteredParticipants.map((participant) => (
            <CommunityItem
              key={participant.identity}
              hostName={hostName}
              viewerName={viewerName}
              participantName={participant.name}
              participantIdentity={participant.identity}
            />
          ))}
        </ScrollArea>
      </div>
    )
}