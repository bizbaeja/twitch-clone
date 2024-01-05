import { getBlockedUsers } from "@/lib/block-service";
import {  columns } from "./_components/columns"
import { DataTable } from "./_components/data-table";
import { format } from "date-fns";






const Communuty= async () => {
 const blckedUsers = await getBlockedUsers();

 const formattedData = blckedUsers.map((block)=>({
    ...block,
    userId: block.blocked.id,
    imageUrl: block.blocked.imageUrl,
    username: block.blocked.username,
    createdAt: format(new Date(block.blocked.createdAt), "dd/mm/yyyy")

 }))
    return (
        <div className="p-6">
            <div className=" mb-4"
            >
                <h1 className="text-2xl font-bold">커뮤니티 세팅</h1>
            </div>
            <DataTable  columns={columns} data={formattedData}/>
        </div>
    )
}

export default Communuty;