"use client"

import { Button } from "@/components/ui/button"
import { onFollow } from "@/actions/follow";

export const Actions = () => {
    const onClick = () => {
        onFollow("123")
    }

    return (
        <Button onClick={onClick} variant="primary">
            Follow
        </Button>
    );
};