import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validation/contact";
import {
  SmtpNotConfiguredError,
  sendContactEmail,
} from "@/lib/email/send-contact-email";
import { clientKey, rateLimit } from "@/lib/rate-limit";

/**
 * POST /api/contact
 *
 * Order of checks: rate limit, then parse, then honeypot, then validate, then
 * send. Nothing about the mail transport — host names, usernames, environment
 * variable names — is ever returned to the caller.
 */

export const runtime = "nodejs";
/** Never cached: this endpoint has side effects. */
export const dynamic = "force-dynamic";

/** The only failure text a visitor is ever shown in production. */
const GENERIC_FAILURE =
  "We could not send your message just now. Please email us directly and we will pick it up.";

export async function POST(request: Request) {
  const limited = rateLimit(clientKey(request.headers));
  if (!limited.allowed) {
    return NextResponse.json(
      { ok: false, error: "Too many messages from this connection. Please try again shortly." },
      { status: 429, headers: { "Retry-After": String(limited.retryAfter) } },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "We could not read that submission." },
      { status: 400 },
    );
  }

  const parsed = contactSchema.safeParse(payload);

  if (!parsed.success) {
    // Field names only — never the values the visitor typed.
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0];
      if (typeof field === "string" && !fieldErrors[field]) {
        fieldErrors[field] = issue.message;
      }
    }
    return NextResponse.json(
      { ok: false, error: "Please check the highlighted fields.", fieldErrors },
      { status: 422 },
    );
  }

  const data = parsed.data;

  /*
   * Honeypot. A filled hidden field means a bot, so the response is
   * indistinguishable from success — telling a bot it failed only teaches it
   * to try again differently. Checked after parsing, and the schema keeps this
   * field permissive so a filled trap never surfaces as a validation error.
   */
  if (data.website && data.website.trim().length > 0) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  try {
    await sendContactEmail(data);
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    if (error instanceof SmtpNotConfiguredError) {
      // In development the developer is the audience, so say what is wrong —
      // without naming any credential. In production, stay generic.
      if (process.env.NODE_ENV === "development") {
        console.warn(
          "[contact] Mail transport is not configured. Copy .env.example to .env.local and fill in the SMTP section.",
        );
        return NextResponse.json(
          {
            ok: false,
            error:
              "Development notice: mail transport is not configured, so nothing was sent. See .env.example.",
          },
          { status: 503 },
        );
      }

      console.error("[contact] Mail transport is not configured.");
      return NextResponse.json({ ok: false, error: GENERIC_FAILURE }, { status: 503 });
    }

    // Log server-side for diagnosis; return nothing specific to the caller.
    console.error("[contact] Failed to send enquiry.", error);
    return NextResponse.json({ ok: false, error: GENERIC_FAILURE }, { status: 502 });
  }
}
