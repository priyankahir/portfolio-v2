/**
 * Layers of a typical MERN build, as shown in the home page "Architecture"
 * section. Every technology here appears on the résumé — keep it that way.
 */
export interface ArchitectureLayer {
  id: string;
  /** Short tab label */
  label: string;
  /** Technologies that own this layer, e.g. "Node.js · Express" */
  tech: string;
  title: string;
  summary: string;
  decisions: string[];
  stack: string[];
}

export const architectureLayers: ArchitectureLayer[] = [
  {
    id: "client",
    label: "Client",
    tech: "React · Next.js",
    title: "Server-first React, client islands where it counts",
    summary:
      "Pages render on the server for speed and SEO; only interactive pieces ship JavaScript. Server data and UI state never share a store.",
    decisions: [
      "TanStack Query owns server state — cache keys, refetching, invalidation",
      "Zustand / Context hold UI state only",
      "React Hook Form + Yup validate before a request ever leaves the browser",
      "Code splitting and lazy loading keep each route's bundle small",
    ],
    stack: ["Next.js", "React", "TypeScript", "TanStack Query", "Zustand", "Tailwind CSS"],
  },
  {
    id: "api",
    label: "API",
    tech: "Node.js · Express",
    title: "Thin routes, explicit middleware, one error path",
    summary:
      "Every request walks the same chain: authenticate, authorise by role, validate, then hand off to a controller. Failures funnel into one error handler.",
    decisions: [
      "JWT authentication with role-based guards per route",
      "Validation at the boundary — controllers trust their input",
      "Centralised error middleware, no stack traces leaked to clients",
      "REST resources named for the domain, versioned under /api",
    ],
    stack: ["Node.js", "Express.js", "JWT", "REST", "Middleware"],
  },
  {
    id: "data",
    label: "Data",
    tech: "MongoDB · Mongoose",
    title: "Schemas shaped by the queries that read them",
    summary:
      "Collections are designed from access patterns, not from the UI. Indexes exist for real queries, and read paths return plain objects.",
    decisions: [
      "Mongoose schemas with validation and sensible defaults",
      "Compound indexes matched to filter + sort combinations",
      "Tenant id on every document in multi-tenant systems",
      ".lean() on read-heavy endpoints",
    ],
    stack: ["MongoDB", "Mongoose", "Schema design", "Indexing"],
  },
  {
    id: "realtime",
    label: "Real-time",
    tech: "Socket.IO · Payments · AI",
    title: "Live updates and third-party integrations",
    summary:
      "Socket.IO for live support and agent handoff, Stripe and Razorpay for payments, and the Claude API with RAG for grounded AI features.",
    decisions: [
      "Room-per-conversation sockets for AI-to-human handoff",
      "Payment state confirmed server-side, never trusted from the client",
      "RAG over a vector database so AI answers cite real documents",
      "Graceful fallbacks when an external service is slow or down",
    ],
    stack: ["Socket.IO", "Stripe", "Razorpay", "Claude API", "RAG"],
  },
  {
    id: "delivery",
    label: "Delivery",
    tech: "AWS EC2 · PM2 · CI",
    title: "Shipped with checks, kept alive in production",
    summary:
      "Every push runs lint, type-check and build in CI. Node services run under PM2 on AWS EC2; frontends deploy to Vercel with preview builds.",
    decisions: [
      "GitHub Actions gate merges on lint, types and build",
      "PM2 cluster mode with automatic restarts on EC2",
      "Environment-based config, secrets never in the repo",
      "Lighthouse checks for performance and SEO before release",
    ],
    stack: ["GitHub Actions", "AWS EC2", "PM2", "Vercel", "Git"],
  },
];
