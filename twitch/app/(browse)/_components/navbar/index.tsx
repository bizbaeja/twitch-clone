
import { Search } from "./search";
import { Logo } from "./logo";
import { Actions } from "./actions";
import { Separator } from "@/components/ui/separator";
export const NavBar = () => {

    return(
        <>
           <nav className="fixed 
        bg-gradient-to-r from-[#222a28] from-1% via-[#412a3c] via-39% to-[#222a28] to-90%
        top-0 w-full h-20 z-[49] bg-[#222a28] px-2 lg:px-4 flex justify-between items-center shadow-sm">
            <Logo />
            <Search />
            <Actions />
        </nav>
        <Separator  className="my-1  bg-[#222a28]"/>
        </>
     
        
    )
}