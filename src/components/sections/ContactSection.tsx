// =============================================================================
// src/components/sections/ContactSection.tsx
// -----------------------------------------------------------------------------
// Section "Contact" — formulir interaktif + info kontak.
// Client component karena memakai useState untuk form & feedback animation.
// =============================================================================

"use client";

import { useState, useEffect, useRef, type FormEvent } from "react";
import emailjs from "@emailjs/browser";
import { profile, socials } from "@/src/data";
import { checkRateLimit, recordSubmission } from "@/src/lib/rateLimit";

// Status pengiriman form — dipakai untuk menampilkan feedback visual.
type FormStatus = "idle" | "submitting" | "success" | "error";

// ---------- KONSTANTA KEAMANAN ---------------------------------------------
// Minimal waktu user mengisi form (ms). Bot biasanya submit < 1 detik.
const MIN_FILL_TIME_MS = 3000;
// Maksimal panjang input untuk mencegah payload abuse.
const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 100;
const MAX_MESSAGE_LENGTH = 2000;
// Regex email — basic validation.
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// EmailJS config — disimpan di .env.local, jangan hardcode.
const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "";
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "";
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "";

export default function ContactSection() {
  // ---------- State ---------------------------------------------------------
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    // Honeypot field — jangan dihapus, ini perangkap bot.
    website: "",
  });
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [copied, setCopied] = useState(false);

  // Timestamp ketika component mount — untuk cek minimum fill time.
  const mountTimeRef = useRef<number>(0);
  useEffect(() => {
    mountTimeRef.current = Date.now();
  }, []);

  // ---------- Validators ----------------------------------------------------
  function validateForm(): string | null {
    if (!form.name.trim()) return "Nama wajib diisi.";
    if (form.name.length > MAX_NAME_LENGTH) return "Nama terlalu panjang.";
    if (!EMAIL_REGEX.test(form.email)) return "Format email tidak valid.";
    if (form.email.length > MAX_EMAIL_LENGTH) return "Email terlalu panjang.";
    if (!form.message.trim()) return "Pesan wajib diisi.";
    if (form.message.length > MAX_MESSAGE_LENGTH)
      return `Pesan maksimal ${MAX_MESSAGE_LENGTH} karakter.`;
    return null;
  }

  // ---------- Handlers ------------------------------------------------------
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    // [LAYER 1] Honeypot check — jika bot isi field "website", silent reject.
    if (form.website) {
      // Pura-pura sukses agar bot tidak retry. Tidak kirim email.
      setStatus("success");
      setForm({ name: "", email: "", message: "", website: "" });
      setTimeout(() => setStatus("idle"), 4000);
      return;
    }

    // [LAYER 2] Time-based check — form harus diisi >= MIN_FILL_TIME_MS.
    const fillTime = Date.now() - mountTimeRef.current;
    if (fillTime < MIN_FILL_TIME_MS) {
      setStatus("error");
      setErrorMsg("Submission terlalu cepat. Coba lagi.");
      return;
    }

    // [LAYER 3] Input validation.
    const validationError = validateForm();
    if (validationError) {
      setStatus("error");
      setErrorMsg(validationError);
      return;
    }

    // [LAYER 4] Rate limit (per browser).
    const rateCheck = checkRateLimit();
    if (!rateCheck.allowed) {
      setStatus("error");
      setErrorMsg(rateCheck.reason || "Terlalu banyak request.");
      return;
    }

    // [LAYER 5] EmailJS config check.
    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      setStatus("error");
      setErrorMsg(
        "EmailJS belum dikonfigurasi. Cek file .env.local Anda.",
      );
      return;
    }

    // ---------- Kirim email via EmailJS ----------
    setStatus("submitting");
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          // Variable ini harus sama dengan placeholder di EmailJS template
          from_name: form.name.trim(),
          from_email: form.email.trim(),
          message: form.message.trim(),
          to_email: profile.email,
        },
        { publicKey: EMAILJS_PUBLIC_KEY },
      );

      recordSubmission(); // Catat untuk rate limit
      setStatus("success");
      setForm({ name: "", email: "", message: "", website: "" });
      setTimeout(() => setStatus("idle"), 4000);
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("error");
      setErrorMsg("Gagal mengirim. Coba lagi atau email langsung.");
    }
  };

  // Copy email ke clipboard — beri feedback "Copied!" 2 detik.
  const copyEmail = async () => {
    await navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // ---------- Render --------------------------------------------------------
  return (
    <section
      id="contact"
      className="relative w-full overflow-hidden bg-neutral-950 py-24 text-neutral-100 sm:py-32"
    >
      {/* ----- Background dekoratif (glow lembut) ---------------------------- */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-0 h-[300px] w-[300px] rounded-full bg-fuchsia-500/10 blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-6xl px-6 sm:px-10 lg:px-16">
        {/* ----- Heading --------------------------------------------------- */}
        <div className="mb-14 flex flex-col items-center gap-4 text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-neutral-500">
            Get in touch
          </p>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            Let&apos;s build something{" "}
            <span className="bg-gradient-to-r from-indigo-300 via-sky-300 to-fuchsia-300 bg-clip-text text-transparent">
              amazing
            </span>{" "}
            together
          </h2>
          <p className="max-w-xl text-neutral-400">
            Punya ide project, kolaborasi, atau sekadar ingin ngobrol soal tech?
            Drop pesan di bawah — biasanya saya balas dalam 1×24 jam.
          </p>
        </div>

        {/* ----- Grid layout: Info + Form --------------------------------- */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
          {/* =========== Info panel (kiri) =============================== */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Card email — clickable untuk copy */}
            <button
              type="button"
              onClick={copyEmail}
              className="group flex flex-col gap-2 rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6 text-left backdrop-blur transition hover:border-neutral-700 hover:bg-neutral-900/70"
            >
              <span className="text-xs uppercase tracking-[0.18em] text-neutral-500">
                Email
              </span>
              <span className="flex items-center gap-2 text-base font-medium text-neutral-100 sm:text-lg">
                {profile.email}
                {/* Indikator copy */}
                <span
                  className={`ml-2 text-xs font-normal transition ${
                    copied
                      ? "text-emerald-400 opacity-100"
                      : "text-neutral-500 opacity-0 group-hover:opacity-100"
                  }`}
                >
                  {copied ? "✓ Copied!" : "Click to copy"}
                </span>
              </span>
            </button>

            {/* Card lokasi */}
            {profile.location && (
              <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6 backdrop-blur">
                <p className="text-xs uppercase tracking-[0.18em] text-neutral-500">
                  Location
                </p>
                <p className="mt-2 flex items-center gap-2 text-base font-medium">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                  </span>
                  {profile.location}
                </p>
              </div>
            )}

            {/* Card socials */}
            <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6 backdrop-blur">
              <p className="mb-4 text-xs uppercase tracking-[0.18em] text-neutral-500">
                Find me on
              </p>
              <ul className="flex flex-col gap-3">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between rounded-lg px-3 py-2 text-sm text-neutral-300 transition hover:bg-neutral-800/50 hover:text-neutral-100"
                    >
                      <span className="font-medium">{s.label}</span>
                      <span className="flex items-center gap-2 text-neutral-500 transition group-hover:text-neutral-300">
                        {s.handle}
                        <span
                          aria-hidden
                          className="transition-transform group-hover:translate-x-0.5"
                        >
                          ↗
                        </span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* =========== Form panel (kanan) ============================== */}
          <form
            onSubmit={handleSubmit}
            className="lg:col-span-3 rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6 backdrop-blur sm:p-8"
          >
            <div className="flex flex-col gap-5">
              {/* =========== HONEYPOT FIELD ============================== */}
              {/* Field tersembunyi untuk perangkap bot. Manusia tidak melihat
                  field ini, tapi bot akan auto-fill semua field. Jika field
                  ini terisi → form di-reject diam-diam.
                  PENTING: jangan ganti name="website" atau hapus tabIndex. */}
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  left: "-9999px",
                  width: "1px",
                  height: "1px",
                  overflow: "hidden",
                }}
              >
                <label htmlFor="website">Website (leave blank)</label>
                <input
                  type="text"
                  id="website"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.website}
                  onChange={(e) =>
                    setForm({ ...form, website: e.target.value })
                  }
                />
              </div>

              {/* Name */}
              <FormField
                label="Name"
                id="name"
                type="text"
                value={form.name}
                onChange={(v) => setForm({ ...form, name: v })}
                placeholder="John Doe"
                maxLength={MAX_NAME_LENGTH}
                required
              />

              {/* Email */}
              <FormField
                label="Email"
                id="email"
                type="email"
                value={form.email}
                onChange={(v) => setForm({ ...form, email: v })}
                placeholder="you@example.com"
                maxLength={MAX_EMAIL_LENGTH}
                required
              />

              {/* Message */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="message"
                  className="flex items-center justify-between text-xs uppercase tracking-[0.18em] text-neutral-500"
                >
                  <span>Message</span>
                  {/* Counter karakter — feedback ke user */}
                  <span className="normal-case tracking-normal">
                    {form.message.length}/{MAX_MESSAGE_LENGTH}
                  </span>
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  maxLength={MAX_MESSAGE_LENGTH}
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  placeholder="Halo Berlian, saya ingin diskusi tentang…"
                  className="resize-none rounded-lg border border-neutral-800 bg-neutral-950/60 px-4 py-3 text-sm text-neutral-100 placeholder:text-neutral-600 transition focus:border-neutral-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              {/* Error message — tampil saat status error */}
              {status === "error" && errorMsg && (
                <div className="rounded-lg border border-red-900/50 bg-red-950/30 px-4 py-3 text-sm text-red-300">
                  ⚠ {errorMsg}
                </div>
              )}

              {/* Submit button — text & icon berubah sesuai status */}
              <button
                type="submit"
                disabled={status === "submitting" || status === "success"}
                className="group mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-neutral-100 px-6 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "submitting" && (
                  <>
                    <Spinner /> Sending…
                  </>
                )}
                {status === "success" && <>✓ Message sent!</>}
                {status === "error" && <>↻ Try again</>}
                {status === "idle" && (
                  <>
                    Send Message
                    <span
                      aria-hidden
                      className="transition-transform group-hover:translate-x-0.5"
                    >
                      →
                    </span>
                  </>
                )}
              </button>

              {/* Helper text di bawah submit button */}
              <p className="text-center text-xs text-neutral-500">
                Atau kirim email langsung ke{" "}
                <a
                  href={`mailto:${profile.email}`}
                  className="text-neutral-300 underline-offset-4 hover:underline"
                >
                  {profile.email}
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Subcomponents — disimpan di file ini agar mudah dipindah ke ui/ kalau perlu.
// ---------------------------------------------------------------------------

/** Field input reusable dengan label & styling konsisten. */
function FormField({
  label,
  id,
  type,
  value,
  onChange,
  placeholder,
  required,
  maxLength,
}: {
  label: string;
  id: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
  maxLength?: number;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="text-xs uppercase tracking-[0.18em] text-neutral-500"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        required={required}
        maxLength={maxLength}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={type === "email" ? "email" : "off"}
        className="rounded-lg border border-neutral-800 bg-neutral-950/60 px-4 py-3 text-sm text-neutral-100 placeholder:text-neutral-600 transition focus:border-neutral-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
      />
    </div>
  );
}

/** Spinner kecil — dipakai di button saat status submitting. */
function Spinner() {
  return (
    <span
      aria-hidden
      className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-neutral-950 border-t-transparent"
    />
  );
}
