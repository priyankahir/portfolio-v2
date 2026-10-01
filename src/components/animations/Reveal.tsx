import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Direction = "up" | "left" | "right" | "none";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Seconds. Becomes a small pixel offset in the scroll range, so later items land later. */
  delay?: number;
  direction?: Direction;
}

const OFFSETS: Record<Direction, { x: string; y: string }> = {
  up: { x: "0px", y: "18px" },
  left: { x: "18px", y: "0px" },
  right: { x: "-18px", y: "0px" },
  none: { x: "0px", y: "0px" },
};

/**
 * Scroll-linked entrance, done entirely in CSS (`.reveal` in globals.css,
 * driven by `animation-timeline: view()`).
 *
 * Why not an IntersectionObserver/JS animation: content is visible by default.
 * Browsers without scroll-driven animations, users with reduced motion, no-JS
 * visitors and crawlers that render with a very tall viewport (Googlebot) all
 * see the final state; nothing can get stuck at `opacity: 0`. It's also a
 * server component, so it ships no JavaScript.
 */
export function Reveal({ children, className, delay = 0, direction = "up" }: RevealProps) {
  const offset = OFFSETS[direction];
  const style = {
    "--reveal-x": offset.x,
    "--reveal-y": offset.y,
    // ~0.1s of delay ≈ 20px later in the scroll range.
    "--reveal-shift": `${Math.min(delay * 200, 100)}px`,
  } as CSSProperties;

  return (
    <div className={cn("reveal", className)} style={style}>
      {children}
    </div>
  );
}
