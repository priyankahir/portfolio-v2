import { ArrowLeft, ArrowRight, Check, ExternalLink } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/animations/Reveal";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { LinkButton } from "@/components/ui/Button";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { TagList } from "@/components/ui/Tag";
import { getProjectBySlug, projects } from "@/data/projects";
import { breadcrumbSchema, jsonLdGraph, projectSchema } from "@/lib/json-ld";
import { buildMetadata } from "@/lib/seo";
import { displayHost } from "@/lib/utils";

type Params = { params: Promise<{ slug: string }> };

/** Statically render every case study at build time. */
export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Params) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return buildMetadata({ title: "Project not found", noIndex: true });
  }

  return buildMetadata({
    title: `${project.title} — ${project.subtitle}`,
    description: project.summary,
    path: `/projects/${project.slug}`,
    keywords: [...project.stack, project.domain, `${project.title} case study`],
  });
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  const index = projects.findIndex((entry) => entry.slug === project.slug);
  // Two following case studies, wrapping around the list.
  const related = [1, 2].map((offset) => projects[(index + offset) % projects.length]);

  return (
    <>
      <JsonLd
        data={jsonLdGraph(
          projectSchema(project),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Projects", path: "/projects" },
            { name: project.title, path: `/projects/${project.slug}` },
          ])
        )}
      />

      <PageHeader
        command={`cat ./case-studies/${project.slug}.md`}
        title={project.title}
        description={project.summary}
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Projects", path: "/projects" },
          { name: project.title, path: `/projects/${project.slug}` },
        ]}
      >
        <dl className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          <Meta label="Domain" value={project.domain} />
          <Meta label="Year" value={project.year} />
          <Meta label="Status" value={project.status} />
          <Meta label="My role" value={project.role} />
        </dl>
      </PageHeader>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
          <div className="space-y-12">
            <Reveal>
              <h2 className="font-mono text-xs uppercase tracking-widest text-primary">
                The problem
              </h2>
              <p className="mt-4 text-[1.0625rem] leading-[1.8] text-muted">
                {project.problem}
              </p>
            </Reveal>

            <Reveal>
              <h2 className="font-mono text-xs uppercase tracking-widest text-primary">
                What I built
              </h2>
              <ul className="mt-5 space-y-4">
                {project.approach.map((item) => (
                  <li key={item} className="flex gap-3">
                    <Check
                      className="mt-1.5 h-4 w-4 shrink-0 text-primary"
                      aria-hidden="true"
                    />
                    <span className="text-[1.0625rem] leading-[1.75] text-muted">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal>
              <h2 className="font-mono text-xs uppercase tracking-widest text-primary">
                Outcome
              </h2>
              <p className="mt-4 border-l-2 border-line-strong pl-5 text-[1.0625rem] leading-[1.8] text-fg">
                {project.outcome}
              </p>
            </Reveal>
          </div>

          <Reveal direction="left" delay={0.1} className="space-y-4">
            <div className="panel p-6">
              <h2 className="font-mono text-[11px] uppercase tracking-widest text-faint">
                Stack
              </h2>
              <TagList items={project.stack} className="mt-4" />
            </div>

            <dl className="panel divide-y divide-line">
              {project.metrics.map((metric) => (
                <div key={metric.label} className="p-5">
                  <dt className="font-mono text-[10px] uppercase tracking-widest text-faint">
                    {metric.label}
                  </dt>
                  <dd className="mt-1 text-sm text-fg">{metric.value}</dd>
                </div>
              ))}
            </dl>

            {project.liveUrl && (
              <LinkButton
                href={project.liveUrl}
                variant="secondary"
                className="w-full"
              >
                {displayHost(project.liveUrl)}
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </LinkButton>
            )}

            <div className="panel p-6">
              <p className="text-sm leading-relaxed text-muted">
                Want the detail behind any of this — architecture decisions, trade-offs,
                what I&apos;d do differently?
              </p>
              <Link
                href="/contact"
                className="group mt-4 inline-flex items-center gap-2 font-mono text-sm text-primary"
              >
                Ask me directly
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section tinted>
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-2xl font-semibold">More case studies</h2>
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 font-mono text-sm text-muted transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
            All projects
          </Link>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {related.map((entry, position) => (
            <ProjectCard
              key={entry.id}
              project={entry}
              index={projects.findIndex((item) => item.id === entry.id)}
              titleAs="h3"
              className={position === 1 ? "hidden lg:flex" : undefined}
            />
          ))}
        </div>

        <div className="panel mt-10 flex flex-col items-start gap-5 p-7 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-semibold">Building something like this?</h3>
            <p className="mt-1.5 text-sm text-muted">
              I&apos;m open to MERN stack roles and freelance work.
            </p>
          </div>
          <Link
            href="/contact"
            className="group inline-flex h-11 shrink-0 items-center gap-2 rounded-lg bg-primary px-5 text-sm font-medium text-on-primary transition-all hover:brightness-110"
          >
            Start a conversation
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </Section>
    </>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-bg p-4">
      <dt className="font-mono text-[10px] uppercase tracking-widest text-faint">
        {label}
      </dt>
      <dd className="mt-1 text-sm text-fg">{value}</dd>
    </div>
  );
}
