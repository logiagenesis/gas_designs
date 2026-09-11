# DP Energies Difference Audit

DP Energies was named in the brief as a **service-category reference only**.
Its wording, layout, structure, metadata, visual style, CTAs, project
descriptions and sentence patterns were not to be copied.

---

## 1. The strongest fact in this audit

**No DP Energies content was ever fetched.**

`https://dp-energies.co.za/` returned `EGRESS_BLOCKED` from the environment's
network proxy, as did every other external host tested (see
`docs/competitor-audit.md` for the attempt log and the neutral control test).

This matters more than any comparison table below. There was no DP Energies text
in the build environment at any point, so there was nothing for a phrase, a
heading or a sentence rhythm to be copied *from*. Every word on this site was
written from the nine service categories in the brief.

What the block cost: there is no way to verify non-duplication by direct
comparison. The controls below are therefore preventive and were enforced against
the built source, not against DP Energies' actual pages.

---

## 2. Banned phrases — enforced by grep against the built source

| Phrase | Occurrences in rendered copy |
| --- | --- |
| "formerly DP Energies" | 0 |
| "DP Energies" | 0 |
| "same team" | 0 |
| "same projects" | 0 |
| "combined experience" | 0 |
| "Book Free Inspection" | 0 |

The string "DP Energies" appears **nowhere** in rendered copy, in the server HTML
of any page, or in any client JavaScript bundle.

It appears in exactly two places, both of them internal: this document, and
`docs/missing-client-info.md`, where it records *why* the shared phone number is
withheld. An earlier revision carried that explanation as a string inside
`src/lib/site-config.ts`; because that module is imported by client components,
the note was being compiled into the public JavaScript bundle. It was found
during the post-build audit and moved into code comments, which the bundler
strips. Verified at 0 occurrences across all chunks and all page HTML.

---

## 3. Services not assumed

The brief warns that DP Energies lists these in its footer. None has been treated
as a Gas Designs service and none appears anywhere on this site:

- Bulk diesel
- Industrial gas supply
- Nitrogen, CO₂, argon
- Tank revalidation
- Specialty gas supply

Where a reader might reasonably infer one, it is explicitly ruled out in the
service's `needsConfirmation` list — for example, Bulk LPG carries *"whether tank
revalidation is offered — not assumed here"*, and Industrial carries *"whether
industrial gas supply (N2, CO2, argon) is offered — not assumed here"*. Those
notes live in the source for the client's review and are not published.

Exactly nine services exist, and they are the nine named in the brief. The count
is enforced by a TypeScript nine-tuple, so adding a tenth is a compile error.

---

## 4. Structural differences

Because DP Energies' structure was never seen, these are stated as *what this
site is*, not as *how it differs from theirs*:

| Aspect | Gas Designs |
| --- | --- |
| Routes | `/`, `/services`, nine `/services/[slug]` pages, `/about`, `/contact`, `/contact/sent`, `/privacy-policy`, `/terms`, custom 404 |
| Homepage order | Hero · scope strip · 9-service grid · sectors · process · safety and compliance · FAQ · contact form |
| Service pages | Intro · what the work covers · a "before you book" caveat · sticky enquiry form pre-set to that service · three related services |
| Navigation | Services · About · Contact, plus one primary CTA |
| Contact | Full form: 9-service dropdown, site type, urgency, POPIA consent, honeypot, UTM capture |
| Confirmation | Dedicated `/contact/sent`, `noindex`, with the valve completing its quarter turn |

---

## 5. Visual differences

| Aspect | Gas Designs |
| --- | --- |
| Palette | Carbon `#16181B` ground, warm white `#F2F0EA` type, a single signal yellow `#FFC400` accent. No corporate blue, no copper, no chrome |
| Logo | Hand-built flat SVG: a capital G as a quarter-turn valve body, the lever doubling as the crossbar. No flame |
| Imagery | Zero photographs. Zero raster art. Inline SVG and CSS only |
| Hero | Abstract valve manifold with a reflective floor plane, drawn in SVG. No stock image, no video, no WebGL |
| Icons | Nine hand-drawn SVGs sharing one grammar. No icon library |
| Proof | An abstract soundness-test illustration, labelled as an illustration, in place of a project gallery |
| Motion | One entrance, ≤6° pointer tilt, fully disabled under `prefers-reduced-motion` |

---

## 6. Metadata differences

Every title and description was written for this site and is unique per page —
verified: 8 unique titles and 8 unique descriptions across 8 sampled routes.

Structured data is deliberately conservative: `Organization`, `FAQPage`,
`ItemList`, `Service` and `BreadcrumbList` only. **`LocalBusiness` and
`ContactPoint` are not emitted**, because both require a confirmed address, area
served and telephone number. Empty NAP schema is worse than none — it asserts to
a search engine that the entity has no location.

---

## 7. Risk notes

| # | Risk | Assessment |
| --- | --- | --- |
| 1 | Accidental phrase duplication | Low. Nothing was fetched, so there was no source text to echo. Cannot be verified by direct comparison until someone with web access diffs the two sites. |
| 2 | Shared phone number conflating the two businesses in Google's eyes | **Live and unresolved.** Mitigated only by the number being unpublished. It is the first item in `docs/missing-client-info.md` and needs Pierre's decision before launch. |
| 3 | Overlapping service categories | Inherent and unavoidable — two gas companies offer gas services. Differentiation rests on voice, structure and visual system, all of which are independent here. |
| 4 | Someone later pasting DP Energies copy in | Mitigated by this document, by the `needsConfirmation` notes in the source, and by the banned-phrase list above being greppable in CI if the client wants it enforced. |
| 5 | A reader inferring a relationship between the businesses | The site makes no reference of any kind to DP Energies. No "formerly", no shared history, no shared projects. |

---

## 8. To verify properly

On a machine with web access, before launch:

1. Fetch DP Energies and diff its headings, CTA labels, service descriptions and
   meta titles against this site's.
2. Run a plagiarism check across both sites' rendered text.
3. Confirm the phone number question is settled — it is the one real entity-level
   overlap, and it is the one this build could not resolve on its own.
