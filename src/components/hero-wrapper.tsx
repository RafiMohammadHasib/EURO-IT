
"use client";

import HeroSection from "@/components/sections/hero-section";
import { useMounted } from "@/hooks/use-mounted";

export default function HeroWrapper() {
    const isMounted = useMounted();

    if (!isMounted) {
        return <section id="home" className="h-screen flex items-center justify-center text-center -mt-20"></section>;
    }

    return (
        <HeroSection />
    );
}
