import Link from "next/link";
import type { ReactNode } from "react";
import { Reveal } from "@/components/animations/Reveal";

interface Crumb {
  name: string;
  path: string;
}

/** Shared hero band for every non-home route. */
export function PageHeader({
  command,
  title,
  description,
  crumbs = [],
  children,
}: {
  command: string;
  title: string;
  description?: string;
  crumbs?: Crumb[];
  children?: ReactNode;
}) {
  return (
    <header className="relative overflow-hidden border-b border-line pt-32 pb-14 md:pt-40 md:pb-20">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid mask-fade-y absolute inset-0 opacity-60" />
        <div className="absolute -top-32 left-1/2 h-[320px] w-[min(90vw,640px)] -translate-x-1/2 rounded-full bg-primary/10 blur-[110px]" />
      </div>

      <div className="container-page">
        {crumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-2 font-mono text-[11px] text-faint">
              {crumbs.map((crumb, index) => (
                <li key={crumb.path} className="flex items-center gap-2">
                  {index > 0 && <span aria-hidden="true">/</span>}
                  {index === crumbs.length - 1 ? (
                    <span aria-current="page" className="text-muted">
                      {crumb.name}
                    </span>
                  ) : (
                    <Link href={crumb.path} className="transition-colors hover:text-primary">
                      {crumb.name}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        <Reveal>
          <p className="mb-4 flex items-center gap-2 font-mono text-xs text-primary">
            <span aria-hidden="true" className="text-faint">
              $
            </span>
            {command}
          </p>
          <h1 className="max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl md:text-[3.4rem]">
            {title}
          </h1>
          {description && (
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
              {description}
            </p>
          )}
          {children && <div className="mt-8">{children}</div>}
        </Reveal>
      </div>
    </header>
  );
}
