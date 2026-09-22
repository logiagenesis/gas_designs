import { defineConfig } from "vite";
import { resolve } from "node:path";

/**
 * Gas Designs — build config.
 *
 * Plain static site. No framework. Vite is here for three things only:
 * bundling the CSS and the one JS file, hashing those filenames for cache
 * busting, and copying `public/` through untouched.
 *
 * `public/` holds everything Apache must serve verbatim: the photographs,
 * send.php, .htaccess, robots.txt and sitemap.xml. Vite never rewrites them.
 *
 * BASE PATH: the production target is cPanel/Apache at the domain root, so the
 * default base is "/". The GitHub Pages preview serves from a subdirectory, so
 * that build sets GITHUB_PAGES=true and gets the repository path instead.
 */
const isPages = process.env.GITHUB_PAGES === "true";

export default defineConfig({
  base: isPages ? "/gas_designs/" : "/",
  appType: "mpa",
  build: {
    outDir: "dist",
    emptyOutDir: true,
    assetsInlineLimit: 0,
    rollupOptions: {
      input: {
        home: resolve(__dirname, "index.html"),
        privacy: resolve(__dirname, "privacy-policy/index.html"),
        terms: resolve(__dirname, "terms/index.html"),
        thanks: resolve(__dirname, "thank-you/index.html"),
        notFound: resolve(__dirname, "404.html"),
      },
    },
  },
  server: { port: 5173 },
});
