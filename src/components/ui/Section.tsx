import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/animations/Reveal";

interface SectionProps {
  id?: string;
  children: ReactNode;
  className?: string;
  /** Adds a faint tinted background to break up long scrolls. */
  tinted?: boolean;
  /** Constrains content to prose width instead of full page width. */
  narrow?: boolean;
}

/** Semantic section wrapper with consistent vertical rhythm. */
export function Section({
  id,
  children,
  className,
  tinted = false,
  narrow = false,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative scroll-mt-24 py-20 md:py-28",
        tinted && "bg-bg-subtle",
        className
      )}
    >
      {tinted && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-line-strong to-transparent"
        />
      )}
      <div className={narrow ? "container-prose" : "container-page"}>{children}</div>
    </section>
  );
}

interface SectionHeadingProps {
  /** Terminal-style eyebrow, e.g. "cat about.md" */
  command: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  action?: ReactNode;
}

/** Shared heading treatment: monospace command line, display title, blurb. */
export function SectionHeading({
  command,
  title,
  description,
  align = "left",
  className,
  action,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        "mb-12 md:mb-16",
        align === "center" && "text-center",
        className
      )}
    >
      <div
        className={cn(
          "flex flex-col gap-6 md:flex-row md:items-end md:justify-between",
          align === "center" && "md:flex-col md:items-center"
        )}
      >
        <div className={cn("max-w-2xl", align === "center" && "mx-auto")}>
          <p
            className={cn(
              "mb-4 flex items-center gap-2 font-mono text-xs tracking-wider text-primary",
              align === "center" && "justify-center"
            )}
          >
            <span aria-hidden="true" className="text-faint">
              $
            </span>
            {command}
          </p>
          <h2 className="text-3xl font-semibold leading-tight sm:text-4xl md:text-[2.75rem]">
            {title}
          </h2>
          {description && (
            <p className="mt-4 text-base leading-relaxed text-muted">{description}</p>
          )}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
    </Reveal>
  );
}
