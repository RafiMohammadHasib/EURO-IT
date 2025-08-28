"use client";

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const blogPosts = [
  {
    id: 1,
    title: 'The Rise of AI in Digital Marketing',
    category: 'Artificial Intelligence',
    date: 'October 26, 2023',
    image: 'https://picsum.photos/600/400?random=13',
    dataAiHint: 'artificial intelligence marketing',
    excerpt: 'Explore how AI is revolutionizing marketing strategies, from personalization to predictive analytics.'
  },
  {
    id: 2,
    title: 'Navigating Facebook\'s Latest Ad Policy Updates',
    category: 'Social Media',
    date: 'October 22, 2023',
    image: 'https://picsum.photos/600/400?random=14',
    dataAiHint: 'social media policy',
    excerpt: 'Stay compliant and optimize your campaigns by understanding the newest changes to Facebook\'s advertising rules.'
  },
  {
    id: 3,
    title: 'Web3 and the Future of the Internet',
    category: 'Latest Inventions',
    date: 'October 18, 2023',
    image: 'https://picsum.photos/600/400?random=15',
    dataAiHint: 'web3 blockchain technology',
    excerpt: 'A deep dive into the decentralized web and what it means for businesses and users alike.'
  },
];

const BlogSection = () => {
  return (
    <section id="blog" className="section-container">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold glow-text">From Our Blog</h2>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Insights on digital marketing, technology trends, and platform policies.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <div key={post.id} className="glass-card group p-0 overflow-hidden flex flex-col transition-all duration-300 hover:shadow-primary/20 hover:border-primary/50 transform hover:-translate-y-2">
            <div className="relative h-56 w-full">
               <Image src={post.image} alt={post.title} data-ai-hint={post.dataAiHint} fill style={{ objectFit: 'cover' }} className="transition-transform duration-500 group-hover:scale-110" />
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-semibold text-primary uppercase">{post.category}</span>
                <span className="text-xs text-muted-foreground">{post.date}</span>
              </div>
              <h3 className="text-xl font-bold text-white mt-2 mb-3 flex-grow">{post.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{post.excerpt}</p>
              <Button variant="link" className="p-0 h-auto text-primary self-start group">
                Read More
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BlogSection;