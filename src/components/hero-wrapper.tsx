"use client";

import { useEffect, useState } from "react";
import HeroSection from "@/components/sections/hero-section";

export default function HeroWrapper() {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return <section id="home" className="h-screen flex items-center justify-center text-center -mt-20"></section>;
    }

    return (
        <HeroSection />
    );
}
