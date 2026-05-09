"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SlideInProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  direction?: "left" | "right" | "up" | "down";
  duration?: number;
}

export function SlideIn({
  children,
  delay = 0,
  className,
  direction = "up",
  duration = 0.5,
}: SlideInProps) {
  const directions = {
    left: { x: -50, y: 0 },
    right: { x: 50, y: 0 },
    up: { x: 0, y: 50 },
    down: { x: 0, y: -50 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...directions[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration, delay, ease: "easeOut" }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
