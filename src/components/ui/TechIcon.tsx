import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type TechName =
  | "react"
  | "nextjs"
  | "nodejs"
  | "express"
  | "mongodb"
  | "typescript"
  | "javascript"
  | "tailwind";

const FONT = "ui-sans-serif, system-ui, sans-serif";

/**
 * Simplified technology marks as inline SVG — no icon package, no network
 * request, server-rendered. Brand colours are baked in; marks that are black
 * or white in the original (Next.js, Express) follow the theme instead.
 * Always decorative: pair them with a visible text label.
 */
const ICONS: Record<TechName, ReactNode> = {
  react: (
    <g>
      <circle cx="12" cy="12" r="2.1" fill="#149eca" />
      <g fill="none" stroke="#149eca" strokeWidth="1.1">
        <ellipse cx="12" cy="12" rx="10" ry="3.8" />
        <ellipse cx="12" cy="12" rx="10" ry="3.8" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="3.8" transform="rotate(120 12 12)" />
      </g>
    </g>
  ),
  nextjs: (
    <g>
      <circle cx="12" cy="12" r="10.5" fill="var(--fg)" />
      <path
        d="M9 16.5V7.5l8 11M15.2 7.5v6.2"
        fill="none"
        stroke="var(--bg)"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  ),
  nodejs: (
    <g>
      <path d="M12 1.6 21.2 6.9v10.2L12 22.4l-9.2-5.3V6.9z" fill="#5fa04e" />
      <text x="12" y="15.4" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#fff" fontFamily={FONT}>
        JS
      </text>
    </g>
  ),
  express: (
    <text x="12" y="16" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--fg)" fontFamily={FONT}>
      ex
    </text>
  ),
  mongodb: (
    <g>
      <path
        d="M12 1.8s-5.6 5.3-5.6 11.3c0 4 2.6 6.7 4.9 7.7L12 22.2l.7-1.4c2.3-1 4.9-3.7 4.9-7.7C17.6 7.1 12 1.8 12 1.8z"
        fill="#47a248"
      />
      <path d="M12 4.5v17" stroke="#2f7d32" strokeWidth="0.9" strokeLinecap="round" />
    </g>
  ),
  typescript: (
    <g>
      <rect x="2" y="2" width="20" height="20" rx="3" fill="#3178c6" />
      <text x="20" y="19.6" textAnchor="end" fontSize="9.5" fontWeight="700" fill="#fff" fontFamily={FONT}>
        TS
      </text>
    </g>
  ),
  javascript: (
    <g>
      <rect x="2" y="2" width="20" height="20" rx="3" fill="#f7df1e" />
      <text x="20" y="19.6" textAnchor="end" fontSize="9.5" fontWeight="700" fill="#111" fontFamily={FONT}>
        JS
      </text>
    </g>
  ),
  tailwind: (
    <path
      d="M12 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.74 1.91 1.35.98 1 2.12 2.15 4.59 2.15 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.91-1.35C15.61 7.15 14.47 6 12 6zm-5 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.74 1.91 1.35C8.39 16.85 9.53 18 12 18c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.91-1.35C10.61 13.15 9.47 12 7 12z"
      fill="#38bdf8"
    />
  ),
};

export function TechIcon({ name, className }: { name: TechName; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className={cn("h-5 w-5", className)}>
      {ICONS[name]}
    </svg>
  );
}
