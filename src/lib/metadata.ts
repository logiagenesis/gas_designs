import type { Metadata } from "next";
import { BUSINESS_NAME, SITE_URL } from "@/lib/site-config";

/**
 * Builds per-page metadata.
 *
 * WHY THIS EXISTS: Next.js does not deep-merge `openGraph` — a page that
 * declares its own openGraph object replaces the root one wholesale, silently
 * dropping the shared OG image. Routing every page through this helper means
 * the card image, site name, locale and Twitter card cannot be forgotten.
 */
export function pageMetadata({
  title,
  description,
  path,
  type = "website",
  absoluteTitle = false,
  noIndex = false,
}: {
  title: string;
  description: string;
  /** Route path, with a leading slash. */
  path: string;
  type?: "website" | "article";
  /** True when `title` already carries the brand and must bypass the template. */
  absoluteTitle?: boolean;
  noIndex?: boolean;
}): Metadata {
  const url = `${SITE_URL}${path === "/" ? "" : path}`;
  const ogTitle = absoluteTitle ? title : `${title} | ${BUSINESS_NAME}`;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      siteName: BUSINESS_NAME,
      locale: "en_ZA",
      url,
      title: ogTitle,
      description,
      images: [
        {
          url: "/og.png",
          width: 1200,
          height: 630,
          alt: `${BUSINESS_NAME} — precision gas systems, built for safety`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: ["/og.png"],
    },
    ...(noIndex ? { robots: { index: false, follow: true } } : {}),
  };
}
