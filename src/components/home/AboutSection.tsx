"use client";

import { Reveal } from "@/components/animations/Reveal";

export function AboutSection() {
  return (
    <section id="about" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <Reveal>
          <div className="flex items-center gap-2 mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-semibold text-primary tracking-wide">
              <span className="text-secondary">#</span> system.profile
            </h2>
            <div className="h-[2px] flex-1 bg-gradient-to-r from-primary/50 to-transparent ml-4"></div>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="terminal-panel p-4 md:p-8 overflow-x-auto relative group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-500 z-0"></div>
            
            <div className="flex items-center gap-2 mb-6 border-b border-border pb-4 relative z-10">
              <span className="text-secondary">$</span> <span className="text-primary font-terminal font-bold">neofetch</span>
            </div>

            <div className="flex flex-col md:flex-row gap-8 font-terminal text-sm md:text-base relative z-10">
              {/* ASCII Art Left Column */}
              <div className="text-primary font-bold whitespace-pre leading-tight hidden md:block shrink-0 drop-shadow-[0_0_8px_rgba(0,255,65,0.5)]">
{`
      .-.
    .-' \`-.
  .-'      \`-.
.-'          \`-.
|\\            /|
| \\          / |
|  \\        /  |
|   \\      /   |
|    \\    /    |
|     \\  /     |
|      \\/      |
\`-.          .-'
  \`-.      .-'
    \`-.  .-'
      \`-'
`}
              </div>

              {/* System Info Right Column */}
              <div className="flex-1 space-y-3 text-foreground">
                <div className="mb-4">
                  <span className="text-primary font-bold text-lg">priyank</span>
                  <span className="text-secondary">@</span>
                  <span className="text-primary font-bold text-lg">portfolio-v2</span>
                  <div className="text-secondary">---------------------------</div>
                </div>
                
                <div className="grid grid-cols-[120px_1fr] gap-y-2">
                  <span className="text-accent font-bold">OS:</span>
                  <span>PB.OS 2.0 (Premium Hacker Edition)</span>
                  
                  <span className="text-accent font-bold">Host:</span>
                  <span>React / Next.js Server Components</span>
                  
                  <span className="text-accent font-bold">Uptime:</span>
                  <span>1.4+ Years</span>
                  
                  <span className="text-accent font-bold">Packages:</span>
                  <span>TypeScript, Tailwind CSS, Zustand, Framer Motion</span>
                  
                  <span className="text-accent font-bold">Shell:</span>
                  <span>zsh 5.8 (Interactive)</span>
                  
                  <span className="text-accent font-bold">Company:</span>
                  <span>Vivansh InfoTech</span>
                  
                  <span className="text-accent font-bold">Location:</span>
                  <span>Ahmedabad, Gujarat</span>
                  
                  <span className="text-accent font-bold">Projects:</span>
                  <span>10+ Delivered Successfully</span>
                </div>
                
                <div className="mt-8">
                  <p className="text-secondary leading-relaxed max-w-2xl">
                    <span className="text-primary">{">"}</span> I specialize in the React ecosystem, bridging the gap between elegant design and robust engineering. I thrive on solving intricate problems—whether it&apos;s integrating AI with Claude API, managing complex state with Zustand and TanStack Query, or optimizing rendering for large-scale SaaS platforms.
                  </p>
                </div>
                
                <div className="mt-6 pt-4 border-t border-border/50">
                  <div className="flex gap-2 mb-2">
                    <div className="w-5 h-5 bg-[#050505]"></div>
                    <div className="w-5 h-5 bg-red-500"></div>
                    <div className="w-5 h-5 bg-green-500"></div>
                    <div className="w-5 h-5 bg-yellow-500"></div>
                    <div className="w-5 h-5 bg-blue-500"></div>
                    <div className="w-5 h-5 bg-magenta-500"></div>
                    <div className="w-5 h-5 bg-cyan-500"></div>
                    <div className="w-5 h-5 bg-white"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
