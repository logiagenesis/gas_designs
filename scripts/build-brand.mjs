/**
 * Emits every brand asset from the shared geometry so the variants can never
 * drift. Run with `node scripts/build-brand.mjs`.
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { COLORS, MARK, MARK_BBOX, ringPathD, leverPathD, pivotPathD } from "./brand-geometry.mjs";
import { layoutRun } from "./brand-type.mjs";

const OUT = new URL("../public/brand/", import.meta.url);
mkdirSync(OUT, { recursive: true });

const n = (v) => Number(v.toFixed(2));

/* ---------------------------------------------------------------- mark ---- */

const MARK_W = MARK_BBOX.maxX - MARK_BBOX.minX; // 212
const MARK_H = MARK_BBOX.maxY - MARK_BBOX.minY; // 188
const SHIFT = `translate(${-MARK_BBOX.minX} ${-MARK_BBOX.minY})`;

/**
 * @param {"duotone"|"mono"} mode
 * @param {string} color  fill used in mono mode
 */
function markGroup(mode, color) {
  const ring = `<path d="${ringPathD()}" fill="none" stroke="${
    mode === "mono" ? color : COLORS.warmWhite
  }" stroke-width="${MARK.ringStroke}" stroke-linecap="butt"/>`;

  if (mode === "mono") {
    // One colour: the pivot becomes a knockout so the bolt still reads.
    return `<g transform="${SHIFT}">${ring}<path d="${leverPathD()}${pivotPathD()}" fill="${color}" fill-rule="evenodd"/></g>`;
  }

  return (
    `<g transform="${SHIFT}">` +
    ring +
    `<path d="${leverPathD()}" fill="${COLORS.signalYellow}"/>` +
    `<circle cx="${MARK.cx}" cy="${MARK.cy}" r="${MARK.pivotRadius}" fill="${COLORS.warmWhite}"/>` +
    `</g>`
  );
}

/* ------------------------------------------------------------ wordmark ---- */

const HEAVY = { stem: 26, baseWidth: 76, tracking: 10 };
const LIGHT = { stem: 18, baseWidth: 72, tracking: 12 };
/** Join between the heavy "GAS" and the regular "DESIGNS". One word, no space. */
const JOIN = 11;

function wordmarkRuns() {
  const gas = layoutRun("GAS", HEAVY);
  const designs = layoutRun("DESIGNS", { ...LIGHT, x: gas.width + JOIN });
  return {
    runs: [gas, designs],
    width: n(gas.width + JOIN + designs.width),
  };
}

/**
 * Renders stroked skeletons. Stroke width carries the weight, so a run's
 * `stem` becomes its `stroke-width`.
 */
function runsToSvg(runs, color) {
  return runs
    .map((run) => {
      const stroked = run.strokes
        .map((d) => `<path d="${d}"/>`)
        .join("");
      const filled = (run.fills ?? []).map((d) => `<path d="${d}" fill="${color}"/>`).join("");
      return (
        `<g fill="none" stroke="${color}" stroke-width="${run.stem}" ` +
        `stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="2.2">${stroked}</g>` +
        filled
      );
    })
    .join("");
}

/* ------------------------------------------------------------- lockups ---- */

const CAP_IN_GRID = 96; // "cap height about half the ring diameter" (188 / 2)
const WM_SCALE = CAP_IN_GRID / 100;
const GAP = 54; // space between lever tip and the wordmark

function buildLockup({ mode, markColor, wordColor, title }) {
  const wm = wordmarkRuns();
  const wmWidth = n(wm.width * WM_SCALE);
  const wmX = MARK_W + GAP;
  // Vertically centre the cap height on the mark's centre line.
  const markCenterY = MARK.cy - MARK_BBOX.minY; // 94
  const wmY = n(markCenterY - CAP_IN_GRID / 2);
  const totalW = n(wmX + wmWidth);

  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${totalW} ${MARK_H}" ` +
    `width="${totalW}" height="${MARK_H}" role="img" aria-label="Gas Designs">` +
    `<title>${title}</title>` +
    markGroup(mode, markColor) +
    `<g transform="translate(${wmX} ${wmY}) scale(${WM_SCALE})">` +
    runsToSvg(wm.runs, wordColor) +
    `</g>` +
    `</svg>\n`
  );
}

function buildMark({ mode, color, title }) {
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${MARK_W} ${MARK_H}" ` +
    `width="${MARK_W}" height="${MARK_H}" role="img" aria-label="Gas Designs">` +
    `<title>${title}</title>` +
    markGroup(mode, color) +
    `</svg>\n`
  );
}

/* -------------------------------------------------------------- favicon ---- */

function buildFavicon() {
  const box = 256;
  const pad = 30;
  const avail = box - pad * 2;
  const scale = n(Math.min(avail / MARK_W, avail / MARK_H));
  const tx = n((box - MARK_W * scale) / 2);
  const ty = n((box - MARK_H * scale) / 2);

  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${box} ${box}" ` +
    `width="${box}" height="${box}" role="img" aria-label="Gas Designs">` +
    `<title>Gas Designs</title>` +
    `<rect width="${box}" height="${box}" rx="56" fill="${COLORS.carbon}"/>` +
    `<g transform="translate(${tx} ${ty}) scale(${scale})">${markGroup("duotone")}</g>` +
    `</svg>\n`
  );
}

/* ------------------------------------------------------------------ OG ---- */

export function buildOgSvg() {
  const W = 1200;
  const H = 630;

  // Lockup, scaled to a fixed width and placed on the left.
  const wm = wordmarkRuns();
  const lockupNativeW = MARK_W + GAP + wm.width * WM_SCALE;
  const lockupW = 640;
  const lockupScale = n(lockupW / lockupNativeW);
  const lockupX = 84;
  const lockupY = n(232 - (MARK_H * lockupScale) / 2);

  // Tagline, outlined in the same letterform system — no font dependency.
  const tagStem = 11;
  const tag = layoutRun("PRECISION GAS SYSTEMS. BUILT FOR SAFETY.", {
    stem: tagStem,
    baseWidth: 46,
    tracking: 13,
  });
  const tagCap = 21;
  const tagScale = n(tagCap / 100);
  const tagY = 360;

  const bigRing = 300;

  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">` +
    `<defs>` +
    `<linearGradient id="bg" x1="0" y1="0" x2="0.6" y2="1">` +
    `<stop offset="0" stop-color="${COLORS.graphite}"/>` +
    `<stop offset="0.55" stop-color="${COLORS.carbon}"/>` +
    `<stop offset="1" stop-color="${COLORS.carbon2}"/>` +
    `</linearGradient>` +
    `<linearGradient id="floor" x1="0" y1="0" x2="0" y2="1">` +
    `<stop offset="0" stop-color="${COLORS.warmWhite}" stop-opacity="0.10"/>` +
    `<stop offset="1" stop-color="${COLORS.warmWhite}" stop-opacity="0"/>` +
    `</linearGradient>` +
    `</defs>` +
    `<rect width="${W}" height="${H}" fill="url(#bg)"/>` +
    // Oversized valve motif, bled off the right edge.
    `<g transform="translate(1010 315)" opacity="0.09">` +
    `<circle cx="0" cy="0" r="${bigRing}" fill="none" stroke="${COLORS.warmWhite}" stroke-width="46"/>` +
    `<circle cx="0" cy="0" r="${bigRing - 96}" fill="none" stroke="${COLORS.warmWhite}" stroke-width="4"/>` +
    `</g>` +
    `<g transform="translate(1010 315)" opacity="0.16">` +
    `<rect x="-24" y="-19" width="440" height="38" rx="19" fill="${COLORS.signalYellow}"/>` +
    `</g>` +
    `<circle cx="1010" cy="315" r="13" fill="${COLORS.warmWhite}" opacity="0.14"/>` +
    // Reflective floor plane.
    `<rect x="0" y="470" width="${W}" height="160" fill="url(#floor)"/>` +
    `<rect x="0" y="470" width="${W}" height="1" fill="${COLORS.warmWhite}" opacity="0.14"/>` +
    // Lockup.
    `<g transform="translate(${lockupX} ${lockupY}) scale(${lockupScale})">` +
    markGroup("duotone") +
    `<g transform="translate(${MARK_W + GAP} ${n(94 - CAP_IN_GRID / 2)}) scale(${WM_SCALE})">` +
    runsToSvg(wm.runs, COLORS.warmWhite) +
    `</g></g>` +
    // Signal-yellow rule, then the tagline.
    `<rect x="${lockupX}" y="312" width="86" height="5" fill="${COLORS.signalYellow}"/>` +
    `<g transform="translate(${lockupX} ${tagY}) scale(${tagScale})">` +
    runsToSvg([tag], "#D8D3C5") +
    `</g>` +
    `</svg>\n`
  );
}

/* ---------------------------------------------------------------- write ---- */

const assets = {
  "gas-designs-logo-full.svg": buildLockup({
    mode: "duotone",
    wordColor: COLORS.warmWhite,
    title: "Gas Designs",
  }),
  "gas-designs-logo-mark.svg": buildMark({ mode: "duotone", title: "Gas Designs" }),
  "gas-designs-logo-light.svg": buildLockup({
    mode: "mono",
    markColor: COLORS.warmWhite,
    wordColor: COLORS.warmWhite,
    title: "Gas Designs — one colour, for dark backgrounds",
  }),
  "gas-designs-logo-dark.svg": buildLockup({
    mode: "mono",
    markColor: COLORS.carbon,
    wordColor: COLORS.carbon,
    title: "Gas Designs — one colour, for light backgrounds",
  }),
  "favicon.svg": buildFavicon(),
};

export function writeBrandAssets({ quiet = false } = {}) {
  for (const [name, svg] of Object.entries(assets)) {
    writeFileSync(new URL(name, OUT), svg, "utf8");
    if (!quiet) console.log(`${name.padEnd(30)} ${svg.length} bytes`);
  }
}

// Only write when this file is the entry point, so importing `buildOgSvg`
// from the OG script does not have surprising side effects.
const isEntry =
  process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if (isEntry) writeBrandAssets();
