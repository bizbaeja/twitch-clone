"use client";

import Image from "next/image";
import { Pencil } from "lucide-react";

import { Separator } from "@/components/ui/separator";

import { InfoModal } from "./info-modal";

interface InfoCardProps {
  name: string;
  thumbnailUrl: string | null;
  hostIdentity: string;
  viewerIdentity: string;
};

export const InfoCard = ({
  name,
  thumbnailUrl,
  hostIdentity,
  viewerIdentity,
}: InfoCardProps) => {
  const hostAsViewer = `host-${hostIdentity}`;
  const isHost = viewerIdentity === hostAsViewer;

  if (!isHost) return null;

  return (
    <div className="px-4">
      <div className="rounded-xl bg-background">
        <div className="flex  items-center gap-x-2.5 p-4">
          <div className="flex rounded-md bg-blue-600 p-2 h-10 w-10" >
            <Pencil className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-sm lg:text-md font-semibold capitalize">
              스트림 정보 수정
            </h3>
            <p className="text-muted-foreground text-xs lg:text-sm">
                스트림 정보를 수정할 수 있습니다.
            </p>
          </div>
          <div>
            <div className="flex justify-end">
            <InfoModal
                    initialName={name}
                    initialThumbnailUrl={thumbnailUrl}
                />
            </div>
         
          </div>
       
        </div>
        <Separator />
        <div className="p-4 lg:p-6 space-y-4">
          <div>
            <h3 className="text-sm text-muted-foreground mb-2">
              이름
            </h3>
            <p className="text-sm font-semibold">
              {name}
            </p>
          </div>
          <div>
            <h3 className="text-sm text-muted-foreground mb-2">
              썸네일
            </h3>
            {thumbnailUrl && (
              <div className="relative aspect-video rounded-md overflow-hidden w-[200px] border border-white/10">
                <Image
                  fill
                  src={thumbnailUrl}
                  alt={name}
                  className="object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};