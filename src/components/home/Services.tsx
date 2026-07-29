import { Check } from "lucide-react";
import { Reveal } from "@/components/animations/Reveal";
import { Stagger, StaggerItem } from "@/components/animations/Stagger";
import { Icon } from "@/components/ui/Icon";
import { Section, SectionHeading } from "@/components/ui/Section";
import { processSteps, services } from "@/data/services";

export function Services() {
  return (
    <Section id="services" tinted>
      <SectionHeading
        command="cat services.json"
        title="What I can take off your plate"
        description="The work I'm brought in for, and what actually gets delivered for each."
      />

      <Stagger className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {services.map((service) => (
          <StaggerItem key={service.id}>
            <article className="panel panel-interactive flex h-full flex-col p-6">
              <span className="grid h-10 w-10 place-items-center rounded-lg border border-line bg-primary-soft">
                <Icon name={service.icon} className="h-[18px] w-[18px] text-primary" />
              </span>

              <h3 className="mt-5 text-base font-semibold">{service.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                {service.description}
              </p>

              <ul className="mt-5 space-y-2 border-t border-line pt-4">
                {service.deliverables.map((deliverable) => (
                  <li
                    key={deliverable}
                    className="flex items-start gap-2 font-mono text-[11px] text-faint"
                  >
                    <Check
                      className="mt-0.5 h-3 w-3 shrink-0 text-primary"
                      aria-hidden="true"
                    />
                    {deliverable}
                  </li>
                ))}
              </ul>
            </article>
          </StaggerItem>
        ))}
      </Stagger>

      <div className="mt-20">
        <Reveal>
          <h3 className="mb-8 font-mono text-xs uppercase tracking-widest text-faint">
            <span aria-hidden="true" className="text-primary">
              {"//"}
            </span>{" "}
            How a feature gets built
          </h3>
        </Reveal>

        <ol className="grid gap-4 md:grid-cols-3 xl:grid-cols-5">
          {processSteps.map((step, index) => (
            <li key={step.id}>
              <Reveal delay={index * 0.07} className="h-full">
                <article className="panel relative h-full overflow-hidden p-5">
                  <span
                    aria-hidden="true"
                    className="absolute -right-2 -top-3 font-display text-6xl font-bold text-line"
                  >
                    {step.step}
                  </span>
                  <h4 className="relative text-sm font-semibold">{step.title}</h4>
                  <p className="relative mt-2 text-xs leading-relaxed text-muted">
                    {step.description}
                  </p>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
