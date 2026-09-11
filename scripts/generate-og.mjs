/**
 * Rasterises the Open Graph card to `public/og.png`.
 *
 * The card is drawn entirely from the brand geometry — the lockup and the
 * tagline are outlined paths, not live text — so the output does not depend on
 * any font being installed on the machine that runs this script.
 *
 * Run with `npm run generate:og`.
 */
import { writeFileSync, mkdirSync } from "node:fs";
import sharp from "sharp";
import { buildOgSvg } from "./build-brand.mjs";

const publicDir = new URL("../public/", import.meta.url);
mkdirSync(publicDir, { recursive: true });

const svg = buildOgSvg();
const png = await sharp(Buffer.from(svg), { density: 144 })
  .resize(1200, 630, { fit: "fill" })
  .png({ compressionLevel: 9, palette: true })
  .toBuffer();

writeFileSync(new URL("og.png", publicDir), png);
console.log(`public/og.png  ${png.length} bytes  1200x630`);
