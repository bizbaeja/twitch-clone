"use client";

import { Button } from "@/components/ui/button";
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

import { AlertTriangle } from "lucide-react";
export const ConnectModal = () => {
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
                    <Alert>
                        <AlertTriangle className="h-4 w-4"/>
                        <AlertTitle>경고!</AlertTitle>
                        <AlertDescription>
                            연결을 생성하면 이전 연결은 더 이상 사용할 수 없습니다.
                        </AlertDescription>
                    </Alert>
                    <div className="flex justify-between">
                        <DialogClose>
                            <Button variant="ghost">
                                취소
                            </Button>
                        </DialogClose>
                            <Button
                            onClick={()=>{}}
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