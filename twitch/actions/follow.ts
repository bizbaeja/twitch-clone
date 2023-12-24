"use server";

export const onFollow = async (id: string) => {
    try{
        console.log("팔로우 시작",id);
    }
    catch(error){
        throw new Error("팔로우에 실패했습니다.")
    }
};