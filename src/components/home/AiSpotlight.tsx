import { ArrowRight, Bot, FileSearch, Headset, Star } from "lucide-react";
import Link from "next/link";
import { Stagger, StaggerItem } from "@/components/animations/Stagger";
import { Section, SectionHeading } from "@/components/ui/Section";
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
  const project = getProjectBySlug("ai-safety-assistant-rag");

  return (
    <Section id="ai">
      <SectionHeading
        eyebrow="AI engineering"
        title="AI features, wired end to end"
        description="Grounded answers, structured reports and a human handoff when the model isn't enough."
      />

      <Stagger className="grid gap-4 sm:grid-cols-2">
        {CAPABILITIES.map((capability) => (
          <StaggerItem key={capability.title}>
            <article data-spotlight className="panel panel-interactive group flex h-full gap-4 p-6">
              <span className="icon-pop grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-line bg-primary-soft">
                <capability.icon className="h-[18px] w-[18px] text-primary" aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-base font-semibold">{capability.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{capability.body}</p>
              </div>
            </article>
          </StaggerItem>
        ))}
      </Stagger>

      {project && (
        <Link
          href={`/projects/${project.slug}`}
          className="group mt-8 inline-flex items-center gap-2 font-mono text-sm text-primary"
        >
          Read the full case study
          <ArrowRight
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </Link>
      )}
    </Section>
  );
}
