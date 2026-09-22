# AUDIT.md — Gas Designs, Phase A

**Ref:** LI-PROMPT-GASDESIGNS-0926 · **Date:** 2026-09-22
**Status:** Phase A complete. Nothing has been changed. Awaiting the word **"proceed"** before Phase B.

---

## 0. Three discrepancies between the brief and the repository

These are stated up front because two of them change what Phase B means.

### 0.1 Repo and branch names do not match
| Brief says | Actual |
| --- | --- |
| `logiagenesis/gasdesigns` | `logiagenesis/gas_designs` |
| branch `claude/vibrant-knuth-s24qio` | branch `claude/tender-cori-3p8u59` |

The rejected phrases quoted in §1 of the brief ("A passing test is a flat line.", "Answered by email, direct", etc.) are **verbatim strings from this repository**, so this is definitely the build being reviewed. Work continues here.

### 0.2 The stack is not static HTML — this needs a decision
The brief states: *"Stack is static HTML, CSS, vanilla JS (Vite if a build step already exists). Do not introduce React, Tailwind, or any framework."*

**The repository is already Next.js 15 + React 19 + Tailwind CSS v4.** There are zero hand-written HTML files. React and Tailwind are not being *introduced* — they are what the site is built from.

Two readings, and they are very different jobs:

| Reading | What Phase B becomes | Cost | What is lost |
| --- | --- | --- | --- |
| **A. Rebuild the presentation layer inside the existing Next.js app** | Rewrite every page, component, and all copy. Delete all illustrations. New layout, new type scale, photo slots. | Large but contained | Nothing |
| **B. Convert to static HTML/CSS/vanilla JS** | Everything in A, plus discarding and re-implementing: the contact form (validation both sides, honeypot, rate limit, SMTP), all SEO metadata, JSON-LD, sitemap, robots, routing for 9 service pages, and the GitHub Pages deploy. | Roughly double | A working, tested contact pipeline and SEO layer |

**Recommendation: A.** The rule "do not introduce React or Tailwind" is satisfied either way, because nothing new is introduced. Everything the brief actually asks for in §3 — layout, copy, palette, typography, contrast, image slots, schema, GTM, Lighthouse targets — is achievable in the existing stack without a rewrite of the plumbing.

**If B is genuinely wanted, say so with "proceed B" and I will do it** — but it throws away working code to satisfy a description of the stack that was never accurate.

### 0.3 The repository is public and exposes client information
`logiagenesis/gas_designs` is **public**. Currently readable by anyone:

| File | What it exposes |
| --- | --- |
| `docs/missing-client-info.md` | Pierre's candidate phone number; the statement that it is *"currently shared with DP Energies"*; a list of every credential not held (no SAQCC number, no LPGSA, no insurance, no registration) |
| `docs/dp-energies-difference-audit.md` | The competitor named throughout |
| `docs/self-audit-02-post-build.md` | "Eleven defects were found" |

These were written as internal working notes. On a public repo for a gas company they are damaging. **Recommend making the repo private, or deleting these three files.** Flagged, not actioned — it is not my call.

---

## 1. File and page inventory

87 tracked files. `package-lock.json` excluded from the table.

### 1.1 Pages (routes)
All routes are React components, not HTML files. Twelve route files produce 18 rendered pages (nine of them from one dynamic template).

| Route | Source file | KB | Rendered pages |
| --- | --- | --- | --- |
| `/` | `src/app/page.tsx` | 7.8 | 1 |
| `/services` | `src/app/services/page.tsx` | 2.4 | 1 |
| `/services/[slug]` | `src/app/services/[slug]/page.tsx` | 6.0 | 9 |
| `/about` | `src/app/about/page.tsx` | 4.6 | 1 |
| `/contact` | `src/app/contact/page.tsx` | 2.9 | 1 |
| `/contact/sent` | `src/app/contact/sent/page.tsx` | 1.9 | 1 |
| `/privacy-policy` | `src/app/privacy-policy/page.tsx` | 7.0 | 1 |
| `/terms` | `src/app/terms/page.tsx` | 4.7 | 1 |
| 404 | `src/app/not-found.tsx` | 2.7 | 1 |
| `/robots.txt` | `src/app/robots.ts` | 0.9 | generated |
| `/sitemap.xml` | `src/app/sitemap.ts` | 1.2 | generated |
| `/api/contact` | `src/app/api/contact/route.ts` | 3.4 | endpoint |
| (layout) | `src/app/layout.tsx` | 2.9 | wraps all |

### 1.2 CSS and JS
| File | KB | Note |
| --- | --- | --- |
| `src/app/globals.css` | 8.0 | The only stylesheet. Design tokens, type scale, card tilt/glass effects |
| `src/lib/*.ts` (6 files) | 21.6 | analytics, metadata, rate-limit, site-config, email, validation |
| `src/data/*.ts` (4 files) | 20.6 | services, faqs, service-titles, service-view |
| `src/components/*.tsx` (22 files) | 67.0 | see §2 for the illustration components |
| `scripts/*.mjs` (5 files) | 23.7 | Logo/OG/icon generators — **obsolete under the brief**, see §2.3 |
| `next.config.ts`, `postcss.config.mjs`, `eslint.config.mjs`, `tsconfig.json` | 3.0 | config |

### 1.3 Images and SVG assets
| File | KB | Verdict |
| --- | --- | --- |
| `public/brand/gas-designs-logo-full.svg` | 2.0 | **DELETE** — not the approved brand asset (§1.4 of brief) |
| `public/brand/gas-designs-logo-light.svg` | 2.0 | **DELETE** — same |
| `public/brand/gas-designs-logo-dark.svg` | 2.0 | **DELETE** — same |
| `public/brand/gas-designs-logo-mark.svg` | 0.4 | **DELETE** — same |
| `public/brand/favicon.svg` | 0.5 | **DELETE** — derived from the unapproved logo |
| `src/app/icon.svg` | 0.5 | **DELETE** — derived from the unapproved logo |
| `src/app/favicon.ico` | 0.8 | **DELETE** — derived from the unapproved logo |
| `src/app/apple-icon.png` | 4.8 | **DELETE** — derived from the unapproved logo |
| `public/og.png` | 32.2 | **DELETE** — drawn art, replaced by `og-image.jpg` |
| `public/file.svg` | 0.3 | **DELETE** — unused `create-next-app` scaffold leftover |
| `public/globe.svg` | 1.0 | **DELETE** — unused scaffold leftover |
| `public/next.svg` | 1.3 | **DELETE** — unused scaffold leftover |
| `public/vercel.svg` | 0.1 | **DELETE** — unused scaffold leftover, currently serving a Vercel logo on the live preview |
| `public/window.svg` | 0.3 | **DELETE** — unused scaffold leftover |

**There is not one photograph in the repository.** Every visual is drawn vector.

---

## 2. Inline SVG illustrations — all to be removed

Eleven inline `<svg>` blocks across ten files, 99 drawing primitives in total.

| File | Line | What it draws | Primitives | Verdict |
| --- | --- | --- | --- | --- |
| `src/components/HeroScene.tsx` | 18 | The hero "G with pipe and gauge" scene — valve ring, supply pipe, riser, isolation valve, flow line, gauge, reflective floor, measurement ticks | 24 | **DELETE FILE** |
| `src/components/StandardsVisual.tsx` | 52 | The "soundness test" gauge-and-graph card — dial, ticks, needle, pressure trace, hold band | 13 | **DELETE FILE** |
| `src/components/ServiceIcon.tsx` | 191 | All nine hand-drawn service icons | 43 | **DELETE FILE** |
| `src/components/Logo.tsx` | 37 | The valve-mark logo + outlined `GASDESIGNS` wordmark | 2 | **DELETE FILE** |
| `src/components/SentConfirmation.tsx` | 19 | Valve completing a quarter turn on the thank-you page | 3 | **DELETE FILE** |
| `src/app/not-found.tsx` | 10 | Valve drawn shut, for the 404 | 3 | **REWRITE** — strip the SVG, keep the page |
| `src/components/Hero.tsx` | 153 | `LeverArrow` — CTA arrow drawn as a miniature lever | 2 | **REWRITE** — remove ornament |
| `src/components/ServiceCard.tsx` | 123, 136 | "View service" arrow + lever-shaped list bullets | 4 | **REWRITE** — remove ornaments |
| `src/components/Faq.tsx` | 20 | Plus/close toggle glyph, 24px | 1 | **KEEP** — UI icon under 32px, allowed by §4.3 |
| `src/components/Header.tsx` | 160 | Mobile menu hamburger/close, 24px | 4 | **KEEP** — UI icon under 32px, allowed by §4.3 |

### 2.3 Obsolete generators
`scripts/brand-geometry.mjs`, `brand-type.mjs`, `build-brand.mjs`, `generate-og.mjs`, `generate-icons.mjs` (23.7 KB) exist solely to generate the rejected logo, favicon and OG art. **DELETE all five** plus the `generate:og` npm script.

### 2.4 Also to be removed
`globals.css` carries the decorative machinery the brief bans in §3.3: `.gd-tilt-fold` (glass sheen), `.gd-tilt-edge` (cursor-tracked specular border), `.reflect-floor` (reflective floor plane), `.gd-flow` (animated stroke-dash), `@keyframes gd-quarter-turn`. The `.gd-tilt` lift itself may stay — §3.1 permits "a restrained hover lift/tilt".

---

## 3. Every text string, with verdict

Verdict key: **KEEP** · **REWRITE** · **DELETE**.
The client's instruction is that every word is rewritten, so almost nothing is KEEP. Strings marked KEEP are functional UI labels or the client's own service names.

### 3.1 Global — header and footer (every page)

| Location | Current text | Verdict |
| --- | --- | --- |
| Header nav | Services · About · Contact | KEEP |
| Header CTA | Request a Quote | KEEP — brief §3.1 specifies this label |
| Header logo | Drawn `GASDESIGNS` wordmark | DELETE — replace with supplied logo file |
| Skip link | Skip to content | KEEP |
| Footer strapline | "Precision Gas Systems. Built for Safety. Gas installations, maintenance, leak detection and compliance support for residential, commercial and industrial sites." | REWRITE — brief §6 supplies the replacement |
| Footer col heading | Services | KEEP |
| Footer col heading | Company | KEEP |
| Footer legal | © 2025 Gas Designs. All rights reserved. | REWRITE — year must be current |
| Footer right | "Gas work carried out to the applicable South African standards." | REWRITE |
| Footer | *(no Logi-Ink credit exists)* | ADD — brief §3.1 requires "Website by Logi-Ink" → logi-ink.co.za |
| Footer | WhatsApp | DELETE — hidden, no number confirmed |

### 3.2 Homepage `/`

| Location | Current text | Verdict |
| --- | --- | --- |
| Hero label | Gas installation & compliance | REWRITE → §6: "GAS INSTALLATION · MAINTENANCE · COMPLIANCE" |
| Hero H1 | **Precision Gas Systems. / Built for Safety.** | REWRITE → §6: "Gas installations done properly, tested and certified." |
| Hero sub | "Gas installations, maintenance, leak detection and compliance support for residential, commercial and industrial sites." | REWRITE → §6 version |
| Hero buttons | Request a Quote · View Services | KEEP |
| Hero under-buttons | Residential · Commercial · Industrial · Developments | KEEP — matches §6 |
| Hero scene | *(the drawn valve illustration)* | DELETE → `hero.jpg` |
| Trust strip | Sectors / Residential · Commercial · Industrial | DELETE — brief §3.1: remove this strip entirely |
| Trust strip | Work / Installation · Maintenance · Compliance | DELETE |
| Trust strip | Service lines / **"Nine, from domestic hobs to bulk LPG"** | DELETE — explicitly rejected in §1.2 |
| Trust strip | Enquiries / **"Answered by email, direct"** | DELETE — explicitly rejected in §1.2 |
| Services label | What we do | KEEP — matches §6 |
| Services H2 | **"Nine service lines, one discipline."** | REWRITE → §6: "What we do" + supplied sub |
| Services intro | "From a single hob to a bulk tank and a plant room. The scale changes; sizing the supply for the real load, making isolation obvious and proving the installation holds does not." | REWRITE → §6 version |
| Sectors label | Sectors | DELETE — section not in the §3.1 structure |
| Sectors H2 | "Where the work happens." | DELETE |
| Sectors intro | "Different buildings, different duty cycles, the same requirement: a system that is safe cold, safe under load, and safe to isolate in a hurry." | DELETE |
| Sectors tile | Homes / "Hobs, ovens, heaters and gas water heating, with the cylinder where it is supposed to be rather than where it fits." | DELETE |
| Sectors tile | Kitchens and hospitality / "Supply sized for the whole line running at once, with isolation an operator can find and reach mid-service." | DELETE |
| Sectors tile | Industry and plant / "Process burners, ovens and production equipment, with maintenance planned around production rather than against it." | DELETE |
| Sectors tile | Developments / "Risers, reticulation and per-unit isolation, agreed early enough to actually influence the routes." | DELETE |
| Process label | How it runs | DELETE — section not in the §3.1 structure |
| Process H2 | "From enquiry to documented handover." | DELETE |
| Process intro | "Five stages. The quote follows the site visit rather than preceding it, because a price given before anyone has looked at the routes is a guess." | DELETE |
| Process 01 | Enquiry / "Tell us the appliances, the site and what is already installed. Photographs of the existing setup save a visit." | DELETE |
| Process 02 | Site assessment / "We look at routes, ventilation, clearances and where the gas has to stand. **Anything beyond an appliance swap is quoted after this, not before.**" | DELETE — Pierre's note 2: *"Haal uit 'anything beyond appliance swap'"* |
| Process 03 | Design and quote / "Supply sized for the full load, isolation planned, and a written scope that says what is included and what is not." | DELETE |
| Process 04 | Installation / "Pipework run, appliances connected, isolation and shut-off fitted where they can actually be reached in a hurry." | DELETE |
| Process 05 | Test and hand over / "Pressure and soundness testing, then documentation and a walk-through of how to isolate the installation." | DELETE |
| Safety label | Safety and compliance | REWRITE → §6 compliance block |
| Safety H2 | **"A passing test is a flat line."** | REWRITE — explicitly rejected in §1.2 → "Every installation is tested and certified." |
| Safety intro | **"Gas work is judged on what happens after everyone leaves."** … | REWRITE — explicitly rejected in §1.2 → §6 body |
| Safety bullet | "Supply sized for the full connected load, not a nominal figure." | REWRITE → §6 bullet |
| Safety bullet | "Isolation and shut-off placed where they can be reached under pressure." | REWRITE → §6 bullet |
| Safety bullet | "Pressure and soundness testing before handover, with the result written down." | REWRITE → §6 bullet |
| Safety bullet | "Documentation handed over, so the next person knows what is actually installed." | REWRITE → §6 bullet |
| Safety footnote | "Gas work in South Africa sits under the Pressure Equipment Regulations made under the Occupational Health and Safety Act, and the applicable SANS standards for the installation type. Ask us which apply to yours." | REWRITE → §6 footnote incl. `[CLIENT TO CONFIRM]` registration |
| Safety caption | "Soundness test — charge, then hold" | DELETE |
| Safety caption body | **"…This is an illustration of the method, not a photograph of a job."** | DELETE — explicitly rejected in §1.2 |
| FAQ label | Questions | KEEP or DELETE — FAQ is not in the §3.1 structure; see §7 open question |
| FAQ H2 | "The ones we are asked most." | REWRITE |
| FAQ Q1 | "What is a gas Certificate of Compliance?" + answer | REWRITE — also note: brief §3.1 says **Certificate of Conformity**, repo says Certificate of Compliance. See §7 |
| FAQ Q2 | "When is a Certificate of Compliance usually needed?" + answer | REWRITE |
| FAQ Q3 | "What should I do if I smell gas?" + answer | REWRITE |
| FAQ Q4 | "How often should a gas installation be inspected?" + answer | REWRITE |
| FAQ Q5 | "Do you work on homes as well as commercial and industrial sites?" + answer | REWRITE |
| FAQ Q6 | "What do you need from me to quote?" + answer | REWRITE |
| Contact label | Get in touch | REWRITE → §6: "Request a quote" |
| Contact H2 | "Tell us what you need running." | REWRITE → §6 version |
| Contact intro | "The more you can say about the appliances and the site, the more useful the first reply will be." | REWRITE → §6 version |
| Contact | Email / pierre@gasdesigns.co.za | KEEP — only confirmed contact detail |
| Contact | "Prefer a full page? Open the contact page" | DELETE |

### 3.3 `/services`

| Location | Current text | Verdict |
| --- | --- | --- |
| Breadcrumb | Home / Services | KEEP |
| Label | Services | KEEP |
| H1 | "Gas installation, maintenance and compliance." | REWRITE |
| Intro | "Nine service lines. Each one is the same engineering problem at a different scale: get the right volume of gas to the right place safely, make it obvious how to shut it off, and prove it holds." | REWRITE → §6 services sub |
| CTA band H2 | "Tell us what you need running." | REWRITE |
| CTA band body | "Send the appliances, the site and anything already installed. We will come back to you by email." | REWRITE |

### 3.4 Service cards and the nine service pages

Every card carries: title (KEEP), two-line summary (REWRITE), three bullets (REWRITE), "View service" link (REWRITE → §3.1 requires **"Ask about this"**, linking to the form with the service pre-selected).

Each service page carries: H1 (KEEP — client's name), `intro` paragraph (REWRITE), 5 × `scope` bullets (REWRITE), "Before you book" caveat (DELETE), sidebar "Ask about this service" + "The form is pre-set to …" (REWRITE), "Related services" heading (REWRITE).

That is **9 summaries + 27 card bullets + 9 intros + 45 scope bullets = 90 strings to rewrite**, plus 9 `seoTitle` and 9 `seoDescription` (REWRITE). Full current text is in `src/data/services.ts` (16.2 KB).

Sample of what goes, one per service:

| Service | Current summary | Verdict |
| --- | --- | --- |
| Residential Gas Installations | "Gas supply for homes — hobs, ovens, heaters and water heating, installed to the applicable standards." | REWRITE |
| Commercial Kitchen Gas Systems | "Gas systems for working kitchens — sized for real load, built for cleaning, inspection and service access." | REWRITE |
| Industrial Gas Installations & Maintenance | "Plant and process gas installations, plus the planned maintenance that keeps them running safely." | REWRITE |
| Bulk LPG Installations | "Bulk LPG storage and reticulation, from tank siting and separation distances through to the point of use." | REWRITE |
| Custom Projects & Developments | "Gas design and installation for developments and one-off builds, coordinated with the rest of the trades." | REWRITE |
| Certificates of Compliance | "Inspection, remedial work and documentation so a gas installation can be certified as compliant." | REWRITE |
| Gas System Maintenance | "Scheduled servicing and inspection that catches wear on regulators, hoses and seals before it becomes a fault." | REWRITE |
| Gas Leak Detection & Emergency Repairs | "Tracing and repairing leaks — isolate the supply, find the fault, prove the repair with a pressure test." | REWRITE |
| Basic Electrical & Gas System Support | "The electrical work a gas installation depends on — ignition, controls, interlocks and detection wiring." | REWRITE |

### 3.5 `/about`

| Location | Current text | Verdict |
| --- | --- | --- |
| H1 | "Gas work, done so the next person can follow it." | REWRITE → §6: "About Gas Designs" |
| Intro | "Gas Designs designs, installs and maintains gas systems for homes, commercial kitchens, industrial plant and developments. The work is judged on what happens after everyone has left the site." | REWRITE → §6 body |
| H2 | "How we work" + 3 paragraphs ("Most gas problems are design problems that only show up later…") | DELETE — first person, opinion, over 60 words |
| H2 | "What we will not do" + 4 bullets | DELETE — negative framing, not third person |
| H2 | "Standards" + paragraph | REWRITE → merge into §6 compliance footnote |

### 3.6 `/contact` and `/contact/sent`

| Location | Current text | Verdict |
| --- | --- | --- |
| H1 | "Tell us about the installation." | REWRITE → §6: "Request a quote" |
| Intro | "Quotes, inspections, maintenance and leak callouts all start the same way: what needs to run, where it is, and what is already there." | REWRITE → §6 sub |
| Panel | "If you smell gas" + safety paragraph | KEEP in substance, REWRITE wording |
| Form labels | Full name · Company · Phone · Email · Suburb or town · Service required · Site type · What do you need? · About the work | REWRITE — §3.1 specifies: name, phone, email, suburb/area, property type, service required, message, consent |
| Form submit | Send enquiry / Sending… | REWRITE → "Request a Quote" |
| Form footer | "We reply by email to the address you give us." | REWRITE → §6: "We reply by email or phone within one working day. [CLIENT TO CONFIRM response time.]" |
| Consent | "I agree that Gas Designs may use the details above to respond to this enquiry, in line with the Privacy Policy." | KEEP in substance |
| Sent H1 | "Enquiry sent." | REWRITE |
| Sent body | "Thanks — it is with us. We reply by email to the address you gave, so keep an eye on that inbox and its spam folder." | REWRITE |
| Sent visual | *(valve quarter-turn animation)* | DELETE |

### 3.7 404

| Location | Current text | Verdict |
| --- | --- | --- |
| Label | Error 404 | KEEP |
| H1 | **"This line is closed."** | REWRITE — metaphor, banned by §3.2 |
| Body | "The page you asked for is not here. It may have moved, or the address may have a typo in it." | KEEP in substance |
| Visual | *(valve drawn shut)* | DELETE |

### 3.8 `/privacy-policy` and `/terms`
Approximately 1,400 words across the two pages. Both carry a visible "not reviewed by a legal practitioner" notice. **Verdict: KEEP in substance, REWRITE for sentence length** (several paragraphs exceed the 60-word limit in §3.2). Neither is in the §3.1 structure but both should stay — the footer links to them and POPIA expects a privacy policy.

---

## 4. Colour and font-size audit, with measured contrast

Computed from the tokens in `src/app/globals.css`, WCAG 2.1 relative luminance.

### 4.1 Current palette vs. the brief's required palette

| Role | Current | Brief §3.3 requires | Action |
| --- | --- | --- | --- |
| Background | `#16181B` carbon | `#121212` | CHANGE |
| Background alt | `#0E0F11` carbon-2 | `#1A1A1A` | CHANGE |
| Surface | `#22262B` graphite | `#222222` | CHANGE |
| Primary text | `#F2F0EA` warm-white | `#F2F2F2` | CHANGE |
| Secondary text | `#D8D3C5` mist | `#C4C4C4` | CHANGE |
| Accent | `#FFC400` signal-yellow | `#F5B400` | CHANGE |
| Tertiary text | `#9AA0A6` valve-steel | *(none — brief says never darker than `#C4C4C4`)* | REMOVE |
| Non-text | `#6F747B` smoke | *(none)* | REMOVE |

The current palette is warm-tinted; the brief's is neutral grey. Every token changes.

### 4.2 Measured contrast of the current palette

| Text token | Hex | on carbon `#16181B` | on carbon-2 `#0E0F11` | on card (graphite/55) | on graphite `#22262B` |
| --- | --- | --- | --- | --- | --- |
| warm-white | `#F2F0EA` | 15.61 PASS | 16.83 PASS | 14.51 PASS | 13.35 PASS |
| mist | `#D8D3C5` | 11.90 PASS | 12.82 PASS | 11.06 PASS | 10.18 PASS |
| valve-steel | `#9AA0A6` | 6.74 PASS | 7.26 PASS | 6.26 PASS | 5.76 PASS |
| signal-yellow | `#FFC400` | 11.14 PASS | 12.01 PASS | 10.36 PASS | 9.53 PASS |
| smoke | `#6F747B` | **3.78 FAIL** | **4.07 FAIL** | **3.51 FAIL** | **3.23 FAIL** |
| error red | `#C2342B` | **3.24 FAIL** | **3.49 FAIL** | **3.01 FAIL** | **2.77 FAIL** |

Carbon text on the yellow button: **11.14 PASS**.

**Findings:**
1. `smoke #6F747B` fails AA for body text at every background. **It is no longer used for text** (0 occurrences) — it was moved to non-text use in an earlier pass. Under the brief it is deleted entirely.
2. **`#C2342B` error red is a live failure.** Used at `text-sm` (14px) for form validation messages in `src/components/ContactForm.tsx` lines 375 and 458 — 3.24:1 against carbon, below the 4.5:1 required. **This is the one genuine contrast defect currently shipping.** Fix: lighten to roughly `#F2645A` or place errors on a lighter surface.

### 4.3 Font sizes — three violations of "never below 14px"

| Size | Where | Brief §3.3 | Verdict |
| --- | --- | --- | --- |
| 56px / 36px | `.type-h1` desktop / mobile | — | OK |
| 36px / 28px | `.type-h2` | — | OK |
| 20px | `.type-h3` | — | OK |
| 16px | body | Requires **17px desktop**, 16px mobile | CHANGE |
| **12px** | `.type-label` — all uppercase section labels | **Never below 14px**; labels 13px+ | **VIOLATION** |
| **12px** | `text-xs` — 7 uses incl. footer legal line, breadcrumbs, "View service" | **Never below 14px** | **VIOLATION** |
| 14px | `text-sm` — 31 uses | At the floor | OK, but body copy must move to 17px |

**Typeface:** Space Grotesk (headings), Inter (body), JetBrains Mono (labels). The brief requires **one** family; Inter is permitted. So Space Grotesk and JetBrains Mono are removed.

> **Note for Phase B:** there is a live bug — the three fonts never actually apply. `--font-display` is declared inside Tailwind's `@theme` (which emits to `:root`), but `next/font` defines its variables on `<body>`, so the declaration is invalid and everything falls back to system fonts. Measured: the H1 renders at exactly Arial's width. Collapsing to a single Inter family in Phase B fixes this as a side effect.

---

## 5. The nine services, exactly as named in the repo

From `src/data/service-titles.ts`. **These names are the client's and are kept unchanged.** Order below is the canonical order and sets the `service-01.jpg` … `service-09.jpg` numbering.

| # | Service name (unchanged) | Slug | Image file |
| --- | --- | --- | --- |
| 1 | Residential Gas Installations | `residential-gas-installations` | `service-01.jpg` |
| 2 | Commercial Kitchen Gas Systems | `commercial-kitchen-gas-systems` | `service-02.jpg` |
| 3 | Industrial Gas Installations & Maintenance | `industrial-gas-installations-maintenance` | `service-03.jpg` |
| 4 | Bulk LPG Installations | `bulk-lpg-installations` | `service-04.jpg` |
| 5 | Custom Projects & Developments | `custom-projects-developments` | `service-05.jpg` |
| 6 | Certificates of Compliance | `certificates-of-compliance` | `service-06.jpg` |
| 7 | Gas System Maintenance | `gas-system-maintenance` | `service-07.jpg` |
| 8 | Gas Leak Detection & Emergency Repairs | `gas-leak-detection-emergency-repairs` | `service-08.jpg` |
| 9 | Basic Electrical & Gas System Support | `basic-electrical-gas-system-support` | `service-09.jpg` |

---

## 6. Contact details, addresses, registration numbers found in the repo

Nothing invented. Anything absent is marked MISSING.

| Field | Value in repo | Source |
| --- | --- | --- |
| Business name | Gas Designs | `src/lib/site-config.ts` — confirmed |
| Wordmark spelling | GasDesigns | `src/lib/site-config.ts` — confirmed |
| Email | **pierre@gasdesigns.co.za** | `src/lib/site-config.ts` — confirmed, published |
| Domain | https://www.gasdesigns.co.za | `src/lib/site-config.ts` — confirmed |
| Year mark | 2025 | `src/lib/site-config.ts` — now stale, 2026 |
| Telephone | **MISSING** from source. A candidate number exists in `docs/missing-client-info.md`, flagged as *shared with DP Energies* and withheld from publication. Not in `src/`. | — |
| WhatsApp | **MISSING** | — |
| Physical address | **MISSING** | — |
| Postal address | **MISSING** | — |
| Area served | **MISSING** in repo. The brief §6 states **Gauteng** — that is new client information, not repo data. | brief only |
| SAQCC Gas registration | **MISSING** | — |
| LPGSA membership | **MISSING** | — |
| Company registration number | **MISSING** | — |
| VAT number | **MISSING** | — |
| Public liability insurance | **MISSING** | — |
| Opening hours | **MISSING** | — |
| Google Business Profile | **MISSING** | — |
| Social profiles | **MISSING** | — |
| Years in operation | **MISSING** | — |
| Team size | **MISSING** | — |

**Note:** the brief's §6 replacement copy introduces **"Gauteng"** and **"a registered gas installer"**. Neither is in the repo. Both are treated as client-supplied facts from the brief and used verbatim as instructed; the registration body/number stays `[CLIENT TO CONFIRM]`.

---

## 7. SEO / GA4 / GTM / schema / form wiring — and whether it works

| Item | State | Works? |
| --- | --- | --- |
| Per-page `<title>` | Present, unique on all 8 sampled routes, via `src/lib/metadata.ts` | **Yes** |
| Meta description | Present, unique on all 8 | **Yes** |
| Canonical | Present on every page | **Yes** |
| Open Graph | Present incl. `og:image` → `/og.png` | **Yes** — but image is drawn art, to be replaced by `og-image.jpg` |
| Twitter card | `summary_large_image` on every page | **Yes** |
| `robots.txt` | Generated by `src/app/robots.ts` | **Yes** |
| `sitemap.xml` | Generated, 15 URLs, excludes `/contact/sent` | **Yes** |
| 404 page | `src/app/not-found.tsx` | **Yes** |
| Favicon set | `favicon.ico` 32px, `icon.svg`, `apple-icon.png` 180px | Yes, but **derived from the unapproved logo** — regenerate from the supplied file |
| **JSON-LD LocalBusiness** | **NOT emitted.** Deliberately gated off — requires address + area + telephone, none confirmed | **No** — see below |
| JSON-LD Organization | Emitted on `/` | Yes |
| JSON-LD FAQPage | Emitted on `/`, 6 questions | Yes |
| JSON-LD Service | Emitted on all 9 service pages | Yes |
| JSON-LD BreadcrumbList | Emitted on `/services` and all 9 service pages | Yes |
| JSON-LD ContactPoint | **NOT emitted** — gated on a confirmed telephone | **No** |
| **GTM** | **NOT wired.** `src/components/Analytics.tsx` loads GTM only if `NEXT_PUBLIC_GTM_ID` is set. It is blank, so nothing is injected. No `GTM-XXXXXXX` placeholder exists. | **No** — brief §3.4 requires the placeholder snippet |
| GA4 | Conditional on `NEXT_PUBLIC_GA_ID`, blank. No hard-coded measurement ID. | Not active — correct per §3.4 |
| Google Ads | Conditional on `NEXT_PUBLIC_GOOGLE_ADS_ID`, blank | Not active |
| Search Console verification | Conditional on `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`, blank | Not active |
| **Contact form endpoint** | `POST /api/contact` — zod validation both sides, honeypot, in-memory rate limit (5 per 10 min), nodemailer SMTP → `CONTACT_TO_EMAIL` | **Yes, verified** — tested end-to-end against a local SMTP sink; correct To, Reply-To, subject and all fields delivered |
| SMTP credentials | All blank in `.env.example`. With no SMTP configured the endpoint returns a generic 503 and sends nothing. | Configured = works; unconfigured = graceful |
| **Form on GitHub Pages** | The Pages preview is a static export; the API route is deleted at build time, so **the form cannot submit on the preview**. It is disabled there with a notice pointing at the email address. | By design |

**On LocalBusiness schema (brief §3.4):** it requires `telephone`, `address` and `areaServed`. Telephone and address are MISSING. The brief supplies "Gauteng" for `areaServed`. I can emit LocalBusiness with name, description, email, areaServed and url, and `[CLIENT TO CONFIRM]` for telephone and address — but **schema containing a literal "[CLIENT TO CONFIRM]" string is invalid structured data and Google will flag it.** Recommendation: emit LocalBusiness with only the fields that have real values, and add telephone/address the moment they are supplied. Flagging for a decision.

---

## 8. Image slots — current status

Directory created: `public/assets/img/` (serves at `/assets/img/…` exactly as §5 requires).

| Slot | Filename | Required | In Drive folder | In repo |
| --- | --- | --- | --- | --- |
| Hero | `hero.jpg` | 1920×1080 | **Yes** (2.8 MB) | **No** |
| Service 1–9 | `service-01.jpg` … `service-09.jpg` | 1200×900 | **Yes** (all nine, 2.6–3.2 MB each) | **No** |
| Compliance | `compliance.jpg` | 1600×1000 | **Yes** (2.8 MB) | **No** |
| About | `about.jpg` | 1600×1000 | **Yes** (3.8 MB) | **No** |
| Contact | `contact.jpg` | 1600×1000 | **Yes** (3.1 MB) | **No** |
| Open Graph | `og-image.jpg` | 1200×630 | **MISSING** | No |
| Logo | `gasdesigns-logo.svg` | as supplied | **MISSING** | No |
| Favicon set | derived from logo | 16/32/180/512 | blocked on logo | No |

### 8.1 I cannot download the images — this needs you
The Drive folder is shared and I can see all 13 files, but **the sandbox's egress proxy blocks every Google file host**: `drive.google.com`, `drive.usercontent.google.com`, `lh3.googleusercontent.com` and `www.googleapis.com` all refused. The only remaining route returns the files as base64 through the conversation, and 38 MB of base64 is far beyond what that can carry.

**Fastest fix — 2 minutes, in the GitHub web UI:**
`logiagenesis/gas_designs` → branch `claude/tender-cori-3p8u59` → `public/assets/img/` → **Add file → Upload files** → drag all 13 → Commit.

Or locally: `git clone`, copy the folder into `public/assets/img/`, commit, push.

### 8.2 The supplied images must be compressed
They average **2.9 MB each; 38 MB total**. The brief demands mobile Lighthouse Performance ≥ 90. A 2.8 MB hero alone makes that impossible. In Phase B I will generate optimised WebP/JPEG derivatives at the specified dimensions (`sharp` is already a dependency) and serve those, keeping the originals as source. No quality decision is needed from you — it is a build step.

---

## 9. What Phase B needs from you

| # | Item | Blocking? |
| --- | --- | --- |
| 1 | **Say "proceed"** (or "proceed B" if you really want the static-HTML rewrite from §0.2) | **Yes** |
| 2 | Upload the 13 images per §8.1 | Blocks imagery only — I can build every slot without them |
| 3 | **The logo file** — not in Drive, not in the repo. §1.4 of the brief forbids me drawing one. | Blocks header, footer, favicon, OG |
| 4 | `og-image.jpg` — not in Drive | Blocks the social card |
| 5 | Decide: repo private, or delete the three exposing docs (§0.3) | Not blocking, but live now |
| 6 | Confirm **"Certificate of Conformity"** (brief §3.1) vs **"Certificate of Compliance"** (repo, and the name of service #6) | Yes — it is a service name |
| 7 | Keep the FAQ section? It is not in the §3.1 structure but exists and carries FAQPage schema | No — I will keep and rewrite it unless told otherwise |
| 8 | LocalBusiness schema decision per §7 | No — I will emit real fields only |

---

## 10. Summary of what Phase B will do

Delete 5 illustration components, 5 generator scripts, 14 unused/unapproved SVG and image assets, and 2 whole homepage sections (Sectors, Process) plus the decorative label strip. Rewrite all copy — roughly **190 distinct strings**, of which about 120 are the nine services. Replace the palette, collapse three typefaces to one, lift body copy to 17px, remove every sub-14px size, fix the one live contrast failure, wire 15 photo slots, add the GTM placeholder, add the Logi-Ink footer credit, and re-verify contrast and Lighthouse.

**Nothing in this repository has been modified in Phase A.**
