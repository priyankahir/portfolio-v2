"use client";

import Link from "next/link";
import { Reveal } from "@/components/animations/Reveal";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PROJECTS = [
  {
    name: "Capability.work",
    status: "ONLINE",
    subtitle: "EHS Training & Work Management Platform",
    stack: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "TanStack Query", "Zustand"],
    description: "Enterprise Environmental, Health & Safety platform supporting training management, incident reporting, and compliance tracking. Features dynamic dashboards, course builder UI, and real-time reporting.",
    impact: "99.9% UPTIME | 40% FASTER_ONBOARDING",
    github: "#",
    live: "#"
  },
  {
    name: "AI Chatbot & Report Intelligence",
    status: "BETA",
    subtitle: "Integrated AI for Capability.work",
    stack: ["React.js", "Next.js", "Claude API", "RAG", "Vector DB", "Zustand"],
    description: "Integrated Claude API chatbot with RAG. Features AI Report Summary generation from uploaded documents, dynamic AI-driven form flows with quality ratings, and seamless human support handoff.",
    impact: "85% AI_QUERY_ACCURACY | 2x RESPONSE_SPEED",
    github: "#",
    live: "#"
  },
  {
    name: "CHRGD Technologies",
    status: "ONLINE",
    subtitle: "Franchise Management SaaS Platform",
    stack: ["React.js", "TypeScript", "Tailwind CSS", "Zustand", "Stripe", "Toast POS"],
    description: "SaaS platform streamlining franchise operations. Implemented automated royalty payment handling via Stripe, real-time order tracking through Toast POS, and role-based access control.",
    impact: "$1M+ TRANSACTION_VOLUME | 300+ NODES",
    github: "#",
    live: "#"
  },
  {
    name: "Rembrandt Advantage",
    status: "MAINTENANCE",
    subtitle: "Psychological Assessment Platform",
    stack: ["React.js", "TypeScript", "Tailwind CSS", "REST APIs"],
    description: "Dynamic report template builder for custom behavioral assessments. Implemented complex conditional form logic and dynamic rendering for personalized output formats.",
    impact: "ZERO_UI_REGRESSIONS | 50+ CUSTOM_TEMPLATES",
    github: "#",
    live: "#"
  },
  {
    name: "Kuber Grow",
    status: "ONLINE",
    subtitle: "Stock Order & Pricing Management",
    stack: ["React.js", "TypeScript", "Tailwind CSS", "TanStack Query", "Axios"],
    description: "Frontend modules for bulk stock purchasing and real-time pricing workflows. Optimized rendering performance for large-volume transactions and strong data consistency.",
    impact: "60% RENDER_OPTIMIZATION | 0.2s DATA_SYNC",
    github: "#",
    live: "#"
  }
];

export function ProjectsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % PROJECTS.length);
    }, 8000); // 8 seconds for senior-level reading
    
    return () => clearInterval(interval);
  }, [isPaused]);

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % PROJECTS.length);
  };

  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + PROJECTS.length) % PROJECTS.length);
  };

  return (
    <section id="projects" className="py-24 px-4 relative bg-primary/5">
      <div className="container mx-auto max-w-5xl">
        <Reveal>
          <div className="flex items-center gap-2 mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-semibold text-primary tracking-wide">
              <span className="text-secondary">#</span> active.deployments
            </h2>
            <div className="h-[2px] flex-1 bg-gradient-to-r from-primary/50 to-transparent ml-4"></div>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div 
            className="relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="terminal-panel flex flex-col h-full group overflow-hidden border-primary/20 shadow-[0_0_50px_rgba(0,0,0,0.3)]"
              >
                {/* Window Controls */}
                <div className="border-b border-border p-3 flex justify-between items-center bg-surface/50">
                  <div className="flex gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/50"></div>
                  </div>
                  <span className="font-terminal text-[10px] text-secondary tracking-widest uppercase">MODULE_PRJKT_{currentIndex + 1}_V2</span>
                  <div className={`font-terminal text-[10px] px-2 py-0.5 border ${PROJECTS[currentIndex].status === 'ONLINE' ? 'text-primary border-primary/30 bg-primary/10' : 'text-accent border-accent/30'}`}>
                    {PROJECTS[currentIndex].status}
                  </div>
                </div>
                
                <div className="p-8 md:p-12 flex-1 flex flex-col relative min-h-[450px]">
                  <div className="absolute top-0 right-0 p-8 opacity-5 text-primary pointer-events-none">
                    <span className="text-9xl font-bold font-terminal">{currentIndex + 1}</span>
                  </div>

                  <h3 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-3 group-hover:text-primary transition-colors tracking-tight">
                    {PROJECTS[currentIndex].name}
                  </h3>
                  <p className="text-primary font-terminal text-sm md:text-base mb-8 opacity-80 uppercase tracking-widest">
                    {PROJECTS[currentIndex].subtitle}
                  </p>
                  
                  <p className="text-secondary mb-10 flex-1 leading-relaxed text-lg font-terminal border-l border-primary/20 pl-6">
                    {PROJECTS[currentIndex].description}
                  </p>
                  
                  <div className="mb-4">
                    <div>
                      <div className="text-[10px] text-primary font-terminal font-bold mb-4 tracking-widest uppercase opacity-50 underline underline-offset-4">DEPENDENCIES</div>
                      <div className="flex flex-wrap gap-2">
                        {PROJECTS[currentIndex].stack.map((tech, i) => (
                          <span key={i} className="text-[10px] font-terminal text-secondary bg-surface border border-border px-2.5 py-1 rounded">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Controls */}
            <div className="flex justify-between items-center mt-12 font-terminal">
              <button 
                onClick={prevProject}
                className="text-secondary hover:text-primary transition-colors flex items-center gap-2 group"
              >
                <span className="text-primary group-hover:-translate-x-1 transition-transform">{"[ PREV_PRJKT ]"}</span>
              </button>
              
              <div className="flex gap-4">
                {PROJECTS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    className={`h-1 rounded-full transition-all ${i === currentIndex ? 'bg-primary w-8 shadow-[0_0_10px_rgba(0,255,65,0.5)]' : 'bg-border w-4 hover:bg-secondary'}`}
                  />
                ))}
              </div>

              <button 
                onClick={nextProject}
                className="text-secondary hover:text-primary transition-colors flex items-center gap-2 group"
              >
                <span className="text-primary group-hover:translate-x-1 transition-transform">{"[ NEXT_PRJKT ]"}</span>
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
