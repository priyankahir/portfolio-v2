import { Info, Lightbulb, TriangleAlert } from "lucide-react";
import type { ComponentType } from "react";
import type { PostBlock } from "@/types";

const CALLOUT_ICONS: Record<string, ComponentType<{ className?: string }>> = {
  info: Info,
  warn: TriangleAlert,
  tip: Lightbulb,
};

/** Turns a heading's text into a stable anchor id, shared with the TOC. */
export function headingId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

/**
 * Renders the structured post body. Blocks are a closed union, so adding a new
 * kind is a type error here until it's handled — no silently-dropped content.
 */
export function PostBody({ blocks }: { blocks: PostBlock[] }) {
  return (
    <div className="prose-body">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "heading": {
            const id = headingId(block.text);
            return block.level === 2 ? (
              <h2 key={index} id={id}>
                {block.text}
              </h2>
            ) : (
              <h3 key={index} id={id}>
                {block.text}
              </h3>
            );
          }

          case "paragraph":
            return <p key={index}>{block.text}</p>;

          case "list":
            return block.ordered ? (
              <ol key={index} className="ml-1 space-y-2.5">
                {block.items.map((item, itemIndex) => (
                  <li key={item} className="flex gap-3">
                    <span
                      aria-hidden="true"
                      className="shrink-0 font-mono text-sm text-primary"
                    >
                      {itemIndex + 1}.
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>
            ) : (
              <ul key={index} className="ml-1 space-y-2.5">
                {block.items.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-primary"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            );

          case "code":
            return (
              <figure key={index} className="panel-solid overflow-hidden">
                <figcaption className="flex items-center justify-between border-b border-line bg-bg-subtle px-4 py-2">
                  <span className="font-mono text-[11px] text-faint">
                    {block.caption ?? "example"}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-primary">
                    {block.language}
                  </span>
                </figcaption>
                <pre className="overflow-x-auto p-4 text-[13px] leading-relaxed">
                  <code className="!bg-transparent !p-0 !text-fg">{block.code}</code>
                </pre>
              </figure>
            );

          case "callout": {
            const CalloutIcon = CALLOUT_ICONS[block.tone] ?? Info;
            return (
              <aside
                key={index}
                className="flex gap-3 rounded-lg border border-line-strong bg-primary-soft p-4"
              >
                <CalloutIcon
                  className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                  aria-hidden="true"
                />
                <p className="!mt-0 text-[15px] leading-relaxed text-fg">
                  {block.text}
                </p>
              </aside>
            );
          }

          case "quote":
            return (
              <blockquote
                key={index}
                className="border-l-2 border-line-strong pl-5 italic text-fg"
              >
                {block.text}
                {block.cite && (
                  <cite className="mt-2 block text-sm not-italic text-faint">
                    — {block.cite}
                  </cite>
                )}
              </blockquote>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
