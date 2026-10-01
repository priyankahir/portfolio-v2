"use client";

import {
  m,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import type { PointerEvent, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Subtle 3D tilt that follows the pointer across the element. A few degrees at
 * most, spring-smoothed, transform-only. The children stay server-rendered —
 * this wrapper only adds the motion. Mouse only; off for reduced motion.
 */
export function Tilt({
  children,
  className,
  max = 4,
}: {
  children: ReactNode;
  className?: string;
  /** Maximum rotation in degrees. Keep it small — this is a hint, not a ride. */
  max?: number;
}) {
  const reduceMotion = useReducedMotion();
  // Pointer position across the element, -0.5 … 0.5 on each axis.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const spring = { stiffness: 220, damping: 22, mass: 0.5 };
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [max, -max]), spring);
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-max, max]), spring);

  const onMove = (event: PointerEvent<HTMLDivElement>) => {
    if (reduceMotion || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    px.set((event.clientX - rect.left) / rect.width - 0.5);
    py.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const reset = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <m.div
      className={cn(className)}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      onPointerMove={onMove}
      onPointerLeave={reset}
    >
      {children}
    </m.div>
  );
}
