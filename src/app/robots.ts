import type { MetadataRoute } from "next";
import { IS_PREVIEW, SITE_URL } from "@/lib/site-config";

/** Required by `output: "export"`, which cannot generate this at request time. */
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  // A preview deployment must never be indexed. Note this file alone is not
  // enough on GitHub Pages — it is served from /gas_designs/robots.txt rather
  // than the domain root, where crawlers do not look — so the root layout also
  // emits a noindex meta tag.
  if (IS_PREVIEW) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // The API endpoint has side effects and the confirmation page is not
        // a landing page; neither belongs in an index.
        disallow: ["/api/", "/contact/sent"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
