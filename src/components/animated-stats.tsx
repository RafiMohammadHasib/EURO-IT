
"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

type Stat = {
  value: number;
  label: string;
  suffix?: string;
};

const stats: Stat[] = [
  { value: 120, label: "Campaigns Launched", suffix: "+" },
  { value: 50, label: "Happy Clients", suffix: "+" },
  { value: 95, label: "Client Satisfaction", suffix: "%" },
  { value: 10, label: "Marketing Experts" },
];

const AnimatedStat = ({ stat }: { stat: Stat }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isInView && isMounted) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 }
      });

      const duration = 2000;
      const frameRate = 1000 / 60;
      const totalFrames = Math.round(duration / frameRate);
      let frame = 0;

      const counter = setInterval(() => {
        frame++;
        const progress = frame / totalFrames;
        setCount(Math.min(stat.value, Math.floor(stat.value * progress * progress)));

        if (frame === totalFrames) {
          clearInterval(counter);
          setCount(stat.value);
        }
      }, frameRate);

      return () => clearInterval(counter);
    }
  }, [isInView, stat.value, controls, isMounted]);

  if (!isMounted) {
      return (
          <div className="text-center">
              <p className="text-5xl md:text-6xl font-bold text-primary glow-text">
                  0{stat.suffix}
              </p>
              <p className="text-muted-foreground mt-2">{stat.label}</p>
          </div>
      );
  }

  return (
    <motion.div
      ref={ref}
      className="text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={controls}
    >
      <p className="text-5xl md:text-6xl font-bold text-primary glow-text">
        {count}{stat.suffix}
      </p>
      <p className="text-muted-foreground mt-2">{stat.label}</p>
    </motion.div>
  );
};

export const AnimatedStats = () => {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
                <AnimatedStat key={stat.label} stat={stat} />
            ))}
        </div>
    );
};
