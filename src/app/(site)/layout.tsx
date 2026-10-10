import { MotionProvider } from "@/components/animations/MotionProvider";
import { PointerTracker } from "@/components/animations/PointerTracker";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { BackToTop } from "@/components/ui/BackToTop";
import { CommandPalette } from "@/components/ui/CommandPalette";
import { JsonLd } from "@/components/ui/JsonLd";
import { LazyToaster } from "@/components/ui/LazyToaster";
import { jsonLdGraph, personSchema, websiteSchema } from "@/lib/json-ld";

/**
 * Re-render every page at most once a day. Total experience is computed from
 * the career start date at render time, so this keeps the figure current
 * while pages stay statically served and need no client-side date logic.
 */
export const revalidate = 86400;

export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ThemeProvider>
      <MotionProvider>
        {/* Person + WebSite are site-wide; per-page schemas reference these by @id. */}
        <JsonLd data={jsonLdGraph(personSchema(), websiteSchema())} />

        {/* Provides the ⌘K palette context consumed by the navbar trigger. */}
        <CommandPalette>
          <Navbar />
          <main id="main" className="flex flex-1 flex-col">
            {children}
          </main>
          <Footer />
        </CommandPalette>

        <BackToTop />
        <PointerTracker />
        <LazyToaster />
      </MotionProvider>
    </ThemeProvider>
  );
}
