"use client";

import { animate, m, useMotionValue, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/types";

/**
 * Desktop nav with a highlight pill that glides to whichever link is hovered or
 * focused, and rests on the active one. Position and width are motion values
 * animated imperatively — moving the pill never re-renders React.
 */
export function NavLinks({
  items,
  isActive,
}: {
  items: NavItem[];
  isActive: (href: string, sectionId?: string) => boolean;
}) {
  const listRef = useRef<HTMLUListElement>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const reduceMotion = useReducedMotion();

  const activeHref = items.find((item) => isActive(item.href, item.sectionId))?.href ?? null;
  const target = hovered ?? activeHref;

  const x = useMotionValue(0);
  const width = useMotionValue(0);
  const opacity = useMotionValue(0);

  useEffect(() => {
    const place = (instant: boolean) => {
      const element = target
        ? listRef.current?.querySelector<HTMLElement>(`[data-href="${CSS.escape(target)}"]`)
        : null;
      if (!element) {
        animate(opacity, 0, { duration: 0.2 });
        return;
      }
      // Appear in place the first time; glide on every move after that.
      const jump = instant || reduceMotion || opacity.get() === 0;
      const transition = jump
        ? { duration: 0 }
        : ({ type: "spring", stiffness: 420, damping: 34 } as const);
      animate(x, element.offsetLeft, transition);
      animate(width, element.offsetWidth, transition);
      animate(opacity, 1, { duration: 0.2 });
    };

    place(false);
    const onResize = () => place(true);
    window.addEventListener("resize", onResize);
    // Web fonts change link widths once they load.
    void document.fonts?.ready.then(() => place(true));
    return () => window.removeEventListener("resize", onResize);
  }, [target, reduceMotion, x, width, opacity]);

  return (
    <ul
      ref={listRef}
      onMouseLeave={() => setHovered(null)}
      className="relative hidden items-center gap-0.5 lg:flex xl:gap-1"
    >
      <m.span
        aria-hidden="true"
        style={{ x, width, opacity }}
        className="pointer-events-none absolute inset-y-0 left-0 rounded-md bg-primary-soft"
      />

      {items.map((item) => {
        const active = isActive(item.href, item.sectionId);
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              data-href={item.href}
              aria-current={active ? "page" : undefined}
              onMouseEnter={() => setHovered(item.href)}
              onFocus={() => setHovered(item.href)}
              onBlur={() => setHovered(null)}
              className={cn(
                "relative block rounded-md px-2.5 py-2 font-mono text-[13px] transition-colors duration-200 xl:px-3",
                active ? "text-primary" : "text-muted hover:text-fg"
              )}
            >
              <span aria-hidden="true" className="text-faint">
                /
              </span>
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
