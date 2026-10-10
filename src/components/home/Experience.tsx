import { Building2, Check, GraduationCap } from "lucide-react";
import { Reveal } from "@/components/animations/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { TagList } from "@/components/ui/Tag";
import { education, experiences } from "@/data/experience";
import { getExperience } from "@/lib/experience";
import { formatMonth } from "@/lib/utils";
import type { ExperiencePosition } from "@/types";

function DateRange({ start, end }: Pick<ExperiencePosition, "start" | "end">) {
  return (
    <>
      <time dateTime={start}>{formatMonth(start)}</time>
      {" — "}
      {end ? <time dateTime={end}>{formatMonth(end)}</time> : "Present"}
    </>
  );
}

export function Experience() {
  // Every company here started on the career start date, so the company's
  // tenure and total experience come from the same calculation.
  const experience = getExperience();

  return (
    <Section id="experience" tinted>
      <SectionHeading
        eyebrow="Experience"
        title="Where I've worked"
        description={`Shipping production MERN apps since ${experience.since}.`}
      />

      <ol className="relative space-y-4">
        {experiences.map((job, index) => {
          const first = job.positions[job.positions.length - 1];
          const latest = job.positions[0];

          return (
            <li key={job.id}>
              <Reveal delay={index * 0.08}>
                <div className="relative md:pl-14">
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-6 hidden h-10 w-10 place-items-center rounded-full border border-line bg-bg md:grid"
                  >
                    <Building2 className="h-4 w-4 text-primary" />
                  </span>

                  <article data-spotlight className="panel panel-interactive p-6 md:p-7">
                    <header className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h3 className="text-lg font-semibold">{job.company}</h3>
                        <p className="mt-1 text-sm text-muted">{job.location}</p>
                      </div>

                      <div className="shrink-0 sm:text-right">
                        <p className="font-mono text-xs text-primary">
                          <DateRange start={first.start} end={latest.end} />
                        </p>
                        {latest.end === null && (
                          <p className="mt-1 font-mono text-[11px] text-faint">
                            {experience.label}
                          </p>
                        )}
                      </div>
                    </header>

                    {/* Career stages at this company, most recent first. */}
                    <ol className="mt-6 space-y-5 border-l border-line pl-5">
                      {job.positions.map((position) => (
                        <li key={position.title} className="relative">
                          {position.end === null ? (
                            // Current role: a soft pulse marks "present".
                            <span
                              aria-hidden="true"
                              className="absolute -left-[25px] top-1.5 flex h-2.5 w-2.5"
                            >
                              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
                              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
                            </span>
                          ) : (
                            <span
                              aria-hidden="true"
                              className="absolute -left-[25px] top-1.5 h-2.5 w-2.5 rounded-full border border-line-strong bg-bg"
                            />
                          )}
                          <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                            <h4 className="text-base font-semibold">{position.title}</h4>
                            <p className="shrink-0 font-mono text-[11px] text-faint">
                              {position.type} · <DateRange start={position.start} end={position.end} />
                            </p>
                          </div>
                          <p className="mt-1.5 text-sm leading-relaxed text-muted">
                            {position.summary}
                          </p>
                        </li>
                      ))}
                    </ol>

                    <h4 className="mt-7 font-mono text-[11px] uppercase tracking-widest text-faint">
                      Key responsibilities
                    </h4>
                    <ul className="mt-3 space-y-2.5">
                      {job.highlights.map((highlight) => (
                        <li key={highlight} className="flex gap-3 text-sm text-muted">
                          <Check
                            className="mt-1 h-3.5 w-3.5 shrink-0 text-primary"
                            aria-hidden="true"
                          />
                          <span className="leading-relaxed">{highlight}</span>
                        </li>
                      ))}
                    </ul>

                    <TagList items={job.stack} className="mt-6" />
                  </article>
                </div>
              </Reveal>
            </li>
          );
        })}
      </ol>

      <div className="mt-14">
        <Reveal>
          <h3 className="mb-6 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-faint">
            <GraduationCap className="h-4 w-4 text-primary" aria-hidden="true" />
            Education
          </h3>
        </Reveal>

        <div className="grid gap-4 md:grid-cols-2">
          {education.map((entry, index) => (
            <Reveal key={entry.id} delay={index * 0.08}>
              <article className="panel h-full p-6">
                <p className="font-mono text-[11px] text-primary">
                  {formatMonth(entry.start)} — {formatMonth(entry.end)}
                </p>
                <h4 className="mt-2 text-base font-semibold">{entry.degree}</h4>
                <p className="mt-1 text-sm text-muted">{entry.institution}</p>
                <p className="mt-0.5 text-xs text-faint">{entry.board}</p>
                <p className="mt-4 inline-flex rounded-md border border-line bg-surface px-2.5 py-1 font-mono text-[11px] text-fg">
                  {entry.score}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
