"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { Stream } from "@prisma/client";
import { getSelf } from "@/lib/auth-service";

// 스트리밍 정보를 업데이트하는 함수
export const updateStream = async (values: Partial<Stream>) => {
    try{
        // 현재 로그인한 사용자의 정보를 가져온다.
        const self = await getSelf();

        // 현재 사용자의 스트리밍 정보를 가져온다.
        const selfStream = await db.stream.findUnique({
            where: { userId: self.id },
        });

        // 스트리밍 정보가 없으면 에러를 발생시킨다.
        if(!selfStream){
            throw new Error("Stream not found");
        }

        // 업데이트할 유효한 데이터를 정의한다.
        const validData = {
            name : values.name,
            isChatEnabled : values.isChatEnabled,
            isChatFollowersOnly : values.isChatFollowersOnly,
            isChatDelayed: values.isChatDelayed,
        }

        // 스트리밍 정보를 업데이트한다.
        const stream = await db.stream.update({
            where: {
                id: selfStream.id,
            },
            data: {
                ...validData,
            }
        });

        // 캐시 재생성을 통해 페이지를 다시 렌더링하도록 요청한다.
        revalidatePath(`/u/${self.username}/chat`);
        revalidatePath(`/u/${self.username}/chat`);
        revalidatePath(`/${self.username}/chat`);

        return stream;
    }
    catch(err){
        throw new Error("Internal server error");
    }
};

