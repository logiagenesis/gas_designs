import "server-only";

/**
 * Basic in-memory rate limiting for the contact endpoint.
 *
 * SCOPE: this is a speed bump against casual abuse, not a security control.
 * The counters live in the process, so on a serverless platform each instance
 * keeps its own window and the effective limit is per-instance. If the client
 * needs a hard guarantee, move this to a shared store — it is noted as a
 * launch consideration in docs/self-audit-03-final.md.
 */

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
/** Stops the map from growing without bound if traffic is heavy. */
const MAX_TRACKED_KEYS = 5000;

const hits = new Map<string, number[]>();

export interface RateLimitResult {
  allowed: boolean;
  /** Seconds until the caller may try again. Zero when allowed. */
  retryAfter: number;
}

export function rateLimit(key: string): RateLimitResult {
  const now = Date.now();
  const cutoff = now - WINDOW_MS;

  if (hits.size > MAX_TRACKED_KEYS) hits.clear();

  const recent = (hits.get(key) ?? []).filter((t) => t > cutoff);

  if (recent.length >= MAX_REQUESTS) {
    const retryAfter = Math.ceil((recent[0] + WINDOW_MS - now) / 1000);
    hits.set(key, recent);
    return { allowed: false, retryAfter: Math.max(retryAfter, 1) };
  }

  recent.push(now);
  hits.set(key, recent);
  return { allowed: true, retryAfter: 0 };
}

/**
 * Best-effort client identity from proxy headers. Falls back to a single
 * shared bucket rather than trusting a spoofable value as unique.
 */
export function clientKey(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return headers.get("x-real-ip")?.trim() || "unknown";
}
