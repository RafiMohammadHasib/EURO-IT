"use client";

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const ParticleBackground = dynamic(() => import('@/components/particle-background'), {
  ssr: false,
});

export default function ClientParticleBackground() {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }
  
    return <ParticleBackground />;
}
