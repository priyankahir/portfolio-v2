import { Contact } from "@/components/home/Contact";
import { Faq } from "@/components/home/Faq";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHeader } from "@/components/ui/PageHeader";
import { faqs } from "@/data/approach";
import { profile } from "@/data/profile";
import { contactPageSchema, breadcrumbSchema, faqSchema, jsonLdGraph } from "@/lib/json-ld";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact",
  description: `Contact ${profile.name}, ${profile.role} in Ahmedabad, India, about MERN stack and full stack roles — by email, WhatsApp or the contact form.`,
  path: "/contact",
  keywords: [
    "contact MERN stack developer",
    "full stack developer Ahmedabad",
  ],
});

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={jsonLdGraph(
          contactPageSchema(),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ]),
          faqSchema(faqs)
        )}
      />

      <PageHeader
        eyebrow="Contact"
        title="Get in touch"
        description="Hiring for a MERN or full stack role, or have a question about my work? I read every message and usually reply within a day."
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
