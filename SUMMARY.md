# SUMMARY.md — Gas Designs, Phase B + C

**Ref:** LI-PROMPT-GASDESIGNS-0926
**Repo:** `logiagenesis/gas_designs` · **Branch:** `claude/tender-cori-3p8u59`
**Date:** 2026-09-22

---

## 1. What changed

The Next.js / React / Tailwind application is gone. The site is now plain HTML,
CSS and vanilla JavaScript, built by Vite.

### Removed
| Item | Detail |
| --- | --- |
| React application | 22 components, 12 route files, the API route, the lib and data layers |
| Inline SVG illustrations | All eleven — the hero valve scene, the soundness-test gauge card, the nine hand-drawn service icons, the drawn logo, the quarter-turn confirmation graphic, the 404 valve, and the lever-shaped arrows and bullets |
| Brand generators | Five scripts and every asset they produced: the logo in four variants, the favicon set, the OG card |
| Scaffold leftovers | `file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg` — one of which was serving a Vercel logo on the live preview |
| Exposing documents | `missing-client-info.md`, `dp-energies-difference-audit.md`, `self-audit-02-post-build.md`, plus the stale docs describing the rejected design |
| Homepage sections | Sectors, Process, and the "SECTORS / WORK / SERVICE LINES / ENQUIRIES" label strip |
| Nine service detail pages | Brief §3.1 routes the tiles to the enquiry form instead |
| GitHub Pages workflow | Built a Next.js app that no longer exists; would have failed on every push |

**Inline SVG remaining: five instances of one 24px hamburger icon.** Permitted by
§4.3 (UI icons under 32px). Zero illustrations.

### Structure now
`index.html` — header, hero, nine service tiles, compliance, about, enquiry form,
footer. Supporting pages: `/privacy-policy/`, `/terms/`, `/thank-you/`, `404.html`.

### Copy
Every word is new. Hero, services intro, compliance, about, contact and the
footer line use the brief's §6 replacement copy **verbatim**. The nine service
descriptions were written to match: two plain sentences each, every sentence
under 22 words, no metaphors and no fragments as headings.

**Service 6 is renamed "Certificates of Conformity"** and that term is used
throughout — tile, dropdown, compliance body and schema. Zero occurrences of
"Certificate of Compliance" remain in the built output.

### Visual
| | Before | Now |
| --- | --- | --- |
| Background | `#16181B` | `#121212` / `#1A1A1A` |
| Surface | `#22262B` | `#222222` |
| Text | `#F2F0EA` | `#F2F2F2` |
| Secondary text | `#D8D3C5` | `#C4C4C4` |
| Accent | `#FFC400` | `#F5B400` |
| Typefaces | Space Grotesk + Inter + JetBrains Mono | Inter only, self-hosted |
| Body size | 16px | 17px desktop / 16px mobile |
| Smallest text | 12px | **14px** |

Sections 96px desktop and 64px mobile, content capped at 1200px, header fixed at
72px. No rulers, gauges, rings, dashed circles or gradients.

### Two audit defects fixed
1. **Contrast.** Error red moved from `#C2342B` (3.24:1 — below AA) to `#FF8A80`
   (8.21:1).
2. **Font loading.** The three brand fonts never applied: `--font-display` was
   declared on `:root` by Tailwind's theme while `next/font` defined the
   variables on `<body>`. Gone with the framework that caused it.

---

## 2. Dependencies

| Package | Type | Why |
| --- | --- | --- |
| `vite` ^7.1.5 | dev | Build and dev server |
| `sharp` ^0.35.4 | dev | Build-time image compression |
| `@fontsource-variable/inter` ^5.2.8 | runtime | Self-hosted Inter |

Three packages, 15 including transitives. Nothing ships to the browser except
the CSS, one 4.85 kB JS file and the font.

Inter is self-hosted rather than loaded from Google Fonts: it removes a
render-blocking third-party request and eliminates font-swap layout shift. The
package declares all seven scripts with `unicode-range`, so a visitor downloads
only the Latin subset — about 48 kB, not the 218 kB in `dist/`.

---

## 3. The form — two hosts, two paths

The brief's hosting target is cPanel/Apache. The review preview is Cloudflare
Pages, which does not run PHP. Both are handled.

### Production — cPanel/Apache
**Endpoint: `POST /send.php`** (source: `public/send.php`, deployed to the web
root).

- Server-side validation of all eight fields, independent of the browser.
- Honeypot: a filled `website` field returns an ordinary success and sends
  nothing, so a bot learns nothing.
- Header-injection guard: CR/LF stripped from every value used in a mail header.
- File-based throttle: 5 submissions per IP per 10 minutes.
- Delivers via `mail()` to `MAIL_TO`, with `Reply-To` set to the enquirer.

**Before go-live, edit the three constants at the top of `public/send.php`:**
```php
const MAIL_TO   = 'pierre@gasdesigns.co.za';   // where enquiries land
const MAIL_FROM = 'website@gasdesigns.co.za';  // MUST be on the hosting domain
```
`MAIL_FROM` must be an address on the account's own domain. Shared hosts reject
or spam-bin mail claiming to come from elsewhere. The mailbox does not need to
exist, but the domain must match.

### Preview — Cloudflare Pages
`/send.php` is served as a static file and never executes, so the POST fails.
The browser detects this and shows:

> We could not send that from the website. **Send it by email instead** and it
> will reach us.

The link is a `mailto:` with every field already filled in — name, phone, email,
area, property type, service and message — addressed to
`pierre@gasdesigns.co.za`. **Verified working.** An enquiry is never lost on
either host.

---

## 4. Deployment

### Cloudflare Pages (preview)
| Setting | Value |
| --- | --- |
| Build command | `npm run build` |
| Output directory | `dist` |
| Node version | 20 (pinned in `.node-version`) |
| Framework preset | None |

Committed for this host: `public/_headers` (security headers, cache policy) and
`public/_redirects` (apex → www on the live domain).

### cPanel / Apache (production)
Upload the contents of `dist/` to `public_html/`. `public/.htaccess` is copied
into the build and provides HTTPS forcing, apex → www, clean URLs, the 404
document, security headers, caching and compression.

Two lines are commented out until the SSL certificate is installed: the HTTPS
redirect block and `Strict-Transport-Security`. Enable both once HTTPS is
confirmed.

---

## 5. `[CLIENT TO CONFIRM]` placeholders — 5, with locations

| # | File | Line | Placeholder |
| --- | --- | --- | --- |
| 1 | `index.html` | 367 | Compliance footnote — **registration body and number** |
| 2 | `index.html` | 418 | Contact intro — **response time** ("within one working day") |
| 3 | `thank-you/index.html` | 74 | Confirmation — **response time** |
| 4 | `privacy-policy/index.html` | 75 | **Company registration details** |
| 5 | `terms/index.html` | 75 | **Company registration details** |

Also outstanding, and **not** guessed anywhere on the site:

| Field | State |
| --- | --- |
| Telephone number | **MISSING** — no phone appears on the site or in the schema |
| Physical address | **MISSING** — omitted from LocalBusiness schema |
| SAQCC Gas registration | **MISSING** |
| LPGSA membership | **MISSING** |
| Company / VAT registration | **MISSING** |
| Years in operation, team size | **MISSING** — omitted from About, as the brief directs |
| Opening hours | **MISSING** |
| GTM container ID | Placeholder `GTM-XXXXXXX`; the snippet self-disables until replaced |

**"Gauteng" and "a registered gas installer" come from the brief's §6 copy**, not
from the repository. They are used verbatim as instructed. The registration body
and number remain `[CLIENT TO CONFIRM]`.

---

## 6. Image slots — 15 expected, 0 present

**No photographs have been uploaded.** Every slot renders a labelled placeholder
naming the file it expects.

| # | Section | Expected file | Present? |
| --- | --- | --- | --- |
| 1 | Hero | `assets/img/hero.jpg` | No |
| 2 | Tile 1 — Residential Gas Installations | `assets/img/service-01.jpg` | No |
| 3 | Tile 2 — Commercial Kitchen Gas Systems | `assets/img/service-02.jpg` | No |
| 4 | Tile 3 — Industrial Gas Installations & Maintenance | `assets/img/service-03.jpg` | No |
| 5 | Tile 4 — Bulk LPG Installations | `assets/img/service-04.jpg` | No |
| 6 | Tile 5 — Custom Projects & Developments | `assets/img/service-05.jpg` | No |
| 7 | Tile 6 — Certificates of Conformity | `assets/img/service-06.jpg` | No |
| 8 | Tile 7 — Gas System Maintenance | `assets/img/service-07.jpg` | No |
| 9 | Tile 8 — Gas Leak Detection & Emergency Repairs | `assets/img/service-08.jpg` | No |
| 10 | Tile 9 — Basic Electrical & Gas System Support | `assets/img/service-09.jpg` | No |
| 11 | Compliance | `assets/img/compliance.jpg` | No |
| 12 | About | `assets/img/about.jpg` | No |
| 13 | Contact | `assets/img/contact.jpg` | No |
| 14 | Open Graph | `assets/img/og-image.jpg` | **No — not in the Drive folder either** |
| 15 | Logo (header + footer) | `assets/brand/gasdesigns-logo.svg` | **No — not in the Drive folder either** |

Thirteen of the fifteen are in the shared Drive folder. **They could not be
fetched:** the build sandbox's egress proxy refuses `drive.google.com`,
`drive.usercontent.google.com`, `lh3.googleusercontent.com` and
`www.googleapis.com`. The only remaining route returns files as base64 through
the conversation, and 38 MB of base64 is not viable. They need uploading to the
branch directly.

**Two things only the client can verify:** the photographs' filename-to-subject
match is unchecked — nothing in the build can tell whether `service-04.jpg`
actually shows bulk LPG. And `service-06.jpg` was produced while service 6 was
still called "Certificates of Compliance".

### Build-time optimisation
`scripts/optimise-images.mjs` runs after Vite. For each photograph present it
writes a resized, compressed JPEG over the copy in `dist/` and a WebP sibling
that the `<picture>` elements prefer. **Originals stay in `public/` as source and
never ship.** Missing files are not an error.

Expect roughly 2.9 MB to fall to 150–250 kB per image. Until they are uploaded,
performance figures below do not reflect their weight.

---

## 7. Phase C QA results

### 7.1 Contrast — all pass
`npm run check:contrast`

| Pair | Size | Ratio | Verdict |
| --- | --- | --- | --- |
| `#F2F2F2` on `#121212` | 17px | 16.73:1 | PASS |
| `#F2F2F2` on `#1A1A1A` | 17px | 15.55:1 | PASS |
| `#F2F2F2` on `#222222` | 17px | 14.21:1 | PASS |
| `#C4C4C4` on `#121212` | 17px | 10.74:1 | PASS |
| `#C4C4C4` on `#1A1A1A` | 17px | 9.98:1 | PASS |
| `#C4C4C4` on `#222222` | 17px | 9.12:1 | PASS |
| `#F5B400` on `#121212` | 14px | 10.18:1 | PASS |
| `#F5B400` on `#1A1A1A` | 14px | 9.46:1 | PASS |
| `#F5B400` on `#222222` | 14px | 8.65:1 | PASS |
| `#FF8A80` on `#121212` | 15px | 8.21:1 | PASS |
| `#FF8A80` on `#1A1A1A` | 15px | 7.62:1 | PASS |
| `#FF8A80` on `#222222` | 15px | 6.97:1 | PASS |
| `#121212` on `#F5B400` (button) | 16px | 10.18:1 | PASS |

**13 of 13 pass WCAG AA.** Smallest rendered text anywhere: **14px**.

### 7.2 Banned-phrase grep on `dist/` — all zero
`A passing test is a flat line` · `Nine, from domestic hobs to bulk LPG` ·
`Answered by email, direct` · `Gas work is judged on what happens after everyone
leaves` · `This is an illustration of the method` · `anything beyond an
appliance swap` · `Precision Gas Systems` · `Built for Safety` · `This line is
closed` · `Certificate of Compliance` · `DP Energies` · `lorem` · `illustration`
· `TODO` — **0 occurrences each.**

### 7.3 Inline SVG
Five instances of one 24px hamburger. **Zero illustrations.**

### 7.4 Structure
| Check | Result |
| --- | --- |
| `<h1>` per page | 1 |
| Skipped heading levels | None |
| Service tiles | 9 |
| Grid at 1440px | 3 columns × 3 rows |
| Header height | 72px |
| Image slots rendering | 13 of 13 |
| Console errors | None, apart from the missing-photo 404s |
| Horizontal overflow at 360 / 768 / 1024 / 1440 | **None** |

### 7.5 Lighthouse

**Mobile** (Moto G4, 4G, 4× CPU throttle)

| Page | Perf | A11y | Best Practices | SEO | LCP | CLS | TBT |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `/` | **100** | **100** | 96 | **100** | 1.7 s | 0 | 0 ms |
| `/privacy-policy/` | **100** | **100** | 96 | **100** | 1.5 s | 0 | 0 ms |
| `/terms/` | **100** | **100** | 96 | **100** | 1.4 s | 0.018 | 0 ms |
| `/thank-you/` | **100** | **100** | 96 | 69 ¹ | 1.3 s | 0.006 | 0 ms |

**Desktop `/`** — **100 / 100 / 96 / 100**, LCP 0.4 s, CLS 0.001, TBT 0 ms.

All four targets met (Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95,
SEO ≥ 95).

Best Practices is 96 rather than 100 for exactly one reason: `errors-in-console`,
caused by the fifteen missing photographs 404-ing. **It becomes 100 once the
images are uploaded.**

¹ `/thank-you/` scores 69 on SEO because it is deliberately `noindex`. Correct
for a confirmation page.

### 7.6 Screenshots
18 files in `/qa/` — every page at 360px and 1440px, plus each homepage section
at both widths.

---

## 8. Not done, and why

| Item | Why |
| --- | --- |
| Photographs in the build | Cannot be fetched from Drive; the proxy blocks every Google file host |
| Logo, favicon set, OG image | No logo file supplied. The brief forbids drawing one, so the header and footer show a marked text slot |
| `LocalBusiness` telephone and address | Neither confirmed. Emitting `[CLIENT TO CONFIRM]` inside structured data is invalid and Google flags it, so the fields are omitted and everything else is real |
| FAQ section | Not in the §3.1 structure. Dropped, and its `FAQPage` schema with it. Say the word and it comes back |
| GA4 measurement ID | Not in the repo. GTM placeholder only, as §3.4 requires |
| Legal review | Both legal pages carry a visible notice that no practitioner has reviewed them |

---

## 9. To go live

1. Upload the 13 photographs to `public/assets/img/` on this branch.
2. Supply `gasdesigns-logo.svg` → `public/assets/brand/`, and `og-image.jpg`.
3. Answer the five `[CLIENT TO CONFIRM]` items in §5.
4. Replace `GTM-XXXXXXX` in all five HTML files with the real container ID.
5. Set `MAIL_TO` and `MAIL_FROM` in `public/send.php`.
6. Deploy `dist/` to cPanel, then uncomment the HTTPS and HSTS lines in
   `.htaccess`.
7. Have a legal practitioner review the privacy policy and terms.
