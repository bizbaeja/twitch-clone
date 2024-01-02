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
 // useMemo 는 메모이제이션된 값을 반환되는 데 사용되며, 성능 최적화를 위해 이전에 계산된 값을 재사용한다.
 // participants 또는 debouncedValue 가 변경되면, filteredParticipants 를 재계산한다.   
    const filteredParticipants = useMemo(() => {
    // dedupe 배열(중복제거) 생성 :
    // reduce 함수를 사용하여 중복을 제거합니다. 이미 acc 배열에 동일한 hostAsViewer가 있는지 확인하고, 없으면 acc 배열에 현재 참여자를 추가합니다.
    // reduce 함수를 사용하여, acc 배열에 participant 를 추가한다.
    // reduce 함수의 두 번째 인수는 초기값이다. 여기서는 빈 배열을 사용한다.
    // reduce 함수의 첫 번째 인수는 콜백 함수이다. 콜백 함수는 두 개의 인수를 받는다.
    // 첫 번째 인수는 acc 배열이고, 두 번째 인수는 현재 순회 중인 participant 이다.
    // reduce 함수는 acc 배열을 반환한다.  
        const deduped = participants.reduce((acc, participant) => {
          const hostAsViewer = `host-${participant.identity}`;
          if (!acc.some((p) => p.identity === hostAsViewer)) {
            acc.push(participant);
          }
          return acc;
        }, [] as (RemoteParticipant | LocalParticipant)[]);
    // 참여자 필터링 :
    // deduped 배열에서 이름에 debouncedValue 가 포함된 참여자만 반환합니다.
    // participant.name이 존재하고, 그 값이 debouncedValue를 소문자로 변환한 값에 포함되어 있는 경우에만 해당 참여자가 결과에 포함된다.
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