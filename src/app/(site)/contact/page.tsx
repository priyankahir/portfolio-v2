import { Contact } from "@/components/home/Contact";
import { Faq } from "@/components/home/Faq";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHeader } from "@/components/ui/PageHeader";
import { faqs } from "@/data/services";
import { profile } from "@/data/profile";
import { breadcrumbSchema, faqSchema, jsonLdGraph } from "@/lib/json-ld";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact",
  description: `Get in touch with ${profile.name} — MERN stack developer in Ahmedabad, India. Open to full-stack roles and freelance React / Next.js / Node.js work. Replies within a day.`,
  path: "/contact",
  keywords: [
    "hire MERN stack developer",
    "contact full stack developer",
    "freelance Node.js developer",
  ],
});

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={jsonLdGraph(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ]),
          faqSchema(faqs)
        )}
      />

      <PageHeader
        command="./init-contact --secure"
        title="Get in touch"
        description="Hiring for a MERN or full-stack role, or stuck on a specific problem? Either is a good reason to write. I read everything and reply within a day."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ]}
      />

      <Contact />
      <Faq />
    </>
  );
}
