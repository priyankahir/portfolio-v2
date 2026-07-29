import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Stagger, StaggerItem } from "@/components/animations/Stagger";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Section, SectionHeading } from "@/components/ui/Section";
import { featuredProjects } from "@/data/projects";

export function Work() {
  return (
    <Section id="work">
      <SectionHeading
        command="ls ./case-studies"
        title="Selected work"
        description="Five production SaaS products across five domains. Each one is a short case study — the constraint, the approach, and what shipped."
        action={
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 rounded-lg border border-line bg-surface px-4 py-2.5 font-mono text-xs transition-colors hover:border-line-strong"
          >
            All projects
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        }
      />

      <Stagger className="grid gap-4 lg:grid-cols-2">
        {featuredProjects.map((project, index) => (
          <StaggerItem
            key={project.id}
            className={index === 0 ? "lg:col-span-2" : undefined}
          >
            <ProjectCard project={project} index={index} />
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
