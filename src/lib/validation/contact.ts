import { z } from "zod";
import { SERVICE_TITLES } from "@/data/service-titles";

/**
 * GAS DESIGNS — CONTACT SCHEMA
 *
 * One schema, used by the browser and by the API route. Client-side validation
 * is a convenience; the server re-validates the same way and trusts nothing
 * that arrives over the wire.
 */

/**
 * The dropdown offers exactly the nine service titles, and nothing else.
 * Imported from `service-titles.ts` rather than from the full catalogue so the
 * catalogue's internal review notes never reach the browser bundle.
 */

export const SITE_TYPES = [
  "Residential",
  "Commercial",
  "Industrial",
  "Development",
  "Other",
] as const;

export const URGENCY_OPTIONS = [
  "Quote",
  "Inspection",
  "Maintenance",
  "Emergency",
] as const;

export const SERVICE_CHOICES = SERVICE_TITLES;

/** Permissive on format, strict on length — South African numbers vary. */
const phoneSchema = z
  .string({ error: "Enter a contact number." })
  .trim()
  .min(7, { message: "Enter a contact number of at least 7 digits." })
  .max(24, { message: "That number looks too long." })
  .regex(/^[0-9+()\-\s]+$/, {
    message: "Use digits, spaces, and + ( ) - only.",
  });

export const contactSchema = z.object({
  fullName: z
    .string({ error: "Enter your full name." })
    .trim()
    .min(2, { message: "Enter your full name." })
    .max(80, { message: "That name is too long." }),

  company: z
    .string({ error: "That company name is not valid." })
    .trim()
    .max(120, { message: "That company name is too long." })
    .optional()
    .or(z.literal("")),

  phone: phoneSchema,

  email: z
    .string({ error: "Enter your email address." })
    .trim()
    .min(1, { message: "Enter your email address." })
    .max(160, { message: "That email address is too long." })
    .pipe(z.email({ message: "Enter a valid email address." })),

  location: z
    .string({ error: "Tell us the suburb or town the work is in." })
    .trim()
    .min(2, { message: "Tell us the suburb or town the work is in." })
    .max(120, { message: "That location is too long." }),

  service: z.enum(SERVICE_CHOICES, {
    message: "Choose the service you need.",
  }),

  siteType: z.enum(SITE_TYPES, { message: "Choose a site type." }),

  urgency: z.enum(URGENCY_OPTIONS, { message: "Choose what you need." }),

  message: z
    .string({ error: "Tell us a little about the work." })
    .trim()
    .min(10, { message: "Tell us a little about the work — at least 10 characters." })
    .max(2000, { message: "Please keep this under 2000 characters." }),

  consent: z.literal(true, {
    error: "Please confirm you agree to us using these details to reply.",
  }),

  /**
   * Honeypot. A real person never sees this field, so anything in it means the
   * submission came from a bot.
   *
   * Deliberately permissive: if the schema rejected a filled trap, the caller
   * would get a validation error naming this field, which tells a bot exactly
   * what caught it. The trap is evaluated in the route instead, and a filled
   * one is answered with an ordinary success.
   */
  website: z.string().max(500).optional(),

  // Campaign attribution and page context. Never shown to the visitor.
  utmSource: z.string().trim().max(120).optional().or(z.literal("")),
  utmMedium: z.string().trim().max(120).optional().or(z.literal("")),
  utmCampaign: z.string().trim().max(180).optional().or(z.literal("")),
  utmTerm: z.string().trim().max(180).optional().or(z.literal("")),
  utmContent: z.string().trim().max(180).optional().or(z.literal("")),
  pageUrl: z.string().trim().max(500).optional().or(z.literal("")),
  submittedAt: z.string().trim().max(40).optional().or(z.literal("")),
});

export type ContactInput = z.input<typeof contactSchema>;
export type ContactData = z.output<typeof contactSchema>;

/** Field defaults, so the form is a controlled component from first render. */
export const CONTACT_DEFAULTS: ContactInput = {
  fullName: "",
  company: "",
  phone: "",
  email: "",
  location: "",
  service: SERVICE_CHOICES[0],
  siteType: "Residential",
  urgency: "Quote",
  message: "",
  consent: false as unknown as true,
  website: "",
  utmSource: "",
  utmMedium: "",
  utmCampaign: "",
  utmTerm: "",
  utmContent: "",
  pageUrl: "",
  submittedAt: "",
};
