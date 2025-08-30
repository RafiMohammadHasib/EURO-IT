
"use client";

import dynamic from 'next/dynamic';
import { useMounted } from '@/hooks/use-mounted';

const ParticleBackground = dynamic(() => import('@/components/particle-background'), {
  ssr: false,
});

export default function ClientParticleBackground() {
    const isMounted = useMounted();

    if (!isMounted) {
        return null;
    }
  
    return <ParticleBackground />;
}
