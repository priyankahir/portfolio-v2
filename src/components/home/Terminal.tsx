"use client";

import { CornerDownLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { Reveal } from "@/components/animations/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { experiences } from "@/data/experience";
import { posts } from "@/data/posts";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { skillGroups } from "@/data/skills";
import { cn } from "@/lib/utils";

type LineKind = "input" | "output" | "error" | "system";
interface Line {
  id: number;
  kind: LineKind;
  text: string;
}

interface CommandResult {
  lines: string[];
  kind?: LineKind;
  navigateTo?: string;
  clear?: boolean;
}

const BANNER = [
  `${profile.name} — ${profile.role}`,
  `${profile.experienceLabel} experience · ${profile.location}`,
  "Type 'help' for available commands, or 'ls' to look around.",
];

function buildCommands(): Record<
  string,
  { description: string; run: (args: string[]) => CommandResult }
> {
  return {
    help: {
      description: "List every available command",
      run: () => ({
        lines: [
          "Available commands:",
          ...Object.entries(buildCommands()).map(
            ([name, command]) => `  ${name.padEnd(12)} ${command.description}`
          ),
          "",
          "Tip: Tab completes, ↑/↓ walks your history.",
        ],
      }),
    },
    whoami: {
      description: "Print identity and current role",
      run: () => ({
        lines: [
          `name     : ${profile.name}`,
          `role     : ${experiences[0].role} @ ${experiences[0].company}`,
          `exp      : ${profile.experienceLabel}`,
          `location : ${profile.location}`,
          `status   : ${profile.availability.label}`,
        ],
      }),
    },
    ls: {
      description: "List sections — try 'ls projects' or 'ls blog'",
      run: (args) => {
        const target = args[0]?.replace(/^\.?\//, "");

        if (target === "projects") {
          return {
            lines: projects.map(
              (project) => `  ${project.slug.padEnd(34)} ${project.domain}`
            ),
          };
        }
        if (target === "blog" || target === "posts") {
          return {
            lines: posts.map((post) => `  ${post.slug.padEnd(34)} ${post.category}`),
          };
        }
        if (target === "skills") {
          return {
            lines: skillGroups.map(
              (group) =>
                `  ${group.title.padEnd(20)} ${group.skills.map((s) => s.name).join(", ")}`
            ),
          };
        }
        if (target) {
          return { lines: [`ls: no such directory: ${target}`], kind: "error" };
        }
        return {
          lines: ["  projects/   blog/   skills/   experience/   contact/"],
        };
      },
    },
    skills: {
      description: "Show the stack, grouped",
      run: () => ({
        lines: skillGroups.map(
          (group) =>
            `${group.title.padEnd(20)} ${group.skills.map((s) => s.name).join(" · ")}`
        ),
      }),
    },
    projects: {
      description: "Summarise shipped work",
      run: () => ({
        lines: projects.map(
          (project) => `${project.title} — ${project.subtitle} (${project.domain})`
        ),
      }),
    },
    experience: {
      description: "Print work history",
      run: () => ({
        lines: experiences.map(
          (job) =>
            `${job.start} → ${job.end ?? "present"}  ${job.role} @ ${job.company}`
        ),
      }),
    },
    contact: {
      description: "Show contact channels",
      run: () => ({
        lines: [
          `email    : ${profile.email}`,
          `phone    : ${profile.phone}`,
          ...profile.socials
            .filter((social) => social.url.startsWith("http"))
            .map((social) => `${social.label.toLowerCase().padEnd(9)}: ${social.url}`),
        ],
      }),
    },
    open: {
      description: "Navigate — e.g. 'open projects' or 'open blog'",
      run: (args) => {
        const target = args[0]?.replace(/^\.?\//, "");
        const routes: Record<string, string> = {
          home: "/",
          about: "/about",
          projects: "/projects",
          blog: "/blog",
          resume: "/resume",
          contact: "/contact",
        };
        if (!target) {
          return {
            lines: [`usage: open <${Object.keys(routes).join("|")}>`],
            kind: "error",
          };
        }
        const path = routes[target];
        if (!path) return { lines: [`open: unknown target: ${target}`], kind: "error" };
        return { lines: [`Opening ${path} …`], navigateTo: path };
      },
    },
    resume: {
      description: "Download the CV",
      run: () => {
        const link = document.createElement("a");
        link.href = profile.resumePath;
        link.download = profile.resumeFileName;
        link.click();
        return { lines: [`Downloading ${profile.resumeFileName} …`] };
      },
    },
    date: {
      description: "Print the current date",
      run: () => ({ lines: [new Date().toString()] }),
    },
    sudo: {
      description: "Attempt privilege escalation",
      run: () => ({
        lines: ["visitor is not in the sudoers file. This incident will be reported."],
        kind: "error",
      }),
    },
    clear: {
      description: "Clear the screen",
      run: () => ({ lines: [], clear: true }),
    },
  };
}

export function Terminal() {
  const router = useRouter();
  const commands = useMemo(() => buildCommands(), []);

  const [lines, setLines] = useState<Line[]>(() =>
    BANNER.map((text, id) => ({ id, kind: "system" as const, text }))
  );
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const nextId = useRef(BANNER.length);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const node = scrollRef.current;
    if (node) node.scrollTop = node.scrollHeight;
  }, [lines]);

  const push = (entries: { kind: LineKind; text: string }[]) => {
    setLines((current) => [
      ...current,
      ...entries.map((entry) => ({ ...entry, id: nextId.current++ })),
    ]);
  };

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const raw = input.trim();
    if (!raw) return;

    setHistory((current) => [raw, ...current]);
    setHistoryIndex(-1);
    setInput("");

    const [name, ...args] = raw.split(/\s+/);
    const command = commands[name.toLowerCase()];

    if (!command) {
      push([
        { kind: "input", text: raw },
        {
          kind: "error",
          text: `command not found: ${name}. Type 'help' for the list.`,
        },
      ]);
      return;
    }

    const result = command.run(args);

    if (result.clear) {
      setLines([]);
      return;
    }

    push([
      { kind: "input", text: raw },
      ...result.lines.map((text) => ({ kind: result.kind ?? "output", text })),
    ]);

    if (result.navigateTo) {
      setTimeout(() => router.push(result.navigateTo as string), 450);
    }
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowUp") {
      event.preventDefault();
      const next = Math.min(historyIndex + 1, history.length - 1);
      if (next >= 0) {
        setHistoryIndex(next);
        setInput(history[next]);
      }
      return;
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      const next = historyIndex - 1;
      setHistoryIndex(next);
      setInput(next < 0 ? "" : history[next]);
      return;
    }
    if (event.key === "Tab") {
      event.preventDefault();
      const match = Object.keys(commands).find((name) =>
        name.startsWith(input.toLowerCase())
      );
      if (match) setInput(match);
    }
  };

  return (
    <Section id="terminal">
      <SectionHeading
        command="./explore.sh"
        title="Or just ask the shell"
        description="A working terminal wired to the same data as the rest of this site. Try whoami, ls projects, or open blog."
        align="center"
      />

      <Reveal className="mx-auto max-w-3xl">
        <div className="panel-solid overflow-hidden shadow-xl">
          <div className="flex items-center gap-3 border-b border-line bg-bg-subtle px-4 py-2.5">
            <div aria-hidden="true" className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/70" />
            </div>
            <span className="flex-1 truncate text-center font-mono text-[11px] text-faint">
              visitor@priyank.dev: ~
            </span>
            <span className="w-[52px]" aria-hidden="true" />
          </div>

          <div
            ref={scrollRef}
            onClick={() => inputRef.current?.focus()}
            className="h-[340px] overflow-y-auto p-5 font-mono text-[13px] leading-relaxed"
          >
            <div aria-live="polite" aria-atomic="false">
              {lines.map((line) => (
                <p
                  key={line.id}
                  className={cn(
                    "whitespace-pre-wrap break-words",
                    line.kind === "input" && "text-fg",
                    line.kind === "output" && "text-muted",
                    line.kind === "error" && "text-[#ff6b6b]",
                    line.kind === "system" && "text-primary"
                  )}
                >
                  {line.kind === "input" && (
                    <span aria-hidden="true" className="mr-2 text-primary">
                      ❯
                    </span>
                  )}
                  {line.text}
                </p>
              ))}
            </div>
          </div>

          <form
            onSubmit={submit}
            className="flex items-center gap-2 border-t border-line bg-bg-subtle px-4 py-3"
          >
            <label htmlFor="terminal-input" className="sr-only">
              Terminal command
            </label>
            <span aria-hidden="true" className="font-mono text-sm text-primary">
              ❯
            </span>
            <input
              id="terminal-input"
              ref={inputRef}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={onKeyDown}
              autoComplete="off"
              autoCapitalize="off"
              spellCheck={false}
              placeholder="type a command…"
              className="min-w-0 flex-1 bg-transparent font-mono text-[13px] text-fg outline-none placeholder:text-faint"
            />
            <button
              type="submit"
              aria-label="Run command"
              className="grid h-7 w-7 shrink-0 place-items-center rounded border border-line text-faint transition-colors hover:text-primary"
            >
              <CornerDownLeft className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </form>
        </div>
      </Reveal>
    </Section>
  );
}
