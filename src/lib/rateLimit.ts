// =============================================================================
// src/lib/rateLimit.ts
// -----------------------------------------------------------------------------
// Client-side rate limiter berbasis localStorage. Mencegah satu user submit
// form berkali-kali dalam waktu singkat (mitigasi spam/DDoS dari klien yang sama).
//
// PENTING: Ini PROTEKSI KLIEN — bisa di-bypass attacker yang clear storage.
// Untuk proteksi nyata, kombinasikan dengan:
//   - Rate limit di EmailJS dashboard (Allowed Domains + Max requests/hour)
//   - Cloudflare / Vercel WAF di production
//   - reCAPTCHA / Turnstile untuk verifikasi human
// =============================================================================

const STORAGE_KEY = "contact_submissions";

interface RateLimitConfig {
  /** Maksimal submission dalam window waktu */
  maxAttempts: number;
  /** Window waktu dalam millisecond */
  windowMs: number;
}

// Default: 3 submission per jam, 10 per 24 jam
const HOURLY_LIMIT: RateLimitConfig = {
  maxAttempts: 3,
  windowMs: 60 * 60 * 1000, // 1 jam
};

const DAILY_LIMIT: RateLimitConfig = {
  maxAttempts: 10,
  windowMs: 24 * 60 * 60 * 1000, // 24 jam
};

/**
 * Cek apakah user diizinkan submit form sekarang.
 * Return { allowed, reason, waitMs } — waitMs = berapa lama harus tunggu.
 */
export function checkRateLimit(): {
  allowed: boolean;
  reason?: string;
  waitMs?: number;
} {
  if (typeof window === "undefined") return { allowed: true };

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const timestamps: number[] = raw ? JSON.parse(raw) : [];
    const now = Date.now();

    // Bersihkan timestamp yang sudah expired (> 24 jam)
    const recent = timestamps.filter((t) => now - t < DAILY_LIMIT.windowMs);

    // Cek limit per jam
    const lastHour = recent.filter((t) => now - t < HOURLY_LIMIT.windowMs);
    if (lastHour.length >= HOURLY_LIMIT.maxAttempts) {
      const oldest = Math.min(...lastHour);
      const waitMs = HOURLY_LIMIT.windowMs - (now - oldest);
      return {
        allowed: false,
        reason: `Terlalu banyak pesan. Coba lagi dalam ${Math.ceil(waitMs / 60000)} menit.`,
        waitMs,
      };
    }

    // Cek limit per hari
    if (recent.length >= DAILY_LIMIT.maxAttempts) {
      return {
        allowed: false,
        reason: "Batas harian tercapai. Coba lagi besok.",
      };
    }

    return { allowed: true };
  } catch {
    // Kalau localStorage error (private mode, dll), biarkan submit
    return { allowed: true };
  }
}

/** Catat submission yang berhasil (panggil setelah send sukses). */
export function recordSubmission(): void {
  if (typeof window === "undefined") return;

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const timestamps: number[] = raw ? JSON.parse(raw) : [];
    timestamps.push(Date.now());
    // Simpan max 50 timestamp untuk hemat space
    const trimmed = timestamps.slice(-50);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
  } catch {
    // Silent fail — bukan masalah kritis
  }
}
