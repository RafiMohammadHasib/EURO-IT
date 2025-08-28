"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import HolographicLogo from '@/components/holographic-logo';
import { cn } from '@/lib/utils';

const navItems = [
  { name: 'Services', href: '#services' },
  { name: 'About', href: '#about' },
  { name: 'Portfolio', href: '#portfolio' },
  { name: 'Contact', href: '#contact' },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const NavLinks = ({ className }: { className?: string }) => (
    <nav className={cn("flex items-center gap-6", className)}>
      {navItems.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          onClick={() => setMobileMenuOpen(false)}
          className="text-sm font-medium text-gray-300 hover:text-primary transition-colors duration-300 relative after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:w-0 after:h-[2px] after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled ? 'py-4 bg-black/20 backdrop-blur-lg border-b border-white/10' : 'py-6'
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <HolographicLogo />

        <div className="hidden md:flex items-center gap-4">
          <NavLinks />
        </div>

        <div className="md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="h-6 w-6 text-white" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-[#0a0a1a]/90 backdrop-blur-xl border-l-0 w-full">
                <div className="flex flex-col h-full p-6">
                    <div className="flex justify-between items-center mb-12">
                         <HolographicLogo />
                         <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" aria-label="Close menu">
                                <X className="h-6 w-6 text-white" />
                            </Button>
                        </SheetTrigger>
                    </div>
                    <NavLinks className="flex-col items-start gap-8" />
                </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
