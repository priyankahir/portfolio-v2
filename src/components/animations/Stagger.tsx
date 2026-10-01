import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface StaggerProps {
  children: ReactNode;
  className?: string;
}

/**
 * Grid/list wrapper whose `StaggerItem` children cascade into view. The
 * cascade is CSS-only: `.stagger > .reveal:nth-child(n)` shifts each item's
 * scroll range slightly (see globals.css). Server component, no JavaScript.
 */
export function Stagger({ children, className }: StaggerProps) {
  return <div className={cn("stagger", className)}>{children}</div>;
}

export function StaggerItem({ children, className }: StaggerProps) {
  return <div className={cn("reveal", className)}>{children}</div>;
}
