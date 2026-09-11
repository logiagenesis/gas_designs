# Gas Designs

Website for Gas Designs — gas installations, maintenance, leak detection and
compliance support for residential, commercial and industrial sites.

Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · Node 20+

---

## Quick start

```bash
npm install
cp .env.example .env.local   # fill in the SMTP section to enable the form
npm run dev                  # http://localhost:3000
```

The site builds and runs correctly with every optional variable blank. In that
state it ships **zero third-party JavaScript** — no analytics, no cookies.

## Scripts

| Command | Does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run generate:og` | Rebuild `public/og.png` |

Brand assets are generated, not hand-edited:

```bash
node scripts/build-brand.mjs     # the five logo SVGs
node scripts/generate-og.mjs     # public/og.png
node scripts/generate-icons.mjs  # icon.svg, apple-icon.png, favicon.ico
```

---

## The one rule

**Nothing appears on this site unless the client has confirmed it.**

Business facts are gated in `src/lib/site-config.ts`. Components read the gate,
never a literal, so an unconfirmed fact cannot reach a page by accident:

```ts
const phone = CAN_SHOW_PHONE ? confirmedValue(UNCONFIRMED.phone) : null;
// …
{phone && <a href={`tel:${phone}`}>{phone}</a>}
```

To publish a fact: supply a real value and flip `confirmed` to `true`. The UI and
the structured data follow automatically.

There are no credentials, no address, no service area, no phone number, no
availability claim, no statistics, no testimonials and no project photography on
this site, because none has been confirmed. See
[`docs/missing-client-info.md`](docs/missing-client-info.md).

### Keep internal notes out of the browser

`src/lib/site-config.ts` is imported by client components, so **every string in
it is compiled into the public JavaScript bundle**, rendered or not. Explanatory
notes belong in comments (which the bundler strips) or in `docs/`, never in
string values. The same applies to anything a Server Component passes into a
client component — that gets serialised into the page whole, which is why
`src/data/service-view.ts` exists.

This was a real defect found during the post-build audit, not a hypothetical.

---

## Layout

```
src/
  app/            routes, API, robots, sitemap, icons
  components/     UI. Client components are marked "use client"
  data/
    services.ts        the nine services — canonical, includes internal notes
    service-titles.ts  just the titles — safe for client components
    service-view.ts    the display-only subset that crosses to the client
    faqs.ts
  lib/
    site-config.ts     confirmed vs unconfirmed facts
    metadata.ts        per-page metadata — use this, see below
    analytics.ts       conditional tags, no personal data
    rate-limit.ts
    validation/contact.ts   one schema, used client and server
    email/send-contact-email.ts
scripts/          brand asset generators
docs/             brand guide, strategy, audits, open questions
```

### Conventions worth knowing

- **Page metadata goes through `src/lib/metadata.ts`.** Next.js does not
  deep-merge `openGraph`; a page declaring its own replaces the root one
  wholesale and silently drops the card image.
- **Exactly nine services.** `SERVICES` is typed as a nine-tuple, so a tenth is a
  compile error — the homepage grid is specified as exactly 3 × 3 at 1024px+.
- **One motif: the quarter-turn valve.** Logo, hero, icons, bullets, CTA arrows,
  favicon, OG card, and the enquiry confirmation. No second visual language.
- **`smoke` is a non-text colour token.** At `#6F747B` it fails WCAG AA for body
  copy. Tertiary text uses `valve-steel`.
- **Icons are hand-drawn.** Lucide, Heroicons and every other icon library are
  banned on service cards.

---

## Contact form

Client-side validation for speed, server-side for trust, from the same zod
schema. Honeypot, basic rate limiting, POPIA consent, UTM capture.

Delivery is Google Workspace over SMTP — no Google APIs. Credentials are read
server-side only and never reach the browser or any error message. With SMTP
unconfigured the endpoint returns a generic failure in production and an
actionable notice in development.

---

## Docs

| File | Contents |
| --- | --- |
| [`brand-guide.md`](docs/brand-guide.md) | Logo construction, clear space, minimum sizes, misuse |
| [`missing-client-info.md`](docs/missing-client-info.md) | **Everything still needed from the client** |
| [`copywriter-pack.md`](docs/copywriter-pack.md) | All final copy, meta, and the open questions |
| [`content-strategy.md`](docs/content-strategy.md) | Voice, structure, governance |
| [`seo-strategy.md`](docs/seo-strategy.md) | What is implemented, and the geography blocker |
| [`design-opportunities.md`](docs/design-opportunities.md) | Decisions taken, and what is still available |
| [`dp-energies-difference-audit.md`](docs/dp-energies-difference-audit.md) | Non-duplication controls |
| [`competitor-audit.md`](docs/competitor-audit.md) · [`design-research.md`](docs/design-research.md) | **Blocked** — no web access. Nothing invented |
| [`self-audit-01-plan.md`](docs/self-audit-01-plan.md) · [`02`](docs/self-audit-02-post-build.md) · [`03`](docs/self-audit-03-final.md) | Plan, findings and fixes, final results |

---

## Verified

41/41 structural checks · Lighthouse 100/100/100/100 desktop, 91–99 performance
and 100 accessibility mobile · CLS 0 on every page · no horizontal scroll across
8 pages × 7 widths · logo legible at true 16px · contact form delivering real
mail end to end.

Method and evidence in [`docs/self-audit-02-post-build.md`](docs/self-audit-02-post-build.md).
