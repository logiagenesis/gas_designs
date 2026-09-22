import { defineConfig } from "vite";
import { resolve } from "node:path";
import { readdirSync, existsSync } from "node:fs";

/**
 * Gas Designs — build config.
 *
 * Plain static site: HTML, CSS and one small JS file. Vite bundles and
 * fingerprints the assets and copies public/ through untouched.
 *
 * base is /gas_designs/ because the site is served from a repository
 * subdirectory on GitHub Pages. Every link and asset path in the generated
 * HTML is written with that prefix by scripts/build-pages.mjs.
 */

/** Every generated page becomes a Rollup entry point. */
function htmlInputs() {
  const inputs = { home: resolve(__dirname, "index.html") };
  if (existsSync(resolve(__dirname, "404.html"))) {
    inputs.notFound = resolve(__dirname, "404.html");
  }
  for (const dir of ["services", "thank-you", "privacy-policy"]) {
    const full = resolve(__dirname, dir);
    if (!existsSync(full)) continue;
    if (existsSync(resolve(full, "index.html"))) {
      inputs[dir] = resolve(full, "index.html");
    }
    for (const entry of readdirSync(full, { withFileTypes: true })) {
      if (!entry.isDirectory()) continue;
      const page = resolve(full, entry.name, "index.html");
      if (existsSync(page)) inputs[`${dir}-${entry.name}`] = page;
    }
  }
  return inputs;
}

export default defineConfig({
  base: "/gas_designs/",
  appType: "mpa",
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: { input: htmlInputs() },
  },
});
