"use client";

import { m, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import type { PointerEvent, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Pulls its child a few pixels toward the cursor, then springs back on leave.
 * Transform-only and driven by motion values, so it never re-renders React.
 * Mouse pointers only — touch and pen get the plain element — and disabled for
 * reduced-motion users.
 */
export function Magnetic({
  children,
  className,
  strength = 0.15,
}: {
  children: ReactNode;
  className?: string;
  /** Fraction of the cursor's offset from centre to follow (0–1). */
  strength?: number;
}) {
  const reduceMotion = useReducedMotion();
  const spring = { stiffness: 300, damping: 20, mass: 0.4 };
  const x = useSpring(useMotionValue(0), spring);
  const y = useSpring(useMotionValue(0), spring);

  const onMove = (event: PointerEvent<HTMLDivElement>) => {
    if (reduceMotion || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((event.clientY - (rect.top + rect.height / 2)) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <m.div
      className={cn("inline-flex", className)}
      style={{ x, y }}
      onPointerMove={onMove}
      onPointerLeave={reset}
    >
      {children}
    </m.div>
  );
}
