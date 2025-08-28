"use client";

import { Mail, Phone, Facebook, Linkedin, Instagram, Youtube } from "lucide-react";

const socialLinks = [
  { icon: Facebook, href: 'https://www.facebook.com/euroitech/', name: 'Facebook' },
  { icon: Linkedin, href: 'https://bd.linkedin.com/in/euro-it', name: 'LinkedIn' },
  { icon: Instagram, href: 'https://www.instagram.com/euroitofficial', name: 'Instagram' },
  { icon: Youtube, href: '#', name: 'YouTube' },
]

const TopBar = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-lg border-b border-primary/20 text-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-12">
        <div className="flex items-center gap-6">
          <a href="mailto:euroitofficial@gmail.com" className="flex items-center gap-2 text-gray-300 hover:text-primary transition-colors">
            <Mail className="w-4 h-4" />
            <span className="hidden md:inline">euroitofficial@gmail.com</span>
          </a>
          <a href="tel:+8801339844255" className="flex items-center gap-2 text-gray-300 hover:text-primary transition-colors">
            <Phone className="w-4 h-4" />
            <span className="hidden md:inline">+880 1339-844255</span>
          </a>
        </div>
        <div className="flex items-center gap-4">
            {socialLinks.map(social => (
                <a key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.name} className="text-gray-300 hover:text-primary transition-colors duration-300">
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
        </div>
      </div>
    </div>
  );
};

export default TopBar;
