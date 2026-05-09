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
    github: "#",
    live: "#"
  },
  {
    name: "AI Chatbot & Report Intelligence",
    status: "BETA",
    subtitle: "Integrated AI for Capability.work",
    stack: ["React.js", "Next.js", "Claude API", "RAG", "Vector DB", "Zustand"],
    description: "Integrated Claude API chatbot with RAG. Features AI Report Summary generation from uploaded documents, dynamic AI-driven form flows with quality ratings, and seamless human support handoff with live agent rooms.",
    github: "#",
    live: "#"
  },
  {
    name: "CHRGD Technologies",
    status: "ONLINE",
    subtitle: "Franchise Management SaaS Platform",
    stack: ["React.js", "TypeScript", "Tailwind CSS", "Zustand", "Stripe", "Toast POS"],
    description: "SaaS platform streamlining franchise operations. Implemented automated royalty payment handling via Stripe, real-time order tracking through Toast POS, and role-based access control dashboards.",
    github: "#",
    live: "#"
  },
  {
    name: "Rembrandt Advantage",
    status: "MAINTENANCE",
    subtitle: "Psychological Assessment Platform",
    stack: ["React.js", "TypeScript", "Tailwind CSS", "REST APIs"],
    description: "Dynamic report template builder for custom behavioral assessments. Implemented complex conditional form logic and dynamic rendering for personalized output formats.",
    github: "#",
    live: "#"
  },
  {
    name: "Kuber Grow",
    status: "ONLINE",
    subtitle: "Stock Order & Pricing Management",
    stack: ["React.js", "TypeScript", "Tailwind CSS", "TanStack Query", "Axios"],
    description: "Frontend modules for bulk stock purchasing and real-time pricing workflows. Optimized rendering performance for large-volume transactions and strong data consistency.",
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
    }, 5000); // 5 seconds interval
    
    return () => clearInterval(interval);
  }, [isPaused]);

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % PROJECTS.length);
  };

  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + PROJECTS.length) % PROJECTS.length);
  };

  return (
    <section id="projects" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-4xl">
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
            className="relative min-h-[500px]"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="terminal-panel flex flex-col h-full group overflow-hidden terminal-panel-hover relative"
              >
                <div className="border-b border-border p-2 sm:p-3 flex flex-wrap sm:flex-nowrap justify-between items-center gap-2 bg-surface">
                  <span className="font-terminal text-xs sm:text-sm text-secondary group-hover:text-primary transition-colors truncate max-w-full">./run_project_{currentIndex + 1}.sh</span>
                  <div className="flex items-center gap-2 sm:gap-4 ml-auto">
                    <span className="font-terminal text-xs text-secondary hidden sm:inline-block">[{currentIndex + 1}/{PROJECTS.length}]</span>
                    <span className={`font-terminal text-[10px] sm:text-xs px-2 py-0.5 border whitespace-nowrap ${PROJECTS[currentIndex].status === 'ONLINE' ? 'text-primary border-primary/30 bg-primary/10 animate-pulse' : 'text-accent border-accent/30 bg-accent/10'}`}>
                      {PROJECTS[currentIndex].status}
                    </span>
                  </div>
                </div>
                
                <div className="p-6 md:p-10 flex-1 flex flex-col relative z-10 min-h-[350px]">
                  <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
                  
                  <h3 className="text-2xl md:text-4xl font-heading font-bold text-white mb-2 group-hover:text-primary transition-colors flex items-center gap-2 tracking-wide">
                    <span className="text-primary animate-blink">{"_"}</span>
                    {PROJECTS[currentIndex].name}
                  </h3>
                  <p className="text-accent font-medium text-sm md:text-base mb-6 border-b border-border/30 pb-4 inline-block w-fit">
                    {PROJECTS[currentIndex].subtitle}
                  </p>
                  
                  <p className="text-zinc-300 mb-8 flex-1 leading-loose text-base md:text-lg font-sans">
                    {PROJECTS[currentIndex].description}
                  </p>
                  
                  <div className="mb-8">
                    <div className="text-xs text-secondary font-terminal mb-3">DEPENDENCIES:</div>
                    <div className="flex flex-wrap gap-2">
                      {PROJECTS[currentIndex].stack.map((tech, i) => (
                        <span key={i} className="text-xs md:text-sm font-terminal text-primary bg-surface px-3 py-1.5 border border-border-focus rounded shadow-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-border mt-auto font-terminal">
                    <Link 
                      href={PROJECTS[currentIndex].live} 
                      className="flex-1 text-center py-3 text-primary bg-primary/10 hover:bg-primary hover:text-black transition-colors interactive border border-primary/50 hover:border-primary text-sm font-bold shadow-[0_0_10px_rgba(0,255,65,0.1)] hover:shadow-[0_0_15px_rgba(0,255,65,0.4)]"
                    >
                      [ LIVE_DEMO ]
                    </Link>
                    <Link 
                      href={PROJECTS[currentIndex].github} 
                      className="flex-1 text-center py-3 text-secondary hover:text-primary border border-border hover:border-primary transition-colors interactive text-sm"
                    >
                      [ VIEW_SRC ]
                    </Link>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Slider Controls */}
            <div className="flex justify-between items-center mt-6 font-terminal">
              <button 
                onClick={prevProject}
                className="text-secondary hover:text-primary transition-colors px-2 py-2 sm:px-4 sm:py-2 border border-transparent hover:border-primary rounded interactive terminal-glow-hover flex items-center gap-1 sm:gap-2 text-sm"
              >
                <span className="text-primary">{"<"}</span> <span className="hidden sm:inline">PREV_MODULE</span>
              </button>
              
              <div className="flex gap-2">
                {PROJECTS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    className={`w-2 h-2 rounded-full transition-all interactive ${i === currentIndex ? 'bg-primary shadow-[0_0_8px_rgba(0,255,65,0.8)] w-4' : 'bg-border hover:bg-secondary'}`}
                    aria-label={`Go to project ${i + 1}`}
                  />
                ))}
              </div>

              <button 
                onClick={nextProject}
                className="text-secondary hover:text-primary transition-colors px-2 py-2 sm:px-4 sm:py-2 border border-transparent hover:border-primary rounded interactive terminal-glow-hover flex items-center gap-1 sm:gap-2 text-sm"
              >
                <span className="hidden sm:inline">NEXT_MODULE</span> <span className="text-primary">{">"}</span>
              </button>
            </div>
            
            {/* Auto-play indicator */}
            {!isPaused && (
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full animate-ping"></span>
                <span className="text-[10px] text-secondary font-terminal uppercase tracking-widest">Auto-run Active</span>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
