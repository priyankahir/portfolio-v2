import { ArrowRight, Bot, FileSearch, Headset, Star } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/animations/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Tag } from "@/components/ui/Tag";
import { getProjectBySlug } from "@/data/projects";

const CAPABILITIES = [
  {
    icon: Bot,
    title: "RAG-grounded chat",
    body: "Claude API wired to a vector database so answers cite the customer's own documents instead of model recall.",
  },
  {
    icon: FileSearch,
    title: "Report intelligence",
    body: "Upload an EHS report, get a structured summary plus actionable safety recommendations back.",
  },
  {
    icon: Star,
    title: "Adaptive form flows",
    body: "The model generates follow-up questions from prior answers, with thumbs and star ratings capturing answer quality.",
  },
  {
    icon: Headset,
    title: "Human handoff",
    body: "A waiting room and live agent join-room, so escalation from AI to a person happens mid-conversation.",
  },
];

export function AiSpotlight() {
  const project = getProjectBySlug("ai-chatbot-report-intelligence");

  return (
    <Section id="ai">
      <SectionHeading
        command="./ai --describe"
        title="AI features, wired end to end"
        description="Model quality is half the problem. Retrieval, streaming, latency, showing where an answer came from, and a way out when it's wrong — that half is engineering."
      />

      <div className="grid gap-8 lg:grid-cols-[1fr_1.05fr] lg:gap-12">
        <div className="space-y-3">
          {CAPABILITIES.map((capability, index) => (
            <Reveal key={capability.title} delay={index * 0.07}>
              <article className="panel panel-interactive flex gap-4 p-5">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-line bg-primary-soft">
                  <capability.icon
                    className="h-4 w-4 text-primary"
                    aria-hidden="true"
                  />
                </span>
                <div>
                  <h3 className="text-sm font-semibold">{capability.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">
                    {capability.body}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}

          {project && (
            <Reveal delay={0.3}>
              <Link
                href={`/projects/${project.slug}`}
                className="group mt-2 inline-flex items-center gap-2 font-mono text-sm text-primary"
              >
                Read the full case study
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Reveal>
          )}
        </div>

        {/* Static illustration of the shipped chat surface. */}
        <Reveal direction="left" delay={0.15}>
          <div className="panel-solid overflow-hidden" aria-hidden="true">
            <div className="flex items-center justify-between border-b border-line bg-bg-subtle px-4 py-3">
              <span className="flex items-center gap-2 font-mono text-[11px] text-faint">
                <Bot className="h-3.5 w-3.5 text-primary" />
                EHS Assistant
              </span>
              <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                grounded
              </span>
            </div>

            <div className="space-y-4 p-5">
              <div className="ml-auto max-w-[80%] rounded-2xl rounded-br-sm border border-line bg-surface px-4 py-3 text-sm text-fg">
                What PPE is required for confined space entry on site 4?
              </div>

              <div className="max-w-[88%] space-y-3">
                <div className="rounded-2xl rounded-bl-sm border border-line-strong bg-primary-soft px-4 py-3 text-sm leading-relaxed text-fg">
                  Site 4 requires a full-face respirator, harness with retrieval line,
                  and continuous atmospheric monitoring. Entry needs a signed permit
                  from the confined-space supervisor.
                </div>

                <div className="rounded-lg border border-line bg-surface px-3 py-2.5">
                  <p className="font-mono text-[10px] uppercase tracking-wider text-faint">
                    Sources · retrieved 2
                  </p>
                  <ul className="mt-2 space-y-1.5 font-mono text-[11px] text-muted">
                    <li className="flex items-center justify-between gap-2">
                      <span className="truncate">site-4-confined-space.pdf</span>
                      <span className="shrink-0 text-primary">§4.2</span>
                    </li>
                    <li className="flex items-center justify-between gap-2">
                      <span className="truncate">ppe-matrix-2025.pdf</span>
                      <span className="shrink-0 text-primary">p.11</span>
                    </li>
                  </ul>
                </div>

                <div className="flex items-center gap-2 font-mono text-[10px] text-faint">
                  <span className="rounded border border-line px-1.5 py-0.5">
                    👍
                  </span>
                  <span className="rounded border border-line px-1.5 py-0.5">
                    👎
                  </span>
                  <span className="ml-1">Rate this answer</span>
                  <button
                    type="button"
                    tabIndex={-1}
                    className="ml-auto rounded border border-line-strong px-2 py-1 text-primary"
                  >
                    Talk to a human
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 border-t border-line bg-bg-subtle px-4 py-3">
              {["Claude API", "RAG", "Vector DB", "Streaming", "Zustand"].map(
                (item) => (
                  <Tag key={item} tone="outline">
                    {item}
                  </Tag>
                )
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
