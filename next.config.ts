import type { NextConfig } from "next";

/**
 * Security headers.
 *
 * Kept to the practical, framework-safe set: the site serves no third-party
 * embeds and takes no user uploads, so these cost nothing and close off the
 * common clickjacking, MIME-sniffing and referrer-leak issues.
 *
 * A full Content-Security-Policy is intentionally not set here. Next.js needs
 * nonce plumbing for its inline bootstrap scripts, and the policy has to be
 * widened for whichever tag manager the client enables. It is listed as a
 * launch task in docs/self-audit-03-final.md instead of being shipped in a
 * broken or uselessly permissive form.
 */
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

/**
 * GitHub Pages preview build.
 *
 * Pages serves static files only, so the preview is a static export under the
 * repository's path. Two things cannot come with it: `headers()` is not
 * supported alongside `output: "export"`, and `/api/contact` has no runtime to
 * execute in — the deploy workflow removes that route before building.
 *
 * This branch is reached only when the workflow sets GITHUB_PAGES=true. A
 * normal `npm run build` is completely unaffected and keeps its security
 * headers and its API route.
 */
const isPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = isPages
  ? {
      poweredByHeader: false,
      reactStrictMode: true,
      output: "export",
      basePath: "/gas_designs",
      trailingSlash: true,
      images: { unoptimized: true },
    }
  : {
      poweredByHeader: false,
      reactStrictMode: true,
      async headers() {
        return [{ source: "/:path*", headers: securityHeaders }];
      },
    };

export default nextConfig;
