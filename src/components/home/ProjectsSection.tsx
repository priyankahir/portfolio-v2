"use client";

import Link from "next/link";
import { Reveal } from "@/components/animations/Reveal";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Project {
  _id: string;
  title: string;
  subtitle?: string;
  status?: string;
  description: string;
  technologies?: string[];
  liveUrl?: string;
  githubUrl?: string;
}

interface ProjectsSectionProps {
  projects?: Project[];
}

export function ProjectsSection({ projects = [] }: ProjectsSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused || projects.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % projects.length);
    }, 8000); // 8 seconds for senior-level reading
    
    return () => clearInterval(interval);
  }, [isPaused, projects.length]);

  const nextProject = () => {
    if (projects.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    if (projects.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  if (projects.length === 0) {
    return (
      <section id="projects" className="py-24 px-4 relative bg-primary/5">
        <div className="container mx-auto max-w-5xl text-center font-terminal text-secondary">
          [ No active deployments found. Connect to Sanity Studio to add projects. ]
        </div>
      </section>
    );
  }

  const currentProject = projects[currentIndex];

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
                  <span className="font-terminal text-[10px] text-secondary tracking-widest uppercase">MODULE_PRJKT_{currentIndex + 1}_V1</span>
                  <div className={`font-terminal text-[10px] px-2 py-0.5 border ${currentProject.status === 'ONLINE' ? 'text-primary border-primary/30 bg-primary/10' : 'text-accent border-accent/30'}`}>
                    {currentProject.status || 'ONLINE'}
                  </div>
                </div>
                
                <div className="p-8 md:p-12 flex-1 flex flex-col relative min-h-[450px]">
                  <div className="absolute top-0 right-0 p-8 opacity-5 text-primary pointer-events-none">
                    <span className="text-9xl font-bold font-terminal">{currentIndex + 1}</span>
                  </div>

                  <h3 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-3 group-hover:text-primary transition-colors tracking-tight">
                    {currentProject.title}
                  </h3>
                  <p className="text-primary font-terminal text-sm md:text-base mb-8 opacity-80 uppercase tracking-widest">
                    {currentProject.subtitle || "Full Stack Application"}
                  </p>
                  
                  <p className="text-secondary mb-10 flex-1 leading-relaxed text-lg font-terminal border-l border-primary/20 pl-6">
                    {currentProject.description}
                  </p>
                  
                  <div className="mb-4 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                      <div className="text-[10px] text-primary font-terminal font-bold mb-4 tracking-widest uppercase opacity-50 underline underline-offset-4">DEPENDENCIES</div>
                      <div className="flex flex-wrap gap-2">
                        {currentProject.technologies?.map((tech, i) => (
                          <span key={i} className="text-[10px] font-terminal text-secondary bg-surface border border-border px-2.5 py-1 rounded">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-4 font-terminal">
                      {currentProject.githubUrl && (
                        <Link 
                          href={currentProject.githubUrl}
                          target="_blank"
                          className="text-xs text-secondary hover:text-primary border border-border px-4 py-2 rounded hover:border-primary transition-all"
                        >
                          [ SOURCE_CODE ]
                        </Link>
                      )}
                      {currentProject.liveUrl && (
                        <Link 
                          href={currentProject.liveUrl}
                          target="_blank"
                          className="text-xs bg-primary text-white dark:text-black px-4 py-2 rounded font-bold hover:opacity-90 transition-all shadow-[0_0_15px_rgba(37,99,235,0.3)] dark:shadow-[0_0_15px_rgba(0,255,65,0.3)]"
                        >
                          [ LIVE_DEMO ]
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Controls */}
            <div className="flex justify-between items-center mt-8 sm:mt-12 font-terminal px-2">
              <button 
                onClick={prevProject}
                className="text-secondary hover:text-primary transition-colors flex items-center gap-1 sm:gap-2 group"
                aria-label="Previous Project"
              >
                <ChevronLeft className="w-5 h-5 sm:w-4 sm:h-4 text-primary group-hover:-translate-x-1 transition-transform" />
                <span className="text-primary hidden sm:inline">{"[ PREV_PRJKT ]"}</span>
                <span className="text-primary text-[10px] sm:hidden">PREV</span>
              </button>
              
              <div className="flex gap-2 sm:gap-4">
                {projects.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    className={`h-1 rounded-full transition-all ${i === currentIndex ? 'bg-primary w-6 sm:w-8 shadow-[0_0_10px_rgba(0,255,65,0.5)]' : 'bg-border w-2 sm:w-4 hover:bg-secondary'}`}
                    aria-label={`Go to project ${i + 1}`}
                  />
                ))}
              </div>

              <button 
                onClick={nextProject}
                className="text-secondary hover:text-primary transition-colors flex items-center gap-1 sm:gap-2 group"
                aria-label="Next Project"
              >
                <span className="text-primary hidden sm:inline">{"[ NEXT_PRJKT ]"}</span>
                <span className="text-primary text-[10px] sm:hidden">NEXT</span>
                <ChevronRight className="w-5 h-5 sm:w-4 sm:h-4 text-primary group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
