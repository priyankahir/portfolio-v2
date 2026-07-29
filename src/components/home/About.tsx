import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/animations/Reveal";
import { Stagger, StaggerItem } from "@/components/animations/Stagger";
import { Icon } from "@/components/ui/Icon";
import { Section, SectionHeading } from "@/components/ui/Section";
import { principles } from "@/data/services";
import { profile } from "@/data/profile";
import { experiences } from "@/data/experience";
import { durationBetween } from "@/lib/utils";

const FACTS = [
  { label: "Based in", value: profile.location },
  { label: "Current role", value: `${experiences[0].role}, ${experiences[0].company}` },
  {
    label: "Time in role",
    value: durationBetween(experiences[0].start, experiences[0].end),
  },
  { label: "Degree", value: "B.E. Computer Engineering, GTU" },
];

export function About() {
  return (
    <Section id="about">
      <SectionHeading
        command="cat about.md"
        title="Full-stack, but the parts that are hard"
        description="Not landing pages — dashboards, builders, APIs and data-heavy product surfaces where architecture decisions show up as bugs six months later."
      />

      <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
        <Reveal className="space-y-5">
          {profile.summary.map((paragraph, index) => (
            <p
              key={index}
              className="text-[1.0625rem] leading-[1.8] text-muted"
            >
              {paragraph}
            </p>
          ))}

          <Link
            href="/about"
            className="group inline-flex items-center gap-2 pt-2 font-mono text-sm text-primary"
          >
            Read the longer version
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Reveal>

        <Reveal direction="left" delay={0.1}>
          <dl className="panel divide-y divide-line">
            {FACTS.map((fact) => (
              <div key={fact.label} className="flex flex-col gap-1 p-5">
                <dt className="font-mono text-[10px] uppercase tracking-widest text-faint">
                  {fact.label}
                </dt>
                <dd className="text-sm text-fg">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>

      <div className="mt-20">
        <Reveal>
          <h3 className="mb-8 font-mono text-xs uppercase tracking-widest text-faint">
            <span aria-hidden="true" className="text-primary">
              {"//"}
            </span>{" "}
            How I think about the work
          </h3>
        </Reveal>

        <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {principles.map((principle) => (
            <StaggerItem key={principle.id}>
              <article className="panel panel-interactive h-full p-6">
                <Icon name={principle.icon} className="h-5 w-5 text-primary" />
                <h4 className="mt-4 text-base font-semibold">{principle.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {principle.body}
                </p>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </Section>
  );
}
