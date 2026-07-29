import { cn } from "@/lib/utils";

/**
 * Infinite horizontal ticker. Pure CSS — the list is duplicated once and
 * translated by -50%, so there is no JavaScript on the scroll path.
 */
export function Marquee({
  items,
  className,
}: {
  items: string[];
  className?: string;
}) {
  return (
    <div
      className={cn("mask-fade-x group relative overflow-hidden", className)}
      role="presentation"
    >
      <ul className="flex w-max animate-[marquee_42s_linear_infinite] items-center gap-3 group-hover:[animation-play-state:paused]">
        {[...items, ...items].map((item, index) => (
          <li
            key={`${item}-${index}`}
            aria-hidden={index >= items.length}
            className="flex shrink-0 items-center gap-3 font-mono text-xs text-faint"
          >
            <span className="whitespace-nowrap">{item}</span>
            <span className="text-primary/50">◇</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
