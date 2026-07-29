"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * True once the page has scrolled past `threshold`.
 * Reads from the scroll position as an external store so there's no
 * setState-in-effect on mount and no stale value after hydration.
 */
export function useScrolled(threshold = 24): boolean {
  const subscribe = useCallback((onChange: () => void) => {
    window.addEventListener("scroll", onChange, { passive: true });
    return () => window.removeEventListener("scroll", onChange);
  }, []);

  const getSnapshot = useCallback(
    () => window.scrollY > threshold,
    [threshold]
  );

  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
