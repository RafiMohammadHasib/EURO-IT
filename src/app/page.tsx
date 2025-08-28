import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import HeroSection from "@/components/sections/hero-section";
import ServicesSection from "@/components/sections/services-section";
import AboutSection from "@/components/sections/about-section";
import PortfolioSection from "@/components/sections/portfolio-section";
import ContactSection from "@/components/sections/contact-section";
import ParticleBackground from "@/components/particle-background";

export default function Home() {
  return (
    <div className="relative flex flex-col min-h-screen">
      <ParticleBackground />
      <div className="relative z-10 flex flex-col flex-1">
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
