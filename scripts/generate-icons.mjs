/**
 * Produces the app-directory icon files from the brand favicon.
 *
 * Next.js picks these up by filename convention and emits the <link> tags,
 * so there is no hand-maintained icon list in the metadata.
 *
 * Run with `node scripts/generate-icons.mjs`.
 */
import { readFileSync, writeFileSync, copyFileSync } from "node:fs";
import sharp from "sharp";

const appDir = new URL("../src/app/", import.meta.url);
const brandFavicon = new URL("../public/brand/favicon.svg", import.meta.url);

// 1. SVG icon — served directly to browsers that support it.
copyFileSync(brandFavicon, new URL("icon.svg", appDir));

const svg = readFileSync(brandFavicon);

// 2. Apple touch icon.
const apple = await sharp(svg, { density: 600 }).resize(180, 180).png().toBuffer();
writeFileSync(new URL("apple-icon.png", appDir), apple);

// 3. favicon.ico, so browsers requesting /favicon.ico do not get a 404.
//    A modern .ico may wrap a PNG payload directly.
const png32 = await sharp(svg, { density: 600 }).resize(32, 32).png().toBuffer();

const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0); // reserved
header.writeUInt16LE(1, 2); // type: icon
header.writeUInt16LE(1, 4); // one image

const entry = Buffer.alloc(16);
entry.writeUInt8(32, 0); // width
entry.writeUInt8(32, 1); // height
entry.writeUInt8(0, 2); // palette size (0 = truecolour)
entry.writeUInt8(0, 3); // reserved
entry.writeUInt16LE(1, 4); // colour planes
entry.writeUInt16LE(32, 6); // bits per pixel
entry.writeUInt32LE(png32.length, 8);
entry.writeUInt32LE(header.length + entry.length, 12); // payload offset

writeFileSync(new URL("favicon.ico", appDir), Buffer.concat([header, entry, png32]));

console.log(
  `icon.svg, apple-icon.png (${apple.length}b), favicon.ico (${png32.length + 22}b)`,
);
