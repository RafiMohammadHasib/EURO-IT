
"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { ExternalLink } from 'lucide-react';
import { useTheme } from 'next-themes';

const projects = [
  { id: 1, title: 'Global SEO Campaign for Tech Startup', category: 'SEO', image: 'https://picsum.photos/600/400?random=4', description: 'Achieved 200% organic traffic growth in 6 months.' },
  { id: 2, title: 'Social Media Strategy for Fashion Brand', category: 'Social Media', image: 'https://picsum.photos/600/400?random=5', description: 'Increased engagement by 150% and follower growth by 50K.' },
  { id: 3, title: 'PPC Campaign for E-commerce Store', category: 'PPC', image: 'https://picsum.photos/600/400?random=6', description: 'Generated a 5X return on ad spend (ROAS).' },
  { id: 7, title: 'E-commerce Website for a Retail Brand', category: 'Web Development', image: 'https://picsum.photos/600/400?random=10', description: 'Built a custom Shopify theme, increasing conversion by 25%.' },
  { id: 4, title: 'Content Marketing for a B2B SaaS', category: 'Content', image: 'https://picsum.photos/600/400?random=7', description: 'Drove high-quality leads through insightful blog posts and whitepapers.' },
  { id: 8, title: 'Food Delivery Mobile App', category: 'App Development', image: 'https://picsum.photos/600/400?random=11', description: 'Developed a cross-platform app with 10,000+ downloads in 3 months.' },
  { id: 5, title: 'Email Marketing Automation for Retailer', category: 'Email', image: 'https://picsum.photos/600/400?random=8', description: 'Boosted customer retention and repeat purchases by 30%.' },
  { id: 6, title: 'Influencer Marketing for a New App', category: 'Social Media', image: 'https://picsum.photos/600/400?random=9', description: 'Secured 1M+ impressions through strategic partnerships.' },
  { id: 9, title: 'Custom CRM for a Service Business', category: 'Custom Development', image: 'https://picsum.photos/600/400?random=12', description: 'Streamlined client management and automated workflows, saving 10+ hours/week.' },
];

const categories = ['All', 'SEO', 'Web Development', 'App Development', 'Social Media', 'PPC', 'Content', 'Email', 'Custom Development'];

const PortfolioSection = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const { theme } = useTheme();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  const titleColorClass = isClient && theme === 'light' ? 'text-foreground' : 'text-white';
  
  if (!isClient) {
    return null;
  }

  return (
    <section id="portfolio" className="section-container">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold glow-text">Our Recent Work</h2>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          A showcase of our successful projects and client results.
        </p>
      </div>

      <div className="flex justify-center flex-wrap gap-2 mb-12">
        {categories.map(category => (
          <Button
            key={category}
            variant="ghost"
            onClick={() => setActiveCategory(category)}
            className={cn(
              'rounded-full transition-all duration-300 px-4 py-2 text-sm',
              activeCategory === category
                ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
            )}
          >
            {category}
          </Button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map(project => (
          <div key={project.id} className="glass-card group p-0 overflow-hidden relative transition-all duration-300 hover:shadow-primary/20 hover:border-primary/50">
            <div className="relative h-56 w-full">
               <Image src={project.image} alt={project.title} data-ai-hint="digital marketing abstract" fill style={{ objectFit: 'cover' }} className="transition-transform duration-500 group-hover:scale-110" />
               <div className="absolute inset-0 bg-black/50 group-hover:bg-black/70 transition-all duration-300" />
            </div>
            <div className="p-6">
              <span className="text-xs font-semibold text-primary uppercase">{project.category}</span>
              <h3 className={cn("text-xl font-bold mt-2 mb-3 h-14", isClient ? titleColorClass : 'text-white')}>{project.title}</h3>
              <p className="text-sm text-muted-foreground h-10">{project.description}</p>
            </div>
             <div className="absolute top-4 right-4 p-2 bg-black/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ExternalLink className="w-5 h-5 text-primary" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PortfolioSection;
