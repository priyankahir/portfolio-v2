import { Counter } from "@/components/animations/Counter";
import { Stagger, StaggerItem } from "@/components/animations/Stagger";
import { stats } from "@/data/profile";

export function Stats() {
  return (
    <section aria-label="At a glance" className="border-b border-line">
      <div className="container-page py-12 md:py-16">
        <Stagger className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-4">
          {stats.map((stat) => (
            <StaggerItem key={stat.label} className="bg-bg p-5 md:p-7">
              <p className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
                <Counter value={stat.value} />
                {stat.suffix && <span className="text-primary">{stat.suffix}</span>}
              </p>
              <p className="mt-2 font-mono text-[11px] uppercase tracking-widest text-primary">
                {stat.label}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-faint">{stat.hint}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
