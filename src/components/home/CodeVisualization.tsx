"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

export function CodeVisualization() {
  const codeString = `const developer = {
  name: "Priyank Baldaniya",
  role: "Frontend Developer",
  experience: "1.4+ Years",
  stack: [
    "React.js",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Framer Motion"
  ],
  location: "Ahmedabad, Gujarat",
  status: "Available for new opportunities",
  execute() {
    return this.buildScalableApps();
  }
};`;

  const [displayedCode, setDisplayedCode] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.5 });

  useEffect(() => {
    if (isInView && !isTypingComplete) {
      let currentIdx = 0;
      const interval = setInterval(() => {
        setDisplayedCode(codeString.slice(0, currentIdx));
        currentIdx++;
        if (currentIdx > codeString.length) {
          clearInterval(interval);
          setIsTypingComplete(true);
        }
      }, 20); // Typing speed
      return () => clearInterval(interval);
    }
  }, [isInView, isTypingComplete, codeString]);

  return (
    <section ref={containerRef} className="py-24 px-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,rgba(0,255,65,0.03)_0%,transparent_70%)] -z-10"></div>
      
      <div className="container mx-auto max-w-4xl">
        <div className="flex items-center gap-2 mb-8">
          <h2 className="text-2xl font-heading text-primary flex items-center gap-2">
            <span className="text-secondary">#</span> developer.config.ts
          </h2>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-primary/30 to-transparent ml-4"></div>
        </div>

        <div className="terminal-panel rounded-lg shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden border border-primary/20 backdrop-blur-sm bg-black/40">
          {/* Editor Header */}
          <div className="bg-black/60 border-b border-primary/10 p-3 flex items-center justify-between">
            <div className="flex gap-2 items-center">
              <div className="flex gap-1.5 ml-1">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/50"></div>
              </div>
              <span className="text-secondary/60 text-[10px] ml-4 font-terminal uppercase tracking-widest">PB.OS // VIM_MODE</span>
            </div>
            <div className="flex gap-4 text-[10px] font-terminal text-secondary/40 mr-2">
              <span>LN {displayedCode.split('\n').length}</span>
              <span>UTF-8</span>
              <span>TypeScript</span>
            </div>
          </div>
          
          {/* Editor Content */}
          <div className="p-6 md:p-8 overflow-x-auto bg-[#020202]/80">
            <pre className="font-terminal text-sm md:text-base leading-relaxed">
              <code>
                {displayedCode.split("\n").map((line, i) => (
                  <div key={i} className="flex min-h-[1.5rem]">
                    <span className="text-secondary/20 select-none pr-6 text-right w-12 text-xs">{i + 1}</span>
                    <span className="pl-4 text-secondary/90 whitespace-pre">
                      {/* Very basic syntax highlighting simulation */}
                      {line.includes('const') ? (
                        <><span className="text-blue-400">const</span> {line.replace('const', '')}</>
                      ) : line.includes('name:') ? (
                        <><span className="text-cyan-400">name</span>: <span className="text-green-400">&quot;Priyank Baldaniya&quot;</span>,</>
                      ) : line.includes('role:') ? (
                        <><span className="text-cyan-400">role</span>: <span className="text-green-400">&quot;Frontend Developer&quot;</span>,</>
                      ) : line.includes('experience:') ? (
                        <><span className="text-cyan-400">experience</span>: <span className="text-green-400">&quot;1.4+ Years&quot;</span>,</>
                      ) : line.includes('stack:') ? (
                        <><span className="text-cyan-400">stack</span>: [</>
                      ) : line.includes('location:') ? (
                        <><span className="text-cyan-400">location</span>: <span className="text-green-400">&quot;Ahmedabad, Gujarat&quot;</span>,</>
                      ) : line.includes('status:') ? (
                        <><span className="text-cyan-400">status</span>: <span className="text-green-400">&quot;Available for new opportunities&quot;</span>,</>
                      ) : line.includes('execute()') ? (
                        <><span className="text-yellow-400">execute</span>() {"{"}</>
                      ) : line.includes('return') ? (
                        <><span className="text-blue-400">return</span> <span className="text-red-400">this</span>.buildScalableApps();</>
                      ) : line.includes('"') ? (
                        <><span className="text-green-400">{line.trim().replace(',', '')}</span>{line.includes(',') ? ',' : ''}</>
                      ) : (
                        line
                      )}
                      {/* Typing Cursor */}
                      {!isTypingComplete && i === displayedCode.split('\n').length - 1 && (
                        <motion.span 
                          animate={{ opacity: [1, 0] }}
                          transition={{ repeat: Infinity, duration: 0.5 }}
                          className="inline-block w-2 h-5 bg-primary ml-1 align-middle"
                        />
                      )}
                    </span>
                  </div>
                ))}
              </code>
            </pre>
          </div>
          
          {/* Editor Footer */}
          <div className="bg-primary/5 border-t border-primary/10 px-4 py-1.5 flex justify-between items-center">
            <div className="text-[9px] font-terminal text-primary/60 uppercase tracking-tighter">
              Connected to pb-development-server:3000
            </div>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-[9px] font-terminal text-green-500/80 uppercase">Live</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
