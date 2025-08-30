
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Copyright, Facebook, Linkedin, Instagram, Youtube } from "lucide-react";
import HolographicLogo from '@/components/holographic-logo';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';

const navItems = [
  { name: 'About Us', href: '/#about' },
  { name: 'Services', href: '/#services' },
  { name: 'Portfolio', href: '/#portfolio' },
  { name: 'Blog', href: '/#blog' },
  { name: 'Contact', href: '/#contact' },
  { name: 'Privacy Policy', href: '/privacy-policy' },
  { name: 'Terms & Conditions', href: '/terms-and-conditions' },
];

const socialLinks = [
  { icon: Facebook, href: 'https://www.facebook.com/euroitech/', name: 'Facebook' },
  { icon: Linkedin, href: 'https://bd.linkedin.com/in/euro-it', name: 'LinkedIn' },
  { icon: Instagram, href: 'https://www.instagram.com/euroitofficial', name: 'Instagram' },
  { icon: Youtube, href: '#', name: 'YouTube' },
]

const Footer = () => {
  const [currentYear, setCurrentYear] = useState<number | null>(null);
  const { theme } = useTheme();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
    setIsClient(true);
  }, []);

  const headingClasses = isClient && theme === 'light' ? 'text-foreground' : 'text-white';
  const textClasses = isClient && theme === 'light' ? 'text-muted-foreground' : 'text-gray-300';
  const linkClasses = isClient && theme === 'light' ? 'text-muted-foreground hover:text-primary' : 'text-gray-300 hover:text-primary';
  const socialIconClasses = isClient && theme === 'light' ? 'text-muted-foreground hover:text-primary' : 'text-gray-400 hover:text-primary';

  return (
    <footer className="w-full py-12 mt-auto bg-card border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <HolographicLogo />
            <p className={cn("mt-4 text-sm", textClasses)}>
              Euro IT is a leading technology solutions provider specializing in Digital Marketing, ERP systems, and custom web solutions. Elevate your business with cutting-edge digital transformation.
            </p>
          </div>
          
          <div>
            <h3 className={cn("font-headline text-lg font-semibold tracking-wider", headingClasses)}>Quick Links</h3>
            <ul className="mt-4 space-y-2">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className={cn("text-sm transition-colors duration-300", linkClasses)}>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className={cn("font-headline text-lg font-semibold tracking-wider", headingClasses)}>Contact Us</h3>
            <div className={cn('text-sm mt-4 space-y-2', textClasses)}>
              <p className={cn("font-semibold", headingClasses)}>BD Bangladesh Office</p>
              <p>Address: Regnum Resource Limited, Rahman's Regnum Centre Business Suite, Tejgaon C/A, Dhaka- 1208, Bangladesh.</p>
              <p>Phone: +880 1339-844255</p>
              <p>Email: euroitofficial@gmail.com</p>
            </div>
          </div>
          
          <div>
            <h3 className={cn("font-headline text-lg font-semibold tracking-wider", headingClasses)}>Follow Us</h3>
            <div className="flex mt-4 space-x-4">
              {socialLinks.map(social => (
                <a key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.name} className={cn("transition-colors duration-300", socialIconClasses)}>
                  <social.icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border text-center text-muted-foreground text-sm flex items-center justify-center gap-2">
          <Copyright className="h-4 w-4" />
          {isClient && <span>{currentYear} EURO IT. All Rights Reserved.</span>}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
