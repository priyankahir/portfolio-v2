"use client";

import { LazyMotion, MotionConfig, domAnimation } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Site-wide Framer Motion setup.
 *
 * - `LazyMotion` + `m.*` components ship only the animation features we use
 *   (`domAnimation`: animate, exit, inView, hover/tap) instead of the full
 *   `motion` bundle. `strict` makes an accidental `motion.*` import throw in
 *   development, so the saving can't silently regress.
 * - `reducedMotion="user"` is needed because Framer animates through JS/WAAPI,
 *   which the CSS `prefers-reduced-motion` override in globals.css can't reach.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
