import { useId } from "react";
import { BRAND, LOGO_PATHS, LOGO_RADIUS, LOGO_STROKE, LOGO_VIEWBOX } from "@/lib/brand";
import { cn } from "@/lib/utils";

/**
 * "PB" monogram — brand-gradient tile with bold dark letters and a soft top
 * highlight. Uses fixed brand colours so it looks identical in both themes
 * (see `BRAND`). Decorative by default — pair it with visible text (as the
 * navbar and footer do) or pass a `title` to make it a labelled image.
 */
export function Logo({ className, title }: { className?: string; title?: string }) {
  // Unique per instance: two logos on one page must not share gradient ids.
  const id = `pb-${useId().replace(/:/g, "")}`;

  return (
    <svg
      viewBox={LOGO_VIEWBOX}
      className={cn("h-8 w-8 shrink-0", className)}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      focusable="false"
    >
      <defs>
        <linearGradient id={`${id}-tile`} x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor={BRAND.from} />
          <stop offset="1" stopColor={BRAND.to} />
        </linearGradient>
        <linearGradient id={`${id}-shine`} x1="0" y1="0" x2="0" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#fff" stopOpacity="0.35" />
          <stop offset="0.55" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx={LOGO_RADIUS} fill={`url(#${id}-tile)`} />
      <rect width="32" height="32" rx={LOGO_RADIUS} fill={`url(#${id}-shine)`} />
      <g
        fill="none"
        stroke={BRAND.ink}
        strokeWidth={LOGO_STROKE}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {LOGO_PATHS.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
    </svg>
  );
}
