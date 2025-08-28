import { Code, Cloud, Shield, Database, BrainCircuit, Smartphone } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Service = {
  title: string;
  description: string;
  icon: LucideIcon;
};

const services: Service[] = [
  {
    title: "Custom Software Development",
    description: "Tailor-made software solutions to fit your unique business needs and drive growth.",
    icon: Code,
  },
  {
    title: "Cloud & DevOps",
    description: "Scalable cloud infrastructure and streamlined development pipelines for maximum efficiency.",
    icon: Cloud,
  },
  {
    title: "Cybersecurity Solutions",
    description: "Protect your digital assets with our comprehensive, multi-layered security services.",
    icon: Shield,
  },
  {
    title: "Data & Analytics",
    description: "Unlock valuable insights from your data to make informed business decisions.",
    icon: Database,
  },
  {
    title: "AI & Machine Learning",
    description: "Leverage the power of AI to automate processes and create intelligent applications.",
    icon: BrainCircuit,
  },
  {
    title: "Mobile App Development",
    description: "Engaging and high-performance mobile applications for both iOS and Android platforms.",
    icon: Smartphone,
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="section-container">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold glow-text">Our Services</h2>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          We provide a wide range of technology services to power your success.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <div key={index} className="glass-card p-8 group transition-all duration-300 hover:border-primary/50 hover:shadow-primary/20 transform hover:-translate-y-2">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6 border border-primary/20 transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-110">
              <service.icon className="w-8 h-8 text-primary transition-transform duration-300 group-hover:rotate-12" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">{service.title}</h3>
            <p className="text-muted-foreground">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
