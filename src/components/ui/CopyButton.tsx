"use client";

import { Check, Copy } from "lucide-react";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { cn } from "@/lib/utils";

export function CopyButton({
  value,
  label,
  className,
}: {
  value: string;
  label: string;
  className?: string;
}) {
  const { copied, copy } = useCopyToClipboard();
  const isCopied = copied === value;

  return (
    <button
      type="button"
      onClick={() => copy(value)}
      aria-label={isCopied ? `${label} copied` : `Copy ${label}`}
      className={cn(
        "grid h-8 w-8 shrink-0 place-items-center rounded-md border border-line text-faint transition-colors hover:border-line-strong hover:text-primary",
        className
      )}
    >
      {isCopied ? (
        <Check className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
      ) : (
        <Copy className="h-3.5 w-3.5" aria-hidden="true" />
      )}
      <span aria-live="polite" className="sr-only">
        {isCopied ? "Copied to clipboard" : ""}
      </span>
    </button>
  );
}
