import type { Metadata } from "next";
import Link from "next/link";
import { SentConfirmation } from "@/components/SentConfirmation";
import { Section } from "@/components/Section";
import { EmailLink } from "@/components/EmailLink";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Enquiry sent",
  description: "Your enquiry has been sent to Gas Designs.",
  path: "/contact/sent",
  // A confirmation page has no business in search results.
  noIndex: true,
});

export default function ContactSentPage() {
  return (
    <Section className="border-t-0 pt-16 lg:pt-24">
      <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
        <SentConfirmation />

        <h1 className="type-h1 mt-10 text-warm-white">Enquiry sent.</h1>
        <p className="type-body mt-6 max-w-[42ch] text-mist">
          Thanks — it is with us. We reply by email to the address you gave, so keep
          an eye on that inbox and its spam folder.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/services"
            className="inline-flex items-center justify-center rounded-md border border-white/15 px-6 py-3.5 text-base font-semibold text-warm-white transition-colors hover:border-white/30 hover:bg-white/5"
          >
            Browse services
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-md bg-signal-yellow px-6 py-3.5 text-base font-semibold text-carbon transition-colors hover:bg-signal-yellow-soft"
          >
            Back to home
          </Link>
        </div>

        <p className="mt-10 text-sm text-valve-steel">
          Something urgent, or a correction to send?{" "}
          <EmailLink
            location="sent-page"
            className="text-mist underline decoration-white/30 underline-offset-4 hover:text-warm-white"
          />
        </p>
      </div>
    </Section>
  );
}
