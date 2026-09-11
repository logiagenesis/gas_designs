import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { EmailLink } from "@/components/EmailLink";
import { Prose } from "@/components/Prose";
import { BUSINESS_NAME, YEAR_MARK } from "@/lib/site-config";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "How Gas Designs handles the personal information submitted through this website, in line with South Africa's Protection of Personal Information Act.",
  path: "/privacy-policy",
});

/**
 * NOT LEGAL ADVICE, and the page says so plainly.
 *
 * It describes what the site actually does — which is a short list — and
 * avoids asserting compliance with POPIA, because that is a determination for
 * the client's legal adviser, not for a website build.
 */
export default function PrivacyPolicyPage() {
  return (
    <Section className="border-t-0 pt-12 lg:pt-16">
      <div className="max-w-[46rem]">
        <p className="type-label text-signal-yellow">Legal</p>
        <h1 className="type-h1 mt-4 text-warm-white">Privacy Policy</h1>
        <p className="type-body mt-6 text-mist">
          This policy explains what personal information this website collects, why
          it is collected, and what happens to it afterwards.
        </p>

        <div className="mt-6 rounded-xl border border-signal-yellow/30 bg-signal-yellow/5 p-5">
          <p className="text-sm leading-6 text-mist">
            <strong className="text-warm-white">Review required.</strong> This is a
            plain-language starting point prepared as part of the website build. It
            has not been reviewed by a legal practitioner, and it should be checked
            and adopted by {BUSINESS_NAME} and its legal adviser before the site
            goes live.
          </p>
        </div>

        <Prose>
          <h2>Who this policy covers</h2>
          <p>
            This policy applies to {BUSINESS_NAME} as the party responsible for
            information submitted through this website. The company&rsquo;s
            registered details and physical address are not published on this site
            yet; they will be added here once confirmed.
          </p>

          <h2>What we collect</h2>
          <p>
            The only information this website asks for is what you type into the
            enquiry form: your name, an optional company name, your phone number,
            your email address, the suburb or town the work is in, the service you
            need, the site type, what kind of enquiry it is, and your message.
          </p>
          <p>
            The form also records the page you submitted from, the time of
            submission, and any campaign parameters present in the web address you
            arrived on. These tell us which page and which campaign produced the
            enquiry. They contain no information about you personally.
          </p>
          <p>
            The form includes a hidden field used to catch automated submissions. A
            person never sees or fills it in.
          </p>

          <h2>Why we collect it</h2>
          <p>
            To respond to your enquiry, to quote for the work you have described,
            and to keep a record of what was asked for and what was answered. We do
            not sell it, rent it, or use it to build a marketing list.
          </p>

          <h2>Consent</h2>
          <p>
            The enquiry form asks you to confirm that we may use the details you
            supply to reply to you. You do not have to submit the form; you are
            welcome to email us directly at{" "}
            <EmailLink location="privacy" className="underline decoration-signal-yellow decoration-2 underline-offset-4" />{" "}
            instead.
          </p>

          <h2>How it reaches us</h2>
          <p>
            Submissions are sent to our business email address over an encrypted
            connection to our mail provider. They are not stored in a database on
            this website, and the website does not keep a copy after the message has
            been sent.
          </p>

          <h2>How long we keep it</h2>
          <p>
            Enquiries stay in our email for as long as we need them for the work and
            for our own records. If you want your enquiry deleted, ask us and we
            will remove it, unless we are required to keep it for legal or
            accounting reasons.
          </p>

          <h2>Who else sees it</h2>
          <p>
            Our email provider processes the message in the course of delivering it.
            The company hosting this website processes the request that carries your
            submission. Beyond that, we do not share enquiry information with anyone
            unless you ask us to, or unless the law requires it.
          </p>

          <h2>Analytics and cookies</h2>
          <p>
            This website is built so that analytics and advertising tags load only
            if they have been configured. Where they are enabled, they may set
            cookies or similar identifiers in your browser and record which pages
            were viewed and which buttons were clicked. What you type into the
            enquiry form is never sent to any analytics or advertising service.
          </p>
          <p>
            If no analytics or advertising tags are configured, this website sets no
            cookies of its own.
          </p>

          <h2>Your rights</h2>
          <p>
            South Africa&rsquo;s Protection of Personal Information Act gives you
            rights over information about you. Those include asking what we hold,
            asking us to correct it, asking us to delete it, and objecting to how we
            use it. To exercise any of them, email{" "}
            <EmailLink location="privacy-rights" className="underline decoration-signal-yellow decoration-2 underline-offset-4" />
            .
          </p>
          <p>
            If you believe your information has been mishandled, you may also
            complain to the Information Regulator of South Africa.
          </p>

          <h2>Security</h2>
          <p>
            Submissions travel over an encrypted connection and mail credentials are
            held as server-side configuration, never exposed to the browser. No
            website can promise perfect security, and this one does not.
          </p>

          <h2>Changes</h2>
          <p>
            If this policy changes, the revised version will be published on this
            page.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about this policy go to{" "}
            <EmailLink location="privacy-contact" className="underline decoration-signal-yellow decoration-2 underline-offset-4" />
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

