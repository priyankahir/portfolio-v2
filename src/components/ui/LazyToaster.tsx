"use client";

import dynamic from "next/dynamic";

/**
 * Toast host, loaded after hydration instead of in the initial bundle: toasts
 * only ever appear after a user action (the contact form), so the library has
 * no reason to sit on the critical path. Callers import `toast` lazily too.
 */
const Toaster = dynamic(() => import("sonner").then((mod) => mod.Toaster), {
  ssr: false,
});

export function LazyToaster() {
  return (
    <Toaster
      position="bottom-center"
      toastOptions={{
        className:
          "!bg-[var(--elevated)] !text-[var(--fg)] !border !border-[var(--line)] !font-sans",
      }}
    />
  );
}
