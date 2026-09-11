# Self-Audit 01 — Pre-Build Plan

**Project:** Gas Designs / GasDesigns website
**Date:** 2026-09-11
**Branch:** `claude/tender-cori-3p8u59`
**Status:** Written before any code was committed, as required by the brief (§2.6).

---

## 1. What files exist

The repository was inspected in full before planning.

| Check | Result |
| --- | --- |
| Repo path | `/home/user/gas_designs` |
| Git repo | Yes |
| Remote | `https://github.com/logiagenesis/gas_designs` |
| Commits on remote | **None** — `git ls-remote --heads origin` returned zero refs |
| Commits locally | **None** — branch `claude/tender-cori-3p8u59` has no commits yet |
| Working tree contents | **Empty** except `.git/` |
| Framework / package manager | None present |
| Existing routes, assets, docs, config, deployment setup | None present |

### Consequence

There are **no previous failed builds in this repository to salvage**. The brief's
instruction "do not salvage the previous failed builds unless a file is clearly useful"
is satisfied trivially: there is nothing to salvage. This is a greenfield build.

### Local source-material search

| Search | Result |
| --- | --- |
| Gas Designs source material in repo | None — repo empty |
| DP Energies copied text in repo | None — repo empty |
| Supplied brief files | One: `Final_Prompt_GPT5.5Pro.txt` (the build brief itself) |
| Other `.md` / `.txt` / `.docx` / `.pdf` / `.json` / `.csv` briefs | None supplied |
| `docs/logo-concept.png` on disk | **Not present** — see §7 |

---

## 2. What source facts are confirmed

Confirmed facts come **only** from the supplied brief. Nothing else is treated as fact.

| Fact | Value | Source |
| --- | --- | --- |
| Trading lockup | `GasDesigns` | Brief §1, §12 |
| Body-copy name | `Gas Designs` | Brief §1, §12 |
| Email | `pierre@gasdesigns.co.za` | Brief §1, §12 — explicitly "Confirmed email" |
| Domain | `https://www.gasdesigns.co.za/` | Brief §1, §12 |
| Year mark | `2025` | Brief §1, §12 |
| Service categories (9) | The 9 titles listed in brief §10 | Brief §10 — "confirmed as service categories from the brief" |

Nothing else is confirmed. Specifically **not** confirmed: any number, address, credential,
availability claim, area, person, date of founding, or project.

---

## 3. What facts are missing

These are hidden from the UI, stored as `confirmed: false` in `src/lib/site-config.ts`,
and listed in `docs/missing-client-info.md`.

1. Phone / WhatsApp number — **special flag**, see below
2. 24/7 availability (yes/no)
3. SAQCC Gas registration number
4. LPGSA membership number
5. Physical address
6. Service area / coverage
7. Opening hours
8. Company registration number
9. Licensed / registered / insured claims
10. Founder bio
11. Years in business
12. Real project photography
13. Google Business Profile URL
14. Social media links

### Phone number — explicit risk flag

The number `+27 61 039 7034` appears in the brief but is flagged there as:

> Published elsewhere but currently shared with DP Energies. Do not publish until
> Pierre confirms ownership/use.

**Decision:** the number is stored in `site-config.ts` as unconfirmed with that exact
warning attached, is **not** rendered anywhere in the UI, is **not** placed in
`.env.example`, and is **not** emitted in any structured data. It ships hidden.

---

## 4. What must be deleted or rebuilt

Nothing to delete — the repo is empty. Everything is built new:

- Full Next.js 15 App Router application
- Complete hand-built SVG brand system
- All copy written from scratch
- All docs written from scratch

---

## 5. What risks exist

| # | Risk | Mitigation |
| --- | --- | --- |
| R1 | **Fabricating business facts.** Highest-severity risk. A false "SAQCC registered" or "insured" claim on a gas-safety site is a legal and safety exposure. | Single source of truth in `site-config.ts`. Every claim gated behind a `confirmed` boolean. UI reads the gate, never a literal. Nothing renders unless confirmed. |
| R2 | **Copying DP Energies.** Reference-only source; copying is a plagiarism and brand risk. | DP Energies was **not fetched** (egress blocked — see R4), so there is no source text present that could leak into the build. All copy is written from first principles. A banned-phrase list is enforced and recorded in `docs/dp-energies-difference-audit.md`, then grepped against the built source. |
| R3 | **Publishing the shared phone number.** | Hard-hidden, see §3. Grep check in audit 02 confirms the digits appear nowhere in `src/` or `public/`. |
| R4 | **No web access.** `WebFetch` is blocked by the environment's network egress proxy for every external host tested (`dp-energies.co.za`, `gasdesigns.co.za`, `lpgas.co.za`, `en.wikipedia.org` all returned `EGRESS_BLOCKED`). `WebSearch` works but returns search listings, not fetched pages. | Per brief §3, research docs are marked **Blocked** and state exactly what was and was not obtainable. **No competitor is invented. No design source is invented. No "watched"/"listened"/"reviewed" claim is made.** Build proceeds from confirmed brief facts only. |
| R5 | **Logo becoming generic or unreadable.** | Hand-built SVG geometry on a fixed 256-unit grid, single motif, verified at 16px, verified in one colour, verified on both backgrounds. No icon libraries, no raster, no generated logo files. |
| R6 | **Layout drift on the service grid.** Brief demands exactly 3×3 at 1024px+. | Exactly 9 services enforced by a TypeScript tuple type of length 9, plus an explicit `lg:grid-cols-3` with equal-height items, plus a runtime-independent audit check. |
| R7 | **Leaking secrets or env names to users.** | SMTP config read server-side only. User-facing failures are generic. Env var names never surface in client responses. |
| R8 | **Analytics breaking the site when unconfigured.** | Every tag is conditional on its env var. Site must render and build perfectly with all analytics vars blank — this is the default state. |
| R9 | **Accessibility regressions from the 3D/tilt effects.** | Tilt is pointer-only and non-essential; cards are real links with visible focus rings; all motion respects `prefers-reduced-motion`; decorative SVG is `aria-hidden`. |

---

## 6. Exact implementation plan

### Stack
Next.js 15 (App Router) · TypeScript · Tailwind CSS · ESLint · Node 20+ · npm ·
`framer-motion` · `zod` · `react-hook-form` · `@hookform/resolvers` · `nodemailer` ·
`sharp` (build-time OG raster only).

### Build order
1. `docs/self-audit-01-plan.md` (this file) — gate.
2. Scaffold app at repo root; install dependencies; configure fonts, Tailwind theme tokens, security headers.
3. Brand: hand-build `gas-designs-logo-full.svg`, `-mark.svg`, `-light.svg`, `-dark.svg`, `favicon.svg`; generate `public/og.png` from a hand-built SVG via `sharp`.
4. Data: `src/lib/site-config.ts` (fact gating) and `src/data/services.ts` (exactly 9).
5. Components: `Logo`, `Header`, `Hero`, `ServicesGrid`, `ServiceCard`, `ServiceIcon`, `ContactForm`, `Footer`, `Analytics`.
6. Libs: `analytics.ts`, `validation/contact.ts`, `email/send-contact-email.ts`.
7. Pages: `/`, `/services`, `/services/[slug]` ×9, `/about`, `/contact`, `/contact/sent`, `/privacy-policy`, `/terms`, `not-found`, `robots.ts`, `sitemap.ts`.
8. API: `/api/contact` — zod, honeypot, rate limit, nodemailer, generic errors.
9. SEO: per-page metadata, canonicals, OG/Twitter, Service + BreadcrumbList + FAQPage schema. **LocalBusiness and ContactPoint schema deliberately omitted** — phone and area are unconfirmed, and the brief bans empty NAP schema.
10. Docs, `.env.example`.
11. Self-audit 02 → fix every failure → `npm run lint` / `build` / `typecheck` → self-audit 03.
12. Commit, push to `claude/tender-cori-3p8u59`, open draft PR.

### Contact form fields
Full name · Company (optional) · Phone · Email · Location/suburb · Service required
(exact 9) · Site type (Residential/Commercial/Industrial/Development/Other) ·
Urgency (Quote/Inspection/Maintenance/Emergency) · Message · POPIA consent ·
honeypot · UTM (hidden) · page URL · timestamp.

---

## 7. Exact design direction

**Motif — one only: the quarter-turn gas valve.** Applied to logo, hero, service icons,
section dividers, CTA arrows, favicon, OG image, and the form confirmation state.
No flames, no orbs, no chrome pipes, no SaaS gradient blobs.

**Palette (final, locked):** carbon `#16181B`, carbon-2 `#0E0F11`, graphite `#22262B`,
graphite-2 `#2E333A`, warm-white `#F2F0EA`, mist `#D8D3C5`, signal-yellow `#FFC400`,
signal-yellow-soft `#FFE38A`, valve-steel `#9AA0A6`, smoke `#6F747B`,
success `#2F7D4F`, error `#C2342B`. Gas-blue/copper/chrome palettes are rejected.

**Type:** Space Grotesk (headings) · Inter (body) · JetBrains Mono (technical labels).
Scale locked: H1 desktop 56/64, H1 mobile 36/40, H2 36/44, body 16/28,
labels 12/16 uppercase tracked, long-copy measure 36–42ch.

**Logo geometry decision.** `docs/logo-concept.png` is **not present on disk**. A concept
image was supplied in-conversation and was used as visual reference. Where that reference
and the brief's written construction rules (§5) differ — the reference shows a dog-legged
lever, the written rules specify a lever "running horizontally to the right" from the
centre pivot — **the written construction rules win**, because a single straight lever
survives the 16px favicon and one-colour tests that the brief makes mandatory. This
decision is recorded in `docs/brand-guide.md`.

**Hero:** CSS + inline SVG only. Carbon ground, abstract quarter-turn valve/manifold,
reflective floor plane, warm-white ring geometry, signal-yellow flow accent, glass CTA
panel, one-shot entrance motion, desktop-only pointer parallax. No stock images, no AI
raster art, no video, no Three.js.

**Service tiles:** exactly 9, exactly 3×3 at 1024px+, equal heights, no masonry. Each with
custom inline SVG icon, title, 2-line summary, exactly 3 bullets, CTA, ≤6° pointer tilt,
glass fold, cursor-tracked specular yellow edge, floating icon layer, keyboard focus state,
reduced-motion fallback. Lucide/Heroicons banned.

---

## 8. Exact QA checklist

Run as `docs/self-audit-02-post-build.md`; every failure fixed, not just documented.

1. Exactly 9 homepage service cards
2. Desktop grid exactly 3×3 at 1024px+
3. All 6 logo/brand files exist
4. Logo in header, footer, favicon and OG
5. Logo readable at 16px
6. No Lucide/Heroicons on service cards
7. No fake company facts
8. No copied DP wording (banned-phrase grep)
9. No fake project photos
10. No fake testimonials
11. No fake client logos
12. No empty LocalBusiness schema
13. Form validates client-side
14. Form validates server-side
15. SMTP env-driven
16. `/contact/sent` exists
17. Analytics conditional
18. Ads tags conditional
19. GSC verification conditional
20. Reduced motion works
21. Header works on mobile
22. No horizontal scroll (360/375/390/768/1024/1440/1920)
23. Sitemap exists
24. Robots exists
25. Privacy and terms exist
26. All missing facts documented
27. Shared phone number absent from `src/` and `public/`
28. `npm run lint`, `npm run build`, `npm run typecheck` pass

---

## 9. Hard bans carried into the build

No blog · no pricing tables · no testimonials · no client logo wall · no fake stats ·
no fake team bios · no light-mode toggle · no Three.js · no stock images · no AI raster
hero art · no copied DP Energies text · no "formerly DP Energies" · no "24/7" ·
no SAQCC/LPGSA claims · no registration/license/insurance claims · no generic flame logo ·
no chrome 3D primary logo · no corporate blue · no gradient blobs.
