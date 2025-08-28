"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Copyright, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import HolographicLogo from '@/components/holographic-logo';

const navItems = [
  { name: 'Services', href: '#services' },
  { name: 'About', href: '#about' },
  { name: 'Portfolio', href: '#portfolio' },
  { name: 'Contact', href: '#contact' },
];

const socialLinks = [
  { icon: Facebook, href: '#', name: 'Facebook' },
  { icon: Twitter, href: '#', name: 'Twitter' },
  { icon: Linkedin, href: '#', name: 'LinkedIn' },
  { icon: Instagram, href: '#', name: 'Instagram' },
]

const Footer = () => {
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="w-full py-12 mt-auto bg-black/20 border-t border-white/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <HolographicLogo />
            <p className="mt-4 text-muted-foreground text-sm">
              Elevating brands with data-driven digital marketing strategies.
            </p>
          </div>
          
          <div>
            <h3 className="font-headline text-lg font-semibold text-white tracking-wider">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm text-gray-300 hover:text-primary transition-colors duration-300">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-headline text-lg font-semibold text-white tracking-wider">Contact Us</h3>
            <ul className="mt-4 space-y-2 text-sm text-gray-300">
              <li>contact@euroit.com</li>
              <li>+1 234 567 890</li>
              <li>123 Marketing Lane, Digital City, CA</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-headline text-lg font-semibold text-white tracking-wider">Follow Us</h3>
            <div className="flex mt-4 space-x-4">
              {socialLinks.map(social => (
                <a key={social.name} href={social.href} aria-label={social.name} className="text-gray-400 hover:text-primary transition-colors duration-300">
                  <social.icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-white/10 text-center text-muted-foreground text-sm flex items-center justify-center gap-2">
          <Copyright className="h-4 w-4" />
          {currentYear && <span>{currentYear} EURO IT. All Rights Reserved.</span>}
        </div>
      </div>
    </footer>
  );
};

export default Footer;