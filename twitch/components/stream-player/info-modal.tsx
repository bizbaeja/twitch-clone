"use client";

import { useState, useTransition, useRef, ElementRef} from "react";
import { useRouter } from "next/navigation";
import {
 Dialog,
 DialogClose,
 DialogContent,
 DialogHeader,
 DialogTitle,
 DialogTrigger

} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label} from "@/components/ui/label";
import { updateStream } from "@/actions/stream";
import { toast } from "sonner";
import { UploadDropzone } from "@/lib/uploadthing"; 
import { Hint } from "@/components/hint";
import { Trash } from "lucide-react";
import Image from "next/image";
interface InfoModalProps {
    initialName: string;
    initialThumbnailUrl: string | null;
};

export const InfoModal = ({
    initialName,
    initialThumbnailUrl,
}:InfoModalProps) => {

    const router = useRouter(); 
    const closeRef = useRef<ElementRef<"button">>(null);
    const [isPending, startTransition] = useTransition();
    const [name, setName] = useState(initialName);
    const [thumbnailUrl, setThumbnailUrl] = useState(initialThumbnailUrl);

    const onRemove = () => {
        startTransition(()=>{
            updateStream({ thumbnailUrl: null})
            .then(()=> {toast.success("Thumbnail이 삭제되었습니다.")
            setThumbnailUrl("");
            closeRef?.current?.click();
        })
            .catch(()=> toast.error("Thumbnail 삭제에 실패했습니다."))
        })
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        startTransition(()=>{
            updateStream({ name: name})
            .then(()=> {toast.success("Stream Info가 수정되었습니다.");
            closeRef?.current?.click();
        })
         
            .catch(()=> toast.error("Stream Info 수정에 실패했습니다."))
        })
    };
    return(
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button
                     variant="link"
                     size="sm"
                     className="ml-auto "
                    >
                        Edit
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader >
                        <DialogTitle>
                            Stream Info 수정하기
                        </DialogTitle>
                    </DialogHeader>  
                    <form  onSubmit={onSubmit} className="space-y-14">
                        <div className="space-y-2">
                            <Label>
                                이름
                            </Label>
                            <Input 
                            disabled={isPending}
                            placeholder="Stream Name"
                            onChange={onChange}
                            value={name}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>
                                썸네일
                            </Label>
                            {thumbnailUrl ? (
                                <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10">
                                    <div className="absolute top-2 right-2 z-[10]">
                                        <Hint
                                        label="삭제" asChild side="left"
                                        >
                                            <Button
                                             type="button"
                                             disabled={isPending}
                                             onClick={onRemove}
                                             className="h-auto w-auto p-1.5"
                                            >
                                               <Trash className="h-4 w-4" /> 
                                            </Button>
                                        </Hint>
                                    </div>
                                    <Image 
                                    src={thumbnailUrl}
                                    alt="Thumbnail"
                                    fill
                                    className="object-cover"
                                    />
                                </div>
                                
                            ):(
                            <div className="rounded-xl border outline-dashed outline-muted">
                                <UploadDropzone 
                                 endpoint="thumbnailUploader"
                                 appearance={{
                                    label:{
                                        color:"#FFFFFF"
                                    },
                                    allowedContent:{
                                        color:"#FFFFFF"
                                    }
                                 }}
                                 onClientUploadComplete={(res)=>{
                                    setThumbnailUrl(res?.[0]?.url);
                                    router.refresh();
                                    closeRef?.current?.click();
                                 }}
                                />
                            </div>
                            )}
                        </div>
                        <div className="flex justify-between">
                            <DialogClose ref={closeRef} asChild >
                            <Button type="button" variant="ghost">
                                취소
                            </Button>
                            </DialogClose>
                            <Button
                            disabled={isPending}
                            variant="primary"
                            type="submit"
                            >
                                저장
                            </Button>
                        
                        </div>
                    </form>  
                </DialogContent>
            </Dialog>
        </div>
    )
}