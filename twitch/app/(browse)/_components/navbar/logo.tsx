import Link from 'next/link';
import Image from 'next/image';
import  { Poppins } from 'next/font/google'
import { cn } from "@/lib/utils"

const font = Poppins({
    subsets: ['latin'],
    weight: ["200","300","400","500","600", "700","800"],
})

export const Logo = () =>{
    return (
      <Link href="/">
        <div className='flex items-center gap-x-4 hover:opacity-75 transition '>
            <div className='bg-white rounded-full p-0.9 mr-12 shrink-0 lg:mr-0 lg:shrink'>
                <Image 
                    className='border rounded-full ring-4 ring-[#e4bdd1]'
                    src='/jam.svg'
                    alt='Gaemehub'
                    height="32"
                    width="32"
                    
                />
            </div>
            <div className={cn(
                "hidden lg:block",
                font.className)}>
                <p className='text-lg font-semibold'>StreamJam</p>
                <p className='text-xs text-muted-foreground hover:text-rose-300'>스트리밍 서비스</p>
            </div>
        </div>
      </Link>
    )
}