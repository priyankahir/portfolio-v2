/**
 * Injects a structured-data document into the page.
 * Rendered on the server so crawlers see it in the initial HTML.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // Content is built from local, non-user data — safe to serialise directly.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
