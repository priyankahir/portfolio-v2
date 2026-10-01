import { useId } from "react";
import { BRAND, LOGO_DOT, LOGO_PATHS, LOGO_STROKE, LOGO_VIEWBOX } from "@/lib/brand";
import { cn } from "@/lib/utils";

/**
 * "PB." monogram — dark tile, gradient ligature, accent full stop. Uses fixed
 * brand colours so it looks identical in both themes (see `BRAND`).
 * Decorative by default — pair it with visible text (as the navbar and footer
 * do) or pass a `title` to make it a labelled image.
 */
export function Logo({ className, title }: { className?: string; title?: string }) {
  // Unique per instance: two logos on one page must not share a gradient id.
  const gradientId = `pb-${useId().replace(/:/g, "")}`;

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
        <linearGradient
          id={gradientId}
          x1="6"
          y1="6"
          x2="26"
          y2="26"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor={BRAND.from} />
          <stop offset="1" stopColor={BRAND.to} />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="9" fill={BRAND.tile} />
      <rect
        x="0.5"
        y="0.5"
        width="31"
        height="31"
        rx="8.5"
        fill="none"
        stroke={BRAND.from}
        strokeOpacity="0.3"
      />
      <g
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth={LOGO_STROKE}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {LOGO_PATHS.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
      <circle {...LOGO_DOT} fill={BRAND.from} />
    </svg>
  );
}
