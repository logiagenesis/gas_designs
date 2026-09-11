"use client";

import Link from "next/link";
import { track } from "@/lib/analytics";
import { EmailLink } from "@/components/EmailLink";

/** Closing call to action, used at the foot of the inner pages. */
export function CtaBand({
  title = "Tell us what you need running.",
  body = "Send the appliances, the site and anything already installed. We will come back to you by email.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="border-t border-t-white/10 bg-carbon-2">
      <div className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="glass-panel flex flex-col gap-8 rounded-2xl p-8 lg:flex-row lg:items-center lg:justify-between lg:p-10">
          <div>
            <h2 className="type-h2 text-warm-white">{title}</h2>
            <p className="type-body measure mt-4 text-mist">{body}</p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
            <Link
              href="/contact"
              onClick={() => track("cta_primary_click", { location: "cta-band" })}
              className="inline-flex items-center justify-center rounded-md bg-signal-yellow px-7 py-3.5 text-base font-semibold text-carbon transition-colors hover:bg-signal-yellow-soft"
            >
              Request a Quote
            </Link>
            <EmailLink
              location="cta-band"
              className="inline-flex items-center justify-center rounded-md border border-white/15 px-7 py-3.5 text-base font-semibold text-warm-white transition-colors hover:border-white/30 hover:bg-white/5"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
