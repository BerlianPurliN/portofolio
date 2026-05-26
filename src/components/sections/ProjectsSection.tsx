import { projects } from "@/src/data";
import { ProjectCard } from "@/src/components/ui/ProjectCard";

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      className="w-full bg-neutral-950 py-12 text-neutral-100 sm:py-32"
    >
      <div className="mx-auto w-full max-w-6xl px-6 sm:px-10 lg:px-16">
        {/* ----- Heading ------------------------------------------------- */}
        <div className="mb-14 flex flex-col gap-3">
          <p className="text-sm uppercase tracking-[0.2em] text-neutral-500">
            Selected Work
          </p>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            Featured Projects
          </h2>
          <p className="max-w-2xl text-neutral-400">
            A selection of projects I&apos;ve built while exploring the web,
            mobile, and real-time team collaboration spaces.
          </p>
        </div>

        {/* ----- Grid ---------------------------------------------------- */}
        {/* 1 column on mobile, 2 on md+. Bump to lg:grid-cols-3
            once there are more than two projects. */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <a
            href="https://www.linkedin.com/in/berlianpurlin/details/projects/"
            target="_blank"
            className="inline-block rounded-full bg-black px-5 py-2 text-sm font-medium text-white border border-white hover:bg-neutral-800 text-center"
          >
            View More →
          </a>
        </div>
      </div>
    </section>
  );
}

// ProjectCard has been moved to src/components/ui/ProjectCard.tsx so it can
// safely handle click events as a Client Component.
