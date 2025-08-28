"use client";

import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import ClientParticleBackground from "@/components/client-particle-background";
import HeroSection from "@/components/sections/hero-section";
import ServicesSection from "@/components/sections/services-section";
import AboutSection from "@/components/sections/about-section";
import PortfolioSection from "@/components/sections/portfolio-section";
import ContactSection from "@/components/sections/contact-section";
import TopBar from "@/components/layout/top-bar";


export default function Home() {
  return (
    <div className="relative flex flex-col min-h-screen bg-[#0a0a1a] bg-gradient-to-br from-[#0a0a1a] to-[#1a1a3a]">
      <ClientParticleBackground />
      <div className="relative z-10 flex flex-col flex-1">
        <TopBar />
        <Header />
        <main className="px-4 sm:px-6 lg:px-8 flex-grow">
          <HeroSection />
          <ServicesSection />
          <AboutSection />
          <PortfolioSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </div>
  );
}
