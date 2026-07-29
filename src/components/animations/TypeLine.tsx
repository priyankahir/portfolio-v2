"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

interface TypeLineProps {
  text: string;
  /** ms per character */
  speed?: number;
  /** ms before typing starts */
  delay?: number;
  className?: string;
  showCaret?: boolean;
  onDone?: () => void;
}

/**
 * Types text one character at a time. The full string is always present in the
 * DOM inside a visually-hidden node, so screen readers and crawlers get the
 * complete content regardless of animation state.
 */
export function TypeLine({
  text,
  speed = 42,
  delay = 0,
  className,
  showCaret = true,
  onDone,
}: TypeLineProps) {
  const reduceMotion = usePrefersReducedMotion();
  const [count, setCount] = useState(0);

  // Latest callback without making it a dependency of the typing effect.
  const doneRef = useRef(onDone);
  useEffect(() => {
    doneRef.current = onDone;
  }, [onDone]);

  useEffect(() => {
    if (reduceMotion) {
      // Jump to the end asynchronously so this isn't a synchronous cascade.
      const finish = setTimeout(() => {
        setCount(text.length);
        doneRef.current?.();
      }, 0);
      return () => clearTimeout(finish);
    }

    let index = 0;
    let tick: ReturnType<typeof setInterval>;

    const start = setTimeout(() => {
      tick = setInterval(() => {
        index += 1;
        setCount(index);
        if (index >= text.length) {
          clearInterval(tick);
          doneRef.current?.();
        }
      }, speed);
    }, delay);

    return () => {
      clearTimeout(start);
      clearInterval(tick);
    };
  }, [text, speed, delay, reduceMotion]);

  const isDone = count >= text.length;

  return (
    <span className={cn("inline", className)}>
      <span aria-hidden="true">{text.slice(0, count)}</span>
      <span className="sr-only">{text}</span>
      {showCaret && !isDone && (
        <span
          aria-hidden="true"
          className="ml-0.5 inline-block h-[1em] w-[0.5em] translate-y-[0.12em] bg-primary"
        />
      )}
    </span>
  );
}
