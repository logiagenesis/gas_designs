# Self-Audit 03 — Final

Written after the build checks were run. Numbers here are measured, not estimated.

---

## 1. Commands run

| Command | Result | Notes |
| --- | --- | --- |
| `npm run lint` | **PASS** — exit 0 | ESLint, `eslint-config-next`. One error found and fixed during the build: a raw `<a>` to an internal route |
| `npm run typecheck` | **PASS** — exit 0 | `tsc --noEmit`, strict |
| `npm run build` | **PASS** | Next 15.5.25. 24 routes, 9 service pages statically generated |
| `npm test` | **NOT RUN** | No test script exists — see §4 |
| `npm audit` | 2 advisories | Both transitive in `postcss` via `next`. See §5 |
| Playwright structural suite | **41 / 41 pass** | Drives real pages in Chromium; measures the DOM |
| Lighthouse (mobile) | Perf 91–99 · A11y 100 · BP 100 · SEO 100 | 9 routes |
| Lighthouse (desktop) | **100 / 100 / 100 / 100** | 7 routes |
| Horizontal-scroll sweep | **0 overflows** | 8 pages × 7 widths |
| Contact endpoint suite | **All cases correct** | Including a real SMTP delivery to a local sink |

### Build output

```
Route (app)                                    Size  First Load JS
┌ ○ /                                       43.3 kB         152 kB
├ ○ /about                                  1.68 kB         108 kB
├ ƒ /api/contact                              133 B         103 kB
├ ○ /contact                                1.14 kB         143 kB
├ ○ /contact/sent                            1.6 kB         108 kB
├ ○ /privacy-policy                         1.12 kB         104 kB
├ ○ /services                                824 B          110 kB
├ ● /services/[slug]                        1.15 kB         146 kB   (9 paths)
├ ○ /robots.txt · /sitemap.xml                133 B         103 kB
└ ○ /terms                                  1.12 kB         104 kB
+ First Load JS shared by all                               103 kB
```

Everything is static except `/api/contact`.

---

## 2. Failures found, and fixes applied

Eleven defects were found during the post-build audit. **All eleven were fixed**;
full detail in `docs/self-audit-02-post-build.md` §B.

| # | Failure | Severity | Fix |
| --- | --- | --- | --- |
| 1 | Internal review notes — including "DP Energies", "Do not publish" and the unconfirmed-claims list — were compiled into the public JavaScript bundle and the server-rendered HTML | **High** | Split the data boundary: `service-titles.ts` and `service-view.ts` for anything crossing into client components; `site-config` notes moved into code comments, which the bundler strips. Verified 0 occurrences |
| 2 | Honeypot returned 422 naming the trap field, teaching bots what caught them | **Medium** | Schema made permissive on that field; the trap is evaluated in the route and answered with an ordinary 200 |
| 3 | Body text at 3.77:1 failed WCAG AA contrast on 10 elements | **Medium** | `smoke` reclassified as a non-text token; tertiary text uses `valve-steel`, already in the palette. No palette colour changed. A11y 96–97 → 100 |
| 4 | OG card image silently dropped on 7 of 8 routes — Next does not deep-merge `openGraph` | **Medium** | All page metadata routed through `src/lib/metadata.ts` |
| 5 | Wordmark unreadable: squared `S` identical to `5`, squared `D` identical to `O`, malformed `A` | **Medium** | Letterforms rebuilt as stroked skeletons with real corner arcs, hooks on the `S`, flat apex on the `A`, and optical kerning |
| 6 | Heading level skipped (`h1` → `h3`) on `/services` | **Low** | `ServiceCard` takes a `headingLevel` prop |
| 7 | In-text link on `/terms` distinguished by colour alone | **Low** | Links in `Prose` underlined. A11y 96 → 100 |
| 8 | Stray white wedge beside the mark where the ring terminal peeked above the lever | **Low** | Valve opening starts at −6° so the terminal sits under the lever |
| 9 | Mark clipped at its own viewBox bounds | **Low** | 2 units of padding |
| 10 | Four service icons read as the wrong object (browser window, magnifier, aerial, power symbol) | **Low** | Redrawn as a folded drawing sheet, an open-jaw spanner, a switch driving a solenoid, and a dial with a needle |
| 11 | Unusable validation messages for absent fields | **Low** | Human message on every field for the missing case |

Plus: an ESLint error, a cramped sidebar form (now container-query driven), and
an OG background motif that muddied to olive.

---

## 3. Blocked — could not be completed

### 3.1 Competitor audit — 0 of 20

**All outbound page fetches were refused by the environment's network egress
proxy.** `dp-energies.co.za`, `gasdesigns.co.za`, `lpgas.co.za` and a neutral
control host all returned `EGRESS_BLOCKED`. The control test confirms the block is
environment-wide, not site-specific.

A web **search** tool was available and returned real listings, but the brief is
explicit that a source counts only if it was fetched — and *visual style*, *CTA
strategy* and *weakness* cannot be assessed from a snippet. **No competitor was
invented, and no "20 audited" claim is made.** See `docs/competitor-audit.md`.

### 3.2 Design research — 0 of 40

Same cause. **No source was opened, so no source is listed, and nothing in this
build claims anything was read, watched or reviewed.** What the design decisions
were based on instead is set out in `docs/design-research.md`.

### 3.3 `docs/logo-concept.png`

Not present on disk. A concept image was supplied in conversation and used as
visual reference. Where it differed from the brief's written construction rules —
the reference shows a dog-legged lever, the rules specify one running horizontally
from the centre pivot — **the written rules won**, because a single straight lever
survives the 16px and one-colour tests the brief makes mandatory. Recorded in
`docs/brand-guide.md`.

### 3.4 `npm test`

No test script exists; the brief asked for one to be run "if available". The
verification that *was* performed — 41 structural checks, Lighthouse on 9 routes,
a 56-combination overflow sweep, and a full contact-endpoint suite including real
SMTP delivery — is reproducible but lives outside the repository as scratch
scripts. Committing it as a Playwright suite is the obvious next step and is
listed in §7.

---

## 4. One deliberate deviation from the brief

**The candidate phone number is not written into `src/lib/site-config.ts`.**

The brief says to put unconfirmed facts there with `confirmed: false`. For every
other fact, that is exactly what was done. For this one, the literal was left out
and the number recorded in `docs/missing-client-info.md` instead.

Reason: `site-config.ts` is imported by client components, so any string in it is
compiled into the public JavaScript bundle **whether or not it is ever rendered**.
Writing the number there would have published it — to anyone who opened dev
tools — which is the precise thing the brief says must not happen until Pierre
confirms ownership.

The gate still exists and behaves identically (`phone: UNSET`, `confirmed: false`),
the number is still tracked, and publishing it is a two-line change. This was the
only way to honour the instruction's intent rather than only its letter. Audit
finding #1 above is the same class of bug, found in the other fields, and
confirms the concern was not hypothetical.

---

## 5. Known issues, accepted

| Item | Assessment |
| --- | --- |
| `npm audit`: 2 advisories (1 high, 1 moderate) in `postcss`, transitive via `next` | Build-time CSS tooling, not a runtime path. The only remedy offered is `next@16`, which contradicts the brief's Next 15 requirement. **Not taken.** Revisit when the client is ready for a major-version bump |
| No Content-Security-Policy header | Deliberate. Next needs nonce plumbing for its inline bootstrap, and the policy must widen for whichever tag manager is enabled. Shipping it broken or uselessly permissive is worse than a documented gap. Other security headers are set; `X-Powered-By` is removed |
| Rate limiting is per-process | Documented in source. A speed bump, not a guarantee — on serverless each instance keeps its own window. Move to a shared store if a hard limit is needed |
| `/contact/sent` scores 66 on Lighthouse SEO | Intended. `is-crawlable` fails because the page is deliberately `noindex` |
| ~50 KiB unused JS on first load | Framer Motion and React internals not needed for first paint. Homepage 152 kB First Load JS, performance 91 mobile / 100 desktop |

---

## 6. Missing client information

Nine categories, all documented in `docs/missing-client-info.md` and all hidden
from the site. The three that matter most:

1. **The phone number.** `+27 61 039 7034` is withheld — the brief records it as
   shared with DP Energies. Publishing a number that also advertises another gas
   company risks misrouted enquiries and entity conflation in Google.
2. **The service area.** This is the single largest constraint on search
   performance. Without it the site cannot emit `LocalBusiness` or `ContactPoint`
   schema, cannot name a town anywhere, cannot rank for geographic modifiers, and
   cannot support a Google Business Profile. Everything else is competitive; this
   one gap holds it back.
3. **SAQCC / LPGSA registration.** Until a number exists, the words "licensed",
   "registered", "accredited", "certified" and "insured" stay off the site
   entirely. On a gas safety site those words are load-bearing.

Also outstanding: 24/7 availability, physical address, opening hours, company
registration number, founder biography, years in business, real project
photography, Google Business Profile, social links, and the scope questions in
`docs/copywriter-pack.md` §10.

**Eleven live claims need Pierre's confirmation** — they describe method rather
than credentials, and they are the site's substitute for credentials, which makes
them load-bearing. Listed in `docs/copywriter-pack.md` §9.

---

## 7. Recommended next steps

1. Answer `docs/missing-client-info.md` §1 (phone) and §3 (service area). Those
   two unlock more than everything else combined.
2. Have a legal practitioner review `/privacy-policy` and `/terms`; both carry a
   visible notice saying they have not been.
3. Confirm or correct the eleven live claims in `docs/copywriter-pack.md` §9.
4. Commit the verification suite into the repo as Playwright tests with a
   `npm test` script.
5. Add a Content-Security-Policy once the tag-manager decision is made.
6. Photograph real completed work — the highest-value single addition.
7. On a machine with web access, complete the competitor and design audits, and
   diff this site's copy against DP Energies to close out risk note 1 in
   `docs/dp-energies-difference-audit.md`.
