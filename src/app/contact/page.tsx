import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { EmailLink } from "@/components/EmailLink";
import { Section, SectionHeading } from "@/components/Section";
import {
  CAN_SHOW_PHONE,
  CAN_SHOW_WHATSAPP,
  UNCONFIRMED,
  confirmedValue,
} from "@/lib/site-config";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description:
    "Request a quote, an inspection or a maintenance visit for a residential, commercial or industrial gas installation.",
  path: "/contact",
});

export default function ContactPage() {
  const phone = CAN_SHOW_PHONE ? confirmedValue(UNCONFIRMED.phone) : null;
  const whatsapp = CAN_SHOW_WHATSAPP ? confirmedValue(UNCONFIRMED.whatsapp) : null;

  return (
    <Section className="border-t-0 pt-12 lg:pt-16">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading
            as="h1"
            label="Contact"
            title="Tell us about the installation."
            intro="Quotes, inspections, maintenance and leak callouts all start the same way: what needs to run, where it is, and what is already there."
          />

          <dl className="mt-10 flex flex-col gap-6">
            <div>
              <dt className="type-label text-valve-steel">Email</dt>
              <dd className="mt-1.5">
                <EmailLink
                  location="contact-page"
                  className="text-warm-white underline decoration-signal-yellow decoration-2 underline-offset-4 transition-colors hover:text-signal-yellow"
                />
              </dd>
            </div>

            {/* Rendered only once confirmed for publication. */}
            {phone && (
              <div>
                <dt className="type-label text-valve-steel">Phone</dt>
                <dd className="mt-1.5 font-mono text-warm-white">{phone}</dd>
              </div>
            )}
            {whatsapp && (
              <div>
                <dt className="type-label text-valve-steel">WhatsApp</dt>
                <dd className="mt-1.5 font-mono text-warm-white">{whatsapp}</dd>
              </div>
            )}
          </dl>

          <div className="mt-10 rounded-xl border border-white/10 bg-carbon-2/60 p-6">
            <h2 className="type-label text-valve-steel">If you smell gas</h2>
            <p className="mt-3 text-sm leading-6 text-mist">
              Close the cylinder or main isolation valve, open doors and windows, and
              keep the area ventilated. Do not operate electrical switches or
              anything that could spark. Contact us once the supply is isolated —
              not before.
            </p>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="glass-panel rounded-2xl p-6 lg:p-8">
            <ContactForm />
          </div>
        </div>
      </div>
    </Section>
  );
}
