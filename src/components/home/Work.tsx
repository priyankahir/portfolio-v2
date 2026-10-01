import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/animations/Reveal";
import { Stagger, StaggerItem } from "@/components/animations/Stagger";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Section, SectionHeading } from "@/components/ui/Section";
import { featuredProjects, projects } from "@/data/projects";

/**
 * First section after the hero: the projects are the strongest evidence on the
 * page, so they sit above the fold-adjacent area rather than mid-scroll.
 */
export function Work() {
  const [lead, ...rest] = featuredProjects;
  const domainCount = new Set(featuredProjects.map((project) => project.domain)).size;

  return (
    <Section id="work" className="pt-16 md:pt-24">
      <SectionHeading
        eyebrow="Selected work"
        title="Featured projects"
        description={`${featuredProjects.length} production SaaS products across ${domainCount} domains. Each one is a short case study — the constraint, the approach, and what shipped.`}
        action={
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 rounded-lg border border-line bg-surface px-4 py-2.5 font-mono text-xs transition-colors hover:border-line-strong hover:text-primary"
          >
            All {projects.length} projects
            <ArrowRight
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        }
      />

      {lead && (
        <Reveal className="mb-4">
          <ProjectCard project={lead} index={0} featured />
        </Reveal>
      )}

      <Stagger className="grid gap-4 md:grid-cols-2">
        {rest.map((project, index) => (
          <StaggerItem key={project.id}>
            <ProjectCard project={project} index={index + 1} />
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
