"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { homeSectionIds, navItems } from "@/data/navigation";
import { profile } from "@/data/profile";
import { useScrolled } from "@/hooks/useScrolled";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { CommandPaletteTrigger } from "@/components/ui/CommandPalette";

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  /**
   * The drawer is stored as "open for this path" rather than a bare boolean, so
   * navigating away closes it by derivation — no effect syncing route to state.
   */
  const [openForPath, setOpenForPath] = useState<string | null>(null);
  const menuOpen = openForPath === pathname;
  const setMenuOpen = (open: boolean) => setOpenForPath(open ? pathname : null);

  const scrolled = useScrolled(24);
  const activeSection = useScrollSpy(homeSectionIds, isHome);

  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [menuOpen]);

  const isActive = (href: string, sectionId?: string) => {
    if (href.startsWith("/#")) return isHome && activeSection === sectionId;
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <>
      <a
        href="#main"
        className="sr-only left-4 top-4 z-[110] rounded-lg border border-line bg-elevated px-4 py-2 text-sm focus:not-sr-only focus:fixed"
      >
        Skip to content
      </a>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
          scrolled
            ? "border-b border-line bg-bg/80 py-2.5 backdrop-blur-xl"
            : "border-b border-transparent py-4"
        )}
      >
        <nav
          aria-label="Primary"
          className="container-page flex items-center justify-between gap-4"
        >
          <Link
            href="/"
            className="group flex shrink-0 items-center gap-2 font-mono text-sm font-semibold tracking-tight"
          >
            <span
              aria-hidden="true"
              className="grid h-7 w-7 place-items-center rounded-md bg-primary text-[13px] font-bold text-on-primary"
            >
              P
            </span>
            <span className="hidden sm:inline">
              {profile.name.split(" ")[0].toLowerCase()}
              <span className="text-primary">.dev</span>
            </span>
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => {
              const active = isActive(item.href, item.sectionId);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative rounded-md px-3 py-2 font-mono text-[13px] transition-colors duration-200",
                      active ? "text-primary" : "text-muted hover:text-fg"
                    )}
                  >
                    {active && (
                      <motion.span
                        layoutId="nav-active"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        className="absolute inset-0 -z-10 rounded-md bg-primary-soft"
                      />
                    )}
                    <span aria-hidden="true" className="text-faint">
                      /
                    </span>
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex shrink-0 items-center gap-2">
            <CommandPaletteTrigger className="hidden h-9 sm:flex" />
            <ThemeToggle />
            <Link
              href="/contact"
              className="hidden h-9 items-center rounded-lg border border-line-strong bg-primary-soft px-4 font-mono text-xs font-medium text-primary transition-colors hover:bg-primary hover:text-on-primary sm:inline-flex"
            >
              Hire me
            </Link>
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="grid h-9 w-9 place-items-center rounded-lg border border-line text-muted transition-colors hover:text-primary lg:hidden"
            >
              {menuOpen ? (
                <X className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Menu className="h-4 w-4" aria-hidden="true" />
              )}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-bg/95 pt-20 backdrop-blur-xl lg:hidden"
          >
            <motion.ul
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.045, delayChildren: 0.05 } },
              }}
              className="container-page flex flex-col gap-1"
            >
              {navItems.map((item) => (
                <motion.li
                  key={item.href}
                  variants={{
                    hidden: { opacity: 0, x: -12 },
                    visible: { opacity: 1, x: 0 },
                  }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-lg border border-transparent px-4 py-3.5 font-mono text-base transition-colors",
                      isActive(item.href, item.sectionId)
                        ? "border-line-strong bg-primary-soft text-primary"
                        : "text-muted hover:bg-surface-hover hover:text-fg"
                    )}
                  >
                    <span aria-hidden="true" className="text-faint">
                      ~/
                    </span>
                    {item.label}
                  </Link>
                </motion.li>
              ))}
              <motion.li
                variants={{
                  hidden: { opacity: 0, x: -12 },
                  visible: { opacity: 1, x: 0 },
                }}
                className="mt-4"
              >
                <Link
                  href="/contact"
                  onClick={() => setMenuOpen(false)}
                  className="flex h-12 items-center justify-center rounded-lg bg-primary font-mono text-sm font-medium text-on-primary"
                >
                  Hire me
                </Link>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
