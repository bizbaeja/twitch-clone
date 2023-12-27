"use client";

import { useEffect } from "react";
import { useMediaQuery } from "usehooks-ts";

import { cn } from "@/lib/utils";
import { useCreatorSidebar } from "@/store/use-creator-sidebar";

interface ContainerProps {
    children: React.ReactNode;
};

export const Container = ({ children }: ContainerProps) => {

    const { collapsed, onExpand, onCollapse } = useCreatorSidebar((state) => state);
    const matches = useMediaQuery(`(min-width: 1024px)`);

    useEffect(() => {

        if (matches) {
            onExpand();
        } else {
            onCollapse();
        }
    }, [matches, onExpand, onCollapse]);
    return (
    <div className={cn(
        "flex=1",
        collapsed ? "ml-[70px]" : "ml-[70px] lg:ml-60"
    )}>
        {children}
    </div>)
};
