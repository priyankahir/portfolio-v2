import { constructMetadata } from "@/lib/metadata";

export const metadata = constructMetadata({
  title: "About | Priyank Baldaniya",
  description: "Learn more about Priyank Baldaniya, a frontend developer from Ahmedabad, India.",
});

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="text-4xl font-heading font-bold mb-8">About Me</h1>
      <p className="text-secondary">Content coming soon...</p>
    </div>
  );
}
