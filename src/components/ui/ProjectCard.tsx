// =============================================================================
// src/components/ui/ProjectCard.tsx
// -----------------------------------------------------------------------------
// ProjectCard — Client Component agar bisa handle click events dengan aman.
// Ini dipindahkan dari ProjectsSection agar tidak conflict dengan Server Component.
// =============================================================================

"use client";

import type { Project } from "@/src/data";

export function ProjectCard({ project }: { project: Project }) {
  // Tentukan URL untuk card link — prioritas: demoUrl > repoUrl
  const cardUrl = project.demoUrl || project.repoUrl;

  // Wrapper element — <a> jika ada URL, <div> jika tidak
  const WrapperComponent = cardUrl ? "a" : "div";
  const wrapperProps = cardUrl
    ? {
        href: cardUrl,
        target: "_blank" as const,
        rel: "noopener noreferrer",
      }
    : {};

  return (
    <WrapperComponent
      {...wrapperProps}
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
      {/* Gunakan project.image jika tersedia, fallback ke placeholder letter. */}
      <div className="mb-6 aspect-[16/10] w-full overflow-hidden rounded-xl border border-neutral-800 bg-gradient-to-br from-neutral-800/60 via-neutral-900 to-black">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="text-5xl font-semibold tracking-tight text-neutral-700">
              {project.title.charAt(0)}
            </span>
          </div>
        )}
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

      {/* ----- Actions ------------------------------------------------------ */}
      {/* Inner action diubah dari <a> ke <button> agar tidak nested <a> dalam
          <a> (invalid HTML). Pakai window.open() + stopPropagation supaya
          click di button TIDAK trigger card link. */}
      {(project.demoUrl || project.repoUrl) && (
        <div className="mt-6 flex flex-wrap gap-4 text-sm">
          {project.demoUrl && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation(); // Cegah click bubble ke card wrapper
                e.preventDefault();  // Cegah default anchor navigation
                window.open(project.demoUrl, "_blank", "noopener,noreferrer");
              }}
              className="font-medium text-neutral-100 underline-offset-4 hover:underline"
            >
              Live demo ↗
            </button>
          )}
          {project.repoUrl && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                window.open(project.repoUrl, "_blank", "noopener,noreferrer");
              }}
              className="font-medium text-neutral-400 underline-offset-4 hover:text-neutral-100 hover:underline"
            >
              Source code ↗
            </button>
          )}
        </div>
      )}
    </WrapperComponent>
  );
}
