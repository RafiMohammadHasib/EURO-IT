
"use client";

import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";
import Link from "next/link";

const pricingTiers = [
  {
    name: "Starter",
    price: "৳15,000",
    description: "Ideal for new businesses and startups looking to establish an online presence.",
    features: [
      "Basic SEO Setup",
      "Social Media Management (2 Platforms)",
      "Monthly Performance Report",
      "4 Social Media Posts per Week",
      "Basic Keyword Targeting",
    ],
    buttonText: "Get Started",
    popular: false,
  },
  {
    name: "Business",
    price: "৳40,000",
    description: "Perfect for growing businesses aiming to expand their reach and engagement.",
    features: [
      "Advanced SEO & Link Building",
      "Social Media Management (3 Platforms)",
      "PPC Campaign Management (up to ৳20k spend)",
      "8 Social Media Posts per Week",
      "2 Blog Articles (500 words each)",
      "Bi-weekly Strategy Calls",
    ],
    buttonText: "Choose Business",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "৳85,000",
    description: "Comprehensive solutions for established brands seeking market leadership.",
    features: [
      "Full-Scale SEO & Content Strategy",
      "Social Media Management (4+ Platforms)",
      "Advanced PPC & Remarketing",
      "16 Social Media Posts per Week",
      "4 Blog Articles & 1 Video Content",
      "Full Analytics & Conversion Optimization",
      "Dedicated Account Manager",
    ],
    buttonText: "Contact Sales",
    popular: false,
  },
  {
    name: "Custom",
    price: "Let's Talk",
    description: "Need a tailored solution? We'll create a custom package that fits your unique goals.",
    features: [
      "Tailored Service Selection",
      "Flexible Scope & Scale",
      "Dedicated Strategy Session",
      "Custom Reporting & KPIs",
      "Priority Support",
    ],
    buttonText: "Inquire Now",
    popular: false,
  },
];

const PricingSection = () => {
  return (
    <section id="pricing" className="section-container">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold glow-text">Flexible Pricing for Your Growth</h2>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Choose a plan that fits your business needs in the Bangladeshi market. All prices are in BDT per month.
        </p>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8 items-stretch">
        {pricingTiers.map((tier) => (
          <div
            key={tier.name}
            className={`glass-card p-8 flex flex-col rounded-2xl transition-all duration-300 relative ${
              tier.popular ? 'border-primary/80 shadow-primary/20 scale-105' : 'border-border'
            }`}
          >
            {tier.popular && (
              <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2">
                <div className="bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider rounded-full px-4 py-1">
                  Most Popular
                </div>
              </div>
            )}
            <h3 className="text-2xl font-bold text-center glow-text">{tier.name}</h3>
            <p className="text-4xl font-bold text-center my-6">{tier.price}
              {tier.name !== "Custom" && <span className="text-lg font-medium text-muted-foreground">/mo</span>}
            </p>
            <p className="text-muted-foreground text-center min-h-[60px] mb-6">{tier.description}</p>
            
            <ul className="space-y-4 mb-8 flex-grow">
              {tier.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <Check className="w-5 h-5 text-primary mr-3 flex-shrink-0 mt-1" />
                  <span className="text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>
            <Link href="/#contact" className="w-full mt-auto">
              <Button size="lg" className="w-full group hover:shadow-lg hover:shadow-primary/40 transition-all duration-300 transform hover:scale-105">
                {tier.buttonText}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PricingSection;
