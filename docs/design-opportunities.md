# Design Opportunities

Written from the build itself rather than from a competitor scan — the audit was
blocked, see `docs/competitor-audit.md`. These are the decisions that were taken,
why, and what is still on the table.

---

## Taken

### 1. A valve, not a flame
The single most crowded symbol in this trade is a flame. A quarter-turn valve
says control, isolation and safety — which is what the service actually is — and
nobody else in the category owns it. The mark's whole idea is that the G's
crossbar *is* the lever, so one form does two jobs and the logo still resolves at
16px.

### 2. One motif, everywhere
Logo, hero scene, nine service icons, list bullets, CTA arrows, favicon, OG card
and the enquiry confirmation all derive from the same object. The confirmation
state is the pay-off: on a successful enquiry the lever completes its quarter
turn. It costs nothing, it is unmistakably this brand, and it is the only moment
on the site where the mark animates.

### 3. Evidence instead of adjectives
Every competitor in a compliance-driven trade says "professional", "reliable",
"trusted". Those words are free, so they are worthless. This site says what
actually happens: size the supply for the real connected load, put isolation
where someone can reach it under pressure, pressure test before handover, write
down the result. Specifics are expensive to fake, which is exactly why they
persuade.

### 4. The honesty is the differentiator
The unconfirmed-facts constraint looked like a limitation and turned into the
positioning. A page that says *"this is an illustration of the method, not a
photograph of a job"* and *"this page describes the work, not a quotation"* reads
as a business that is careful — which is the only quality that matters when
someone is choosing who to let near their gas.

### 5. An abstract standards visual instead of a fake gallery
No project photography was supplied. Rather than leave a hole or invent a
gallery, the safety section carries a pressure gauge and a soundness-test trace
that holds flat. A passing test *is* a flat line — the illustration teaches
something true about the work, and it is labelled as an illustration.

### 6. Restraint in the interaction
Cards tilt to a maximum of 6°, lift 4px, and light a cursor-tracked yellow edge.
No bounce, no scale, no shadow explosion. The effect reads as precision-engineered
rather than playful, which is the right register for gas.

### 7. Measured, not asserted
Every design claim that could be tested was tested — 16px legibility, one-colour
rendering, exact grid geometry at four widths, tilt angles, reduced-motion
behaviour, horizontal scroll at seven widths, contrast, Lighthouse. Findings and
fixes are in `docs/self-audit-02-post-build.md`.

---

## Available, in order of value

### 1. Real project photography — by a distance
The site is built to hold it: the safety section, the service pages and the
sectors grid all have natural places for it. Five or six honest photographs of
finished work would do more for conversion than any further design change. What
to shoot is listed in `docs/missing-client-info.md` §5.

### 2. Confirm the service area, then go local
Gas installation is a local-intent category. With a confirmed area the site can
emit `LocalBusiness` and `ContactPoint` schema, rank for geographic modifiers,
enter the map pack and support a Google Business Profile. Nothing else on the
list moves rankings as much.

### 3. A named person on the About page
Small technical businesses are chosen on the competence of a specific human. The
About page is capability copy because no biography was supplied; a named person
with a real background would strengthen it considerably.

### 4. A downloadable pre-visit checklist
"What to have ready before your gas quote" as a one-page PDF. Genuinely useful,
qualifies enquiries before they arrive, earns links, and costs an afternoon.

### 5. Per-sector landing pages
`/services/commercial-kitchen-gas-systems` could support pages for restaurants,
guest houses and school kitchens — same service, different language and different
search terms. Only worth doing once there is real work to point at.

### 6. A compliance explainer
The CoC questions in the FAQ are the ones people actually search. A fuller
explainer — what a certificate covers, when it is needed, what makes one invalid
— would rank and would earn links. It needs Pierre's confirmation on which
standards to cite by name.

---

## Considered and rejected

| Idea | Why not |
| --- | --- |
| Hero background video | Payload cost, no honest footage available, and the brief bans it |
| Photographic hero | No real photography; stock would undo the whole positioning |
| Pricing table | No pricing confirmed; a wrong price is worse than none |
| Testimonials section | None supplied. Fabricating them is out of the question |
| Client logo wall | No client permissions |
| Live chat widget | Third-party script, cookie and performance cost, and nobody confirmed there is someone to staff it |
| Light mode toggle | Banned by the brief, and the brand is a dark system |
| Three.js hero | Banned by the brief, and the CSS/SVG scene achieves the depth for a fraction of the payload |
| Counting statistics ("500+ installs") | Fabrication |
| Trust badges | No verified credentials to display |
