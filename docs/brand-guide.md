# Gas Designs — Brand Guide

**Version 1 · 2025**
Everything here is generated from `scripts/brand-geometry.mjs` and
`scripts/brand-type.mjs`. Re-run `node scripts/build-brand.mjs` after any change
so the variants cannot drift apart.

---

## 1. The mark

The symbol is a heavy capital **G** drawn as the circular body of a front-facing
quarter-turn gas valve, opened at the upper right.

**The idea in one sentence: the G's crossbar is the valve's lever handle.** One
shape does both jobs. That is what makes the mark specific to this business
rather than a letter with a gas-related object parked next to it, and it is why
the mark survives at 16px — there are only two forms to resolve, a ring and a bar.

### Why a valve and not a flame

A flame is what gas does when something has gone right or gone wrong. A valve is
what a gas installer actually controls: the isolation point, the thing a person
reaches for in an emergency, the component that proves an installation is safe to
work on. It says *engineering and control*, where a flame says *combustion*.

A flame is also the single most crowded symbol in this category. Half the trade
uses one. The valve is ownable; the flame is not.

### Construction

All geometry lives on a 256 × 256 grid, centred on (128, 128).

| Element | Specification |
| --- | --- |
| Ring centreline radius | 74 |
| Ring stroke weight | 40 (outer edge 94, inner edge 54) |
| Valve opening | from −6° to 76°, measured counter-clockwise from 3 o'clock |
| Lever thickness | 30, fully rounded ends |
| Lever left cap | centred exactly on the pivot at (128, 128) |
| Lever tip | x = 246, i.e. 24 units past the ring's outer edge |
| Pivot bolt radius | 11 |
| Mark bounding box | 216 × 192, including 2 units of breathing room |

**Why the opening starts *below* the horizontal.** At any angle above the centre
line, a sliver of the ring peeks out over the lever and reads as a stray white
wedge floating beside the G. Starting at −6° tucks the arc's terminal completely
under the lever, so the ring appears to pass behind the handle and emerge below
it. This is not a detail to "tidy up" later — it is the difference between a
clean mark and one that looks like a mistake.

---

## 2. The wordmark

Exact text: **GASDESIGNS** — one word, uppercase, G-A-S-D-E-S-I-G-N-S.
`GAS` is set heavier than `DESIGNS`; both are warm white.

A wide, heavy, extended grotesque with squared curves, drawn as outlined vector
geometry rather than live text. Outlining is deliberate: a logo that depends on
a webfont renders differently, or not at all, wherever the font has not loaded.

Each glyph is a **stroked skeleton** — the centreline of the stroke, inset by
half the stem from the glyph box — so the stroke width supplies the weight. Two
things follow for free: every stem is exactly the same weight, and the two
weights differ only by stroke width.

| | `GAS` | `DESIGNS` |
| --- | --- | --- |
| Stem | 26 | 18 |
| Glyph box width | 76 | 72 |
| Tracking | 10 | 12 |

Cap height in the lockup is 96 — about half the ring's outer diameter, as
specified. The wordmark sits 54 units to the right of the lever tip, vertically
centred on the ring's centre line.

**Squared curves, not square corners.** An early version used 90° corners
throughout. It failed: a fully squared `S` is geometrically identical to a `5`,
and a fully squared `D` is identical to an `O`. The corners are real arcs, and
the `S` has hooks at both ends so it can never be misread. The `O` — which
appears only in supporting type, not in the wordmark — is chamfered to keep it
distinct from `D`.

Acute joins on `A`, `M`, `N` and `Y` bevel rather than spike: the miter limit is
2.2, and `A` has a flat apex. A pointed apex on a stem this heavy throws a miter
spike above the cap line and breaks the alignment.

---

## 3. Colour

| Role | Token | Hex |
| --- | --- | --- |
| Ring, pivot, wordmark | Warm white | `#F2F0EA` |
| Lever | Signal yellow | `#FFC400` |
| Primary background | Carbon | `#16181B` |
| Deeper background | Carbon 2 | `#0E0F11` |
| Panels | Graphite | `#22262B` |
| Body copy | Mist | `#D8D3C5` |
| Labels, tertiary text | Valve steel | `#9AA0A6` |
| Rules, borders, non-text | Smoke | `#6F747B` |

**Signal yellow appears once.** In the mark it is the lever and nothing else. In
the interface it is the primary call to action, the section label, and the single
accent inside each service icon. The moment a second element claims it, it stops
signalling anything.

**Smoke is a non-text token.** At `#6F747B` it reaches only 3.8:1 against carbon,
under the 4.5:1 needed for body copy, so it is reserved for rules, borders,
disabled states and decorative geometry. Tertiary text uses valve steel, which
clears 4.5:1 on every surface in this palette. Both colours are exactly as
specified in the brand brief; only their usage is constrained.

---

## 4. Files

| File | Contents | Use |
| --- | --- | --- |
| `public/brand/gas-designs-logo-full.svg` | Mark + wordmark, two colour, transparent | Default lockup on carbon or any dark ground |
| `public/brand/gas-designs-logo-mark.svg` | Symbol only, two colour, transparent | Avatars, app tiles, tight spaces |
| `public/brand/gas-designs-logo-light.svg` | Full lockup, one colour warm white | Dark or photographic backgrounds, single-colour print |
| `public/brand/gas-designs-logo-dark.svg` | Full lockup, one colour carbon | Light backgrounds, invoices, single-colour print |
| `public/brand/favicon.svg` | Mark on a carbon rounded square | Browser tabs |
| `public/og.png` | 1200 × 630 social card | Open Graph and Twitter |

"Light" and "dark" name **the logo's own colour**, not the background it sits on.
The light file is warm white and goes on dark grounds; the dark file is carbon
and goes on light grounds.

The in-page React component (`src/components/Logo.tsx`) draws the ring, pivot and
wordmark in `currentColor`, so the logo inherits the colour of whatever it sits
inside. The lever stays signal yellow unless `mono` is set.

---

## 5. Clear space

Keep clear on all four sides a margin equal to **the ring's stroke weight** — 40
units at master scale, or roughly 21% of the mark's height.

At a lockup height of 32px that is 6.6px of clear space. Nothing enters it: no
type, no rule, no photograph edge, no other logo.

---

## 6. Minimum sizes

| Asset | Minimum | Why |
| --- | --- | --- |
| Full lockup | **132px wide** | Below this the `DESIGNS` stem drops under 1px and the two weights merge into one |
| Mark alone | **16px** | Verified: the ring, the opening and the lever all resolve |
| Favicon | **16px** | Verified at true 16 × 16, not scaled down from a larger render |

Both 16px cases were checked by rasterising at exactly 16 × 16 and inspecting the
result, not by eyeballing a shrunken preview.

---

## 7. Backgrounds

| Background | Asset |
| --- | --- |
| Carbon `#16181B` or carbon 2 `#0E0F11` | Full colour lockup, or the light one-colour file |
| Graphite `#22262B` | Full colour lockup |
| Warm white `#F2F0EA` or white | Dark one-colour file |
| Photograph or busy texture | One-colour file only, on a solid held shape |

The mark needs a value contrast of at least 3:1 against whatever sits behind it.
Signal yellow on warm white does not meet that, which is why the light-background
version is one-colour carbon rather than the two-colour lockup.

---

## 8. One colour

Both one-colour files render the pivot bolt as a **knockout** — a transparent
hole through the lever — rather than as a same-colour disc that would disappear.
The bolt is what tells the eye the bar pivots, so it has to survive the colour
being removed.

Suitable for: single-colour print, embroidery, vehicle vinyl, engraving, fax-grade
reproduction, and any background too busy for two colours.

---

## 9. Favicon

`favicon.svg` places the mark on a carbon rounded square (56-unit radius on a
256 grid) with 30 units of padding. The held shape is deliberate: on a browser
tab the mark would otherwise sit on whatever colour the browser chrome happens to
be, and the warm-white ring disappears against a light tab strip.

Also generated, by filename convention, from the same source:
`src/app/icon.svg`, `src/app/apple-icon.png` (180 × 180) and `src/app/favicon.ico`
(32 × 32). Run `node scripts/generate-icons.mjs` after any change to the mark.

---

## 10. Misuse

Do not:

1. **Recolour the lever.** It is signal yellow, or it is the one-colour version.
2. **Separate the lever from the ring**, or rotate it to another angle in the
   logo. The quarter turn appears as motion only in the enquiry confirmation
   state, never in the mark itself.
3. **Add a flame**, a spark, a droplet, or a flare.
4. **Add a gradient, bevel, chrome, drop shadow or 3D extrude.** The website can
   be dimensional; the logo is flat. A logo that depends on a render cannot be
   embroidered, engraved or faxed.
5. **Re-set the wordmark in another typeface.** It is outlined geometry, not text.
6. **Stretch, condense, skew or rotate** the lockup. Scale proportionally.
7. **Respell it.** One word, `GASDESIGNS`. Not "Gas Designs", not "GAS DESIGNS",
   not "GasDesigns" in the mark. Running copy uses "Gas Designs"; the mark does not.
8. **Change the weight relationship.** `GAS` is heavier than `DESIGNS`, never the
   reverse and never equal.
9. **Place the full lockup on signal yellow.** Warm white on yellow fails contrast.
10. **Reconstruct the mark by hand.** Use the files, or regenerate them from the
    scripts.

---

## 11. Regenerating

```bash
node scripts/build-brand.mjs     # the five SVGs
node scripts/generate-og.mjs     # public/og.png
node scripts/generate-icons.mjs  # icon.svg, apple-icon.png, favicon.ico
```

`src/components/Logo.tsx` inlines the same path data for in-page rendering. If
the mark changes, its paths must be regenerated from
`public/brand/gas-designs-logo-full.svg` — the file header says so.
