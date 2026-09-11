import type { Metadata } from "next";
import Link from "next/link";
import { ServicesGrid } from "@/components/ServicesGrid";
import { Section, SectionHeading } from "@/components/Section";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { SERVICES } from "@/data/services";
import { BUSINESS_NAME, SITE_URL } from "@/lib/site-config";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Gas Installation Services",
  description:
    "Gas installation, maintenance, leak detection and compliance services for residential, commercial and industrial sites — nine service lines from domestic hobs to bulk LPG.",
  path: "/services",
});

export default function ServicesPage() {
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${BUSINESS_NAME} services`,
    itemListElement: SERVICES.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: service.title,
      url: `${SITE_URL}/services/${service.slug}`,
    })),
  };

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/services` },
    ],
  };

  return (
    <>
      <JsonLd data={itemList} />
      <JsonLd data={breadcrumbs} />

      <Section className="border-t-0 pt-12 lg:pt-16" labelledBy="services-heading">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-valve-steel">
            <li>
              <Link href="/" className="hover:text-warm-white">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-mist">Services</li>
          </ol>
        </nav>

        <SectionHeading
          as="h1"
          id="services-heading"
          label="Services"
          title="Gas installation, maintenance and compliance."
          intro="Nine service lines. Each one is the same engineering problem at a different scale: get the right volume of gas to the right place safely, make it obvious how to shut it off, and prove it holds."
        />

        <div className="mt-12">
          <ServicesGrid headingLevel={2} />
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
