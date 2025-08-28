"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import TypewriterEffect from "@/components/typewriter-effect";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section id="home" className="h-screen flex items-center justify-center text-center -mt-20">
      <div className="relative z-10 flex flex-col items-center max-w-4xl mx-auto px-4">
        <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400 mb-6 glow-text animate-fade-in-down">
          Engineering Tomorrow's Technology, Today.
        </h1>
        <div className="text-lg md:text-xl text-muted-foreground mb-10 h-14 md:h-7">
          <TypewriterEffect />
        </div>
        <Link href="#services">
          <Button size="lg" className="bg-primary text-primary-foreground text-base font-semibold rounded-full px-8 py-6 group hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/40 transition-all duration-300 transform hover:scale-105">
            Explore Our Solutions
            <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>

       <style jsx>{`
        @keyframes fade-in-down {
            0% {
                opacity: 0;
                transform: translateY(-20px);
            }
            100% {
                opacity: 1;
                transform: translateY(0);
            }
        }
        .animate-fade-in-down {
            animation: fade-in-down 1s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
