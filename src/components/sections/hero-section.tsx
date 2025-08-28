"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import TypewriterEffect from "@/components/typewriter-effect";
import Link from "next/link";
import { motion } from "framer-motion";

const HeroSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section id="home" className="h-screen flex items-center justify-center text-center -mt-20">
      <motion.div
        className="relative z-10 flex flex-col items-center max-w-4xl mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-foreground/80 to-foreground mb-6"
          variants={itemVariants}
        >
          Results-Driven Digital Marketing.
        </motion.h1>
        <motion.div
          className="text-lg md:text-xl text-muted-foreground mb-10 h-14 md:h-7"
          variants={itemVariants}
        >
          <TypewriterEffect />
        </motion.div>
        <motion.div variants={itemVariants}>
          <Link href="#services">
            <Button size="lg" className="text-base font-semibold rounded-full px-8 py-6 group hover:shadow-lg hover:shadow-primary/40 transition-all duration-300 transform hover:scale-105">
              Our Marketing Services
              <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
