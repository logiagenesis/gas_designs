/**
 * GAS DESIGNS — SERVICE CATALOGUE
 *
 * Exactly nine services. The count is enforced by `ServiceTuple` below, so
 * adding or removing one is a compile error rather than a silent layout break
 * (the homepage grid is specified as exactly 3 x 3 at 1024px and up).
 *
 * COPY RULES APPLIED HERE:
 *  - No availability claims ("24/7", "same day", "always on call").
 *  - No credential claims ("licensed", "registered", "insured", SAQCC, LPGSA).
 *  - No geographic claims — no town, suburb, province or radius is named.
 *  - No guarantees, warranties, pricing or turnaround promises.
 *  - Anything a reader could take as one of the above is listed in
 *    `needsConfirmation` and repeated in docs/missing-client-info.md.
 */

import type { ServiceTitle } from "@/data/service-titles";
export { SERVICE_TITLES } from "@/data/service-titles";

/** Icon identifiers. Each maps to a hand-drawn inline SVG in ServiceIcon.tsx. */
export type ServiceIconKey =
  | "home-valve"
  | "burner-ring"
  | "manifold"
  | "bulk-tank"
  | "blueprint"
  | "certificate"
  | "maintenance"
  | "leak-detect"
  | "circuit";

export interface Service {
  /** Display title, constrained to the shared list in service-titles.ts. */
  readonly title: ServiceTitle;
  /** URL segment under /services/. */
  readonly slug: string;
  /** Two-line card summary. */
  readonly summary: string;
  /** Exactly three compact card bullets. */
  readonly bullets: readonly [string, string, string];
  /** Longer introduction used on the service page. */
  readonly intro: string;
  /** What the work actually covers, on the service page. */
  readonly scope: readonly string[];
  readonly seoTitle: string;
  readonly seoDescription: string;
  /**
   * "confirmed" — the brief confirms this as a service category.
   * "pending"   — awaiting client confirmation; such a service is not listed.
   */
  readonly offered: "confirmed" | "pending";
  /** Specific details a reader might infer that the client must confirm. */
  readonly needsConfirmation: readonly string[];
  readonly iconKey: ServiceIconKey;
}

/** Exactly nine services — the length is part of the type. */
type ServiceTuple = readonly [
  Service,
  Service,
  Service,
  Service,
  Service,
  Service,
  Service,
  Service,
  Service,
];

export const SERVICES: ServiceTuple = [
  {
    title: "Residential Gas Installations",
    slug: "residential-gas-installations",
    summary:
      "Gas supply for homes — hobs, ovens, heaters and water heating, installed to the applicable standards.",
    bullets: ["Hobs, ovens and heaters", "Gas water heating", "Cylinder housing and pipe runs"],
    intro:
      "A domestic gas installation is a pressure system inside a living space. It is designed once, installed properly, and then left alone for years — which is exactly why the design and the first installation matter more than anything that follows.",
    scope: [
      "Appliance connections for hobs, ovens, built-in grills and space heaters.",
      "Gas water heating, including supply sizing for continuous-flow units.",
      "Cylinder positioning, restraint and housing with correct clearances and ventilation.",
      "Copper pipe runs, sleeving through structure, isolation valves and pressure testing.",
      "Documentation of the installation and handover of what the homeowner needs to know.",
    ],
    seoTitle: "Residential Gas Installations | Gas Designs",
    seoDescription:
      "Residential gas installation for hobs, ovens, heaters and gas water heating. Correct cylinder placement, pipe sizing, isolation and pressure testing.",
    offered: "confirmed",
    needsConfirmation: [
      "Whether appliances are supplied and installed, or installation only.",
      "Whether natural gas reticulation is offered as well as LPG.",
      "Any warranty period offered on workmanship.",
    ],
    iconKey: "home-valve",
  },
  {
    title: "Commercial Kitchen Gas Systems",
    slug: "commercial-kitchen-gas-systems",
    summary:
      "Gas systems for working kitchens — sized for real load, built for cleaning, inspection and service access.",
    bullets: ["Load-sized supply lines", "Bank and manifold layout", "Isolation and shut-off points"],
    intro:
      "A commercial kitchen is the hardest environment a gas installation has to survive: continuous load, heat, wash-down, and staff who need it to simply work during service. The system has to be sized for the whole appliance line-up running at once, not for the average.",
    scope: [
      "Demand calculation across the full appliance schedule, not a nominal figure.",
      "Cylinder bank or bulk supply layout, changeover arrangement and regulation.",
      "Manifold design with labelled isolation for each appliance leg.",
      "Emergency shut-off placement and clear operator labelling.",
      "Pipework routed for cleaning access, inspection and future appliance changes.",
    ],
    seoTitle: "Commercial Kitchen Gas Installation | Gas Designs",
    seoDescription:
      "Commercial kitchen gas installation and supply design. Load-sized pipework, cylinder banks, manifolds, isolation valves and emergency shut-off.",
    offered: "confirmed",
    needsConfirmation: [
      "Whether the business works on live sites during trading hours.",
      "Whether catering equipment is supplied, or connected only.",
      "Any typical project lead time.",
    ],
    iconKey: "burner-ring",
  },
  {
    title: "Industrial Gas Installations & Maintenance",
    slug: "industrial-gas-installations-maintenance",
    summary:
      "Plant and process gas installations, plus the planned maintenance that keeps them running safely.",
    bullets: ["Process and plant supply", "Planned maintenance", "System modifications"],
    intro:
      "Industrial gas work is judged on uptime and on safety records. The installation has to be documented, the isolation points have to be obvious, and the maintenance has to be planned around production rather than against it.",
    scope: [
      "Supply installations for process burners, ovens, boilers and production equipment.",
      "Distribution pipework, regulation stages and metering points.",
      "Planned preventative maintenance scheduled around production windows.",
      "Modifications and extensions to existing installations as plant changes.",
      "Isolation, purging and recommissioning procedures on shutdown work.",
    ],
    seoTitle: "Industrial Gas Installation & Maintenance | Gas Designs",
    seoDescription:
      "Industrial gas installation and maintenance for process plant, burners and production equipment. Distribution pipework, regulation and planned servicing.",
    offered: "confirmed",
    needsConfirmation: [
      "Which industrial sectors and plant types have actually been worked on.",
      "Whether industrial gas supply (N2, CO2, argon) is offered — not assumed here.",
      "Whether shutdown and turnaround work is undertaken.",
    ],
    iconKey: "manifold",
  },
  {
    title: "Bulk LPG Installations",
    slug: "bulk-lpg-installations",
    summary:
      "Bulk LPG storage and reticulation, from tank siting and separation distances through to the point of use.",
    bullets: ["Tank siting and bases", "Vaporiser and regulation", "Reticulation to point of use"],
    intro:
      "Bulk LPG moves the decision from where the cylinders go to where the tank can legally and safely stand. Separation distances, access for delivery, and the route back to the building drive the whole design.",
    scope: [
      "Site assessment for tank position, separation distances and delivery vehicle access.",
      "Tank bases, restraint and protection from vehicle impact.",
      "First and second stage regulation, and vaporiser arrangement where required.",
      "Underground or above-ground reticulation to the building and to each appliance.",
      "Contents monitoring and the isolation arrangement at the tank and at the building.",
    ],
    seoTitle: "Bulk LPG Installation | Gas Designs",
    seoDescription:
      "Bulk LPG installation covering tank siting and separation distances, regulation, vaporisers and reticulation from storage to point of use.",
    offered: "confirmed",
    needsConfirmation: [
      "Maximum bulk tank capacity the business installs.",
      "Whether tanks are supplied, or installed on a supplier's behalf.",
      "Whether gas supply and refilling is arranged, or arranged by the client.",
      "Whether tank revalidation is offered — not assumed here.",
    ],
    iconKey: "bulk-tank",
  },
  {
    title: "Custom Projects & Developments",
    slug: "custom-projects-developments",
    summary:
      "Gas design and installation for developments and one-off builds, coordinated with the rest of the trades.",
    bullets: ["Multi-unit developments", "Design coordination", "Phased installation"],
    intro:
      "On a development, the gas installation is one trade among many and it is almost never the one that sets the programme. The work is to get the routes, the risers and the meter positions agreed early, then install in the sequence the build actually follows.",
    scope: [
      "Gas design input during planning, before routes and service ducts are fixed.",
      "Multi-unit reticulation, riser design and per-unit isolation and metering.",
      "Coordination with plumbing, electrical and structural trades on penetrations and routes.",
      "Phased installation and testing that matches the construction programme.",
      "As-built documentation handed over at practical completion.",
    ],
    seoTitle: "Custom Gas Projects & Developments | Gas Designs",
    seoDescription:
      "Gas design and installation for developments and custom builds. Riser and reticulation design, trade coordination, phased installation and as-builts.",
    offered: "confirmed",
    needsConfirmation: [
      "Largest development size undertaken, once real project references exist.",
      "Whether design-only consulting is offered without installation.",
      "Whether the business works as a subcontractor to main contractors, direct to client, or both.",
    ],
    iconKey: "blueprint",
  },
  {
    title: "Certificates of Compliance",
    slug: "certificates-of-compliance",
    summary:
      "Inspection, remedial work and documentation so a gas installation can be certified as compliant.",
    bullets: ["Installation inspection", "Remedial corrections", "Certification paperwork"],
    intro:
      "A gas Certificate of Compliance records that an installation was inspected and found to meet the applicable standards on the day it was tested. It is commonly required when a property is sold, when an insurer asks for it, and after any change to an installation.",
    scope: [
      "Full inspection of the existing installation against the applicable standards.",
      "A written account of what passes, what fails, and what has to change.",
      "Remedial work to correct the failures found.",
      "Pressure and soundness testing of the corrected installation.",
      "Completion of the certification documentation and handover to the owner.",
    ],
    seoTitle: "Gas Certificate of Compliance (Gas COC) | Gas Designs",
    seoDescription:
      "Gas Certificate of Compliance support — inspection against the applicable standards, remedial corrections, soundness testing and certification paperwork.",
    offered: "confirmed",
    needsConfirmation: [
      "Who signs the certificate, and under which SAQCC Gas registration number.",
      "Which SANS standards the business wants cited by name on this page.",
      "Whether certificates are issued for installations the business did not carry out.",
      "Whether the certificate covers LPG only, or natural gas installations as well.",
    ],
    iconKey: "certificate",
  },
  {
    title: "Gas System Maintenance",
    slug: "gas-system-maintenance",
    summary:
      "Scheduled servicing and inspection that catches wear on regulators, hoses and seals before it becomes a fault.",
    bullets: ["Scheduled servicing", "Regulator and hose checks", "Soundness testing"],
    intro:
      "Most gas faults are not sudden. Regulators drift, flexible hoses perish, seals harden and joints relax. A maintenance visit exists to find those before they become a leak or an unplanned shutdown.",
    scope: [
      "Scheduled inspection of the installation, at an interval agreed with the site.",
      "Regulator performance checks and replacement when readings drift.",
      "Flexible hose, seal and joint inspection and replacement on condition.",
      "Soundness and pressure testing of the installation.",
      "A written report of what was checked, what was changed and what needs watching.",
    ],
    seoTitle: "Gas System Maintenance & Servicing | Gas Designs",
    seoDescription:
      "Planned gas maintenance and servicing. Regulator checks, hose and seal replacement, soundness testing and a written report after every visit.",
    offered: "confirmed",
    needsConfirmation: [
      "Whether maintenance contracts or service agreements are offered, and on what terms.",
      "Recommended service intervals the business wants to publish.",
      "Whether maintenance is offered on installations done by others.",
    ],
    iconKey: "maintenance",
  },
  {
    title: "Gas Leak Detection & Emergency Repairs",
    slug: "gas-leak-detection-emergency-repairs",
    summary:
      "Tracing and repairing leaks — isolate the supply, find the fault, prove the repair with a pressure test.",
    bullets: ["Leak tracing", "Isolation and make-safe", "Verified pressure testing"],
    intro:
      "A suspected gas leak is handled in a fixed order: make the installation safe first, then find the fault, then prove the repair. Guessing at the source before the supply is isolated is how small problems become incidents.",
    scope: [
      "Isolating the supply and making the installation safe on arrival.",
      "Systematic leak tracing across joints, appliances, hoses and buried runs.",
      "Repair or replacement of the failed section, joint or component.",
      "Pressure and soundness testing to prove the installation holds after repair.",
      "A record of what failed and why, so the same fault can be designed out.",
    ],
    seoTitle: "Gas Leak Detection & Repairs | Gas Designs",
    seoDescription:
      "Gas leak detection and repair. Supply isolation and make-safe, systematic leak tracing, component repair and verified pressure testing.",
    offered: "confirmed",
    needsConfirmation: [
      "Actual callout availability and hours — no after-hours or 24/7 claim is made on this site.",
      "Whether a response time may be published, and what it honestly is.",
      "Whether callouts are accepted for installations done by others.",
      "Which emergency number should be published once the phone line is confirmed.",
    ],
    iconKey: "leak-detect",
  },
  {
    title: "Basic Electrical & Gas System Support",
    slug: "basic-electrical-gas-system-support",
    summary:
      "The electrical work a gas installation depends on — ignition, controls, interlocks and detection wiring.",
    bullets: ["Ignition and controls", "Detection and interlocks", "Appliance power supply"],
    intro:
      "Modern gas equipment rarely runs on gas alone. Ignition, fans, solenoid valves, gas detection and interlocks all need power and controls, and a gas fault is often actually an electrical one.",
    scope: [
      "Power supply and connection for gas appliances that need it.",
      "Ignition systems, flame supervision devices and control wiring.",
      "Gas detection heads wired to solenoid valves and shut-off interlocks.",
      "Fault finding where an apparent gas problem is an electrical or control fault.",
      "Coordination with the site's electrical contractor where work falls outside this scope.",
    ],
    seoTitle: "Gas Controls & Basic Electrical Support | Gas Designs",
    seoDescription:
      "Basic electrical support for gas systems — ignition, flame supervision, control wiring, gas detection interlocks and appliance power supply.",
    offered: "confirmed",
    needsConfirmation: [
      "The exact boundary of electrical work undertaken, and where a registered electrician is required.",
      "Whether an electrical Certificate of Compliance can be issued — not claimed on this site.",
      "Whether gas detection systems are supplied as well as wired.",
    ],
    iconKey: "circuit",
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
