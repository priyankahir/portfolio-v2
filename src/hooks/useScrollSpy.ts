"use client";

import { useEffect, useState } from "react";

/**
 * Returns the id of the section currently occupying the reading area.
 * Uses a single IntersectionObserver rather than a scroll listener so it
 * doesn't run work on every frame.
 */
export function useScrollSpy(sectionIds: string[], enabled = true): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled || sectionIds.length === 0) return;

    const visible = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visible.set(entry.target.id, entry.intersectionRatio);
          } else {
            visible.delete(entry.target.id);
          }
        }

        if (visible.size === 0) return;

        // Prefer the section closest to the top of the reading area.
        const next = sectionIds.find((id) => visible.has(id));
        if (next) setActiveId(next);
      },
      {
        // Reading area: below the header, above the fold's lower third.
        rootMargin: "-96px 0px -55% 0px",
        threshold: [0, 0.25, 0.5],
      }
    );

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [sectionIds, enabled]);

  // Derived rather than stored, so disabling never needs a setState in an effect.
  return enabled ? activeId : null;
}
