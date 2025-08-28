"use client";

import { useTheme } from 'next-themes';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const ParticleBackground = dynamic(() => import('@/components/particle-background'), {
  ssr: false,
});

export default function ClientParticleBackground() {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return null;
    }
  
    return <ParticleBackground />;
}
