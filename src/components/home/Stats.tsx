import { Counter } from "@/components/animations/Counter";
import { stats } from "@/data/profile";
import { experienceStat } from "@/lib/experience";

export function Stats() {
  const items = [experienceStat(), ...stats];

  return (
    <section aria-label="At a glance" className="border-b border-line">
      <div className="container-page py-12 md:py-16">
        {/* No scroll fade here: the strip sits just below the fold and must be
            fully legible (and contrast-checkable) the moment it appears. */}
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-4">
          {items.map((stat) => (
            <div
              key={stat.label}
              className="bg-bg p-5 transition-colors duration-500 hover:bg-surface-hover md:p-7"
            >
              <p className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
                <Counter value={stat.value} />
                {stat.suffix && <span className="text-primary">{stat.suffix}</span>}
              </p>
              <p className="mt-2 font-mono text-[11px] uppercase tracking-widest text-primary">
                {stat.label}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-faint">{stat.hint}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
