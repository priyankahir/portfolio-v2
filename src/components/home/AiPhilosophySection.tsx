"use client";

import { motion } from "framer-motion";
import { Brain, Sparkles, Code, Zap, RefreshCw, Cpu, Layers, GitMerge } from "lucide-react";
import { Reveal } from "@/components/animations/Reveal";

const humanSkills = [
  { name: "System Architecture", icon: Layers },
  { name: "Creative Problem Solving", icon: Brain },
  { name: "UX Empathy", icon: Sparkles },
  { name: "Strategic Vision", icon: GitMerge },
];

const aiTools = [
  { name: "Claude 3.5 Sonnet", icon: Cpu },
  { name: "Cursor IDE", icon: Code },
  { name: "Antigravity", icon: Zap },
  { name: "Google AI Studio", icon: Cpu },
  { name: "Lovable & v0", icon: Sparkles },
  { name: "Grok", icon: RefreshCw },
];

export function AiPhilosophySection() {
  return (
    <section id="ai-philosophy" className="py-24 px-4 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -z-10 pointer-events-none" />
      
      <div className="container mx-auto max-w-5xl">
        <Reveal>
          <div className="flex items-center gap-2 mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-semibold text-primary tracking-wide">
              <span className="text-secondary">#</span> synergy.ai
            </h2>
            <div className="h-[2px] flex-1 bg-gradient-to-r from-primary/50 to-transparent ml-4"></div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mb-16 text-center max-w-3xl mx-auto">
            <h3 className="text-3xl md:text-5xl font-bold font-heading mb-6 tracking-tight">
              The Future is <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Mind + AI</span>
            </h3>
            <p className="text-secondary text-lg leading-relaxed font-terminal">
              The modern 10x developer isn't just someone who types fast. It's an engineer who combines high-level human architectural thinking with the raw execution speed of cutting-edge AI agents.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 relative">
          
          {/* Animated connection line (desktop only) */}
          <div className="hidden md:block absolute left-1/2 top-[10%] bottom-[10%] w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent -translate-x-1/2">
            <motion.div 
              className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary shadow-[0_0_15px_rgba(0,255,65,0.8)]"
              animate={{ 
                y: ["0%", "100%", "0%"],
                opacity: [0, 1, 0]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </div>

          {/* Left Column: Human Mind */}
          <div className="relative">
            <Reveal direction="right">
              <div className="terminal-panel p-8 h-full border-r-0 md:border-r border-border md:rounded-r-none relative group">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent to-primary/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 rounded-xl bg-surface border border-border">
                    <Brain className="w-8 h-8 text-primary" />
                  </div>
                  <h4 className="text-2xl font-heading font-bold text-foreground">Human Director</h4>
                </div>
                
                <p className="text-secondary mb-8 font-terminal text-sm">
                  Defining the architecture, understanding business logic, ensuring security, and maintaining the creative vision.
                </p>

                <motion.div 
                  className="space-y-4"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={{
                    visible: { transition: { staggerChildren: 0.1 } }
                  }}
                >
                  {humanSkills.map((skill, idx) => (
                    <motion.div 
                      key={idx}
                      variants={{
                        hidden: { opacity: 0, x: -20 },
                        visible: { opacity: 1, x: 0, transition: { type: "spring" } }
                      }}
                      whileHover={{ scale: 1.02, x: 10, backgroundColor: "rgba(0,255,65,0.05)" }}
                      className="flex items-center gap-4 p-4 rounded bg-surface/50 border border-border transition-colors cursor-default"
                    >
                      <skill.icon className="w-5 h-5 text-secondary" />
                      <span className="font-medium text-sm">{skill.name}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: AI Arsenal */}
          <div className="relative">
            <Reveal direction="left" delay={0.2}>
              <div className="terminal-panel p-8 h-full border-l-0 md:border-l border-border md:rounded-l-none relative group">
                <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-l from-transparent to-accent/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 rounded-xl bg-surface border border-border">
                    <Cpu className="w-8 h-8 text-accent" />
                  </div>
                  <h4 className="text-2xl font-heading font-bold text-foreground">AI Execution</h4>
                </div>

                <p className="text-secondary mb-8 font-terminal text-sm">
                  Leveraging LLMs and AI agents for rapid prototyping, complex refactoring, boilerplate generation, and debugging.
                </p>

                <motion.div 
                  className="space-y-4"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={{
                    visible: { transition: { staggerChildren: 0.1 } }
                  }}
                >
                  {aiTools.map((tool, idx) => (
                    <motion.div 
                      key={idx}
                      variants={{
                        hidden: { opacity: 0, x: 20 },
                        visible: { opacity: 1, x: 0, transition: { type: "spring" } }
                      }}
                      whileHover={{ scale: 1.02, x: -10, backgroundColor: "rgba(0,255,65,0.05)", borderColor: "rgba(0,255,65,0.3)" }}
                      className="flex items-center gap-4 p-4 rounded bg-surface/50 border border-border transition-colors cursor-default relative overflow-hidden"
                    >
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent -translate-x-full"
                        whileHover={{ translateX: ["-100%", "200%"] }}
                        transition={{ duration: 1, ease: "easeInOut" }}
                      />
                      <tool.icon className="w-5 h-5 text-accent" />
                      <span className="font-medium text-sm z-10 relative">{tool.name}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
}
