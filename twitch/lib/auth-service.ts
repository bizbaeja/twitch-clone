import { currentUser } from "@clerk/nextjs";

import { db } from "./db";

export const getSelf = async () => {

    // 현재 사용자 가져오기
    const self = await currentUser();

    // 인증 확인
    if(!self || !self.username){
        throw new Error("Unauthorized");
    }

    // 데이터베이스에서 사용자 가져오기 
    const user = await db.user.findUnique({
        where: {externalUserId : self.id}
    });

    if(!user){
        throw new Error("Not Found");   
    }

    return user;

}

export const getSelfByUsername = async (username: string) => {
    const self = await currentUser();

    if(!self || !self.username){
        throw new Error("Unauthorized");
    }

    const user = await db.user.findUnique({
        where: {username}
    });
    
    if(!user){
        throw new Error("Not Found");
    }

    if(self.username !== user.username){
        throw new Error("Unauthorized");
    }

    return self;
};