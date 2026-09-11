import Link from "next/link";
import { Hero } from "@/components/Hero";
import { TrustStrip } from "@/components/TrustStrip";
import { ServicesGrid } from "@/components/ServicesGrid";
import { SectorsGrid } from "@/components/SectorsGrid";
import { ProcessSteps } from "@/components/ProcessSteps";
import { StandardsVisual } from "@/components/StandardsVisual";
import { Faq } from "@/components/Faq";
import { LazyContactForm } from "@/components/LazyContactForm";
import { Section, SectionHeading } from "@/components/Section";
import { JsonLd } from "@/components/JsonLd";
import { FAQS } from "@/data/faqs";
import { EmailLink } from "@/components/EmailLink";
import {
  BUSINESS_NAME,
  CAN_EMIT_CONTACT_POINT_SCHEMA,
  CAN_EMIT_LOCAL_BUSINESS_SCHEMA,
  SITE_DESCRIPTION,
  SITE_URL,
  UNCONFIRMED,
  confirmedValue,
} from "@/lib/site-config";

/**
 * HOMEPAGE
 *
 * Sections, in order: hero, scope strip, nine services, sectors, process,
 * safety and compliance, FAQ, contact.
 *
 * NOT PRESENT, deliberately: project photography, case studies, statistics,
 * client logos and testimonials. None have been supplied, and fabricating any
 * of them on a gas safety site is out of the question.
 */
export default function HomePage() {
  /*
   * Structured data upgrades itself as facts are confirmed.
   *
   * Today this emits `Organization`, because `LocalBusiness` requires an address
   * and an area served and neither is confirmed — and empty NAP schema is worse
   * than none, since it asserts to a search engine that the entity has no
   * location. Confirm the facts in site-config and this becomes `LocalBusiness`
   * with a telephone and an area, without touching this page.
   */
  const phone = confirmedValue(UNCONFIRMED.phone);
  const serviceArea = confirmedValue(UNCONFIRMED.serviceArea);
  const address = confirmedValue(UNCONFIRMED.address);

  const organisation = {
    "@context": "https://schema.org",
    "@type": CAN_EMIT_LOCAL_BUSINESS_SCHEMA ? "LocalBusiness" : "Organization",
    name: BUSINESS_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    logo: `${SITE_URL}/brand/gas-designs-logo-mark.svg`,
    image: `${SITE_URL}/og.png`,
    ...(CAN_EMIT_CONTACT_POINT_SCHEMA && phone ? { telephone: phone } : {}),
    ...(serviceArea ? { areaServed: serviceArea } : {}),
    ...(address ? { address } : {}),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <>
      <JsonLd data={organisation} />
      <JsonLd data={faqSchema} />
      <Hero />
      <TrustStrip />

      <Section id="services" labelledBy="services-heading">
        <SectionHeading
          id="services-heading"
          label="What we do"
          title="Nine service lines, one discipline."
          intro="From a single hob to a bulk tank and a plant room. The scale changes; sizing the supply for the real load, making isolation obvious and proving the installation holds does not."
        />
        <div className="mt-12">
          <ServicesGrid />
        </div>
      </Section>

      <Section id="sectors" labelledBy="sectors-heading">
        <SectionHeading
          id="sectors-heading"
          label="Sectors"
          title="Where the work happens."
          intro="Different buildings, different duty cycles, the same requirement: a system that is safe cold, safe under load, and safe to isolate in a hurry."
        />
        <SectorsGrid />
      </Section>

      <Section id="process" labelledBy="process-heading">
        <SectionHeading
          id="process-heading"
          label="How it runs"
          title="From enquiry to documented handover."
          intro="Five stages. The quote follows the site visit rather than preceding it, because a price given before anyone has looked at the routes is a guess."
        />
        <ProcessSteps />
      </Section>

      <Section id="safety" labelledBy="safety-heading">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              id="safety-heading"
              label="Safety and compliance"
              title="A passing test is a flat line."
              intro="Gas work is judged on what happens after everyone leaves. That is why the installation is pressure tested and the result recorded, rather than simply being declared sound."
            />
            <ul className="mt-8 flex flex-col gap-4">
              {[
                "Supply sized for the full connected load, not a nominal figure.",
                "Isolation and shut-off placed where they can be reached under pressure.",
                "Pressure and soundness testing before handover, with the result written down.",
                "Documentation handed over, so the next person knows what is actually installed.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-mist">
                  <span
                    aria-hidden="true"
                    className="mt-2 h-1.5 w-6 shrink-0 rounded-full bg-signal-yellow"
                  />
                  <span className="type-body">{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-sm leading-6 text-valve-steel">
              Gas work in South Africa sits under the Pressure Equipment Regulations
              made under the Occupational Health and Safety Act, and the applicable
              SANS standards for the installation type. Ask us which apply to yours.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-carbon-2/60 p-6 lg:p-8">
            <StandardsVisual className="h-auto w-full" />
            <p className="type-label mt-4 text-valve-steel">
              Soundness test — charge, then hold
            </p>
            <p className="mt-2 text-sm leading-6 text-valve-steel">
              An installation is charged to test pressure and then watched. If the
              line drops, there is a leak to find. This is an illustration of the
              method, not a photograph of a job.
            </p>
          </div>
        </div>
      </Section>

      <Section id="faq" labelledBy="faq-heading">
        <SectionHeading
          id="faq-heading"
          label="Questions"
          title="The ones we are asked most."
        />
        <Faq />
      </Section>

      <Section id="contact" labelledBy="contact-heading" className="bg-carbon-2">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              id="contact-heading"
              label="Get in touch"
              title="Tell us what you need running."
              intro="The more you can say about the appliances and the site, the more useful the first reply will be."
            />
            <div className="mt-8 flex flex-col gap-4">
              <div>
                <p className="type-label text-valve-steel">Email</p>
                <EmailLink
                  location="home-contact"
                  className="mt-1.5 inline-block text-warm-white underline decoration-signal-yellow decoration-2 underline-offset-4 transition-colors hover:text-signal-yellow"
                />
              </div>
              <p className="text-sm leading-6 text-valve-steel">
                Prefer a full page?{" "}
                <Link
                  href="/contact"
                  className="text-mist underline decoration-white/30 underline-offset-4 hover:text-warm-white"
                >
                  Open the contact page
                </Link>
                .
              </p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <LazyContactForm />
          </div>
        </div>
      </Section>
    </>
  );
}
