"use client";

import { useEffect, ReactNode } from "react";
import Swup from "swup";

export default function SwupProvider({ children }: { children: ReactNode }) {
    useEffect(() => {
        const swup = new Swup({
            containers: ["#swup"],
        });

        (window as any).swup = swup;

        return () => {
            swup.destroy();
        };
    }, []);

    return <>{children}</>;
}
