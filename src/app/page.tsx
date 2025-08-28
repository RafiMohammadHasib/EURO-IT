import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import ClientParticleBackground from "@/components/client-particle-background";
import MainContent from "@/components/main-content";


export default function Home() {
  return (
    <div className="relative flex flex-col min-h-screen bg-[#0a0a1a] bg-gradient-to-br from-[#0a0a1a] to-[#1a1a3a]">
      <ClientParticleBackground />
      <div className="relative z-10 flex flex-col flex-1">
        <Header />
        <main className="px-4 sm:px-6 lg:px-8 flex-grow">
          <MainContent />
        </main>
        <Footer />
      </div>
    </div>
  );
}
