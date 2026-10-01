"use client";

import { useState } from "react";
import { TypeLine } from "@/components/animations/TypeLine";

/**
 * Cycles through role titles with a typing effect. Kept as its own tiny client
 * island so the rest of the hero stays a server component.
 */
export function RoleTicker({ roles }: { roles: string[] }) {
  const [index, setIndex] = useState(0);

  return (
    <TypeLine
      key={index}
      text={roles[index]}
      speed={45}
      // Only the first role waits; later ones start almost at once so the line
      // is never sitting visibly empty.
      delay={index === 0 ? 700 : 120}
      className="text-fg"
      onDone={() =>
        setTimeout(() => setIndex((current) => (current + 1) % roles.length), 2600)
      }
    />
  );
}
