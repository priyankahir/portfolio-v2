"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Direction = "up" | "down" | "left" | "right" | "none";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: Direction;
  /** Distance travelled, in px. Kept small so nothing feels sluggish. */
  distance?: number;
  once?: boolean;
}

const OFFSETS: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 1 },
  down: { x: 0, y: -1 },
  left: { x: 1, y: 0 },
  right: { x: -1, y: 0 },
  none: { x: 0, y: 0 },
};

/**
 * Scroll-triggered entrance. Animates opacity and transform only, so it never
 * touches layout. Reduced-motion users land on the final state immediately via
 * the global override in `globals.css`.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  duration = 0.55,
  direction = "up",
  distance = 18,
  once = true,
}: RevealProps) {
  const offset = OFFSETS[direction];

  const variants: Variants = {
    hidden: { opacity: 0, x: offset.x * distance, y: offset.y * distance },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration, delay, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.div
      className={cn(className)}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "0px 0px -12% 0px" }}
    >
      {children}
    </motion.div>
  );
}
