
"use client";

import Link from 'next/link';

const HolographicLogo = () => {
  return (
    <Link href="/" className="relative font-headline text-2xl font-bold tracking-widest uppercase" aria-label="EURO IT Home">
      <span className="relative z-10 text-primary">
        EURO IT
      </span>
    </Link>
  );
};

export default HolographicLogo;
