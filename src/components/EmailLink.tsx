"use client";

import { BUSINESS_EMAIL } from "@/lib/site-config";
import { track } from "@/lib/analytics";

/**
 * The email address is the one contact route confirmed for publication, so it
 * gets its own component and its own tracked click.
 */
export function EmailLink({
  location,
  className,
}: {
  location: string;
  className?: string;
}) {
  return (
    <a
      href={`mailto:${BUSINESS_EMAIL}`}
      onClick={() => track("email_click", { location })}
      className={className}
    >
      {BUSINESS_EMAIL}
    </a>
  );
}
