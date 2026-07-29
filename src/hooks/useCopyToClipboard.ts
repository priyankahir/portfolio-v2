"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/** Copies text and reports success for a short window, for "Copied!" affordances. */
export function useCopyToClipboard(resetAfter = 2000) {
  const [copied, setCopied] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    []
  );

  const copy = useCallback(
    async (value: string, key = value) => {
      try {
        await navigator.clipboard.writeText(value);
        setCopied(key);
        if (timer.current) clearTimeout(timer.current);
        timer.current = setTimeout(() => setCopied(null), resetAfter);
        return true;
      } catch {
        return false;
      }
    },
    [resetAfter]
  );

  return { copied, copy };
}
