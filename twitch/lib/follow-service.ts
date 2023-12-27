import { db }   from "@/lib/db";
import { getSelf } from "./auth-service";

export const getFollowedUsers = async () => {
    try{
        const self = await getSelf();

        const followedUsers = db.follow.findMany({
            where: {
                followerId: self.id,
                following:{
                  blocking:{
                      none:{
                          blockedId: self.id,
                      },
                  },
                },
            },
            include:{
                following: true,
            }
        })
        return followedUsers;
    }
    catch{
        return [];
    }
};

// 팔로우이면 true를 반환하고, 아니면 false를 반환합니다.

export const isFollowingUser = async (id: string) => {
    // try 블록 내에서 getSelf()를 호출하고, 호출이 성공하면 self변수에 결과를 할당합니다.
   
    try{
        const self = await getSelf();

        // otherUser 에는 id를 통해 찾은 유저 정보가 담깁니다.

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

        // 팔로우 중이면 true를 반환합니다.
        return !!existingFollow;
    }

   
    catch{
        return false;
    }
}

// 유저 팔로우하기 

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
    
    // follow 테이블에 팔로우 정보를 추가합니다. 
    // localhost:5555 에서 확인 가능합니다.

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
   
    // 팔로우 정보를 반환합니다.
    return follow
};

// 유저 언팔로우하기 
export const unfollowUser = async (id: string) => {
    // 현재 로그인한 유저를 가져옵니다.
    const self = await getSelf();
  
    // 다른 유저를 찾습니다.
    const otherUser = await db.user.findUnique({
      where: {
        id,
      },
    });
  
    // 다른 유저가 없으면 예외를 발생시킵니다.

    if (!otherUser) {
      throw new Error("유저를 찾지 못했습니다.");
    }
  
    // 다른 유저가 본인이면 예외를 발생시킵니다.

    if (otherUser.id === self.id) {
      throw new Error("자기 자신을 언팔로우 할 수 없습니다.");
    }
  
    // 팔로우 중이 아니면 예외를 발생시킵니다.
    const existingFollow = await db.follow.findFirst({
      where: {
        followerId: self.id,
        followingId: otherUser.id,
      },
    });
   
    // 팔로우 중이 아니면 예외를 발생시킵니다.

    if (!existingFollow) {
      throw new Error("팔로우 중이 아닙니다.");
    }
  

    // 팔로우를 삭제합니다.

    const follow = await db.follow.delete({
      where: {
        id: existingFollow.id,
      },
      include: {
        following: true,
      },
    });
  
    // 팔로우 정보를 반환합니다.

    return follow;
  };