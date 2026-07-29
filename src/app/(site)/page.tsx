import { About } from "@/components/home/About";
import { AiSpotlight } from "@/components/home/AiSpotlight";
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
import { faqs } from "@/data/services";
import { faqSchema, jsonLdGraph, profilePageSchema } from "@/lib/json-ld";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ path: "/", type: "profile" });

export default function HomePage() {
  return (
    <>
      <JsonLd data={jsonLdGraph(profilePageSchema(), faqSchema(faqs))} />

      <Hero />
      <Stats />
      <About />
      <Skills />
      <Work />
      <Experience />
      <AiSpotlight />
      <Services />
      <Terminal />
      <Writing />
      <Faq />
      <Contact />
    </>
  );
}
