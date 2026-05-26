// =============================================================================
// src/data/index.ts
// -----------------------------------------------------------------------------
// Centralized static data for the entire portfolio site.
// Edit values here without touching the UI components.
// =============================================================================

// ---------- TypeScript Interfaces -------------------------------------------

/** Short identity used in HeroSection & metadata. */
export interface Profile {
  name: string;
  role: string;
  tagline: string;
  location?: string;
  email: string;
}

/** Social link used in the Contact section / footer. */
export interface SocialLink {
  label: string;
  href: string;
  handle: string;
}

/** A single work / internship experience entry. */
export interface Experience {
  id: string;
  company: string;
  position: string;
  type: "Internship" | "Full-time" | "Part-time" | "Freelance";
  startDate: string; // example: "2024-08"
  endDate: string | "Present";
  description: string;
  highlights: string[];
}

/** Skill / tech stack — grouped for easy per-category display. */
export interface Skill {
  name: string;
  category: "Language" | "Framework" | "Mobile" | "Backend" | "Design" | "Tool";
  level?: "Beginner" | "Intermediate" | "Advanced";
}

/** Featured project displayed in ProjectsSection. */
export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  techStack: string[];

  image?: string;

  demoUrl?: string;
  repoUrl?: string;

  featured?: boolean;
}

// ---------- Data ------------------------------------------------------------

export const profile: Profile = {
  name: "Berlian Purli Novarianto",
  role: "Web and Mobile Developer",
  tagline:
    "Software engineer with a passion for crafting seamless web and mobile experiences. Skilled in Laravel, Next.js, and Flutter, I thrive on turning complex problems into elegant solutions. Always eager to learn and collaborate on innovative projects.",
  email: "novtengpn14@gmail.com",
  location: "Surabaya, East Java, Indonesia 🇮🇩",
};

/** Social media list — used in ContactSection / footer. */
export const socials: SocialLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/BerlianPurliN",
    handle: "BerlianPurliNi",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/berlianpurlin",
    handle: "Berlian Purli Novarianto",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/cllmenova/",
    handle: "cllmenova",
  },
];

export const experiences: Experience[] = [
  {
    id: "jobnation-2024",
    company: "PT Jobnation IT Outsource",
    position: "Web and Mobile Developer Intern",
    type: "Internship",
    startDate: "2024-08",
    endDate: "Present",
    description:
      "Contributing to the development of features for internal web and mobile products serving client needs.",
    highlights: [
      "Developed web modules using Laravel & Next.js.",
      "Built cross-platform mobile applications with Flutter.",
      "Collaborated within team Git workflows and code review cycles.",
    ],
  },
];

export const skills: Skill[] = [
  { name: "PHP", category: "Language", level: "Advanced" },
  { name: "Laravel", category: "Framework", level: "Advanced" },
  { name: "React (Next.js)", category: "Framework", level: "Intermediate" },
  { name: "Flutter", category: "Mobile", level: "Advanced" },
  { name: "Firebase", category: "Backend", level: "Intermediate" },
  { name: "Figma", category: "Design", level: "Intermediate" },
];

// LinkedIn projects URL — all projects point here.
const LINKEDIN_PROJECTS_URL =
  "https://www.linkedin.com/in/berlianpurlin/details/projects/";

export const projects: Project[] = [
  {
    id: "teamgrid",
    title: "TeamGrid",
    subtitle: "Mobile · Mini ERP",
    description:
      "A lightweight Enterprise Resource Planning (ERP) application for project-based human resource management. Supports team assignments, progress tracking, and real-time collaboration.",
    techStack: ["Flutter", "Firebase"],
    image: "/teamgrid.png",
    demoUrl: LINKEDIN_PROJECTS_URL,
    featured: true,
  },
  {
    id: "dolfin-brain",
    title: "Dolfin Brain",
    subtitle: "Mobile · LMS",
    description:
      "A mobile Learning Management System (LMS) that delivers interactive learning materials with a lightweight, focused user experience.",
    techStack: ["Flutter", "Laravel"],
    image: "/dolfin-brain.png",
    demoUrl: LINKEDIN_PROJECTS_URL,
    featured: true,
  },
  {
    id: "bentala",
    title: "Bentala",
    subtitle: "Web · Company Profile",
    description:
      "The official platform of Bentala — an advisory and capacity-building organization focused on climate solutions and ESG (Environmental, Social, and Governance) practices in Indonesia.",
    techStack: ["WordPress"],
    image: "/bentala.png",
    demoUrl: LINKEDIN_PROJECTS_URL,
    featured: true,
  },
];
