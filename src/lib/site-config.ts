/**
 * GAS DESIGNS — SINGLE SOURCE OF TRUTH FOR BUSINESS FACTS
 *
 * Rule: nothing renders in the UI unless it is confirmed here.
 *
 * Every fact the business has NOT confirmed is represented by a gate with
 * `confirmed: false`. Components must read the gate — never a raw literal —
 * so an unconfirmed fact is structurally incapable of reaching the page.
 *
 * Unconfirmed facts are listed in `docs/missing-client-info.md`.
 */

/**
 * A business fact and whether the client has confirmed it for publication.
 *
 * There is deliberately no `note` field. This module is imported by client
 * components, so any string here is emitted into the public JavaScript bundle.
 * The reasons each fact is unconfirmed are kept as comments below — which the
 * bundler strips — and in full in `docs/missing-client-info.md`.
 */
export interface FactGate {
  /** The value, or `null` when nothing may be published. */
  readonly value: string | null;
  /** Only `true` may ever reach the UI. */
  readonly confirmed: boolean;
}

/**
 * Returns the value only when the fact is confirmed, otherwise `null`.
 * This is the only sanctioned way to read a gated fact.
 */
export function confirmedValue(fact: FactGate): string | null {
  return fact.confirmed ? fact.value : null;
}

/** True when every supplied fact is confirmed. Used to gate whole UI blocks. */
export function allConfirmed(...facts: FactGate[]): boolean {
  return facts.every((f) => f.confirmed && f.value !== null);
}

/* ------------------------------------------------------------------
   CONFIRMED FACTS — sourced from the client brief
   ------------------------------------------------------------------ */

/** Wordmark / logo lockup spelling. One word, uppercase in the mark. */
export const BRAND_LOCKUP = "GasDesigns" as const;

/** How the business is referred to in running copy. */
export const BUSINESS_NAME = "Gas Designs" as const;

/** Confirmed contact email. */
export const BUSINESS_EMAIL = "pierre@gasdesigns.co.za" as const;

/** Canonical production origin, no trailing slash. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.gasdesigns.co.za"
).replace(/\/$/, "");

/** Year mark used in the footer. */
export const YEAR_MARK = 2025 as const;

export const SITE_TAGLINE = "Precision Gas Systems. Built for Safety." as const;

export const SITE_DESCRIPTION =
  "Gas Designs delivers gas installations, maintenance, leak detection and compliance support for residential, commercial and industrial sites across South Africa." as const;

/* ------------------------------------------------------------------
   UNCONFIRMED FACTS — hidden until the client confirms
   ------------------------------------------------------------------ */

/** Shared shape for every fact still awaiting client confirmation. */
const UNSET: FactGate = { value: null, confirmed: false };

/**
 * Facts the client has not confirmed for publication.
 *
 * Each is hidden from the UI until `confirmed` flips to true. The reason each
 * one is withheld is recorded in `docs/missing-client-info.md`; the short notes
 * here are comments so they stay out of the browser bundle.
 */
export const UNCONFIRMED = {
  /**
   * A candidate number exists but is NOT inlined here, for two reasons: it is
   * flagged as currently shared with another business and must not be published
   * until Pierre confirms ownership and exclusive use, and any literal in this
   * file would be emitted into the public bundle even if never rendered.
   * To publish: read it from `NEXT_PUBLIC_BUSINESS_PHONE` and flip `confirmed`.
   */
  phone: UNSET,

  /** Same number, same ownership question as the phone line. */
  whatsapp: UNSET,

  /** No availability claim may be made. Confirm real callout hours first. */
  availability: UNSET,

  /** Registration number not supplied. No registration claim may appear. */
  saqccNumber: UNSET,

  /** Membership number not supplied. No membership claim may appear. */
  lpgsaNumber: UNSET,

  /** No address supplied — required before LocalBusiness schema or a map. */
  address: UNSET,

  /** No coverage area supplied. No town, province or radius may be named. */
  serviceArea: UNSET,

  /** No opening hours supplied. */
  openingHours: UNSET,

  /** No company registration number supplied. */
  registrationNumber: UNSET,

  /** No evidence supplied for licensing or insurance; the words are banned. */
  insuranceAndLicensing: UNSET,

  /** No founder biography supplied; About uses capability copy only. */
  founderBio: UNSET,

  /** No founding date supplied. No experience claim may be made. */
  yearsInBusiness: UNSET,

  /** No real project photography supplied; abstract illustration is used. */
  projectPhotography: UNSET,

  /** No Google Business Profile URL supplied. */
  googleBusinessProfile: UNSET,

  /** No social profiles supplied; the footer social row stays hidden. */
  socialLinks: UNSET,
} as const satisfies Record<string, FactGate>;

/* ------------------------------------------------------------------
   DERIVED UI GATES
   ------------------------------------------------------------------ */

/**
 * LocalBusiness / ContactPoint structured data requires a real phone and a
 * real service area. The brief bans empty NAP schema, so both must be
 * confirmed before that schema is emitted.
 */
export const CAN_EMIT_LOCAL_BUSINESS_SCHEMA = allConfirmed(
  UNCONFIRMED.phone,
  UNCONFIRMED.serviceArea,
);

/** ContactPoint schema requires a confirmed telephone number. */
export const CAN_EMIT_CONTACT_POINT_SCHEMA = allConfirmed(UNCONFIRMED.phone);

/** Whether a phone CTA may be rendered anywhere. */
export const CAN_SHOW_PHONE = allConfirmed(UNCONFIRMED.phone);

/** Whether a WhatsApp CTA may be rendered anywhere. */
export const CAN_SHOW_WHATSAPP = allConfirmed(UNCONFIRMED.whatsapp);

/* ------------------------------------------------------------------
   NAVIGATION
   ------------------------------------------------------------------ */

export const PRIMARY_NAV = [
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const LEGAL_NAV = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms", href: "/terms" },
] as const;
