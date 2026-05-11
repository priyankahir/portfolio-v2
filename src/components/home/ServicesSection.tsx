"use client";

import { Reveal } from "@/components/animations/Reveal";
import { Code2, Gauge, Layout, Layers, Shield, Zap } from "lucide-react";
import { motion } from "framer-motion";

const SERVICES = [
  {
    title: "Custom Web Applications",
    description: "Building high-performance, scalable web applications using the latest Next.js and React features.",
    icon: Code2,
    tag: "NEXT_JS_16"
  },
  {
    title: "Performance Optimization",
    description: "Achieving perfect Core Web Vitals scores through advanced caching, image optimization, and code splitting.",
    icon: Gauge,
    tag: "SPEED_MAX"
  },
  {
    title: "Interactive UI/UX",
    description: "Creating immersive user experiences with smooth animations and intuitive interface designs using Framer Motion.",
    icon: Layout,
    tag: "PREMIUM_UI"
  },
  {
    title: "Scalable Architecture",
    description: "Designing maintainable codebases with solid state management and efficient API integrations.",
    icon: Layers,
    tag: "CLEAN_CODE"
  },
  {
    title: "Secure Protocols",
    description: "Implementing best practices for security and data protection in modern web environments.",
    icon: Shield,
    tag: "SECURE_ENV"
  },
  {
    title: "Real-time Solutions",
    description: "Developing fast, reactive interfaces that provide instantaneous feedback to user interactions.",
    icon: Zap,
    tag: "INSTANT_SYNC"
  }
];

export function ServicesSection() {
  return (
    <section id="services" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <Reveal>
          <div className="flex items-center gap-2 mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-semibold text-primary tracking-wide uppercase">
              <span className="text-secondary">#</span> specialized.services
            </h2>
            <div className="h-[2px] flex-1 bg-gradient-to-r from-primary/50 to-transparent ml-4"></div>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, index) => (
            <Reveal key={index} delay={index * 0.1} direction="up">
              <motion.div 
                whileHover={{ y: -8, scale: 1.02 }}
                className="terminal-panel p-8 h-full group relative overflow-hidden transition-all duration-500 flex flex-col hover:shadow-[0_0_30px_rgba(0,255,65,0.15)] dark:hover:shadow-[0_0_30px_rgba(0,255,65,0.1)] border-primary/10 hover:border-primary/50"
              >
                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                <div className="relative z-10 flex justify-between items-start mb-6">
                  <div className="w-12 h-12 rounded bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all duration-500 shadow-[0_0_15px_rgba(0,255,65,0.1)]">
                    <service.icon className="w-6 h-6 transition-transform duration-500 group-hover:rotate-12" />
                  </div>
                  <span className="font-terminal text-[9px] text-secondary/40 tracking-widest uppercase border border-border/30 px-2 py-0.5 rounded group-hover:text-primary group-hover:border-primary/30 transition-colors duration-500">
                    {service.tag}
                  </span>
                </div>
                
                <h3 className="relative z-10 text-xl font-heading font-bold mb-4 text-foreground group-hover:text-primary transition-colors duration-500">
                  {service.title}
                </h3>
                
                <p className="relative z-10 text-secondary text-sm font-terminal leading-relaxed flex-1 group-hover:text-foreground/80 transition-colors duration-500">
                  {service.description}
                </p>
                
                {/* Decorative corner element */}
                <div className="absolute bottom-0 right-0 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute bottom-2 right-2 w-1 h-1 bg-primary rounded-full shadow-[0_0_10px_rgba(0,255,65,1)]" />
                  <div className="absolute bottom-0 right-0 w-full h-full border-r border-b border-primary/20 rounded-br-lg" />
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
