"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "@/components/animations/Reveal";
import { Terminal, Send } from "lucide-react";

const COMMANDS: Record<string, string | ((args?: string[]) => string)> = {
  help: "AVAILABLE_COMMANDS: [ls, whoami, skills, projects, contact, socials, about, date, clear, sudo, version]",
  ls: (args) => {
    const target = args?.[0]?.replace(/^\//, "");
    if (target === "projects") return "PROJECTS: [capability.work, ai-chatbot, chrgd, rembrandt, kuber-grow]";
    if (target === "blog") return "BLOG_POSTS: [nextjs-16-guide, framer-motion-tips, typescript-best-practices]";
    return "DRIVES: [/projects, /blog, /config, /assets, /credentials.secret]";
  },
  whoami: "USER: priyank_baldaniya | ROLE: senior_frontend_developer | STATUS: active | LOCATION: ahmedabad_in",
  skills: "STACK: [React, Next.js, TS, Tailwind, Framer, Zustand, TanStack, REST_APIs]",
  projects: "DEPLOYED_MODULES: [Capability.work, AI_Chatbot, CHRGD, Rembrandt, Kuber_Grow]. Use 'ls projects' for more details.",
  about: "Priyank Baldaniya: Senior Frontend Developer with 1+ years of experience in building scalable web apps with React & Next.js. Passionate about UI/UX and performance.",
  socials: "CONNECT: [GitHub: priyankahir, LinkedIn: priyank-baldaniya, WhatsApp: +919979700935]",
  contact: "INITIATING_CONNECTION... Scrolling to communication.protocol section.",
  date: () => new Date().toLocaleString(),
  version: "PB.OS_v1.0.0-STABLE",
  sudo: "PERMISSION_DENIED: User 'visitor' is not in the sudoers file. This incident will be reported.",
  clear: "SYSTEM_FLUSH_COMPLETE",
  cd: (args) => {
    const target = args?.[0]?.replace(/^\//, "");
    if (!target) return "USAGE: cd <directory>";
    if (["projects", "blog", "config", "assets"].includes(target)) {
      return (COMMANDS.ls as (args?: string[]) => string)([target]);
    }
    return `ACCESS_DENIED: Cannot enter ${target}. Directory is encrypted or does not exist.`;
  }
};

export function InteractiveConsole() {
  const [history, setHistory] = useState<{ type: "cmd" | "resp"; text: string }[]>([
    { type: "resp", text: "PB.OS [Version 1.0.0] (c) 2026 Priyank Baldaniya." },
    { type: "resp", text: "Type 'help' to see available commands." }
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    let normalizedInput = input.trim();
    if (normalizedInput.startsWith("/")) {
      normalizedInput = normalizedInput.substring(1);
    }

    const parts = normalizedInput.split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);
    
    const newHistory = [...history, { type: "cmd" as const, text: input }];

    if (cmd === "clear") {
      setHistory([]);
    } else {
      // Check if command is a directory (projects, blog, etc.)
      const isDirectory = ["projects", "blog", "config", "assets"].includes(cmd);
      const response = isDirectory && args.length === 0 ? (COMMANDS.ls as (args?: string[]) => string)([cmd]) : COMMANDS[cmd];
      
      let respText = "";
      
      if (typeof response === "function") {
        respText = (response as (args?: string[]) => string)(args);
      } else if (response) {
        respText = response as string;
      } else {
        respText = `COMMAND_NOT_FOUND: ${cmd}. Type 'help' for assistance.`;
      }

      newHistory.push({ type: "resp" as const, text: respText });
      setHistory(newHistory);

      if (cmd === "contact") {
        setTimeout(() => {
          const contactSection = document.getElementById("contact");
          if (contactSection) {
            contactSection.scrollIntoView({ behavior: "smooth" });
          }
        }, 1000);
      }
    }
    
    setInput("");
  };

  return (
    <section className="py-24 px-4 relative">
      <div className="container mx-auto max-w-4xl">
        <Reveal>
          <div className="flex items-center gap-2 mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-semibold text-primary tracking-wide">
              <span className="text-secondary">#</span> interactive.console
            </h2>
            <div className="h-[2px] flex-1 bg-gradient-to-r from-primary/50 to-transparent ml-4"></div>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="terminal-panel shadow-2xl relative overflow-hidden flex flex-col h-[500px]">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-border/50 bg-primary/5">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/30"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/30"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/30"></div>
              </div>
              <span className="text-secondary/50 text-[10px] uppercase font-bold tracking-widest flex items-center gap-2">
                <Terminal className="w-3 h-3" />
                priyank@shell: ~
              </span>
              <div className="w-8"></div>
            </div>

            {/* Output */}
            <div 
              ref={scrollRef}
              className="flex-1 p-6 font-terminal text-sm overflow-y-auto scrollbar-thin scrollbar-thumb-primary/20"
            >
              <AnimatePresence mode="popLayout">
                {history.map((line, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`mb-2 leading-relaxed ${line.type === "cmd" ? "text-foreground" : "text-primary/80"}`}
                  >
                    {line.type === "cmd" && <span className="text-secondary mr-2">$</span>}
                    {line.text}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Input */}
            <form 
              onSubmit={handleCommand}
              className="p-4 border-t border-border/50 bg-black/40 flex items-center gap-3"
            >
              <span className="text-secondary font-terminal">$</span>
              <input 
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter command..."
                className="flex-1 bg-transparent border-none outline-none text-primary font-terminal placeholder:text-secondary/30"
              />
              <button type="submit" className="text-secondary hover:text-primary transition-colors">
                <Send className="w-4 h-4" />
              </button>
            </form>
            
            {/* Background scanline effect */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]"></div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
