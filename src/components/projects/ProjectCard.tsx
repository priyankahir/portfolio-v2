import { ArrowUpRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import { TagList } from "@/components/ui/Tag";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";

export function ProjectCard({
  project,
  index,
  className,
  /** h2 on the projects index (cards sit directly under the page h1),
   *  h3 inside a section that already has its own h2. */
  titleAs: Title = "h3",
}: {
  project: Project;
  index: number;
  className?: string;
  titleAs?: "h2" | "h3";
}) {
  return (
    <article
      className={cn(
        "panel panel-interactive group relative flex h-full flex-col overflow-hidden p-6 md:p-7",
        className
      )}
    >
      {/* Per-project accent wash, driven by the hue stored in the data file. */}
      <div
        aria-hidden="true"
        style={{
          background: `radial-gradient(120% 100% at 100% 0%, hsl(${project.hue} 70% 50% / 0.14), transparent 62%)`,
        }}
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />

      <header className="relative flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="flex items-center gap-2 font-mono text-[11px] text-faint">
            <span className="tabular-nums">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span aria-hidden="true">·</span>
            <span className="text-primary">{project.domain}</span>
          </p>
          <Title className="mt-2.5 text-xl font-semibold leading-snug">
            <Link
              href={`/projects/${project.slug}`}
              className="after:absolute after:inset-0 after:content-['']"
            >
              {project.title}
            </Link>
          </Title>
          <p className="mt-1 text-sm text-muted">{project.subtitle}</p>
        </div>

        <span className="shrink-0 rounded-md border border-line px-2 py-1 font-mono text-[10px] uppercase tracking-wide text-faint">
          {project.status}
        </span>
      </header>

      <p className="relative mt-5 flex-1 text-sm leading-relaxed text-muted">
        {project.summary}
      </p>

      <dl className="relative mt-6 grid grid-cols-3 gap-px overflow-hidden rounded-lg border border-line bg-line">
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

      <TagList items={project.stack} max={5} className="relative mt-5" />

      <footer className="relative mt-6 flex items-center justify-between border-t border-line pt-4">
        <span className="inline-flex items-center gap-1.5 font-mono text-xs text-primary">
          Read case study
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>

        {project.liveUrl && (
          // Sits above the stretched link so it stays independently clickable.
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-10 inline-flex items-center gap-1.5 font-mono text-xs text-faint transition-colors hover:text-fg"
          >
            Live
            <ExternalLink className="h-3 w-3" aria-hidden="true" />
          </a>
        )}
      </footer>
    </article>
  );
}
