import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ServiceIcon } from "@/components/ServiceIcon";
import { ContactForm } from "@/components/ContactForm";
import { Section, SectionHeading } from "@/components/Section";
import { JsonLd } from "@/components/JsonLd";
import { SERVICES, getServiceBySlug } from "@/data/services";
import { BUSINESS_NAME, SITE_URL } from "@/lib/site-config";
import { pageMetadata } from "@/lib/metadata";

interface PageProps {
  params: Promise<{ slug: string }>;
}

/** All nine pages are statically generated. */
export function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  return pageMetadata({
    // seoTitle already carries the brand, so it bypasses the title template.
    title: service.seoTitle,
    absoluteTitle: true,
    description: service.seoDescription,
    path: `/services/${service.slug}`,
    type: "article",
  });
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const url = `${SITE_URL}/services/${service.slug}`;
  const others = SERVICES.filter((s) => s.slug !== service.slug).slice(0, 3);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.seoDescription,
    url,
    serviceType: service.title,
    // `provider` is an Organization rather than a LocalBusiness: no address or
    // area served is confirmed, and empty NAP schema is worse than none.
    provider: {
      "@type": "Organization",
      name: BUSINESS_NAME,
      url: SITE_URL,
    },
  };

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/services` },
      { "@type": "ListItem", position: 3, name: service.title, item: url },
    ],
  };

  return (
    <>
      <JsonLd data={serviceSchema} />
      <JsonLd data={breadcrumbs} />

      <Section className="border-t-0 pt-12 lg:pt-16">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-valve-steel">
            <li>
              <Link href="/" className="hover:text-warm-white">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/services" className="hover:text-warm-white">
                Services
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-mist">{service.title}</li>
          </ol>
        </nav>

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-lg border border-white/10 bg-graphite/60 text-warm-white">
              <ServiceIcon name={service.iconKey} className="h-8 w-8" />
            </div>

            <h1 className="type-h1 mt-6 text-warm-white">{service.title}</h1>
            <p className="type-body measure mt-6 text-mist">{service.intro}</p>

            <h2 className="type-h3 mt-12 text-warm-white">What the work covers</h2>
            <ul className="mt-6 flex flex-col gap-4">
              {service.scope.map((item) => (
                <li key={item} className="flex items-start gap-3 text-mist">
                  <span
                    aria-hidden="true"
                    className="mt-2.5 h-1.5 w-6 shrink-0 rounded-full bg-signal-yellow"
                  />
                  <span className="type-body">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-12 rounded-xl border border-white/10 bg-carbon-2/60 p-6">
              <h2 className="type-label text-valve-steel">Before you book</h2>
              <p className="mt-3 text-sm leading-6 text-valve-steel">
                This page describes the work, not a quotation. Scope, materials and
                access vary from site to site, so the detail gets confirmed after a
                look at the installation.
              </p>
            </div>
          </div>

          <aside className="lg:col-span-5">
            <div className="glass-panel rounded-2xl p-6 lg:sticky lg:top-28 lg:p-8">
              <h2 className="type-h3 text-warm-white">Ask about this service</h2>
              <p className="mt-3 text-sm leading-6 text-valve-steel">
                The form is pre-set to {service.title.toLowerCase()}.
              </p>
              <div className="mt-6">
                <ContactForm initialService={service.title} />
              </div>
            </div>
          </aside>
        </div>
      </Section>

      <Section labelledBy="related-heading" className="bg-carbon-2">
        <SectionHeading id="related-heading" label="Also available" title="Related services" />
        <ul className="mt-10 grid gap-5 sm:grid-cols-3">
          {others.map((other) => (
            <li key={other.slug}>
              <Link
                href={`/services/${other.slug}`}
                className="flex h-full flex-col rounded-xl border border-white/10 bg-graphite/40 p-6 transition-colors hover:border-white/25"
              >
                <ServiceIcon name={other.iconKey} className="h-7 w-7 text-warm-white" />
                <span className="type-h3 mt-4 text-base text-warm-white">
                  {other.title}
                </span>
                <span className="mt-2 text-sm leading-6 text-valve-steel">{other.summary}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
