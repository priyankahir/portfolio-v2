import {
  Accessibility,
  Atom,
  BookOpen,
  Circle,
  Code2,
  Database,
  Gauge,
  Layers,
  LayoutDashboard,
  Network,
  Palette,
  PenTool,
  Rocket,
  Search,
  Server,
  ShieldCheck,
  Sparkles,
  Wrench,
} from "lucide-react";
import type { ComponentType } from "react";

/**
 * Explicit registry rather than `import * as Icons` — a namespace import pulls
 * every lucide icon into the bundle, which is ~1000 modules we don't render.
 */
const REGISTRY: Record<string, ComponentType<{ className?: string }>> = {
  Accessibility,
  Atom,
  BookOpen,
  Code2,
  Database,
  Gauge,
  Layers,
  LayoutDashboard,
  Network,
  Palette,
  PenTool,
  Rocket,
  Search,
  Server,
  ShieldCheck,
  Sparkles,
  Wrench,
};

export function Icon({ name, className }: { name: string; className?: string }) {
  const Resolved = REGISTRY[name] ?? Circle;
  return <Resolved className={className} aria-hidden="true" />;
}
