/**
 * Compresses the supplied photographs after Vite has copied them into dist/.
 *
 * WHY IT RUNS ON dist/ AND NOT public/: the originals in public/assets/img/
 * are the client's source files and stay in git untouched. Only the derivatives
 * ship. Running in place on public/ would either destroy the originals or leave
 * both versions in the deployed output.
 *
 * For each photograph it writes a resized, compressed JPEG over the copy in
 * dist/, plus a WebP sibling that the <picture> elements prefer.
 *
 * Missing files are not an error. Slots the client has not filled yet simply
 * have nothing to optimise, and the page shows a labelled placeholder instead.
 */
import { readdir, stat, unlink } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const DIR = path.resolve("dist/assets/img");

/** Target dimensions per slot, from the brand brief's image table. */
const SIZES = {
  "hero": [1920, 1080],
  "compliance": [1600, 1000],
  "about": [1600, 1000],
  "contact": [1600, 1000],
  "og-image": [1200, 630],
};
const SERVICE_SIZE = [1200, 900];

const JPEG = { quality: 78, mozjpeg: true, progressive: true };
const WEBP = { quality: 74, effort: 5 };

function targetFor(base) {
  if (/^service-\d{2}$/.test(base)) return SERVICE_SIZE;
  return SIZES[base] ?? null;
}

const kb = (n) => `${(n / 1024).toFixed(0)} KB`;

/**
 * The README files in public/assets are instructions for whoever uploads the
 * photographs. They belong in the repository, not on the live site.
 */
async function stripDeveloperNotes() {
  for (const dir of ["dist/assets/img", "dist/assets/brand"]) {
    const full = path.resolve(dir);
    if (!existsSync(full)) continue;
    for (const file of await readdir(full)) {
      if (file.toLowerCase().endsWith(".md")) {
        await unlink(path.join(full, file));
        console.log(`[images] Removed ${dir}/${file} from the build output.`);
      }
    }
  }
}

async function run() {
  await stripDeveloperNotes();

  if (!existsSync(DIR)) {
    console.log("[images] dist/assets/img not present — nothing to optimise.");
    return;
  }

  const entries = (await readdir(DIR)).filter((f) => /\.(jpe?g|png)$/i.test(f));

  if (entries.length === 0) {
    console.log(
      "[images] No photographs found. Every image slot will render its placeholder.",
    );
    return;
  }

  let before = 0;
  let after = 0;
  const unknown = [];

  for (const file of entries) {
    const full = path.join(DIR, file);
    const base = path.parse(file).name;
    const target = targetFor(base);

    if (!target) {
      unknown.push(file);
      continue;
    }

    const original = (await stat(full)).size;
    before += original;

    const [w, h] = target;
    // Read into a buffer first: sharp cannot write over the file it is reading.
    const input = await sharp(full).toBuffer();
    const base_ = sharp(input).resize(w, h, { fit: "cover", position: "centre" });

    const jpeg = await base_.clone().jpeg(JPEG).toBuffer();
    const webp = await base_.clone().webp(WEBP).toBuffer();

    await sharp(jpeg).toFile(full);
    await sharp(webp).toFile(path.join(DIR, `${base}.webp`));

    after += jpeg.length + webp.length;
    console.log(
      `[images] ${file.padEnd(20)} ${kb(original).padStart(8)} -> ` +
        `${kb(jpeg.length).padStart(8)} jpeg + ${kb(webp.length).padStart(8)} webp`,
    );
  }

  if (unknown.length) {
    console.warn(
      `[images] Skipped (filename not in the brief's slot list): ${unknown.join(", ")}`,
    );
  }

  if (before > 0) {
    console.log(
      `[images] Total ${kb(before)} -> ${kb(after)} ` +
        `(${(100 - (after / before) * 100).toFixed(0)}% smaller)`,
    );
  }
}

run().catch((err) => {
  console.error("[images] Failed:", err.message);
  process.exit(1);
});
