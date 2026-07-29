"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Subscribes to a media query. `useSyncExternalStore` is the right primitive
 * here: matchMedia is an external store, and this avoids the extra render an
 * effect-plus-setState version would cause on mount.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const list = window.matchMedia(query);
      list.addEventListener("change", onChange);
      return () => list.removeEventListener("change", onChange);
    },
    [query]
  );

  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query]);

  // No media queries match during SSR — assume the permissive default.
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}

/** Callers should skip decorative animation entirely when this is true. */
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}
