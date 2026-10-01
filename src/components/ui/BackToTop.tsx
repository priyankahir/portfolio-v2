"use client";

import { m, useScroll, useSpring } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function BackToTop() {
  const [visible, setVisible] = useState(false);
  // Scroll progress drives the ring directly as a motion value — no re-renders.
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    // Sentinel + IntersectionObserver avoids a scroll listener entirely.
    const sentinel = document.createElement("div");
    sentinel.style.cssText = "position:absolute;top:90vh;height:1px;width:1px;";
    document.body.appendChild(sentinel);

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting && entry.boundingClientRect.top < 0),
      { threshold: 0 },
    );
    observer.observe(sentinel);

    return () => {
      observer.disconnect();
      sentinel.remove();
    };
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
      className={cn(
        "group fixed bottom-6 cursor-pointer print:hidden right-5 z-40 grid h-11 w-11 place-items-center rounded-full border border-line bg-elevated text-muted shadow-lg backdrop-blur transition-all duration-300 hover:border-line-strong hover:text-primary md:bottom-8 md:right-8",
        visible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0",
      )}
    >
      {/* Reading-progress ring */}
      <svg
        aria-hidden="true"
        viewBox="0 0 44 44"
        className="pointer-events-none absolute inset-0 h-full w-full -rotate-90"
      >
        <m.circle
          cx="22"
          cy="22"
          r="20.5"
          fill="none"
          stroke="var(--primary)"
          strokeWidth="2"
          strokeLinecap="round"
          style={{ pathLength: progress }}
        />
      </svg>
      <ArrowUp
        className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5"
        aria-hidden="true"
      />
    </button>
  );
}
