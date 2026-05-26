// =============================================================================
// src/components/ui/ProjectCard.tsx
// -----------------------------------------------------------------------------
// ProjectCard — a Client Component so it can safely handle click events.
// Extracted from ProjectsSection to avoid conflicts with the Server Component.
// =============================================================================

"use client";

import type { Project } from "@/src/data";

export function ProjectCard({ project }: { project: Project }) {
  // Decide the card link URL — priority: demoUrl > repoUrl
  const cardUrl = project.demoUrl || project.repoUrl;

  // Wrapper element — <a> if a URL exists, otherwise <div>
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
      // group: drives hover effects on child elements.
      // relative + overflow-hidden: contains the border highlight & image.
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6 backdrop-blur transition hover:border-neutral-700 hover:bg-neutral-900/70"
    >
      {/* Subtle gradient border highlight on hover */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(600px circle at var(--x,50%) var(--y,0%), rgba(99,102,241,0.08), transparent 40%)",
        }}
      />

      {/* ----- Media / preview -------------------------------------------- */}
      {/* Use project.image when available; fall back to a placeholder letter. */}
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
      {/* Inner actions are <button> instead of <a> to avoid nested <a> tags
          (invalid HTML). We use window.open() + stopPropagation so a click on
          the button does NOT trigger the parent card link. */}
      {(project.demoUrl || project.repoUrl) && (
        <div className="mt-6 flex flex-wrap gap-4 text-sm">
          {project.demoUrl && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation(); // Prevent click bubbling to card wrapper
                e.preventDefault(); // Prevent default anchor navigation
                window.open(project.demoUrl, "_blank", "noopener,noreferrer");
              }}
              className="font-medium text-neutral-100 underline-offset-4 hover:underline"
            ></button>
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
            ></button>
          )}
        </div>
      )}
    </WrapperComponent>
  );
}
