import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TerminalWindowProps {
  /** Text shown in the title bar, e.g. "priyank@portfolio: ~" */
  title: string;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
  /** Optional right-aligned status chip in the title bar. */
  status?: string;
}

/**
 * Chrome-only terminal frame. Purely presentational so it can stay a server
 * component — interactive terminals compose their own body inside it.
 */
export function TerminalWindow({
  title,
  children,
  className,
  bodyClassName,
  status,
}: TerminalWindowProps) {
  return (
    <div className={cn("panel-solid overflow-hidden", className)}>
      <div className="flex items-center gap-3 border-b border-line bg-bg-subtle px-4 py-2.5">
        <div aria-hidden="true" className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/70" />
        </div>
        <span className="min-w-0 flex-1 truncate text-center font-mono text-[11px] text-faint">
          {title}
        </span>
        {status ? (
          <span className="flex shrink-0 items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            {status}
          </span>
        ) : (
          <span aria-hidden="true" className="w-[52px] shrink-0" />
        )}
      </div>
      <div className={cn("p-5 font-mono text-sm md:p-6", bodyClassName)}>
        {children}
      </div>
    </div>
  );
}
