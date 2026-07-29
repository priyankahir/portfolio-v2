"use client";

import { useSyncExternalStore } from "react";

const noop = () => () => {};

/**
 * False during SSR and the hydration pass, true afterwards.
 * `useSyncExternalStore` gives this without a setState-in-effect, so the client
 * and server snapshots differ by design rather than by a render cascade.
 */
export function useMounted(): boolean {
  return useSyncExternalStore(
    noop,
    () => true,
    () => false
  );
}
