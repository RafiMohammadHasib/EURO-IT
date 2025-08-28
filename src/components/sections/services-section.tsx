import { Megaphone, Search, Users, Mail, BarChart, PenTool, Monitor, Smartphone, Puzzle } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Service = {
  title: string;
  description: string;
  icon: LucideIcon;
};

const services: Service[] = [
  {
    title: "Search Engine Optimization (SEO)",
    description: "Boost your visibility on search engines and drive organic traffic to your site.",
    icon: Search,
  },
  {
    title: "Social Media Marketing",
    description: "Build a strong social presence, engage your audience, and convert followers into customers.",
    icon: Users,
  },
  {
    title: "Pay-Per-Click (PPC) Ads",
    description: "Get immediate, targeted traffic with strategic ad campaigns on Google and social media.",
    icon: Megaphone,
  },
  {
    title: "Content Marketing",
    description: "Attract and retain your audience with valuable, relevant content that builds brand authority.",
    icon: PenTool,
  },
  {
    title: "Email Marketing",
    description: "Nurture leads and build customer loyalty with personalized email campaigns.",
    icon: Mail,
  },
  {
    title: "Analytics & Data Insights",
    description: "Make data-driven decisions with in-depth analytics and actionable reporting.",
    icon: BarChart,
  },
  {
    title: "Website Development",
    description: "Creating stunning, high-performance websites that convert visitors into customers.",
    icon: Monitor,
  },
  {
    title: "App Development",
    description: "Building intuitive and engaging mobile apps for iOS and Android platforms.",
    icon: Smartphone,
  },
  {
    title: "Custom Development",
    description: "Tailored software solutions to meet your unique business needs and challenges.",
    icon: Puzzle,
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="section-container">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold glow-text">Our Services</h2>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          We offer a complete suite of digital marketing and development services to grow your brand.
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
