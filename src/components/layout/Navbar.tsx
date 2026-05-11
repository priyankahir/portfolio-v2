"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "@/components/common/ThemeToggle";

const NAV_LINKS = [
  { name: "~/home", path: "/" },
  { name: "~/about", path: "/#about" },
  { name: "~/services", path: "/#services" },
  { name: "~/skills", path: "/#skills" },
  { name: "~/experience", path: "/#experience" },
  { name: "~/projects", path: "/#projects" },
  { name: "~/resume", path: "/#resume" },
  { name: "~/blog", path: "/blog" },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 pointer-events-none",
        scrolled ? "py-4" : "py-6"
      )}
    >
      <div className="container mx-auto px-4 flex justify-center pointer-events-auto relative">
        <motion.div 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className={cn(
            "flex flex-col w-full max-w-5xl rounded-xl transition-all duration-300 border border-transparent",
            scrolled || isMobileMenuOpen ? "terminal-panel bg-surface-card/90" : "bg-surface-card/60 backdrop-blur-md border-border/50"
          )}
        >
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 w-full">
            <Link 
              href="/" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="font-heading font-bold text-lg sm:text-xl mr-2 tracking-widest text-primary flex items-center gap-1 sm:gap-2 interactive shrink-0 transition-opacity hover:opacity-80"
            >
              <span className="text-secondary">$</span>
              <span className="hidden sm:inline">PB://</span>
            </Link>
            
            <nav className="hidden xl:flex items-center gap-4 xxl:gap-8 font-terminal text-[12px] xxl:text-[13px]">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.path || (link.path !== "/" && pathname.startsWith(link.path));
                const shortName = link.name.replace("~/", "");
                return (
                  <Link
                    key={link.name}
                    href={link.path}
                    className={cn(
                      "transition-all hover:text-primary relative group interactive flex items-center gap-1 uppercase tracking-wider",
                      isActive ? "text-primary font-bold" : "text-secondary/70"
                    )}
                  >
                    <span className="text-[10px] opacity-40 group-hover:text-primary transition-colors">
                      {isActive ? "●" : "○"}
                    </span>
                    {shortName}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-4 sm:gap-6">
              <ThemeToggle />
              <Link 
                href="/#contact" 
                className="hidden lg:flex bg-primary/10 text-primary border border-primary/50 px-4 sm:px-5 py-2 rounded font-terminal text-xs sm:text-sm font-bold hover:bg-primary hover:text-white dark:hover:text-black transition-colors interactive whitespace-nowrap"
              >
                [./init_contact]
              </Link>
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="xl:hidden p-2 text-secondary hover:text-primary transition-colors interactive font-terminal text-sm font-bold"
                aria-label="Toggle Menu"
              >
                {isMobileMenuOpen ? "[X]" : "[MENU]"}
              </button>
            </div>
          </div>

          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.nav
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="xl:hidden border-t border-border/50 bg-black/10 dark:bg-black/40"
              >
                <div className="flex flex-col py-4 px-4 gap-4 font-terminal text-sm">
                  {NAV_LINKS.map((link) => {
                    const isActive = pathname === link.path || (link.path !== "/" && pathname.startsWith(link.path));
                    return (
                      <Link
                        key={link.name}
                        href={link.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn(
                          "transition-all hover:text-primary interactive flex items-center gap-2 py-2 px-4 rounded-lg",
                          isActive ? "text-primary font-bold bg-primary/10 border border-primary/20" : "text-secondary"
                        )}
                      >
                        <span className="text-secondary opacity-50">$</span>
                        {link.name}
                        {isActive && <span className="ml-auto text-primary animate-blink">_</span>}
                      </Link>
                    );
                  })}
                  <Link 
                    href="/#contact" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="md:hidden mt-2 bg-primary/10 text-primary border border-primary/50 px-4 py-3 rounded text-center font-bold hover:bg-primary hover:text-white dark:hover:text-black transition-colors interactive"
                  >
                    [./init_contact]
                  </Link>
                </div>
              </motion.nav>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </header>
  );
}

