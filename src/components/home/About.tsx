import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/animations/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { currentPosition, education } from "@/data/experience";
import { profile } from "@/data/profile";
import { getExperience } from "@/lib/experience";

export function About() {
  const experience = getExperience();
  const degree = education[0];

  const facts = [
    { label: "Based in", value: profile.location },
    { label: "Current role", value: `${currentPosition.title}, ${currentPosition.company}` },
    { label: "Experience", value: `${experience.label} (since ${experience.since})` },
    { label: "Degree", value: `${degree.degree}, ${degree.board}` },
  ];

  return (
    <Section id="about" tinted>
      <SectionHeading
        eyebrow="About"
        title="Full-stack, but the parts that are hard"
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
            More about how I work
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Reveal>

        <Reveal direction="left" delay={0.1}>
          <dl className="panel divide-y divide-line">
            {facts.map((fact) => (
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
    </Section>
  );
}
