
"use client";

import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import TopBar from "@/components/layout/top-bar";
import dynamic from "next/dynamic";
import HeroSection from "@/components/sections/hero-section";

const ServicesSection = dynamic(() => import('@/components/sections/services-section'));
const AboutSection = dynamic(() => import('@/components/sections/about-section'));
const PortfolioSection = dynamic(() => import('@/components/sections/portfolio-section'));
const BlogSection = dynamic(() => import('@/components/sections/blog-section'));
const PricingSection = dynamic(() => import('@/components/sections/pricing-section'));
const ContactSection = dynamic(() => import('@/components/sections/contact-section'));
const FaqSection = dynamic(() => import('@/components/sections/faq-section'));


export default function Home() {
  return (
    <div className="relative flex flex-col min-h-screen bg-transparent">
      <div className="relative z-10 flex flex-col flex-1">
        <TopBar />
        <Header />
        <main className="px-4 sm:px-6 lg:px-8 flex-grow">
          <HeroSection />
          <ServicesSection />
          <AboutSection />
          <PortfolioSection />
          <BlogSection />
          <PricingSection />
          <ContactSection />
          <FaqSection />
        </main>
        <Footer />
      </div>
    </div>
  );
}
