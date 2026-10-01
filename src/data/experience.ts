import type { Education, Experience } from "@/types";

export const experiences: Experience[] = [
  {
    id: "vivansh-web-developer",
    role: "Web Developer",
    company: "Vivansh InfoTech",
    location: "Ahmedabad, India",
    start: "2025-04",
    end: null,
    type: "Full-time",
    summary:
      "Build and ship production features across multiple SaaS products — EHS, AI, franchise management, stock operations and assessments — using React.js, Next.js, TypeScript and the wider MERN stack, in Agile/Scrum sprints.",
    highlights: [
      "Develop production applications in React.js, Next.js and TypeScript, built on reusable component architecture so new modules ship against existing primitives.",
      "Manage application state with Zustand, Context API and TanStack Query, keeping server cache and UI state separate for predictable, responsive dashboards.",
      "Integrate REST APIs, Stripe and Razorpay payment workflows, and Socket.IO real-time communication for a live AI-to-human support handoff.",
      "Improve Lighthouse scores through code splitting, lazy loading, rendering optimisation and image optimisation.",
      "Implement technical SEO with route-level metadata, semantic HTML structure, sitemaps and robots.txt.",
      "Work cross-functionally with backend, design, QA and product teams through sprint planning, reviews and releases.",
    ],
    stack: [
      "React.js",
      "Next.js",
      "TypeScript",
      "Node.js",
      "Express.js",
      "MongoDB",
      "TanStack Query",
      "Zustand",
      "Socket.IO",
      "Tailwind CSS",
    ],
  },
  {
    id: "vivansh-intern",
    role: "Web Developer Intern",
    company: "Vivansh InfoTech",
    location: "Ahmedabad, India",
    start: "2025-01",
    end: "2025-03",
    type: "Internship",
    summary:
      "Started on front-end delivery, turning Figma designs into production-ready React interfaces before moving into the full-time role.",
    highlights: [
      "Built responsive user interfaces from Figma designs using React.js and Tailwind CSS.",
      "Created reusable UI components following component-driven development practices.",
      "Integrated REST APIs and implemented form validation with Yup.",
      "Worked in Git-based branching and pull-request workflows within an Agile team.",
    ],
    stack: ["React.js", "JavaScript", "Tailwind CSS", "Yup", "Git"],
  },
];

export const education: Education[] = [
  {
    id: "be-computer",
    degree: "B.E. Computer Engineering",
    institution: "Government Engineering College, Rajkot",
    board: "Gujarat Technological University",
    start: "2021-06",
    end: "2025-05",
    score: "CPI 7.91 / 10.0",
    location: "Rajkot, Gujarat",
  },
  {
    id: "hsc",
    degree: "Class XII (HSC) — Science",
    institution: "Alpha Vidhya Sankul",
    board: "Gujarat Secondary & Higher Secondary Education Board",
    start: "2020-06",
    end: "2021-05",
    score: "88.30%",
    location: "Junagadh, Gujarat",
  },
];
