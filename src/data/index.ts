// =============================================================================
// src/data/index.ts
// -----------------------------------------------------------------------------
// Pusat data statis untuk seluruh halaman portofolio.
// Edit nilai di sini tanpa perlu menyentuh komponen UI-nya.
// =============================================================================

// ---------- TypeScript Interfaces -------------------------------------------

/** Identitas singkat yang dipakai di HeroSection & metadata. */
export interface Profile {
  name: string;
  role: string;
  tagline: string;
  location?: string;
  email: string;
}

/** Social link untuk Contact section / footer. */
export interface SocialLink {
  label: string;
  href: string;
  handle: string;
}

/** Satu item pengalaman kerja / magang. */
export interface Experience {
  id: string;
  company: string;
  position: string;
  type: "Internship" | "Full-time" | "Part-time" | "Freelance";
  startDate: string; // contoh: "2024-08"
  endDate: string | "Present";
  description: string;
  highlights: string[];
}

/** Skill / tech stack — dikelompokkan agar mudah ditampilkan per kategori. */
export interface Skill {
  name: string;
  category: "Language" | "Framework" | "Mobile" | "Backend" | "Design" | "Tool";
  level?: "Beginner" | "Intermediate" | "Advanced";
}

/** Project unggulan yang ditampilkan di ProjectsSection. */
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
  location: "🇮🇩 Indonesia, East Java, Surabaya",
};

/** Daftar sosial media — dipakai di ContactSection / footer. */
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
      "Berkontribusi membangun fitur untuk produk web dan mobile internal klien.",
    highlights: [
      "Mengembangkan modul web menggunakan Laravel & Next.js.",
      "Membangun aplikasi mobile cross-platform dengan Flutter.",
      "Berkolaborasi dalam alur Git dan code review tim.",
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

// URL LinkedIn projects — dipakai semua project mengarah ke sini
const LINKEDIN_PROJECTS_URL = "https://www.linkedin.com/in/berlianpurlin/details/projects/";

export const projects: Project[] = [
  {
    id: "teamgrid",
    title: "TeamGrid",
    subtitle: "Mobile · Mini ERP",
    description:
      "Aplikasi mini Enterprise Resource Planning (ERP) untuk manajemen SDM berbasis project. Mendukung penugasan tim, monitoring progres, dan kolaborasi real-time.",
    techStack: ["Flutter", "Firebase", "Cloud Firestore"],
    image: "/dolfin-brain.png",
    demoUrl: LINKEDIN_PROJECTS_URL,
    featured: true,
  },
  {
    id: "dolfin-brain",
    title: "Dolfin Brain",
    subtitle: "Mobile · LMS",
    description:
      "Aplikasi Learning Management System (LMS) mobile yang menyajikan materi belajar interaktif dengan pengalaman pengguna yang ringan dan fokus.",
    techStack: ["Flutter", "Dart"],
    image: "/dolfin-brain.png",
    demoUrl: LINKEDIN_PROJECTS_URL,
    featured: true,
  },
];
