import { profile } from "@/src/data";

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen w-full items-center overflow-hidden bg-neutral-950 text-neutral-100"
    >
      {/* ----- Background dekoratif (glow lembut) -------------------------- */}
      {/* Ubah warna / posisi glow di sini untuk mengganti mood halaman.    */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -left-32 h-[420px] w-[420px] rounded-full bg-indigo-500/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-40 right-0 h-[300px] w-[300px] rounded-full bg-fuchsia-500/10 blur-3xl"
      />
      {/* Grid pattern halus — opsional, hapus jika terlalu ramai. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_75%)]"
      />

      {/* ----- Konten utama ------------------------------------------------ */}
      <div className="relative mx-auto w-full max-w-6xl px-6 py-24 sm:px-10 lg:px-16">
        <div className="flex flex-col gap-8">
          {/* Status chip — bisa ganti jadi "Open to work", "Hiring", dll. */}
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900/60 px-3 py-1 text-xs font-medium text-neutral-300 backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Available for new opportunities
          </div>

          {/* Sapaan kecil */}
          <p className="text-sm uppercase tracking-[0.2em] text-neutral-500">
            Hello, I&apos;m
          </p>

          {/* Nama — headline utama. Ukuran responsif. */}
          <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            {profile.name}
          </h1>

          {/* Role — pakai gradient text supaya menonjol. */}
          <p className="text-2xl font-medium sm:text-3xl lg:text-4xl">
            <span className="bg-gradient-to-r from-indigo-300 via-sky-300 to-fuchsia-300 bg-clip-text text-transparent">
              {profile.role}
            </span>
          </p>

          {/* Tagline / deskripsi singkat */}
          <p className="max-w-2xl text-base leading-relaxed text-neutral-400 sm:text-lg">
            {profile.tagline}
          </p>

          {/* ----- CTA buttons --------------------------------------------- */}
          <div className="mt-4 flex flex-wrap items-center gap-3">
            {/* Primary CTA */}
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-neutral-100 px-6 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-white"
            >
              View Projects
              <span
                aria-hidden
                className="transition-transform group-hover:translate-x-0.5"
              >
                →
              </span>
            </a>

            {/* Secondary CTA */}
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900/50 px-6 py-3 text-sm font-semibold text-neutral-100 backdrop-blur transition hover:border-neutral-700 hover:bg-neutral-900"
            >
              Get in touch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
