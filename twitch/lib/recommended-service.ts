import { db } from "./db";
import { getSelf } from "./auth-service";
//다른 유저 추천 목록 가져오기

export const getRecommended = async () => {
    let userId;
  
    // try 블록 내에서 getSelf()를 호출하고, 호출이 성공하면 self변수에 결과를 할당합니다.
    try{
        const self =  await getSelf();
        userId = self.id;
    }
    // 예외가 발생하면 userId를 null로 설정합니다.
    catch{
        userId = null;
    }

    let users = [];

    if (userId){
        users = await db.user.findMany({
            orderBy:{
                createdAt: "desc"
            },
            where:{
                NOT:{
                    id: userId,
                }
            
            }
        })
    }else{
        

     users = await db.user.findMany({
        orderBy:{
            createdAt: "desc"
        },
    });
}
    return users;
}