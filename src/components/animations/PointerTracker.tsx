"use client";

import { useEffect } from "react";

/**
 * Drives the `[data-spotlight]` hover glow (see globals.css) for the whole site
 * with ONE passive listener, instead of a listener and React state per card.
 * Writes are batched to one per animation frame and touch only CSS custom
 * properties, so there are no React re-renders and no layout work.
 *
 * Skipped entirely on touch devices and for reduced-motion users.
 */
export function PointerTracker() {
  useEffect(() => {
    const capable = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)"
    );
    if (!capable.matches) return;

    let frame = 0;
    let latest: PointerEvent | null = null;

    const flush = () => {
      frame = 0;
      const event = latest;
      if (!event) return;
      const target = (event.target as Element | null)?.closest<HTMLElement>(
        "[data-spotlight]"
      );
      if (!target) return;
      const rect = target.getBoundingClientRect();
      target.style.setProperty("--mx", `${event.clientX - rect.left}px`);
      target.style.setProperty("--my", `${event.clientY - rect.top}px`);
    };

    const onMove = (event: PointerEvent) => {
      latest = event;
      if (!frame) frame = requestAnimationFrame(flush);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
