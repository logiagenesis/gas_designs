import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/Section";
import { EmailLink } from "@/components/EmailLink";
import { Prose } from "@/components/Prose";
import { BUSINESS_NAME, YEAR_MARK } from "@/lib/site-config";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Terms",
  description:
    "The terms that apply to using the Gas Designs website, and what the information published on it does and does not amount to.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <Section className="border-t-0 pt-12 lg:pt-16">
      <div className="max-w-[46rem]">
        <p className="type-label text-signal-yellow">Legal</p>
        <h1 className="type-h1 mt-4 text-warm-white">Terms of Use</h1>
        <p className="type-body mt-6 text-mist">
          These terms cover the use of this website. They are not the terms of any
          contract for gas work — that is agreed separately, in writing, for each job.
        </p>

        <div className="mt-6 rounded-xl border border-signal-yellow/30 bg-signal-yellow/5 p-5">
          <p className="text-sm leading-6 text-mist">
            <strong className="text-warm-white">Review required.</strong> Prepared as
            part of the website build and not reviewed by a legal practitioner. It
            should be checked and adopted by {BUSINESS_NAME} and its legal adviser
            before the site goes live.
          </p>
        </div>

        <Prose>
          <h2>About this website</h2>
          <p>
            This website is operated by {BUSINESS_NAME}. Using it means accepting
            these terms. The company&rsquo;s registered details will be published
            here once confirmed.
          </p>

          <h2>Information on this site is general</h2>
          <p>
            The service descriptions explain the kind of work undertaken. They are
            not a quotation, a specification, or advice about your particular
            installation. Nothing here should be relied on as a substitute for
            having your own installation assessed.
          </p>

          <h2>Safety information</h2>
          <p>
            Any safety guidance on this site is general, and it is not a substitute
            for professional attendance. If you suspect a gas leak, isolate the
            supply, ventilate the area, avoid anything that could create a spark,
            and get a gas installer to the site.
          </p>

          <h2>Quotations and agreements</h2>
          <p>
            No page on this website is an offer capable of acceptance, and submitting
            the enquiry form does not create a contract. Work is undertaken only on
            terms agreed in writing for the specific job, after the installation or
            site has been assessed.
          </p>

          <h2>Enquiries</h2>
          <p>
            Enquiries sent through this site are handled as described in the{" "}
            <Link href="/privacy-policy">Privacy Policy</Link>. Please do not send
            confidential or sensitive information through the form.
          </p>

          <h2>Availability</h2>
          <p>
            We aim to keep this site available and current, but we do not guarantee
            it will be uninterrupted or free of errors, and content may change
            without notice.
          </p>

          <h2>Intellectual property</h2>
          <p>
            The text, layout, logo, icons and illustrations on this site belong to{" "}
            {BUSINESS_NAME} unless stated otherwise, and may not be reproduced
            without permission.
          </p>

          <h2>Links</h2>
          <p>
            Where this site links elsewhere, we are not responsible for the content
            of those sites.
          </p>

          <h2>Liability</h2>
          <p>
            To the extent the law allows, {BUSINESS_NAME} is not liable for loss
            arising from reliance on information published on this website. Nothing
            in these terms limits any liability that cannot lawfully be limited,
            including liability for death or personal injury caused by negligence.
          </p>

          <h2>Governing law</h2>
          <p>
            These terms are governed by the law of the Republic of South Africa.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about these terms go to{" "}
            <EmailLink location="terms" className="underline decoration-signal-yellow decoration-2 underline-offset-4" />
            .
          </p>
        </Prose>

        <p className="mt-12 font-mono text-xs uppercase tracking-[0.14em] text-valve-steel">
          Version 1 &middot; {YEAR_MARK} &middot; Pending legal review
        </p>
      </div>
    </Section>
  );
}
