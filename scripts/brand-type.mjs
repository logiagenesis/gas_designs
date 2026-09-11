/**
 * GAS DESIGNS — WORDMARK LETTERFORMS
 *
 * A wide, heavy, extended grotesque with squared curves, built as outlined
 * vector geometry rather than live text. Outlining is deliberate: a logo that
 * depends on a webfont renders differently, or not at all, wherever the font
 * has not loaded.
 *
 * CONSTRUCTION
 * Each glyph is a stroked skeleton rather than a filled outline. The skeleton
 * runs along the centre of the stroke, inset by half the stem from the glyph
 * box, and the stroke width supplies the weight. That gives three things for
 * free: every stem is exactly the same weight, "GAS" and "DESIGNS" differ only
 * by stroke width, and the squared curves are real arcs at the corners rather
 * than the 90-degree angles that make a squared S indistinguishable from a 5.
 *
 * Coordinate space: 100 units tall, cap height, y = 0 at the cap line.
 */

const n = (v) => Number(v.toFixed(2));

/** Tiny path builder that applies the glyph's horizontal offset as it goes. */
function pen(ox) {
  let d = "";
  const api = {
    M: (x, y) => ((d += `M${n(x + ox)} ${n(y)}`), api),
    L: (x, y) => ((d += `L${n(x + ox)} ${n(y)}`), api),
    H: (x) => ((d += `H${n(x + ox)}`), api),
    V: (y) => ((d += `V${n(y)}`), api),
    /** Corner arc. `sweep` is 1 clockwise on screen, 0 counter-clockwise. */
    A: (r, sweep, x, y) =>
      ((d += `A${n(r)} ${n(r)} 0 0 ${sweep} ${n(x + ox)} ${n(y)}`), api),
    Z: () => ((d += "Z"), api),
    get d() {
      return d;
    },
  };
  return api;
}

const CAP = 100;

/**
 * Builds the metrics every glyph is drawn against.
 * L/Rt/T/B are skeleton extents; M is the midline.
 */
function metrics(s, w) {
  const a = s / 2;
  const L = a;
  const Rt = w - a;
  const T = a;
  const B = CAP - a;
  const M = CAP / 2;
  // Corner radius for full-height bowls, and the tighter one needed where a
  // bowl only spans half the cap height (S, B, P) so the arcs cannot overlap.
  const rTall = Math.min((w - s) * 0.42, (B - T) / 2);
  const rHalf = Math.min(rTall, (M - T) / 2 * 0.88);
  return { a, L, Rt, T, B, M, rTall, rHalf };
}

/**
 * Glyph table. Each entry returns `{ strokes, fills }` — stroked skeletons
 * plus any shape that has to be solid (only the full stop).
 */
const GLYPHS = {
  // Flat apex. A pointed apex on a stem this heavy produces a miter spike
  // above the cap line; truncating it keeps the A aligned and opens the counter.
  A: (s, w, ox) => {
    const { L, Rt, T, B } = metrics(s, w);
    const apexHalf = s * 0.16;
    const apexL = w / 2 - apexHalf;
    const apexR = w / 2 + apexHalf;
    const barY = 73;
    // Put the crossbar on the diagonals so it never overhangs the legs.
    const t = (B - barY) / (B - T);
    const x1 = L + (apexL - L) * t;
    return {
      strokes: [
        pen(ox).M(L, B).L(apexL, T).H(apexR).L(Rt, B).d,
        pen(ox).M(x1, barY).H(w - x1).d,
      ],
    };
  },

  B: (s, w, ox) => {
    const { L, Rt, T, B, M, rHalf: r } = metrics(s, w);
    return {
      strokes: [
        pen(ox).M(L, B).V(T).H(Rt - r).A(r, 1, Rt, T + r).V(M - r).A(r, 1, Rt - r, M).H(L).d,
        pen(ox).M(L, M).H(Rt - r).A(r, 1, Rt, M + r).V(B - r).A(r, 1, Rt - r, B).H(L).d,
      ],
    };
  },

  C: (s, w, ox) => {
    const { L, Rt, T, B, rTall: r } = metrics(s, w);
    return {
      strokes: [
        pen(ox)
          .M(Rt, T + r).A(r, 0, Rt - r, T).H(L + r).A(r, 0, L, T + r)
          .V(B - r).A(r, 0, L + r, B).H(Rt - r).A(r, 0, Rt, B - r).d,
      ],
    };
  },

  // Square on the left, generously radiused on the right — unmistakably a D.
  D: (s, w, ox) => {
    const { L, Rt, T, B, rTall: r } = metrics(s, w);
    return {
      strokes: [
        pen(ox).M(L, B).V(T).H(Rt - r).A(r, 1, Rt, T + r).V(B - r).A(r, 1, Rt - r, B).Z().d,
      ],
    };
  },

  E: (s, w, ox) => {
    const { L, Rt, T, B, M, rTall: r } = metrics(s, w);
    return {
      strokes: [
        pen(ox).M(Rt, T).H(L + r).A(r, 0, L, T + r).V(B - r).A(r, 0, L + r, B).H(Rt).d,
        pen(ox).M(L, M).H(L + (Rt - L) * 0.84).d,
      ],
    };
  },

  F: (s, w, ox) => {
    const { L, Rt, T, B, M, rTall: r } = metrics(s, w);
    return {
      strokes: [
        pen(ox).M(Rt, T).H(L + r).A(r, 0, L, T + r).V(B).d,
        pen(ox).M(L, M).H(L + (Rt - L) * 0.84).d,
      ],
    };
  },

  // The wordmark G echoes the symbol: open at the upper right, with a
  // crossbar on the midline running out to the right edge.
  G: (s, w, ox) => {
    const { L, Rt, T, B, M, rTall: r } = metrics(s, w);
    return {
      strokes: [
        pen(ox)
          .M(Rt, T + r).A(r, 0, Rt - r, T).H(L + r).A(r, 0, L, T + r)
          .V(B - r).A(r, 0, L + r, B).H(Rt - r).A(r, 0, Rt, B - r)
          .V(M).H(L + (Rt - L) * 0.46).d,
      ],
    };
  },

  I: (s, w, ox) => {
    const { T, B } = metrics(s, w);
    return { strokes: [pen(ox).M(w / 2, T).V(B).d] };
  },

  L: (s, w, ox) => {
    const { L, Rt, T, B } = metrics(s, w);
    return { strokes: [pen(ox).M(L, T).V(B).H(Rt).d] };
  },

  M: (s, w, ox) => {
    const { L, Rt, T, B } = metrics(s, w);
    return { strokes: [pen(ox).M(L, B).V(T).L(w / 2, B).L(Rt, T).V(B).d] };
  },

  N: (s, w, ox) => {
    const { L, Rt, T, B } = metrics(s, w);
    return { strokes: [pen(ox).M(L, B).V(T).L(Rt, B).V(T).d] };
  },

  O: (s, w, ox) => {
    const { L, Rt, T, B, rTall: r } = metrics(s, w);
    return {
      strokes: [
        pen(ox)
          .M(L + r, T).H(Rt - r).A(r, 1, Rt, T + r).V(B - r).A(r, 1, Rt - r, B)
          .H(L + r).A(r, 1, L, B - r).V(T + r).A(r, 1, L + r, T).Z().d,
      ],
    };
  },

  P: (s, w, ox) => {
    const { L, Rt, T, B, M, rHalf: r } = metrics(s, w);
    return {
      strokes: [
        pen(ox).M(L, B).V(T).H(Rt - r).A(r, 1, Rt, T + r).V(M - r).A(r, 1, Rt - r, M).H(L).d,
      ],
    };
  },

  R: (s, w, ox) => {
    const { L, Rt, T, B, M, rHalf: r } = metrics(s, w);
    return {
      strokes: [
        pen(ox).M(L, B).V(T).H(Rt - r).A(r, 1, Rt, T + r).V(M - r).A(r, 1, Rt - r, M).H(L).d,
        pen(ox).M(L + (Rt - L) * 0.5, M).L(Rt, B).d,
      ],
    };
  },

  // Hooks at both ends, so it can never be read as a 5.
  S: (s, w, ox) => {
    const { L, Rt, T, B, M, rHalf: r } = metrics(s, w);
    return {
      strokes: [
        pen(ox)
          .M(Rt, T + r).A(r, 0, Rt - r, T).H(L + r).A(r, 0, L, T + r)
          .V(M - r).A(r, 0, L + r, M).H(Rt - r).A(r, 1, Rt, M + r)
          .V(B - r).A(r, 1, Rt - r, B).H(L + r).A(r, 1, L, B - r).d,
      ],
    };
  },

  T: (s, w, ox) => {
    const { L, Rt, T, B } = metrics(s, w);
    return { strokes: [pen(ox).M(L, T).H(Rt).d, pen(ox).M(w / 2, T).V(B).d] };
  },

  U: (s, w, ox) => {
    const { L, Rt, T, B, rTall: r } = metrics(s, w);
    return {
      strokes: [
        pen(ox).M(L, T).V(B - r).A(r, 0, L + r, B).H(Rt - r).A(r, 0, Rt, B - r).V(T).d,
      ],
    };
  },

  Y: (s, w, ox) => {
    const { L, Rt, T, B } = metrics(s, w);
    const vy = 56;
    return {
      strokes: [pen(ox).M(L, T).L(w / 2, vy).L(Rt, T).d, pen(ox).M(w / 2, vy).V(B).d],
    };
  },

  ".": (s, w, ox) => {
    const { B } = metrics(s, w);
    const r = s / 2;
    const cx = w / 2 + ox;
    return {
      fills: [`M${n(cx - r)} ${n(B)}A${r} ${r} 0 1 0 ${n(cx + r)} ${n(B)}A${r} ${r} 0 1 0 ${n(cx - r)} ${n(B)}Z`],
    };
  },
};

/** Per-glyph advance width, relative to the run's base width. */
function glyphWidth(ch, s, baseWidth) {
  if (ch === "I") return s;
  if (ch === ".") return s * 1.15;
  if (ch === "M") return baseWidth * 1.12;
  if (ch === "A") return baseWidth * 1.18;
  if (ch === " ") return baseWidth * 0.5;
  return baseWidth;
}

/**
 * Optical kerning. Letters with an open right flank (E, F, L, T) leave a hole
 * before a letter with an open left flank, so those pairs are pulled together.
 * Expressed as a fraction of the run's tracking.
 */
const KERN = {
  ES: -0.55, EI: -0.3, ED: -0.2,
  FA: -0.5, LA: -0.5, TA: -0.6, TO: -0.35,
  AS: -0.25, AT: -0.4, AG: -0.2,
  SI: -0.2, PR: -0.15, YS: -0.5, YO: -0.4,
};

/**
 * Lays out a run of uppercase text on the cap-height-100 baseline.
 *
 * @returns {{strokes: string[], fills: string[], width: number, stem: number}}
 */
export function layoutRun(text, { stem, baseWidth, tracking, x = 0 }) {
  const strokes = [];
  const fills = [];
  let cursor = x;

  const upper = text.toUpperCase();

  for (let i = 0; i < upper.length; i += 1) {
    const ch = upper[i];
    const w = glyphWidth(ch, stem, baseWidth);
    const build = GLYPHS[ch];

    if (i > 0) {
      const kern = KERN[`${upper[i - 1]}${ch}`];
      if (kern) cursor += tracking * kern;
    }

    if (!build) {
      if (ch !== " ") {
        throw new Error(`No glyph defined for "${ch}" — add it to brand-type.mjs`);
      }
      cursor += w + tracking;
      continue;
    }

    const g = build(stem, w, cursor);
    if (g.strokes) strokes.push(...g.strokes);
    if (g.fills) fills.push(...g.fills);
    cursor += w + tracking;
  }

  return { strokes, fills, width: n(cursor - x - tracking), stem };
}
