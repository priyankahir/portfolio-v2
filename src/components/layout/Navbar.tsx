"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Projects", path: "/projects" },
  { name: "Blogs", path: "/blogs" },
  { name: "Contact", path: "/contact" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full glass border-b border-border/40">
      <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-heading font-bold text-xl tracking-tight">
          Priyank<span className="text-accent">.</span>
        </Link>
        <nav className="hidden md:flex gap-6">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.path || (link.path !== "/" && pathname.startsWith(link.path));
            return (
              <Link
                key={link.name}
                href={link.path}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  isActive ? "text-primary" : "text-secondary"
                )}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>
        {/* Mobile menu placeholder */}
        <button className="md:hidden p-2 text-secondary hover:text-primary">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
        </button>
      </div>
    </header>
  );
}
