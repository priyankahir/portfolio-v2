import { constructMetadata } from "@/lib/metadata";

export const metadata = constructMetadata({
  title: "Contact | Priyank Baldaniya",
  description: "Get in touch with Priyank Baldaniya for frontend developer opportunities.",
});

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="text-4xl font-heading font-bold mb-8">Contact</h1>
      <p className="text-secondary">Content coming soon...</p>
    </div>
  );
}
