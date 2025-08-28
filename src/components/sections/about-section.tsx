import { AnimatedStats } from "@/components/animated-stats";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Users, Target, Eye } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const teamMembers = [
  { name: 'Md. Zakir Sikder', role: 'Founder', image: '/images/team/md-zakir-sikder.jpg' },
  { name: 'Md. Jony Sikder', role: 'Group Chairman', image: '/images/team/md-jony-sikder.jpg' },
  { name: 'Efaz Sikder', role: 'Managing Director', image: '/images/team/efaz-sikder.jpg' },
  { name: 'Jakir Hossain', role: 'Group GM', image: '/images/team/jakir-hossain.jpg' },
  { name: 'Syed Mominin Islam Tamim', role: 'Creative Designer', image: '/images/team/syed-mominin-islam-tamim.jpg' },
  { name: 'Md. Shakil Mahmud', role: 'Head of Creative Lead', image: '/images/team/md-shakil-mahmud.jpg' },
  { name: 'Samia Chowdhury', role: 'Graphics Design & Video Editing', image: '/images/team/samia-chowdhury.jpg' },
  { name: 'Rafi Md. Hasib', role: 'Software Engineer & Business Developer', image: '/images/team/rafi-md-hasib.jpg' },
];

const AboutSection = () => {
  return (
    <section id="about" className="section-container">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold glow-text">About EURO IT</h2>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Driving growth for ambitious brands with creative digital marketing strategies.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-20 text-center">
        <div className="glass-card p-8 flex flex-col items-center">
          <div className="p-4 bg-primary/20 rounded-full mb-4">
            <Users className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-2xl font-bold mb-2">Who We Are</h3>
          <p className="text-muted-foreground">We are a team of passionate marketers, strategists, and creatives dedicated to helping your brand shine online.</p>
        </div>
        <div className="glass-card p-8 flex flex-col items-center">
          <div className="p-4 bg-primary/20 rounded-full mb-4">
            <Target className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-2xl font-bold mb-2">Our Mission</h3>
          <p className="text-muted-foreground">To deliver measurable results and exceptional ROI through innovative and data-driven digital marketing solutions.</p>
        </div>
        <div className="glass-card p-8 flex flex-col items-center">
          <div className="p-4 bg-primary/20 rounded-full mb-4">
            <Eye className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-2xl font-bold mb-2">Our Vision</h3>
          <p className="text-muted-foreground">To be the leading digital partner for businesses seeking to dominate their online space and achieve sustainable growth.</p>
        </div>
      </div>

      <div className="mb-20">
        <AnimatedStats />
      </div>

      <div>
        <h3 className="text-3xl font-bold text-center mb-12 glow-text">Some of Our Key Members</h3>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-xs sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl mx-auto"
        >
          <CarouselContent className="-ml-4">
            {teamMembers.map((member, index) => (
              <CarouselItem key={index} className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                 <div className="flex-shrink-0 w-full glass-card group p-0 overflow-hidden text-center transition-all duration-300 hover:shadow-primary/20 hover:border-primary/50 transform hover:-translate-y-2">
                    <div className="relative h-64">
                      <Image src={member.image} alt={member.name} data-ai-hint="person portrait" fill style={{ objectFit: 'cover' }} className="grayscale group-hover:grayscale-0 transition-all duration-300 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                       <div className="absolute bottom-0 left-0 right-0 p-4 text-left">
                          <h4 className="text-lg font-bold text-white">{member.name}</h4>
                          <p className="text-sm text-primary">{member.role}</p>
                       </div>
                    </div>
                  </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
};

export default AboutSection;
