import { projects, type Project } from "@/src/data";

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      className="w-full bg-neutral-950 py-24 text-neutral-100 sm:py-32"
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
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Komponen kecil — dipisah di file ini agar gampang dipindah ke
// `components/ui/ProjectCard.tsx` kalau dipakai di tempat lain.
// ---------------------------------------------------------------------------
function ProjectCard({ project }: { project: Project }) {
  return (
    <article
      // group: dipakai untuk hover effect pada anak elemen.
      // relative + overflow-hidden: menampung border highlight & gambar.
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6 backdrop-blur transition hover:border-neutral-700 hover:bg-neutral-900/70"
    >
      {/* Subtle gradient border highlight saat hover */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(600px circle at var(--x,50%) var(--y,0%), rgba(99,102,241,0.08), transparent 40%)",
        }}
      />

      {/* ----- Media / preview -------------------------------------------- */}
      {/* Placeholder visual. Ganti dengan <img src={project.image} /> atau
          <Image /> dari "next/image" bila sudah ada asset di /public. */}
      <div className="mb-6 aspect-[16/10] w-full overflow-hidden rounded-xl border border-neutral-800 bg-gradient-to-br from-neutral-800/60 via-neutral-900 to-black">
        <div className="flex h-full w-full items-center justify-center">
          <span className="text-5xl font-semibold tracking-tight text-neutral-700">
            {project.title.charAt(0)}
          </span>
        </div>
      </div>

      {/* ----- Meta -------------------------------------------------------- */}
      <p className="mb-2 text-xs uppercase tracking-[0.18em] text-neutral-500">
        {project.subtitle}
      </p>

      <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">
        {project.title}
      </h3>

      <p className="mt-3 text-sm leading-relaxed text-neutral-400">
        {project.description}
      </p>

      {/* ----- Tech stack chips ------------------------------------------- */}
      <ul className="mt-5 flex flex-wrap gap-2">
        {project.techStack.map((tech) => (
          <li
            key={tech}
            className="rounded-full border border-neutral-800 bg-neutral-950/60 px-3 py-1 text-xs text-neutral-300"
          >
            {tech}
          </li>
        ))}
      </ul>

      {/* ----- Actions ----------------------------------------------------- */}
      {(project.demoUrl || project.repoUrl) && (
        <div className="mt-6 flex flex-wrap gap-4 text-sm">
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-neutral-100 underline-offset-4 hover:underline"
            >
              Live demo ↗
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-neutral-400 underline-offset-4 hover:text-neutral-100 hover:underline"
            >
              Source code ↗
            </a>
          )}
        </div>
      )}
    </article>
  );
}
