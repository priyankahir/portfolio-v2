"use client";

import { animate, m, useMotionValue, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { architectureLayers } from "@/data/architecture";
import { useMounted } from "@/hooks/useMounted";
import { cn } from "@/lib/utils";

/**
 * Interactive walkthrough of how a MERN app is put together, layer by layer.
 * Implements the WAI-ARIA tabs pattern: arrow keys move between layers, Home
 * and End jump to the ends, and only the active tab is in the tab order.
 *
 * Every panel is rendered (inactive ones `hidden`), so all of the content is
 * in the server HTML for crawlers even though only one layer shows at a time.
 */
export function Architecture() {
  const [active, setActive] = useState(0);
  /** No entrance animation until the visitor picks a layer, so the first
   *  panel is fully visible in the server-rendered HTML. */
  const [interacted, setInteracted] = useState(false);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const baseId = useId();
  const mounted = useMounted();
  const reduceMotion = useReducedMotion();

  // Sliding "selected" card behind the tabs. Motion values only — moving it
  // never re-renders. Measured from the tab itself, so it works for both the
  // vertical desktop list and the horizontally scrolling mobile row.
  const pillX = useMotionValue(0);
  const pillY = useMotionValue(0);
  const pillW = useMotionValue(0);
  const pillH = useMotionValue(0);
  const pillOpacity = useMotionValue(0);

  useEffect(() => {
    const place = (instant: boolean) => {
      const tab = tabRefs.current[active];
      if (!tab) return;
      const jump = instant || reduceMotion || pillOpacity.get() === 0;
      const transition = jump
        ? { duration: 0 }
        : ({ type: "spring", stiffness: 380, damping: 32 } as const);
      animate(pillX, tab.offsetLeft, transition);
      animate(pillY, tab.offsetTop, transition);
      animate(pillW, tab.offsetWidth, transition);
      animate(pillH, tab.offsetHeight, transition);
      pillOpacity.set(1);
    };
    place(false);
    const onResize = () => place(true);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [active, reduceMotion, pillX, pillY, pillW, pillH, pillOpacity]);

  const select = (index: number) => {
    const next = (index + architectureLayers.length) % architectureLayers.length;
    setActive(next);
    setInteracted(true);
    tabRefs.current[next]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent) => {
    const keys: Record<string, () => void> = {
      ArrowDown: () => select(active + 1),
      ArrowRight: () => select(active + 1),
      ArrowUp: () => select(active - 1),
      ArrowLeft: () => select(active - 1),
      Home: () => select(0),
      End: () => select(architectureLayers.length - 1),
    };
    const action = keys[event.key];
    if (action) {
      event.preventDefault();
      action();
    }
  };

  return (
    <Section id="architecture" tinted>
      <SectionHeading
        eyebrow="Architecture"
        title="How I build a MERN application"
        description="The decisions behind each layer of the stack — pick one to see why."
      />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,19rem)_minmax(0,1fr)] lg:gap-10">
        {/* ---- Layer list (tabs) ---- */}
        <div
          role="tablist"
          aria-label="Application layers"
          aria-orientation="vertical"
          onKeyDown={onKeyDown}
          className="hide-scrollbar relative -mx-1 flex gap-2 overflow-x-auto px-1 pb-1 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0 lg:pb-0"
        >
          {/* Animated data-flow rail between layers (desktop only). */}
          <span
            aria-hidden="true"
            className="absolute left-[1.6rem] top-6 bottom-6 hidden w-px animate-[flow_1.2s_linear_infinite] bg-[length:1px_12px] bg-repeat-y [background-image:linear-gradient(to_bottom,var(--primary)_50%,transparent_50%)] opacity-40 lg:block"
          />

          <m.span
            aria-hidden="true"
            style={{
              x: pillX,
              y: pillY,
              width: pillW,
              height: pillH,
              opacity: pillOpacity,
            }}
            className="pointer-events-none absolute left-0 top-0 rounded-xl border border-line-strong bg-elevated shadow-[0_12px_32px_-16px_var(--glow)]"
          />

          {architectureLayers.map((layer, index) => {
            const selected = index === active;
            return (
              <button
                key={layer.id}
                ref={(node) => {
                  tabRefs.current[index] = node;
                }}
                type="button"
                role="tab"
                id={`${baseId}-tab-${layer.id}`}
                aria-selected={selected}
                aria-controls={`${baseId}-panel-${layer.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => {
                  setActive(index);
                  setInteracted(true);
                }}
                className={cn(
                  "group relative flex shrink-0 items-center gap-3 rounded-xl border px-3 py-3 text-left transition-all duration-300 lg:w-full",
                  selected
                    ? // Before hydration the tab draws its own highlight; after,
                      // the sliding card behind it takes over.
                      mounted
                      ? "border-transparent bg-transparent"
                      : "border-line-strong bg-elevated shadow-[0_12px_32px_-16px_var(--glow)]"
                    : "border-line bg-surface hover:border-line-strong hover:bg-surface-hover",
                )}
              >
                <span
                  className={cn(
                    "relative z-10 grid h-8 w-8 shrink-0 place-items-center rounded-lg border font-mono text-[11px] font-semibold transition-colors duration-300",
                    selected
                      ? "border-primary bg-primary text-on-primary"
                      : "border-line bg-bg text-faint group-hover:text-primary",
                  )}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0">
                  <span
                    className={cn(
                      "block text-sm font-semibold",
                      selected ? "text-fg" : "text-muted",
                    )}
                  >
                    {layer.label}
                  </span>
                  <span className="block truncate font-mono text-[11px] text-faint">
                    {layer.tech}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        {/* ---- Panels ---- */}
        <div className="min-w-0">
          {architectureLayers.map((layer, index) => (
            <div
              key={layer.id}
              role="tabpanel"
              id={`${baseId}-panel-${layer.id}`}
              aria-labelledby={`${baseId}-tab-${layer.id}`}
              hidden={index !== active}
              tabIndex={0}
              className="rounded-[var(--radius-panel)] focus-visible:outline-offset-4"
            >
              {/* Re-keyed on activation so the entrance replays each time a
                  layer is opened; inactive panels keep their markup. */}
              <m.div
                key={index === active ? "active" : "idle"}
                initial={interacted ? { opacity: 0, y: 10 } : false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="h-full"
              >
                <article className="panel h-full p-6 md:p-8">
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-primary">
                    {layer.tech}
                  </p>
                  <h3 className="mt-3 text-xl font-semibold leading-snug">
                    {layer.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {layer.summary}
                  </p>
                  <ul className="mt-5 space-y-2.5">
                    {layer.decisions.map((decision) => (
                      <li key={decision} className="flex gap-3 text-sm text-muted">
                        <Check
                          className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                          aria-hidden="true"
                        />
                        <span className="leading-relaxed">{decision}</span>
                      </li>
                    ))}
                  </ul>
                  <ul className="mt-6 flex flex-wrap gap-1.5">
                    {layer.stack.map((item) => (
                      <li
                        key={item}
                        className="rounded-md border border-line bg-bg px-2 py-1 font-mono text-[11px] leading-none text-faint"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              </m.div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
