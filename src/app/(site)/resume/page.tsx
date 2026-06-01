import { constructMetadata } from "@/lib/metadata";

export const metadata = constructMetadata({
  title: "Resume | Priyank Baldaniya",
  description: "View the resume of Priyank Baldaniya, a frontend developer.",
});

export default function ResumePage() {
  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="text-4xl font-heading font-bold mb-8">Resume</h1>
      <p className="text-secondary">Content coming soon...</p>
    </div>
  );
}
