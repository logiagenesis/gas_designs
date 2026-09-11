# SEO Strategy

## Status note

The competitor and keyword research the brief asked for could not be done — all
outbound page fetches were blocked by the environment's network proxy
(`docs/competitor-audit.md`). **There is therefore no search-volume data, no
difficulty scoring and no competitor SERP analysis in this document.** What
follows is the technical SEO that was actually implemented and verified, plus the
content strategy that follows from the confirmed service list.

No keyword is listed below with an invented volume figure.

---

## 1. Implemented and verified

| Item | Status | Evidence |
| --- | --- | --- |
| Unique `<title>` per page | Done | 8 unique across 8 sampled routes |
| Unique meta description per page | Done | 8 unique across 8 sampled routes |
| Canonical URL on every page | Done | Verified present on all sampled routes |
| Open Graph, including image | Done | `og.png` 1200 × 630 on every page |
| Twitter card | Done | `summary_large_image` on every page |
| `robots.txt` | Done | Allows all, disallows `/api/` and `/contact/sent`, declares sitemap and host |
| `sitemap.xml` | Done | 15 URLs: 6 static + 9 services. `/contact/sent` excluded |
| One `<h1>` per page, no skipped levels | Done | Verified on 7 routes |
| Breadcrumbs | Done | On `/services` and all nine service pages |
| `BreadcrumbList` schema | Done | On `/services` and all service pages |
| `Service` schema | Done | On all nine service pages |
| `FAQPage` schema | Done | Homepage, six questions |
| `Organization` schema | Done | Homepage |
| `ItemList` schema | Done | `/services` |
| `LocalBusiness` schema | **Withheld** | Requires confirmed address and area — see below |
| `ContactPoint` schema | **Withheld** | Requires a confirmed telephone number |
| Google Search Console verification | Conditional | Emitted only when `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` is set |
| Mobile Lighthouse SEO score | 100 | On `/`, `/services`, a service page, `/contact`, `/about` |
| Core Web Vitals | CLS 0 · LCP 1.5–3.4s · TBT 60–120ms | Mobile emulation |

### Why LocalBusiness is deliberately absent

It requires an address, an area served and a telephone number. None is confirmed.
The brief bans empty NAP schema, and it is right to: an empty `address` or a
blank `telephone` actively tells a search engine the entity has no location,
which is worse than staying silent.

The gate is a single constant, `CAN_EMIT_LOCAL_BUSINESS_SCHEMA` in
`src/lib/site-config.ts`. Confirm the phone and the area, flip the gates, and the
schema appears without touching a page.

---

## 2. Keyword themes

Mapped to pages. Used naturally in headings, intros and body copy — no stuffing,
no exact-match repetition, no doorway pages.

| Theme | Primary page |
| --- | --- |
| gas installations | `/` and `/services` |
| residential gas installation | `/services/residential-gas-installations` |
| LPG installations | `/services/residential-gas-installations`, `/services/bulk-lpg-installations` |
| natural gas installations | `/services/industrial-gas-installations-maintenance` |
| gas COC / gas certificate of compliance | `/services/certificates-of-compliance` |
| gas leak detection | `/services/gas-leak-detection-emergency-repairs` |
| commercial kitchen gas installation | `/services/commercial-kitchen-gas-systems` |
| industrial gas installation | `/services/industrial-gas-installations-maintenance` |
| bulk LPG installation | `/services/bulk-lpg-installations` |
| gas maintenance | `/services/gas-system-maintenance` |
| gas safety inspections | `/services/gas-system-maintenance`, homepage FAQ |

Each service page owns exactly one primary theme, so the nine pages do not
compete with each other.

---

## 3. The blocker: no geography

**This is the single biggest constraint on the site's search performance, and it
is a data problem rather than a build problem.**

Gas installation is a local-intent category. Real queries carry a place —
"gas installer near me", "gas COC Pretoria", "LPG installation Cape Town". With
no confirmed service area the site cannot:

- emit `LocalBusiness` or `ContactPoint` structured data;
- name a town, suburb or province anywhere in copy, title or heading;
- rank for any geographic modifier;
- appear in the local map pack;
- support a Google Business Profile, which is usually the highest-converting
  surface in this category.

Everything else here is competitive. This one gap holds it back, and it is
answered by a single question to the client.

**When the area is confirmed**, in order:

1. Flip the gates in `site-config.ts`; `LocalBusiness` and `ContactPoint` appear.
2. Add the area naturally to the homepage H1 area, the About page and service
   page intros. Naturally — not "gas installation Johannesburg Pretoria Sandton".
3. Create and verify a Google Business Profile with an exactly matching NAP.
4. Only then consider per-area landing pages, and only for areas with real work
   behind them.

---

## 4. Internal linking

- Header: Services, About, Contact on every page.
- Footer: all nine services plus company and legal links, on every page.
- Homepage: nine service cards link to their pages.
- Service pages: breadcrumbs up, three related services across.
- 404: full nine-service list, so a lost visitor lands somewhere useful.

Every service page is reachable in one click from anywhere on the site.

---

## 5. Technical foundation

- Static generation for all 24 routes; only `/api/contact` is dynamic.
- Fonts self-hosted at build time by `next/font` — no render-blocking
  third-party stylesheet, no layout shift. CLS is 0 on every page measured.
- No images at all beyond the OG card, so no image-weight or `alt` debt.
- First Load JS: 153 kB homepage, 103 kB shared. The contact form is code-split
  on the homepage, where it sits far below the fold.
- Security headers set; `X-Powered-By` removed.
- Analytics load only when configured, so an unconfigured site ships zero
  third-party JavaScript.

---

## 6. Launch checklist

1. Set `NEXT_PUBLIC_SITE_URL` to the production origin.
2. Set `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`, then verify in Search Console.
3. Submit `https://www.gasdesigns.co.za/sitemap.xml`.
4. Decide `www` versus apex and 301 one to the other.
5. Confirm HTTPS and that HSTS is acceptable — it is preloaded at two years.
6. **Resolve the phone number question** (`docs/missing-client-info.md` §1).
7. **Confirm the service area**, then do §3 above.
8. Re-run Lighthouse against production.
9. Set up Search Console performance monitoring for the eleven themes in §2.

---

## 7. Explicitly not done

- No keyword stuffing, no hidden text, no doorway pages.
- No fabricated review or rating schema.
- No `LocalBusiness` schema with empty fields.
- No location pages for areas the business has not confirmed it serves.
- No blog (banned by the brief), so no thin content farm.
