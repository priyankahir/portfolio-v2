import type { Education, Experience } from "@/types";
import { profile } from "./profile";

/**
 * One entry per company. The internship and the full-time role at Vivansh are
 * stages of the same entry, so the company appears once and total experience
 * is never the sum of separately counted stages.
 */
export const experiences: Experience[] = [
  {
    id: "vivansh-infotech",
    company: "Vivansh Infotech LLP",
    location: "Ahmedabad, India",
    positions: [
      {
        title: "Web Developer",
        type: "Full-time",
        start: "2025-04",
        end: null,
        summary:
          "Full stack features across EHS, AI, franchise, stock and assessment SaaS products.",
      },
      {
        title: "Web Developer Intern",
        type: "Internship",
        // Same date as profile.careerStart — the internship is where it began.
        start: profile.careerStart.slice(0, 7),
        end: "2025-03",
        summary:
          "Responsive React and Tailwind CSS interfaces from Figma, REST API integration and form validation.",
      },
    ],
    highlights: [
      "Build SaaS features end to end with MongoDB, Express.js, React.js, Node.js, Next.js and TypeScript.",
      "Design REST APIs with Express middleware, JWT auth, role-based access and Mongoose schemas.",
      "Integrate Stripe and Razorpay payments and Socket.IO real-time support, including AI-to-human handoff.",
      "Ship reusable UI with Tailwind CSS and Shadcn UI, and improve Lighthouse scores and technical SEO.",
    ],
    stack: [
      "MongoDB",
      "Express.js",
      "React.js",
      "Node.js",
      "Next.js",
      "TypeScript",
      "TanStack Query",
      "Zustand",
      "Socket.IO",
      "Tailwind CSS",
    ],
  },
];

/** The current company and title, for summaries that only need one line. */
export const currentPosition = {
  company: experiences[0].company,
  title: experiences[0].positions[0].title,
};

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
