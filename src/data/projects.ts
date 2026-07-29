import type { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "capability-ai",
    slug: "ai-chatbot-report-intelligence",
    title: "AI Chatbot & Report Intelligence",
    subtitle: "LLM surface inside an EHS platform",
    domain: "AI / LLM",
    year: "2025",
    status: "In Production",
    featured: true,
    summary:
      "Claude-powered chat, document summarisation and adaptive form flows built into Capability.work, with a human-handoff path when the model isn't enough.",
    problem:
      "Safety officers were drowning in policy PDFs and incident reports. Answers existed somewhere in the document set, but finding them meant reading hundreds of pages — and a generic chatbot answering from general knowledge would have been worse than useless in a compliance context.",
    approach: [
      "Integrated an AI chatbot against the Claude API with RAG over a vector database, so every answer is grounded in the customer's own EHS document set rather than model recall.",
      "Built an AI Report Summary flow: users upload an EHS report or document, Claude analyses the content, and the UI renders a structured summary plus actionable safety recommendations.",
      "Developed dynamic AI-driven form flows where Claude generates intelligent follow-up questions from the user's context and prior answers, so the questionnaire adapts as it's filled in.",
      "Added an answer-quality feedback system — thumbs up/down and star ratings — to capture structured signal on where the model was weak.",
      "Designed a human support handoff: a waiting-room UI and live agent join-room that lets a real person take over mid-conversation, with real-time push notifications for agent availability.",
    ],
    outcome:
      "The AI layer went from a demo to a daily-use surface: grounded answers, summarised reports, and a defined escalation path when the model can't close the loop.",
    metrics: [
      { label: "Answer grounding", value: "RAG + vector DB" },
      { label: "Escalation", value: "Live agent handoff" },
      { label: "Feedback loop", value: "Rating capture" },
    ],
    stack: [
      "React.js",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Claude API",
      "RAG",
      "Vector DB",
      "Zustand",
    ],
    role: "Full-Stack Developer — AI feature integration",
    hue: 152,
  },
  {
    id: "capability-work",
    slug: "capability-work",
    title: "Capability.work",
    subtitle: "EHS training & work management platform",
    domain: "EHS SaaS",
    year: "2025",
    status: "In Production",
    featured: true,
    summary:
      "Environmental, Health & Safety platform covering training management, incident reporting and compliance tracking for enterprise teams.",
    problem:
      "EHS compliance is a paperwork problem wearing a software costume — training records, incident reports and audit trails scattered across spreadsheets. The platform had to hold all of it without becoming an unusable enterprise maze.",
    approach: [
      "Developed the responsive web application covering training management, incident reporting and compliance tracking.",
      "Built dynamic dashboards, a course-builder UI, team management modules and real-time reporting, with usability and performance treated as requirements rather than polish.",
      "Designed modular, reusable component libraries and optimised rendering so the surface scales as features land.",
      "Separated server cache from UI state — TanStack Query for the former, Zustand for the latter — which kept dashboards responsive under heavy data.",
    ],
    outcome:
      "A component system the team keeps building on: new modules ship against existing primitives instead of restarting from scratch each sprint.",
    metrics: [
      { label: "Surface", value: "Dashboards & builders" },
      { label: "Architecture", value: "Component library" },
      { label: "Data layer", value: "TanStack Query" },
    ],
    stack: [
      "React.js",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "TanStack Query",
      "Zustand",
      "Shadcn UI",
    ],
    role: "MERN Stack Developer",
    hue: 190,
  },
  {
    id: "chrgd",
    slug: "chrgd-franchise-platform",
    title: "CHRGD Technologies",
    subtitle: "Franchise management SaaS",
    domain: "Fintech / Franchise",
    year: "2025",
    status: "In Production",
    featured: true,
    summary:
      "Franchise operations and financial workflows for admins, franchisors and franchisees — royalty automation via Stripe, live order tracking via Toast POS.",
    problem:
      "Franchise royalties were being reconciled by hand across a chain of restaurants. Three very different user types — admin, franchisor, franchisee — needed the same data, but each with a different slice and different permissions.",
    approach: [
      "Contributed to the SaaS platform that streamlines franchise operations and financial workflows across all three roles.",
      "Implemented automated royalty payment handling through Stripe integration, replacing manual reconciliation.",
      "Wired real-time order tracking through the Toast POS integration so revenue figures reflect actual sales.",
      "Built role-based access control with data-visualisation dashboards giving each level exactly the operational insight it's entitled to.",
    ],
    outcome:
      "Royalty collection moved from a manual monthly exercise to an automated flow, with each franchise level seeing a dashboard scoped to its own permissions.",
    metrics: [
      { label: "Payments", value: "Stripe automation" },
      { label: "POS", value: "Toast real-time sync" },
      { label: "Access", value: "Role-based (3 tiers)" },
    ],
    stack: [
      "React.js",
      "TypeScript",
      "Tailwind CSS",
      "Zustand",
      "Stripe",
      "Toast POS",
      "REST APIs",
    ],
    role: "MERN Stack Developer",
    hue: 265,
  },
  {
    id: "rembrandt",
    slug: "rembrandt-advantage",
    title: "Rembrandt Advantage",
    subtitle: "Psychological assessment platform",
    domain: "Assessment",
    year: "2025",
    status: "In Production",
    featured: true,
    summary:
      "A report template builder for behavioural and psychological assessments, driven by conditional logic and variable assessment structures.",
    problem:
      "Every client wanted their assessment report shaped differently — different sections, different scoring narratives, different conditional branches. Hard-coding report layouts would have meant a release for every new client.",
    approach: [
      "Built a dynamic report template builder so fully customised behavioural and psychological assessment reports can be composed without a code change.",
      "Implemented complex conditional form logic and dynamic rendering to support variable assessment structures and personalised output formats.",
      "Kept the rendering layer data-driven, so a template definition — not a component tree — decides what a report contains.",
    ],
    outcome:
      "New report formats became a configuration task instead of an engineering ticket.",
    metrics: [
      { label: "Reports", value: "Template-driven" },
      { label: "Logic", value: "Conditional branching" },
      { label: "Rendering", value: "Fully dynamic" },
    ],
    stack: ["React.js", "TypeScript", "Tailwind CSS", "REST APIs"],
    role: "MERN Stack Developer",
    hue: 25,
  },
  {
    id: "kuber-grow",
    slug: "kuber-grow",
    title: "Kuber Grow",
    subtitle: "Stock order & pricing management",
    domain: "Stock Trading",
    year: "2025",
    status: "In Production",
    featured: true,
    summary:
      "Bulk stock purchasing, order processing and real-time pricing workflows where a rendering bug is a pricing bug.",
    problem:
      "High-volume stock operations with live pricing: the UI had to stay accurate and responsive while numbers moved underneath it, and any stale render would show a trader the wrong price.",
    approach: [
      "Developed the modules for bulk stock purchasing, order processing and real-time stock pricing workflows.",
      "Implemented complex UI logic handling large-volume transactions with accurate pricing calculations and strict data consistency.",
      "Optimised rendering performance so real-time financial data stays reliable across high-volume operations.",
    ],
    outcome:
      "Traders get pricing that keeps up with the feed, on screens that don't stutter under transaction volume.",
    metrics: [
      { label: "Data", value: "Real-time pricing" },
      { label: "Scale", value: "Bulk transactions" },
      { label: "Focus", value: "Render optimisation" },
    ],
    stack: ["React.js", "TypeScript", "Tailwind CSS", "TanStack Query", "Axios"],
    role: "MERN Stack Developer",
    hue: 45,
  },
  {
    id: "vrundavan",
    slug: "vrundavan-buildcon",
    title: "Vrundavan Buildcon",
    subtitle: "Luxury real estate platform",
    domain: "Real Estate",
    year: "2025",
    status: "Live",
    featured: false,
    summary:
      "A marketing-grade property platform with dynamic layouts, heavy media, and Core Web Vitals that survive it.",
    problem:
      "Real estate sites live or die on imagery, and imagery is exactly what destroys load performance. The brief needed a premium visual feel without a four-second LCP.",
    approach: [
      "Built a fully responsive property platform with dynamic layout sections and seamless navigation for prospective buyers.",
      "Optimised media loading so large property imagery streams in without blocking first paint.",
      "Used Framer Motion for section transitions constrained to transform and opacity, keeping animation off the layout path.",
    ],
    outcome:
      "A visually heavy site that still loads fast on a mid-range phone over mobile data.",
    metrics: [
      { label: "Media", value: "Optimised loading" },
      { label: "Layout", value: "Fully responsive" },
      { label: "Motion", value: "Transform-only" },
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    role: "MERN Stack Developer",
    liveUrl: "https://vrundavanbuildcon.com",
    hue: 320,
  },
];

export const featuredProjects = projects.filter((project) => project.featured);

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
