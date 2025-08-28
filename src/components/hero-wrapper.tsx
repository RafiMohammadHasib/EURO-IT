"use client";

import { useEffect, useState } from "react";
import HeroSection from "@/components/sections/hero-section";
import ClientParticleBackground from "@/components/client-particle-background";

export default function HeroWrapper() {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <>
            {isClient && <ClientParticleBackground />}
            <HeroSection />
        </>
    );
}
