import { constructMetadata } from "@/lib/metadata";

export const metadata = constructMetadata({
  title: "Projects | Priyank Baldaniya",
  description: "Explore the frontend development projects by Priyank Baldaniya.",
});

export default function ProjectsPage() {
  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="text-4xl font-heading font-bold mb-8">Projects</h1>
      <p className="text-secondary">Content coming soon...</p>
    </div>
  );
}
