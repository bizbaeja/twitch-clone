import { db }   from "@/lib/db";
import { getSelf } from "./auth-service";

export const isFollowingUser = async (id: string) => {
    try{
        const self = await getSelf();

        const otherUser =  await db.user.findUnique({
            where: { id },
        })

        if(!otherUser){
            throw new Error(
                "유저를 찾지 못했습니다."
            );
        }

        if(otherUser.id === self.id){
            return true;
        }

  
        const existingFollow = await db.follow.findFirst({
            where: {
              followerId: self.id,
              followingId: otherUser.id,
            },
          });
        return !!existingFollow;
    }

   
    catch{
        return false;
    }
}


export const followUser = async (id: string) => {
    const self = await getSelf();

    // 다른 유저를 찾습니다.
    const otherUser = await db.user.findUnique({
        where :{ id },
    });

    if(!otherUser){
        throw new Error("유저를 찾지 못했습니다.");
    }

    if(otherUser.id === self.id){
        throw new Error("자기 자신을 팔로우 할 수 없습니다.");
    }

    // 이미 팔로우 중인 경우 예외를 발생시킵니다.
    const existingFollow = await db.follow.findFirst({
        where:{
            followerId: self.id,
            followingId: otherUser.id,
        },
    });

    if(existingFollow){
        throw new Error("이미 팔로우 중입니다.");
    }

    const follow = await db.follow.create({
        data:{
            followerId: self.id,
            followingId: otherUser.id,
        },
        include:{
            following: true,
            follower: true,
        }
    });
   
    return follow
};


export const unfollowUser = async (id: string) => {
    const self = await getSelf();

    // 다른 유저를 찾습니다.
    const otherUser = await db.user.findUnique({
        where: { id },
    });
    if(!otherUser){
        throw new Error("유저를 찾지 못했습니다.");
    }
    if(otherUser.id === self.id){
        throw new Error("자기 자신을 언팔로우 할 수 없습니다.");
    }

    // 팔로우 중이 아닌 경우 예외를 발생시킵니다.
    const existingFollow = await db.follow.findFirst({
        where:{
            followerId: self.id,
            followingId: otherUser.id,
        },
    });

    if(!existingFollow){
        throw new Error("팔로우 중이 아닙니다.");
    }

    // 팔로우를 삭제합니다.
    const follow = await db.follow.delete({
        where:{
            id: existingFollow.id,
        },
        include:{
            following: true,
            follower: true,
        }
    });
};