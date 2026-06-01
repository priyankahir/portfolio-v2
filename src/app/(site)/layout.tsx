import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CommandPalette } from "@/components/ui/CommandPalette";
import { ThemeProvider } from "@/components/common/ThemeProvider";
import { Toaster } from "sonner";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider defaultTheme="dark">
      <div className="scanline" />
      <CommandPalette />
      <Navbar />
      <main className="flex-1 flex flex-col">{children}</main>
      <Footer />
      <Toaster theme="dark" position="bottom-right" />
    </ThemeProvider>
  );
}
