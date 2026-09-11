import Link from "next/link";
import { Logo } from "@/components/Logo";
import { SERVICES } from "@/data/services";
import { EmailLink } from "@/components/EmailLink";
import {
  BUSINESS_NAME,
  CAN_SHOW_PHONE,
  CAN_SHOW_WHATSAPP,
  LEGAL_NAV,
  PRIMARY_NAV,
  SITE_TAGLINE,
  UNCONFIRMED,
  YEAR_MARK,
  confirmedValue,
} from "@/lib/site-config";

/**
 * The footer deliberately carries no address, no service area, no registration
 * number and no opening hours. None of those are confirmed, and an invented
 * one on a gas-safety site is a liability rather than a nice-to-have.
 */
export function Footer() {
  const phone = CAN_SHOW_PHONE ? confirmedValue(UNCONFIRMED.phone) : null;
  const whatsapp = CAN_SHOW_WHATSAPP ? confirmedValue(UNCONFIRMED.whatsapp) : null;

  return (
    <footer className="border-t border-t-white/10 bg-carbon-2">
      <div className="mx-auto max-w-[1200px] px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <Link
              href="/"
              className="inline-flex text-warm-white"
              aria-label={`${BUSINESS_NAME} — home`}
            >
              <Logo variant="full" className="h-8 w-auto" />
            </Link>
            <p className="type-body measure mt-5 text-valve-steel">
              {SITE_TAGLINE} Gas installations, maintenance, leak detection and
              compliance support for residential, commercial and industrial sites.
            </p>

            <div className="mt-6 flex flex-col gap-2">
              <EmailLink location="footer" className="text-warm-white underline decoration-signal-yellow decoration-2 underline-offset-4 transition-colors hover:text-signal-yellow" />
              {phone && (
                <a
                  href={`tel:${phone.replace(/\s+/g, "")}`}
                  className="font-mono text-sm text-mist hover:text-warm-white"
                >
                  {phone}
                </a>
              )}
              {whatsapp && (
                <a
                  href={`https://wa.me/${whatsapp.replace(/\D/g, "")}`}
                  className="font-mono text-sm text-mist hover:text-warm-white"
                >
                  WhatsApp
                </a>
              )}
            </div>
          </div>

          <div className="lg:col-span-4">
            <h2 className="type-label text-valve-steel">Services</h2>
            <ul className="mt-5 flex flex-col gap-2.5">
              {SERVICES.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-sm text-mist transition-colors hover:text-warm-white"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h2 className="type-label text-valve-steel">Company</h2>
            <ul className="mt-5 flex flex-col gap-2.5">
              {PRIMARY_NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-mist transition-colors hover:text-warm-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              {LEGAL_NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-mist transition-colors hover:text-warm-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-t-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-xs text-valve-steel">
            &copy; {YEAR_MARK} {BUSINESS_NAME}. All rights reserved.
          </p>
          <p className="font-mono text-xs text-valve-steel">
            Gas work carried out to the applicable South African standards.
          </p>
        </div>
      </div>
    </footer>
  );
}
