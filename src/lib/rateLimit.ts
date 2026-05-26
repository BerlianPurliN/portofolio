// =============================================================================
// src/lib/rateLimit.ts
// -----------------------------------------------------------------------------
// Client-side rate limiter backed by localStorage. Prevents a single user
// from repeatedly submitting the form in a short window (mitigates spam/DDoS
// from the same client).
//
// IMPORTANT: this is CLIENT-SIDE protection — it can be bypassed by an
// attacker who clears storage. For real protection, combine with:
//   - Rate limiting in the EmailJS dashboard (Allowed Domains + max
//     requests/hour)
//   - Cloudflare / Vercel WAF in production
//   - reCAPTCHA / Turnstile for human verification
// =============================================================================

const STORAGE_KEY = "contact_submissions";

interface RateLimitConfig {
  /** Maximum number of submissions within the window. */
  maxAttempts: number;
  /** Window length in milliseconds. */
  windowMs: number;
}

// Defaults: 3 submissions per hour, 10 per 24 hours.
const HOURLY_LIMIT: RateLimitConfig = {
  maxAttempts: 3,
  windowMs: 60 * 60 * 1000, // 1 hour
};

const DAILY_LIMIT: RateLimitConfig = {
  maxAttempts: 10,
  windowMs: 24 * 60 * 60 * 1000, // 24 hours
};

/**
 * Check whether the user is currently allowed to submit the form.
 * Returns { allowed, reason, waitMs } — waitMs = how long to wait.
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

    // Drop timestamps that have expired (> 24 hours).
    const recent = timestamps.filter((t) => now - t < DAILY_LIMIT.windowMs);

    // Check the hourly limit.
    const lastHour = recent.filter((t) => now - t < HOURLY_LIMIT.windowMs);
    if (lastHour.length >= HOURLY_LIMIT.maxAttempts) {
      const oldest = Math.min(...lastHour);
      const waitMs = HOURLY_LIMIT.windowMs - (now - oldest);
      return {
        allowed: false,
        reason: `Too many messages. Please try again in ${Math.ceil(waitMs / 60000)} minutes.`,
        waitMs,
      };
    }

    // Check the daily limit.
    if (recent.length >= DAILY_LIMIT.maxAttempts) {
      return {
        allowed: false,
        reason: "Daily limit reached. Please try again tomorrow.",
      };
    }

    return { allowed: true };
  } catch {
    // If localStorage errors (private mode, etc.), allow the submission.
    return { allowed: true };
  }
}

/** Record a successful submission (call after the email is sent). */
export function recordSubmission(): void {
  if (typeof window === "undefined") return;

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const timestamps: number[] = raw ? JSON.parse(raw) : [];
    timestamps.push(Date.now());
    // Keep at most 50 timestamps to save space.
    const trimmed = timestamps.slice(-50);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
  } catch {
    // Silent fail — not a critical issue.
  }
}
