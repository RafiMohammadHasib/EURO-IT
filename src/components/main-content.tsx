"use client";

import HeroSection from "@/components/sections/hero-section";
import ServicesSection from "@/components/sections/services-section";
import AboutSection from "@/components/sections/about-section";
import PortfolioSection from "@/components/sections/portfolio-section";
import ContactSection from "@/components/sections/contact-section";

export default function MainContent() {
    return (
        <>
            <HeroSection />
            <ServicesSection />
            <AboutSection />
            <PortfolioSection />
            <ContactSection />
        </>
    );
}