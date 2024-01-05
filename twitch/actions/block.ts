"use server";
import { getSelf } from '@/lib/auth-service';
import { RoomServiceClient } from 'livekit-server-sdk';
import { blockUser, unblockUser } from '@/lib/block-service';
import { revalidatePath } from 'next/cache';

const roomService = new RoomServiceClient(
    process.env.LIVEKIT_API_URL!,
    process.env.LIVEKIT_API_KEY!,
    process.env.LIVEKIT_API_SECRET!,
);


export const onBlock = async (id: string) => {
    const self = await getSelf();

    let blockedUser;
    
    try{
        blockedUser = await blockUser(id);
    }
    catch{
        throw new Error("Internal server error");
    }

    try{
        // ingress.ts 파일의 createIngress 함수를 참고하자.
        await roomService.removeParticipant(self.id, id);
    }
    catch{

    }
   revalidatePath(`/u/${self.username}/community`);

   return blockedUser;
};

export const onUnBlock = async (id: string) => {
    const self = await getSelf();
    const unblockedUser = await unblockUser(id);

        revalidatePath(`/${self.username}/community`);
  
    return unblockedUser;
};