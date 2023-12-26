import { db } from "./db";
import { getSelf } from "./auth-service";

// 차단 여부를 확인
export const isBlockedByUser = async (id: string) => {
    try{
        const self = await getSelf();

        const otherUser = await db.user.findUnique({
            where: { id },
        });

        if(!otherUser){
            throw new Error(
                "유저를 찾지 못했습니다.🙅🏻‍♂️"
            );
        }
        
        if(otherUser.id === self.id){
            return false;
        }
// 차단 여부를 확인하려는 유저가 차단한 유저 목록에 있는지 확인합니다.
    const existingBlock = await db.block.findUnique({
        where: {
        blockerId_blockedId: {
            blockerId: otherUser.id,
            blockedId: self.id,
        },
        },
    });

          return !!existingBlock;
    }
    catch{
        return false;
    }
};

// 차단하기
export const blockUser = async (id: string) => {
    const self = await getSelf();

    if(self.id === id){
        throw new Error("자기 자신을 차단할 수 없습니다.🤷🏻‍♀️");
    }

    const otherUser = await db.user.findUnique({
        where: { id },
    
       
    });

    if(!otherUser){
        throw new Error("유저를 찾지 못했습니다.🙅🏻‍♂️");
    }

    const existingBlock = await db.block.findUnique({
        where:{
            blockerId_blockedId:{
                blockerId: self.id,
                blockedId: otherUser.id,
            }
        }
    });

    if(existingBlock){
        throw new Error("이미 차단한 유저입니다.🙅🏻‍♂️");
    }

    const block = await db.block.create({
        data:{
            blockerId: self.id,
            blockedId: otherUser.id,
        },
        include:{
            blocked: true
        }
    });

    return block;
};

// 차단 해제하기 
export const unblockUser = async (id: string) => {
    const self = await getSelf();

   if(self.id === id){
       throw new Error("자기 자신을 차단 해제할 수 없습니다.🤷🏻‍♀️");
   }

   const otherUser = await db.user.findUnique({
       where: { id },
   });

   if(!otherUser){
       throw new Error("유저를 찾지 못했습니다.🙅🏻‍♂️");
   }

// 차단한 유저 관리
   const existingBlock = await db.block.findUnique({
       where:{
           blockerId_blockedId:{
            // 현재 사용자 아이디
               blockerId: self.id,
            // 차단 여부를 확인하려는 유저 아이디
               blockedId: otherUser.id,
           }
       }
   });

   if(!existingBlock){
       throw new Error("차단하지 않은 유저입니다.🙅🏻‍♂️");
   }

   const unblock = await db.block.delete({
     where: {
        id : existingBlock.id,
     },
     include: {
            blocked: true,
     }
   });

   return unblock;
};