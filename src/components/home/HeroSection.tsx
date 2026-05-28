"use client";

import { motion } from "framer-motion";
import { TerminalTyping } from "@/components/animations/TerminalTyping";
import { Reveal } from "@/components/animations/Reveal";
import { MatrixRain } from "@/components/animations/MatrixRain";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

interface HeroSectionProps {
  about?: any;
}

export function HeroSection({ about }: HeroSectionProps) {
  const [typingStep, setTypingStep] = useState(0);

  const name = about?.name || "Priyank Baldaniya";
  const role = about?.role || "Senior Frontend Developer";
  const location = about?.location || "AHMEDABAD, IN";
  const profileImage = about?.profileImage || "/images/profile.jpeg";

  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-24 pb-20 overflow-hidden px-4">
      {/* Immersive Effects */}
      <MatrixRain />
      
      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-50"></div>
      
      {/* Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -z-10 mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] -z-10 mix-blend-screen pointer-events-none" />

      <div className="container mx-auto max-w-5xl z-10">
        <Reveal>
          <div className="flex items-center gap-2 mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-semibold text-primary tracking-wide">
              <span className="text-secondary">#</span> system.init
            </h2>
            <div className="h-[2px] flex-1 bg-gradient-to-r from-primary/50 to-transparent ml-4"></div>
          </div>
        </Reveal>

        {/* Top Section: Side-by-Side Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-12 lg:gap-16 items-center mb-16">
          
          {/* Left Column: Content */}
          <div className="text-left order-2 lg:order-1">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary font-terminal text-xs mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                STATUS: READY_FOR_HIRE
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-semibold tracking-tight mb-6 font-heading leading-[1.1]">
                Engineering <br />
                <span className="text-gradient">Digital</span> Experiences
              </h1>
            </Reveal>

            <Reveal delay={0.4}>
              <p className="text-lg md:text-xl text-secondary max-w-2xl mb-10 font-mono leading-relaxed">
                {about?.tagline || "Frontend Developer specializing in high-performance web applications with Next.js, React, and TypeScript. Building the future of the web, one commit at a time."}
              </p>
            </Reveal>

            <Reveal delay={0.6}>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 font-terminal">
                <Link 
                  href="/#projects" 
                  className="bg-primary text-white dark:text-black px-8 py-3.5 rounded font-bold hover:opacity-90 transition-all interactive flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(37,99,235,0.3)] dark:shadow-[0_0_20px_rgba(0,255,65,0.3)] group"
                >
                  <span>[ VIEW_PROJECTS ]</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Link>
                <Link 
                  href="/#contact" 
                  className="bg-surface border border-border px-8 py-3.5 rounded text-foreground hover:bg-surface-hover transition-colors interactive flex items-center justify-center gap-2 font-medium group"
                >
                  <span>[ CONTACT_ME ]</span>
                </Link>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Profile Image ONLY */}
          <div className="order-1 lg:order-2 flex flex-col items-center lg:items-end justify-center relative">
            <Reveal direction="up" delay={0.3} width="fit-content">
              <div className="relative group">
                {/* Decorative frames */}
                <div className="absolute -inset-4 border border-primary/20 rounded-2xl -z-10 group-hover:border-primary/40 transition-colors duration-500"></div>
                <div className="absolute -inset-2 border border-primary/10 rounded-xl -z-10 group-hover:border-primary/30 transition-colors duration-500 delay-100"></div>
                
                <div className="relative w-56 h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-2xl overflow-hidden border-2 border-primary shadow-[0_0_30px_rgba(37,99,235,0.2)] dark:shadow-[0_0_30px_rgba(0,255,65,0.2)] bg-surface-card">
                  <Image 
                    src={profileImage}
                    alt={name}
                    width={400}
                    height={400}
                    priority
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4">
                    <span className="text-white font-terminal text-xs">./{name.split(" ")[0].toLowerCase()}.sh</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Bottom Section: Terminal moved UNDER the side-by-side content */}
        <Reveal delay={0.8} direction="up">
          <div className="w-full">
            <div className="terminal-panel shadow-2xl backdrop-blur-md border-primary/20 overflow-hidden">
              {/* Terminal Header */}
              <div className="flex items-center justify-between px-4 py-2 border-b border-border/50 bg-primary/5">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/50"></div>
                </div>
                <span className="text-secondary/50 text-[10px] uppercase font-bold tracking-widest flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                  {name.split(" ")[0].toLowerCase()}@terminal:~
                </span>
              </div>
              
              {/* Terminal Content */}
              <div className="p-6 font-terminal text-sm md:text-base">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-secondary">$</span>
                  <TerminalTyping 
                    text="whoami" 
                    speed={100} 
                    showCursor={typingStep === 0}
                    onComplete={() => setTimeout(() => setTypingStep(1), 500)} 
                  />
                </div>
                
                {typingStep >= 1 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-primary font-bold ml-4 mb-4 border-l border-primary/20 pl-4"
                  >
                    {name}
                    <div className="text-accent text-[10px] uppercase tracking-widest mt-1">{role}</div>
                  </motion.div>
                )}

                {typingStep >= 1 && (
                  <div className="flex items-center gap-2">
                    <span className="text-secondary">$</span>
                    <TerminalTyping 
                      text="./skills.sh --list-top" 
                      speed={50} 
                      delay={500}
                      showCursor={typingStep === 1}
                      onComplete={() => setTypingStep(2)}
                    />
                  </div>
                )}

                {typingStep >= 2 && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4 ml-4 text-xs text-secondary">
                    <div className="flex flex-col gap-1">
                      <span className="text-primary font-bold underline">LANGUAGES</span>
                      <span>TypeScript</span>
                      <span>JavaScript</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-primary font-bold underline">FRONTEND</span>
                      <span>Next.js 16+</span>
                      <span>React.js</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-primary font-bold underline">STYLING</span>
                      <span>Tailwind CSS</span>
                      <span>Framer Motion</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-primary font-bold underline">TOOLS</span>
                      <span>Git / GitHub</span>
                      <span>Vite</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
      
      {/* Decorative lines & Stats */}
      <div className="absolute bottom-10 left-10 hidden md:block font-terminal text-[10px] text-secondary/30">
        <div className="flex flex-col gap-1">
          <p>SYS.STAT: <span className="text-primary">ONLINE</span></p>
          <p>LOC: <span className="text-primary">{location.toUpperCase()}</span></p>
        </div>
      </div>
      <div className="absolute bottom-10 right-10 hidden md:block font-terminal text-[10px] text-secondary/30 text-right">
        <p>V 1.0.0-STABLE</p>
        <p>© 2026 {name.split(" ")[0].toUpperCase()}</p>
      </div>
    </section>
  );
}
