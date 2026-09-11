# Copywriter Pack

All copy on this site is original, written from the nine service categories in
the brief. No DP Energies content was ever fetched (see
`docs/dp-energies-difference-audit.md`), so there was no source text for anything
to be adapted from.

Voice rules are in `docs/content-strategy.md` §2.

---

## 1. Homepage

**Eyebrow** · Gas installation & compliance

**H1** · Precision Gas Systems. / **Built for Safety.**
*(second line in signal yellow)*

**Sub** · Gas installations, maintenance, leak detection and compliance support
for residential, commercial and industrial sites.

**CTAs** · `Request a Quote` (primary) · `View Services` (secondary)

**Under the CTA panel** · Residential · Commercial · Industrial · Developments

### Scope strip

| Label | Value |
| --- | --- |
| Sectors | Residential · Commercial · Industrial |
| Work | Installation · Maintenance · Compliance |
| Service lines | Nine, from domestic hobs to bulk LPG |
| Enquiries | Answered by email, direct |

No statistics, no years-in-business, no client count — none is confirmed.

### Services section

**Label** · What we do
**H2** · Nine service lines, one discipline.
**Intro** · From a single hob to a bulk tank and a plant room. The scale changes;
sizing the supply for the real load, making isolation obvious and proving the
installation holds does not.

### Sectors section

**Label** · Sectors
**H2** · Where the work happens.
**Intro** · Different buildings, different duty cycles, the same requirement: a
system that is safe cold, safe under load, and safe to isolate in a hurry.

- **Homes** — Hobs, ovens, heaters and gas water heating, with the cylinder where
  it is supposed to be rather than where it fits.
- **Kitchens and hospitality** — Supply sized for the whole line running at once,
  with isolation an operator can find and reach mid-service.
- **Industry and plant** — Process burners, ovens and production equipment, with
  maintenance planned around production rather than against it.
- **Developments** — Risers, reticulation and per-unit isolation, agreed early
  enough to actually influence the routes.

### Process section

**Label** · How it runs
**H2** · From enquiry to documented handover.
**Intro** · Five stages. The quote follows the site visit rather than preceding
it, because a price given before anyone has looked at the routes is a guess.

1. **Enquiry** — Tell us the appliances, the site and what is already installed.
   Photographs of the existing setup save a visit.
2. **Site assessment** — We look at routes, ventilation, clearances and where the
   gas has to stand. Anything beyond an appliance swap is quoted after this, not
   before.
3. **Design and quote** — Supply sized for the full load, isolation planned, and
   a written scope that says what is included and what is not.
4. **Installation** — Pipework run, appliances connected, isolation and shut-off
   fitted where they can actually be reached in a hurry.
5. **Test and hand over** — Pressure and soundness testing, then documentation
   and a walk-through of how to isolate the installation.

### Safety and compliance section

**Label** · Safety and compliance
**H2** · A passing test is a flat line.
**Intro** · Gas work is judged on what happens after everyone leaves. That is why
the installation is pressure tested and the result recorded, rather than simply
being declared sound.

- Supply sized for the full connected load, not a nominal figure.
- Isolation and shut-off placed where they can be reached under pressure.
- Pressure and soundness testing before handover, with the result written down.
- Documentation handed over, so the next person knows what is actually installed.

**Standards note** · Gas work in South Africa sits under the Pressure Equipment
Regulations made under the Occupational Health and Safety Act, and the applicable
SANS standards for the installation type. Ask us which apply to yours.

**Visual caption** · Soundness test — charge, then hold
**Caption body** · An installation is charged to test pressure and then watched.
If the line drops, there is a leak to find. This is an illustration of the
method, not a photograph of a job.

### Contact section

**Label** · Get in touch
**H2** · Tell us what you need running.
**Intro** · The more you can say about the appliances and the site, the more
useful the first reply will be.

---

## 2. FAQ

**H2** · The ones we are asked most.

**Q · What is a gas Certificate of Compliance?**
It is a document recording that a gas installation was inspected and found to
meet the applicable standards on the day it was tested. It covers the
installation itself — the pipework, the connections, the isolation and the
appliances as they are installed — rather than the appliances as products.

**Q · When is a Certificate of Compliance usually needed?**
Most commonly when a property changes hands, when an insurer asks for one, and
after any new installation or change to an existing one. If you have altered an
installation, added an appliance or moved a cylinder, the existing certificate no
longer describes what is actually there.

**Q · What should I do if I smell gas?**
Close the cylinder or main isolation valve, open doors and windows, and leave the
area ventilated. Do not operate electrical switches, appliances or anything that
could create a spark, and do not try to trace the leak yourself. Once the supply
is isolated and the space is ventilated, call a gas installer to find and repair
the fault.

**Q · How often should a gas installation be inspected?**
It depends on how hard the installation works. A domestic hob is a different
proposition from a commercial kitchen running every service. We agree an
inspection interval with you based on the installation and its duty, and a
certificate is in any case re-issued after changes to the installation.

**Q · Do you work on homes as well as commercial and industrial sites?**
Yes. The work spans residential installations, commercial kitchen systems,
industrial plant, bulk LPG and developments. The engineering discipline is the
same in each case — size the supply for the real load, make isolation obvious,
and prove the installation holds pressure before it is handed over.

**Q · What do you need from me to quote?**
The appliances you want to run, where the gas has to get to, and what is already
installed if anything. Photographs of the existing setup and the appliance data
plates help. For anything beyond a straightforward appliance swap, the quote
follows a site visit rather than preceding it.

---

## 3. Service pages

Each follows the same shape: intro → what the work covers → a caveat → an enquiry
form pre-set to that service. Full body copy lives in `src/data/services.ts`.

**Shared caveat, on every service page**
*Before you book* — This page describes the work, not a quotation. Scope,
materials and access vary from site to site, so the detail gets confirmed after a
look at the installation.

### Card summaries and intro openings

| Service | Card summary | Intro opens |
| --- | --- | --- |
| Residential Gas Installations | Gas supply for homes — hobs, ovens, heaters and water heating, installed to the applicable standards. | "A domestic gas installation is a pressure system inside a living space…" |
| Commercial Kitchen Gas Systems | Gas systems for working kitchens — sized for real load, built for cleaning, inspection and service access. | "A commercial kitchen is the hardest environment a gas installation has to survive…" |
| Industrial Gas Installations & Maintenance | Plant and process gas installations, plus the planned maintenance that keeps them running safely. | "Industrial gas work is judged on uptime and on safety records…" |
| Bulk LPG Installations | Bulk LPG storage and reticulation, from tank siting and separation distances through to the point of use. | "Bulk LPG moves the decision from where the cylinders go to where the tank can legally and safely stand…" |
| Custom Projects & Developments | Gas design and installation for developments and one-off builds, coordinated with the rest of the trades. | "On a development, the gas installation is one trade among many…" |
| Certificates of Compliance | Inspection, remedial work and documentation so a gas installation can be certified as compliant. | "A gas Certificate of Compliance records that an installation was inspected…" |
| Gas System Maintenance | Scheduled servicing and inspection that catches wear on regulators, hoses and seals before it becomes a fault. | "Most gas faults are not sudden…" |
| Gas Leak Detection & Emergency Repairs | Tracing and repairing leaks — isolate the supply, find the fault, prove the repair with a pressure test. | "A suspected gas leak is handled in a fixed order…" |
| Basic Electrical & Gas System Support | The electrical work a gas installation depends on — ignition, controls, interlocks and detection wiring. | "Modern gas equipment rarely runs on gas alone…" |

---

## 4. About

**H1** · Gas work, done so the next person can follow it.
**Intro** · Gas Designs designs, installs and maintains gas systems for homes,
commercial kitchens, industrial plant and developments. The work is judged on
what happens after everyone has left the site.

**What we will not do**
- Quote a price for work nobody has looked at, beyond a like-for-like appliance swap.
- Sign off an installation that has not held a pressure test.
- Leave a site without telling you how to isolate the gas.
- Take on work that belongs to another trade without saying so.

---

## 5. Contact

**H1** · Tell us about the installation.
**Intro** · Quotes, inspections, maintenance and leak callouts all start the same
way: what needs to run, where it is, and what is already there.

**Safety panel** · *If you smell gas* — Close the cylinder or main isolation
valve, open doors and windows, and keep the area ventilated. Do not operate
electrical switches or anything that could spark. Contact us once the supply is
isolated — not before.

**Consent** · I agree that Gas Designs may use the details above to respond to
this enquiry, in line with the Privacy Policy.

**Submit** · `Send enquiry` → while sending: `Sending…`
**Under submit** · We reply by email to the address you give us.

### Confirmation page — `/contact/sent`

**H1** · Enquiry sent.
**Body** · Thanks — it is with us. We reply by email to the address you gave, so
keep an eye on that inbox and its spam folder.
*(the valve lever completes its quarter turn on arrival)*

### Error states

| Case | Message shown |
| --- | --- |
| Field invalid | Specific, per field: "Enter your full name." · "Tell us the suburb or town the work is in." |
| Rate limited | Too many messages from this connection. Please try again shortly. |
| Send failed | We could not send your message just now. Please email us directly and we will pick it up. |
| Network failure | We could not reach the server. Please check your connection and try again. |

No error message ever names an environment variable, a host or a credential.

---

## 6. 404

**H1** · This line is closed.
**Body** · The page you asked for is not here. It may have moved, or the address
may have a typo in it.
*(the valve lever is drawn shut)*

---

## 7. CTA copy

| Context | Label |
| --- | --- |
| Header, hero, CTA band | Request a Quote |
| Hero secondary | View Services |
| Service card | View service |
| Form submit | Send enquiry |
| Confirmation | Browse services · Back to home |

`Book Free Inspection` is **banned** — it is a DP Energies CTA and it promises a
free inspection nobody has confirmed.

---

## 8. Meta titles and descriptions

| Route | Title | Description |
| --- | --- | --- |
| `/` | Gas Designs \| Precision Gas Systems. Built for Safety. | Gas Designs delivers gas installations, maintenance, leak detection and compliance support for residential, commercial and industrial sites across South Africa. |
| `/services` | Gas Installation Services \| Gas Designs | Gas installation, maintenance, leak detection and compliance services for residential, commercial and industrial sites — nine service lines from domestic hobs to bulk LPG. |
| `/about` | About \| Gas Designs | Gas Designs designs, installs and maintains gas systems for residential, commercial and industrial sites, with compliance treated as part of the work rather than an afterthought. |
| `/contact` | Contact \| Gas Designs | Request a quote, an inspection or a maintenance visit for a residential, commercial or industrial gas installation. |
| `/contact/sent` | Enquiry sent \| Gas Designs | Your enquiry has been sent to Gas Designs. *(noindex)* |
| `/privacy-policy` | Privacy Policy \| Gas Designs | How Gas Designs handles the personal information submitted through this website, in line with South Africa's Protection of Personal Information Act. |
| `/terms` | Terms \| Gas Designs | The terms that apply to using the Gas Designs website, and what the information published on it does and does not amount to. |

### Service pages

| Route | Title | Description |
| --- | --- | --- |
| `/services/residential-gas-installations` | Residential Gas Installations \| Gas Designs | Residential gas installation for hobs, ovens, heaters and gas water heating. Correct cylinder placement, pipe sizing, isolation and pressure testing. |
| `/services/commercial-kitchen-gas-systems` | Commercial Kitchen Gas Installation \| Gas Designs | Commercial kitchen gas installation and supply design. Load-sized pipework, cylinder banks, manifolds, isolation valves and emergency shut-off. |
| `/services/industrial-gas-installations-maintenance` | Industrial Gas Installation & Maintenance \| Gas Designs | Industrial gas installation and maintenance for process plant, burners and production equipment. Distribution pipework, regulation and planned servicing. |
| `/services/bulk-lpg-installations` | Bulk LPG Installation \| Gas Designs | Bulk LPG installation covering tank siting and separation distances, regulation, vaporisers and reticulation from storage to point of use. |
| `/services/custom-projects-developments` | Custom Gas Projects & Developments \| Gas Designs | Gas design and installation for developments and custom builds. Riser and reticulation design, trade coordination, phased installation and as-builts. |
| `/services/certificates-of-compliance` | Gas Certificate of Compliance (Gas COC) \| Gas Designs | Gas Certificate of Compliance support — inspection against the applicable standards, remedial corrections, soundness testing and certification paperwork. |
| `/services/gas-system-maintenance` | Gas System Maintenance & Servicing \| Gas Designs | Planned gas maintenance and servicing. Regulator checks, hose and seal replacement, soundness testing and a written report after every visit. |
| `/services/gas-leak-detection-emergency-repairs` | Gas Leak Detection & Repairs \| Gas Designs | Gas leak detection and repair. Supply isolation and make-safe, systematic leak tracing, component repair and verified pressure testing. |
| `/services/basic-electrical-gas-system-support` | Gas Controls & Basic Electrical Support \| Gas Designs | Basic electrical support for gas systems — ignition, flame supervision, control wiring, gas detection interlocks and appliance power supply. |

---

## 9. Claims that need Pierre's confirmation

These are **live on the site**. Each describes standard good practice and is
written as a description of method rather than a guarantee — but each is a
statement about how Gas Designs works, so Pierre should confirm every one is
accurate, or say what to change.

| # | Claim on the site | Where |
| --- | --- | --- |
| 1 | "Every installation is pressure tested before it is handed over, and what was tested is written down." | About, homepage safety section |
| 2 | "Supply sized for the full connected load, not a nominal figure." | Homepage safety section |
| 3 | "Documentation handed over, so the next person knows what is actually installed." | Homepage safety section |
| 4 | "A written report of what was checked, what was changed and what needs watching." | Gas System Maintenance |
| 5 | "The quote follows the site visit rather than preceding it." | Homepage process, About |
| 6 | "We agree an inspection interval with you based on the installation and its duty." | FAQ |
| 7 | "As-built documentation handed over at practical completion." | Custom Projects & Developments |
| 8 | "A record of what failed and why, so the same fault can be designed out." | Gas Leak Detection |
| 9 | "Enquiries answered by email, direct." | Homepage scope strip |
| 10 | "We reply by email to the address you give us." | Contact form |
| 11 | The four "what we will not do" commitments | About |

**If any is not accurate, it must be removed or rewritten before launch.** They
are the site's substitute for credentials, which makes them the load-bearing
claims on the whole thing.

---

## 10. Open questions for the client

Grouped as the brief requires. Full detail in `docs/missing-client-info.md`.

1. **Legal / trading name lock** — is it exactly "Gas Designs"? Is there a
   registered entity, and should the registration number be published?
2. **Confirm or retire the shared phone number** — `+27 61 039 7034` is withheld
   because the brief records it as shared with DP Energies. Owned outright, or is
   a new number being obtained? *(Highest priority.)*
3. **Service area** — which city or region, how far out, any callout radius?
   *(Blocks all local SEO.)*
4. **24/7 — yes or no?** Only publishable if literally true. What are the real
   hours, and is there genuine after-hours cover?
5. **SAQCC / LPGSA numbers** — registration number, in whose name, which
   categories. Nothing is claimed until these exist.
6. **Install-only or supply-and-install?**
7. **Natural gas scope** — is natural gas reticulation offered, or LPG only?
8. **LPG scope** — domestic and commercial both?
9. **Bulk LPG scope** — maximum tank capacity; are tanks supplied or installed on
   a supplier's behalf; is refilling arranged?
10. **Industrial gas supply — yes or no?** Not assumed anywhere on the site.
11. **N₂ / CO₂ / argon — yes or no?** Not assumed anywhere on the site.
12. **Tank revalidation — yes or no?** Not assumed anywhere on the site.
13. **Real project photos — yes or no?** With client permission to publish?
14. **Google Business Profile link** — does one exist, or should it be created?

Plus, from the build:

15. **Which SANS standards should be cited by name?** The site currently refers to
    "the applicable SANS standards" without a number, because no source could be
    fetched to confirm the correct citation.
16. **Who signs a Certificate of Compliance, and under which registration?**
17. **Where does the electrical scope end and a registered electrician's begin?**
18. **Is there a workmanship warranty**, and for how long?
