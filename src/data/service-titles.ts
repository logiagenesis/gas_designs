/**
 * The nine service titles, as their own module.
 *
 * WHY THIS IS SEPARATE: the contact form needs these strings in the browser to
 * populate its dropdown, but `services.ts` also carries `needsConfirmation` —
 * internal notes about claims the client has not yet confirmed. Importing the
 * full catalogue from a client component ships those notes to every visitor in
 * the JavaScript bundle. Titles are public; the notes are not.
 *
 * `services.ts` types its titles against this list, so the dropdown and the
 * catalogue cannot drift apart.
 */
export const SERVICE_TITLES = [
  "Residential Gas Installations",
  "Commercial Kitchen Gas Systems",
  "Industrial Gas Installations & Maintenance",
  "Bulk LPG Installations",
  "Custom Projects & Developments",
  "Certificates of Compliance",
  "Gas System Maintenance",
  "Gas Leak Detection & Emergency Repairs",
  "Basic Electrical & Gas System Support",
] as const;

export type ServiceTitle = (typeof SERVICE_TITLES)[number];
