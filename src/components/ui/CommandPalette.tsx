"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  CornerDownLeft,
  Download,
  FileText,
  Home,
  Mail,
  Moon,
  Search,
  Sparkles,
  Sun,
  User,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ComponentType,
  type ReactNode,
} from "react";
import { posts } from "@/data/posts";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { cn } from "@/lib/utils";

interface Command {
  id: string;
  label: string;
  hint: string;
  group: string;
  icon: ComponentType<{ className?: string }>;
  /** Extra text matched by the fuzzy filter but not displayed. */
  keywords?: string;
  run: (ctx: CommandContext) => void;
}

interface CommandContext {
  router: ReturnType<typeof useRouter>;
  setTheme: (theme: string) => void;
  isDark: boolean;
  close: () => void;
}

const navigate = (path: string) => (ctx: CommandContext) => {
  ctx.close();
  ctx.router.push(path);
};

function buildCommands(isDark: boolean): Command[] {
  return [
    {
      id: "home",
      label: "Home",
      hint: "/",
      group: "Navigate",
      icon: Home,
      run: navigate("/"),
    },
    {
      id: "about",
      label: "About",
      hint: "/about",
      group: "Navigate",
      icon: User,
      keywords: "bio background story",
      run: navigate("/about"),
    },
    {
      id: "projects",
      label: "Projects",
      hint: "/projects",
      group: "Navigate",
      icon: Briefcase,
      keywords: "work case studies portfolio",
      run: navigate("/projects"),
    },
    {
      id: "blog",
      label: "Blog",
      hint: "/blog",
      group: "Navigate",
      icon: BookOpen,
      keywords: "writing articles notes",
      run: navigate("/blog"),
    },
    {
      id: "resume",
      label: "Résumé",
      hint: "/resume",
      group: "Navigate",
      icon: FileText,
      keywords: "cv experience",
      run: navigate("/resume"),
    },
    {
      id: "contact",
      label: "Contact",
      hint: "/contact",
      group: "Navigate",
      icon: Mail,
      keywords: "email hire reach out",
      run: navigate("/contact"),
    },
    ...projects.map<Command>((project) => ({
      id: `project-${project.slug}`,
      label: project.title,
      hint: project.domain,
      group: "Projects",
      icon: Sparkles,
      keywords: `${project.subtitle} ${project.stack.join(" ")}`,
      run: navigate(`/projects/${project.slug}`),
    })),
    ...posts.map<Command>((post) => ({
      id: `post-${post.slug}`,
      label: post.title,
      hint: post.category,
      group: "Writing",
      icon: BookOpen,
      keywords: `${post.excerpt} ${post.tags.join(" ")}`,
      run: navigate(`/blog/${post.slug}`),
    })),
    {
      id: "download-cv",
      label: "Download résumé (PDF)",
      hint: "Save to device",
      group: "Actions",
      icon: Download,
      keywords: "cv pdf download",
      run: (ctx) => {
        ctx.close();
        const link = document.createElement("a");
        link.href = profile.resumePath;
        link.download = profile.resumeFileName;
        link.click();
      },
    },
    {
      id: "copy-email",
      label: "Copy email address",
      hint: profile.email,
      group: "Actions",
      icon: Mail,
      keywords: "mail contact clipboard",
      run: (ctx) => {
        ctx.close();
        void navigator.clipboard.writeText(profile.email);
      },
    },
    {
      id: "theme",
      label: `Switch to ${isDark ? "light" : "dark"} theme`,
      hint: "Toggle appearance",
      group: "Actions",
      icon: isDark ? Sun : Moon,
      keywords: "dark light mode appearance",
      run: (ctx) => {
        ctx.setTheme(ctx.isDark ? "light" : "dark");
        ctx.close();
      },
    },
  ];
}

/** Subsequence match — "cwv" finds "Core Web Vitals". */
function fuzzyMatch(haystack: string, needle: string): boolean {
  if (!needle) return true;
  const target = haystack.toLowerCase();
  const query = needle.toLowerCase();
  if (target.includes(query)) return true;

  let cursor = 0;
  for (const char of query) {
    cursor = target.indexOf(char, cursor);
    if (cursor === -1) return false;
    cursor += 1;
  }
  return true;
}

const CommandPaletteContext = createContext<{ open: () => void } | null>(null);

/** Lets any component (e.g. the navbar button) open the palette. */
export function useCommandPalette() {
  const context = useContext(CommandPaletteContext);
  if (!context) {
    throw new Error("useCommandPalette must be used within <CommandPalette>");
  }
  return context;
}

export function CommandPalette({ children }: { children?: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();
  const listRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  const isDark = resolvedTheme === "dark";

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActiveIndex(0);
  }, []);

  const results = useMemo(() => {
    const commands = buildCommands(isDark);
    if (!query.trim()) return commands;
    return commands.filter((command) =>
      fuzzyMatch(
        `${command.label} ${command.hint} ${command.keywords ?? ""}`,
        query.trim()
      )
    );
  }, [query, isDark]);

  const grouped = useMemo(() => {
    const map = new Map<string, Command[]>();
    results.forEach((command) => {
      const bucket = map.get(command.group) ?? [];
      bucket.push(command);
      map.set(command.group, bucket);
    });
    return [...map.entries()];
  }, [results]);

  // Global ⌘K / Ctrl+K listener.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen((value) => !value);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // Lock body scroll while the dialog is open.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  // Keep the highlighted row inside the scroll viewport.
  useEffect(() => {
    listRef.current
      ?.querySelector<HTMLElement>(`[data-index="${activeIndex}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      event.preventDefault();
      close();
      return;
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index) => (index + 1) % Math.max(1, results.length));
      return;
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex(
        (index) => (index - 1 + results.length) % Math.max(1, results.length)
      );
      return;
    }
    if (event.key === "Enter") {
      event.preventDefault();
      results[activeIndex]?.run({ router, setTheme, isDark, close });
    }
  };

  let flatIndex = -1;

  const contextValue = useMemo(() => ({ open: () => setOpen(true) }), []);

  return (
    <CommandPaletteContext.Provider value={contextValue}>
      {children}

      <AnimatePresence>
        {open && (
          <div
            className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[12vh]"
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              onClick={close}
              className="absolute inset-0 bg-black/55 backdrop-blur-[3px]"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: -12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: -12 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="panel-solid relative w-full max-w-xl overflow-hidden shadow-2xl"
              onKeyDown={onKeyDown}
            >
              <div className="flex items-center gap-3 border-b border-line px-4 py-3.5">
                <Search className="h-4 w-4 shrink-0 text-faint" aria-hidden="true" />
                <input
                  autoFocus
                  value={query}
                  onChange={(event) => {
                    // Reset the highlight here rather than in an effect —
                    // the new result list always starts at its first row.
                    setQuery(event.target.value);
                    setActiveIndex(0);
                  }}
                  placeholder="Search pages, projects, articles…"
                  aria-label="Search"
                  aria-controls={listId}
                  aria-expanded="true"
                  role="combobox"
                  className="min-w-0 flex-1 bg-transparent text-sm text-fg outline-none placeholder:text-faint"
                />
                <kbd className="hidden shrink-0 rounded border border-line px-1.5 py-0.5 font-mono text-[10px] text-faint sm:block">
                  ESC
                </kbd>
              </div>

              <div
                ref={listRef}
                id={listId}
                role="listbox"
                className="max-h-[min(60vh,420px)] overflow-y-auto p-2"
              >
                {results.length === 0 ? (
                  <p className="px-3 py-10 text-center font-mono text-xs text-faint">
                    No matches for “{query}”
                  </p>
                ) : (
                  grouped.map(([group, commands]) => (
                    <div key={group} className="mb-1 last:mb-0">
                      <p className="px-3 py-2 font-mono text-[10px] uppercase tracking-widest text-faint">
                        {group}
                      </p>
                      {commands.map((command) => {
                        flatIndex += 1;
                        const index = flatIndex;
                        const active = index === activeIndex;
                        const Icon = command.icon;

                        return (
                          <button
                            key={command.id}
                            type="button"
                            data-index={index}
                            role="option"
                            aria-selected={active}
                            onMouseMove={() => setActiveIndex(index)}
                            onClick={() =>
                              command.run({ router, setTheme, isDark, close })
                            }
                            className={cn(
                              "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors",
                              active ? "bg-primary-soft" : "hover:bg-surface-hover"
                            )}
                          >
                            <Icon
                              className={cn(
                                "h-4 w-4 shrink-0",
                                active ? "text-primary" : "text-faint"
                              )}
                            />
                            <span className="min-w-0 flex-1">
                              <span
                                className={cn(
                                  "block truncate text-sm",
                                  active ? "text-primary" : "text-fg"
                                )}
                              >
                                {command.label}
                              </span>
                              <span className="block truncate font-mono text-[11px] text-faint">
                                {command.hint}
                              </span>
                            </span>
                            {active && (
                              <ArrowRight className="h-3.5 w-3.5 shrink-0 text-primary" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  ))
                )}
              </div>

              <div className="flex items-center justify-between border-t border-line px-4 py-2.5 font-mono text-[10px] text-faint">
                <span className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <kbd className="rounded border border-line px-1">↑</kbd>
                    <kbd className="rounded border border-line px-1">↓</kbd>
                    navigate
                  </span>
                  <span className="flex items-center gap-1">
                    <CornerDownLeft className="h-2.5 w-2.5" />
                    select
                  </span>
                </span>
                <span className="text-primary/70">{results.length} results</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </CommandPaletteContext.Provider>
  );
}

/**
 * Discoverable affordance for the ⌘K shortcut. Lives in the navbar so it
 * never floats over page content.
 */
export function CommandPaletteTrigger({ className }: { className?: string }) {
  const { open } = useCommandPalette();

  return (
    <button
      type="button"
      onClick={open}
      aria-label="Search this site"
      className={cn(
        "group flex items-center gap-2 rounded-lg border border-line bg-surface px-2.5 text-muted transition-colors hover:border-line-strong hover:text-fg",
        className
      )}
    >
      <Search className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
      <span className="hidden font-mono text-xs lg:inline">Search</span>
      <kbd className="hidden rounded border border-line px-1.5 py-0.5 font-mono text-[10px] text-faint lg:inline">
        ⌘K
      </kbd>
    </button>
  );
}
