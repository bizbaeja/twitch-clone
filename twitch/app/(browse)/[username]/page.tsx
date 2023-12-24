import { isFollowingUser } from "@/lib/follow-service";
import { getUserByUsername } from "@/lib/user-service";
import { notFound } from "next/navigation";
import { Actions } from "./_components/actions";

interface UserPageProps {
    params: {
        username: string;
    }
}

const UserPage = async ({
    params
}: UserPageProps) => {

    const user = await getUserByUsername(params.username)

    if(!user){
        notFound();
    }

    const isFollowing = await isFollowingUser(user.id)
    
    return (
        <div className="flex flex-col gap-y-4">
            <p>
            이름 : {user.username}
            </p>  
            <p>
            아이디 : {user.id}
            </p>  
            <p>팔로잉 : {`${isFollowing}`}</p>
            <Actions />
        </div>
    );
};
export default UserPage;