"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Command, Search, Home, User, Briefcase, Code, BookOpen, Mail, X, Download } from "lucide-react";
import { useRouter } from "next/navigation";

const ACTIONS = [
  { id: "home", title: "Go to Home", icon: Home, shortcut: "H", path: "/" },
  { id: "about", title: "About System", icon: User, shortcut: "A", path: "/#about" },
  { id: "skills", title: "Installed Modules", icon: Code, shortcut: "S", path: "/#skills" },
  { id: "experience", title: "Deployment History", icon: Briefcase, shortcut: "E", path: "/#experience" },
  { id: "projects", title: "Active Deployments", icon: Command, shortcut: "P", path: "/#projects" },
  { id: "blog", title: "System Logs", icon: BookOpen, shortcut: "B", path: "/blog" },
  { id: "resume", title: "Download CV", icon: Download, shortcut: "R", path: "/images/resume.pdf", download: true },
  { id: "contact", title: "Init Connection", icon: Mail, shortcut: "C", path: "/#contact" },
];

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();

  const handleOpen = useCallback(() => setIsOpen(true), []);
  const handleClose = useCallback(() => {
    setIsOpen(false);
    setSearch("");
    setSelectedIndex(0);
  }, []);

  const filteredActions = ACTIONS.filter((action) =>
    action.title.toLowerCase().includes(search.toLowerCase())
  );

  const onAction = useCallback((path: string) => {
    router.push(path);
    handleClose();
  }, [router, handleClose]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
      
      if (!isOpen) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredActions.length));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredActions.length) % Math.max(1, filteredActions.length));
      }
      if (e.key === "Enter") {
        e.preventDefault();
        const action = filteredActions[selectedIndex];
        if (action) {
          if (action.download) {
            const link = document.createElement("a");
            link.href = action.path;
            link.download = "Priyank_Baldaniya_Resume.pdf";
            link.click();
            handleClose();
          } else {
            onAction(action.path);
          }
        }
      }
      if (e.key === "Escape") {
        handleClose();
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [isOpen, filteredActions, selectedIndex, onAction, handleClose]);

  // Reset selection when search changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  if (!isOpen) {
    return (
      <div className="fixed bottom-12 right-6 z-40 hidden lg:block">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-2 px-3 py-1.5 bg-black/40 backdrop-blur-md border border-primary/20 rounded-full font-terminal text-[10px] text-secondary/50"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
          Press <span className="text-primary font-bold px-1.5 py-0.5 bg-primary/10 border border-primary/20 rounded mx-1">⌘ K</span> to open command palette
        </motion.div>
      </div>
    );
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          className="relative w-full max-w-xl terminal-panel overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border-primary/30"
        >
          <div className="flex items-center gap-3 px-4 py-4 border-b border-border/50 bg-primary/5">
            <Search className="w-5 h-5 text-primary" />
            <input
              autoFocus
              placeholder="Type a command or search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-foreground font-terminal placeholder:text-secondary/30"
            />
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-terminal text-secondary/50 px-1.5 py-0.5 border border-border rounded">ESC</span>
              <button onClick={handleClose} className="text-secondary hover:text-primary">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="max-h-[60vh] overflow-y-auto p-2 scrollbar-thin">
            {filteredActions.length > 0 ? (
              <div className="space-y-1">
                {filteredActions.map((action, index) => (
                  <button
                    key={action.id}
                    onClick={() => {
                      if (action.download) {
                        const link = document.createElement("a");
                        link.href = action.path;
                        link.download = "Priyank_Baldaniya_Resume.pdf";
                        link.click();
                        handleClose();
                      } else {
                        onAction(action.path);
                      }
                    }}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`w-full flex items-center justify-between px-3 py-3 rounded-lg transition-all text-left ${
                      index === selectedIndex ? "bg-primary/20 border-primary/20 shadow-[inset_0_0_10px_rgba(0,255,65,0.1)]" : "hover:bg-primary/5 border-transparent"
                    } border`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded border flex items-center justify-center transition-all ${
                        index === selectedIndex ? "bg-primary/10 border-primary/50 text-primary" : "bg-surface border-border text-secondary"
                      }`}>
                        <action.icon className="w-4 h-4" />
                      </div>
                      <div>
                        <p className={`text-sm font-terminal font-bold transition-colors ${
                          index === selectedIndex ? "text-primary" : "text-foreground"
                        }`}>
                          {action.title}
                        </p>
                        <p className={`text-[10px] font-terminal uppercase transition-opacity ${
                          index === selectedIndex ? "text-primary/70" : "text-secondary opacity-50"
                        }`}>
                          {action.path}
                        </p>
                      </div>
                    </div>
                    <span className={`text-[10px] font-terminal border px-2 py-0.5 rounded transition-colors ${
                      index === selectedIndex ? "text-primary border-primary/30" : "text-secondary/30 border-border/50"
                    }`}>
                      {action.shortcut}
                    </span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="py-12 text-center">
                <p className="text-secondary font-terminal text-sm">NO_MATCHING_COMMANDS</p>
              </div>
            )}
          </div>

          <div className="px-4 py-2 border-t border-border/30 bg-black/40 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 text-[9px] text-secondary/50 font-terminal">
                <span className="px-1 border border-border rounded">↑↓</span> to navigate
              </div>
              <div className="flex items-center gap-1.5 text-[9px] text-secondary/50 font-terminal">
                <span className="px-1 border border-border rounded">↵</span> to select
              </div>
            </div>
            <div className="text-[9px] text-primary/50 font-terminal font-bold">
              PB.OS_v2.0_SHELL
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
