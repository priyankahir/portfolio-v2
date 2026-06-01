import { constructMetadata } from "@/lib/metadata";

export const metadata = constructMetadata({
  title: "Blogs | Priyank Baldaniya",
  description: "Read the latest articles on frontend development, React, Next.js, and more.",
});

export default function BlogsPage() {
  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="text-4xl font-heading font-bold mb-8">Blogs</h1>
      <p className="text-secondary">Content coming soon...</p>
    </div>
  );
}
