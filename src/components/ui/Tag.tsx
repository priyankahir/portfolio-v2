import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TagProps {
  children: ReactNode;
  className?: string;
  tone?: "default" | "primary" | "outline";
  size?: "sm" | "md";
}

const TONES: Record<NonNullable<TagProps["tone"]>, string> = {
  default: "border-line bg-surface text-muted",
  primary: "border-line-strong bg-primary-soft text-primary",
  outline: "border-line bg-transparent text-faint",
};

export function Tag({
  children,
  className,
  tone = "default",
  size = "sm",
}: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border font-mono leading-none",
        size === "sm" ? "px-2 py-1 text-[11px]" : "px-2.5 py-1.5 text-xs",
        TONES[tone],
        className
      )}
    >
      {children}
    </span>
  );
}

/** Renders a stack list, collapsing the overflow into a "+N" chip. */
export function TagList({
  items,
  max,
  tone = "default",
  className,
}: {
  items: string[];
  max?: number;
  tone?: TagProps["tone"];
  className?: string;
}) {
  const visible = max ? items.slice(0, max) : items;
  const overflow = max ? items.length - visible.length : 0;

  return (
    <ul className={cn("flex flex-wrap gap-1.5", className)}>
      {visible.map((item) => (
        <li key={item}>
          <Tag tone={tone}>{item}</Tag>
        </li>
      ))}
      {overflow > 0 && (
        <li>
          <Tag tone="outline">+{overflow}</Tag>
        </li>
      )}
    </ul>
  );
}
