"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === "button" ||
        target.tagName.toLowerCase() === "a" ||
        target.closest("button") ||
        target.closest("a") ||
        target.classList.contains("interactive")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [isVisible]);

  if (!isMounted) return null;

  // On touch devices, do not render custom cursor
  if (typeof window !== "undefined" && window.matchMedia("(hover: none)").matches) {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Minimal Dot */}
          <motion.div
            className="fixed top-0 left-0 w-1.5 h-1.5 bg-primary rounded-full pointer-events-none z-[9999]"
            animate={{
              x: mousePosition.x - 3,
              y: mousePosition.y - 3,
              scale: isHovering ? 0 : 1,
              backgroundColor: "var(--primary)",
            }}
            transition={{
              type: "spring",
              stiffness: 1000,
              damping: 50,
              mass: 0.1,
            }}
          />

          {/* Minimal Ring */}
          <motion.div
            className="fixed top-0 left-0 w-8 h-8 border border-primary/30 rounded-full pointer-events-none z-[9998]"
            animate={{
              x: mousePosition.x - 16,
              y: mousePosition.y - 16,
              scale: isHovering ? 1.5 : 1,
              borderColor: isHovering ? "var(--primary)" : "var(--border)",
            }}
            transition={{
              type: "spring",
              stiffness: 250,
              damping: 25,
              mass: 0.5,
            }}
          />
        </>
      )}
    </AnimatePresence>
  );
}
