"use client";

import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import ServicesSection from "@/components/sections/services-section";
import AboutSection from "@/components/sections/about-section";
import PortfolioSection from "@/components/sections/portfolio-section";
import ContactSection from "@/components/sections/contact-section";
import TopBar from "@/components/layout/top-bar";
import BlogSection from "@/components/sections/blog-section";
import FaqSection from "@/components/sections/faq-section";
import HeroWrapper from "@/components/hero-wrapper";


export default function Home() {
  return (
    <div className="relative flex flex-col min-h-screen bg-transparent">
      <div className="relative z-10 flex flex-col flex-1">
        <TopBar />
        <Header />
        <main className="px-4 sm:px-6 lg:px-8 flex-grow">
          <HeroWrapper />
          <ServicesSection />
          <AboutSection />
          <PortfolioSection />
          <BlogSection />
          <ContactSection />
          <FaqSection />
        </main>
        <Footer />
      </div>
    </div>
  );
}
