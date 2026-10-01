import { About } from "@/components/home/About";
import { AiSpotlight } from "@/components/home/AiSpotlight";
import { Architecture } from "@/components/home/Architecture";
import { Contact } from "@/components/home/Contact";
import { Experience } from "@/components/home/Experience";
import { Faq } from "@/components/home/Faq";
import { Hero } from "@/components/home/Hero";
import { Services } from "@/components/home/Services";
import { Skills } from "@/components/home/Skills";
import { Stats } from "@/components/home/Stats";
import { Terminal } from "@/components/home/Terminal";
import { Work } from "@/components/home/Work";
import { Writing } from "@/components/home/Writing";
import { JsonLd } from "@/components/ui/JsonLd";
import { featuredProjects } from "@/data/projects";
import { faqs } from "@/data/services";
import {
  faqSchema,
  jsonLdGraph,
  profilePageSchema,
  projectListSchema,
} from "@/lib/json-ld";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ path: "/", type: "profile" });

/**
 * Section order is deliberate: proof first (projects), then the context that
 * explains it (numbers, experience, stack), then everything else. Keep
 * `homeSectionIds` in `src/data/navigation.ts` in the same order.
 */
export default function HomePage() {
  return (
    <>
      <JsonLd
        data={jsonLdGraph(
          profilePageSchema(),
          projectListSchema(featuredProjects),
          faqSchema(faqs)
        )}
      />

      <Hero />
      <Work />
      <Stats />
      <Experience />
      <Skills />
      <Architecture />
      <AiSpotlight />
      <About />
      <Services />
      <Writing />
      <Terminal />
      <Faq />
      <Contact />
    </>
  );
}
