import { Toaster } from "sonner";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { BackToTop } from "@/components/ui/BackToTop";
import { CommandPalette } from "@/components/ui/CommandPalette";
import { JsonLd } from "@/components/ui/JsonLd";
import { jsonLdGraph, personSchema, websiteSchema } from "@/lib/json-ld";

export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ThemeProvider>
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
      <Toaster
        position="bottom-center"
        toastOptions={{
          className:
            "!bg-[var(--elevated)] !text-[var(--fg)] !border !border-[var(--line)] !font-sans",
        }}
      />
    </ThemeProvider>
  );
}
