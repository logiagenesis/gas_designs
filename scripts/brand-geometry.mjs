/**
 * GAS DESIGNS — BRAND GEOMETRY
 *
 * Every brand asset is derived from the constants in this file so that the
 * mark, the favicon, the one-colour variants and the OG image can never drift
 * apart. Nothing here is traced from a raster or produced by a logo generator:
 * each coordinate is specified.
 *
 * THE MARK
 * A heavy capital G drawn as the circular body of a front-facing quarter-turn
 * gas valve, opened at the upper right. The G's crossbar is the valve's flat
 * lever handle: it starts at the pivot bolt in the exact centre of the ring and
 * runs horizontally to the right, finishing just past the outer edge.
 *
 * The lever doing double duty as the G crossbar is the whole idea. It is why
 * the mark survives at 16px: two shapes, one ring and one bar.
 */

export const COLORS = {
  carbon: "#16181B",
  carbon2: "#0E0F11",
  graphite: "#22262B",
  warmWhite: "#F2F0EA",
  signalYellow: "#FFC400",
};

/** Master grid. All mark geometry lives in a 256 x 256 box. */
export const GRID = 256;

export const MARK = {
  cx: 128,
  cy: 128,
  /** Ring centreline radius. Outer edge 94, inner edge 54. */
  ringRadius: 74,
  ringStroke: 40,
  /**
   * Valve opening, measured counter-clockwise from 3 o'clock.
   *
   * The lower terminal sits just below the horizontal so the lever covers it
   * completely. At any angle above the centre line a sliver of the ring peeks
   * out over the lever and reads as a stray shape rather than as the G.
   */
  gapStartDeg: -6,
  gapEndDeg: 76,
  /** Lever bar: full thickness, and how far right the tip reaches. */
  leverThickness: 30,
  leverTipX: 246,
  /** Pivot bolt radius, concentric with the ring. */
  pivotRadius: 11,
};

const round = (n) => Number(n.toFixed(2));

/** Point on the ring centreline at a screen-visual angle (0deg = 3 o'clock). */
function ringPoint(deg) {
  const rad = (deg * Math.PI) / 180;
  return {
    x: round(MARK.cx + MARK.ringRadius * Math.cos(rad)),
    // Screen y grows downward, so a positive angle moves up the page.
    y: round(MARK.cy - MARK.ringRadius * Math.sin(rad)),
  };
}

/**
 * The valve body: an arc that runs counter-clockwise from the top edge of the
 * opening all the way round to the bottom edge, leaving the upper-right open.
 */
export function ringPathD() {
  const start = ringPoint(MARK.gapEndDeg);
  const end = ringPoint(MARK.gapStartDeg);
  const sweptDeg = 360 - (MARK.gapEndDeg - MARK.gapStartDeg);
  const largeArc = sweptDeg > 180 ? 1 : 0;
  // sweep-flag 0 draws counter-clockwise on screen.
  return `M${start.x} ${start.y}A${MARK.ringRadius} ${MARK.ringRadius} 0 ${largeArc} 0 ${end.x} ${end.y}`;
}

/**
 * The lever handle. A bar with fully rounded ends whose left cap is centred
 * exactly on the pivot, so the handle reads as pivoting about that point.
 */
export function leverPathD() {
  const half = MARK.leverThickness / 2;
  const top = MARK.cy - half;
  const bottom = MARK.cy + half;
  const left = MARK.cx - half;
  const right = MARK.leverTipX - half;
  return (
    `M${left} ${top}` +
    `H${right}` +
    `A${half} ${half} 0 0 1 ${right} ${bottom}` +
    `H${left}` +
    `A${half} ${half} 0 0 1 ${left} ${top}` +
    `Z`
  );
}

/** Pivot bolt drawn as a circle subpath, wound for an even-odd knockout. */
export function pivotPathD(r = MARK.pivotRadius) {
  const { cx, cy } = MARK;
  return (
    `M${cx - r} ${cy}` +
    `A${r} ${r} 0 1 0 ${cx + r} ${cy}` +
    `A${r} ${r} 0 1 0 ${cx - r} ${cy}` +
    `Z`
  );
}

/**
 * Visual bounding box of the complete mark, used for centring and padding.
 * Two units of breathing room stop the ring and the lever tip from landing
 * exactly on the viewBox edge, where renderers clip the antialiased pixel.
 */
const PAD = 2;

export const MARK_BBOX = {
  minX: MARK.cx - MARK.ringRadius - MARK.ringStroke / 2 - PAD, // 32
  maxX: MARK.leverTipX + PAD, // 248
  minY: MARK.cy - MARK.ringRadius - MARK.ringStroke / 2 - PAD, // 32
  maxY: MARK.cy + MARK.ringRadius + MARK.ringStroke / 2 + PAD, // 224
};
