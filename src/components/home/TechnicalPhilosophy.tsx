"use client";

import { Reveal } from "@/components/animations/Reveal";
import { Zap, Shield, Cpu, Layout, Layers, Search } from "lucide-react";

const PHILOSOPHIES = [
  {
    title: "PERFORMANCE_OPTIMIZATION",
    icon: Zap,
    description: "Focusing on Core Web Vitals, LCP < 1.2s, and minimizing JS execution time. Every millisecond counts for user retention.",
    stats: "LCP < 1.2s | CLS < 0.1"
  },
  {
    title: "SCALABLE_ARCHITECTURE",
    icon: Layers,
    description: "Implementing modular, atomic design patterns and feature-sliced architecture for maintainable large-scale applications.",
    stats: "MODULAR | ATOMIC | DRY"
  },
  {
    title: "TYPE_SAFE_DEVELOPMENT",
    icon: Shield,
    description: "Leveraging TypeScript to its fullest to catch errors at compile time and provide a self-documenting developer experience.",
    stats: "STRICT_TS | ZERO_ANY"
  },
  {
    title: "A11Y_&_SEMANTIC_HTML",
    icon: Layout,
    description: "Ensuring applications are accessible to everyone by following WCAG standards and using semantic HTML5 elements.",
    stats: "WCAG 2.1 | ARIA_LEVEL_1"
  }
];

export function TechnicalPhilosophy() {
  return (
    <section id="philosophy" className="py-24 px-4 relative overflow-hidden bg-primary/5">
      <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-10 pointer-events-none" />
      
      <div className="container mx-auto max-w-5xl relative z-10">
        <Reveal>
          <div className="flex items-center gap-2 mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-semibold text-primary tracking-wide">
              <span className="text-secondary">#</span> technical.philosophy
            </h2>
            <div className="h-[2px] flex-1 bg-gradient-to-r from-primary/50 to-transparent ml-4"></div>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PHILOSOPHIES.map((item, idx) => (
            <Reveal key={idx} delay={idx * 0.1} direction={idx % 2 === 0 ? "right" : "left"}>
              <div className="terminal-panel p-8 group hover:border-primary/50 transition-all duration-300 h-full flex flex-col">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-heading font-bold text-foreground group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                </div>
                
                <p className="text-secondary font-terminal text-sm leading-relaxed mb-8 flex-1">
                  {item.description}
                </p>
                
                <div className="pt-4 border-t border-border/50 flex items-center justify-between font-terminal text-[10px] tracking-widest text-primary/50 uppercase">
                  <span>METRICS: {item.stats}</span>
                  <span className="animate-pulse">ONLINE</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
