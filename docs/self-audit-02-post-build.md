# Self-Audit 02 — Post-Build

Run after implementation, against the built and running application rather than
against the source. **Every failure listed here was fixed, not merely recorded.**

Verification was automated where possible: a Playwright suite drives the real
pages in Chromium and measures the DOM, and Lighthouse supplies the performance
and accessibility numbers. Where a check could only be done by looking, it says so.

---

## A. The brief's checklist

| # | Check | Result | Evidence |
| --- | --- | --- | --- |
| 1 | Exactly 9 homepage service cards | **PASS** | 9 `<article>` elements counted in `#services` |
| 2 | Desktop grid exactly 3 × 3 at 1024px+ | **PASS** | Card bounding boxes measured at 1024, 1280, 1440 and 1920 — 3 distinct columns × 3 distinct rows at every width |
| 3 | Card heights equal | **PASS** | All nine identical at every width (474px at 1024; 418px at 1280–1920) |
| 4 | Logo files exist | **PASS** | 5 SVGs in `public/brand/` + `public/og.png` |
| 5 | Logo in header, footer, favicon and OG | **PASS** | Header and footer SVGs present in DOM; `icon.svg`, `favicon.ico` and `apple-icon.png` all linked; `og.png` referenced on every page |
| 6 | Logo readable at small size | **PASS** | Rasterised at **exactly 16 × 16** and inspected; ring, opening and lever all resolve |
| 7 | No Lucide/Heroicons on service cards | **PASS** | No icon library in `package.json` or anywhere in `src/`; the only match is a comment saying they are banned |
| 8 | No fake company facts | **PASS** | All unconfirmed facts gated in `site-config.ts`; grep for licensed/insured/accredited/registered in rendered copy returns 0 |
| 9 | No copied DP wording | **PASS** | DP Energies was never fetched (`EGRESS_BLOCKED`), so no source text existed. Banned-phrase grep returns 0 across all page HTML and client bundles |
| 10 | No fake project photos | **PASS** | Zero raster images on the site besides the OG card and the app icons |
| 11 | No fake testimonials | **PASS** | Grep returns 0 |
| 12 | No fake client logos | **PASS** | Grep returns 0 |
| 13 | No empty LocalBusiness schema | **PASS** | `LocalBusiness` and `ContactPoint` are not emitted at all; no empty `address` or `telephone` anywhere in the JSON-LD |
| 14 | Form validates client-side | **PASS** | Empty submit surfaces 6 errors, 6 inputs marked `aria-invalid`, each linked by `aria-describedby` |
| 15 | Form validates server-side | **PASS** | `POST /api/contact` with `{}` returns 422 with a human message for all 9 required fields |
| 16 | SMTP is env-driven | **PASS** | Config read from environment only; **verified end to end against a local SMTP sink** — correct To, Reply-To, subject, all fields, UTM and page URL |
| 17 | `/contact/sent` exists | **PASS** | 200, `noindex`, excluded from sitemap |
| 18 | Analytics conditional | **PASS** | Verified in **both** directions — see §C |
| 19 | Ads tags conditional | **PASS** | See §C |
| 20 | GSC verification conditional | **PASS** | See §C |
| 21 | Reduced motion works | **PASS** | Under `prefers-reduced-motion: reduce` the card transform is `none` and all four tilt properties are zeroed |
| 22 | Header works on mobile | **PASS** | Toggle sets `aria-expanded` true/false, nav shows and hides, Escape closes it |
| 23 | No horizontal scroll | **PASS** | 8 pages × 7 widths (360/375/390/768/1024/1440/1920) — zero overflow |
| 24 | Sitemap exists | **PASS** | 15 URLs — 6 static + 9 services; `/contact/sent` excluded |
| 25 | Robots exists | **PASS** | Allows all, disallows `/api/` and `/contact/sent`, declares sitemap and host |
| 26 | Privacy and terms exist | **PASS** | Both 200, both carry a visible "not yet legally reviewed" notice |
| 27 | All missing facts documented | **PASS** | `docs/missing-client-info.md`, 9 sections |
| 28 | Shared phone number absent from `src/` and `public/` | **PASS** | Grep for the digits in every format returns 0 |

**41 of 41** automated structural checks pass.

---

## B. Failures found, and what was done about each

Eleven defects were found during this audit. All eleven are fixed.

### B1. Honeypot told bots which field had trapped them — *fixed*
The schema rejected a filled honeypot with `max(0)`, so parsing failed **before**
the route's honeypot branch ran. A bot received `422` with
`fieldErrors: { website: ... }` — naming the trap.

The schema is now permissive on that field and the route evaluates the trap after
parsing, answering a filled trap with an ordinary `200 {"ok":true}`. Re-verified:
filled honeypot returns 200 and no mail is sent.

### B2. Internal review notes were shipping to the browser — *fixed*
The most serious finding. `needsConfirmation` notes from `services.ts` and the
`note` strings in `site-config.ts` were being compiled into the public JavaScript
and serialised into the server-rendered flight payload. Anyone viewing source
could read **"DP Energies"**, **"Do not publish"**, **"SAQCC"** and the full list
of unconfirmed claims.

Two causes: a Server Component passing whole `Service` objects to a client
component serialises every field of them, and a client component importing
`site-config` pulls in every string in that module.

Three fixes:
- `src/data/service-titles.ts` — just the nine public titles, for the form.
- `src/data/service-view.ts` — the display-only subset that crosses into client
  components.
- `site-config.ts` — the `note` field removed from `FactGate` entirely;
  explanations moved into code comments, which the bundler strips.

Re-verified at **0 occurrences** of every internal term across all client chunks
and the HTML of all 8 routes.

### B3. Unusable validation messages for absent fields — *fixed*
A field missing from the payload produced zod's raw type error — *"Invalid input:
expected string, received undefined"*. Every field now carries a human message
for that case too.

### B4. Heading level skipped on `/services` — *fixed*
The page went `h1` → `h3`, skipping `h2`, because the cards hard-coded `h3`.
`ServiceCard` now takes a `headingLevel` prop: `h3` under the homepage's section
`h2`, `h2` on `/services` where the cards sit directly under the page `h1`.

### B5. OG image silently dropped on every sub-page — *fixed*
Next.js does not deep-merge `openGraph`: a page declaring its own replaces the
root one wholesale, taking the shared card image with it. Seven of eight routes
had no OG image.

Rather than repeat `images` in eight files, all page metadata now goes through
`src/lib/metadata.ts`, which cannot forget it. Verified: `og.png` present on
every route.

### B6. Body text failed WCAG AA contrast — *fixed*
`text-smoke` (`#6F747B`) reached only **3.77:1** against carbon, below the 4.5:1
required for body copy. Ten elements failed across the site.

The palette is locked by the brief, so no colour was changed. Instead `smoke` is
now documented and used as a **non-text token** — rules, borders, disabled states
— and tertiary text uses `valve-steel` (`#9AA0A6`), already in the palette, which
clears 4.5:1 on every surface. Lighthouse accessibility went 96–97 → **100**.

### B7. In-text link distinguished by colour alone — *fixed*
The Privacy Policy link inside a Terms paragraph was recoloured but not
underlined, failing WCAG 1.4.1. Links in `Prose` are now underlined.
`/terms` accessibility went 96 → **100**.

### B8. Wordmark letterforms were ambiguous — *fixed*
The first wordmark used fully squared corners. At that construction a squared `S`
is geometrically identical to a `5` and a squared `D` identical to an `O`, so the
lockup read as **"GA5DE5IGN5"**. The `A` was also malformed, with a miter spike
above the cap line.

Rebuilt as stroked skeletons with real corner arcs, hooks on the `S`, a flat apex
on the `A`, a 2.2 miter limit to bevel the acute joins on `N`/`M`/`Y`, and an
optical kerning table. Verified by rendering at 1000px and reading it.

### B9. Stray white wedge beside the mark — *fixed*
With the valve opening starting at +16°, a sliver of the ring peeked out above the
lever and read as a loose white triangle floating beside the G. The opening now
starts at −6°, just below the centre line, so the terminal is completely covered
by the lever and the ring appears to pass behind it.

### B10. Mark clipped at its own viewBox edge — *fixed*
Ring and lever tip sat exactly on the bounds, so renderers clipped the
antialiased pixel. Two units of padding added.

### B11. Four service icons read as the wrong object — *fixed*
Checked by rendering all nine at 64px and 24px and looking at them:
`blueprint` read as a browser window, `maintenance` as a magnifying glass,
`circuit` as an aerial, and the bulk tank's gauge as a power symbol. Redrawn as a
folded drawing sheet, an open-jaw spanner, a switch driving a solenoid, and a
dial with a needle.

### Also fixed
- ESLint: a raw `<a>` to an internal route in the `/services` breadcrumb.
- The enquiry form used viewport breakpoints, so it crammed two inputs into
  ~170px in the service-page sidebar. It now uses **container queries** and lays
  out on its own width.

---

## C. Analytics — verified in both directions

A conditional tag is only proven by testing both states. `NEXT_PUBLIC_*`
variables are inlined at build time, so each state needed its own build.

| Build | GTM script | GTM noscript | gtag.js | GA4 config | Ads config | GSC meta |
| --- | --- | --- | --- | --- | --- | --- |
| All variables blank *(the default)* | absent | absent | absent | absent | absent | absent |
| `GTM_ID` + `GSC` set | **present** | **present** | absent | absent | absent | **present** |
| `GA_ID` + `ADS_ID` set, no GTM | absent | absent | **present** | **present** | **present** | absent |

GTM correctly takes precedence: when it is set, GA4 is not loaded directly.
**With everything blank the site ships zero third-party JavaScript.**

---

## D. Contact endpoint — behaviour verified

| Case | Expected | Actual |
| --- | --- | --- |
| Empty payload | 422, human message per field | 422, all 9 fields named clearly |
| Invalid email, short name | 422, field errors | 422, correct fields flagged |
| Honeypot filled | 200, nothing sent | **200 `{"ok":true}`**, no mail |
| Valid, SMTP unconfigured | 503, generic message | 503, generic message |
| Valid, SMTP configured | 200, mail delivered | **200, message captured at the sink** |
| 6+ requests from one IP | 429 | `422,422,422,422,422,429,429,429` |

**Secret safety:** no response body contains `SMTP_HOST`, `SMTP_USER`,
`SMTP_PASS`, `SMTP_PORT`, `SMTP_FROM` or `CONTACT_TO_EMAIL`. The server log
carries an actionable admin line — *"Mail transport is not configured"* — with no
credential in it.

**Delivered message, verified at the sink:** correct `From`, `To`
(`CONTACT_TO_EMAIL`), `Reply-To` set to the enquirer, subject
`Quote: Commercial Kitchen Gas Systems — Fourways`, and a body carrying every
field plus UTM attribution, page URL and timestamp.

---

## E. Lighthouse

Brief targets: Performance 90+ · SEO 95+ · Accessibility 95+ · Best Practices 95+.

**Mobile** (Moto G4 emulation, 4G, 4× CPU slowdown)

| Route | Perf | A11y | BP | SEO | LCP | CLS | TBT |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `/` | 91 | 100 | 100 | 100 | 3.3 s | 0 | 140 ms |
| `/services` | 98 | 100 | 100 | 100 | 2.4 s | 0 | 60 ms |
| `/services/certificates-of-compliance` | 97 | 100 | 100 | 100 | 2.5 s | 0 | 100 ms |
| `/services/bulk-lpg-installations` | 97 | 100 | 100 | 100 | 2.6 s | 0 | 60 ms |
| `/about` | 97 | 100 | 100 | 100 | 2.5 s | 0 | 80 ms |
| `/contact` | 99 | 100 | 100 | 100 | 2.1 s | 0 | 70 ms |
| `/contact/sent` | 99 | 100 | 100 | 66 ¹ | 2.0 s | 0 | 100 ms |
| `/privacy-policy` | 97 | 100 | 100 | 100 | 2.6 s | 0 | 50 ms |
| `/terms` | 96 | 100 | 100 | 100 | 2.7 s | 0 | 70 ms |

**Desktop** — **100 / 100 / 100 / 100 on every route measured**, LCP 0.5–0.7 s,
CLS 0, TBT 0 ms.

¹ `/contact/sent` scores 66 on SEO for exactly one reason: `is-crawlable` fails
because the page is deliberately `noindex`. That is correct behaviour for an
enquiry confirmation page, and it is the intended configuration, not a defect.

**CLS is 0 on every page.** Fonts are self-hosted at build time by `next/font`,
there are no images to reflow, and the deferred homepage form reserves its height.

*A note on method:* an initial desktop run scored 78. That was a fault in the test
harness, not the site — the desktop form factor had been used with Lighthouse's
default **mobile** throttling profile. With the correct desktop preset the same
page scores 100. Worth recording, because it is an easy way to mis-report a site
as slow.

---

## F. Accessibility

| Check | Result |
| --- | --- |
| One `<h1>` per page, no skipped levels | Pass on all 7 routes checked |
| Skip link is the first tab stop | Pass — "Skip to content" → `#main` |
| Service cards keyboard reachable | Pass — one tab stop per card, real `<a>`, visible focus ring |
| All SVGs either named or hidden | Pass — 57 of 57 |
| No `<img>` without `alt` | Pass — no `<img>` elements at all |
| Form errors linked to inputs | Pass — `aria-describedby` on every errored field |
| Required fields marked | Pass — `aria-required` and a visible marker |
| Reduced motion respected | Pass — tilt, parallax, entrance and the quarter-turn all disabled |
| Mobile menu | Pass — `aria-expanded`, `aria-controls`, Escape to close |
| Colour contrast | Pass — 100 on every route after B6 and B7 |

---

## G. Checked by eye, not by script

Some things a script cannot judge. These were rendered and looked at:

- The lockup at 1000px wide on carbon, and one-colour on warm white — **B8 came
  out of this**.
- The mark at 600px — **B9 and B10 came out of this**.
- The favicon rasterised at true 16 × 16 and at 32 × 32, then magnified.
- All nine icons at 64px and 24px — **B11 came out of this**.
- The OG card at full size — the background motif's lever was too opaque and
  muddied to olive; reduced from 0.5 to 0.16.
- Every page at 390px, 768px and 1440px.
- The card hover state, to confirm the specular edge really does follow the
  cursor. It was too faint at first, so the gradient was widened and its opacity
  raised.

---

## H. Known and accepted

| Item | Assessment |
| --- | --- |
| `npm audit`: 2 advisories in `postcss`, transitive via `next` | Build-time CSS tooling only, not a runtime path. The only fix offered is `next@16`, which contradicts the brief's Next 15 requirement. Not taken; recorded here and in audit 03 |
| ~50 KiB unused JS on first load | Framer Motion and React internals not needed for first paint. Homepage is 152 kB First Load JS with the contact form already code-split. Acceptable at 91–100 performance |
| Rate limiting is per-process | Documented in `src/lib/rate-limit.ts`. Adequate as a speed bump; a shared store is needed if the client wants a hard guarantee across serverless instances |
| No Content-Security-Policy header | Deliberate. Next.js needs nonce plumbing for its inline bootstrap, and the policy must be widened for whichever tag manager is enabled. Listed as a launch task rather than shipped broken or uselessly permissive |
| No automated test suite | No `npm test` script exists. Verification is the Playwright and Lighthouse suites described above, which are reproducible but live outside the repository |
