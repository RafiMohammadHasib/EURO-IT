"use client";

import Link from 'next/link';
import { cn } from '@/lib/utils';

const HolographicLogo = () => {
  return (
    <Link href="/" className="relative font-headline text-2xl font-bold text-white tracking-widest uppercase" aria-label="EURO IT Home">
      <span className={cn(
        "relative z-10",
        "bg-clip-text text-transparent bg-gradient-to-r from-white to-cyan-300",
        "animate-hologram-text"
      )}>
        EURO IT
      </span>
      <style jsx>{`
        @keyframes hologram-text {
          0% {
            text-shadow: 0 0 4px #00f0ff, 0 0 6px #00f0ff, 0 0 10px #00f0ff, 0 0 15px #9d00ff, 0 0 25px #9d00ff;
          }
          50% {
            text-shadow: 0 0 6px #00f0ff, 0 0 8px #00f0ff, 0 0 12px #9d00ff, 0 0 20px #9d00ff, 0 0 30px #00f0ff;
          }
          100% {
            text-shadow: 0 0 4px #00f0ff, 0 0 6px #00f0ff, 0 0 10px #00f0ff, 0 0 15px #9d00ff, 0 0 25px #9d00ff;
          }
        }
        .animate-hologram-text {
          animation: hologram-text 4s ease-in-out infinite;
        }
      `}</style>
    </Link>
  );
};

export default HolographicLogo;
