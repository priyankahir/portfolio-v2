/**
 * Single entry point for every piece of site content.
 * Components import from `@/data` — never from a data file directly — so the
 * shape of the content layer can change without touching the UI.
 */

export { profile, stats, domains } from "./profile";
export { skillGroups, allSkills, toolbox } from "./skills";
export { experiences, education } from "./experience";
export { projects, featuredProjects, getProjectBySlug } from "./projects";
export { services, processSteps, principles, faqs } from "./services";
export { navItems, homeSectionIds, footerLinks } from "./navigation";
export {
  posts,
  featuredPosts,
  sortedPosts,
  getPostBySlug,
  postCategories,
} from "./posts";
