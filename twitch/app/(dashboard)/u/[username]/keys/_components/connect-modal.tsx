"use client";

import { Button } from "@/components/ui/button";
import { useState, useTransition, useRef, ElementRef } from "react";
import { createIngress } from "@/actions/ingress";
import { AlertTriangle } from "lucide-react";
import { IngressInput } from "livekit-server-sdk";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert";

import {
    Select,
    SelectContent,
    SelectTrigger,
    SelectItem,
    SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const RTMP = String(IngressInput.RTMP_INPUT);
const WHIP = String(IngressInput.WHIP_INPUT);

type IngressType = typeof RTMP | typeof WHIP;

export const ConnectModal = () => {
    const closeRef = useRef<ElementRef<"button">>(null);
    const [isPending, startTransition] = useTransition();
    const [ingressType, setIngressType] = useState<IngressType>(RTMP);

    const onSubmit = () => {
        startTransition(() => {
            createIngress(parseInt(ingressType))
            .then(() => {toast.success("연결이 생성되었습니다.👩🏻‍💻")
        closeRef.current?.click();
        })
            .catch(() => toast.error("연결 생성에 실패했습니다.😣"));
        });
    };
 
    return(
        <div>
           <Dialog>
                <DialogTrigger asChild>
                    <Button variant="primary">
                        연결 생성하기
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            연결 생성하기
                        </DialogTitle>
                        <DialogClose />
                    </DialogHeader>
                    <Select
                        value={ingressType}
                        onValueChange={(value) => setIngressType(value)}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Ingress Type"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value={RTMP}>RTMP</SelectItem>
                            <SelectItem value={WHIP}>WHIP</SelectItem>
                        </SelectContent>    
                    </Select>
                    <Alert>
                        <AlertTriangle className="h-4 w-4"/>
                        <AlertTitle>경고!</AlertTitle>
                        <AlertDescription>
                            연결을 생성하면 이전 연결은 더 이상 사용할 수 없습니다.
                        </AlertDescription>
                    </Alert>
                    <div className="flex justify-between">
                        <DialogClose ref={closeRef} asChild>
                            <Button variant="ghost">
                                취소
                            </Button>
                        </DialogClose>
                            <Button
                            disabled={isPending}
                            onClick={onSubmit}
                            variant="primary"
                            >

                                연결 생성하기
                            </Button>
                    </div>
                </DialogContent>
           </Dialog>
        </div>
    )
}