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
            Beberapa project yang saya bangun untuk mengeksplorasi domain web,
            mobile, dan kolaborasi tim berbasis data real-time.
          </p>
        </div>

        {/* ----- Grid ---------------------------------------------------- */}
        {/* 1 kolom di mobile, 2 kolom di md+. Ubah ke lg:grid-cols-3
            jika project sudah lebih dari 2. */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ProjectCard sudah dipindahkan ke src/components/ui/ProjectCard.tsx
// agar bisa handle click events dengan aman sebagai Client Component.
