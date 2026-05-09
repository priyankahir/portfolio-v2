"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Terminal, Monitor } from "lucide-react";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-8 h-8 rounded-full"></div>;
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-full hover:bg-surface-hover transition-all flex items-center justify-center text-secondary hover:text-primary terminal-glow-hover interactive outline-none group"
      title={theme === "dark" ? "Switch to Blue Theme" : "Switch to Green Theme"}
    >
      <motion.div
        initial={false}
        animate={{ 
          rotate: theme === "dark" ? 0 : 360,
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 0.5, ease: "anticipate" }}
        className="relative"
      >
        {theme === "dark" ? (
          <Terminal size={18} className="text-[#00ff41] filter drop-shadow-[0_0_5px_rgba(0,255,65,0.6)]" />
        ) : (
          <Monitor size={18} className="text-[#2563eb] filter drop-shadow-[0_0_5px_rgba(37,99,235,0.6)]" />
        )}
      </motion.div>
    </button>
  );
}
