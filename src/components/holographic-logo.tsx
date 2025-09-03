
"use client";

import { cn } from '@/lib/utils';
import Link from 'next/link';

const HolographicLogo = ({ className }: { className?: string }) => {
  return (
    <Link href="/" className={cn("relative font-headline text-2xl font-bold tracking-widest uppercase", className)} aria-label="EURO IT Home">
      <span className="relative z-10 text-primary">
        EURO IT
      </span>
    </Link>
  );
};

export default HolographicLogo;
