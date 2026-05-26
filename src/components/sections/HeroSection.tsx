import { profile } from "@/src/data";

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen w-full items-center overflow-hidden bg-neutral-950 text-neutral-100"
    >
      {/* ----- Decorative background (soft glow) -------------------------- */}
      {/* Tweak the glow color / position here to change the page mood.    */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -left-32 h-105 w-105 rounded-full bg-indigo-500/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-40 right-0 h-75 w-75 rounded-full bg-fuchsia-500/10 blur-3xl"
      />
      {/* Subtle grid pattern — optional, remove if too busy. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-size-[48px_48px] mask-[radial-gradient(ellipse_at_center,black_40%,transparent_75%)]"
      />

      {/* ----- Main content ------------------------------------------------ */}
      <div className="relative mx-auto w-full max-w-6xl px-6 py-24 sm:px-10 lg:px-16">
        <div className="flex flex-col gap-8">
          {/* Status chip — swap for "Open to work", "Hiring", etc. */}
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900/60 px-3 py-1 text-xs font-medium text-neutral-300 backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Available for new opportunities
          </div>

          {/* Small greeting */}
          <p className="text-sm uppercase tracking-[0.2em] text-neutral-500">
            Hello, I&apos;m
          </p>

          {/* Name — primary headline. Responsive sizing. */}
          <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            {profile.name}
          </h1>

          {/* Role — gradient text for emphasis. */}
          <p className="text-2xl font-medium sm:text-3xl lg:text-4xl">
            <span className="bg-linear-to-r from-indigo-300 via-sky-300 to-fuchsia-300 bg-clip-text text-transparent">
              {profile.role}
            </span>
          </p>

          {/* Tagline / short description */}
          <p className="max-w-2xl text-base leading-relaxed text-neutral-400 sm:text-lg">
            {profile.tagline}
          </p>

          {/* ----- CTA buttons --------------------------------------------- */}
          <div className="mt-4 flex flex-wrap items-center gap-3">
            {/* Primary CTA */}
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full border border-white bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-black"
            >
              View Projects
              <span
                aria-hidden
                className="transition-transform group-hover:translate-x-0.5"
              >
                →
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
