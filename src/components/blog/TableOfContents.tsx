"use client";

import { useMemo } from "react";
import { headingId } from "@/components/blog/PostBody";
import { useMounted } from "@/hooks/useMounted";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { cn } from "@/lib/utils";
import type { PostBlock } from "@/types";

export function TableOfContents({ blocks }: { blocks: PostBlock[] }) {
  const headings = useMemo(
    () =>
      blocks
        .filter(
          (block): block is Extract<PostBlock, { type: "heading" }> =>
            block.type === "heading" && block.level === 2
        )
        .map((block) => ({ id: headingId(block.text), text: block.text })),
    [blocks]
  );

  const ids = useMemo(() => headings.map((heading) => heading.id), [headings]);
  const active = useScrollSpy(ids);
  // Headings are rendered by a sibling, so only trust the spy after hydration.
  const ready = useMounted();

  if (headings.length < 2) return null;

  return (
    <nav aria-label="On this page" className="hidden lg:block">
      <div className="sticky top-28">
        <p className="mb-4 font-mono text-[10px] uppercase tracking-widest text-faint">
          On this page
        </p>
        <ul className="space-y-1 border-l border-line">
          {headings.map((heading) => (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                className={cn(
                  "-ml-px block border-l py-1.5 pl-4 text-sm transition-colors",
                  ready && active === heading.id
                    ? "border-primary text-primary"
                    : "border-transparent text-faint hover:text-fg"
                )}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
