"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { ExternalLink } from 'lucide-react';

const projects = [
  { id: 1, title: 'AI-Powered Analytics Platform', category: 'AI/ML', image: 'https://picsum.photos/600/400?random=4', description: 'A cutting-edge platform for real-time data analysis.' },
  { id: 2, title: 'Cloud-Native E-commerce Solution', category: 'Web', image: 'https://picsum.photos/600/400?random=5', description: 'Scalable and secure e-commerce architecture.' },
  { id: 3, title: 'Cybersecurity Threat Detector', category: 'Security', image: 'https://picsum.photos/600/400?random=6', description: 'Proactive threat detection using machine learning.' },
  { id: 4, title: 'Mobile Banking Super App', category: 'Mobile', image: 'https://picsum.photos/600/400?random=7', description: 'A comprehensive mobile banking experience.' },
  { id: 5, title: 'Decentralized Finance App', category: 'Web', image: 'https://picsum.photos/600/400?random=8', description: 'Secure and transparent DeFi application on blockchain.' },
  { id: 6, title: 'IoT Smart Home System', category: 'AI/ML', image: 'https://picsum.photos/600/400?random=9', description: 'Integrated smart home automation using IoT devices.' },
];

const categories = ['All', 'Web', 'Mobile', 'AI/ML', 'Security'];

const PortfolioSection = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <section id="portfolio" className="section-container">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold glow-text">Our Portfolio</h2>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          A showcase of our successful projects and innovative solutions.
        </p>
      </div>

      <div className="flex justify-center flex-wrap gap-2 mb-12">
        {categories.map(category => (
          <Button
            key={category}
            variant="ghost"
            onClick={() => setActiveCategory(category)}
            className={cn(
              'rounded-full transition-all duration-300',
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
               <Image src={project.image} alt={project.title} data-ai-hint="abstract technology" fill style={{ objectFit: 'cover' }} className="transition-transform duration-500 group-hover:scale-110" />
               <div className="absolute inset-0 bg-black/50 group-hover:bg-black/70 transition-all duration-300" />
            </div>
            <div className="p-6">
              <span className="text-xs font-semibold text-primary uppercase">{project.category}</span>
              <h3 className="text-xl font-bold text-white mt-2 mb-3 h-14">{project.title}</h3>
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
