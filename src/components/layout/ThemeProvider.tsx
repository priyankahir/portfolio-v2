"use client";

import { ThemeProvider as NextThemeProvider } from "next-themes";
import type { ReactNode } from "react";

/**
 * next-themes injects a blocking script that sets the `.dark` class before
 * first paint, so there is no flash of the wrong theme on load.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemeProvider
      attribute="class"
      // Follow the OS on first visit; the toggle then pins an explicit choice.
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      storageKey="pb-theme"
    >
      {children}
    </NextThemeProvider>
  );
}
