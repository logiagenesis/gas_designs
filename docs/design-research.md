# Design Research

## Status: BLOCKED — no web access

**No design sources were reviewed, because none could be fetched.** No article,
video, podcast or set of official notes was opened. There is therefore no source
list below, and no claim anywhere in this build that anything was read, watched
or listened to.

---

## What the brief asked for

> Audit 40 design/logo/UI/UX sources. A source counts only if its URL, article,
> video transcript, podcast transcript, or official notes were successfully
> fetched.
>
> No fake "watched", "listened", or "reviewed" claims.

---

## What was attempted

The same environment-wide egress block that prevented the competitor audit
prevented this one. Every external host tested returned `EGRESS_BLOCKED`,
including a neutral control host unrelated to design. See
`docs/competitor-audit.md` for the attempt log and proxy state.

No design publication, case-study library, video transcript or design-system
documentation site was reachable. Zero of forty.

---

## What the design decisions were based on instead

Since the research could not be done, it is worth being explicit about what
*did* drive the design, so the client can judge it on its merits rather than on
an appeal to sources that were never opened.

**1. The brief itself.** The palette, the type scale, the motif, the hero
composition, the 3 × 3 grid and the interaction rules were all specified in
detail. Most of what a design audit would have informed was already decided.

**2. The subject matter.** A quarter-turn valve has a real geometry — a circular
body, a lever on a centre pivot, a quarter of a turn between open and shut. The
mark, the icons, the section dividers, the CTA arrows and the enquiry
confirmation all derive from that one object rather than from a visual trend.

**3. Constraints that force honesty.** No stock photography, no fabricated
projects and no invented statistics removed the usual decoration. What remains
has to carry the page on typography, spacing, contrast and a single accent
colour. That is a harder brief and a better one.

**4. Measurement rather than taste, wherever possible.** Every claim about the
design that could be tested, was:

| Question | How it was settled |
| --- | --- |
| Does the mark work at 16px? | Rasterised at exactly 16 × 16 and inspected |
| Does it work in one colour, on both grounds? | Rendered on carbon and on warm white |
| Is the grid exactly 3 × 3 at 1024px+? | Measured card bounding boxes at 1024, 1280, 1440 and 1920 |
| Are card heights equal? | Measured; all identical |
| Is the tilt within 6°? | Read back the computed custom properties: 2.40° / −3.00° |
| Does reduced motion disable it? | Re-measured under `prefers-reduced-motion`: all zeroed |
| Any horizontal scroll? | Checked 8 pages × 7 widths; none |
| Is contrast sufficient? | Lighthouse; the one failure found was fixed |
| Does it perform? | Lighthouse: 91–100 performance, 100 accessibility |

That evidence is in `docs/self-audit-02-post-build.md`.

---

## What was lost

Real design research would have contributed things this build has had to do
without:

- A read on what the South African trade-services category currently looks like,
  and therefore what would read as premium *versus* merely dark.
- Reference points for the industrial/technical aesthetic beyond first principles.
- Evidence on conversion patterns for high-consideration trade enquiries: how
  much detail to ask for before a quote, where the form belongs, whether a phone
  number outperforms a form in this category.
- Accessibility patterns for pointer-tilt interactions from people who have
  tested them with real users rather than with an emulator.

The last one is the gap that would most change the build. The tilt, fold and
specular-edge treatment on the service cards is implemented carefully — pointer
only, reduced-motion safe, never gating content — but "implemented carefully" is
not the same as "tested with people who find motion difficult".

---

## To complete this properly

1. Fetch 40 sources across: logo construction and geometry, industrial and
   technical brand systems, dark-interface design, type scale and hierarchy,
   accessible motion, conversion patterns for trade services, and structured data
   for local service businesses.
2. For each record: name · URL · what was actually fetched · topic · visual style
   · SEO and headline observations if applicable · weakness · Gas Designs
   counter-move.
3. Record only sources actually opened. A source that 404s, paywalls or times out
   does not count, and should be listed as such.
