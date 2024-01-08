"use client";

import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { CopyButton } from "./copy-button";

interface KeyCardProps {
  value: string | null;
};

export const KeyCard = ({
  value,
}: KeyCardProps) => {
  const [show, setShow] = useState(false);

  return (
    <div className="rounded-xl bg-muted p-6">
      <div className="flex items-start gap-x-10">
        <p className="font-semibold shrink-0">
          스트림 키
        </p>
        <div className="space-y-2 w-full">
          <div className="w-full flex items-center gap-x-2">
            <Input
              value={value || ""}
              type={show ? "text" : "password"}
              disabled
              placeholder="스트림 키"
            />
            <CopyButton value={value || ""} />
          </div>
          <Button
            onClick={() => setShow(!show)}
            size="sm"
            variant="link"
          >
            {show ? "숨기기" : "보이기"}
          </Button>
        </div>
      </div>
    </div>
  );
};