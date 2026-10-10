import type { FaqItem, Principle } from "@/types";

export const principles: Principle[] = [
  {
    id: "readable",
    title: "Readable beats clever",
    body: "The next person to open this file is the real audience. A clever one-liner that costs ten minutes of comprehension is a net loss.",
    icon: "BookOpen",
  },
  {
    id: "types",
    title: "Types are documentation that runs",
    body: "Strict TypeScript and validated API boundaries catch a whole class of bugs that would otherwise surface in QA. `any` is a decision to debug later.",
    icon: "ShieldCheck",
  },
  {
    id: "render",
    title: "Render cost is a feature",
    body: "Every state update has a blast radius. Knowing which components re-render — and why — is the difference between a smooth table and a janky one.",
    icon: "Gauge",
  },
  {
    id: "a11y",
    title: "Accessible by construction",
    body: "Semantic elements, focus order and keyboard paths are decided while building, not retrofitted after an audit flags them.",
    icon: "Accessibility",
  },
  {
    id: "ai",
    title: "AI is a product problem",
    body: "Model quality is only half of it. Grounding answers in real documents, handling latency, and giving users a path to a human when the answer is wrong — that's engineering work on both sides of the API.",
    icon: "Sparkles",
  },
  {
    id: "ship",
    title: "Shipped beats perfect",
    body: "Scope down, ship the vertical slice, learn from real usage. Perfection in a branch helps nobody.",
    icon: "Rocket",
  },
];

/**
 * Answers state dates, never durations — total experience is computed at
 * render time (src/lib/experience.ts) and FAQ text is static.
 */
export const faqs: FaqItem[] = [
  {
    question: "What roles are you looking for?",
    answer:
      "MERN stack and full stack roles on SaaS products — dashboards, workflows, payments or AI features. Based in Ahmedabad, open to on-site, hybrid or remote.",
  },
  {
    question: "What is your professional experience?",
    answer:
      "I joined Vivansh Infotech LLP as a Web Developer Intern in January 2025 and moved into a full-time Web Developer role in April 2025, shipping EHS, AI, franchise, stock and assessment products.",
  },
  {
    question: "What's your core stack?",
    answer:
      "MongoDB, Express.js, React.js and Node.js, with Next.js and TypeScript — plus Tailwind CSS, Shadcn UI, TanStack Query and Zustand.",
  },
  {
    question: "What backend work have you done?",
    answer:
      "REST APIs on Node.js and Express with JWT auth and role-based access, Mongoose schema design, Stripe and Razorpay payments, Socket.IO real-time features, and Node services on AWS EC2 with PM2.",
  },
  {
    question: "What AI work have you done?",
    answer:
      "A Claude API assistant grounded with RAG over a vector database, an AI Report Builder, and a live AI-to-human support handoff over Socket.IO.",
  },
  {
    question: "How do I reach you?",
    answer:
      "Email priyankahir333@gmail.com or WhatsApp +91 99797 00935. The contact form reaches the same inbox — I usually reply within a day.",
  },
];
