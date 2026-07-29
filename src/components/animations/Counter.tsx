"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

interface CounterProps {
  /** Target value; non-numeric strings render as-is. */
  value: string;
  duration?: number;
  className?: string;
}

/**
 * Counts up to a numeric value once it scrolls into view.
 * Falls through to plain text for values that aren't numbers (e.g. "React").
 */
export function Counter({ value, duration = 1100, className }: CounterProps) {
  const target = Number.parseFloat(value);
  const isNumeric = Number.isFinite(target);
  const decimals = value.includes(".") ? value.split(".")[1].length : 0;

  const reduceMotion = usePrefersReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);

  /** null means "not animating" — render the final value verbatim. */
  const [progressValue, setProgressValue] = useState<string | null>(null);

  const animates = isNumeric && !reduceMotion;

  useEffect(() => {
    if (!animates) return;

    const node = ref.current;
    if (!node) return;

    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        const startedAt = performance.now();
        const step = (now: number) => {
          const progress = Math.min(1, (now - startedAt) / duration);
          const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
          setProgressValue(
            progress < 1 ? (target * eased).toFixed(decimals) : null
          );
          if (progress < 1) frame = requestAnimationFrame(step);
        };
        frame = requestAnimationFrame(step);
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [animates, target, decimals, duration]);

  return (
    <span ref={ref} className={className}>
      {progressValue ?? value}
    </span>
  );
}
