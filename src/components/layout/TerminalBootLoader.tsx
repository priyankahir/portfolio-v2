"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const bootSequence = [
  "[ OK ] Initializing Frontend System...",
  "[ OK ] Loading Core Modules (React, Next.js, TypeScript)...",
  "[ OK ] Mounting Component Tree...",
  "[ OK ] Fetching Developer Data (Priyank Baldaniya)...",
  "[ OK ] Connecting Deployment Services...",
  "[ OK ] Establishing Secure Protocol...",
  "Access Granted ✓",
];

export function TerminalBootLoader() {
  const [currentLine, setCurrentLine] = useState(0);
  const [isBootComplete, setIsBootComplete] = useState(false);
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Only run once per session (optional, but let's just run it every time for effect, or store in sessionStorage)
    const hasBooted = sessionStorage.getItem("hasBooted");
    if (hasBooted) {
      setTimeout(() => setShow(false), 0);
      return;
    }

    if (currentLine < bootSequence.length) {
      const timer = setTimeout(() => {
        setCurrentLine((prev) => prev + 1);
      }, 400 + Math.random() * 400); // Random delay between 400-800ms
      return () => clearTimeout(timer);
    } else {
      setTimeout(() => {
        setIsBootComplete(true);
        sessionStorage.setItem("hasBooted", "true");
        setTimeout(() => setShow(false), 800);
      }, 1000);
    }
  }, [currentLine]);

  if (!show) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="fixed inset-0 z-[100] bg-black text-primary font-terminal p-6 flex flex-col justify-end pb-20 crt-overlay"
      >
        <div className="max-w-3xl w-full mx-auto flex flex-col gap-2">
          {bootSequence.slice(0, currentLine).map((line, index) => (
            <div key={index} className="text-sm md:text-base">
              {line}
            </div>
          ))}
          {currentLine < bootSequence.length && (
            <div className="flex items-center text-sm md:text-base">
              <span className="w-2.5 h-5 bg-primary animate-blink ml-1 block" />
            </div>
          )}
          {isBootComplete && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-8 text-xl md:text-3xl text-center text-primary font-heading animate-pulse-glow"
            >
              Welcome to PB.OS
            </motion.div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
