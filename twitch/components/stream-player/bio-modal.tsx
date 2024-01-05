"use client";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
}
from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState, useTransition, useRef, ElementRef, startTransition } from "react";
import { updateUser } from "@/actions/user";
import { toast } from "sonner";


interface BioModalProps {
    initialValue: string | null ;
    
}

export const BioModal = ({
    initialValue
}:BioModalProps) => {
    const closeRef = useRef<ElementRef<"button">>(null);

    const [isPending, startTransition] = useTransition();
    const [value, setValue] = useState(initialValue || "");

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        startTransition(()=>{
            updateUser({ bio: value })
            .then(()=> {toast.success("Bio가 수정되었습니다.")
            closeRef?.current?.click();})
            .catch(()=> toast.error("Bio 수정에 실패했습니다."))
        });
    };

    return(
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="link" size="sm" className="ml-auto">
                    Edit
                </Button>
            </DialogTrigger>
            <DialogContent>
               <DialogHeader>
                <DialogTitle>
                    Bio 수정하기
                </DialogTitle>
                </DialogHeader> 
                <form onSubmit={onSubmit} className="space-y-4">
                    <Textarea 
                     placeholder="Bio를 입력하세요"
                     onChange={(e)=>setValue(e.target.value)}
                     value={value} 
                     disabled={isPending}
                     className="resize-none"
                    />
                    <div className="flex justify-between"
                    >
                        <DialogClose asChild ref={closeRef}>
                            <Button variant="ghost" type="button">
                                취소
                            </Button>
                        </DialogClose>
                        <Button type="submit" disabled={isPending}>
                            저장
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}