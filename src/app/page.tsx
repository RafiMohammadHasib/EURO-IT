
"use client";

import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import TopBar from "@/components/layout/top-bar";
import dynamic from "next/dynamic";
import { useMounted } from "@/hooks/use-mounted";
import HeroSection from "@/components/sections/hero-section";

const ServicesSection = dynamic(() => import('@/components/sections/services-section'), { ssr: false });
const AboutSection = dynamic(() => import('@/components/sections/about-section'), { ssr: false });
const PortfolioSection = dynamic(() => import('@/components/sections/portfolio-section'), { ssr: false });
const BlogSection = dynamic(() => import('@/components/sections/blog-section'), { ssr: false });
const PricingSection = dynamic(() => import('@/components/sections/pricing-section'), { ssr: false });
const ContactSection = dynamic(() => import('@/components/sections/contact-section'), { ssr: false });
const FaqSection = dynamic(() => import('@/components/sections/faq-section'), { ssr: false });


export default function Home() {
    const isMounted = useMounted();
  return (
    <div className="relative flex flex-col min-h-screen bg-transparent">
      <div className="relative z-10 flex flex-col flex-1">
        <TopBar />
        <Header />
        <main className="px-4 sm:px-6 lg:px-8 flex-grow">
          <HeroSection />
            {isMounted && (
                <>
                    <ServicesSection />
                    <AboutSection />
                    <PortfolioSection />
                    <BlogSection />
                    <PricingSection />
                    <ContactSection />
                    <FaqSection />
                </>
            )}
        </main>
        <Footer />
      </div>
    </div>
  );
}
