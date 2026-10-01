import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Tilt } from "@/components/animations/Tilt";
import { TagList } from "@/components/ui/Tag";
import { cn } from "@/lib/utils";
import type { CSSProperties } from "react";
import type { Project } from "@/types";

export function ProjectCard({
  project,
  index,
  className,
  featured = false,
  /** h2 on the projects index (cards sit directly under the page h1),
   *  h3 inside a section that already has its own h2. */
  titleAs: Title = "h3",
}: {
  project: Project;
  index: number;
  className?: string;
  /** Larger type and padding for the lead project. */
  featured?: boolean;
  titleAs?: "h2" | "h3";
}) {
  return (
    <Tilt className="h-full" max={3}>
      <article
        data-spotlight
        className={cn(
          "panel panel-interactive group relative flex h-full flex-col overflow-hidden",
          className,
        )}
        style={{ "--hue": project.hue } as CSSProperties}
      >
        {/* Thin accent rule in the project's hue — identity without a banner. */}
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-0.5 bg-[linear-gradient(90deg,hsl(var(--hue)_70%_50%),transparent)] opacity-70 transition-opacity duration-300 group-hover:opacity-100"
        />

        <div className={cn("flex flex-1 flex-col p-6 md:p-7", featured && "lg:p-9")}>
          <header className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="flex items-center gap-2 font-mono text-[11px] text-faint">
                <span className="tabular-nums">{String(index + 1).padStart(2, "0")}</span>
                <span aria-hidden="true">·</span>
                <span className="text-primary">{project.domain}</span>
                <span aria-hidden="true">·</span>
                <span>{project.year}</span>
              </p>
              <Title
                className={cn(
                  "mt-2.5 font-semibold leading-snug",
                  featured ? "text-2xl md:text-[1.75rem]" : "text-xl",
                )}
              >
                {/* Stretched link: the whole card is one click target, one tab stop. */}
                <Link
                  href={`/projects/${project.slug}`}
                  className="after:absolute after:inset-0 after:content-['']"
                >
                  {project.title}
                </Link>
              </Title>
              <p className="mt-1 text-sm text-muted">{project.subtitle}</p>
            </div>

            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-md border border-line px-2 py-1 font-mono text-[10px] uppercase tracking-wide text-faint">
              <span
                aria-hidden="true"
                className={cn(
                  "h-1.5 w-1.5 rounded-full",
                  project.status === "Archived" ? "bg-faint" : "bg-primary",
                )}
              />
              {project.status}
            </span>
          </header>

          <p
            className={cn(
              "mt-5 flex-1 leading-relaxed text-muted",
              featured ? "text-[15px]" : "text-sm",
            )}
          >
            {project.summary}
          </p>

          <dl className="mt-6 grid grid-cols-3 gap-px overflow-hidden rounded-lg border border-line bg-line">
            {project.metrics.map((metric) => (
              <div key={metric.label} className="bg-bg px-3 py-2.5">
                <dt className="font-mono text-[9px] uppercase tracking-wider text-faint">
                  {metric.label}
                </dt>
                {/* Wraps rather than truncating — grid rows keep the cells aligned. */}
                <dd className="mt-0.5 text-[11px] font-medium leading-snug text-fg">
                  {metric.value}
                </dd>
              </div>
            ))}
          </dl>

          <TagList items={project.stack} max={featured ? 7 : 5} className="mt-5" />

          <footer className="mt-6 flex items-center justify-between border-t border-line pt-4">
            <span className="inline-flex items-center gap-1.5 font-mono text-xs text-primary">
              Read case study
              <ArrowUpRight
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </span>
          </footer>
        </div>
      </article>
    </Tilt>
  );
}
