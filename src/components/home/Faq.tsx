import { Plus } from "lucide-react";
import { Reveal } from "@/components/animations/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { faqs } from "@/data/services";

/**
 * Native `<details>` — keyboard accessible, works without JavaScript, and the
 * answers are in the initial HTML so they're indexable alongside the FAQPage
 * structured data emitted by the page.
 */
export function Faq() {
  return (
    <Section id="faq">
      <SectionHeading
        command="man priyank"
        title="Questions people ask"
        description="The things that come up in first conversations, answered up front."
        align="center"
      />

      <div className="mx-auto max-w-3xl space-y-3">
        {faqs.map((faq, index) => (
          <Reveal key={faq.question} delay={index * 0.05}>
            <details className="panel group overflow-hidden [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 text-left transition-colors hover:bg-surface-hover">
                <h3 className="text-sm font-medium sm:text-base">{faq.question}</h3>
                <Plus
                  aria-hidden="true"
                  className="h-4 w-4 shrink-0 text-primary transition-transform duration-300 group-open:rotate-45"
                />
              </summary>
              <div className="border-t border-line px-5 py-4">
                <p className="text-sm leading-relaxed text-muted">{faq.answer}</p>
              </div>
            </details>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
