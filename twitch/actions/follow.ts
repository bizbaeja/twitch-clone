"use server";

import { followUser } from "@/lib/follow-service";
import { revalidatePath } from "next/cache";

export const onFollow = async (id: string) => {
    try{
      const followedUser  = await followUser(id);

      // 팔로우가 성공하면 홈 화면을 다시 가져옵니다.
      revalidatePath("/");
      
      // 팔로우가 성공하면 팔로우한 유저의 프로필 화면을 다시 가져옵니다.
      if (followedUser){
        revalidatePath(`/${followedUser.following.username}`)
      }
      return followedUser;
    }
    catch(error){
        throw new Error("팔로우에 실패했습니다.")
    }
};