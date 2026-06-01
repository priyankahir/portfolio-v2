import type { Metadata } from "next";
import { Inter, VT323, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { constructMetadata } from "@/lib/metadata";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const vt323 = VT323({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-vt323",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = constructMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${vt323.variable} ${jetbrainsMono.variable} font-sans antialiased bg-background text-foreground min-h-screen flex flex-col crt-overlay transition-colors duration-300`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
