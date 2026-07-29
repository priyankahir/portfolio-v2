import { Stagger, StaggerItem } from "@/components/animations/Stagger";
import { Icon } from "@/components/ui/Icon";
import { Section, SectionHeading } from "@/components/ui/Section";
import { skillGroups } from "@/data/skills";
import { cn } from "@/lib/utils";
import type { SkillLevel } from "@/types";

const LEVEL_STYLES: Record<SkillLevel, string> = {
  core: "border-line-strong bg-primary-soft text-primary",
  strong: "border-line bg-surface text-fg",
  working: "border-line bg-transparent text-faint",
};

const LEGEND: { level: SkillLevel; label: string }[] = [
  { level: "core", label: "Daily driver" },
  { level: "strong", label: "Comfortable" },
  { level: "working", label: "Working knowledge" },
];

export function Skills() {
  return (
    <Section id="skills" tinted>
      <SectionHeading
        command="apt list --installed"
        title="The stack I actually ship with"
        description="Grouped by what they do, and marked by how much I lean on them — no percentage bars, because nobody knows what 87% React means."
      />

      <Stagger className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {skillGroups.map((group) => (
          <StaggerItem key={group.id}>
            <article className="panel panel-interactive flex h-full flex-col p-6">
              <header className="flex items-start gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-line bg-primary-soft">
                  <Icon name={group.icon} className="h-4 w-4 text-primary" />
                </span>
                <div className="min-w-0">
                  <h3 className="text-base font-semibold">{group.title}</h3>
                  <p className="truncate font-mono text-[11px] text-faint">
                    <span aria-hidden="true" className="text-primary/60">
                      ${" "}
                    </span>
                    {group.command}
                  </p>
                </div>
              </header>

              <p className="mt-4 text-sm leading-relaxed text-muted">
                {group.description}
              </p>

              <ul className="mt-5 flex flex-wrap gap-1.5 pt-1">
                {group.skills.map((skill) => (
                  <li key={skill.name}>
                    <span
                      className={cn(
                        "inline-flex rounded-md border px-2 py-1 font-mono text-[11px] leading-none transition-colors",
                        LEVEL_STYLES[skill.level]
                      )}
                    >
                      {skill.name}
                    </span>
                  </li>
                ))}
              </ul>
            </article>
          </StaggerItem>
        ))}
      </Stagger>

      <ul className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2">
        {LEGEND.map((entry) => (
          <li
            key={entry.level}
            className="flex items-center gap-2 font-mono text-[11px] text-faint"
          >
            <span
              aria-hidden="true"
              className={cn(
                "h-3 w-3 rounded-[3px] border",
                LEVEL_STYLES[entry.level]
              )}
            />
            {entry.label}
          </li>
        ))}
      </ul>
    </Section>
  );
}
