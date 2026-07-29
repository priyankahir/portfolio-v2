import { Building2, Check, GraduationCap } from "lucide-react";
import { Reveal } from "@/components/animations/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { TagList } from "@/components/ui/Tag";
import { education, experiences } from "@/data/experience";
import { durationBetween, formatDateRange, formatMonth } from "@/lib/utils";

export function Experience() {
  return (
    <Section id="experience" tinted>
      <SectionHeading
        command="git log --author=priyank"
        title="Where I've worked"
        description="Joined as an intern in January 2025 and moved onto client delivery in the first sprint. Everything since has shipped to production users."
      />

      <ol className="relative space-y-4">
        {/* Timeline rail — hidden on small screens where it has nothing to align to. */}
        <span
          aria-hidden="true"
          className="absolute left-[19px] top-4 bottom-4 hidden w-px bg-line md:block"
        />

        {experiences.map((job, index) => (
          <li key={job.id}>
            <Reveal delay={index * 0.08}>
              <div className="relative md:pl-14">
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-6 hidden h-10 w-10 place-items-center rounded-full border border-line bg-bg md:grid"
                >
                  <Building2 className="h-4 w-4 text-primary" />
                </span>

                <article className="panel panel-interactive p-6 md:p-7">
                  <header className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">{job.role}</h3>
                      <p className="mt-1 text-sm text-muted">
                        {job.company}
                        <span aria-hidden="true" className="mx-2 text-faint">
                          ·
                        </span>
                        {job.location}
                      </p>
                    </div>

                    <div className="shrink-0 sm:text-right">
                      <p className="font-mono text-xs text-primary">
                        <time dateTime={job.start}>{formatMonth(job.start)}</time>
                        {" — "}
                        {job.end ? (
                          <time dateTime={job.end}>{formatMonth(job.end)}</time>
                        ) : (
                          "Present"
                        )}
                      </p>
                      <p className="mt-1 font-mono text-[11px] text-faint">
                        {job.type} · {durationBetween(job.start, job.end)}
                      </p>
                    </div>
                  </header>

                  <p className="mt-4 text-sm leading-relaxed text-muted">
                    {job.summary}
                  </p>

                  <ul className="mt-5 space-y-2.5">
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
                  <span className="sr-only">
                    {formatDateRange(job.start, job.end)}
                  </span>
                </article>
              </div>
            </Reveal>
          </li>
        ))}
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
