
"use client";

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const HolographicLogo = () => {
  const { theme } = useTheme();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <Link href="/" className="relative font-headline text-2xl font-bold tracking-widest uppercase" aria-label="EURO IT Home">
      <span className={cn(
        "relative z-10",
        isClient && theme === 'light' ? 'text-primary' : 'text-primary'
      )}>
        EURO IT
      </span>
    </Link>
  );
};

export default HolographicLogo;
